<template>
    <select
        v-model="model"
        class="h-11 bg-green-1 border border-slate-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-slate-300 focus:outline-none text-slate-500"
    >
        <slot></slot>
    </select>
</template>

<script setup lang="ts">
const model = defineModel<string | number | null>();
</script>
