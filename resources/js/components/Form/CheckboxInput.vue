<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    checked: boolean;
    value?: any;
}>();

const emit = defineEmits(['update:checked']);

const proxyChecked = computed({
    get() {
        return props.checked;
    },
    set(val) {
        emit('update:checked', val);
    },
});
</script>

<template>
    <input type="checkbox" :value="value" v-model="proxyChecked"
        class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-5 h-5" />
</template>
