<script setup lang="ts">
import { Menu, X, ChevronDown } from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import Button from '@/components/ui/Button.vue';
import { navLinks, featuresDropdown, pricingDropdownItems } from '@/data/navigation';

const mobileMenuOpen = ref(false);
const featuresHover = ref(false);
const pricingHover = ref(false);
const isScrolled = ref(false);
let featuresTimeout: ReturnType<typeof setTimeout>;
let pricingTimeout: ReturnType<typeof setTimeout>;

function onScroll(): void {
    isScrolled.value = window.scrollY > 80;
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});

function onFeaturesEnter(): void {
    clearTimeout(featuresTimeout);
    featuresHover.value = true;
}
function onFeaturesLeave(): void {
    featuresTimeout = setTimeout(() => { featuresHover.value = false; }, 150);
}
function onPricingEnter(): void {
    clearTimeout(pricingTimeout);
    pricingHover.value = true;
}
function onPricingLeave(): void {
    pricingTimeout = setTimeout(() => { pricingHover.value = false; }, 150);
}

const APP_URL = 'https://app.getservicepro.com';
</script>

<template>
    <header
        :class="[
            'transition-all duration-300',
            isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent',
        ]"
    >
        <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <!-- Logo -->
            <Link href="/" class="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded">
                <img
                    v-if="isScrolled"
                    src="/assets/images/logo.png"
                    alt="ServicePro"
                    class="h-9 w-auto"
                />
                <template v-else>
                    <img src="/assets/images/logo_small.png" alt="" class="h-9 w-auto" />
                    <span class="text-xl font-extrabold text-white leading-none">ServicePro</span>
                </template>
            </Link>

            <!-- Desktop nav -->
            <div class="hidden items-center gap-1 lg:flex">
                <!-- Features with mega dropdown -->
                <div class="relative" @mouseenter="onFeaturesEnter" @mouseleave="onFeaturesLeave">
                    <button
                        type="button"
                        :class="[
                            'group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            isScrolled ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900' : 'text-white/90 hover:bg-white/10 hover:text-white',
                        ]"
                    >
                        Features
                        <ChevronDown :class="['h-4 w-4 transition-transform duration-150', featuresHover ? 'rotate-180' : '']" />
                    </button>

                    <Transition
                        enter-active-class="transition-all duration-150 ease-out"
                        enter-from-class="opacity-0 translate-y-1"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-100 ease-in"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 translate-y-1"
                    >
                        <div
                            v-if="featuresHover"
                            class="absolute left-1/2 top-full mt-2 w-[700px] -translate-x-1/3 rounded-2xl border border-neutral-100 bg-white p-6 shadow-xl"
                        >
                            <div class="grid grid-cols-4 gap-4 mb-4">
                                <div v-for="(column, ci) in featuresDropdown" :key="ci" class="space-y-3">
                                    <a
                                        v-for="item in column"
                                        :key="item.title"
                                        :href="item.href"
                                        class="flex items-start gap-3 rounded-xl p-2 hover:bg-neutral-50 transition-colors group/item"
                                    >
                                        <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 group-hover/item:bg-brand-200 transition-colors">
                                            <span class="text-brand-600 text-xs">●</span>
                                        </div>
                                        <div>
                                            <div class="text-sm font-semibold text-neutral-900">{{ item.title }}</div>
                                            <div class="text-xs text-neutral-500">{{ item.description }}</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="border-t border-neutral-100 pt-3">
                                <Link href="/features" class="text-sm font-semibold text-brand-600 hover:text-brand-700">
                                    See all features →
                                </Link>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Pricing with dropdown -->
                <div class="relative" @mouseenter="onPricingEnter" @mouseleave="onPricingLeave">
                    <button
                        type="button"
                        :class="[
                            'group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            isScrolled ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900' : 'text-white/90 hover:bg-white/10 hover:text-white',
                        ]"
                    >
                        Pricing
                        <ChevronDown :class="['h-4 w-4 transition-transform duration-150', pricingHover ? 'rotate-180' : '']" />
                    </button>

                    <Transition
                        enter-active-class="transition-all duration-150 ease-out"
                        enter-from-class="opacity-0 translate-y-1"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-100 ease-in"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 translate-y-1"
                    >
                        <div
                            v-if="pricingHover"
                            class="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-2xl border border-neutral-100 bg-white p-4 shadow-xl"
                        >
                            <div class="space-y-1 mb-3">
                                <a
                                    v-for="item in pricingDropdownItems"
                                    :key="item.label"
                                    :href="item.href"
                                    class="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-neutral-50 transition-colors"
                                >
                                    <div>
                                        <div class="text-sm font-semibold text-neutral-900">{{ item.label }}</div>
                                        <div class="text-xs text-neutral-500">{{ item.description }}</div>
                                    </div>
                                    <span class="text-sm font-bold text-brand-600">{{ item.price }}</span>
                                </a>
                            </div>
                            <div class="border-t border-neutral-100 pt-3">
                                <Link href="/pricing" class="text-sm font-semibold text-brand-600 hover:text-brand-700">
                                    View full pricing →
                                </Link>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Other nav links -->
                <template v-for="link in navLinks.filter(l => l.label !== 'Features' && l.label !== 'Pricing')" :key="link.label">
                    <Link
                        :href="link.href"
                        :class="[
                            'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            isScrolled ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900' : 'text-white/90 hover:bg-white/10 hover:text-white',
                        ]"
                    >
                        {{ link.label }}
                    </Link>
                </template>
            </div>

            <!-- Desktop CTA buttons -->
            <div class="hidden items-center gap-3 lg:flex">
                <Button
                    :href="APP_URL + '/login'"
                    variant="ghost"
                    size="md"
                    :class="isScrolled ? '' : 'text-white hover:bg-white/10'"
                    external
                >
                    Log In
                </Button>
                <Button :href="APP_URL + '/register'" variant="primary" size="md" external>
                    Start Free Trial
                </Button>
            </div>

            <!-- Mobile hamburger -->
            <button
                type="button"
                class="rounded-lg p-2 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                :class="isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/10'"
                @click="mobileMenuOpen = !mobileMenuOpen"
                :aria-expanded="mobileMenuOpen"
                aria-label="Toggle menu"
            >
                <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
                <X v-else class="h-6 w-6" />
            </button>
        </nav>

        <!-- Mobile menu -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
        >
            <div
                v-if="mobileMenuOpen"
                class="absolute left-0 right-0 top-full border-t border-neutral-100 bg-white shadow-xl lg:hidden"
            >
                <div class="mx-auto max-w-7xl px-4 py-4 space-y-1">
                    <Link
                        v-for="link in navLinks"
                        :key="link.label"
                        :href="link.href"
                        class="block rounded-xl px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                        @click="mobileMenuOpen = false"
                    >
                        {{ link.label }}
                    </Link>
                    <div class="border-t border-neutral-100 pt-3 mt-3 flex flex-col gap-2">
                        <Button :href="APP_URL + '/login'" variant="secondary" size="lg" class="w-full" external>
                            Log In
                        </Button>
                        <Button :href="APP_URL + '/register'" variant="primary" size="lg" class="w-full" external>
                            Start Free Trial
                        </Button>
                    </div>
                </div>
            </div>
        </Transition>
    </header>
</template>
