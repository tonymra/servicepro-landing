<script setup lang="ts">
interface Props {
    variant?: 'primary' | 'secondary' | 'success' | 'ghost' | 'dark';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    external?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    external: false,
});

const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantClasses: Record<string, string> = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white focus-visible:ring-brand-600',
    secondary: 'bg-white border-2 border-brand-600 text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-600',
    success: 'bg-accent-500 hover:bg-accent-600 text-white focus-visible:ring-accent-500',
    ghost: 'text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-600',
    dark: 'bg-neutral-900 hover:bg-neutral-800 text-white focus-visible:ring-neutral-900',
};

const sizeClasses: Record<string, string> = {
    sm: 'text-sm px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2',
    xl: 'text-lg px-8 py-4 rounded-xl gap-2.5',
};

const classes = `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`;
</script>

<template>
    <a
        v-if="href"
        :href="href"
        :class="classes"
        :target="external ? '_blank' : undefined"
        :rel="external ? 'noopener noreferrer' : undefined"
    >
        <slot />
    </a>
    <button v-else :type="type" :disabled="disabled || loading" :class="classes">
        <svg
            v-if="loading"
            class="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
        <slot />
    </button>
</template>
