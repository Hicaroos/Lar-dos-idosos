<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    cor: string;
    text: string;
}>();

const colors = {
    purple: "bg-purple-300",
    emerald: "bg-emerald-400/70",
    sky: "bg-sky-300/70",
}

const classColor = computed(() => colors[props.cor as keyof typeof colors] || "bg-slate-200");


</script>

<template>
    <div
        :class="['flex items-center justify-center px-4 rounded-full py-1.5 transition duration-300 ease-in-out hover:scale-105', classColor]">
        {{ text }}
    </div>
</template>