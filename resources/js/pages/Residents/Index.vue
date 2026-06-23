<script setup lang="ts">
import { ref, watch, onMounted, onUpdated } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import residentsRoutes from '@/routes/residents';
import AppLayout from '@/Layouts/AppLayout.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

import { usePage } from '@inertiajs/vue3';
import Tag from '@/components/Form/Tag.vue';


const page = usePage();
watch(() => page.url, (newUrl) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('residents_index_url', newUrl);
    }
}, { immediate: true });

export interface Resident {
    id: number;
    name: string;
    admission_date: string;
    photo_path?: string;
    gender?: string;
    birth_date?: string;
    dependency_level?: string;
    is_diabetic?: boolean;
    is_hypertensive?: boolean;
    is_epileptic?: boolean;
    amenities?: string;
    registration_number?: string;
}

const props = defineProps<{
    residents: {
        data: Resident[];
        links: any[];
        meta: any;
    };
    filters?: {
        search?: string;
        filter?: string;
        status?: string;
    };
}>();

const search = ref(props.filters?.search || '');
const validFilters = ['name', 'age', 'gender', 'disease', 'dependency_level'];
const filter = ref(validFilters.includes(props.filters?.filter as string) ? props.filters?.filter : 'name');

let timeout: any = null;

watch(filter, (newVal, oldVal) => {
    if (oldVal) {
        search.value = '';
    }
});

watch([search, filter], ([newSearch, newFilter]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const params: any = {};
        if (newSearch) {
            params.search = newSearch;
            params.filter = newFilter;
        }
        if (props.filters?.status === 'history') {
            params.status = 'history';
        }

        router.get('/residents', params, {
            preserveState: true,
            replace: true
        });
    }, 300);
});

const calculateAge = (birthDate: string | undefined) => {
    if (!birthDate) return 'Não informada';

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return `${age} anos`;
};

const formatDate = (date: string | undefined) => {
    if (!date) return 'Não informado';
    const parts = date.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return date;
};
</script>

<template>
    <AppLayout>
        <main>
            <header class="flex justify-between items-center mx-10 px-10 h-30">
                <div class="flex w-1/2 gap-2">
                    <select v-model="filter" class="border border-slate-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-slate-300 focus:outline-none text-slate-400">
                        <option value="name">Nome</option>
                        <option value="age">Idade</option>
                        <option value="gender">Gênero</option>
                        <option value="disease">Comorbidade</option>
                        <option value="dependency_level">Dependência</option>
                    </select>

                    <div class="relative flex-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon class="w-5 h-5 text-slate-400" />
                        </div>
                        
                        <input v-if="filter === 'name'" v-model="search" type="text" placeholder="Buscar residente pelo nome..."
                            class="h-10 border border-slate-300 rounded-lg pl-10 pr-4 py-2 w-full shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none" />

                        <input v-else-if="filter === 'age'" v-model="search" type="number" placeholder="Buscar pela idade exata..." min="0" max="150"
                            class="h-10 border border-slate-300 rounded-lg pl-10 pr-4 py-2 w-full shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none" />

                        <select v-else-if="filter === 'gender'" v-model="search" class="text-slate-400 border border-slate-300 rounded-lg pl-10 pr-4 py-2 w-full shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                            <option value="">Selecione um gênero...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>

                        <select v-else-if="filter === 'disease'" v-model="search" class="text-slate-400 border border-slate-300 rounded-lg pl-10 pr-4 py-2 w-full shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                            <option value="">Selecione uma comorbidade...</option>
                            <option value="is_diabetic">Diabético</option>
                            <option value="is_hypertensive">Hipertenso</option>
                            <option value="is_epileptic">Epilético</option>
                        </select>

                        <select v-else-if="filter === 'dependency_level'" v-model="search" class="text-slate-400 border border-slate-300 rounded-lg pl-10 pr-4 py-2 w-full shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                            <option value="">Selecione um grau...</option>
                            <option value="1">Grau 1 (Independente)</option>
                            <option value="2">Grau 2 (Dependência Parcial)</option>
                            <option value="3">Grau 3 (Dependência Total)</option>
                        </select>
                    </div>
                </div>
                <Link v-if="props.filters?.status !== 'history'" href="/residents/create"
                    class="px-6 py-2.5 bg-emerald-600/80 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm flex items-center gap-2">
                    Cadastrar
                </Link>
            </header>

            <ul class="grid grid-cols-4 gap-x-6 gap-y-8 m-10 mt-0 p-10 pt-0">
                <li v-for="resident in residents.data" :key="resident.id"
                    class="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col p-6">

                    <header class="flex flex-col items-center mb-5">
                        <img :src="resident.photo_path ? `/storage/${resident.photo_path}` : `https://ui-avatars.com/api/?name=${resident.name}&background=random&color=fff&size=128`"
                            alt="Foto do residente"
                            class="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm mb-4">

                        <h2 class="text-xl font-bold text-slate-800 text-center leading-tight line-clamp-1"
                            :title="resident.name">{{ resident.name }}</h2>
                        <span
                            class="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mt-2 uppercase tracking-wide">
                            N° prontuário:
                            {{ resident.registration_number }}</span>
                    </header>


                    <div class="grid grid-cols-2 gap-3 w-full mb-5">
                        <div
                            class="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center">
                            <span
                                class="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Idade</span>
                            <span class="text-lg font-bold text-slate-700 leading-none">{{
                                calculateAge(resident.birth_date) }}</span>
                        </div>
                        <div
                            class="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center">
                            <span class="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Grau
                                Dep.</span>
                            <span class="text-lg font-bold text-slate-700 leading-none">{{ resident.dependency_level ||
                                '-' }}</span>
                        </div>
                    </div>


                    <div class="w-full flex-1 mb-6">
                        <span
                            class="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-2 text-center">Condições
                            de Saúde</span>
                        <div class="flex flex-wrap justify-center gap-2">
                            <Tag v-if="resident.is_diabetic" cor="emerald" text="Diabético" class="text-xs"></Tag>
                            <Tag v-if="resident.is_hypertensive" cor="sky" text="Hipertenso" class="text-xs"></Tag>
                            <Tag v-if="resident.is_epileptic" cor="purple" text="Epilético" class="text-xs"></Tag>

                            <span v-if="!resident.is_diabetic && !resident.is_hypertensive && !resident.is_epileptic"
                                class="text-slate-400 italic text-xs py-0.5">Nenhuma relatada</span>
                        </div>
                    </div>

                    <footer class="w-full mt-auto">
                        <Link :href="residentsRoutes.show(resident.id).url"
                            class="w-full flex items-center justify-center px-4 py-3.5 bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-emerald-600/80 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                            Abrir Prontuário
                        </Link>
                    </footer>
                </li>
            </ul>
            
            <nav aria-label="Paginação" class="flex justify-center items-center mt-8 mb-12 gap-2">
                <Component :is="link.url ? Link : 'span'" v-for="(link, index) in residents.links" :key="index"
                    :href="link.url"
                    v-html="link.label.includes('Previous') ? '&lt;' : link.label.includes('Next') ? '&gt;' : link.label"
                    class="px-4 py-2 border rounded-md transition" :class="{
                        'bg-slate-800 text-white font-bold': link.active,
                        'text-slate-600 hover:bg-slate-200': !link.active && link.url,
                        'text-slate-300 bg-slate-50 cursor-not-allowed': !link.url
                    }" />
            </nav>
        </main>
    </AppLayout>
</template>
