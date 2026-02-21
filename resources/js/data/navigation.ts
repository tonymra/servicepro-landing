export interface NavLink {
    label: string;
    href: string;
    name?: string;
}

export interface MegaDropdownItem {
    icon: string;
    title: string;
    description: string;
    href: string;
}

export const navLinks: NavLink[] = [
    { label: 'Features', href: '/features', name: 'features' },
    { label: 'Pricing', href: '/pricing', name: 'pricing' },
    { label: 'About', href: '/about', name: 'about' },
    { label: 'Blog', href: '/blog', name: 'blog' },
    { label: 'Contact', href: '/contact', name: 'contact' },
];

export const featuresDropdown: MegaDropdownItem[][] = [
    [
        { icon: 'calendar', title: 'Scheduling & Dispatch', description: 'Drag-and-drop job calendar for your crew', href: '/features#scheduling' },
        { icon: 'briefcase', title: 'Job Management', description: 'Track every job from quote to invoice', href: '/features#jobs' },
        { icon: 'map-pin', title: 'GPS Tracking', description: 'Real-time crew location visibility', href: '/features#gps' },
    ],
    [
        { icon: 'file-text', title: 'Invoicing & Payments', description: 'Get paid in 60 seconds after a job', href: '/features#invoicing' },
        { icon: 'clipboard', title: 'Estimates & Quotes', description: 'Professional quotes sent instantly', href: '/features#quotes' },
        { icon: 'credit-card', title: 'Payment Links', description: 'Stripe-powered SMS payment links', href: '/features#payments' },
    ],
    [
        { icon: 'message-square', title: 'Customer SMS', description: '2-way SMS built right in', href: '/features#sms' },
        { icon: 'repeat', title: 'Automated Follow-ups', description: 'Follow up on quotes automatically', href: '/features#followups' },
        { icon: 'message-circle', title: '2-Way Messaging', description: 'Full conversation threads with clients', href: '/features#messaging' },
    ],
    [
        { icon: 'bar-chart', title: 'Reports & Analytics', description: 'See exactly which jobs are profitable', href: '/features#reports' },
        { icon: 'users', title: 'Team Management', description: 'Roles, permissions, and scheduling', href: '/features#team' },
        { icon: 'smartphone', title: 'Mobile App', description: 'Runs perfectly on iOS and Android', href: '/features#mobile' },
    ],
];

export const pricingDropdownItems = [
    { label: 'Starter', price: '$79/mo', description: 'Solo operators & 2-man crews', href: '/pricing#starter' },
    { label: 'Professional', price: '$149/mo', description: 'Growing crews of up to 5 staff', href: '/pricing#professional' },
    { label: 'Business', price: '$299/mo', description: 'Established businesses up to 10 staff', href: '/pricing#business' },
];

export const footerLinks = {
    product: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Changelog', href: '#', comingSoon: true },
        { label: 'Roadmap', href: '#', comingSoon: true },
        { label: 'API Docs', href: '#', comingSoon: true },
        { label: 'Status Page', href: '#', comingSoon: true },
        { label: 'Mobile App', href: '/features#mobile' },
    ],
    company: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '#', comingSoon: true },
        { label: 'Partners', href: '#', comingSoon: true },
        { label: 'Press', href: '/contact' },
        { label: 'Contact', href: '/contact' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Security', href: '/security' },
        { label: 'Cookie Policy', href: '/privacy#cookies' },
        { label: 'Help Centre', href: '#', comingSoon: true },
        { label: 'System Status', href: '#', comingSoon: true },
    ],
};
