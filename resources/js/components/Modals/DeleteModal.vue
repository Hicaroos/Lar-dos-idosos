<script setup lang="ts">
defineProps<{
    show: boolean;
    title?: string;
    message?: string;
}>();

defineEmits<{
    (e: 'close'): void;
    (e: 'confirm'): void;
}>();
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

        <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all relative z-10">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6 mx-auto">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                    </path>
                </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 text-center mb-3">{{ title || 'Excluir?' }}</h3>
            <p class="text-slate-500 text-center mb-8 leading-relaxed">
                {{ message || 'Tem certeza que deseja excluir este item?' }}
            </p>
            <div class="flex gap-4 justify-center">
                <button @click="$emit('close')"
                    class="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                    Cancelar
                </button>
                <button @click="$emit('confirm')"
                    class="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm hover:shadow-md">
                    Sim, Excluir
                </button>
            </div>
        </div>
    </div>
</template>
