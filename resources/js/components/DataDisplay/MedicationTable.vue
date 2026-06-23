<script setup lang="ts">
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
        bg: 'bg-purple-100',
        border: 'border-purple-100',
        iconBg: 'bg-purple-100',
        iconText: 'text-purple-600',
        titleText: 'text-purple-800'
    },
    sky: {
        bg: 'bg-sky-100',
        border: 'border-sky-100',
        iconBg: 'bg-sky-100',
        iconText: 'text-sky-600',
        titleText: 'text-sky-800'
    },
    emerald: {
        bg: 'bg-emerald-100',
        border: 'border-emerald-100',
        iconBg: 'bg-emerald-100',
        iconText: 'text-emerald-600',
        titleText: 'text-emerald-800'
    }
};
</script>

<template>
    <section class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div :class="[themeClasses[theme].bg, themeClasses[theme].border, 'border-b p-4 flex items-center gap-3']">
            <div :class="['p-2 rounded-lg', themeClasses[theme].iconBg, themeClasses[theme].iconText]">
                <slot name="icon"></slot>
            </div>
            <h2 :class="['text-lg font-bold', themeClasses[theme].titleText]">{{ title }}</h2>
        </div>
        
        <div class="p-0 overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                        <th class="py-3 px-6 font-semibold w-2/5">Medicamento</th>
                        <th class="py-3 px-6 font-semibold">Dosagem</th>
                        <th class="py-3 px-6 font-semibold w-32">Horário</th>
                        <th v-if="!readonly" class="py-3 px-6 font-semibold w-24 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="medications.length === 0">
                        <td :colspan="readonly ? 3 : 4" class="py-8 text-center text-slate-400 italic">Nenhum medicamento para este turno.</td>
                    </tr>
                    <tr v-for="med in medications" :key="med.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
                        <td class="py-4 px-6 font-medium text-slate-800 break-words">{{ med.name }}</td>
                        <td class="py-4 px-6 text-slate-600 break-words">{{ med.dose }}</td>
                        <td class="py-4 px-6 text-slate-600 font-mono">{{ med.time }}</td>
                        <td v-if="!readonly" class="py-4 px-6 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <button @click="$emit('edit', med)" class="text-slate-400 hover:text-emerald-600 transition p-1" title="Editar">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button @click="$emit('delete', med.id)" class="text-slate-400 hover:text-red-600 transition p-1" title="Excluir">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
