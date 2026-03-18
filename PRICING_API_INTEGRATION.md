# Pricing API Integration Guide

Replace the static `pricing.ts` data file with live data from the ServicePro API so that any pricing change in `config/plans.php` (on the main app) is automatically reflected on the landing page without a redeploy.

---

## Overview

| | Local | Production |
|---|---|---|
| **Landing page** | `http://getservicepro.test` | `https://getservicepro.com` |
| **API (ServicePro app)** | `http://servicepro.test` | `https://app.getservicepro.com` |
| **Pricing endpoint** | `http://servicepro.test/api/public/pricing` | `https://app.getservicepro.com/api/public/pricing` |

The endpoint is public — no authentication required. It returns plans, add-ons, trial days, and currency. It is cached by the server for 1 hour (`Cache-Control: public, max-age=3600`).

### API Response Shape

```jsonc
{
  "plans": [
    {
      "id": "starter",
      "name": "Starter",
      "description": "Perfect for solo operators getting started",
      "tagline": "Everything you need to get started",
      "monthly_price": 79.00,
      "annual_price": 758.40,         // total billed per year
      "annual_price_monthly": 63.20,  // per-month equivalent when billed annually
      "annual_savings": 190.80,
      "display_features": ["Up to 2 users", "Job scheduling & dispatch", "..."],
      "limits": { "users": 2, "sms_credits": 100, "jobs_per_month": 50, "customers": 100 },
      "popular": false,
      "recommended": false,
      "order": 1
    }
    // ... professional, business
  ],
  "add_ons": [
    { "id": "extra_sms",  "label": "SMS Credits",        "price_per_unit": 0.025, "unit": "message",    "description": "Additional SMS beyond your plan allowance." },
    { "id": "extra_user", "label": "Additional Users",    "price_per_unit": 15.00, "unit": "user/month", "description": "Add team members beyond your plan limit." }
  ],
  "trial_days": 14,
  "currency": "USD",
  "updated_at": "2026-03-08"
}
```

> **Field mapping note:** The API's `annual_price` is the **total** billed per year (758.40), and `annual_price_monthly` is the **per-month** equivalent (63.20). The existing `PricingPlan` TypeScript interface uses `annualTotal` and `annualPrice` respectively — map accordingly (step 3).

---

## Step 1 — Add the environment variable

**`.env`** (local):
```dotenv
VITE_PRICING_API_URL=http://servicepro.test/api/public/pricing
```

**`.env.example`** (commit this):
```dotenv
VITE_PRICING_API_URL=https://app.getservicepro.com/api/public/pricing
```

For production, set this variable in your hosting environment (Forge, Vapor, etc.):
```
VITE_PRICING_API_URL=https://app.getservicepro.com/api/public/pricing
```

---

## Step 2 — Add API types

Create `resources/js/types/pricing-api.ts`:

```typescript
export interface ApiPlan {
    id: string;
    name: string;
    description: string;
    tagline: string;
    monthly_price: number;
    annual_price: number;          // total billed annually (e.g. 758.40)
    annual_price_monthly: number;  // per-month equivalent (e.g. 63.20)
    annual_savings: number;
    display_features: string[];
    limits: {
        users: number | null;
        sms_credits: number | null;
        jobs_per_month: number | null;
        customers: number | null;
    };
    popular: boolean;
    recommended: boolean;
    order: number;
}

export interface ApiAddOn {
    id: string;
    label: string;
    price_per_unit: number;
    unit: string;
    description: string;
}

export interface PricingApiResponse {
    plans: ApiPlan[];
    add_ons: ApiAddOn[];
    trial_days: number;
    currency: string;
    updated_at: string;
}
```

---

## Step 3 — Create the `usePricing` composable

Create `resources/js/composables/usePricing.ts`:

