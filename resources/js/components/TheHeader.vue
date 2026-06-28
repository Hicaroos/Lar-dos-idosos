<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { UserGroupIcon, ClockIcon, DocumentTextIcon, ArrowRightOnRectangleIcon, KeyIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import NavTabs from '@/components/UI/NavTabs.vue';
import NavTab from '@/components/UI/NavTab.vue';
import ChangePasswordModal from '@/components/Modals/ChangePasswordModal.vue';

const page = usePage();
const isResidentDeleted = computed(() => {
    const resident = page.props.resident as { deleted_at?: string } | undefined;
    return !!resident?.deleted_at;
});

const isPasswordModalOpen = ref(false);
const isDropdownOpen = ref(false);
</script>

<template>
    <header 
        class="relative z-50 w-auto mx-12 px-8 h-20 flex justify-between items-center card-glass backdrop-blur-md  border border-slate-200/60 shadow-md transition-all duration-300 print:hidden rounded-2xl">


        <div class="text-4xl text-green-2 font-signature [-webkit-text-stroke:0.45px_currentColor]">
            <h1>Lar do idoso</h1>
        </div>



        <div class="flex items-center gap-4">
            <NavTabs>
                <NavTab href="/residents" :active="$page.url.startsWith('/residents') && !$page.url.includes('status=history') && !isResidentDeleted">
                    <UserGroupIcon class="w-4 h-4" />
                    Residentes
                </NavTab>
                <NavTab href="/residents?status=history" :active="$page.url.includes('status=history') || isResidentDeleted">
                    <ClockIcon class="w-4 h-4" />
                    Histórico
                </NavTab>
                <NavTab href="/reports" :active="$page.url.startsWith('/reports')">
                    <DocumentTextIcon class="w-4 h-4" />
                    Relatórios
                </NavTab>
            </NavTabs>
        
            <div class="relative ml-4">
                <button @click="isDropdownOpen = !isDropdownOpen" type="button" class="text-green-2 transition-colors p-2 rounded-full hover:bg-green-1" title="Configurações">
                    <Cog6ToothIcon class="w-5 h-5" />
                </button>

                <div v-if="isDropdownOpen" class="fixed inset-0 z-40" @click="isDropdownOpen = false"></div>

                <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-green-50 backdrop-blur-md rounded-xl shadow-lg py-2 z-50 overflow-hidden border border-emerald-100/50">
                    <button @click="isPasswordModalOpen = true; isDropdownOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-white/50 hover:text-green-2 flex items-center gap-2 transition-colors">
                        <KeyIcon class="w-4 h-4" />
                        Trocar Senha
                    </button>
                    <Link href="/logout" method="post" as="button" type="button" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 flex items-center gap-2 transition-colors">
                        <ArrowRightOnRectangleIcon class="w-4 h-4" />
                        Sair
                    </Link>
                </div>
            </div>
        </div>
    </header>

    <ChangePasswordModal :show="isPasswordModalOpen" @close="isPasswordModalOpen = false" />
</template>
