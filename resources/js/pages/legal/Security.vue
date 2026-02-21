<script setup lang="ts">
import MarketingLayout from '@/layouts/MarketingLayout.vue';
</script>

<template>
    <MarketingLayout
        title="Security — ServicePro"
        description="Learn how ServicePro protects your business data with enterprise-grade security practices."
    >
        <!-- Hero -->
        <section class="bg-neutral-50 border-b border-neutral-200 py-14">
            <div class="mx-auto max-w-3xl px-6">
                <p class="text-sm font-medium text-brand-600 uppercase tracking-wide mb-3">Legal</p>
                <h1 class="text-4xl font-bold tracking-tight text-neutral-950">Security</h1>
                <p class="mt-3 text-sm text-neutral-500">Last updated: February 21, 2026</p>
            </div>
        </section>

        <!-- Body -->
        <section class="py-14">
            <div class="mx-auto max-w-3xl px-6">

                <!-- Notice -->
                <div class="mb-10 rounded-xl bg-blue-50 border border-blue-200 px-6 py-5">
                    <p class="text-sm text-blue-800 leading-relaxed">
                        <span class="font-semibold">Notice:</span> This page is currently being finalised by our legal team and will be published before our public launch on 1 May 2026.
                    </p>
                </div>

                <!-- Intro -->
                <p class="text-neutral-700 leading-relaxed mb-12">
                    At ServicePro, security is not an afterthought — it is built into everything we do. We take the protection of your business data and your clients' information seriously, and we invest continuously in the people, processes, and technology needed to keep it safe.
                </p>

                <!-- Sections -->
                <div class="space-y-12">

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">1. Our Security Commitment</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            We are committed to maintaining a secure platform that you can trust with your business. Our security programme follows industry best practices and is informed by established frameworks. We conduct regular internal reviews and work with third-party security experts to continuously assess and improve our posture. Security is a shared responsibility — we provide the controls and transparency you need to hold us accountable.
                        </p>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">2. Data Encryption</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            All data transmitted between your devices and ServicePro is encrypted using TLS 1.2 or higher, ensuring that data in transit cannot be intercepted or read by third parties. Data at rest — including your business records, client information, and financial data — is encrypted using AES-256, the same standard used by financial institutions and government agencies.
                        </p>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">3. Infrastructure Security</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            ServicePro is hosted on industry-leading cloud infrastructure with built-in redundancy, geographic failover, and continuous uptime monitoring. Our infrastructure is isolated behind firewalls, protected against DDoS attacks, and subject to regular patching and hardening. We maintain automated backups of all critical data, with point-in-time recovery capabilities.
                        </p>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">4. Access Controls</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            Access to production systems and customer data is strictly limited to authorised ServicePro personnel who require it to perform their job functions. We enforce multi-factor authentication (MFA) for all internal system access, use role-based access controls, and maintain detailed audit logs of all access and administrative actions. Access privileges are reviewed and revoked promptly when no longer needed.
                        </p>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">5. Incident Response</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            We maintain a documented incident response plan that is tested and updated regularly. In the event of a confirmed security incident that affects your data, we will notify affected users as quickly as possible and in accordance with applicable legal requirements. We will provide clear information about what happened, what data was involved, and the steps we have taken to contain and remediate the issue.
                        </p>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">6. Vulnerability Disclosure</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            We welcome responsible disclosure of security vulnerabilities from the security research community. If you have discovered a potential security issue in ServicePro, please report it to our security team at <a href="mailto:hello@getservicepro.com" class="text-brand-600 hover:underline">hello@getservicepro.com</a> before making it public. We ask that you give us a reasonable amount of time to investigate and address the issue. We will acknowledge all valid reports and work with you in good faith.
                        </p>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">7. Compliance</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            ServicePro is designed to support your compliance obligations. Our payment processing is handled by Stripe, which is PCI DSS Level 1 certified — the highest level of certification in the payments industry. We are also designed with CCPA compliance in mind, giving you and your clients appropriate rights over personal data. As we grow, we will pursue additional third-party compliance certifications.
                        </p>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-neutral-950 mb-3">8. Contact Security Team</h2>
                        <div class="h-px bg-neutral-200 mb-5"></div>
                        <p class="text-neutral-700 leading-relaxed">
                            If you have a security concern, vulnerability to report, or a question about our security practices, please contact us directly. Security reports are treated with the highest priority and are handled confidentially. For general enquiries, our contact page is always available.
                        </p>
                    </div>

                </div>

                <!-- Bottom CTA -->
                <div class="mt-14 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-8 text-center">
                    <p class="text-base font-semibold text-neutral-900 mb-1">Questions? Contact us</p>
                    <p class="text-sm text-neutral-500 mb-5">Reach out to our team for any security-related questions or disclosures.</p>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="/contact"
                            class="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600/90 transition-colors"
                        >
                            Go to contact page
                        </a>
                        <a
                            href="mailto:hello@getservicepro.com"
                            class="text-sm text-neutral-700 hover:text-neutral-950 transition-colors underline underline-offset-2"
                        >
                            hello@getservicepro.com
                        </a>
                    </div>
                </div>

            </div>
        </section>
    </MarketingLayout>
</template>