```typescript
import { ref, readonly } from 'vue';
import type { PricingPlan } from '@/data/pricing';
import type { ApiAddOn, PricingApiResponse } from '@/types/pricing-api';

// Formatted add-on shape used by Pricing.vue
export interface DisplayAddOn {
    name: string;
    price: string;
    description: string;
}

// Fallback add-on that the API doesn't include (it's a plan feature, not a purchasable add-on)
const API_ACCESS_ADDON: DisplayAddOn = {
    name: 'API Access',
    price: 'Business only — Included',
    description: 'Full REST API for custom integrations.',
};

function formatAddOnPrice(addon: ApiAddOn): string {
    if (addon.unit === 'message') {
        return `$${addon.price_per_unit}/message`;
    }
    return `$${addon.price_per_unit}/${addon.unit}`;
}

function mapApiPlanToLocal(plan: import('@/types/pricing-api').ApiPlan): PricingPlan {
    return {
        id: plan.id,
        label: plan.name,
        monthlyPrice: plan.monthly_price,
        annualPrice: plan.annual_price_monthly,  // per-month equivalent
        annualTotal: plan.annual_price,           // total billed annually
        description: plan.description,
        features: plan.display_features,
        highlighted: plan.popular || plan.recommended,
        badge: plan.popular ? 'Most Popular' : plan.recommended ? 'Recommended' : undefined,
        cta: 'Start Free Trial',
        note: plan.id === 'starter' ? '14-day free trial. No credit card required.'
            : plan.popular ? 'Most popular with field service crews'
            : undefined,
    };
}

function mapApiAddOns(addOns: ApiAddOn[]): DisplayAddOn[] {
    const mapped = addOns.map((addon) => ({
        name: addon.label,
        price: formatAddOnPrice(addon),
        description: addon.description,
    }));

    // Append the static API Access entry (not returned by the API)
    return [...mapped, API_ACCESS_ADDON];
}

const apiUrl = import.meta.env.VITE_PRICING_API_URL as string | undefined;

export function usePricing() {
    const plans = ref<PricingPlan[]>([]);
    const addOns = ref<DisplayAddOn[]>([]);
    const trialDays = ref<number>(14);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchPricing(): Promise<void> {
        if (!apiUrl) {
            console.warn('[usePricing] VITE_PRICING_API_URL is not set. Falling back to static data.');
            return;
        }

        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(apiUrl, {
                headers: { Accept: 'application/json' },
                // Respect the server's 1-hour cache
                cache: 'default',
            });

            if (!response.ok) {
                throw new Error(`Pricing API returned ${response.status}`);
            }

            const data: PricingApiResponse = await response.json();

            plans.value = data.plans
                .slice()
                .sort((a, b) => a.order - b.order)
                .map(mapApiPlanToLocal);

            addOns.value = mapApiAddOns(data.add_ons);
            trialDays.value = data.trial_days;
        } catch (err) {
            console.error('[usePricing] Failed to fetch pricing:', err);
            error.value = 'Could not load pricing. Please refresh the page.';
        } finally {
            loading.value = false;
        }
    }

    return {
        plans: readonly(plans),
        addOns: readonly(addOns),
        trialDays: readonly(trialDays),
        loading: readonly(loading),
        error: readonly(error),
        fetchPricing,
    };
}
```

---

## Step 4 — Update `Pricing.vue`

Replace the static imports and hardcoded `addOns` array with the composable. The key changes are highlighted with comments.

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Check, ShieldCheck } from 'lucide-vue-next';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';
import Button from '@/components/ui/Button.vue';
import PricingCard from '@/components/marketing/PricingCard.vue';
import ComparisonTable from '@/components/marketing/ComparisonTable.vue';
import FaqAccordion from '@/components/marketing/FaqAccordion.vue';
import WaitlistForm from '@/components/marketing/WaitlistForm.vue';
import { usePricing } from '@/composables/usePricing';           // NEW
import { pricingPlans as staticPlans } from '@/data/pricing';    // KEEP as fallback
import { pricingFaqs } from '@/data/faqs';

const isAnnual = ref(false);

// --- Pricing data (API-driven with static fallback) ---
const { plans: apiPlans, addOns: apiAddOns, loading, error, fetchPricing } = usePricing();

