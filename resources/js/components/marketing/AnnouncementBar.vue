<script setup lang="ts">
import { Megaphone, X } from 'lucide-vue-next';
import { ref } from 'vue';

const STORAGE_KEY = 'sp_announcement_dismissed';

const dismissed = ref(localStorage.getItem(STORAGE_KEY) === 'true');

function dismiss(): void {
    dismissed.value = true;
    localStorage.setItem(STORAGE_KEY, 'true');
}
</script>

<template>
    <div
        v-if="!dismissed"
        class="bg-brand-600 py-2 px-4 text-white"
    >
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div class="flex flex-1 items-center gap-2 text-sm font-medium">
                <Megaphone class="h-4 w-4 shrink-0" />
                <span class="hidden sm:inline">
                    ServicePro is launching 1 May 2026 —
                    <a href="#waitlist" class="underline underline-offset-2 hover:no-underline">
                        Join the waitlist and get 30 days free
                    </a>
                </span>
                <span class="sm:hidden">
                    <a href="#waitlist" class="underline underline-offset-2">Join the waitlist — 30 days free →</a>
                </span>
            </div>
            <div class="flex items-center gap-4">
                <a
                    href="#waitlist"
                    class="hidden whitespace-nowrap text-sm font-semibold text-white underline underline-offset-2 hover:no-underline sm:inline"
                >
                    Join Waitlist →
                </a>
                <button
                    type="button"
                    class="rounded p-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Dismiss announcement"
                    @click="dismiss"
                >
                    <X class="h-4 w-4" />
                </button>
            </div>
        </div>
    </div>
</template>
