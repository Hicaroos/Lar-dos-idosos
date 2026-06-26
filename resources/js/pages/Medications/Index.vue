<script setup lang="ts">
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import { SunIcon, MoonIcon, PlusIcon } from '@heroicons/vue/24/outline';
import MedicationTable from '@/components/DataDisplay/MedicationTable.vue';
import MedicationModal from '@/components/Modals/MedicationModal.vue';
import DeleteModal from '@/components/Modals/DeleteModal.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import medicationsRoutes from '@/routes/medications';
import Tag from '@/components/Form/Tag.vue';

const props = defineProps<{
    resident: any;
}>();


const morningMedications = computed(() => props.resident.medications.filter((med: any) => med.shift === 'Manhã'));
const afternoonMedications = computed(() => props.resident.medications.filter((med: any) => med.shift === 'Tarde'));
const nightMedications = computed(() => props.resident.medications.filter((med: any) => med.shift === 'Noite'));


const isModalOpen = ref(false);
const editingMedication = ref<any>(null);

const openCreateModal = () => {
    editingMedication.value = null;
    isModalOpen.value = true;
};

const openEditModal = (medication: any) => {
    editingMedication.value = medication;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(() => editingMedication.value = null, 300); 
};

const isDeleteModalOpen = ref(false);
const medicationToDelete = ref<number | null>(null);

const confirmDelete = (medicationId: number) => {
    medicationToDelete.value = medicationId;
    isDeleteModalOpen.value = true;
};

const executeDelete = () => {
    if (medicationToDelete.value) {
        router.delete(medicationsRoutes.destroy(medicationToDelete.value).url, {
            onSuccess: () => {
                isDeleteModalOpen.value = false;
                medicationToDelete.value = null;
            }
        });
    }
};
const window = globalThis.window;
</script>

<template>
    <AppLayout>
        <div class="max-w-7xl mx-auto p-10 print:p-0 print:max-w-none">
            <header class="flex justify-between items-center mb-8 print:mb-4">
                <div>
                    <h1 class="text-3xl font-bold text-slate-800">Prontuário de Medicamentos</h1>
                    <p class="text-slate-500 mt-1">Gerenciamento de receitas do(a) <span
                            class="font-bold text-slate-700">{{ resident.name }}</span>

                        <Tag v-if="resident.deleted_at" cor="slate" text="No Histórico" class="text-xs w-40 inline-block mx-5 text-center"></Tag>
                    </p>
                </div>
                <div class="flex items-center gap-3 print:hidden">
                    <BaseButton v-if="!resident.deleted_at" variant="primary" @click="openCreateModal">
                        <PlusIcon class="w-5 h-5" />
                        Adicionar Receita
                    </BaseButton>
                    <BaseButton variant="outline" :href="`/residents/${resident.id}`">
                        Voltar para o Perfil
                    </BaseButton>
                    <BaseButton variant="outline" @click="() => window.print()">
                        Imprimir Receitas
                    </BaseButton>
                </div>
            </header>

            <div class="grid grid-cols-1 gap-8">
                <MedicationTable title="Manhã" theme="emerald" :readonly="!!resident.deleted_at" :medications="morningMedications" @edit="openEditModal"
                    @delete="confirmDelete">
                    <template #icon>
                        <SunIcon class="w-6 h-6" />
                    </template>
                </MedicationTable>

                <MedicationTable title="Tarde" theme="sky" :readonly="!!resident.deleted_at" :medications="afternoonMedications" @edit="openEditModal"
                    @delete="confirmDelete">
                    <template #icon>
                        <SunIcon class="w-6 h-6" />
                    </template>
                </MedicationTable>

                <MedicationTable title="Noite" theme="purple" :readonly="!!resident.deleted_at" :medications="nightMedications" @edit="openEditModal"
                    @delete="confirmDelete">
                    <template #icon>
                        <MoonIcon class="w-6 h-6" />
                    </template>
                </MedicationTable>
            </div>
        </div>

        <MedicationModal :show="isModalOpen" :resident-id="resident.id" :medication="editingMedication"
            @close="closeModal" />

        <DeleteModal :show="isDeleteModalOpen" title="Excluir Receita?"
            message="Tem certeza que deseja remover este medicamento do prontuário? Esta ação não pode ser desfeita."
            @close="isDeleteModalOpen = false" @confirm="executeDelete" />
    </AppLayout>
</template>
