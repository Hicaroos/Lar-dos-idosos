<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
    <!-- O Header fixo no topo de todas as páginas -->
    <TheHeader />

    <!-- Aqui é onde o conteúdo das páginas (Index, Show) será injetado -->
    <main class="w-full">
        <slot />
    </main>
</template>
