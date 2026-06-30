<script setup lang="ts">
import InputLabel from '@/components/Form/InputLabel.vue';
import TextInput from '@/components/Form/TextInput.vue';
import SelectInput from '@/components/Form/SelectInput.vue';
import InputError from '@/components/Form/InputError.vue';
import CheckboxInput from '@/components/Form/CheckboxInput.vue';

import { useForm, Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';

defineOptions({ layout: AppLayout });
import residentsRoutes from '@/routes/residents';
import BaseButton from '@/components/UI/BaseButton.vue';
import { XMarkIcon, CheckIcon, ArrowPathIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
    resident: any;
}>();

const todayDate = new Date().toISOString().split('T')[0];

const form = useForm({
    registration_number: props.resident.registration_number || '',
    admission_date: props.resident.admission_date || '',
    photo_path: null as File | null,
    name: props.resident.name || '',
    gender: props.resident.gender || '',
    birth_date: props.resident.birth_date || '',
    father_name: props.resident.father_name || '',
    mother_name: props.resident.mother_name || '',
    blood_type: props.resident.blood_type || '',
    naturalness: props.resident.naturalness || '',
    religion: props.resident.religion || '',
    phone_numbers: props.resident.phone_numbers || '',
    zip_code: props.resident.zip_code || '',
    address: props.resident.address || '',
    address_number: props.resident.address_number || '',
    neighborhood: props.resident.neighborhood || '',
    city: props.resident.city || '',
    state: props.resident.state || '',
    reference_point: props.resident.reference_point || '',
    rg: props.resident.rg || '',
    rg_ssp: props.resident.rg_ssp || '',
    rg_emission: props.resident.rg_emission || '',
    cpf: props.resident.cpf || '',
    birth_certificate: props.resident.birth_certificate || '',
    birth_certificate_lv: props.resident.birth_certificate_lv || '',
    birth_certificate_leaves: props.resident.birth_certificate_leaves || '',
    professional_card: props.resident.professional_card || '',
    professional_card_series: props.resident.professional_card_series || '',
    cns: props.resident.cns || '',
    sus_card: props.resident.sus_card || '',
    dependency_level: props.resident.dependency_level || '',
    is_diabetic: !!props.resident.is_diabetic,
    is_hypertensive: !!props.resident.is_hypertensive,
    is_epileptic: !!props.resident.is_epileptic,
    amenities: props.resident.amenities || '',
});

const submit = () => {
    form.transform((data) => ({
        ...data,
        _method: 'put',
    })).post(residentsRoutes.update(props.resident.id).url, {
        forceFormData: true,
        replace: true,
    });
};

const handlePhotoUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        form.photo_path = input.files[0];
    }
};

const goBack = () => {
    router.visit(residentsRoutes.show(props.resident.id).url);
};

