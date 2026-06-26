<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = withDefaults(defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'outline-emerald';
    href?: string;
    disabled?: boolean;
}>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
});

const baseClasses = 'inline-flex items-center justify-center px-5 py-2.5 font-medium rounded-lg transition-all shadow-sm gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'primary':
            return 'bg-emerald-600/80 text-white hover:bg-emerald-700 focus:ring-emerald-500 hover:shadow-md';
        case 'secondary':
            return 'bg-slate-500/70 text-white hover:bg-slate-600 focus:ring-slate-500 hover:shadow-md';
        case 'danger':
            return 'bg-red-500 text-white hover:bg-red-700 focus:ring-red-500 hover:shadow-md';
        case 'outline':
            return 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-200 focus:ring-slate-300 hover:shadow-md';
        case 'outline-emerald':
            return 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-emerald-600/80 hover:text-white hover:border-emerald-600/80 focus:ring-emerald-300 hover:shadow-md';
        case 'ghost':
            return 'bg-transparent text-slate-600 hover:bg-slate-100 shadow-none focus:ring-slate-200';
        default:
            return '';
    }
});
</script>

<template>
    <Link v-if="href" :href="href" :class="[baseClasses, variantClasses]">
        <slot />
    </Link>

    <button v-else :type="type" :disabled="disabled" :class="[baseClasses, variantClasses]">
        <slot />
    </button>
</template>
