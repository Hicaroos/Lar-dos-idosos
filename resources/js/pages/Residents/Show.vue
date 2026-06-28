<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router } from '@inertiajs/vue3';
import { ArrowLeftIcon, ArrowPathIcon, TrashIcon, PencilIcon, PrinterIcon } from '@heroicons/vue/24/outline';
import residentsRoutes from '@/routes/residents';
import InfoRow from '@/components/DataDisplay/InfoRow.vue';
import Tag from '@/components/Form/Tag.vue';
import DeleteModal from '@/components/Modals/DeleteModal.vue';
import DataTable from '@/components/DataDisplay/DataTable.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import PrintHeader from '@/components/UI/PrintHeader.vue';
import DocumentModal from '@/components/Modals/DocumentModal.vue';

const showDeleteModal = ref(false);
const residentToDelete = ref<number | null>(null);

const openDeleteModal = (id: number) => {
    residentToDelete.value = id;
    showDeleteModal.value = true;
};
const closeDeleteModal = () => {
    showDeleteModal.value = false;
    residentToDelete.value = null;
};
const confirmDelete = () => {
    if (residentToDelete.value !== null) {
        if (props.resident.deleted_at) {
            router.delete(`/residents/${residentToDelete.value}/force`);
        } else {
            router.delete(residentsRoutes.destroy(residentToDelete.value).url);
        }
    }
};
const restoreResident = () => {
    router.post(`/residents/${props.resident.id}/restore`);
};
const goBack = () => {
    if (props.resident.deleted_at) {
        router.visit('/residents?status=history');
    } else {
        router.visit(residentsRoutes.index().url);
    }
};

const showDocumentModal = ref(false);

const documentToDelete = ref<number | null>(null);
const showDeleteDocModal = ref(false);

const openDeleteDocModal = (id: number) => {
    documentToDelete.value = id;
    showDeleteDocModal.value = true;
};
const closeDeleteDocModal = () => {
    showDeleteDocModal.value = false;
    documentToDelete.value = null;
};
const confirmDeleteDoc = () => {
    if (documentToDelete.value !== null) {
        router.delete(`/documents/${documentToDelete.value}`, {
            preserveScroll: true,
            onSuccess: () => closeDeleteDocModal(),
        });
    }
};

