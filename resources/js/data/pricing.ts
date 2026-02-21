export interface PricingPlan {
    id: string;
    label: string;
    monthlyPrice: number;
    annualPrice: number;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
    badge?: string;
    note?: string;
}

export const pricingPlans: PricingPlan[] = [
    {
        id: 'starter',
        label: 'Starter',
        monthlyPrice: 79,
        annualPrice: 63,
        description: 'Perfect for solo operators and 2-man crews',
        highlighted: false,
        cta: 'Start Free Trial',
        note: '14-day free trial. No credit card required.',
        features: [
            'Up to 2 users',
            'Job scheduling & dispatch',
            'Invoicing & online payments',
            'Customer management',
            '100 SMS per month',
            'Mobile app',
            'Email support',
        ],
    },
    {
        id: 'professional',
        label: 'Professional',
        monthlyPrice: 149,
        annualPrice: 119,
        description: 'For growing crews of up to 5 staff',
        highlighted: true,
        badge: 'Most Popular',
        cta: 'Start Free Trial',
        note: 'Most popular with HVAC and plumbing crews',
        features: [
            'Up to 5 users',
            'Everything in Starter',
            '500 SMS per month',
            'Two-way SMS conversations',
            'Automated follow-ups',
            'GPS tracking',
            'Estimates & quotes',
            'Priority support',
        ],
    },
    {
        id: 'business',
        label: 'Business',
        monthlyPrice: 299,
        annualPrice: 239,
        description: 'For established businesses with up to 10 staff',
        highlighted: false,
        cta: 'Start Free Trial',
        features: [
            'Up to 10 users',
            'Everything in Professional',
            'Unlimited SMS',
            'API access',
            'Custom reporting',
            'Dedicated account manager',
            'SLA-backed support',
            'White-label customer portal',
        ],
    },
];
