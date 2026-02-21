<script setup lang="ts">
import { Check, Minus } from 'lucide-vue-next';
import Badge from '@/components/ui/Badge.vue';

interface TableRow {
    feature: string;
    servicepro: string | boolean;
    jobber: string | boolean;
    housecall: string | boolean;
}

interface Props {
    rows: TableRow[];
    note?: string;
}

withDefaults(defineProps<Props>(), {
    note: '* Pricing and features accurate as of Feb 2026. Subject to change.',
});
</script>

<template>
    <div class="overflow-x-auto rounded-2xl border border-neutral-200">
        <table class="min-w-full divide-y divide-neutral-200">
            <thead>
                <tr class="divide-x divide-neutral-200">
                    <th class="bg-neutral-50 px-6 py-4 text-left text-sm font-semibold text-neutral-700 w-1/3">
                        Feature
                    </th>
                    <th class="relative bg-brand-50 px-6 py-4 text-center text-sm font-semibold text-brand-900 outline outline-2 outline-brand-500">
                        <div class="flex flex-col items-center gap-1">
                            <Badge variant="brand">Best Value</Badge>
                            <span>ServicePro</span>
                        </div>
                    </th>
                    <th class="bg-neutral-50 px-6 py-4 text-center text-sm font-semibold text-neutral-700">
                        Jobber
                    </th>
                    <th class="bg-neutral-50 px-6 py-4 text-center text-sm font-semibold text-neutral-700">
                        Housecall Pro
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 bg-white">
                <tr v-for="row in rows" :key="row.feature" class="divide-x divide-neutral-100 hover:bg-neutral-50">
                    <td class="px-6 py-3 text-sm font-medium text-neutral-700">{{ row.feature }}</td>
                    <td class="bg-brand-50/30 px-6 py-3 text-center">
                        <span v-if="typeof row.servicepro === 'string'" class="text-sm font-semibold text-brand-700">{{ row.servicepro }}</span>
                        <Check v-else-if="row.servicepro === true" class="mx-auto h-5 w-5 text-accent-500" />
                        <Minus v-else class="mx-auto h-5 w-5 text-neutral-300" />
                    </td>
                    <td class="px-6 py-3 text-center">
                        <span v-if="typeof row.jobber === 'string'" class="text-sm text-neutral-700">{{ row.jobber }}</span>
                        <Check v-else-if="row.jobber === true" class="mx-auto h-5 w-5 text-neutral-400" />
                        <Minus v-else class="mx-auto h-5 w-5 text-neutral-300" />
                    </td>
                    <td class="px-6 py-3 text-center">
                        <span v-if="typeof row.housecall === 'string'" class="text-sm text-neutral-700">{{ row.housecall }}</span>
                        <Check v-else-if="row.housecall === true" class="mx-auto h-5 w-5 text-neutral-400" />
                        <Minus v-else class="mx-auto h-5 w-5 text-neutral-300" />
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="note" class="px-6 py-3 text-xs text-neutral-400 border-t border-neutral-100">{{ note }}</p>
    </div>
</template>
