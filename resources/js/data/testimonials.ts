export interface Testimonial {
    name: string;
    business: string;
    city: string;
    state: string;
    quote: string;
    initials: string;
    rating: number;
}

export const testimonials: Testimonial[] = [
    {
        name: 'Mike Harrington',
        business: 'Harrington HVAC Services',
        city: 'Phoenix',
        state: 'AZ',
        initials: 'MH',
        rating: 5,
        quote: 'I used to lose track of at least 2–3 jobs a month. With ServicePro, every job is scheduled, invoiced, and followed up automatically. Saved me around $800 a month in lost work.',
    },
    {
        name: 'Rosa Martinez',
        business: 'Martinez Plumbing Co',
        city: 'San Antonio',
        state: 'TX',
        initials: 'RM',
        rating: 5,
        quote: 'The SMS follow-up is a game changer. I sent a quote on a Monday, ServicePro followed up Tuesday, and the client booked and paid by Wednesday. Didn\'t have to lift a finger.',
    },
    {
        name: 'Tyler Brooks',
        business: 'Brooks Electrical',
        city: 'Charlotte',
        state: 'NC',
        initials: 'TB',
        rating: 5,
        quote: 'Setup really did take under 30 minutes. I had my first job scheduled and invoiced within an hour. Jobber took me a whole weekend to figure out.',
    },
    {
        name: 'Dana Chen',
        business: 'Sparkle Clean',
        city: 'Tampa',
        state: 'FL',
        initials: 'DC',
        rating: 5,
        quote: 'Running a 4-person cleaning crew, I was drowning in WhatsApp messages. ServicePro replaced all of that. My team knows exactly where to be and when.',
    },
    {
        name: 'James Okafor',
        business: 'JO Handyman Services',
        city: 'Nashville',
        state: 'TN',
        initials: 'JO',
        rating: 5,
        quote: 'Half the price of what I was paying for Jobber. And honestly? It\'s easier to use. The mobile app is fast and my clients love getting a payment link right after the job.',
    },
    {
        name: 'Sarah Lindqvist',
        business: 'Lindqvist Pest Solutions',
        city: 'Denver',
        state: 'CO',
        initials: 'SL',
        rating: 5,
        quote: 'The GPS tracking alone is worth it. I can see where my techs are without texting them every hour. The reporting shows me exactly which jobs are most profitable.',
    },
];
