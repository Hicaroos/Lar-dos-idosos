<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
    <div class="min-h-screen bg-cover bg-center bg-fixed pt-4" style="background-image: url('/images/bg-login.jpg')">
        <TheHeader />
        <main class="w-full">
            <slot></slot>
        </main>
    </div>
</template>
