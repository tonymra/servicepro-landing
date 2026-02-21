<script setup lang="ts">
import { ref, computed } from 'vue';
import { Check } from 'lucide-vue-next';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import FeatureCard from '@/components/marketing/FeatureCard.vue';
import WaitlistForm from '@/components/marketing/WaitlistForm.vue';
import { allFeatures, featureCategories } from '@/data/features';

type CategoryId = (typeof featureCategories)[number]['id'];

const activeTab = ref<CategoryId>('scheduling');

const activeFeatures = computed(() => allFeatures.filter((f) => f.category === activeTab.value));

const waitlistBenefits = [
    '30-day free trial (standard is 14 days)',
    'Founding member rate — locked in for your first year',
    'Priority access before public launch on 1 May 2026',
];
</script>

<template>
    <MarketingLayout
        title="Features — ServicePro"
        description="Every tool you need to manage jobs, invoices, and customers. See all ServicePro features for home service businesses."
    >
        <!-- Hero -->
        <section class="bg-white pt-32 pb-20">
            <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <Badge variant="brand">Platform Features</Badge>
                <h1 class="mt-6 text-4xl font-extrabold leading-tight text-neutral-900 lg:text-5xl">
                    Every feature your home service<br class="hidden lg:block" /> business needs.
                </h1>
                <p class="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-neutral-500">
                    From first call to final payment — ServicePro manages every step of the job lifecycle.
                </p>
                <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Button href="https://app.getservicepro.com/register" variant="primary" size="lg" external>
                        Start Free Trial
                    </Button>
                    <Button href="/pricing" variant="secondary" size="lg">View Pricing</Button>
                </div>
            </div>
        </section>

        <!-- Tabbed Feature Categories -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Feature categories"
                    heading="Built for every part of your business"
                    subtext="ServicePro covers every workflow — from scheduling your first job to collecting your final payment."
                />

                <!-- Tabs -->
                <div class="mb-12 border-b border-neutral-200">
                    <nav class="-mb-px flex overflow-x-auto" role="tablist">
                        <button
                            v-for="category in featureCategories"
                            :key="category.id"
                            type="button"
                            role="tab"
                            :aria-selected="activeTab === category.id"
                            class="relative shrink-0 px-6 py-4 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
                            :class="activeTab === category.id
                                ? 'border-b-2 border-brand-600 text-brand-600'
                                : 'border-b-2 border-transparent text-neutral-500 hover:text-neutral-800'"
                            @click="activeTab = category.id"
                        >
                            {{ category.label }}
                        </button>
                    </nav>
                </div>

                <!-- Feature grid -->
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        v-for="feature in activeFeatures"
                        :key="feature.title"
                        :icon="feature.icon"
                        :title="feature.title"
                        :description="feature.description"
                    />
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
                            Join the waitlist today. Get 30 days free at launch — double the standard trial.
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
