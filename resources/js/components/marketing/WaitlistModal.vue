<script setup lang="ts">
import { X } from 'lucide-vue-next';
import WaitlistForm from './WaitlistForm.vue';

interface Props {
    open: boolean;
}

defineProps<Props>();
defineEmits<{ close: [] }>();
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="open"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                @click.self="$emit('close')"
            >
                <div class="relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-8 shadow-2xl">
                    <button
                        type="button"
                        class="absolute right-4 top-4 rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                        @click="$emit('close')"
                    >
                        <X class="h-5 w-5" />
                    </button>
                    <h2 class="mb-2 text-2xl font-bold text-white">Join the waitlist</h2>
                    <p class="mb-6 text-neutral-300">Get 30 days free when we launch on May 1, 2026.</p>
                    <WaitlistForm variant="modal" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