// Use API data when loaded, otherwise fall back to the static file
const plans = computed(() => apiPlans.value.length > 0 ? apiPlans.value : staticPlans);
const addOns = computed(() => apiAddOns.value);

onMounted(() => {
    fetchPricing();
});
// --- End pricing data ---

const comparisonRows = [
    { feature: 'Starting price', servicepro: '$79/mo', jobber: '$199/mo', housecall: '$169/mo' },
    { feature: 'Free trial', servicepro: '14 days', jobber: '14 days', housecall: '14 days' },
    { feature: 'Setup time', servicepro: 'Under 30 min', jobber: '2–4 hours', housecall: '2–3 hours' },
    { feature: 'Scheduling', servicepro: true, jobber: true, housecall: true },
    { feature: 'Invoicing & Payments', servicepro: true, jobber: true, housecall: true },
    { feature: 'Two-way SMS', servicepro: true, jobber: 'Add-on', housecall: true },
    { feature: 'GPS Tracking', servicepro: true, jobber: true, housecall: true },
    { feature: 'Customer Portal', servicepro: true, jobber: true, housecall: true },
    { feature: 'Automated Follow-ups', servicepro: true, jobber: 'Limited', housecall: true },
    { feature: 'AI-powered features', servicepro: true, jobber: false, housecall: false },
    { feature: 'Built for 1–10 staff', servicepro: true, jobber: 'Partial', housecall: 'Partial' },
    { feature: 'No contract required', servicepro: true, jobber: true, housecall: true },
    { feature: 'US-dedicated support', servicepro: true, jobber: true, housecall: true },
    { feature: 'Mobile-first design', servicepro: true, jobber: 'Partial', housecall: true },
];

const waitlistBenefits = [
    '30-day free trial (standard is 14 days)',
    'Founding member rate — locked in for your first year',
    'Priority access before public launch on 1 May 2026',
];
</script>

