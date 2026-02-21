export interface Feature {
    icon: string;
    title: string;
    description: string;
    category: 'scheduling' | 'money' | 'communication' | 'management';
}

export const allFeatures: Feature[] = [
    { icon: 'calendar', title: 'Job Scheduling', description: 'Drag-and-drop calendar. Assign jobs in seconds.', category: 'scheduling' },
    { icon: 'users', title: 'Customer Management', description: 'Full customer history, notes, and contact details.', category: 'management' },
    { icon: 'file-text', title: 'Invoicing', description: 'Create and send invoices from your phone in 60 seconds.', category: 'money' },
    { icon: 'credit-card', title: 'Online Payments', description: 'Stripe-powered payments. Funds in 2 business days.', category: 'money' },
    { icon: 'clipboard', title: 'Estimates & Quotes', description: 'Professional quotes with e-signature support.', category: 'money' },
    { icon: 'message-square', title: 'Two-Way SMS', description: 'Full SMS conversations with clients — all in one inbox.', category: 'communication' },
    { icon: 'repeat', title: 'Automated Follow-ups', description: 'Quote follow-up and payment reminders on autopilot.', category: 'communication' },
    { icon: 'map-pin', title: 'GPS Tracking', description: 'See your crew\'s real-time location on a map.', category: 'scheduling' },
    { icon: 'camera', title: 'Job Photos', description: 'Before/after photos attached directly to jobs.', category: 'scheduling' },
    { icon: 'users-2', title: 'Team Management', description: 'Roles, permissions, and scheduling for your whole crew.', category: 'management' },
    { icon: 'smartphone', title: 'Mobile App', description: 'Works perfectly on iOS and Android — no download needed.', category: 'management' },
    { icon: 'layout-dashboard', title: 'Customer Portal', description: 'Clients can view invoices and make payments online.', category: 'communication' },
    { icon: 'bar-chart', title: 'Revenue Reports', description: 'Profitability by job type, technician, and date range.', category: 'management' },
    { icon: 'zap', title: 'Stripe Integration', description: 'Built-in Stripe for credit card, Apple Pay, Google Pay.', category: 'money' },
    { icon: 'bell', title: 'Automated Reminders', description: 'Appointment reminders reduce no-shows by up to 40%.', category: 'communication' },
    { icon: 'navigation', title: 'Route Optimization', description: 'Optimized driving routes to reduce fuel costs.', category: 'scheduling' },
];

export const featureCategories = [
    { id: 'scheduling', label: 'Scheduling & Jobs' },
    { id: 'money', label: 'Money & Invoicing' },
    { id: 'communication', label: 'Customer Communication' },
    { id: 'management', label: 'Business Management' },
] as const;
