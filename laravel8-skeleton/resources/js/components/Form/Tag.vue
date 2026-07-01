<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    cor: string;
    text: string;
}>();

const colors = {
    purple: "bg-[#9B59A5] text-white shadow-sm print:bg-white print:text-slate-900 print:border print:border-slate-400 print:shadow-none",
    violet: "bg-[#7559A5] text-white shadow-sm print:bg-white print:text-slate-900 print:border print:border-slate-400 print:shadow-none",
    indigo: "bg-[#5963A5] text-white shadow-sm print:bg-white print:text-slate-900 print:border print:border-slate-400 print:shadow-none",
    slate: "bg-[#E2E8F0] text-[#475569] border border-slate-300/50 shadow-sm print:bg-white print:text-slate-900 print:border-slate-400 print:shadow-none",
}

const classColor = computed(() => colors[props.cor as keyof typeof colors] || colors.slate);


</script>

<template>
    <div
        :class="['flex items-center justify-center px-4 rounded-full py-1.5 transition duration-300 ease-in-out hover:scale-105', classColor]">
        {{ text }}
    </div>
</template>