<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import BaseButton from '@/components/UI/BaseButton.vue';
import TextInput from '@/components/Form/TextInput.vue';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post('/login');
};
</script>

<template>

    <Head title="Login" />

    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-100 bg-cover bg-center" style="background-image: url('/images/bg-login.jpg')">
        <div
            class="w-full sm:max-w-md mt-6 card-glass rounded-2xl shadow-xl px-6 py-8 overflow-hidden">
            <div class="mb-8 text-center">
                <h1 class="text-[54px] text-green-2 font-signature [-webkit-text-stroke:0.45px_currentColor]">Lar do
                    idoso</h1>
            </div>

            <form @submit.prevent="submit">
                <div>
                    <TextInput id="password" type="password" placeholder="senha"
                        class="mt-1 block w-full border border-1"
                        v-model="form.password" required autofocus autocomplete="current-password" />
                    <div v-if="form.errors.password" class="text-sm text-red-600 mt-2">
                        {{ form.errors.password }}
                    </div>
                </div>

                <div class="flex items-center justify-end mt-6">
                    <BaseButton type="submit" variant="tertiary" class="w-full justify-center"
                        :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Entrar
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>
