<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import Chip from '@/components/ui/Chip.vue';

interface FeatureBlock {
    tag: string;
    tagColor: 'brand' | 'green' | 'amber' | 'purple';
    heading: string;
    body: string;
    bullets: string[];
    ctaLabel: string;
    ctaHref: string;
    imagePosition: 'left' | 'right';
    mockupType: 'calendar' | 'invoice' | 'sms';
}

interface Props {
    block: FeatureBlock;
    index: number;
}

defineProps<Props>();
</script>

<template>
    <div
        :class="[
            'flex flex-col gap-12 lg:flex-row lg:items-center',
            block.imagePosition === 'left' ? 'lg:flex-row-reverse' : '',
        ]"
    >
        <!-- Text content -->
        <div class="flex-1">
            <Chip :color="block.tagColor" class="mb-4">{{ block.tag }}</Chip>
            <h3 class="mb-4 text-2xl font-bold text-neutral-900 lg:text-3xl">{{ block.heading }}</h3>
            <p class="mb-6 text-lg text-neutral-500 leading-relaxed">{{ block.body }}</p>
            <ul class="mb-6 space-y-3">
                <li v-for="bullet in block.bullets" :key="bullet" class="flex items-start gap-3">
                    <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100">
                        <Check class="h-3 w-3 text-brand-600" />
                    </div>
                    <span class="text-neutral-700">{{ bullet }}</span>
                </li>
            </ul>
            <a :href="block.ctaHref" class="text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                {{ block.ctaLabel }}
            </a>
        </div>

        <!-- App Mockup -->
        <div class="flex-1">
            <!-- Calendar / Scheduling Mockup -->
            <div v-if="block.mockupType === 'calendar'" class="rounded-2xl bg-white shadow-2xl overflow-hidden border border-neutral-100 rotate-1">
                <div class="bg-neutral-900 px-4 py-3 flex items-center gap-2">
                    <div class="flex gap-1.5">
                        <div class="h-3 w-3 rounded-full bg-red-400"></div>
                        <div class="h-3 w-3 rounded-full bg-amber-400"></div>
                        <div class="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div class="flex-1 rounded bg-white/10 px-3 py-1 text-xs text-neutral-300 text-center">app.getservicepro.com</div>
                </div>
                <div class="p-4">
                    <div class="mb-3 flex items-center justify-between">
                        <h4 class="font-semibold text-neutral-900">Today's Schedule</h4>
                        <span class="text-sm text-neutral-500">Mon, Feb 21</span>
                    </div>
                    <div class="space-y-2">
                        <div v-for="job in [
                            { time: '8:00 AM', title: 'HVAC Repair', client: 'Johnson Residence', tech: 'Mike T.', color: 'bg-blue-100 border-blue-300' },
                            { time: '10:30 AM', title: 'Drain Cleaning', client: 'Martinez Office', tech: 'Rosa M.', color: 'bg-green-100 border-green-300' },
                            { time: '1:00 PM', title: 'Electrical Inspection', client: 'Brooks Warehouse', tech: 'Tyler B.', color: 'bg-amber-100 border-amber-300' },
                            { time: '3:30 PM', title: 'AC Tune-up', client: 'Chen Home', tech: 'Mike T.', color: 'bg-purple-100 border-purple-300' },
                        ]" :key="job.time"
                            :class="['rounded-lg border p-3', job.color]"
                        >
                            <div class="flex items-start justify-between">
                                <div>
                                    <div class="text-xs text-neutral-500">{{ job.time }}</div>
                                    <div class="font-medium text-neutral-900 text-sm">{{ job.title }}</div>
                                    <div class="text-xs text-neutral-600">{{ job.client }}</div>
                                </div>
                                <div class="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-neutral-700 shadow-sm">{{ job.tech }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Invoice Mockup -->
            <div v-else-if="block.mockupType === 'invoice'" class="rounded-2xl bg-white shadow-2xl overflow-hidden border border-neutral-100 -rotate-1">
                <div class="bg-neutral-900 px-4 py-3 flex items-center gap-2">
                    <div class="flex gap-1.5">
                        <div class="h-3 w-3 rounded-full bg-red-400"></div>
                        <div class="h-3 w-3 rounded-full bg-amber-400"></div>
                        <div class="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div class="flex-1 rounded bg-white/10 px-3 py-1 text-xs text-neutral-300 text-center">Invoice #1042</div>
                </div>
                <div class="p-5">
                    <div class="mb-4 flex items-start justify-between">
                        <div>
                            <div class="font-bold text-neutral-900 text-lg">ServicePro</div>
                            <div class="text-xs text-neutral-500">hello@getservicepro.com</div>
                        </div>
                        <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">PAID</span>
                    </div>
                    <div class="mb-4 rounded-lg bg-neutral-50 p-3 text-sm">
                        <div class="mb-1 font-medium text-neutral-900">HVAC Repair — Residential</div>
                        <div class="text-neutral-500">Johnson Residence · Feb 21, 2026</div>
                    </div>
                    <div class="space-y-1.5 border-t border-neutral-100 pt-3 text-sm">
                        <div class="flex justify-between text-neutral-600">
                            <span>Labor (3h @ $85/h)</span>
                            <span>$255.00</span>
                        </div>
                        <div class="flex justify-between text-neutral-600">
                            <span>Parts</span>
                            <span>$135.00</span>
                        </div>
                        <div class="flex justify-between font-bold text-neutral-900 pt-1 border-t border-neutral-100">
                            <span>Total</span>
                            <span>$390.00</span>
                        </div>
                    </div>
                    <div class="mt-4 rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white">
                        Payment Link Sent via SMS ✓
                    </div>
                </div>
            </div>

            <!-- SMS Mockup -->
            <div v-else-if="block.mockupType === 'sms'" class="rounded-2xl bg-white shadow-2xl overflow-hidden border border-neutral-100 rotate-1">
                <div class="bg-neutral-900 px-4 py-3 flex items-center gap-2">
                    <div class="flex gap-1.5">
                        <div class="h-3 w-3 rounded-full bg-red-400"></div>
                        <div class="h-3 w-3 rounded-full bg-amber-400"></div>
                        <div class="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div class="flex-1 text-center text-xs text-neutral-300">SMS — Sarah Chen</div>
                </div>
                <div class="p-4 space-y-3">
                    <div class="flex justify-end">
                        <div class="rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-2.5 text-sm text-white max-w-[75%]">
                            Hi Sarah! Here's the quote for your AC tune-up: $185. Tap to view & approve: getservicepro.com/q/9821
                        </div>
                    </div>
                    <div class="flex justify-start">
                        <div class="rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-2.5 text-sm text-neutral-900 max-w-[75%]">
                            Thanks! Looks good. When can you come out?
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-2.5 text-sm text-white max-w-[75%]">
                            We have Thursday at 2pm or Friday morning available. Which works?
                        </div>
                    </div>
                    <div class="flex justify-start">
                        <div class="rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-2.5 text-sm text-neutral-900 max-w-[75%]">
                            Thursday 2pm perfect 👍
                        </div>
                    </div>
                    <div class="mt-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-xs font-medium text-green-700">
                        ✓ Job scheduled automatically for Thursday 2pm
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
