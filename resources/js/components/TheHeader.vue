<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <header class="bg-white shadow-md w-full py-4 px-8 flex justify-between items-center">
        <div class="text-2xl font-bold text-slate-800">
            <h1>Lar dos idosos</h1>
        </div>

        <nav class="flex gap-6">
            <Link href="/residents" class="text-slate-600 font-medium">
                Residentes
            </Link>
        </nav>
    </header>
</template>
