<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';

const STORAGE_KEY = 'sp_cookies_accepted';

const visible = ref(localStorage.getItem(STORAGE_KEY) === null);

function accept(): void {
    localStorage.setItem(STORAGE_KEY, 'true');
    visible.value = false;
}

function decline(): void {
    localStorage.setItem(STORAGE_KEY, 'false');
    visible.value = false;
}
</script>

<template>
    <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-y-0"
        leave-to-class="translate-y-full"
    >
        <div
            v-if="visible"
            class="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-neutral-900 px-4 py-4 text-white"
        >
            <div class="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <p class="text-sm text-neutral-300">
                    We use cookies to improve your experience. By continuing, you agree to our
                    <a href="/privacy" class="text-brand-400 underline underline-offset-2 hover:no-underline">Cookie Policy</a>.
                </p>
                <div class="flex items-center gap-4 shrink-0">
                    <button
                        type="button"
                        class="text-sm text-neutral-400 underline underline-offset-2 hover:text-neutral-300 hover:no-underline"
                        @click="decline"
                    >
                        Decline
                    </button>
                    <a
                        href="/privacy"
                        class="text-sm text-neutral-400 underline underline-offset-2 hover:text-neutral-300 hover:no-underline"
                    >
                        Learn more
                    </a>
                    <Button variant="primary" size="sm" @click="accept">Accept</Button>
                </div>
            </div>
        </div>
    </Transition>
</template>
