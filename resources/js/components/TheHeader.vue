<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { UserGroupIcon, ClockIcon, BellIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <header
        class="w-full py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/60 shadow-sm transition-all duration-300">


        <div class="text-4xl text-emerald-600 font-signature [-webkit-text-stroke:0.45px_currentColor]">
            <h1>Lar dos idosos</h1>
        </div>



        <nav class="flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/50">
            <Link href="/residents"
                class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5">
                <UserGroupIcon class="w-4 h-4" />
                Residentes
            </Link>
            <Link href="/residents"
                class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-all duration-300">
                <ClockIcon class="w-4 h-4" />
                Histórico
            </Link>
        </nav>
    </header>
</template>
