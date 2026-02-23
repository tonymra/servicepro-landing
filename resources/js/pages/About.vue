<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import Button from '@/components/ui/Button.vue';
import WaitlistForm from '@/components/marketing/WaitlistForm.vue';

const values = [
    { emoji: '✨', title: 'Simplicity first', description: "Every feature we build has to pass one test: can a plumber on the side of the road use it in under 60 seconds? If not, we simplify it or cut it." },
    { emoji: '🔧', title: 'Built for the trades', description: "We don't build for property managers or enterprise facilities teams. We build for the owner-operator with 1 to 10 people on their crew." },
    { emoji: '🏡', title: 'Built for home services', description: 'ServicePro is purpose-built for the home service market. Our pricing is straightforward, our support team knows the trades, and our features match how field crews actually work.' },
];

const pillars = [
    { emoji: '🔍', title: 'Transparency', description: 'No hidden fees. No dark patterns. No contracts that lock you in. We publish our pricing, our roadmap, and our terms in plain English.' },
    { emoji: '🛡️', title: 'Reliability', description: "Your business can't afford downtime. We target 99.9% uptime and alert you proactively if anything is wrong — before your crew notices." },
    { emoji: '⚡', title: 'Simplicity', description: "Complexity is the enemy of adoption. We ruthlessly prioritize the features that matter and remove everything that doesn't." },
    { emoji: '🤝', title: 'Community', description: "We're building this with our customers, not for them. Every feature on our roadmap came from a conversation with a real home service business owner." },
];

const waitlistBenefits = [
    '30-day free trial (standard is 14 days)',
    'Founding member rate — locked in for your first year',
    'Priority access before public launch on 1 May 2026',
];
</script>

<template>
    <MarketingLayout
        title="About ServicePro"
        description="Built for home service business owners who are tired of overpriced, overcomplicated software."
    >
        <!-- Hero -->
        <section class="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 pb-24">
            <div class="dot-grid absolute inset-0 opacity-40"></div>
            <div class="relative mx-auto max-w-4xl px-4 pt-32 text-center sm:px-6 lg:px-8">
                <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                    <span class="h-2 w-2 animate-pulse rounded-full bg-accent-500"></span>
                    <span class="text-sm font-medium text-white">Our story</span>
                </div>
                <h1 class="text-4xl font-extrabold leading-tight text-white lg:text-6xl">
                    Built for the people who<br class="hidden lg:block" /> keep homes running.
                </h1>
                <p class="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-neutral-300">
                    We spent six months talking to HVAC technicians, plumbers, and electricians before writing a single line of code. What we heard was the same story over and over: the software is too expensive, too complicated, and built for someone else.
                </p>
                <p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-400">So we built something different.</p>
            </div>
        </section>

        <!-- Mission + Values -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
                    <div>
                        <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600">Our mission</p>
                        <h2 class="text-3xl font-bold text-neutral-900 lg:text-4xl">
                            Give every home service business the tools that used to be reserved for big companies.
                        </h2>
                        <p class="mt-6 text-lg leading-relaxed text-neutral-500">
                            Scheduling software, invoicing tools, and automated follow-up used to cost $300+ a month and require a dedicated admin to operate. That's not fair when you're a plumber running two vans and trying to build something for your family.
                        </p>
                        <p class="mt-4 text-lg leading-relaxed text-neutral-500">
                            ServicePro brings those capabilities down to $79/month with setup in under 30 minutes — no IT department, no onboarding consultant, no six-week implementation project.
                        </p>
                        <ul class="mt-8 space-y-3">
                            <li v-for="item in ['Affordable enough for a solo operator', 'Powerful enough for a crew of 10', 'Simple enough to use from a job site']" :key="item" class="flex items-center gap-3 text-neutral-700">
                                <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500">
                                    <Check class="h-3.5 w-3.5 text-white" />
                                </div>
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                    <div class="space-y-6">
                        <div v-for="value in values" :key="value.title" class="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 transition-shadow duration-200 hover:shadow-md">
                            <div class="mb-3 flex items-center gap-3">
                                <span class="text-2xl">{{ value.emoji }}</span>
                                <h3 class="text-lg font-semibold text-neutral-900">{{ value.title }}</h3>
                            </div>
                            <p class="leading-relaxed text-neutral-500">{{ value.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Story -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600">Our story</p>
                <h2 class="text-3xl font-bold text-neutral-900 lg:text-4xl">How ServicePro got started</h2>
                <div class="mt-8 space-y-6 text-lg leading-relaxed text-neutral-600">
                    <p>In the summer of 2024, our founder sat in a parking lot outside a supply house in Phoenix watching an HVAC technician update his job schedule in three different apps — a notes app, a calendar, and a spreadsheet he'd emailed himself — because none of the "real" software fit how he actually worked.</p>
                    <p>That technician had been in business for 11 years. He'd tried Jobber, he'd tried Housecall Pro, he'd tried a couple of others. They were all too expensive when he was small, too complex when he needed to move fast, and built with assumptions that didn't match his day.</p>
                    <p>We spent the next six months interviewing hundreds of HVAC technicians, plumbers, electricians, cleaners, and handymen across 22 states. We asked them what they hated about their current software, what they wished it did, and what they'd pay if it actually solved their problem.</p>
                    <p>The answers were remarkably consistent: they wanted scheduling that worked on a phone, invoices they could send the moment a job was done, and something that would automatically follow up on quotes and unpaid invoices so they didn't have to chase clients.</p>
                    <p>That's exactly what we built. ServicePro is the result of those conversations — not a feature-bloated enterprise platform trimmed down to a lower price point, but something designed from scratch for the way trades businesses actually operate.</p>
                </div>
            </div>
        </section>

        <!-- Values -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="What we believe"
                    heading="Four pillars we won't compromise on."
                    subtext="These aren't values we wrote for a pitch deck. They're the constraints we put on every product decision we make."
                />
                <div class="grid gap-8 sm:grid-cols-2">
                    <div v-for="pillar in pillars" :key="pillar.title" class="rounded-2xl bg-neutral-50 p-8 transition-shadow duration-200 hover:shadow-lg">
                        <span class="mb-4 block text-3xl">{{ pillar.emoji }}</span>
                        <h3 class="mb-3 text-xl font-semibold text-neutral-900">{{ pillar.title }}</h3>
                        <p class="leading-relaxed text-neutral-500">{{ pillar.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Investors -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600">Investors</p>
                <h2 class="text-3xl font-bold text-neutral-900 lg:text-4xl">We're currently pre-seed and founder-funded.</h2>
                <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
                    We're not taking institutional money until we've proven the model with real customers. If you're an investor who cares about the trades and believes in patient capital, we'd love to talk.
                </p>
                <div class="mt-8 inline-flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-8 py-6">
                    <span class="text-2xl">📬</span>
                    <div class="text-left">
                        <div class="text-sm text-neutral-500">Investor inquiries</div>
                        <a href="mailto:investors@getservicepro.com" class="font-semibold text-brand-600 hover:text-brand-700">investors@getservicepro.com</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Waitlist CTA -->
        <section class="bg-gradient-to-r from-brand-600 to-brand-800 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col gap-12 lg:flex-row lg:items-start">
                    <div class="flex-1 lg:pt-4">
                        <h2 class="text-3xl font-bold text-white lg:text-4xl">Be first in line when we launch.</h2>
                        <p class="mt-4 text-lg leading-relaxed text-blue-100">Join the waitlist today. Get 30 days free — double the standard trial.</p>
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
