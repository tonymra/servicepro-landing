<script setup lang="ts">
import TestimonialCard from './TestimonialCard.vue';
import { testimonials } from '@/data/testimonials';
</script>

<template>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TestimonialCard
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            :testimonial="testimonial"
        />
    </div>
</template>
