<script setup lang="ts">
import { Check, Share2 } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import Button from '@/components/ui/Button.vue';

interface Props {
    variant?: 'inline' | 'compact' | 'modal';
}

withDefaults(defineProps<Props>(), { variant: 'inline' });

const BUSINESS_TYPES = ['HVAC', 'Plumbing', 'Electrical', 'Cleaning', 'Handyman', 'Landscaping', 'Pest Control', 'Other'];
const STAFF_COUNTS = ['Solo', '2-3', '4-6', '7-10'];

const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

const loading = ref(false);
const success = ref(false);
const alreadyExisted = ref(false);
const serverError = ref('');
const submittedEmail = ref('');

const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    business_type: '',
    staff_count: '',
    website: '',
    utm_source: urlParams.get('utm_source') ?? '',
    utm_medium: urlParams.get('utm_medium') ?? '',
    utm_campaign: urlParams.get('utm_campaign') ?? '',
});

const errors = reactive<Record<string, string>>({});

function validate(): boolean {
    Object.keys(errors).forEach((k) => delete errors[k]);
    let valid = true;

    if (!form.first_name.trim()) { errors.first_name = 'First name is required.'; valid = false; }
    if (!form.last_name.trim()) { errors.last_name = 'Last name is required.'; valid = false; }
    if (!form.email.trim()) {
        errors.email = 'Email address is required.';
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address.';
        valid = false;
    }

    return valid;
}

async function submit(): Promise<void> {
    if (!validate()) { return; }

    loading.value = true;
    serverError.value = '';

    try {
        const csrfMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        const response = await fetch('/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfMeta?.content ?? '',
                Accept: 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 422 && data.errors) {
                Object.entries(data.errors).forEach(([field, messages]) => {
                    errors[field] = (messages as string[])[0];
                });
            } else if (response.status === 429) {
                serverError.value = 'Too many attempts. Please try again in an hour.';
            } else {
                serverError.value = 'Something went wrong. Please try again or email hello@getservicepro.com';
            }
            return;
        }

        submittedEmail.value = data.email;
        alreadyExisted.value = data.already_existed;
        success.value = true;
    } catch {
        serverError.value = 'Something went wrong. Please try again or email hello@getservicepro.com';
    } finally {
        loading.value = false;
    }
}

const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.getservicepro.com';
</script>

<template>
    <!-- Compact variant -->
    <form v-if="variant === 'compact'" class="flex gap-2" @submit.prevent="submit" novalidate>
        <input
            v-model="form.email"
            type="email"
            placeholder="Your email address"
            required
            class="min-w-0 flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm placeholder-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <Button type="submit" variant="success" size="sm" :loading="loading">Join</Button>
        <!-- Honeypot -->
        <input v-model="form.website" type="text" name="website" class="hidden" tabindex="-1" autocomplete="off" />
    </form>

    <!-- Success state -->
    <div v-else-if="success" class="rounded-2xl bg-white/10 border border-white/20 p-8 text-center">
        <div class="mb-4 flex justify-center">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500">
                <Check class="h-8 w-8 text-white" />
            </div>
        </div>
        <h3 class="mb-2 text-2xl font-bold text-white">
            {{ alreadyExisted ? "You're already on the list!" : "You're on the list!" }}
        </h3>
        <p class="text-neutral-200 leading-relaxed">
            {{ alreadyExisted
                ? "We already have your spot reserved. You're good!"
                : `We'll email you at ${submittedEmail} when we launch. Expect something from hello@getservicepro.com on 1 May 2026.`
            }}
        </p>
        <div v-if="!alreadyExisted" class="mt-6 flex flex-wrap justify-center gap-3">
            <a
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
                <Share2 class="h-4 w-4" /> Share on Facebook
            </a>
            <a
                :href="`https://twitter.com/intent/tweet?text=Just%20joined%20the%20%40getservicepro%20waitlist%20-%20looks%20like%20a%20game%20changer%20for%20home%20service%20businesses!&url=${encodeURIComponent(shareUrl)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
                <Share2 class="h-4 w-4" /> Share on X
            </a>
        </div>
    </div>

    <!-- Inline / modal variant -->
    <form v-else class="space-y-4" @submit.prevent="submit" novalidate>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="mb-1 block text-sm font-medium text-white">
                    First Name <span class="text-red-300">*</span>
                </label>
                <input
                    v-model="form.first_name"
                    type="text"
                    placeholder="Mike"
                    :class="['w-full rounded-lg border px-3 py-2.5 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2', errors.first_name ? 'border-red-400 bg-red-50 focus:ring-red-200' : 'border-white/20 bg-white text-neutral-900 focus:border-brand-500 focus:ring-brand-100']"
                />
                <p v-if="errors.first_name" class="mt-1 text-xs text-red-300">{{ errors.first_name }}</p>
            </div>
            <div>
                <label class="mb-1 block text-sm font-medium text-white">
                    Last Name <span class="text-red-300">*</span>
                </label>
                <input
                    v-model="form.last_name"
                    type="text"
                    placeholder="Johnson"
                    :class="['w-full rounded-lg border px-3 py-2.5 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2', errors.last_name ? 'border-red-400 bg-red-50 focus:ring-red-200' : 'border-white/20 bg-white text-neutral-900 focus:border-brand-500 focus:ring-brand-100']"
                />
                <p v-if="errors.last_name" class="mt-1 text-xs text-red-300">{{ errors.last_name }}</p>
            </div>
        </div>

        <div>
            <label class="mb-1 block text-sm font-medium text-white">
                Email Address <span class="text-red-300">*</span>
            </label>
            <input
                v-model="form.email"
                type="email"
                placeholder="mike@hvacservices.com"
                :class="['w-full rounded-lg border px-3 py-2.5 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2', errors.email ? 'border-red-400 bg-red-50 focus:ring-red-200' : 'border-white/20 bg-white text-neutral-900 focus:border-brand-500 focus:ring-brand-100']"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-300">{{ errors.email }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="mb-1 block text-sm font-medium text-white">Business Type</label>
                <select
                    v-model="form.business_type"
                    class="w-full rounded-lg border border-white/20 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                >
                    <option value="">Select type...</option>
                    <option v-for="type in BUSINESS_TYPES" :key="type" :value="type">{{ type }}</option>
                </select>
            </div>
            <div>
                <label class="mb-1 block text-sm font-medium text-white">Number of Staff</label>
                <select
                    v-model="form.staff_count"
                    class="w-full rounded-lg border border-white/20 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                >
                    <option value="">Select...</option>
                    <option v-for="count in STAFF_COUNTS" :key="count" :value="count">{{ count }}</option>
                </select>
            </div>
        </div>

        <!-- Honeypot -->
        <input v-model="form.website" type="text" name="website" class="hidden" tabindex="-1" autocomplete="off" />

        <p v-if="serverError" class="rounded-lg bg-red-500/10 border border-red-400/30 px-4 py-3 text-sm text-red-200">
            {{ serverError }}
        </p>

        <Button type="submit" variant="success" size="xl" class="w-full" :loading="loading">
            {{ loading ? 'Joining...' : 'Join the Waitlist — Free' }}
        </Button>

        <p class="text-center text-xs text-neutral-300">
            No credit card required. Unsubscribe at any time.
        </p>
    </form>
</template>
