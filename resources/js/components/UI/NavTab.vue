<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    active?: boolean;
    href?: string;
    as?: string | object;
}>();
</script>

<template>
    <component 
        :is="href ? Link : (as || 'button')" 
        :href="href"
        :data-active="active"
        :class="[
            active 
                ? 'text-green-2 font-semibold' 
                : 'text-slate-500 hover:text-green-2 hover:bg-emerald-50/30 font-medium', 
            'relative flex items-center justify-center gap-2 px-5 py-2 rounded-full text-sm transition-colors duration-300 whitespace-nowrap'
        ]">
        <slot />
    </component>
</template>
