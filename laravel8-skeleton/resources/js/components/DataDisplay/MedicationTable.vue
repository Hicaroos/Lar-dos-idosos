<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
    title: string;
    theme: 'purple' | 'sky' | 'emerald';
    medications: any[];
    readonly?: boolean;
}>();

defineEmits<{
    (e: 'edit', medication: any): void;
    (e: 'delete', medicationId: number): void;
}>();

const themeClasses = {
    purple: {
        bg: 'bg-[#5C9280]',
        border: 'border-purple-100',
        iconBg: 'bg-green-50',
        iconText: 'text-slate-900',
        titleText: 'text-slate-900'
    },
    sky: {
        bg: 'bg-[#92baac]',
        border: 'border-sky-100',
        iconBg: 'bg-green-50',
        iconText: 'text-slate-900',
        titleText: 'text-slate-900'
    },
    emerald: {
        bg: 'bg-[#A2C4B9]',
        border: 'border-[#9B59A5]/10',
        iconBg: 'bg-green-50',
        iconText: 'text-slate-900',
        titleText: 'text-slate-900'
    }
};
</script>

<template>
    <section class="bg-white rounded-2xl shadow-md overflow-hidden print:border border-slate-200 ">
        <div :class="[themeClasses[theme].bg, themeClasses[theme].border, 'border-b p-4 print:p-2 flex items-center gap-3 print:gap-2']">
            <div :class="['p-2 print:p-1 rounded-lg', themeClasses[theme].iconBg, themeClasses[theme].iconText]">
                <slot name="icon"></slot>
            </div>
            <h2 :class="['text-lg print:text-base font-bold', themeClasses[theme].titleText]">{{ title }}</h2>
        </div>
        
        <div class="p-0 overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                        <th class="py-3 px-6 print:py-1 print:px-2 font-semibold w-2/5">Medicamento</th>
                        <th class="py-3 px-6 print:py-1 print:px-2 font-semibold">Dosagem</th>
                        <th class="py-3 px-6 print:py-1 print:px-2 font-semibold w-32">Horário</th>
                        <th v-if="!readonly" class="py-3 px-6 font-semibold w-24 text-right print:hidden">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="medications.length === 0">
                        <td :colspan="readonly ? 3 : 4" class="py-8 text-center text-slate-400 italic">Nenhum medicamento para este turno.</td>
                    </tr>
                    <tr v-for="med in medications" :key="med.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
                        <td class="py-4 px-6 print:py-1 print:px-2 font-medium text-slate-800 break-words">{{ med.name }}</td>
                        <td class="py-4 px-6 print:py-1 print:px-2 text-slate-600 break-words">{{ med.dose }}</td>
                        <td class="py-4 px-6 print:py-1 print:px-2 text-slate-600 font-mono">{{ med.time }}</td>
                        <td v-if="!readonly" class="py-4 px-6 text-right print:hidden">
                            <div class="flex items-center justify-end gap-2">
                                <button @click="$emit('edit', med)" class="text-slate-400 hover:text-emerald-600 transition p-1" title="Editar">
                                    <PencilIcon class="w-5 h-5" />
                                </button>
                                <button @click="$emit('delete', med.id)" class="text-slate-400 hover:text-red-600 transition p-1" title="Excluir">
                                    <TrashIcon class="w-5 h-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
