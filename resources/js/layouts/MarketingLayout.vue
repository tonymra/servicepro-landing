<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AnnouncementBar from '@/components/marketing/AnnouncementBar.vue';
import Navbar from '@/components/marketing/Navbar.vue';
import Footer from '@/components/marketing/Footer.vue';
import CookieBanner from '@/components/marketing/CookieBanner.vue';
import ScrollToTop from '@/components/ui/ScrollToTop.vue';

interface Props {
    title: string;
    description?: string;
    ogImage?: string;
    canonical?: string;
}

withDefaults(defineProps<Props>(), {
    description: 'Run your home service business like a pro. Scheduling, invoicing, and smart SMS for HVAC, plumbing, electrical, cleaning crews, and more.',
    ogImage: '/og-image.png',
});
</script>

<template>
    <Head>
        <title>{{ title }}</title>
        <meta name="description" :content="description" />
        <link v-if="canonical" rel="canonical" :href="canonical" />
        <meta property="og:title" :content="title" />
        <meta property="og:description" :content="description" />
        <meta property="og:image" :content="ogImage" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ServicePro" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="title" />
        <meta name="twitter:description" :content="description" />
        <meta name="twitter:image" :content="ogImage" />
    </Head>

    <div class="fixed top-0 left-0 right-0 z-40">
        <AnnouncementBar />
        <Navbar />
    </div>

    <main>
        <slot />
    </main>

    <Footer />
    <CookieBanner />
    <ScrollToTop />
</template>
