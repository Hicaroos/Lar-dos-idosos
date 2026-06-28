<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="hidden print:flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
        <div class="text-4xl text-emerald-600 font-signature [-webkit-text-stroke:0.45px_currentColor]">
            Lar do idoso
        </div>
        <div class="text-right">
            <h2 class="text-xl font-bold text-slate-800">
                {{ title }}
            </h2>
            <p class="text-slate-500 text-sm mt-1">Impresso em: {{ new Date().toLocaleDateString('pt-BR') }}</p>
        </div>
    </div>
</template>
