<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = withDefaults(defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'tertiary' | 'outline-green';
    href?: string;
    disabled?: boolean;
}>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
});

const baseClasses = 'inline-flex items-center justify-center px-5 py-2.5 font-medium rounded-lg transition-all shadow-sm gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'primary':
            return 'bg-green-1 text-black hover:bg-[#B4CBC3] hover:shadow-md ';
        case 'secondary':
            return 'bg-slate-600/80 text-white hover:bg-slate-600 hover:shadow-md';
        case 'danger':
            return 'bg-red-700 text-white hover:bg-red-700 hover:shadow-md';
        case 'outline':
            return 'bg-white text-slate-700 hover:bg-slate-200 hover:shadow-md';
        case 'outline-green':
            return 'bg-green-3 border border-green-3 text-white hover:shadow-md';
        case 'tertiary':
            return 'bg-green-2 text-white hover:bg-green-4 shadow-none';
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
