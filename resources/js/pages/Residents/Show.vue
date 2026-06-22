<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router } from '@inertiajs/vue3';
import residentsRoutes from '@/routes/residents';
import InfoRow from '@/components/DataDisplay/InfoRow.vue';
import Tag from '@/components/Form/Tag.vue';
import DeleteModal from '@/components/Modals/DeleteModal.vue';
import DataTable from '@/components/DataDisplay/DataTable.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

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
        router.delete(residentsRoutes.destroy(residentToDelete.value).url);
    }
};
const goBack = () => {
    const url = sessionStorage.getItem('residents_index_url') || residentsRoutes.index().url;
    router.visit(url);
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
        parentage?: string;
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

</script>

<template>
    <AppLayout>
        <div class="w-full h-full">
            <main class="w-full bg-slate-100 p-10 flex flex-col gap-8 shadow-sm">


                <header class="flex items-center gap-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <img :src="resident.photo_path ? `/storage/${resident.photo_path}` : `https://ui-avatars.com/api/?name=${resident.name}&background=random&color=fff&size=128`"
                        alt="Foto do residente"
                        class="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-sm">

                    <div class="w-full flex justify-between items-center">
                        <div>
                            <h2 class="font-bold text-slate-500 uppercase tracking-widest text-xs mb-1">N° do
                                prontuário: {{ resident.registration_number || 'N/A' }}</h2>
                            <h1 class="text-3xl font-bold text-slate-800">{{ resident.name }}</h1>
                            <p class="text-slate-500 mt-2 flex items-center gap-2">
                                <span class="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Admitido em: {{ formatDate(resident.admission_date) }}
                                </span>
                            </p>
                        </div>


                        <div class="flex items-center gap-3">
                            <BaseButton variant="secondary" @click="goBack">
                                Voltar
                            </BaseButton>
                            <BaseButton variant="primary" :href="residentsRoutes.edit(resident.id).url">
                                Editar
                            </BaseButton>
                            <BaseButton variant="danger" @click="openDeleteModal(resident.id)">
                                Excluir
                            </BaseButton>
                        </div>
                    </div>
                </header>


                <div class="grid grid-cols-2 gap-6 w-full">

                    <DataTable>
                        <h2 class="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2 border-b pb-2">
                            Dados Pessoais
                        </h2>
                        <div class="space-y-3 text-sm">
                            <InfoRow label="Gênero:" :value="resident.gender" />
                            <InfoRow label="Nascimento:" :value="formatDate(resident.birth_date)" />
                            <InfoRow label="Naturalidade:" :value="resident.naturalness" />
                            <InfoRow label="Filiação:" :value="resident.parentage" />
                            <InfoRow label="Religião:" :value="resident.religion" />
                            <InfoRow label="Telefones:" :value="resident.phone_numbers" />
                        </div>
                    </DataTable>


                    <DataTable>
                        <h2 class="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2 border-b pb-2">
                            Saúde e Dependência
                        </h2>
                        <div class="space-y-3 text-sm">
                            <InfoRow label="Grau de Dependência:">
                                Grau {{ resident.dependency_level || '-' }}
                            </InfoRow>

                            <div class="mt-4 flex flex-wrap gap-2 font-bold text-sm text-slate-800">
                                <Tag v-if="resident.is_diabetic" cor="emerald" text="Diabético"></Tag>
                                <Tag v-if="resident.is_hypertensive" cor="sky" text="Hipertenso"></Tag>
                                <Tag v-if="resident.is_epileptic" cor="purple" text="Epilético"></Tag>

                                <span
                                    v-if="!resident.is_diabetic && !resident.is_hypertensive && !resident.is_epileptic"
                                    class="text-slate-400 italic font-normal">Sem comorbidades registradas</span>
                            </div>

                            <div class="mt-4 pt-4 border-t border-slate-100" v-if="resident.amenities">
                                <span class="text-slate-500 block mb-1">Observações / Comodidades:</span>
                                <p class="text-slate-800">{{ resident.amenities }}</p>
                            </div>
                            <Link :href="`/residents/${resident.id}/medications`"
                                class="px-6 py-2.5 bg-emerald-600/80 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm flex items-center justify-center fgap-2">
                                Ver medicamentos
                            </Link>
                        </div>
                    </DataTable>


                    <DataTable>
                        <h2 class="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2 border-b pb-2">
                            Documentação
                        </h2>
                        <div class="space-y-3 text-sm">
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

                            <div class="pt-2 mt-2 border-t border-slate-50">
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


                    <DataTable>
                        <h2 class="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2 border-b pb-2">
                            Endereço de Origem
                        </h2>
                        <div class="space-y-3 text-sm">
                            <InfoRow label="CEP:" :value="resident.zip_code" />
                            <InfoRow label="Endereço:">
                                {{ resident.address || '-' }}, nº {{ resident.address_number || 'S/N' }}
                            </InfoRow>
                            <InfoRow label="Bairro:" :value="resident.neighborhood" />
                            <InfoRow label="Cidade/UF:">
                                {{ resident.city || '-' }} / {{ resident.state || '-' }}
                            </InfoRow>
                            <div class="mt-2 pt-2 border-t border-slate-50 flex flex-col">
                                <span class="text-slate-500">Ponto de Referência:</span>
                                <span class="font-medium text-slate-800 mt-1">
                                    {{ resident.reference_point || 'Não informado' }}
                                </span>
                            </div>
                        </div>
                    </DataTable>
                </div>

            </main>
        </div>


        <DeleteModal :show="showDeleteModal" title="Excluir Residente?"
            message="Você está prestes a excluir todos os dados deste residente." @close="closeDeleteModal"
            @confirm="confirmDelete" />
    </AppLayout>
</template>
