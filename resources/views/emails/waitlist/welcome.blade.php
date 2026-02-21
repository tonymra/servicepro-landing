<x-mail::message>
# Hi {{ $firstName }}, you're on the list! 🎉

You've successfully joined the ServicePro waitlist. Here's what happens next:

**1. We're finishing up ServicePro** — Our team is putting the final touches on the product.

**2. Beta starts April 1, 2026** — You'll be invited to beta before the public. As a waitlist member, you get priority access.

**3. Public launch May 1, 2026** — You get **30 days free** (the standard trial is only 14 days).

---

## Your waitlist perks

✅ **30-day free trial** (double the standard 14-day trial)

✅ **Founding member pricing** — locked in for your first year

✅ **Priority access** before the public launch on May 1, 2026

---

We'll send your beta invite to **{{ $email }}** in early April. Keep an eye out for something from hello@getservicepro.com.

<x-mail::button :url="config('app.url')" color="primary">
Visit getservicepro.com
</x-mail::button>

If you have questions in the meantime, just reply to this email.

Cheers,<br>
The ServicePro Team<br>
*hello@getservicepro.com*

---
*ServicePro LLC, 1309 Coffeen Avenue STE 1200, Sheridan, WY 82801*<br>
*You're receiving this because you signed up at getservicepro.com.*
</x-mail::message>
