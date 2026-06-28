<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { UserGroupIcon, ClockIcon, DocumentTextIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import NavTabs from '@/components/UI/NavTabs.vue';
import NavTab from '@/components/UI/NavTab.vue';

const page = usePage();
const isResidentDeleted = computed(() => {
    const resident = page.props.resident as { deleted_at?: string } | undefined;
    return !!resident?.deleted_at;
});
</script>

<template>
    <header 
        class="w-auto mx-12 px-8 h-20 flex justify-between items-center card-glass backdrop-blur-md  border border-slate-200/60 shadow-md transition-all duration-300 print:hidden rounded-2xl">


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
        
        <Link href="/logout" method="post" as="button" type="button" class="text-green-2 transition-colors p-2 rounded-full hover:bg-green-1" title="Sair">
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
        </Link>
        </div>
    </header>
</template>
