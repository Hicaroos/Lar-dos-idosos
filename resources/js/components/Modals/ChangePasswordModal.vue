<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import TextInput from '@/components/Form/TextInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import { ref } from 'vue';

const props = defineProps<{
    show: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const passwordInput = ref<{ focus: () => void } | null>(null);

const closeModal = () => {
    emit('close');
    form.reset();
    form.clearErrors();
};

const updatePassword = () => {
    form.put('/password', {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value?.focus();
            }
        },
    });
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

        <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all relative z-10 text-left">
            <div class="flex items-start justify-between mb-6">
                <h3 class="text-xl font-bold text-slate-800">
                    Trocar Senha
                </h3>
                <button
                    type="button"
                    class="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none"
                    @click="closeModal"
                >
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            
            <form @submit.prevent="updatePassword" class="space-y-4">
                <div>
                    <label for="current_password" class="block text-sm font-medium text-slate-700 mb-1">Senha Atual</label>
                    <TextInput
                        id="current_password"
                        type="password"
                        v-model="form.current_password"
                        required
                    />
                    <div v-if="form.errors.current_password" class="text-sm text-red-600 mt-2">
                        {{ form.errors.current_password }}
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-slate-700 mb-1">Nova Senha</label>
                    <TextInput
                        id="password"
                        ref="passwordInput"
                        type="password"
                        v-model="form.password"
                        required
                    />
                    <div v-if="form.errors.password" class="text-sm text-red-600 mt-2">
                        {{ form.errors.password }}
                    </div>
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-slate-700 mb-1">Confirmar Nova Senha</label>
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        v-model="form.password_confirmation"
                        required
                    />
                    <div v-if="form.errors.password_confirmation" class="text-sm text-red-600 mt-2">
                        {{ form.errors.password_confirmation }}
                    </div>
                </div>

                <div class="mt-6 flex gap-4 justify-end">
                    <BaseButton
                        type="button"
                        variant="secondary"
                        @click="closeModal"
                    >
                        Cancelar
                    </BaseButton>
                    <BaseButton
                        type="submit"
                        variant="tertiary"
                        :disabled="form.processing"
                    >
                        Salvar Senha
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>
