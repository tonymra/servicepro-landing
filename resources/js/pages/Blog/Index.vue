<script setup lang="ts">
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import Badge from '@/components/ui/Badge.vue';
import WaitlistForm from '@/components/marketing/WaitlistForm.vue';

const posts = [
    { title: '5 Ways HVAC Businesses Lose $500/Month (And How to Fix It)', category: 'Business Tips', excerpt: 'Most HVAC owners don\'t realize how much revenue slips through the cracks every month. Here are the five most common — and how to close them.', readTime: '5 min read', date: 'Feb 15, 2026', gradient: 'from-blue-500 to-blue-700' },
    { title: 'How to Send Invoices Clients Actually Pay in 24 Hours', category: 'How-To', excerpt: 'The timing, format, and follow-up method you use for invoices has a massive impact on how quickly you get paid. Here\'s what works.', readTime: '4 min read', date: 'Feb 10, 2026', gradient: 'from-green-500 to-green-700' },
    { title: 'The Field Service Software Comparison: What Small Crews Actually Need', category: 'Industry', excerpt: 'Jobber vs Housecall Pro vs ServicePro — a no-BS comparison from the perspective of a 3-person home service crew.', readTime: '7 min read', date: 'Feb 5, 2026', gradient: 'from-purple-500 to-purple-700' },
    { title: 'GPS Tracking for Service Crews: Is It Worth It?', category: 'Business Tips', excerpt: 'GPS tracking raises valid concerns about trust and privacy. But for most home service businesses, the ROI is undeniable. Here\'s our take.', readTime: '3 min read', date: 'Jan 28, 2026', gradient: 'from-amber-500 to-amber-700' },
    { title: 'Stop Chasing Quotes: Automate Your Follow-up Process', category: 'How-To', excerpt: 'Sending a quote and never following up is leaving money on the table. Here\'s how to set up automatic follow-ups that don\'t feel spammy.', readTime: '4 min read', date: 'Jan 20, 2026', gradient: 'from-red-500 to-red-700' },
    { title: 'Pricing Your HVAC Services in 2026: A Practical Guide', category: 'Industry', excerpt: 'Labor costs, material prices, and competition have all shifted. Here\'s how to price your HVAC services profitably in today\'s market.', readTime: '6 min read', date: 'Jan 12, 2026', gradient: 'from-teal-500 to-teal-700' },
];

const categories = ['Business Tips', 'How-To', 'Industry', 'Productivity', 'Technology'];
</script>

<template>
    <MarketingLayout
        title="Blog — ServicePro"
        description="Tips, guides, and insights for home service business owners."
    >
        <!-- Hero -->
        <section class="bg-white pt-32 pb-16 border-b border-neutral-100">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl font-extrabold text-neutral-900 lg:text-5xl">The ServicePro Blog</h1>
                <p class="mt-4 text-xl text-neutral-500">Tips, guides, and insights for home service business owners.</p>
            </div>
        </section>

        <section class="bg-neutral-50 py-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid gap-8 lg:grid-cols-3">
                    <!-- Blog grid (2/3) -->
                    <div class="lg:col-span-2">
                        <!-- Coming soon banner -->
                        <div class="mb-8 rounded-2xl bg-brand-50 border border-brand-200 px-6 py-4">
                            <p class="text-sm font-medium text-brand-700">
                                📝 Full blog launching with ServicePro in May 2026. These are preview posts.
                            </p>
                        </div>

                        <div class="grid gap-6 sm:grid-cols-2">
                            <article v-for="post in posts" :key="post.title" class="rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                <!-- Gradient image placeholder -->
                                <div :class="['h-40 bg-gradient-to-br', post.gradient]"></div>
                                <div class="p-5">
                                    <Badge variant="brand" size="sm">{{ post.category }}</Badge>
                                    <h2 class="mt-3 font-semibold text-neutral-900 leading-snug">{{ post.title }}</h2>
                                    <p class="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-3">{{ post.excerpt }}</p>
                                    <div class="mt-4 flex items-center justify-between text-xs text-neutral-400">
                                        <span>{{ post.date }} · {{ post.readTime }}</span>
                                        <a href="#" class="font-semibold text-brand-600 hover:text-brand-700">Read more →</a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    <!-- Sidebar (1/3) -->
                    <div class="space-y-6">
                        <!-- Newsletter signup -->
                        <div class="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-6">
                            <h3 class="mb-2 font-bold text-white">Get notified when we launch</h3>
                            <p class="mb-4 text-sm text-blue-200">Join 487 businesses on the waitlist.</p>
                            <WaitlistForm variant="compact" />
                        </div>

                        <!-- Categories -->
                        <div class="rounded-2xl bg-white border border-neutral-200 p-6">
                            <h3 class="mb-4 font-bold text-neutral-900">Categories</h3>
                            <ul class="space-y-2">
                                <li v-for="cat in categories" :key="cat">
                                    <a href="#" class="flex items-center justify-between text-sm text-neutral-600 hover:text-brand-600 transition-colors">
                                        <span>{{ cat }}</span>
                                        <span class="text-xs text-neutral-400">→</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Coming soon -->
                        <div class="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center">
                            <div class="text-2xl mb-2">📅</div>
                            <h3 class="font-semibold text-neutral-900 mb-1">Full blog — May 2026</h3>
                            <p class="text-sm text-neutral-500">Weekly posts on growing your home service business.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </MarketingLayout>
</template>
