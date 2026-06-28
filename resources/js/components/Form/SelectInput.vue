<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
    modelValue: string | number | null;
}>();

defineEmits(['update:modelValue']);

const select = ref<HTMLSelectElement | null>(null);

onMounted(() => {
    if (select.value?.hasAttribute('autofocus')) {
        select.value.focus();
    }
});

defineExpose({ focus: () => select.value?.focus() });
</script>

<template>
    <select ref="select" :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        class="h-10 w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
        <slot />
    </select>
</template>
