<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import type { Testimonial } from '@/data/testimonials';

interface Props {
    testimonial: Testimonial;
}

defineProps<Props>();
</script>

<template>
    <div class="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div class="mb-4 flex gap-0.5">
            <Star
                v-for="i in testimonial.rating"
                :key="i"
                class="h-4 w-4 fill-amber-400 text-amber-400"
            />
        </div>
        <blockquote class="mb-6 text-neutral-300 leading-relaxed">
            "{{ testimonial.quote }}"
        </blockquote>
        <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {{ testimonial.initials }}
            </div>
            <div>
                <div class="font-semibold text-white">{{ testimonial.name }}</div>
                <div class="text-sm text-neutral-400">{{ testimonial.business }} · {{ testimonial.city }}, {{ testimonial.state }}</div>
            </div>
        </div>
    </div>
</template>
