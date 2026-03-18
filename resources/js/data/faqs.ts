export interface FaqItem {
    question: string;
    answer: string;
}

export const generalFaqs: FaqItem[] = [
    {
        question: 'Is there a free trial?',
        answer: 'Yes — 14 days free, no credit card required. If you join the waitlist before launch, you get 30 days free instead. You only enter payment details when you choose to subscribe.',
    },
    {
        question: 'Can I cancel at any time?',
        answer: 'Yes. There are no long-term contracts or cancellation fees. Cancel any time from your account settings and you\'ll retain access until the end of your current billing period.',
    },
    {
        question: 'Does it work on mobile?',
        answer: 'Yes. Fieldix is mobile-first and runs fully in iOS and Android browsers — no separate app download required. A dedicated native app is on our roadmap.',
    },
    {
        question: 'Do my clients need to download an app?',
        answer: 'No. Clients receive a link via SMS or email. They can view quotes, approve work, and pay online from any phone or browser — no account or app needed.',
    },
    {
        question: 'Is Fieldix available outside the US?',
        answer: 'Not yet. Fieldix is currently available for US-based businesses only. We\'re focused on building the best possible product for the US home service market before expanding internationally.',
    },
    {
        question: 'What payment methods can my clients use?',
        answer: 'Clients can pay by credit card, debit card, Apple Pay, and Google Pay. Payments are processed securely through Stripe. Funds are deposited directly to your bank account.',
    },
    {
        question: 'How long does setup take?',
        answer: 'Most business owners are fully set up — jobs scheduled, team added, and first invoice sent — in under 30 minutes. No training call required.',
    },
    {
        question: 'What happens when my trial ends?',
        answer: 'You\'ll be prompted to choose a plan. If you don\'t subscribe, your account is paused — your data is kept for 30 days so you can pick up where you left off. Nothing is deleted immediately.',
    },
    {
        question: 'Which trades does Fieldix support?',
        answer: 'Fieldix is built for US-based home service businesses — including HVAC, plumbing, electrical, cleaning, handyman, landscaping, pest control, painting, appliance repair, and more.',
    },
    {
        question: 'When does Fieldix launch?',
        answer: 'Public launch is 1 June 2026. Beta access begins 1 April 2026 for waitlist members, who also get a 30-day free trial instead of the standard 14 days.',
    },
    {
        question: 'How does the SMS follow-up work?',
        answer: 'When you send a quote, Fieldix automatically follows up with your client by SMS 24 hours later. If they reply, the conversation appears in your inbox. No manual follow-up needed.',
    },
    {
        question: 'Can I import my existing customer data?',
        answer: 'Yes. You can import customers from a CSV file. Professional and Business plan users also get a free onboarding call to help with data migration.',
    },
];

export const pricingFaqs: FaqItem[] = [
    {
        question: 'Can I cancel at any time?',
        answer: 'Yes, absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings. You\'ll retain access until the end of your current billing period.',
    },
    {
        question: 'When am I billed?',
        answer: 'You\'re billed on the same date each month (or year, if on an annual plan) starting from when your free trial ends. We\'ll email you a reminder before your first charge.',
    },
    {
        question: 'Do you charge sales tax?',
        answer: 'Sales tax may be applied depending on your state. We collect and remit sales tax as required by law. The exact amount will be shown at checkout.',
    },
    {
        question: 'What happens if I add or remove team members?',
        answer: 'You can add or remove users at any time. If you add a user mid-billing cycle, you\'ll be charged a prorated amount for the remainder of that period.',
    },
    {
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Yes. You can upgrade at any time and changes take effect immediately. Downgrades take effect at the start of your next billing cycle.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied within the first 30 days of your subscription, contact us for a full refund — no questions asked.',
    },
];
