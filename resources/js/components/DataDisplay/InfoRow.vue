<script setup lang="ts">
defineProps<{
    label: string;
    value?: string | number | null;
}>();
</script>

<template>
    <div class="flex justify-between items-start gap-4 break-all">
        <span class="text-slate-500 whitespace-nowrap">{{ label }}</span>
        <span class="font-medium text-slate-800 text-right ">
            <slot>{{ value || '-' }}</slot>
        </span>
    </div>
</template>
