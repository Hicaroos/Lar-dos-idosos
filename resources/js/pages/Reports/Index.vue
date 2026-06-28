<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';

defineOptions({ layout: AppLayout });
import BaseButton from '@/components/UI/BaseButton.vue';
import PrintHeader from '@/components/UI/PrintHeader.vue';
import NavTabs from '@/components/UI/NavTabs.vue';
import NavTab from '@/components/UI/NavTab.vue';
import { PrinterIcon } from '@heroicons/vue/24/outline';
import { Link } from '@inertiajs/vue3';
import residentsRoutes from '@/routes/residents';

const props = defineProps<{
    byGender: Record<string, any[]>;
    byDependency: Record<string, any[]>;
    byDisease: Record<string, any[]>;
}>();

const activeTab = ref<'gender' | 'dependency' | 'disease'>('gender');

const printReport = () => {
    window.print();
};
</script>

<template>
            <main class="p-8 print:p-0 print:m-0 w-full max-w-7xl mx-auto">

            <header class="flex justify-between mb-8 print:hidden">
                <div>
                    <h1 class="text-3xl font-bold text-emerald-950 drop-shadow-sm">Relatórios</h1>
                    <p class="text-slate-900 font-medium mt-1 drop-shadow-sm">Visualize e imprima relatórios dos residentes ativos.</p>
                </div>
                <div>
                    <BaseButton variant="primary" @click="printReport">
                        <PrinterIcon class="w-5 h-5" />
                        Imprimir Relatório
                    </BaseButton>
                </div>
            </header>

            <div class="mb-8 print:hidden">
                <NavTabs>
                    <NavTab @click="activeTab = 'gender'" :active="activeTab === 'gender'">
                        Por Gênero
                    </NavTab>
                    <NavTab @click="activeTab = 'dependency'" :active="activeTab === 'dependency'">
                        Por Grau de Dependência
                    </NavTab>
                    <NavTab @click="activeTab = 'disease'" :active="activeTab === 'disease'">
                        Por Comorbidade
                    </NavTab>
                </NavTabs>
            </div>


            <PrintHeader
                :title="activeTab === 'gender' ? 'Relatório de Residentes por Gênero' : (activeTab === 'dependency' ? 'Relatório de Residentes por Grau de Dependência' : 'Relatório de Residentes por Comorbidade')" />


            <div v-show="activeTab === 'gender'" class="space-y-12">
                <div v-for="(residents, gender) in props.byGender" :key="gender"
                    class="card-glass rounded-2xl print:shadow-none print:border-none p-6 print:p-0">
                    <div class="overflow-x-auto print:overflow-visible">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th colspan="4" class="pb-4 font-normal text-left">
                                        <h3 class="text-lg font-bold text-slate-800 border-b pb-2 flex items-center justify-between">
                                            <span>{{ gender }}</span>
                                            <span class="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full print:bg-transparent print:p-0">{{ residents.length }} residentes</span>
                                        </h3>
                                    </th>
                                </tr>
                                <tr class="text-slate-500 text-sm border-b border-slate-100">
                                    <th class="py-3 px-4 font-semibold w-1/3">Nome</th>
                                    <th class="py-3 px-4 font-semibold w-1/6">Idade</th>
                                    <th class="py-3 px-4 font-semibold w-1/6">Grau Dep.</th>
                                    <th class="py-3 px-4 font-semibold">Comodidades/Anotações</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-slate-100">
                                <tr v-for="resident in residents" :key="resident.id"
                                    class="hover:bg-slate-50 transition-colors">
                                    <td class="py-3 px-4 text-slate-800 font-medium">
                                        <Link :href="residentsRoutes.show(resident.id).url"
                                            class="hover:text-emerald-600 print:pointer-events-none">
                                            {{ resident.name }}
                                        </Link>
                                    </td>
                                    <td class="py-3 px-4 text-slate-600">
                                        {{ resident.birth_date ? (new Date().getFullYear() - new
                                            Date(resident.birth_date).getFullYear()) + ' anos' : '-' }}
                                    </td>
                                    <td class="py-3 px-4 text-slate-600">{{ resident.dependency_level ? `Grau
                                        ${resident.dependency_level}` : '-' }}</td>
                                    <td class="py-3 px-4 text-slate-600 line-clamp-1 max-w-xs truncate"
                                        :title="resident.amenities">{{ resident.amenities || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="Object.keys(props.byGender).length === 0" class="text-center py-12 text-slate-500">
                    Nenhum residente encontrado.
                </div>
            </div>


            <div v-show="activeTab === 'dependency'" class="space-y-12">
                <div v-for="(residents, dependency) in props.byDependency" :key="dependency"
                    class="card-glass rounded-2xl print:shadow-none print:border-none p-6 print:p-0">
                    <div class="overflow-x-auto print:overflow-visible">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th colspan="4" class="pb-4 font-normal text-left">
                                        <h3 class="text-lg font-bold text-slate-800 border-b pb-2 flex items-center justify-between">
                                            <span>{{ dependency }}</span>
                                            <span class="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full print:bg-transparent print:p-0">{{ residents.length }} residentes</span>
                                        </h3>
                                    </th>
                                </tr>
                                <tr class="text-slate-500 text-sm border-b border-slate-100">
                                    <th class="py-3 px-4 font-semibold w-1/3">Nome</th>
                                    <th class="py-3 px-4 font-semibold w-1/6">Idade</th>
                                    <th class="py-3 px-4 font-semibold w-1/6">Gênero</th>
                                    <th class="py-3 px-4 font-semibold">Comodidades/Anotações</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-slate-100">
                                <tr v-for="resident in residents" :key="resident.id"
                                    class="hover:bg-slate-50 transition-colors">
                                    <td class="py-3 px-4 text-slate-800 font-medium">
                                        <Link :href="residentsRoutes.show(resident.id).url"
                                            class="hover:text-emerald-600 print:pointer-events-none">
                                            {{ resident.name }}
                                        </Link>
                                    </td>
                                    <td class="py-3 px-4 text-slate-600">
                                        {{ resident.birth_date ? (new Date().getFullYear() - new
                                            Date(resident.birth_date).getFullYear()) + ' anos' : '-' }}
                                    </td>
                                    <td class="py-3 px-4 text-slate-600">{{ resident.gender || '-' }}</td>
                                    <td class="py-3 px-4 text-slate-600 line-clamp-1 max-w-xs truncate"
                                        :title="resident.amenities">{{ resident.amenities || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="Object.keys(props.byDependency).length === 0" class="text-center py-12 text-slate-500">
                    Nenhum residente encontrado.
                </div>
            </div>

            <div v-show="activeTab === 'disease'" class="space-y-12">
                <div v-for="(residents, disease) in props.byDisease" :key="disease"
                    class="card-glass rounded-2xl print:shadow-none print:border-none p-6 print:p-0">
                    <div class="overflow-x-auto print:overflow-visible" v-if="residents.length > 0">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th colspan="4" class="pb-4 font-normal text-left">
                                        <h3 class="text-lg font-bold text-slate-800 border-b pb-2 flex items-center justify-between">
                                            <span>{{ disease }}</span>
                                            <span class="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full print:bg-transparent print:p-0">{{ residents.length }} residentes</span>
                                        </h3>
                                    </th>
                                </tr>
                                <tr class="text-slate-500 text-sm border-b border-slate-100">
                                    <th class="py-3 px-4 font-semibold w-1/3">Nome</th>
                                    <th class="py-3 px-4 font-semibold w-1/6">Idade</th>
                                    <th class="py-3 px-4 font-semibold w-1/6">Grau Dep.</th>
                                    <th class="py-3 px-4 font-semibold">Comodidades/Anotações</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-slate-100">
                                <tr v-for="resident in residents" :key="resident.id"
                                    class="hover:bg-slate-50 transition-colors">
                                    <td class="py-3 px-4 text-slate-800 font-medium">
                                        <Link :href="residentsRoutes.show(resident.id).url"
                                            class="hover:text-emerald-600 print:pointer-events-none">
                                            {{ resident.name }}
                                        </Link>
                                    </td>
                                    <td class="py-3 px-4 text-slate-600">
                                        {{ resident.birth_date ? (new Date().getFullYear() - new
                                            Date(resident.birth_date).getFullYear()) + ' anos' : '-' }}
                                    </td>
                                    <td class="py-3 px-4 text-slate-600">{{ resident.dependency_level ? `Grau
                                        ${resident.dependency_level}` : '-' }}</td>
                                    <td class="py-3 px-4 text-slate-600 line-clamp-1 max-w-xs truncate"
                                        :title="resident.amenities">{{ resident.amenities || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="text-center py-6 text-slate-400 text-sm italic">
                        Nenhum residente nesta categoria.
                    </div>
                </div>
            </div>

        </main>
    </template>
