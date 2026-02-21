<script setup lang="ts">
import { Calendar, Users, FileText, CreditCard, Clipboard, MessageSquare, Repeat, MapPin, Camera, Users2, Smartphone, LayoutDashboard, BarChart, Zap, Bell, Navigation } from 'lucide-vue-next';
import type { Component } from 'vue';

interface Props {
    icon: string;
    title: string;
    description: string;
}

defineProps<Props>();

const icons: Record<string, Component> = {
    calendar: Calendar,
    users: Users,
    'file-text': FileText,
    'credit-card': CreditCard,
    clipboard: Clipboard,
    'message-square': MessageSquare,
    repeat: Repeat,
    'map-pin': MapPin,
    camera: Camera,
    'users-2': Users2,
    smartphone: Smartphone,
    'layout-dashboard': LayoutDashboard,
    'bar-chart': BarChart,
    zap: Zap,
    bell: Bell,
    navigation: Navigation,
};
</script>

<template>
    <div class="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
            <component :is="icons[icon]" class="h-5 w-5 text-brand-600" />
        </div>
        <h3 class="mb-1 text-base font-semibold text-neutral-900">{{ title }}</h3>
        <p class="text-sm leading-relaxed text-neutral-500">{{ description }}</p>
    </div>
</template>
