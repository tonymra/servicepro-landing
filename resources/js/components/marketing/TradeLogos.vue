<script setup lang="ts">
const trades = [
    { emoji: '❄️', label: 'HVAC' },
    { emoji: '🔧', label: 'Plumbing' },
    { emoji: '⚡', label: 'Electrical' },
    { emoji: '🧹', label: 'Cleaning' },
    { emoji: '🔨', label: 'Handyman' },
    { emoji: '🌿', label: 'Landscaping' },
    { emoji: '🐛', label: 'Pest Control' },
    { emoji: '🖌️', label: 'Painting' },
    { emoji: '🍳', label: 'Appliance Repair' },
    { emoji: '🔑', label: 'Locksmith' },
];
</script>

<template>
    <section class="border-y border-neutral-100 bg-white py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p class="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Built for the trades
            </p>
            <div class="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
                <div
                    v-for="trade in trades"
                    :key="trade.label"
                    class="flex shrink-0 flex-col items-center gap-2"
                >
                    <span class="text-2xl">{{ trade.emoji }}</span>
                    <span class="whitespace-nowrap text-sm text-neutral-600">{{ trade.label }}</span>
                </div>
            </div>
        </div>
    </section>
</template>
