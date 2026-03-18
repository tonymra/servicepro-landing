export interface ApiPlan {
    id: string;
    name: string;
    description: string;
    tagline: string;
    monthly_price: number;
    annual_price: number;         // total billed annually (e.g. 758.40)
    annual_price_monthly: number; // per-month equivalent (e.g. 63.20)
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
