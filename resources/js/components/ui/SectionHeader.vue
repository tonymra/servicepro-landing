<script setup lang="ts">
interface Props {
    eyebrow?: string;
    heading: string;
    subtext?: string;
    align?: 'left' | 'center' | 'right';
    theme?: 'light' | 'dark';
}

withDefaults(defineProps<Props>(), {
    align: 'center',
    theme: 'light',
});

const alignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
};
</script>

<template>
    <div :class="['mb-12', alignClasses[align]]">
        <p
            v-if="eyebrow"
            :class="['mb-3 text-sm font-semibold uppercase tracking-widest', theme === 'dark' ? 'text-brand-400' : 'text-brand-600']"
        >
            {{ eyebrow }}
        </p>
        <h2
            :class="[
                'text-3xl font-bold lg:text-4xl',
                theme === 'dark' ? 'text-white' : 'text-neutral-900',
            ]"
        >
            {{ heading }}
        </h2>
        <p
            v-if="subtext"
            :class="[
                'mt-4 text-lg leading-relaxed',
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-500',
                align === 'center' ? 'mx-auto max-w-2xl' : '',
            ]"
        >
            {{ subtext }}
        </p>
    </div>
</template>
