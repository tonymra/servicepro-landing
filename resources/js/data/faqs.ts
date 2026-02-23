export interface FaqItem {
    question: string;
    answer: string;
}

export const generalFaqs: FaqItem[] = [
    {
        question: 'When does ServicePro launch?',
        answer: 'We launch publicly on 1 May 2026. Beta access begins 1 April 2026 for waitlist members.',
    },
    {
        question: 'Do I need a credit card to sign up?',
        answer: 'No. Your 14-day free trial (or 30-day waitlist trial) requires no credit card. You only enter payment details when you choose to subscribe.',
    },
    {
        question: 'Which home service businesses does ServicePro work for?',
        answer: 'ServicePro is built for small to medium home service businesses — including HVAC, plumbing, electrical, cleaning, handyman, landscaping, pest control, painting, appliance repair, and many more trades.',
    },
    {
        question: 'How long does setup take?',
        answer: 'Most business owners are fully set up — jobs scheduled, team added, and first invoice sent — in under 30 minutes. There\'s no training call required.',
    },
    {
        question: 'Can I use ServicePro on my phone?',
        answer: 'Yes. ServicePro is mobile-first. Everything works on iOS and Android browsers without downloading a separate app. A native app is on our roadmap.',
    },
    {
        question: 'How does the SMS follow-up work?',
        answer: 'When you send a quote, ServicePro automatically sends a follow-up SMS to your client 24 hours later. If they reply, you see the conversation in your inbox. No manual follow-up required.',
    },
    {
        question: 'What does ServicePro cost?',
        answer: 'Plans start at $79/month for solo operators up to $299/month for teams of up to 10. Annual billing saves 20%. See our full pricing page for details.',
    },
    {
        question: 'How is ServicePro different from Jobber or Housecall Pro?',
        answer: 'ServicePro is purpose-built for crews of 1–10. We offer 90% of the features at half the price with a simpler setup experience. Jobber and Housecall Pro are great products but built for larger, more complex operations.',
    },
    {
        question: 'Can I import my existing customer data?',
        answer: 'Yes. You can import customers from a CSV file. We also offer a free onboarding call for Professional and Business plan users to help with data migration.',
    },
    {
        question: 'What happens to my data if I cancel?',
        answer: 'You retain full ownership of your data. We provide a full export in CSV format at any time. If you cancel, your data is retained for 30 days before deletion.',
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
