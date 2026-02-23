export interface SocialLink {
    platform: string;
    url: string;
    handle: string;
    icon: string;
    color: string;
}

export const socialLinks: SocialLink[] = [
    {
        platform: 'Facebook',
        url: 'https://www.facebook.com/getservicepro',
        handle: '@getservicepro',
        icon: 'facebook',
        color: '#1877F2',
    },
    {
        platform: 'Instagram',
        url: 'https://www.instagram.com/getservicepro',
        handle: '@getservicepro',
        icon: 'instagram',
        color: '#E4405F',
    },
    {
        platform: 'X',
        url: 'https://www.x.com/getservicepro',
        handle: '@getservicepro',
        icon: 'x',
        color: '#000000',
    },
    {
        platform: 'YouTube',
        url: 'https://www.youtube.com/@getservicepro',
        handle: '@getservicepro',
        icon: 'youtube',
        color: '#FF0000',
    },
    {
        platform: 'TikTok',
        url: 'https://www.tiktok.com/@getservicepro',
        handle: '@getservicepro',
        icon: 'music-2',
        color: '#000000',
    },
    {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/company/getservicepro',
        handle: 'ServicePro',
        icon: 'linkedin',
        color: '#0A66C2',
    },
];
