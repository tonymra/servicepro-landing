import { ref, readonly } from 'vue';
import type { PricingPlan } from '@/data/pricing';
import type { ApiAddOn, ApiPlan, PricingApiResponse } from '@/types/pricing-api';

export interface DisplayAddOn {
    name: string;
    price: string;
    description: string;
}

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

function mapApiPlanToLocal(plan: ApiPlan): PricingPlan {
    return {
        id: plan.id,
        label: plan.name,
        monthlyPrice: plan.monthly_price,
        annualPrice: plan.annual_price_monthly,
        annualTotal: plan.annual_price,
        description: plan.description,
        features: plan.display_features,
        highlighted: plan.popular || plan.recommended,
        badge: plan.popular ? 'Most Popular' : plan.recommended ? 'Recommended' : undefined,
        cta: 'Start Free Trial',
        note:
            plan.id === 'starter'
                ? '14-day free trial. No credit card required.'
                : plan.popular
                  ? 'Most popular with field service crews'
                  : undefined,
    };
}

function mapApiAddOns(addOns: ApiAddOn[]): DisplayAddOn[] {
    const mapped = addOns.map((addon) => ({
        name: addon.label,
        price: formatAddOnPrice(addon),
        description: addon.description,
    }));

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