<template>
    <MarketingLayout
        title="Pricing — ServicePro"
        description="Simple, transparent pricing from $79/month. No contracts. Try free for 14 days."
    >
        <!-- Hero -->
        <section class="bg-white pt-32 pb-20">
            <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h1 class="text-4xl font-extrabold leading-tight text-neutral-900 lg:text-5xl">
                    Simple, transparent pricing
                </h1>
                <p class="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-neutral-500">
                    Built for home service businesses of every size. Cancel any time.
                </p>
            </div>
        </section>

        <!-- Pricing Cards -->
        <section class="bg-neutral-50 py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <!-- Toggle -->
                <div class="mb-12 flex items-center justify-center gap-4">
                    <span :class="['text-sm font-medium', !isAnnual ? 'text-neutral-900' : 'text-neutral-500']">Monthly</span>
                    <button
                        type="button"
                        class="relative h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        :class="isAnnual ? 'bg-brand-600' : 'bg-neutral-300'"
                        :aria-pressed="isAnnual"
                        @click="isAnnual = !isAnnual"
                    >
                        <span
                            class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                            :class="isAnnual ? 'translate-x-6' : 'translate-x-0.5'"
                        ></span>
                    </button>
                    <span :class="['text-sm font-medium', isAnnual ? 'text-neutral-900' : 'text-neutral-500']">
                        Annual <span class="font-semibold text-accent-500">(Save 20%)</span>
                    </span>
                </div>

                <!-- Loading skeleton -->
                <div v-if="loading" class="grid gap-8 md:grid-cols-3">
                    <div v-for="i in 3" :key="i" class="h-96 animate-pulse rounded-2xl bg-neutral-200" />
                </div>

                <!-- Error state -->
                <p v-else-if="error" class="text-center text-sm text-red-500">{{ error }}</p>

                <!-- Plan cards -->
                <div v-else class="grid gap-8 md:grid-cols-3">
                    <PricingCard v-for="plan in plans" :key="plan.id" :plan="plan" :is-annual="isAnnual" />
                </div>

                <p class="mt-8 text-center text-neutral-500">
                    Need more than 10 users?
                    <a href="/contact" class="font-semibold text-brand-600 hover:text-brand-700">Contact us for Enterprise pricing →</a>
                </p>
                <p class="mt-4 text-center text-xs text-neutral-400">
                    * Pricing and features accurate as of March 2026. Subject to change.
                </p>
            </div>
        </section>

        <!-- Add-ons -->
        <section class="bg-white py-20 lg:py-28">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="Add-ons"
                    heading="Extend your plan as you grow"
                    subtext="All add-ons are optional and can be adjusted at any time from your account settings."
                />
                <div class="grid gap-6 sm:grid-cols-3">
                    <div v-for="addon in addOns" :key="addon.name" class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h3 class="text-lg font-bold text-neutral-900">{{ addon.name }}</h3>
                        <p class="mt-1 text-lg font-semibold text-brand-600">{{ addon.price }}</p>
                        <p class="mt-3 text-sm leading-relaxed text-neutral-500">{{ addon.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ... rest of template unchanged (money-back, comparison table, FAQ, waitlist) ... -->
    </MarketingLayout>
</template>
```

> **Important:** Add `import { computed } from 'vue';` to the `vue` import at the top alongside `ref` and `onMounted`.

---

## Step 5 — CORS: allow local development

The API currently only allows `https://getservicepro.com` in the `Access-Control-Allow-Origin` header. During local development (`http://getservicepro.test`) the browser will block the request unless this is updated.

**In `servicepro` (main app) — `app/Http/Controllers/Api/PublicPricingController.php`:**

```php
$allowedOrigins = [
    'https://getservicepro.com',
    'http://getservicepro.test',   // local dev
];

$origin = request()->header('Origin', '');
$corsOrigin = in_array($origin, $allowedOrigins, true) ? $origin : 'https://getservicepro.com';

return response()->json([...])
    ->header('Access-Control-Allow-Origin', $corsOrigin)
    ->header('Cache-Control', 'public, max-age=3600');
```

Alternatively, handle this in `bootstrap/app.php` via a CORS middleware instead of setting the header manually.

---

## Step 6 — TypeScript: add `computed` to the import

In `Pricing.vue`, the `<script setup>` import line becomes:

```typescript
import { ref, computed, onMounted } from 'vue';
```

---

## Step 7 — Verify the static fallback still works

The `pricingPlans` export in `resources/js/data/pricing.ts` stays in place. It is used as a fallback when:
- `VITE_PRICING_API_URL` is not set
- The API is unreachable (network error, server down)

No changes are needed to `pricing.ts` — keep it as-is.

---

## Step 8 — Build & test locally

```bash
# In the landing page app (getservicepro)
npm run dev

# Confirm the env var is picked up
# Open http://getservicepro.test/pricing
# Open DevTools → Network → filter for "pricing"
# You should see a request to http://servicepro.test/api/public/pricing returning 200
```

If the request is blocked by CORS, apply the fix in Step 5 and restart the ServicePro dev server.

To test the static fallback, temporarily remove `VITE_PRICING_API_URL` from `.env` and rebuild — the page should still render using `pricing.ts` data.

---

## Summary of file changes

| File | Action | Notes |
|------|--------|-------|
| `.env` | Add `VITE_PRICING_API_URL=http://servicepro.test/api/public/pricing` | Local only, not committed |
| `.env.example` | Add `VITE_PRICING_API_URL=https://app.getservicepro.com/api/public/pricing` | Committed |
| `resources/js/types/pricing-api.ts` | **Create** | API response TypeScript types |
| `resources/js/composables/usePricing.ts` | **Create** | Fetch + map API data, with static fallback |
| `resources/js/pages/Pricing.vue` | **Update** | Use composable; add loading/error states |
| `resources/js/data/pricing.ts` | No change | Stays as static fallback |
| `resources/js/components/marketing/PricingCard.vue` | No change | Already handles `annualTotal` correctly |
| `app/Http/Controllers/Api/PublicPricingController.php` (servicepro app) | **Update** | Allow `http://getservicepro.test` origin for local dev |
