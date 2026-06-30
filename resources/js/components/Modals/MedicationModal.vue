<script setup lang="ts">
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import medicationsRoutes from '@/routes/medications';
import residentMedicationsRoutes from '@/routes/residents/medications';
import BaseButton from '@/components/UI/BaseButton.vue';

const props = defineProps<{
    show: boolean;
    residentId: number;
    medication?: any; 
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const isEditing = ref(false);

const form = useForm({
    name: '',
    dose: '',
    time: '',
    shift: 'Manhã',
});

watch(() => props.show, (newShow) => {
    if (newShow) {
        if (props.medication) {
            isEditing.value = true;
            form.name = props.medication.name;
            form.dose = props.medication.dose;
            form.time = props.medication.time;
            form.shift = props.medication.shift;
        } else {
            isEditing.value = false;
            form.name = '';
            form.dose = '';
            form.time = '';
            form.shift = 'Manhã';
            form.clearErrors();
        }
        form.clearErrors();
    }
});

const submit = () => {
    if (isEditing.value && props.medication) {
        form.put(medicationsRoutes.update(props.medication.id).url, {
            onSuccess: () => {
                form.reset();
                emit('close');
            },
        });
    } else {
        form.post(residentMedicationsRoutes.store(props.residentId).url, {
            onSuccess: () => {
                form.reset();
                emit('close');
            },
        });
    }
};

const close = () => {
    emit('close');
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="close"></div>


        <div class="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all relative z-10">
            <h3 class="text-2xl font-bold text-slate-800 mb-6">
                {{ isEditing ? 'Editar Medicamento' : 'Nova Receita' }}
            </h3>

            <form @submit.prevent="submit" class="space-y-5">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Nome do Medicamento</label>
                    <input type="text" v-model="form.name" required
                        class="w-full border-slate-300 rounded-lg px-4 py-2.5 bg-slate-50 border focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                        placeholder="Ex: Losartana 50mg" />
                    <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">{{ form.errors.name }}</div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Dosagem</label>
                        <input type="text" v-model="form.dose" required
                            class="w-full border-slate-300 rounded-lg px-4 py-2.5 bg-slate-50 border focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                            placeholder="Ex: 1 Comprimido" />
                        <div v-if="form.errors.dose" class="text-red-500 text-sm mt-1">{{ form.errors.dose }}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Horário</label>
                        <input type="time" v-model="form.time" required
                            class="w-full border-slate-300 rounded-lg px-4 py-2.5 bg-slate-50 border focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
                        <div v-if="form.errors.time" class="text-red-500 text-sm mt-1">{{ form.errors.time }}</div>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Turno</label>
                    <select v-model="form.shift" required
                        class="w-full border-slate-300 rounded-lg px-4 py-2.5 bg-slate-50 border focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors">
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                    </select>
                    <div v-if="form.errors.shift" class="text-red-500 text-sm mt-1">{{ form.errors.shift }}</div>
                </div>

                <div class="flex gap-4 pt-4">
                    <BaseButton variant="secondary" type="button" @click="close" class="flex-1">
                        Cancelar
                    </BaseButton>
                    <BaseButton variant="tertiary" type="submit" :disabled="form.processing" class="flex-1">
                        {{ isEditing ? 'Salvar Alterações' : 'Adicionar Receita' }}
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>
