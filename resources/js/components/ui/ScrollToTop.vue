<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { ArrowUp } from 'lucide-vue-next';

const visible = ref(false);

function onScroll(): void {
    visible.value = window.scrollY > 400;
}

function scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
    >
        <button
            v-if="visible"
            type="button"
            aria-label="Scroll to top"
            class="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 transition-colors"
            @click="scrollToTop"
        >
            <ArrowUp class="h-5 w-5" />
        </button>
    </Transition>
</template>
