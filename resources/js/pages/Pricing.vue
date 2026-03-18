<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Check, ShieldCheck } from 'lucide-vue-next';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import Button from '@/components/ui/Button.vue';
import PricingCard from '@/components/marketing/PricingCard.vue';

import FaqAccordion from '@/components/marketing/FaqAccordion.vue';
import WaitlistForm from '@/components/marketing/WaitlistForm.vue';
import { usePricing } from '@/composables/usePricing';
import { pricingPlans as staticPlans } from '@/data/pricing';
import { pricingFaqs } from '@/data/faqs';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';

const isAnnual = ref(false);

const { plans: apiPlans, addOns: apiAddOns, loading, error, fetchPricing } = usePricing();

const plans = computed(() => (apiPlans.value.length > 0 ? apiPlans.value : staticPlans));
const addOns = computed(() => apiAddOns.value);

onMounted(() => {
    fetchPricing();
});

const waitlistBenefits = [
    '30-day free trial (standard is 14 days)',
    'Founding member rate — locked in for your first year',
    'Priority access before public launch on 1 June 2026',
];
</script>

<template>
    <MarketingLayout
        title="Pricing — Fieldix"
        description="Simple, transparent pricing from $79/month. No contracts. Try free for 14 days."
    >
        <!-- Hero -->
        <section class="bg-white pt-32 pb-20">
            <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-extrabold leading-tight text-neutral-900 lg:text-5xl">
                    Simple, transparent pricing
                </h1>
                <p class="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-neutral-500">
                    Built for home service businesses of every size. Cancel any time.
                </p>
            </div>
        </section>

        <!-- Pricing Cards -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <!-- Toggle -->
                <div class="mb-12 flex items-center justify-center gap-3">
                    <span :class="['text-sm font-medium', !isAnnual ? 'text-neutral-900' : 'text-neutral-500']">Monthly</span>
                    <ToggleSwitch v-model="isAnnual" />
                    <span :class="['text-sm font-medium', isAnnual ? 'text-neutral-900' : 'text-neutral-500']">
                        Annual <span class="font-semibold text-accent-500">(Save 20%)</span>
                    </span>
                </div>

                <!-- Loading skeleton -->
                <div v-if="loading" class="grid gap-8 md:grid-cols-3">
                    <div v-for="i in 3" :key="i" class="h-96 animate-pulse rounded-2xl bg-neutral-200" />
                </div>

                <!-- Error state -->
                <p v-else-if="error" class="text-center text-sm text-red-500">{{ error }}</p>

                <!-- Plan cards -->
                <div v-else class="grid gap-8 md:grid-cols-3">
                    <PricingCard v-for="plan in plans" :key="plan.id" :plan="plan" :is-annual="isAnnual" />
                </div>

                <p class="mt-8 text-center text-neutral-500">
                    Need more than 10 users?
                    <a href="/contact" class="font-semibold text-brand-600 hover:text-brand-700">Contact us for Enterprise pricing →</a>
                </p>
                <p class="mt-4 text-center text-xs text-neutral-400">
                    * Pricing and features accurate as of March 2026. Subject to change.
                </p>
            </div>
        </section>

        <!-- Add-ons -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Add-ons"
                    heading="Extend your plan as you grow"
                    subtext="All add-ons are optional and can be adjusted at any time from your account settings."
                />
                <div class="grid gap-6 sm:grid-cols-3">
                    <div v-for="addon in addOns" :key="addon.name" class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h3 class="text-lg font-bold text-neutral-900">{{ addon.name }}</h3>
                        <p class="mt-1 text-lg font-semibold text-brand-600">{{ addon.price }}</p>
                        <p class="mt-3 text-sm leading-relaxed text-neutral-500">{{ addon.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Money-back guarantee -->
        <section class="bg-green-50 py-12">
            <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <div class="flex items-center justify-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <ShieldCheck class="h-5 w-5 text-green-600" />
                    </div>
                    <p class="text-lg font-semibold text-green-800">30-day money-back guarantee on all plans. No questions asked.</p>
                </div>
            </div>
        </section>

        <!-- What you get -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="What's included"
                    heading="What you get at $79/month"
                    subtext="Enterprise field service platforms charge $200–$400/month for the same capabilities and require days to set up. Fieldix is ready in under 30 minutes."
                />
                <div class="mt-10 grid gap-4 sm:grid-cols-2">
                    <div v-for="item in [
                        { label: 'Job scheduling & dispatch', note: 'Drag-and-drop calendar, crew assignment, GPS check-in' },
                        { label: 'Invoicing & online payments', note: 'Send invoices, collect card payments, track what\'s owed' },
                        { label: 'Two-way SMS — included', note: 'No add-on fee. Automated follow-ups and client replies in one inbox' },
                        { label: 'Automated quote follow-ups', note: 'Fieldix follows up 24 hours after every quote — automatically' },
                        { label: 'Customer portal', note: 'Clients can view quotes, approve work, and pay online' },
                        { label: 'AI-powered features', note: 'Smart scheduling suggestions and predictive job notes' },
                        { label: 'GPS tracking', note: 'See your whole crew\'s location in real time' },
                        { label: 'Mobile-first — no app download', note: 'Full functionality on iOS and Android browsers' },
                        { label: 'No contract. Cancel any time.', note: 'Month-to-month. No cancellation fees. No lock-in.' },
                        { label: '14-day free trial', note: 'No credit card required. Waitlist members get 30 days.' },
                    ]" :key="item.label" class="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4">
                        <Check class="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                        <div>
                            <p class="font-semibold text-neutral-900">{{ item.label }}</p>
                            <p class="mt-0.5 text-sm text-neutral-500">{{ item.note }}</p>
                        </div>
                    </div>
                </div>
                <div class="mt-10 text-center">
                    <Button href="https://app.getservicepro.com/register" variant="primary" size="lg" external>
                        Try Fieldix free for 14 days — no credit card required
                    </Button>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq" class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader eyebrow="Questions" heading="Pricing frequently asked questions" />
                <div class="grid gap-4 lg:grid-cols-2 lg:gap-8">
                    <FaqAccordion :items="pricingFaqs.slice(0, 3)" />
                    <FaqAccordion :items="pricingFaqs.slice(3)" />
                </div>
            </div>
        </section>

        <!-- Waitlist CTA -->
        <section class="bg-gradient-to-r from-brand-600 to-brand-800 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col gap-12 lg:flex-row lg:items-start">
                    <div class="flex-1 lg:pt-4">
                        <h2 class="text-3xl font-bold text-white lg:text-4xl">Be first in line when we launch.</h2>
                        <p class="mt-4 text-lg leading-relaxed text-blue-100">
                            Join the waitlist and get 30 days free — double the standard trial.
                        </p>
                        <ul class="mt-6 space-y-3">
                            <li v-for="benefit in waitlistBenefits" :key="benefit" class="flex items-start gap-3 text-white">
                                <Check class="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                                {{ benefit }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex-1">
                        <WaitlistForm variant="inline" />
                        <p class="mt-4 text-center text-sm text-blue-200">487 businesses already on the waitlist</p>
                    </div>
                </div>
            </div>
        </section>
    </MarketingLayout>
</template>
