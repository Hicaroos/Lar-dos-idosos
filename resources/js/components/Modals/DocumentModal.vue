<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import BaseButton from '@/components/UI/BaseButton.vue';
import TextInput from '@/components/Form/TextInput.vue';
import InputLabel from '@/components/Form/InputLabel.vue';
import InputError from '@/components/Form/InputError.vue';

const props = defineProps<{
    show: boolean;
    residentId: number;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const form = useForm({
    resident_id: props.residentId,
    title: '',
    file_path: null as File | null,
});

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        form.file_path = target.files[0];
    }
};

const submit = () => {
    form.post('/documents', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            emit('close');
        },
    });
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

        <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all relative z-10">
            <h3 class="text-xl font-bold text-slate-800 mb-6">Anexar Documento</h3>
            
            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <InputLabel for="title" value="Título do Documento" />
                    <TextInput id="title" type="text" class="mt-1 block w-full" v-model="form.title" required />
                    <InputError class="mt-2" :message="form.errors.title" />
                </div>
                
                <div>
                    <InputLabel for="file_path" value="Arquivo" />
                    <input id="file_path" type="file" @change="handleFileChange" class="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                    <InputError class="mt-2" :message="form.errors.file_path" />
                </div>

                <div class="flex gap-4 justify-end mt-8">
                    <BaseButton variant="outline" type="button" @click="$emit('close')">
                        Cancelar
                    </BaseButton>
                    <BaseButton variant="primary" type="submit" :disabled="form.processing">
                        Salvar
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>
