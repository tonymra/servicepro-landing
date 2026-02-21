<script setup lang="ts">
interface Props {
    variant?: 'brand' | 'success' | 'warning' | 'neutral' | 'white';
    size?: 'sm' | 'md';
}

withDefaults(defineProps<Props>(), {
    variant: 'brand',
    size: 'md',
});

const variantClasses: Record<string, string> = {
    brand: 'bg-brand-100 text-brand-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    neutral: 'bg-neutral-100 text-neutral-600',
    white: 'bg-white/10 border border-white/20 text-white',
};

const sizeClasses: Record<string, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
};
</script>

<template>
    <span :class="['inline-flex items-center gap-1 rounded-full font-medium', variantClasses[variant], sizeClasses[size]]">
        <slot />
    </span>
</template>
