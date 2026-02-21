<script setup lang="ts">
import { Mail, Phone, MapPin, Clock, Check } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import Button from '@/components/ui/Button.vue';

const BUSINESS_TYPES = ['HVAC', 'Plumbing', 'Electrical', 'Cleaning', 'Handyman', 'Landscaping', 'Pest Control', 'Other'];
const SUBJECTS = ['General Enquiry', 'Sales', 'Support', 'Billing', 'Partnership', 'Press', 'Career'];

const loading = ref(false);
const success = ref(false);
const serverError = ref('');

const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    business_name: '',
    business_type: '',
    subject: '',
    message: '',
    privacy_agreed: false,
});

const errors = reactive<Record<string, string>>({});

function validate(): boolean {
    Object.keys(errors).forEach((k) => delete errors[k]);
    let valid = true;
    if (!form.first_name.trim()) { errors.first_name = 'Required.'; valid = false; }
    if (!form.last_name.trim()) { errors.last_name = 'Required.'; valid = false; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Valid email required.'; valid = false; }
    if (!form.subject) { errors.subject = 'Please select a subject.'; valid = false; }
    if (!form.message.trim() || form.message.trim().length < 10) { errors.message = 'Message must be at least 10 characters.'; valid = false; }
    if (!form.privacy_agreed) { errors.privacy_agreed = 'You must agree to the Privacy Policy.'; valid = false; }
    return valid;
}

async function submit(): Promise<void> {
    if (!validate()) { return; }
    loading.value = true;
    serverError.value = '';

    try {
        const csrfMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfMeta?.content ?? '', Accept: 'application/json' },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            const data = await response.json();
            if (response.status === 422 && data.errors) {
                Object.entries(data.errors).forEach(([field, messages]) => { errors[field] = (messages as string[])[0]; });
            } else {
                serverError.value = 'Something went wrong. Please try again.';
            }
            return;
        }

        success.value = true;
    } catch {
        serverError.value = 'Something went wrong. Please email hello@getservicepro.com directly.';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <MarketingLayout
        title="Contact ServicePro"
        description="Talk to our team. We're a real company with real people who respond within 1 business day."
    >
        <section class="bg-white pt-32 pb-20">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid gap-16 lg:grid-cols-3">
                    <!-- Form -->
                    <div class="lg:col-span-2">
                        <h1 class="text-4xl font-bold text-neutral-900">Get in touch</h1>
                        <p class="mt-3 text-lg text-neutral-500">We're a real team of real people. We read every message.</p>

                        <!-- Success state -->
                        <div v-if="success" class="mt-8 rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
                            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                                <Check class="h-7 w-7 text-green-600" />
                            </div>
                            <h2 class="text-xl font-bold text-neutral-900">Message received!</h2>
                            <p class="mt-2 text-neutral-600">We aim to respond within 1 business day (Mon–Fri, 9am–6pm MT).</p>
                        </div>

                        <form v-else class="mt-8 space-y-5" @submit.prevent="submit" novalidate>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="mb-1 block text-sm font-medium text-neutral-700">First Name <span class="text-error">*</span></label>
                                    <input v-model="form.first_name" type="text" :class="['w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2', errors.first_name ? 'border-error' : 'border-neutral-200 focus:border-brand-500 focus:ring-brand-100']" />
                                    <p v-if="errors.first_name" class="mt-1 text-xs text-error">{{ errors.first_name }}</p>
                                </div>
                                <div>
                                    <label class="mb-1 block text-sm font-medium text-neutral-700">Last Name <span class="text-error">*</span></label>
                                    <input v-model="form.last_name" type="text" :class="['w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2', errors.last_name ? 'border-error' : 'border-neutral-200 focus:border-brand-500 focus:ring-brand-100']" />
                                    <p v-if="errors.last_name" class="mt-1 text-xs text-error">{{ errors.last_name }}</p>
                                </div>
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-medium text-neutral-700">Email Address <span class="text-error">*</span></label>
                                <input v-model="form.email" type="email" :class="['w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2', errors.email ? 'border-error' : 'border-neutral-200 focus:border-brand-500 focus:ring-brand-100']" />
                                <p v-if="errors.email" class="mt-1 text-xs text-error">{{ errors.email }}</p>
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-medium text-neutral-700">Business Name</label>
                                <input v-model="form.business_name" type="text" class="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" />
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="mb-1 block text-sm font-medium text-neutral-700">Business Type</label>
                                    <select v-model="form.business_type" class="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100">
                                        <option value="">Select type...</option>
                                        <option v-for="type in BUSINESS_TYPES" :key="type" :value="type">{{ type }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="mb-1 block text-sm font-medium text-neutral-700">Subject <span class="text-error">*</span></label>
                                    <select v-model="form.subject" :class="['w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2', errors.subject ? 'border-error' : 'border-neutral-200 focus:border-brand-500 focus:ring-brand-100']">
                                        <option value="">Select subject...</option>
                                        <option v-for="subject in SUBJECTS" :key="subject" :value="subject">{{ subject }}</option>
                                    </select>
                                    <p v-if="errors.subject" class="mt-1 text-xs text-error">{{ errors.subject }}</p>
                                </div>
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-medium text-neutral-700">Message <span class="text-error">*</span></label>
                                <textarea v-model="form.message" rows="5" :class="['w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2', errors.message ? 'border-error' : 'border-neutral-200 focus:border-brand-500 focus:ring-brand-100']"></textarea>
                                <p v-if="errors.message" class="mt-1 text-xs text-error">{{ errors.message }}</p>
                            </div>

                            <div>
                                <label class="flex items-start gap-3 cursor-pointer">
                                    <input v-model="form.privacy_agreed" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500" />
                                    <span class="text-sm text-neutral-600">
                                        I agree to ServicePro's
                                        <a href="/privacy" class="text-brand-600 underline hover:no-underline">Privacy Policy</a>
                                    </span>
                                </label>
                                <p v-if="errors.privacy_agreed" class="mt-1 text-xs text-error">{{ errors.privacy_agreed }}</p>
                            </div>

                            <p v-if="serverError" class="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{{ serverError }}</p>

                            <Button type="submit" variant="primary" size="lg" class="w-full" :loading="loading">
                                Send Message
                            </Button>

                            <p class="text-center text-sm text-neutral-400">
                                We aim to respond within 1 business day (Monday–Friday, 9am–5pm MT).
                            </p>
                        </form>
                    </div>

                    <!-- Contact info -->
                    <div>
                        <div class="rounded-2xl bg-neutral-50 p-8">
                            <h2 class="mb-6 text-xl font-bold text-neutral-900">Contact Information</h2>
                            <div class="space-y-5">
                                <div class="flex items-start gap-3">
                                    <MapPin class="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                                    <div class="text-sm text-neutral-700">
                                        <div class="font-semibold">ServicePro LLC</div>
                                        <div>1309 Coffeen Avenue STE 1200</div>
                                        <div>Sheridan, Wyoming 82801</div>
                                        <div>United States</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <Phone class="h-5 w-5 shrink-0 text-brand-600" />
                                    <a href="tel:+18557372876" class="text-sm text-neutral-700 hover:text-brand-600">+1 (855) 737-2876</a>
                                </div>
                                <div class="flex items-center gap-3">
                                    <Mail class="h-5 w-5 shrink-0 text-brand-600" />
                                    <a href="mailto:hello@getservicepro.com" class="text-sm text-neutral-700 hover:text-brand-600">hello@getservicepro.com</a>
                                </div>
                                <div class="flex items-start gap-3">
                                    <Clock class="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                                    <div class="text-sm text-neutral-700">
                                        <div class="font-semibold">Business Hours</div>
                                        <div>Monday – Friday</div>
                                        <div>9:00am – 6:00pm Mountain Time</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Map placeholder -->
                            <div class="mt-6 h-40 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                                <div class="text-center">
                                    <MapPin class="mx-auto mb-1 h-6 w-6 text-neutral-500" />
                                    <span class="text-sm font-medium text-neutral-600">Sheridan, Wyoming</span>
                                </div>
                            </div>
                        </div>

                        <!-- Support options -->
                        <div class="mt-6 rounded-2xl border border-neutral-200 p-6">
                            <h3 class="mb-4 font-semibold text-neutral-900">Support options</h3>
                            <div class="space-y-3 text-sm">
                                <div><span class="text-neutral-500">Account issues:</span> <a href="mailto:support@getservicepro.com" class="text-brand-600 hover:underline">support@getservicepro.com</a></div>
                                <div><span class="text-neutral-500">Billing:</span> <a href="mailto:billing@getservicepro.com" class="text-brand-600 hover:underline">billing@getservicepro.com</a></div>
                                <div><span class="text-neutral-500">Partnerships:</span> <a href="mailto:partners@getservicepro.com" class="text-brand-600 hover:underline">partners@getservicepro.com</a></div>
                                <div><span class="text-neutral-500">Press:</span> <a href="mailto:press@getservicepro.com" class="text-brand-600 hover:underline">press@getservicepro.com</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </MarketingLayout>
</template>
