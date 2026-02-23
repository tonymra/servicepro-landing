<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Check, ChevronDown } from 'lucide-vue-next';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import StatsBanner from '@/components/marketing/StatsBanner.vue';
import TradeLogos from '@/components/marketing/TradeLogos.vue';
import FeatureCard from '@/components/marketing/FeatureCard.vue';
import FeatureShowcase from '@/components/marketing/FeatureShowcase.vue';
import ComparisonTable from '@/components/marketing/ComparisonTable.vue';
import TestimonialCarousel from '@/components/marketing/TestimonialCarousel.vue';
import PricingCard from '@/components/marketing/PricingCard.vue';
import WaitlistForm from '@/components/marketing/WaitlistForm.vue';
import FaqAccordion from '@/components/marketing/FaqAccordion.vue';
import { allFeatures } from '@/data/features';
import { pricingPlans } from '@/data/pricing';
import { generalFaqs } from '@/data/faqs';

const isAnnual = ref(false);

const featureBlocks = [
    {
        tag: 'Scheduling',
        tagColor: 'brand' as const,
        heading: 'Schedule jobs and dispatch your crew in seconds',
        body: 'Drag-and-drop job calendar. See your whole crew\'s day at a glance. Assign jobs with one tap from your phone. GPS check-in so you always know where your team is.',
        bullets: [
            'Drag-and-drop calendar view',
            'One-tap job assignment to any technician',
            'GPS tracking — see where your crew is in real time',
        ],
        ctaLabel: 'Explore scheduling features →',
        ctaHref: '/features#scheduling',
        imagePosition: 'right' as const,
        mockupType: 'calendar' as const,
    },
    {
        tag: 'Payments',
        tagColor: 'green' as const,
        heading: 'Get paid faster with one-tap invoicing',
        body: 'Create an invoice on your phone the moment you finish a job. Send a payment link via SMS. Clients pay by card, Apple Pay, or Google Pay. Funds in your bank in 2 business days.',
        bullets: [
            'Invoice sent in under 60 seconds after job completion',
            'Payment links by SMS — no app download needed for clients',
            'Stripe-powered payments — 2-day payout',
        ],
        ctaLabel: 'Explore invoicing features →',
        ctaHref: '/features#invoicing',
        imagePosition: 'left' as const,
        mockupType: 'invoice' as const,
    },
    {
        tag: 'Smart SMS',
        tagColor: 'purple' as const,
        heading: 'Two-way SMS that follows up so you don\'t have to',
        body: 'Send job reminders, quote follow-ups, and payment nudges automatically. Clients reply via SMS and you see it all in one thread. No more lost conversations across apps.',
        bullets: [
            'Automatic follow-up 24 hours after a quote is sent',
            'Two-way SMS — clients reply and you respond in the app',
            'Appointment reminders reduce no-shows by up to 40%',
        ],
        ctaLabel: 'Explore SMS features →',
        ctaHref: '/features#sms',
        imagePosition: 'right' as const,
        mockupType: 'sms' as const,
    },
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

const painPoints = [
    {
        icon: '📅',
        iconBg: 'bg-red-100',
        title: 'Double-bookings and missed appointments',
        body: 'You\'re juggling text messages, phone calls, and a whiteboard. Clients fall through the cracks when you\'re busy on a job.',
    },
    {
        icon: '⏰',
        iconBg: 'bg-amber-100',
        title: 'Invoices sitting unpaid for weeks',
        body: 'You finished the job in January. You still haven\'t been paid in March because you forgot to follow up — again.',
    },
    {
        icon: '💬',
        iconBg: 'bg-orange-100',
        title: 'Quotes that go cold',
        body: 'You sent a quote. They never replied. You never followed up. That was a $600 job you lost to a competitor who did.',
    },
];

// JSON-LD structured data — injected via DOM to avoid Vue template script restriction
let jsonLdScript: HTMLScriptElement | null = null;

onMounted(() => {
    jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'ServicePro',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        offers: { '@type': 'Offer', price: '79', priceCurrency: 'USD' },
        description: 'Field service management software for home service businesses',
        url: 'https://www.getservicepro.com',
    });
    document.head.appendChild(jsonLdScript);
});

onUnmounted(() => {
    jsonLdScript?.remove();
});
</script>

