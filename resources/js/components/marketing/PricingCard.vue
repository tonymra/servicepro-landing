<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import type { PricingPlan } from '@/data/pricing';

interface Props {
    plan: PricingPlan;
    isAnnual: boolean;
}

const props = defineProps<Props>();

const appUrl = 'https://app.getservicepro.com';
</script>

<template>
    <div
        :class="[
            'relative rounded-2xl p-8 flex flex-col',
            plan.highlighted
                ? 'border-2 border-brand-600 bg-white shadow-xl'
                : 'border border-neutral-200 bg-white shadow-sm',
        ]"
    >
        <div v-if="plan.badge" class="absolute -top-4 left-1/2 -translate-x-1/2">
            <Badge variant="brand" size="md">{{ plan.badge }}</Badge>
        </div>

        <div class="mb-6">
            <h3 class="text-xl font-bold text-neutral-900">{{ plan.label }}</h3>
            <p class="mt-1 text-sm text-neutral-500">{{ plan.description }}</p>
        </div>

        <div class="mb-6">
            <div class="flex items-baseline gap-1">
                <span class="text-4xl font-extrabold text-neutral-900">
                    ${{ isAnnual ? plan.annualPrice : plan.monthlyPrice }}
                </span>
                <span class="text-neutral-500">/mo</span>
            </div>
            <p v-if="isAnnual" class="mt-1 text-sm text-accent-500 font-medium">
                Billed annually · Save 20%
            </p>
        </div>

        <ul class="mb-8 flex-1 space-y-3">
            <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2.5">
                <Check class="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                <span class="text-sm text-neutral-700">{{ feature }}</span>
            </li>
        </ul>

        <div>
            <Button
                :href="`${appUrl}/register`"
                :variant="plan.highlighted ? 'primary' : 'secondary'"
                size="lg"
                class="w-full"
                external
            >
                {{ plan.cta }}
            </Button>
            <p v-if="plan.note" class="mt-3 text-center text-xs text-neutral-400">{{ plan.note }}</p>
        </div>
    </div>
</template>
