<script setup lang="ts">
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Linkedin, Music2 } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
import type { Component } from 'vue';
import { footerLinks } from '@/data/navigation';
import { socialLinks } from '@/data/social';
import TrustBadges from './TrustBadges.vue';

const socialIconMap: Record<string, Component> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    linkedin: Linkedin,
    'music-2': Music2,
};

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-neutral-950 text-white">
        <!-- Contact strip -->
        <div class="border-b border-white/10">
            <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-6 lg:px-8">
                <a href="mailto:hello@getservicepro.com" class="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                    <Mail class="h-4 w-4 text-neutral-500" />
                    hello@getservicepro.com
                </a>
                <a href="tel:+18557372876" class="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                    <Phone class="h-4 w-4 text-neutral-500" />
                    +1 (855) 737-2876
                </a>
                <div class="flex items-center gap-2 text-sm text-neutral-300">
                    <MapPin class="h-4 w-4 text-neutral-500" />
                    Sheridan, Wyoming, USA
                </div>
            </div>
        </div>

        <!-- Main footer columns -->
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <!-- Brand column -->
                <div>
                    <Link href="/" class="inline-block">
                        <span class="text-xl font-extrabold text-white">Service<span class="text-brand-500">Pro</span></span>
                    </Link>
                    <p class="mt-4 text-sm leading-relaxed text-neutral-400">
                        Field service management software built for small home service businesses across the United States.
                    </p>

                    <!-- Social links -->
                    <div class="mt-6 flex flex-wrap gap-3">
                        <a
                            v-for="social in socialLinks"
                            :key="social.platform"
                            :href="social.url"
                            :aria-label="social.platform"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <component :is="socialIconMap[social.icon]" class="h-4 w-4" />
                        </a>
                    </div>

                    <!-- Trust badges -->
                    <div class="mt-6">
                        <TrustBadges theme="dark" />
                    </div>
                </div>

                <!-- Product column -->
                <div>
                    <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Product</h3>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.product" :key="link.label">
                            <a
                                :href="link.href"
                                class="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                                {{ link.label }}
                                <span v-if="link.comingSoon" class="rounded bg-neutral-700 px-1 py-0.5 text-xs text-neutral-400">
                                    Soon
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Company column -->
                <div>
                    <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Company</h3>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.company" :key="link.label">
                            <a
                                :href="link.href"
                                class="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                                {{ link.label }}
                                <span v-if="link.comingSoon" class="rounded bg-neutral-700 px-1 py-0.5 text-xs text-neutral-400">
                                    Soon
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Legal & Support column -->
                <div>
                    <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Legal & Support</h3>
                    <ul class="space-y-3">
                        <li v-for="link in footerLinks.legal" :key="link.label">
                            <a
                                :href="link.href"
                                class="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                                {{ link.label }}
                                <span v-if="link.comingSoon" class="rounded bg-neutral-700 px-1 py-0.5 text-xs text-neutral-400">
                                    Soon
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-white/10">
            <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-neutral-500 sm:flex-row sm:px-6 lg:px-8">
                <span>© {{ currentYear }} ServicePro LLC. All rights reserved. Registered in the United States.</span>
                <span>Made for home service businesses 🇺🇸</span>
            </div>
        </div>
    </footer>
</template>