const openDoc = (path: string) => window.open(`/storage/${path}`, '_blank');
const downloadDoc = (doc: any) => {
    const a = document.createElement('a');
    a.href = `/storage/${doc.file_path}`;
    a.download = doc.title || 'documento';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

const props = defineProps<{
    resident: {
        id: number;
        registration_number: string;
        admission_date: string;
        photo_path?: string;
        name: string;
        gender: string;
        birth_date: string;
        father_name?: string;
        mother_name?: string;
        blood_type?: string;
        naturalness?: string;
        religion?: string;
        phone_numbers?: string;
        zip_code?: string;
        address?: string;
        address_number?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
        reference_point?: string;
        rg?: string;
        rg_ssp?: string;
        rg_emission?: string;
        cpf?: string;
        birth_certificate?: string;
        birth_certificate_lv?: string;
        birth_certificate_leaves?: string;
        professional_card?: string;
        professional_card_series?: string;
        cns?: string;
        sus_card?: string;
        dependency_level: number;
        is_diabetic: boolean;
        is_hypertensive: boolean;
        is_epileptic: boolean;
        amenities?: string;
        deleted_at?: string;
        documents?: {
            id: number;
            title: string;
            file_path: string;
            file_type: string;
            created_at: string;
        }[];
    };
}>();

const formatDate = (date: string | undefined) => {
    if (!date) return 'Não informado';
    const parts = date.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return date;
};


const window = globalThis.window;
</script>

<template>
    <AppLayout>
        <div class="w-full h-full">
            <main class="w-full bg-slate-100 p-12 flex flex-col gap-8 shadow-sm print:bg-white print:p-0 print:shadow-none print:block">

                <!-- Header só visível na impressão -->
                <PrintHeader title="Prontuário de Residente" />
                
                <header class="flex items-center gap-8 print:gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:shadow-none print:border-none print:p-0 print:mb-2">
                    <img :src="resident.photo_path ? `/storage/${resident.photo_path}` : `https://ui-avatars.com/api/?name=${resident.name}&background=random&color=fff&size=128`"
                        alt="Foto do residente"
                        class="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-sm print:w-16 print:h-16 print:border-2">

                    <div class="w-full flex justify-between items-center">
                        <div>
                            <h2 class="font-bold text-slate-500 uppercase tracking-widest text-xs mb-1">N° do
                                prontuário: {{ resident.registration_number || 'N/A' }}</h2>
                            <h1 class="text-3xl print:text-2xl font-bold text-slate-800 flex items-center gap-3">
                                {{ resident.name }}
                                <Tag v-if="resident.deleted_at" cor="slate" text="No Histórico" class="text-sm" />
                            </h1>
                            <p class="text-slate-500 mt-2 flex items-center gap-2">
                                <span class="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Admitido em: {{ formatDate(resident.admission_date) }}
                                </span>
                            </p>
                        </div>


                        <div class="flex items-center gap-3 print:hidden">
                            <BaseButton variant="outline" @click="goBack">
                                <ArrowLeftIcon class="w-5 h-5" />
                                Voltar
                            </BaseButton>
                            <template v-if="resident.deleted_at">
                                <BaseButton variant="primary" @click="restoreResident">
                                    <ArrowPathIcon class="w-5 h-5" />
                                    Restaurar
                                </BaseButton>
                                <BaseButton variant="danger" @click="openDeleteModal(resident.id)">
                                    <TrashIcon class="w-5 h-5" />
                                    Excluir Definitivamente
                                </BaseButton>
                            </template>
                            <template v-else>
                                <BaseButton variant="primary" :href="residentsRoutes.edit(resident.id).url">
                                    <PencilIcon class="w-5 h-5" />
                                    Editar
                                </BaseButton>
                                <BaseButton variant="danger" @click="openDeleteModal(resident.id)">
                                    <TrashIcon class="w-5 h-5" />
                                    Excluir
                                </BaseButton>
                                <BaseButton variant="secondary" @click="() => window.print()">
                                    <PrinterIcon class="w-5 h-5" />
                                    Imprimir Dados
                                </BaseButton>
                            </template>
                        </div>
                    </div>
                </header>


                <div class="grid grid-cols-2 gap-6 w-full print:grid print:grid-cols-2 print:gap-2">

                    <DataTable>
                        <h2 class="font-bold text-lg mb-6 print:mb-2 text-slate-800 flex items-center gap-2 border-b pb-2 print:pb-1">
                            Dados Pessoais
                        </h2>
                        <div class="space-y-3 print:space-y-1 text-sm">
                            <InfoRow label="Gênero:" :value="resident.gender" />
                            <InfoRow label="Nascimento:" :value="formatDate(resident.birth_date)" />
                            <InfoRow label="Naturalidade:" :value="resident.naturalness" />
                            <InfoRow label="Filiação 1:" :value="resident.mother_name" />
                            <InfoRow label="Filiação 2:" :value="resident.father_name" />
                            <InfoRow label="Religião:" :value="resident.religion" />
                            <InfoRow label="Telefones:" :value="resident.phone_numbers" />
                        </div>
                    </DataTable>


                    <DataTable class="flex flex-col">
                        <h2 class="font-bold text-lg mb-6 print:mb-2 text-slate-800 flex items-center gap-2 border-b pb-2 print:pb-1">
                            Saúde e Dependência
                        </h2>
                        <div class="space-y-3 print:space-y-1 text-sm flex-1 flex flex-col">
                            <InfoRow label="Grau de Dependência:">
                                Grau {{ resident.dependency_level || '-' }}
                            </InfoRow>

                            <InfoRow label="Tipo Sanguíneo:">
                                <template v-if="resident.blood_type">
                                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 text-red-600 font-bold bg-red-50 print:hidden">
                                        {{ resident.blood_type }}
                                    </span>
                                    <span class="hidden print:inline text-slate-800">
                                        {{ resident.blood_type }}
                                    </span>
                                </template>
                                <span v-else>-</span>
                            </InfoRow>

                            <div class="print:mt-1 flex flex-wrap gap-2 font-bold text-sm text-slate-800">
                                <Tag v-if="resident.is_diabetic" cor="emerald" text="Diabético"></Tag>
                                <Tag v-if="resident.is_hypertensive" cor="sky" text="Hipertenso"></Tag>
                                <Tag v-if="resident.is_epileptic" cor="purple" text="Epilético"></Tag>

                                <span
                                    v-if="!resident.is_diabetic && !resident.is_hypertensive && !resident.is_epileptic"
                                    class="text-slate-400 italic font-normal">Sem comorbidades registradas</span>
                            </div>

                            <div class="pt-4 print:mt-1 print:pt-1" v-if="resident.amenities">
                                <span class="text-slate-500 block mb-1">Observações / Comodidades:</span>
                                <p class="text-slate-800">{{ resident.amenities }}</p>
                            </div>
                            
                            <div class="mt-auto pt-4 print:hidden">
                                <BaseButton variant="primary" :href="`/residents/${resident.id}/medications`" class="w-full">
                                    Ver medicamentos
                                </BaseButton>
                            </div>
                        </div>
                    </DataTable>


                    <DataTable class="print:col-span-2">
                        <h2 class="font-bold text-lg mb-6 print:mb-2 text-slate-800 flex items-center gap-2 border-b pb-2 print:pb-1">
                            Documentação
                        </h2>
                        <div class="space-y-3 print:space-y-1 text-sm">
                            <InfoRow label="CPF:" :value="resident.cpf" />
                            <InfoRow label="RG:">
                                {{ resident.rg || '-' }} {{ resident.rg_ssp ? `(${resident.rg_ssp})` : '' }}
                            </InfoRow>
                            <InfoRow label="Emissão do RG:" :value="formatDate(resident.rg_emission)" />
                            <InfoRow label="Cartão SUS:" :value="resident.sus_card" />
                            <InfoRow label="CNS:" :value="resident.cns" />
                            <InfoRow label="Cart. Profissional:">
                                {{ resident.professional_card || '-' }} {{ resident.professional_card_series ? `(Série:
                                ${resident.professional_card_series})` : '' }}
                            </InfoRow>

                            <div class="pt-2 mt-2 print:pt-1 print:mt-1 border-t border-slate-50">
                                <span class="text-slate-500 block mb-2">Certidão de Nascimento:</span>
                                <div class="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded">
                                    <div><span class="text-xs text-slate-400 block">Número</span> <span
                                            class="font-medium text-slate-800">{{ resident.birth_certificate || '-'
                                            }}</span></div>
                                    <div><span class="text-xs text-slate-400 block">Livro</span> <span
                                            class="font-medium text-slate-800">{{ resident.birth_certificate_lv || '-'
                                            }}</span></div>
                                    <div><span class="text-xs text-slate-400 block">Folha</span> <span
                                            class="font-medium text-slate-800">{{ resident.birth_certificate_leaves ||
                                                '-' }}</span></div>
                                </div>
                            </div>
                        </div>
                    </DataTable>


                    <DataTable class="print:col-span-2">
                        <h2 class="font-bold text-lg mb-6 print:mb-2 text-slate-800 flex items-center gap-2 border-b pb-2 print:pb-1">
                            Endereço de Origem
                        </h2>
                        <div class="space-y-3 print:space-y-1 text-sm">
                            <InfoRow label="CEP:" :value="resident.zip_code" />
                            <InfoRow label="Endereço:">
                                {{ resident.address || '-' }}, nº {{ resident.address_number || 'S/N' }}
                            </InfoRow>
                            <InfoRow label="Bairro:" :value="resident.neighborhood" />
                            <InfoRow label="Cidade/UF:">
                                {{ resident.city || '-' }} / {{ resident.state || '-' }}
                            </InfoRow>
                            <div class="mt-2 pt-2 print:mt-1 print:pt-1 border-t border-slate-50 flex flex-col">
                                <span class="text-slate-500">Ponto de Referência:</span>
                                <span class="font-medium text-slate-800 mt-1">
                                    {{ resident.reference_point || 'Não informado' }}
                                </span>
                            </div>
                        </div>
                    </DataTable>
                    

                    <div class="col-span-2 print:hidden">
                        <DataTable>
                            <div class="flex justify-between items-center mb-6 border-b pb-2">
                                <h2 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                                    Documentos Anexados
                                </h2>
                                <BaseButton v-if="!resident.deleted_at" variant="primary" @click="showDocumentModal = true" class="text-sm py-1.5 px-3">
                                    Anexar Documento
                                </BaseButton>
                            </div>
                            
                            <div v-if="resident.documents && resident.documents.length > 0" class="grid grid-cols-2 gap-4">
                                <div v-for="doc in resident.documents" :key="doc.id" class="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                                    <div class="flex items-center gap-4">

                                        <div>
                                            <h4 class="font-bold text-slate-700">{{ doc.title }}</h4>
                                            <p class="text-xs text-slate-500 mt-1">Anexado em {{ formatDate(doc.created_at?.split('T')[0]) }}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <BaseButton @click="openDoc(doc.file_path)" variant="secondary" class="!px-3 !py-2 !text-xs uppercase tracking-wider font-bold">
                                            Acessar
                                        </BaseButton>
                                        <BaseButton @click="downloadDoc(doc)" variant="primary" class="!px-3 !py-2 !text-xs uppercase tracking-wider font-bold">
                                            Baixar
                                        </BaseButton>
                                        <BaseButton v-if="!resident.deleted_at" @click="openDeleteDocModal(doc.id)" variant="danger" class="!px-3 !py-2 !text-xs uppercase tracking-wider font-bold">
                                            Excluir
                                        </BaseButton>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-center py-8 text-slate-500 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
                                <svg class="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Nenhum documento foi anexado a este residente.
                            </div>
                        </DataTable>
                    </div>
                </div>

            </main>
        </div>


        <DeleteModal :show="showDeleteModal" :title="resident.deleted_at ? 'Excluir Definitivamente?' : 'Excluir Residente?'"
            :message="resident.deleted_at ? 'Você está prestes a excluir todos os dados deste residente permanentemente. Esta ação não pode ser desfeita.' : 'Você está prestes a excluir todos os dados deste residente.'" @close="closeDeleteModal"
            @confirm="confirmDelete" />

        <DeleteModal :show="showDeleteDocModal" title="Excluir Documento?"
            message="Tem certeza que deseja excluir este documento? O arquivo será removido permanentemente." @close="closeDeleteDocModal"
            @confirm="confirmDeleteDoc" />
            
        <DocumentModal :show="showDocumentModal" :resident-id="resident.id" @close="showDocumentModal = false" />
    </AppLayout>
</template>