<template>
    <MarketingLayout
        title="ServicePro — Field Service Management Software for Small Businesses"
        description="Run your home service business like a pro. Scheduling, invoicing, and smart SMS for HVAC, plumbing, electrical, cleaning, and all home service crews. From $79/month."
    >
        <!-- SECTION 1: Hero -->
        <section class="relative flex min-h-screen items-center bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 pt-32 pb-20">
            <div class="dot-grid absolute inset-0 opacity-50"></div>
            <div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col items-center gap-16 lg:flex-row lg:items-center">
                    <!-- Left -->
                    <div class="flex-1 text-center lg:text-left">
                        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                            <span class="h-2 w-2 rounded-full bg-accent-400 animate-pulse"></span>
                            <span class="text-sm font-medium text-white">Now accepting waitlist applications</span>
                        </div>

                        <h1 class="text-5xl font-extrabold leading-tight text-white lg:text-7xl">
                            Run your home service business<br class="hidden lg:block" />
                            <span class="text-brand-400">like a pro.</span>
                        </h1>

                        <p class="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-300 mx-auto lg:mx-0">
                            Scheduling, invoicing, and smart SMS follow-up — built for any home service crew of 1 to 10.
                        </p>

                        <div class="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                            <Button href="#waitlist" variant="success" size="xl">
                                Join the Waitlist — Free
                            </Button>
                            <Button
                                href="https://www.youtube.com/@getservicepro"
                                variant="secondary"
                                size="xl"
                                class="border-white/30 bg-white/10 text-white hover:bg-white/20"
                                external
                            >
                                Watch 2-min Demo
                            </Button>
                        </div>

                        <div class="mt-8 flex flex-wrap justify-center gap-6 text-sm text-neutral-400 lg:justify-start">
                            <span class="flex items-center gap-2">
                                <Check class="h-4 w-4 text-accent-400" /> No credit card required
                            </span>
                            <span class="flex items-center gap-2">
                                <Check class="h-4 w-4 text-accent-400" /> Setup in under 30 minutes
                            </span>
                            <span class="flex items-center gap-2">
                                <Check class="h-4 w-4 text-accent-400" /> Cancel any time
                            </span>
                        </div>
                    </div>

                    <!-- Right — App Mockup -->
                    <div class="relative hidden flex-shrink-0 lg:block lg:w-[480px]">
                        <!-- App frame -->
                        <div class="relative rotate-1 rounded-2xl bg-white shadow-2xl overflow-hidden">
                            <!-- Browser chrome -->
                            <div class="bg-neutral-900 px-4 py-3 flex items-center gap-2">
                                <div class="flex gap-1.5">
                                    <div class="h-3 w-3 rounded-full bg-red-400"></div>
                                    <div class="h-3 w-3 rounded-full bg-amber-400"></div>
                                    <div class="h-3 w-3 rounded-full bg-green-400"></div>
                                </div>
                                <div class="flex-1 rounded bg-white/10 px-3 py-1 text-xs text-neutral-300 text-center">
                                    app.getservicepro.com
                                </div>
                            </div>
                            <!-- App content -->
                            <div class="bg-neutral-50 p-4">
                                <div class="mb-4 flex items-center justify-between">
                                    <div>
                                        <div class="font-bold text-neutral-900">Good morning, Mike 👋</div>
                                        <div class="text-sm text-neutral-500">You have 4 jobs today</div>
                                    </div>
                                    <div class="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">Mon, Feb 21</div>
                                </div>
                                <div class="space-y-2">
                                    <div v-for="job in [
                                        { time: '8:00 AM', title: 'HVAC Repair', client: 'Johnson Residence', status: 'In Progress', statusColor: 'bg-blue-100 text-blue-700' },
                                        { time: '10:30 AM', title: 'Drain Cleaning', client: 'Martinez Office', status: 'Upcoming', statusColor: 'bg-neutral-100 text-neutral-600' },
                                        { time: '1:00 PM', title: 'Electrical Check', client: 'Brooks Warehouse', status: 'Upcoming', statusColor: 'bg-neutral-100 text-neutral-600' },
                                    ]" :key="job.time"
                                        class="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                                    >
                                        <div class="h-10 w-1 rounded-full bg-brand-500"></div>
                                        <div class="flex-1">
                                            <div class="text-xs text-neutral-400">{{ job.time }}</div>
                                            <div class="font-semibold text-neutral-900 text-sm">{{ job.title }}</div>
                                            <div class="text-xs text-neutral-500">{{ job.client }}</div>
                                        </div>
                                        <span :class="['rounded-full px-2 py-0.5 text-xs font-medium', job.statusColor]">{{ job.status }}</span>
                                    </div>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-2">
                                    <div class="rounded-xl bg-white p-2.5 text-center shadow-sm">
                                        <div class="text-lg font-bold text-neutral-900">3</div>
                                        <div class="text-xs text-neutral-500">Jobs done</div>
                                    </div>
                                    <div class="rounded-xl bg-white p-2.5 text-center shadow-sm">
                                        <div class="text-lg font-bold text-accent-500">$1,240</div>
                                        <div class="text-xs text-neutral-500">Invoiced</div>
                                    </div>
                                    <div class="rounded-xl bg-white p-2.5 text-center shadow-sm">
                                        <div class="text-lg font-bold text-brand-600">$890</div>
                                        <div class="text-xs text-neutral-500">Collected</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating stat cards -->
                        <div class="animate-float absolute -left-8 top-8 rounded-xl bg-white px-4 py-3 shadow-xl">
                            <div class="flex items-center gap-2">
                                <div class="h-2 w-2 rounded-full bg-green-400"></div>
                                <span class="text-sm font-medium text-neutral-900">3 jobs completed today</span>
                            </div>
                        </div>
                        <div class="animate-float-delay-1 absolute -right-6 bottom-20 rounded-xl bg-white px-4 py-3 shadow-xl">
                            <div class="text-sm font-medium text-neutral-900">Invoice sent — $485</div>
                            <div class="mt-1 inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Paid</div>
                        </div>
                        <div class="animate-float-delay-2 absolute -right-8 top-12 rounded-xl bg-white px-4 py-3 shadow-xl">
                            <div class="flex items-center gap-2">
                                <span class="text-base">💬</span>
                                <span class="text-sm font-medium text-neutral-900">Client replied via SMS</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Scroll indicator -->
                <div class="mt-16 flex justify-center">
                    <a href="#trades" class="text-white/40 hover:text-white/60 transition-colors animate-bounce">
                        <ChevronDown class="h-6 w-6" />
                    </a>
                </div>
            </div>
        </section>

        <!-- SECTION 2: Trades -->
        <div id="trades">
            <TradeLogos />
        </div>

        <!-- SECTION 3: Stats Banner -->
        <StatsBanner />

        <!-- SECTION 4: Pain Points -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Sound familiar?"
                    heading="Running a home service business is hard enough."
                    subtext="Most home service business owners are managing jobs out of their head — and losing money because of it."
                />
                <div class="grid gap-8 md:grid-cols-3">
                    <div
                        v-for="point in painPoints"
                        :key="point.title"
                        class="rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-lg"
                    >
                        <div :class="['mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl', point.iconBg]">
                            {{ point.icon }}
                        </div>
                        <h3 class="mb-3 text-xl font-semibold text-neutral-900">{{ point.title }}</h3>
                        <p class="leading-relaxed text-neutral-500">{{ point.body }}</p>
                    </div>
                </div>
                <div class="mt-12 text-center">
                    <p class="text-xl font-semibold text-neutral-700">ServicePro fixes all three. Automatically.</p>
                    <ChevronDown class="mx-auto mt-4 h-6 w-6 text-neutral-400" />
                </div>
            </div>
        </section>

        <!-- SECTION 5: Feature Showcase -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="How it works"
                    heading="Everything you need. Nothing you don't."
                    subtext="ServicePro is built for crews of 1 to 10. No enterprise complexity. No 6-hour onboarding call. Just a clean, fast app that runs your business."
                />
                <div class="space-y-24">
                    <FeatureShowcase
                        v-for="(block, index) in featureBlocks"
                        :key="block.tag"
                        :block="block"
                        :index="index"
                    />
                </div>
            </div>
        </section>

        <!-- SECTION 6: Full Feature Grid -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Everything included"
                    heading="All the features your business needs"
                />
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard
                        v-for="feature in allFeatures"
                        :key="feature.title"
                        :icon="feature.icon"
                        :title="feature.title"
                        :description="feature.description"
                    />
                </div>
            </div>
        </section>

        <!-- SECTION 7: Comparison Table -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="How we compare"
                    heading="More features. Half the price."
                    subtext="ServicePro gives you 90% of what Jobber and Housecall Pro offer, at a fraction of the cost. No long-term contracts."
                />
                <ComparisonTable :rows="comparisonRows" />
                <div class="mt-8 text-center">
                    <Button href="https://app.getservicepro.com/register" variant="primary" size="lg" external>
                        Try ServicePro free for 14 days — no credit card required
                    </Button>
                </div>
            </div>
        </section>

        <!-- SECTION 8: Testimonials -->
        <section class="bg-brand-950 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="What our beta users say"
                    heading="Home service businesses trust ServicePro"
                    theme="dark"
                />
                <TestimonialCarousel />
                <div class="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
                    <div>
                        <div class="text-2xl font-bold text-white">4.9/5</div>
                        <div class="text-sm text-neutral-400">Rated by beta users</div>
                    </div>
                    <div class="hidden h-8 w-px bg-white/10 sm:block"></div>
                    <div>
                        <div class="text-2xl font-bold text-white">&lt;30 min</div>
                        <div class="text-sm text-neutral-400">Zero to setup</div>
                    </div>
                    <div class="hidden h-8 w-px bg-white/10 sm:block"></div>
                    <div>
                        <div class="text-2xl font-bold text-white">50+</div>
                        <div class="text-sm text-neutral-400">Businesses in beta</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 9: Pricing Preview -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Simple pricing"
                    heading="No hidden fees. No long-term contracts."
                    subtext="Start free for 14 days. Cancel any time. Upgrade or downgrade at any time."
                />

                <!-- Billing toggle -->
                <div class="mb-10 flex items-center justify-center gap-4">
                    <span :class="['text-sm font-medium', !isAnnual ? 'text-neutral-900' : 'text-neutral-500']">Monthly</span>
                    <button
                        type="button"
                        class="relative h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        :class="isAnnual ? 'bg-brand-600' : 'bg-neutral-300'"
                        @click="isAnnual = !isAnnual"
                        :aria-pressed="isAnnual"
                    >
                        <span
                            class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                            :class="isAnnual ? 'translate-x-6' : 'translate-x-0.5'"
                        ></span>
                    </button>
                    <span :class="['text-sm font-medium', isAnnual ? 'text-neutral-900' : 'text-neutral-500']">
                        Annual <span class="text-accent-500 font-semibold">(Save 20%)</span>
                    </span>
                </div>

                <div class="grid gap-8 md:grid-cols-3">
                    <PricingCard
                        v-for="plan in pricingPlans"
                        :key="plan.id"
                        :plan="plan"
                        :is-annual="isAnnual"
                    />
                </div>

                <div class="mt-8 text-center space-y-2">
                    <p class="text-neutral-500">
                        Need more than 10 users?
                        <a href="/contact" class="text-brand-600 font-semibold hover:text-brand-700">Contact us for Enterprise pricing →</a>
                    </p>
                    <p class="text-neutral-400">
                        Have questions about pricing?
                        <a href="/pricing#faq" class="text-brand-600 hover:text-brand-700">See our FAQ →</a>
                    </p>
                </div>
            </div>
        </section>

        <!-- SECTION 10: Waitlist CTA -->
        <section id="waitlist" class="bg-gradient-to-r from-brand-600 to-brand-800 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col gap-12 lg:flex-row lg:items-start">
                    <div class="flex-1 lg:pt-4">
                        <h2 class="text-3xl font-bold text-white lg:text-4xl">Be first in line when we launch.</h2>
                        <p class="mt-4 text-lg leading-relaxed text-blue-100">
                            Join the waitlist today. Get 30 days free at launch — double the standard trial. Plus lock in founding member pricing.
                        </p>
                        <ul class="mt-6 space-y-3">
                            <li v-for="benefit in [
                                '30-day free trial (standard is 14 days)',
                                'Founding member rate — locked in for your first year',
                                'Priority access before public launch on 1 May 2026',
                            ]" :key="benefit" class="flex items-start gap-3 text-white">
                                <Check class="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                                {{ benefit }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex-1">
                        <WaitlistForm variant="inline" />
                        <p class="mt-4 text-center text-sm text-blue-200">
                            487 businesses already on the waitlist
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 11: FAQ -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Questions"
                    heading="Frequently asked questions"
                />
                <div class="grid gap-4 lg:grid-cols-2 lg:gap-8">
                    <FaqAccordion :items="generalFaqs.slice(0, 5)" />
                    <FaqAccordion :items="generalFaqs.slice(5)" />
                </div>
            </div>
        </section>

        <!-- SECTION 12: Final CTA Band -->
        <section class="bg-neutral-950 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-white lg:text-4xl">Ready to run your business like a pro?</h2>
                <p class="mt-4 text-lg text-neutral-400">Join 487 home service businesses already on the waitlist.</p>
                <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Button href="#waitlist" variant="success" size="xl">Join the Waitlist</Button>
                    <Button href="/pricing" variant="ghost" size="xl" class="text-white hover:bg-white/10 border border-white/20">
                        View Pricing
                    </Button>
                </div>
                <p class="mt-4 text-sm text-neutral-500">No credit card required. Setup in under 30 minutes.</p>
            </div>
        </section>
    </MarketingLayout>
</template>
