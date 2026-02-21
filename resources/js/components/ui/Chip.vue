<script setup lang="ts">
interface Props {
    color?: 'brand' | 'green' | 'amber' | 'purple';
}

withDefaults(defineProps<Props>(), {
    color: 'brand',
});

const colorClasses: Record<string, string> = {
    brand: 'bg-brand-100 text-brand-700',
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700',
    purple: 'bg-purple-100 text-purple-700',
};
</script>

<template>
    <span :class="['inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold', colorClasses[color]]">
        <slot />
    </span>
</template>
