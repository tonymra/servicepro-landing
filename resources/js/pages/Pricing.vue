<script setup lang="ts">
import { ref } from 'vue';
import { Check, ShieldCheck } from 'lucide-vue-next';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import Button from '@/components/ui/Button.vue';
import PricingCard from '@/components/marketing/PricingCard.vue';
import ComparisonTable from '@/components/marketing/ComparisonTable.vue';
import FaqAccordion from '@/components/marketing/FaqAccordion.vue';
import WaitlistForm from '@/components/marketing/WaitlistForm.vue';
import { pricingPlans } from '@/data/pricing';
import { pricingFaqs } from '@/data/faqs';

const isAnnual = ref(false);

const addOns = [
    { name: 'SMS Credits', price: '$0.025/message', description: 'Additional SMS beyond your plan allowance.' },
    { name: 'Additional Users', price: '$15/user/month', description: 'Add team members beyond your plan limit.' },
    { name: 'API Access', price: 'Business only — Included', description: 'Full REST API for custom integrations.' },
];

const comparisonRows = [
    { feature: 'Starting price', servicepro: '$79/mo', jobber: '$199/mo', housecall: '$169/mo' },
    { feature: 'Free trial', servicepro: '14 days', jobber: '14 days', housecall: '14 days' },
    { feature: 'Setup time', servicepro: 'Under 30 min', jobber: '2–4 hours', housecall: '2–3 hours' },
    { feature: 'Scheduling', servicepro: true, jobber: true, housecall: true },
    { feature: 'Invoicing & Payments', servicepro: true, jobber: true, housecall: true },
    { feature: 'Two-way SMS', servicepro: true, jobber: 'Add-on', housecall: true },
    { feature: 'GPS Tracking', servicepro: true, jobber: true, housecall: true },
    { feature: 'Customer Portal', servicepro: true, jobber: true, housecall: true },
    { feature: 'Automated Follow-ups', servicepro: true, jobber: 'Limited', housecall: true },
    { feature: 'AI-powered features', servicepro: true, jobber: false, housecall: false },
    { feature: 'Built for 1–10 staff', servicepro: true, jobber: 'Partial', housecall: 'Partial' },
    { feature: 'No contract required', servicepro: true, jobber: true, housecall: true },
    { feature: 'US-dedicated support', servicepro: true, jobber: true, housecall: true },
    { feature: 'Mobile-first design', servicepro: true, jobber: 'Partial', housecall: true },
];

const waitlistBenefits = [
    '30-day free trial (standard is 14 days)',
    'Founding member rate — locked in for your first year',
    'Priority access before public launch on 1 May 2026',
];
</script>

<template>
    <MarketingLayout
        title="Pricing — ServicePro"
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
                <div class="mb-12 flex items-center justify-center gap-4">
                    <span :class="['text-sm font-medium', !isAnnual ? 'text-neutral-900' : 'text-neutral-500']">Monthly</span>
                    <button
                        type="button"
                        class="relative h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        :class="isAnnual ? 'bg-brand-600' : 'bg-neutral-300'"
                        :aria-pressed="isAnnual"
                        @click="isAnnual = !isAnnual"
                    >
                        <span
                            class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                            :class="isAnnual ? 'translate-x-6' : 'translate-x-0.5'"
                        ></span>
                    </button>
                    <span :class="['text-sm font-medium', isAnnual ? 'text-neutral-900' : 'text-neutral-500']">
                        Annual <span class="font-semibold text-accent-500">(Save 20%)</span>
                    </span>
                </div>

                <div class="grid gap-8 md:grid-cols-3">
                    <PricingCard v-for="plan in pricingPlans" :key="plan.id" :plan="plan" :is-annual="isAnnual" />
                </div>

                <p class="mt-8 text-center text-neutral-500">
                    Need more than 10 users?
                    <a href="/contact" class="font-semibold text-brand-600 hover:text-brand-700">Contact us for Enterprise pricing →</a>
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

        <!-- Comparison Table -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="How we compare"
                    heading="More features. Half the price."
                    subtext="ServicePro gives you 90% of what Jobber and Housecall Pro offer, at a fraction of the cost."
                />
                <ComparisonTable :rows="comparisonRows" />
                <div class="mt-8 text-center">
                    <Button href="https://app.getservicepro.com/register" variant="primary" size="lg" external>
                        Try ServicePro free for 14 days — no credit card required
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
