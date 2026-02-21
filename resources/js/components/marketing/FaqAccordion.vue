<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import { ref } from 'vue';
import type { FaqItem } from '@/data/faqs';

interface Props {
    items: FaqItem[];
}

defineProps<Props>();

const openIndex = ref<number | null>(null);

function toggle(index: number): void {
    openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
    <div class="divide-y divide-neutral-100">
        <div v-for="(item, index) in items" :key="index" class="py-4">
            <button
                type="button"
                class="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                @click="toggle(index)"
                :aria-expanded="openIndex === index"
            >
                <span class="font-semibold text-neutral-900">{{ item.question }}</span>
                <ChevronDown
                    :class="[
                        'h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200',
                        openIndex === index ? 'rotate-180' : '',
                    ]"
                />
            </button>
            <div
                v-show="openIndex === index"
                class="mt-3 text-neutral-600 leading-relaxed pr-8"
            >
                {{ item.answer }}
            </div>
        </div>
    </div>
</template>