const deletePhoto = () => {
    if (confirm('Tem certeza que deseja excluir a foto atual?')) {
        router.delete(`/residents/${props.resident.id}/photo`, {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    
        <form @submit.prevent="submit" class="w-full p-12 pt-8 flex flex-col gap-8">

            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-emerald-950 drop-shadow-sm">Editar Residente</h1>
                    <p class="text-slate-900 font-medium mt-1 drop-shadow-sm">Atualize as informações do idoso matriculado.</p>
                </div>
                <div class="flex gap-4">
                    <BaseButton variant="primary" type="button" @click="goBack">
                        <XMarkIcon class="w-5 h-5" />
                        Cancelar
                    </BaseButton>
                    <BaseButton variant="secondary" type="submit" :disabled="form.processing">
                        <template v-if="form.processing">
                            <ArrowPathIcon class="w-5 h-5 animate-spin" />
                            <span>Salvando...</span>
                        </template>
                        <template v-else>
                            <CheckIcon class="w-5 h-5" />
                            <span>Salvar Alterações</span>
                        </template>
                    </BaseButton>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-6">


                <div class="card-glass p-6 rounded-2xl col-span-2">
                    <h2 class="font-bold text-lg mb-4 text-emerald-950 border-b border-emerald-200/50 pb-2">Identificação e Admissão</h2>
                    <div class="grid grid-cols-3 gap-6">
                        <div>
                            <InputLabel value="N° do prontuário *" />
                            <TextInput v-model="form.registration_number" type="text" required />
                            <InputError :message="form.errors.registration_number" />
                        </div>
                        <div>
                            <InputLabel value="Data de Admissão *" />
                            <TextInput v-model="form.admission_date" type="date" required :max="todayDate" />
                            <InputError :message="form.errors.admission_date" />
                        </div>
                        <div>
                            <InputLabel value="Nova Foto (Deixe em branco para manter a atual)" />
                            <div class="flex items-center gap-3">
                                <div v-if="props.resident.photo_path" class="relative group shrink-0">
                                    <img :src="`/uploads/${props.resident.photo_path}`"
                                        class="w-10 h-10 rounded-full object-cover border border-slate-200"
                                        alt="Foto atual">
                                    <button @click.prevent="deletePhoto" type="button" 
                                        class="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" 
                                        title="Excluir Foto">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <input @change="handlePhotoUpload" type="file"
                                    accept="image/png, image/jpeg, image/webp"
                                    class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100">
                            </div>
                            <InputError :message="form.errors.photo_path" />
                        </div>
                    </div>
                </div>


                <div class="card-glass p-6 rounded-2xl">
                    <h2 class="font-bold text-lg mb-4 text-emerald-950 border-b border-emerald-200/50 pb-2">Dados Pessoais</h2>
                    <div class="space-y-4">
                        <div>
                            <InputLabel value="Nome Completo *" />
                            <TextInput v-model="form.name" type="text" required />
                            <InputError :message="form.errors.name" />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Gênero *" />
                                <SelectInput v-model="form.gender" required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </SelectInput>
                                <InputError :message="form.errors.gender" />
                            </div>
                            <div>
                                <InputLabel value="Data de Nascimento *" />
                                <TextInput v-model="form.birth_date" type="date" required :max="todayDate" />
                                <InputError :message="form.errors.birth_date" />
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <InputLabel value="Naturalidade" />
                                <TextInput v-model="form.naturalness" type="text" />
                            </div>
                            <div>
                                <InputLabel value="Religião" />
                                <TextInput v-model="form.religion" type="text" />
                            </div>
                            <div>
                                <InputLabel value="Tipo Sanguíneo" />
                                <SelectInput v-model="form.blood_type">
                                    <option value="">Selecione</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </SelectInput>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Filiação 1" />
                                <TextInput v-model="form.mother_name" type="text" />
                            </div>
                            <div>
                                <InputLabel value="Filiação 2" />
                                <TextInput v-model="form.father_name" type="text" />
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Telefones de Contato" />
                            <TextInput v-model="form.phone_numbers" type="text" placeholder="(00) 00000-0000" />
                        </div>
                    </div>
                </div>


                <div class="card-glass p-6 rounded-2xl">
                    <h2 class="font-bold text-lg mb-4 text-emerald-950 border-b border-emerald-200/50 pb-2">Saúde e Dependência</h2>
                    <div class="space-y-4">
                        <div>
                            <InputLabel value="Grau de Dependência *" />
                            <SelectInput v-model="form.dependency_level" required>
                                <option value="" disabled>Selecione</option>
                                <option value="1">Grau 1 (Independente)</option>
                                <option value="2">Grau 2 (Dependência Parcial)</option>
                                <option value="3">Grau 3 (Dependência Total)</option>
                            </SelectInput>
                            <InputError :message="form.errors.dependency_level" />
                        </div>

                        <div class="pt-2">
                            <label class="block text-sm font-medium text-slate-700 mb-3">Comorbidades / Condições
                                (Marque se possuir)</label>
                            <div class="flex flex-col gap-3">
                                <label
                                    class="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition">
                                    <CheckboxInput v-model:checked="form.is_diabetic" />
                                    <span class="font-medium text-slate-700">Diabético</span>
                                </label>
                                <label
                                    class="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition">
                                    <CheckboxInput v-model:checked="form.is_hypertensive" />
                                    <span class="font-medium text-slate-700">Hipertenso</span>
                                </label>
                                <label
                                    class="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition">
                                    <CheckboxInput v-model:checked="form.is_epileptic" />
                                    <span class="font-medium text-slate-700">Epilético</span>
                                </label>
                            </div>
                        </div>

                        <div class="pt-2">
                            <InputLabel value="Observações Médicas / Comodidades" />
                            <textarea v-model="form.amenities" rows="3"
                                class="h-10 w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="Alergias, medicamentos contínuos, dieta especial..."></textarea>
                        </div>
                    </div>
                </div>


                <div class="card-glass p-6 rounded-2xl">
                    <h2 class="font-bold text-lg mb-4 text-emerald-950 border-b border-emerald-200/50 pb-2">Documentação</h2>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="CPF" />
                                <TextInput v-model="form.cpf" type="text" placeholder="000.000.000-00" />
                            </div>
                            <div>
                                <InputLabel value="RG" />
                                <TextInput v-model="form.rg" type="text" />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Órgão Emissor (SSP/UF)" />
                                <TextInput v-model="form.rg_ssp" type="text" placeholder="SSP/SP" />
                            </div>
                            <div>
                                <InputLabel value="Data de Emissão RG" />
                                <TextInput v-model="form.rg_emission" type="date" :max="todayDate" />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Cartão SUS" />
                                <TextInput v-model="form.sus_card" type="text" />
                            </div>
                            <div>
                                <InputLabel value="CNS" />
                                <TextInput v-model="form.cns" type="text" />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Carteira Profissional" />
                                <TextInput v-model="form.professional_card" type="text" />
                            </div>
                            <div>
                                <InputLabel value="Série da CTPS" />
                                <TextInput v-model="form.professional_card_series" type="text" />
                            </div>
                        </div>

                        <div class="pt-2">
                            <label class="block text-sm font-bold text-slate-700 mb-2">Certidão de Nascimento</label>
                            <div class="grid grid-cols-3 gap-4">
                                <div>
                                    <InputLabel value="Número" />
                                    <TextInput v-model="form.birth_certificate" type="text" />
                                </div>
                                <div>
                                    <InputLabel value="Livro" />
                                    <TextInput v-model="form.birth_certificate_lv" type="text" />
                                </div>
                                <div>
                                    <InputLabel value="Folha" />
                                    <TextInput v-model="form.birth_certificate_leaves" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card-glass p-6 rounded-2xl">
                    <h2 class="font-bold text-lg mb-4 text-emerald-950 border-b border-emerald-200/50 pb-2">Endereço de Origem</h2>
                    <div class="space-y-4">
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <InputLabel value="CEP" />
                                <TextInput v-model="form.zip_code" type="text" placeholder="00000-000" />
                            </div>
                        </div>

                        <div class="grid grid-cols-4 gap-4">
                            <div class="col-span-3">
                                <InputLabel value="Endereço (Rua, Av...)" />
                                <TextInput v-model="form.address" type="text" />
                            </div>
                            <div>
                                <InputLabel value="Número" />
                                <TextInput v-model="form.address_number" type="text" />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Bairro" />
                            <TextInput v-model="form.neighborhood" type="text" />
                        </div>

                        <div class="grid grid-cols-3 gap-4">
                            <div class="col-span-2">
                                <InputLabel value="Cidade" />
                                <TextInput v-model="form.city" type="text" />
                            </div>
                            <div>
                                <InputLabel value="Estado (UF)" />
                                <TextInput v-model="form.state" type="text" maxlength="2" placeholder="CE"
                                    class="uppercase" />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Ponto de Referência" />
                            <TextInput v-model="form.reference_point" type="text" />
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </template>
