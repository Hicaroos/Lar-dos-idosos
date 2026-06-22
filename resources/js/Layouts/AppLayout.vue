<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
    <TheHeader />
    <main class="w-full">
        <slot></slot>
    </main>
</template>
