<script setup lang="ts">
const stats = [
    { value: '500+', label: 'Home service businesses on the waitlist' },
    { value: '<30 min', label: 'Average setup time' },
    { value: '$79/mo', label: 'Starting price — half the cost of Jobber' },
    { value: '4.9 / 5', label: 'Beta user satisfaction rating' },
];
</script>

<template>
    <section class="bg-brand-600 py-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
                <div
                    v-for="(stat, index) in stats"
                    :key="stat.value"
                    :class="[
                        'text-center',
                        index < stats.length - 1 ? 'lg:border-r lg:border-white/20' : '',
                    ]"
                >
                    <div class="text-4xl font-extrabold text-white">{{ stat.value }}</div>
                    <div class="mt-1 text-sm text-blue-100">{{ stat.label }}</div>
                </div>
            </div>
        </div>
    </section>
</template>
