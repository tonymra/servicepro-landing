<script setup lang="ts">
import { Lock, Shield, Check } from 'lucide-vue-next';

interface Props {
    theme?: 'light' | 'dark';
}

withDefaults(defineProps<Props>(), { theme: 'light' });

const badges = [
    { icon: 'lock', label: 'SSL Secured' },
    { icon: 'shield', label: 'SOC 2 In Progress' },
    { icon: 'check', label: 'No Contract Required' },
];
</script>

<template>
    <div class="flex flex-wrap items-center gap-4">
        <div
            v-for="badge in badges"
            :key="badge.label"
            class="flex items-center gap-1.5"
        >
            <Lock v-if="badge.icon === 'lock'" :class="['h-4 w-4', theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500']" />
            <Shield v-else-if="badge.icon === 'shield'" :class="['h-4 w-4', theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500']" />
            <Check v-else :class="['h-4 w-4', theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500']" />
            <span :class="['text-sm', theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500']">
                {{ badge.label }}
            </span>
        </div>
    </div>
</template>
