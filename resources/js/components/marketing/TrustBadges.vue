<script setup lang="ts">
import { Lock, Shield, Check } from 'lucide-vue-next';

interface Props {
    theme?: 'light' | 'dark';
}

withDefaults(defineProps<Props>(), { theme: 'light' });

const badges = [
    { icon: 'flag', label: 'US-Only Platform' },
    { icon: 'lock', label: 'SSL Secured' },
    { icon: 'shield', label: 'SOC 2 In Progress' },
];
</script>

<template>
    <div class="flex flex-wrap items-center gap-4">
        <div
            v-for="badge in badges"
            :key="badge.label"
            class="flex items-center gap-1.5"
        >
            <span v-if="badge.icon === 'flag'" class="text-base">🇺🇸</span>
            <Lock v-else-if="badge.icon === 'lock'" :class="['h-4 w-4', theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500']" />
            <Shield v-else :class="['h-4 w-4', theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500']" />
            <span :class="['text-sm', theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500']">
                {{ badge.label }}
            </span>
        </div>
    </div>
</template>
