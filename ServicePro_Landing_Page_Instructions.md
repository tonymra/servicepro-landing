# ServicePro — Landing Page Build Instructions for Claude Code

> **Project:** `getservicepro.com` — Marketing & Waitlist Landing Site
> **Stack:** Laravel 12 · Inertia.js v2 · Vue 3 · TypeScript · Tailwind CSS v4
> **Goal:** A world-class marketing landing page matching the quality of Jobber, Housecall Pro, and ServiceTitan — built to capture waitlist signups and convert visitors to paying customers at launch.
> **Read this entire document before writing a single line of code.**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Package Installation & Setup](#2-package-installation--setup)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Global Layout & Navigation](#5-global-layout--navigation)
6. [Page-by-Page Build Instructions](#6-page-by-page-build-instructions)
7. [Shared Components Library](#7-shared-components-library)
8. [Waitlist System](#8-waitlist-system)
9. [Routes & Controllers](#9-routes--controllers)
10. [Static Business Information](#10-static-business-information)
11. [SEO & Meta Tags](#11-seo--meta-tags)
12. [Performance Requirements](#12-performance-requirements)
13. [Quality Checklist](#13-quality-checklist)

---

## 1. Project Overview

### What This Is

A standalone marketing website — completely separate from the main ServicePro application — hosted at `getservicepro.com`. This site has one primary job: convert visitors into waitlist signups. Every design and copy decision should serve that goal.

### What This Is NOT

This is not the main SaaS application. There is no authentication system, no dashboard, no app functionality here. The "Log In" and "Start Free Trial" buttons link to the main app subdomain (`app.getservicepro.com`). This project is marketing-only.

### Competitive Benchmark

Before building anything, the design quality and page depth must match or exceed these competitors:
- **Jobber** — `getjobber.com` — clean, professional, very conversion-focused
- **Housecall Pro** — `housecallpro.com` — bright, mobile-first, feature-heavy
- **ServiceTitan** — `servicetitan.com` — enterprise polish, detailed feature pages

These sites use: clear hero sections with strong CTAs, animated feature showcases, social proof (testimonials, logos, numbers), transparent pricing, detailed comparison tables, and strong footer navigation. Match this level of polish.

### Business Context

ServicePro is a field service management SaaS for US-based home service businesses (HVAC, plumbing, electrical, cleaning, handyman) with 1–10 staff. It competes directly with Jobber and Housecall Pro but at a lower price point with simpler setup. Key selling points:
- Cheaper than competitors (starts at $79/month vs Jobber's $199+)
- Mobile-first, set up in under 30 minutes
- Smart two-way SMS built in
- Built specifically for small crews — no enterprise complexity

---

## 2. Package Installation & Setup

### 2.1 Start with a Clean Laravel 12 Application

The developer will have already run `composer create-project laravel/laravel servicepro-landing` or equivalent. Begin from that clean state.

### 2.2 Required Composer Packages

Install the following via Composer:

```
inertiajs/inertia-laravel
tightenco/ziggy
laravel/sanctum (not needed immediately but install for future API calls)
```

Run `php artisan inertia:middleware` after installing Inertia to publish the middleware. Register `HandleInertiaRequests` in the HTTP kernel `web` middleware group.

### 2.3 Required NPM Packages

Install the following via npm:

```
@inertiajs/vue3
@vitejs/plugin-vue
vue
typescript
@types/node
@vueuse/core
@vueuse/motion (for scroll animations)
lucide-vue-next (icon library — same set used across the design)
swiper (for testimonial carousels)
@formkit/auto-animate (for subtle UI animations)
```

### 2.4 Tailwind CSS v4

Install Tailwind CSS v4 using the official Vite plugin approach. Do NOT use the v3 PostCSS approach. Use `@tailwindcss/vite` plugin.

In `resources/css/app.css` use `@import "tailwindcss"` and define all custom theme tokens using the `@theme` directive. Do not use `tailwind.config.js` — Tailwind v4 uses CSS-first configuration.

### 2.5 TypeScript Configuration

Configure TypeScript with strict mode. Create a `tsconfig.json` at the project root. All Vue component `<script>` blocks must use `<script setup lang="ts">`. All props must be typed. All emits must be typed.

### 2.6 Vite Configuration

Configure `vite.config.ts` with:
- `@vitejs/plugin-vue` for Vue SFC support
- `@tailwindcss/vite` for Tailwind v4
- Ziggy alias so `route()` helper works in Vue components
- Path alias `@` pointing to `resources/js`

### 2.7 Inertia Root Template

Create `resources/views/app.blade.php` as the Inertia root template. This single Blade file is the only Blade view needed. It must:
- Include the Vite assets with `@vite(['resources/css/app.css', 'resources/js/app.ts'])`
- Include `@inertiaHead` in the `<head>` for per-page meta tags
- Include `@inertia` in the body
- Include the Ziggy route script with `@routes`
- Set `lang="en"` on the `<html>` tag
- Include Inter font from Google Fonts (weights 300, 400, 500, 600, 700, 800)

### 2.8 Inertia App Entry Point

The main entry point is `resources/js/app.ts`. Configure Inertia with `createInertiaApp`, resolve pages from `resources/js/pages`, and mount to `#app`.

---

## 3. Project Structure

Create exactly this directory and file structure. Do not deviate.

```
resources/
├── css/
│   └── app.css                          # Tailwind v4 + custom properties
├── js/
│   ├── app.ts                           # Inertia entry point
│   ├── ssr.ts                           # SSR entry (optional but create stub)
│   ├── types/
│   │   └── index.d.ts                   # Global TypeScript types
│   ├── composables/
│   │   ├── useScrollReveal.ts           # Intersection observer for scroll animations
│   │   └── useWaitlist.ts               # Waitlist form submission logic
│   ├── data/
│   │   ├── navigation.ts                # All nav links defined here, single source of truth
│   │   ├── testimonials.ts              # Testimonial data
│   │   ├── features.ts                  # Feature list data
│   │   ├── pricing.ts                   # Pricing plan data
│   │   ├── faqs.ts                      # FAQ data
│   │   └── social.ts                    # Social media links
│   ├── layouts/
│   │   └── MarketingLayout.vue          # Wraps all public pages: nav + footer
│   ├── components/
│   │   ├── marketing/
│   │   │   ├── Navbar.vue               # Top navigation bar
│   │   │   ├── Footer.vue               # Site footer
│   │   │   ├── HeroSection.vue          # Reusable hero component
│   │   │   ├── FeatureCard.vue          # Single feature card
│   │   │   ├── PricingCard.vue          # Single pricing plan card
│   │   │   ├── TestimonialCard.vue      # Single testimonial
│   │   │   ├── TestimonialCarousel.vue  # Carousel of testimonials
│   │   │   ├── ComparisonTable.vue      # vs competitors table
│   │   │   ├── StatsBanner.vue          # Social proof numbers bar
│   │   │   ├── FeatureShowcase.vue      # Alternating image+text feature blocks
│   │   │   ├── WaitlistForm.vue         # Email capture form
│   │   │   ├── WaitlistModal.vue        # Modal version of waitlist form
│   │   │   ├── FaqAccordion.vue         # FAQ accordion component
│   │   │   ├── TrustBadges.vue          # SSL, US-based, etc trust indicators
│   │   │   ├── CookieBanner.vue         # CCPA cookie consent banner
│   │   │   ├── AnnouncementBar.vue      # Top-of-page promo bar
│   │   │   └── TradeLogos.vue           # HVAC/Plumbing/Electrical logos/icons row
│   │   └── ui/
│   │       ├── Button.vue               # Primary button component with variants
│   │       ├── Input.vue                # Styled form input
│   │       ├── Badge.vue                # Pill badge component
│   │       ├── Chip.vue                 # Feature chip component
│   │       └── SectionHeader.vue        # Reusable section heading block
│   └── pages/
│       ├── Home.vue                     # Main landing page (/)
│       ├── Features.vue                 # Features detail page (/features)
│       ├── Pricing.vue                  # Pricing page (/pricing)
│       ├── About.vue                    # About page (/about)
│       ├── Contact.vue                  # Contact page (/contact)
│       ├── Blog/
│       │   └── Index.vue                # Blog listing (/blog) — placeholder
│       └── legal/
│           ├── Privacy.vue              # Privacy Policy (/privacy) — placeholder
│           ├── Terms.vue                # Terms of Service (/terms) — placeholder
│           └── Security.vue             # Security page (/security) — placeholder

app/
├── Http/
│   ├── Controllers/
│   │   └── Marketing/
│   │       ├── HomeController.php
│   │       ├── FeaturesController.php
│   │       ├── PricingController.php
│   │       ├── AboutController.php
│   │       ├── ContactController.php
│   │       ├── BlogController.php
│   │       └── WaitlistController.php
│   └── Requests/
│       ├── WaitlistRequest.php
│       └── ContactRequest.php
├── Models/
│   ├── WaitlistEntry.php
│   └── ContactMessage.php

database/
└── migrations/
    ├── xxxx_create_waitlist_entries_table.php
    └── xxxx_create_contact_messages_table.php
```

---

## 4. Design System

This is the single source of truth for all visual decisions. Every component must use these tokens. Do not invent colours, sizes, or styles outside of this system.

### 4.1 Colour Palette

Define all colours as CSS custom properties inside `@theme {}` in `app.css`. Use these exact values:

**Brand Colours**

| Token | Value | Usage |
|---|---|---|
| `--color-brand-50` | `#eff6ff` | Lightest blue tint, backgrounds |
| `--color-brand-100` | `#dbeafe` | Light blue, hover states |
| `--color-brand-200` | `#bfdbfe` | Border highlights |
| `--color-brand-500` | `#3b82f6` | Medium blue |
| `--color-brand-600` | `#2563eb` | **Primary brand blue — buttons, links** |
| `--color-brand-700` | `#1d4ed8` | Hover state for primary blue |
| `--color-brand-800` | `#1e40af` | Dark blue |
| `--color-brand-900` | `#1e3a8a` | Darkest blue, hero backgrounds |
| `--color-brand-950` | `#172554` | Near-black blue, nav background |

**Accent — Green (CTA success, pricing)**

| Token | Value | Usage |
|---|---|---|
| `--color-accent-400` | `#34d399` | Light green |
| `--color-accent-500` | `#10b981` | **Primary CTA green** |
| `--color-accent-600` | `#059669` | Hover state for green CTAs |

**Neutrals**

| Token | Value | Usage |
|---|---|---|
| `--color-neutral-50` | `#f8fafc` | Page backgrounds |
| `--color-neutral-100` | `#f1f5f9` | Card backgrounds |
| `--color-neutral-200` | `#e2e8f0` | Borders |
| `--color-neutral-400` | `#94a3b8` | Placeholder text |
| `--color-neutral-500` | `#64748b` | Secondary text |
| `--color-neutral-700` | `#334155` | Body text |
| `--color-neutral-900` | `#0f172a` | Headings |
| `--color-neutral-950` | `#020617` | Footer background |

**Status Colours**

| Token | Value | Usage |
|---|---|---|
| `--color-success` | `#10b981` | Success states |
| `--color-warning` | `#f59e0b` | Warning states |
| `--color-error` | `#ef4444` | Error states |

### 4.2 Typography

**Font Family:** Inter (Google Fonts — loaded in root Blade template)

Define in `@theme {}`:

```
--font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif
```

**Type Scale — use these exact sizes throughout:**

| Role | Size | Weight | Line Height |
|---|---|---|---|
| Display / Hero H1 | `text-5xl` to `text-7xl` (responsive) | `font-extrabold` (800) | `leading-tight` |
| Page H1 | `text-4xl` to `text-5xl` | `font-bold` (700) | `leading-tight` |
| Section H2 | `text-3xl` to `text-4xl` | `font-bold` (700) | `leading-snug` |
| Sub-section H3 | `text-xl` to `text-2xl` | `font-semibold` (600) | `leading-snug` |
| Card Heading | `text-lg` to `text-xl` | `font-semibold` (600) | `leading-normal` |
| Body Large | `text-lg` | `font-normal` (400) | `leading-relaxed` |
| Body | `text-base` | `font-normal` (400) | `leading-relaxed` |
| Small / Caption | `text-sm` | `font-normal` (400) | `leading-normal` |
| Label / Badge | `text-xs` to `text-sm` | `font-medium` (500) | `leading-none` |

### 4.3 Spacing & Layout

- **Max content width:** `max-w-7xl` (1280px) with `mx-auto px-4 sm:px-6 lg:px-8`
- **Section vertical padding:** `py-20 lg:py-28`
- **Card padding:** `p-6 lg:p-8`
- **Border radius:** Cards use `rounded-2xl`. Buttons use `rounded-xl`. Inputs use `rounded-lg`. Badges use `rounded-full`.
- **Grid gaps:** `gap-8` on card grids, `gap-12` between major feature blocks
- **Shadow system:** Cards use `shadow-sm` at rest, `shadow-lg` on hover with a transition. Hero cards use `shadow-2xl`.

### 4.4 Button Variants

The `Button.vue` component must support exactly these variants:

- **`primary`** — `bg-brand-600 hover:bg-brand-700 text-white` — main CTA buttons
- **`secondary`** — `bg-white border-2 border-brand-600 text-brand-600 hover:bg-brand-50` — secondary actions
- **`success`** — `bg-accent-500 hover:bg-accent-600 text-white` — waitlist / sign up actions
- **`ghost`** — `text-brand-600 hover:bg-brand-50` — nav links, subtle actions
- **`dark`** — `bg-neutral-900 hover:bg-neutral-800 text-white` — dark section buttons

Sizes: `sm` (small), `md` (default), `lg` (large), `xl` (hero CTA).

All buttons have: `font-semibold`, transition duration 150ms, focus ring for accessibility. Large buttons (`lg`, `xl`) have `rounded-xl`, normal buttons `rounded-lg`.

### 4.5 Shadow & Elevation

```css
/* Define these in @theme or as utilities */
--shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-card-hover: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-hero: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### 4.6 Animation Rules

- All hover transitions: `transition-all duration-200 ease-in-out`
- Scroll reveal animations: elements fade up into view using `@vueuse/motion`. Use `visibleOnce` preset. Stagger children by 100ms.
- Never use `transition-all` on elements with layout changes — only on `opacity`, `transform`, `shadow`, `colors`.
- No animations should feel jarring. Subtle is better.

### 4.7 Dark Sections

Several sections use dark/navy backgrounds. When on a dark background (`bg-brand-950`, `bg-neutral-950`):
- All text is white or `text-neutral-300`
- Subheadings use `text-brand-400`
- Borders use `border-white/10`
- Cards use `bg-white/5 border border-white/10`

### 4.8 Gradient Patterns

Use these specific gradients consistently:

- **Hero gradient:** `bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800`
- **Section alternating:** Alternate between `bg-white` and `bg-neutral-50` for visual rhythm
- **CTA section gradient:** `bg-gradient-to-r from-brand-600 to-brand-800`
- **Card highlight gradient:** `bg-gradient-to-br from-brand-50 to-white`
- **Mesh background (hero):** Create a subtle dot/grid pattern using CSS `background-image` with radial gradients at low opacity — adds depth without an image

---

## 5. Global Layout & Navigation

### 5.1 `MarketingLayout.vue`

This layout wraps every public page. It renders `<Navbar />` at the top, a `<slot />` for page content, and `<Footer />` at the bottom. It also renders `<CookieBanner />` and `<AnnouncementBar />`. Pass page `title`, `description`, and `ogImage` as props from each page using Inertia's `<Head>` component.

### 5.2 `AnnouncementBar.vue`

A slim bar above the main navbar, `bg-brand-600 text-white`. Contains:
- Left: small megaphone icon + text: `"ServicePro is launching 1 May 2026 — Join the waitlist and get 30 days free"`
- Right: `"Join Waitlist →"` link that scrolls to the waitlist section
- A close/dismiss button (X icon) on the far right that hides the bar (use `localStorage` to persist dismissal)
- Full width, `py-2 px-4`, `text-sm font-medium`

### 5.3 `Navbar.vue`

**Behaviour:** Starts transparent over the hero (where applicable). Becomes `bg-white/95 backdrop-blur-md shadow-sm` when the user scrolls past 80px. Use `@vueuse/core`'s `useScroll` composable for this.

**Left side:**
- ServicePro logo — SVG wordmark. The logo text is `"ServicePro"` in `font-extrabold` with the `"Pro"` in `text-brand-600`. Use an SVG logo component, not an image file.
- Below the logo text on desktop, a tiny badge: `"US Only"` in `text-xs bg-brand-100 text-brand-700 rounded-full px-2`

**Centre (desktop only — hidden on mobile):**
- Navigation links in a horizontal row
- Links: `Features`, `Pricing`, `About`, `Blog`, `Contact`
- Each link has a hover underline animation (`after:` pseudo-element that scales from 0 to 1 on hover, `transition-transform`)
- `Features` and `Pricing` open a **mega dropdown** on hover

**Right side (desktop):**
- `"Log In"` — ghost button — links to `https://app.getservicepro.com/login`
- `"Start Free Trial"` — primary button — links to `https://app.getservicepro.com/register`

**Mobile hamburger menu:**
- Hamburger icon (three lines) on the right
- Full-screen slide-down panel with all nav links stacked vertically
- Includes `Log In` and `Start Free Trial` buttons stacked
- Animated open/close with `@vueuse/motion`
- Close button (X) in top right of the mobile menu panel

**Features Mega Dropdown:**
When hovering over "Features", show a large dropdown card with a grid of feature categories:
- Column 1: Scheduling & Dispatch, Job Management, GPS Tracking
- Column 2: Invoicing & Payments, Estimates & Quotes, Payment Links
- Column 3: Customer SMS, Automated Follow-ups, 2-Way Messaging
- Column 4: Reports & Analytics, Team Management, Mobile App

Each item has a small icon, a bolded title, and a one-line description. Bottom of the dropdown: a CTA bar — `"See all features →"` link.

**Pricing Dropdown:**
Simpler dropdown showing the three pricing tiers with prices and a `"View full pricing →"` link.

### 5.4 `Footer.vue`

Full-width, `bg-neutral-950 text-white`. Four column layout on desktop, stacked on mobile.

**Column 1 — Brand:**
- ServicePro logo (white version)
- Tagline: `"Field service management software built for small home service businesses across the United States."`
- Social media icon row (see Section 10 for links)
- Trust indicators row: US flag emoji + `"US-Only Platform"`, lock icon + `"SSL Secured"`, shield icon + `"SOC 2 In Progress"`

**Column 2 — Product:**
- Links: Features, Pricing, Changelog, Roadmap (coming soon), API Docs (coming soon), Status Page (coming soon), Mobile App

**Column 3 — Company:**
- Links: About, Blog, Careers (coming soon), Partners (coming soon), Press, Contact

**Column 4 — Legal & Support:**
- Links: Privacy Policy, Terms of Service, Security, Cookie Policy, Help Centre (coming soon), System Status

Pages that are not yet built should still have links — use `#` as the href and add a `"Coming Soon"` badge next to the link text in `text-xs bg-neutral-700 text-neutral-400 rounded px-1`.

**Footer bottom bar:**
- Left: `"© 2026 ServicePro LLC. All rights reserved. Registered in the United States."`
- Right: `"Made for home service businesses  🇺🇸"`
- Very thin `border-t border-white/10` separating this bar from the columns above

**Footer contact strip (above columns):**
- A row with: email icon + `hello@getservicepro.com`, phone icon + `+1 (855) 737-2876`, location pin + `Sheridan, Wyoming, USA`
- Subtle `border-b border-white/10` below this strip

---

## 6. Page-by-Page Build Instructions

### 6.1 Home Page (`/`)

This is the most important page. It must be exceptional. Study Jobber's homepage and Housecall Pro's homepage before building.

---

#### SECTION 1 — Hero

**Layout:** Full-viewport-height (`min-h-screen`), dark navy gradient background (`bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800`). Subtle dot-grid pattern overlay at 5% opacity for texture. The Navbar sits transparently over this section.

**Left side (60% width on desktop, full width on mobile):**

Eyebrow label (above the H1):
- Small pill badge: icon + text `"Now accepting waitlist applications"` — white text, `bg-white/10 border border-white/20` background, rounded-full

Headline H1:
- `"Run your home service business like a pro."`
- Massive text: `text-5xl lg:text-7xl font-extrabold text-white leading-tight`
- Line break after "business" on desktop for visual impact

Sub-headline:
- `"Scheduling, invoicing, and smart SMS follow-up — built for HVAC, plumbing, electrical, and cleaning crews of 1 to 10."`
- `text-xl text-neutral-300 leading-relaxed mt-6 max-w-2xl`

CTA row (horizontal, `gap-4 mt-10`):
- Primary: large green button `"Join the Waitlist — Free"` — scrolls to waitlist section (`#waitlist`)
- Secondary: white outline button `"Watch 2-min Demo"` — opens YouTube video in a lightbox modal

Trust indicators below CTAs (`mt-8 flex flex-wrap gap-6 text-sm text-neutral-400`):
- Checkmark icon + `"No credit card required"`
- Checkmark icon + `"Setup in under 30 minutes"`
- Checkmark icon + `"Cancel any time"`

**Right side (40% width on desktop, hidden on mobile below 768px):**
- A floating app screenshot mockup — use a browser-frame SVG wrapper around a stylised screenshot representation (since no real screenshot exists yet, use a carefully crafted placeholder that looks like a real app interface: dark-light split, showing a "Jobs Today" dashboard view with fake job cards. Style this as a Vue component with hardcoded sample data so it looks photorealistic. Apply `shadow-2xl rounded-2xl rotate-1` to the frame for a slight tilt effect.
- Three floating stat cards anchored to the edges of the mockup:
  - Card 1 (top-left of mockup): `"3 jobs completed today"` — small card with green dot
  - Card 2 (bottom-right): `"Invoice sent — $485"` with paid badge
  - Card 3 (top-right): `"Client replied via SMS"` with SMS bubble icon
  - These cards use `bg-white shadow-xl rounded-xl p-3` and animate in with a float effect (CSS `@keyframes float` with a gentle up-down motion on a 3-second loop)

**Mobile layout:** Stack vertically. Hero text first, then CTA buttons, then trust line. App mockup below the fold (or hidden).

---

#### SECTION 2 — Trades Logos Bar

Background: `bg-white border-y border-neutral-100`

Content:
- Centered text: `"Built for the trades"` in `text-sm font-semibold text-neutral-400 uppercase tracking-wider`
- A horizontal scrolling row of trade icons with labels:
  - HVAC, Plumbing, Electrical, Cleaning, Handyman, Landscaping, Pest Control, Painting, Appliance Repair, Locksmith
- Each item: a trade-appropriate emoji or Lucide icon + trade name in `text-sm text-neutral-600`
- On mobile, this row scrolls horizontally with `overflow-x-auto scrollbar-hide`

---

#### SECTION 3 — Social Proof Stats Banner

Background: `bg-brand-600`

Four stats in a 4-column grid, white text:

| Stat | Label |
|---|---|
| `500+` | Home service businesses on the waitlist |
| `<30 min` | Average setup time |
| `$79/mo` | Starting price — half the cost of Jobber |
| `4.9 / 5` | Beta user satisfaction rating |

Each stat: large number in `text-4xl font-extrabold text-white`, label in `text-sm text-blue-100`. Separated by subtle vertical dividers. On mobile, 2×2 grid.

---

#### SECTION 4 — Pain Points Section

Background: `bg-neutral-50`

SectionHeader component:
- Eyebrow: `"Sound familiar?"`
- H2: `"Running a home service business is hard enough."`
- Subtext: `"Most HVAC, plumbing, and cleaning business owners are managing jobs out of their head — and losing money because of it."`

3-column card grid (stacks to 1 on mobile):

**Card 1 — Scheduling Chaos**
- Icon: calendar with X (red)
- Title: `"Double-bookings and missed appointments"`
- Body: `"You're juggling text messages, phone calls, and a whiteboard. Clients fall through the cracks when you're busy on a job."`

**Card 2 — Chasing Invoices**
- Icon: clock with dollar sign (amber)
- Title: `"Invoices sitting unpaid for weeks"`
- Body: `"You finished the job in January. You still haven't been paid in March because you forgot to follow up — again."`

**Card 3 — No Follow-ups**
- Icon: message with question mark (orange)
- Title: `"Quotes that go cold"`
- Body: `"You sent a quote. They never replied. You never followed up. That was a $600 job you lost to a competitor who did."`

Each card: `bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow`. Icon in a coloured circle background (`w-12 h-12 rounded-xl`). This section has a subtle upward scroll animation on each card (staggered 100ms apart).

Below the cards, a transition paragraph:
- `"ServicePro fixes all three. Automatically."` — centred, `text-xl font-semibold text-neutral-700 mt-12`
- Arrow pointing down

---

#### SECTION 5 — Feature Showcase (Alternating blocks)

Background: `bg-white`

SectionHeader:
- Eyebrow: `"How it works"`
- H2: `"Everything you need. Nothing you don't."`
- Subtext: `"ServicePro is built for crews of 1 to 10. No enterprise complexity. No 6-hour onboarding call. Just a clean, fast app that runs your business."`

Three alternating feature blocks. Each block is a two-column layout (50/50). Image/mockup on one side, text on the other. They alternate left-right-left.

**Feature Block 1 — Scheduling & Dispatch (image right)**
- Tag chip: `"Scheduling"`
- H3: `"Schedule jobs and dispatch your crew in seconds"`
- Body: `"Drag-and-drop job calendar. See your whole crew's day at a glance. Assign jobs with one tap from your phone. GPS check-in so you always know where your team is."`
- Bullet points (3, each with checkmark icon):
  - `"Drag-and-drop calendar view"`
  - `"One-tap job assignment to any technician"`
  - `"GPS tracking — see where your crew is in real time"`
- CTA link: `"Explore scheduling features →"`
- Visual: Stylised calendar/dispatch mockup panel (Vue component with sample day data)

**Feature Block 2 — Invoicing & Payments (image left)**
- Tag chip: `"Payments"`
- H3: `"Get paid faster with one-tap invoicing"`
- Body: `"Create an invoice on your phone the moment you finish a job. Send a payment link via SMS. Clients pay by card, Apple Pay, or Google Pay. Funds in your bank in 2 business days."`
- Bullet points:
  - `"Invoice sent in under 60 seconds after job completion"`
  - `"Payment links by SMS — no app download needed for clients"`
  - `"Stripe-powered payments — 2-day payout"`
- CTA link: `"Explore invoicing features →"`
- Visual: Stylised invoice/payment mockup

**Feature Block 3 — Smart SMS (image right)**
- Tag chip: `"Smart SMS"`
- H3: `"Two-way SMS that follows up so you don't have to"`
- Body: `"Send job reminders, quote follow-ups, and payment nudges automatically. Clients reply via SMS and you see it all in one thread. No more lost conversations across apps."`
- Bullet points:
  - `"Automatic follow-up 24 hours after a quote is sent"`
  - `"Two-way SMS — clients reply and you respond in the app"`
  - `"Appointment reminders reduce no-shows by up to 40%"`
- CTA link: `"Explore SMS features →"`
- Visual: Stylised SMS thread mockup

Each block has a slow fade-in + slide-in animation triggered by scroll position.

---

#### SECTION 6 — Full Feature Grid

Background: `bg-neutral-50`

SectionHeader:
- Eyebrow: `"Everything included"`
- H2: `"All the features your business needs"`

4-column grid of feature cards (2-column on tablet, 1-column on mobile). Minimum 16 feature cards:

1. Job Scheduling — calendar icon
2. Customer Management — users icon
3. Invoicing — file-text icon
4. Online Payments — credit-card icon
5. Estimates & Quotes — clipboard icon
6. Two-Way SMS — message-square icon
7. Automated Follow-ups — repeat icon
8. GPS Tracking — map-pin icon
9. Job Photos — camera icon
10. Team Management — users-2 icon
11. Mobile App — smartphone icon
12. Customer Portal — layout-dashboard icon
13. Revenue Reports — bar-chart icon
14. Stripe Integration — zap icon
15. Automated Reminders — bell icon
16. Route Optimization — navigation icon

Each card: small icon in `bg-brand-100 text-brand-600 rounded-lg p-2 w-10 h-10`, feature title in `font-semibold`, one-line description. Hover lifts card with `shadow-md`.

---

#### SECTION 7 — Comparison Table

Background: `bg-white`

SectionHeader:
- Eyebrow: `"How we compare"`
- H2: `"More features. Half the price."`
- Subtext: `"ServicePro gives you 90% of what Jobber and Housecall Pro offer, at a fraction of the cost. No long-term contracts."`

A sticky-header comparison table. Columns: Feature | ServicePro | Jobber | Housecall Pro

Header row: ServicePro column should be highlighted with `bg-brand-50 border-2 border-brand-500` and a `"Best Value"` badge above it.

Rows (use checkmark ✓ in green, or dash — in grey for not included):

| Feature | ServicePro | Jobber | Housecall Pro |
|---|---|---|---|
| Starting price | `$79/mo` | `$199/mo` | `$169/mo` |
| Free trial | 14 days | 14 days | 14 days |
| Setup time | Under 30 min | 2–4 hours | 2–3 hours |
| Scheduling | ✓ | ✓ | ✓ |
| Invoicing & Payments | ✓ | ✓ | ✓ |
| Two-way SMS | ✓ | Add-on | ✓ |
| GPS Tracking | ✓ | ✓ | ✓ |
| Customer Portal | ✓ | ✓ | ✓ |
| Automated Follow-ups | ✓ | Limited | ✓ |
| AI-powered features | ✓ | — | — |
| Built for 1–10 staff | ✓ | Partial | Partial |
| No contract required | ✓ | ✓ | ✓ |
| US-dedicated support | ✓ | ✓ | ✓ |
| Mobile-first design | ✓ | Partial | ✓ |

Below the table: CTA — `"Try ServicePro free for 14 days — no credit card required"` → primary button to app register URL.

Note: Do not make false or legally problematic claims. All comparison data above is approximate/indicative and should be reviewed before publishing. Add a footnote: `"* Pricing and features accurate as of Feb 2026. Subject to change."` in `text-xs text-neutral-400`.

---

#### SECTION 8 — Testimonials

Background: `bg-brand-950` (dark section)

SectionHeader (white text):
- Eyebrow: `"What our beta users say"`
- H2: `"Home service businesses trust ServicePro"`

Display 6 testimonials in a 3-column masonry-style grid (1 column on mobile, 2 on tablet). Each card:
- `bg-white/5 border border-white/10 rounded-2xl p-8`
- Star rating (5 stars, gold)
- Quote text in `text-neutral-300`
- Author block: avatar circle with initials + name + business type + city

**Sample testimonial data (use this in `data/testimonials.ts`):**

```
1. Name: Mike Harrington | Business: Harrington HVAC Services | City: Phoenix, AZ
   Quote: "I used to lose track of at least 2–3 jobs a month. With ServicePro, every job is scheduled, invoiced, and followed up automatically. Saved me around $800 a month in lost work."

2. Name: Rosa Martinez | Business: Martinez Plumbing Co | City: San Antonio, TX
   Quote: "The SMS follow-up is a game changer. I sent a quote on a Monday, ServicePro followed up Tuesday, and the client booked and paid by Wednesday. Didn't have to lift a finger."

3. Name: Tyler Brooks | Business: Brooks Electrical | City: Charlotte, NC
   Quote: "Setup really did take under 30 minutes. I had my first job scheduled and invoiced within an hour. Jobber took me a whole weekend to figure out."

4. Name: Dana Chen | Business: Sparkle Clean | City: Tampa, FL
   Quote: "Running a 4-person cleaning crew, I was drowning in WhatsApp messages. ServicePro replaced all of that. My team knows exactly where to be and when."

5. Name: James Okafor | Business: JO Handyman Services | City: Nashville, TN
   Quote: "Half the price of what I was paying for Jobber. And honestly? It's easier to use. The mobile app is fast and my clients love getting a payment link right after the job."

6. Name: Sarah Lindqvist | Business: Lindqvist Pest Solutions | City: Denver, CO
   Quote: "The GPS tracking alone is worth it. I can see where my techs are without texting them every hour. The reporting shows me exactly which jobs are most profitable."
```

Below testimonials: a row of aggregate stats — `"Rated 4.9/5 by beta users"`, `"Zero to setup in 30 minutes"`, `"50+ businesses in beta"`

---

#### SECTION 9 — Pricing Preview

Background: `bg-neutral-50`

SectionHeader:
- Eyebrow: `"Simple pricing"`
- H2: `"No hidden fees. No long-term contracts."`
- Subtext: `"Start free for 14 days. Cancel any time. Upgrade or downgrade at any time."`

Billing toggle: `Monthly` / `Annual (Save 20%)` — animate the prices switching when toggled.

Three pricing cards in a row (1 column on mobile):

**Card 1 — Starter**
- Label: `"Starter"` 
- Price: `$79/mo` (annual: `$63/mo`)
- Description: `"Perfect for solo operators and 2-man crews"`
- Feature list (7 items with checkmarks):
  - Up to 2 users
  - Job scheduling & dispatch
  - Invoicing & online payments
  - Customer management
  - 100 SMS per month
  - Mobile app
  - Email support
- CTA: `"Start Free Trial"` — secondary button
- Note below: `"14-day free trial. No credit card required."`

**Card 2 — Professional** ← HIGHLIGHTED as "Most Popular"
- Badge: `"Most Popular"` in white text on `bg-brand-600`, positioned absolute top-center
- Border: `border-2 border-brand-600`
- Label: `"Professional"`
- Price: `$149/mo` (annual: `$119/mo`)
- Description: `"For growing crews of up to 5 staff"`
- Feature list (everything in Starter plus):
  - Up to 5 users
  - 500 SMS per month
  - Two-way SMS conversations
  - Automated follow-ups
  - GPS tracking
  - Estimates & quotes
  - Priority support
- CTA: `"Start Free Trial"` — primary button (larger, more prominent)
- Note: `"Most popular with HVAC and plumbing crews"`

**Card 3 — Business**
- Label: `"Business"`
- Price: `$299/mo` (annual: `$239/mo`)
- Description: `"For established businesses with up to 10 staff"`
- Feature list (everything in Professional plus):
  - Up to 10 users
  - Unlimited SMS
  - API access
  - Custom reporting
  - Dedicated account manager
  - SLA-backed support
  - White-label customer portal
- CTA: `"Start Free Trial"` — secondary button

Below the cards: `"Need more than 10 users? Contact us for Enterprise pricing →"` text link.

Below that: FAQ teaser — `"Have questions about pricing? See our FAQ →"` link to `/pricing#faq`.

---

#### SECTION 10 — Waitlist CTA Section (ID: `waitlist`)

Background: `bg-gradient-to-r from-brand-600 to-brand-800`

This section must be visually striking. White text on the gradient background.

Left side:
- H2: `"Be first in line when we launch."`
- Subtext: `"Join the waitlist today. Get 30 days free at launch — double the standard trial. Plus lock in founding member pricing."`
- Three benefit bullets (white with checkmark):
  - `"30-day free trial (standard is 14 days)"`
  - `"Founding member rate — locked in for your first year"`
  - `"Priority access before public launch on 1 May 2026"`

Right side: The `WaitlistForm.vue` component embedded directly (see Section 8 for form specs).

On mobile: Stacked vertically, form below text.

**Waitlist counter** below the form: `"487 businesses already on the waitlist"` — update this number in the `.env` or as a controller variable.

---

#### SECTION 11 — FAQ Accordion

Background: `bg-white`

SectionHeader:
- Eyebrow: `"Questions"`
- H2: `"Frequently asked questions"`

Two-column FAQ grid on desktop (1 column mobile), 10 FAQ items using the `FaqAccordion.vue` component:

1. **When does ServicePro launch?** — `"We launch publicly on 1 May 2026. Beta access begins 1 April 2026 for waitlist members."`
2. **Do I need a credit card to sign up?** — `"No. Your 14-day free trial (or 30-day waitlist trial) requires no credit card. You only enter payment details when you choose to subscribe."`
3. **Which home service businesses does ServicePro work for?** — `"ServicePro is built for HVAC, plumbing, electrical, cleaning, handyman, landscaping, pest control, painting, and appliance repair businesses in the United States."`
4. **How long does setup take?** — `"Most business owners are fully set up — jobs scheduled, team added, and first invoice sent — in under 30 minutes. There's no training call required."`
5. **Can I use ServicePro on my phone?** — `"Yes. ServicePro is mobile-first. Everything works on iOS and Android browsers without downloading a separate app. A native app is on our roadmap."`
6. **How does the SMS follow-up work?** — `"When you send a quote, ServicePro automatically sends a follow-up SMS to your client 24 hours later. If they reply, you see the conversation in your inbox. No manual follow-up required."`
7. **What does ServicePro cost?** — `"Plans start at $79/month for solo operators up to $299/month for teams of up to 10. Annual billing saves 20%. See our full pricing page for details."`
8. **How is ServicePro different from Jobber or Housecall Pro?** — `"ServicePro is purpose-built for crews of 1–10. We offer 90% of the features at half the price with a simpler setup experience. Jobber and Housecall Pro are great products but built for larger, more complex operations."`
9. **Can I import my existing customer data?** — `"Yes. You can import customers from a CSV file. We also offer a free onboarding call for Professional and Business plan users to help with data migration."`
10. **What happens to my data if I cancel?** — `"You retain full ownership of your data. We provide a full export in CSV format at any time. If you cancel, your data is retained for 30 days before deletion."`

---

#### SECTION 12 — Final CTA Band

Background: `bg-neutral-950`

Centred content:
- H2: `"Ready to run your business like a pro?"` — white, large
- Subtext: `"Join 487 home service businesses already on the waitlist."` — `text-neutral-400`
- Two buttons side by side: `"Join the Waitlist"` (success/green button, xl size) and `"View Pricing"` (ghost/white outline button)
- Below buttons: `"No credit card required. Setup in under 30 minutes."` in `text-sm text-neutral-500`

---

### 6.2 Features Page (`/features`)

**Hero:**
- Smaller hero. White background. Centered.
- Badge: `"Platform Features"`
- H1: `"Every feature your home service business needs."`
- Subtext: `"From first call to final payment — ServicePro manages every step of the job lifecycle."`
- Two CTAs: `"Start Free Trial"` and `"View Pricing"`

**Feature Categories:**
Group features into tabbed sections. Four tab categories:

- **Scheduling & Jobs** — all scheduling, dispatch, GPS, calendar features
- **Money & Invoicing** — invoicing, payments, estimates, quotes, financial tracking
- **Customer Communication** — SMS, follow-ups, reminders, portal, notifications
- **Business Management** — reports, team, permissions, settings, API

Each tab shows a large feature block: description on the left, stylised mockup or icon-rich illustration on the right. Below each block, a 3-column grid of sub-features.

Use the `FeaturesController.php` to pass feature data to this page. Define all feature data in `resources/js/data/features.ts` for use both in the Vue component and as a reference.

**Bottom:** Standard waitlist CTA section (reuse the `WaitlistForm.vue` component).

---

### 6.3 Pricing Page (`/pricing`)

**Hero:**
- White background
- H1: `"Simple, transparent pricing"`
- Subtext: `"Built for home service businesses of every size. Cancel any time."`

**Pricing Cards:** (same 3-card layout as Home Section 9, but more detailed)

Under each card, expand the feature list to show every feature included (15+ items per plan). Use a collapsible "See all features" toggle for anything beyond 8 items.

**Add-ons section** (below the three main plans):
- SMS Credits (for over-plan usage): `"$0.025 per message"`
- Additional Users: `"$15/user/month"`
- API Access (Business plan only): Included

**Full comparison table:** (same as Home Section 7, but expanded with more rows — add 10 additional feature rows)

**Money-back guarantee banner:**
- Icon + text: `"30-day money-back guarantee on all plans. No questions asked."`
- `bg-green-50 border border-green-200 rounded-2xl p-6`

**FAQ section (pricing-specific):**
Use same `FaqAccordion` component. 6 pricing-specific questions (cancellation, billing dates, tax, team changes, upgrades, refunds).

**Bottom CTA:** Waitlist CTA section.

---

### 6.4 About Page (`/about`)

**Hero:**
- Gradient background
- H1: `"Built for the people who keep homes running."`
- Subtext: `"We talked to hundreds of HVAC techs, plumbers, and electricians. They all said the same thing: the software is too complex and costs too much."`

**Mission section:**
- Clean 2-column layout
- Left: Mission statement — `"Our mission is to give every home service business owner the tools that were previously only available to enterprise companies — at a price that makes sense for a 3-person crew."`
- Right: Three value cards: `Simplicity first`, `Built for the trades`, `US-focused`

**Story section:**
- Full-width narrative text block — conversational tone, founder's perspective on why they built this
- Reference: speaking to 50+ business owners, understanding their real pain points, building a solution that respects their time and intelligence

**Team section:**
- Simple grid placeholder — `"Our team is growing. See our open positions."` link to Careers (coming soon)

**Values section:**
- 4 value pillars in a 2×2 grid: Transparency, Reliability, Simplicity, Community

**Investors / Backers section (placeholder):**
- `"If you're interested in backing ServicePro, contact us at investors@getservicepro.com"`

**Bottom CTA:** Waitlist CTA section.

---

### 6.5 Contact Page (`/contact`)

**Layout:** 2-column layout on desktop. Form on the left, contact information on the right.

**Contact Form (left):**
- H1: `"Get in touch"`
- Subtext: `"We're a real team of real people. We read every message."`
- Fields:
  - First Name + Last Name (side by side)
  - Email Address
  - Business Name
  - Business Type (select dropdown: HVAC, Plumbing, Electrical, Cleaning, Handyman, Landscaping, Pest Control, Other)
  - Subject (select: General Enquiry, Sales, Support, Billing, Partnership, Press, Career)
  - Message (textarea, 5 rows)
  - `"I agree to ServicePro's Privacy Policy"` checkbox (required)
- Submit button: `"Send Message"` — primary style, full width
- Response time note: `"We aim to respond within 1 business day (Monday–Friday, 9am–5pm MT)."`

**Contact Information (right):**
```
ServicePro LLC
1309 Coffeen Avenue STE 1200
Sheridan, Wyoming 82801
United States

Phone: +1 (855) 737-2876
Email: hello@getservicepro.com
Support: support@getservicepro.com
Press: press@getservicepro.com
```

Business hours: `"Monday – Friday, 9:00am – 6:00pm Mountain Time"`

Social media row (all icons, linking to profiles — see Section 10).

Map embed placeholder (use a styled `div` that looks like a map with the correct city — no actual Google Maps API needed during development, just a styled placeholder).

**Below the form:** An FAQ-style section titled `"Support options"`:
- For account issues: `support@getservicepro.com`
- For billing: `billing@getservicepro.com`
- For partnerships: `partners@getservicepro.com`

---

### 6.6 Blog Page (`/blog`) — Placeholder

**Hero:** Standard small hero. H1: `"The ServicePro Blog"`. Subtext: `"Tips, guides, and insights for home service business owners."`

**Content area:** A 3-column grid of placeholder blog post cards. Create 6 sample post cards with:
- A coloured placeholder image (CSS gradient block — no real image needed yet)
- Category badge (e.g., `"Business Tips"`, `"How-To"`, `"Industry"`)
- Post title
- Excerpt (2–3 lines)
- Author + read time + date
- `"Read more →"` link (href `#` for now)

**Sidebar:** Right sidebar with:
- Newsletter signup (embed `WaitlistForm.vue` in a compact version)
- Category list
- `"Coming soon"` banner: `"Full blog launching with ServicePro in May 2026"`

---

### 6.7 Legal Pages — Placeholders

All three legal pages (`/privacy`, `/terms`, `/security`) follow the same template:

- Same minimal header with logo
- Clean `max-w-3xl mx-auto` content area
- H1 with page title
- `"Last updated: [date]"` in small text
- `"This page is currently being finalised by our legal team and will be published before our public launch on 1 May 2026."` — in a styled info box
- Section headings (H2s) for the structure but minimal placeholder content under each
- A `"Questions? Contact us"` block at the bottom

**Privacy Policy sections (headings only):**
1. Information We Collect
2. How We Use Your Information
3. Information Sharing
4. Data Retention
5. Your Rights (CCPA)
6. Cookies
7. Security
8. Changes to This Policy
9. Contact Us

**Terms of Service sections (headings only):**
1. Acceptance of Terms
2. Service Description
3. Account Registration
4. Payment Terms
5. Acceptable Use
6. Intellectual Property
7. Limitation of Liability
8. Indemnification
9. Termination
10. Governing Law (Delaware, USA)
11. Dispute Resolution
12. Contact Information

---

## 7. Shared Components Library

### 7.1 `SectionHeader.vue`

Props:
- `eyebrow` (string) — small uppercase label above the heading
- `heading` (string) — the H2
- `subtext` (string, optional) — paragraph below heading
- `align` (enum: `left` | `center` | `right`, default: `center`)
- `theme` (enum: `light` | `dark`, default: `light`)

Renders:
- Eyebrow in `text-sm font-semibold uppercase tracking-widest text-brand-600` (or `text-brand-400` on dark theme)
- Heading in `text-3xl lg:text-4xl font-bold text-neutral-900` (or `text-white` on dark)
- Subtext in `text-lg text-neutral-500 max-w-2xl` (or `text-neutral-300`) — centred within its own `mx-auto` if align is center

### 7.2 `WaitlistForm.vue`

This is the most important interactive component on the site.

**Variants:**
- `inline` — full form displayed inline (used in hero, CTA sections)
- `compact` — email-only single-line version (used in blog sidebar, footer)
- `modal` — displayed inside `WaitlistModal.vue`

**Fields:**
- First Name (required)
- Last Name (required)
- Email Address (required, must be valid email)
- Business Type (select, optional): HVAC, Plumbing, Electrical, Cleaning, Handyman, Landscaping, Pest Control, Other
- `"Number of staff"` (select, optional): Solo, 2–3, 4–6, 7–10

**Validation:** Real-time validation using Vue's reactivity. Show inline errors beneath each field. Use green checkmark icon when a field is valid. All validation happens client-side before submit.

**On submit:**
- Show loading spinner inside the button
- POST to `/waitlist` via Inertia form helper
- On success: Replace the form with a success state:
  - Large checkmark animation (CSS keyframe)
  - `"You're on the list!"` heading
  - `"We'll email you at [email] when we launch. Expect something from hello@getservicepro.com on 1 May 2026."`
  - Optional: Share buttons (`"Tell a friend → Share on Facebook"`, `"Share on X"`)
- On error (duplicate email): Show `"This email is already on the waitlist. You're good!"`
- On server error: Show `"Something went wrong. Please try again or email hello@getservicepro.com"`

**UTM/Source tracking:** Capture the `utm_source`, `utm_medium`, `utm_campaign` query parameters from the URL and store them as hidden fields in the form. Pass to the backend and store in the `waitlist_entries` table.

### 7.3 `FaqAccordion.vue`

Props: `items` (array of `{ question: string, answer: string }`)

Each item renders as an accordion row. Click the question row to expand/collapse the answer. Use CSS `max-height` + `overflow-hidden` transition for smooth open/close animation. Only one item can be open at a time. Clicking an open item closes it. Use Lucide's `ChevronDown` icon, rotating 180° when expanded.

### 7.4 `ComparisonTable.vue`

Accepts `columns` (header labels) and `rows` (array of cells). Renders a responsive table. The highlighted column (ServicePro) has a blue ring around it using `outline outline-2 outline-brand-500`. On mobile, this table must scroll horizontally.

### 7.5 `TrustBadges.vue`

A row of small trust indicators. Renders from a static array of `{ icon, label }`. Used in the Hero, Pricing page, and Footer.

### 7.6 `CookieBanner.vue`

Fixed position, bottom of viewport. `bg-neutral-900 text-white`. Shows:
- Text: `"We use cookies to improve your experience. By continuing, you agree to our Cookie Policy."`
- `"Accept"` button (primary)
- `"Decline"` link
- `"Learn more"` link to `/privacy`

Persist acceptance in `localStorage`. Do not show if already accepted. Animate in from the bottom using `@vueuse/motion`.

---

## 8. Waitlist System

### 8.1 Database Migration — `waitlist_entries`

Create a migration with these columns:
- `id` — bigint, primary key
- `first_name` — string
- `last_name` — string
- `email` — string, unique
- `business_type` — string, nullable
- `staff_count` — string, nullable
- `utm_source` — string, nullable
- `utm_medium` — string, nullable
- `utm_campaign` — string, nullable
- `ip_address` — string, nullable
- `user_agent` — text, nullable
- `confirmed_at` — timestamp, nullable
- `created_at` / `updated_at` — timestamps

### 8.2 Database Migration — `contact_messages`

- `id` — bigint, primary key
- `first_name` — string
- `last_name` — string
- `email` — string
- `business_name` — string, nullable
- `business_type` — string, nullable
- `subject` — string
- `message` — text
- `ip_address` — string, nullable
- `created_at` / `updated_at` — timestamps

### 8.3 `WaitlistRequest.php`

Validation rules:
- `first_name`: required, string, max:100
- `last_name`: required, string, max:100
- `email`: required, email, max:255
- `business_type`: nullable, string, in:[list of valid options]
- `staff_count`: nullable, string
- Honeypot field validation (see below)
- Rate limiting: max 3 submissions per IP per hour

### 8.4 `WaitlistController.php`

The `store` method should:
1. Run `WaitlistRequest` validation
2. Check for honeypot spam field (add a hidden `website` field in the form — if it has a value, the submission is a bot; return success silently without saving)
3. Use `updateOrCreate` on email — if already exists, return the "already on list" success response
4. Save the entry
5. Capture IP from `$request->ip()` and User Agent from `$request->userAgent()`
6. Fire a `WaitlistEntryCreated` event (create this event class)
7. Queue a welcome email to the submitter using Laravel's mail system (create a `WaitlistWelcomeMail` Mailable — see design below)
8. Return an Inertia response or JSON success — handle both Inertia and XHR requests

### 8.5 Welcome Email Template

When someone joins the waitlist, send them a welcome email using Laravel Mailables + Blade/Markdown.

**Subject:** `"You're on the ServicePro waitlist 🎉"`
**From:** `hello@getservicepro.com` — `"ServicePro"`

Email content structure:
- Header: ServicePro logo on `bg-brand-600` background
- Greeting: `"Hi [First Name],"`
- Opening: `"You're on the list. Here's what happens next."`
- Numbered steps: (1) We're putting the finishing touches on ServicePro. (2) Beta starts 1 April. You'll be invited first. (3) We launch publicly on 1 May. You get 30 days free.
- Benefit highlight box: `"Your waitlist perks"` — 30 days free, founding member pricing, priority access
- CTA button: `"Visit getservicepro.com"` — branded button linking to the landing page
- Closing: Personal sign-off from the founder
- Footer: unsubscribe link, address, legal boilerplate

Style the email to match ServicePro's brand colours. Use Laravel Markdown Mailing with a custom `servicepro` theme.

### 8.6 Rate Limiting & Spam Prevention

- Add a honeypot hidden field (`<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">`)
- Apply Laravel's `throttle:3,60` middleware to the waitlist POST route (3 requests per 60 minutes per IP)
- Validate that the email domain is not in a disposable email blocklist (use a simple array of known disposable domains: `mailinator.com`, `guerrillamail.com`, `tempmail.com`, etc.)

---

## 9. Routes & Controllers

### 9.1 Route Definitions (`routes/web.php`)

Define all routes in a `Route::prefix('')->name('marketing.')` group:

```
GET  /                  → Marketing\HomeController@index      (name: home)
GET  /features          → Marketing\FeaturesController@index  (name: features)
GET  /pricing           → Marketing\PricingController@index   (name: pricing)
GET  /about             → Marketing\AboutController@index     (name: about)
GET  /contact           → Marketing\ContactController@index   (name: contact)
POST /contact           → Marketing\ContactController@store   (name: contact.store)
GET  /blog              → Marketing\BlogController@index      (name: blog)
GET  /privacy           → Marketing\LegalController@privacy   (name: privacy)
GET  /terms             → Marketing\LegalController@terms     (name: terms)
GET  /security          → Marketing\LegalController@security  (name: security)
POST /waitlist          → Marketing\WaitlistController@store  (name: waitlist.store)
GET  /sitemap.xml       → Marketing\SitemapController@index   (name: sitemap)
GET  /robots.txt        → Marketing\SitemapController@robots  (name: robots)
```

### 9.2 Controller Responsibilities

Each controller's `index` method should return `Inertia::render('PageName', [...])` with any necessary data. Keep controllers lean. Data that is static (testimonials, features, FAQs) should live in the `resources/js/data/` TypeScript files and be imported directly in Vue — no need to pass them from PHP unless the data comes from the database.

Data that comes from the database (e.g., waitlist count for the "X people on the waitlist" counter) should be passed as a prop from the controller.

### 9.3 `HandleInertiaRequests` Middleware

In the `share()` method of `HandleInertiaRequests`, share these values globally to all Inertia pages:
- `appName`: `"ServicePro"`
- `appUrl`: `config('app.url')`
- `launchDate`: `"May 1, 2026"`
- `waitlistCount`: `WaitlistEntry::count()` — cached with a 60-second TTL using Laravel's cache

---

## 10. Static Business Information

Use these exact details everywhere they appear on the site. Create a TypeScript constants file at `resources/js/data/business.ts` with all of this:

### Company Information

```
Company Name:     ServicePro LLC
Legal Name:       ServicePro LLC
Registration:     Delaware, United States
Address Line 1:   1309 Coffeen Avenue STE 1200
City, State, ZIP: Sheridan, WY 82801
Country:          United States of America
Founded:          2025
Website:          https://www.getservicepro.com
```

### Contact Details

```
Main email:       hello@getservicepro.com
Support email:    support@getservicepro.com
Billing email:    billing@getservicepro.com
Press email:      press@getservicepro.com
Partners email:   partners@getservicepro.com
Investors email:  investors@getservicepro.com
Careers email:    careers@getservicepro.com

Phone (toll-free): +1 (855) 737-2876
Phone (display):   1-855-SERVICEPRO (vanity, displayed for branding only)

Support hours:    Monday – Friday, 9:00 AM – 6:00 PM MT
Response time:    Within 1 business day
```

### Social Media Links

Create `resources/js/data/social.ts` with this exact data structure. Every social icon in the footer and contact page reads from this file:

```typescript
export const socialLinks = [
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/getservicepro',
    handle: '@getservicepro',
    icon: 'facebook',  // Lucide icon name
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
    platform: 'X (Twitter)',
    url: 'https://www.x.com/getservicepro',
    handle: '@getservicepro',
    icon: 'twitter',
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
    icon: 'music-2',  // best available approximation in Lucide
    color: '#000000',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/company/getservicepro',
    handle: 'ServicePro',
    icon: 'linkedin',
    color: '#0A66C2',
  },
]
```

Note: Lucide Vue Next does not have exact social icons for all platforms. For Facebook, Instagram, LinkedIn, Twitter/X, YouTube: use `lucide-vue-next` if icons exist, otherwise use inline SVG paths for those specific social brand icons. Never use placeholder or wrong icons.

### Launch Timeline

```
Beta launch date:  April 1, 2026
Public launch date: May 1, 2026
Waitlist perk:     30 days free (vs standard 14-day trial)
Founding pricing:  Locked-in for first year for early signups
```

---

## 11. SEO & Meta Tags

### 11.1 Per-Page Meta Tags

Every page must use Inertia's `<Head>` component to set:
- `<title>` — unique per page
- `meta description` — unique per page, 150–160 characters
- `canonical` URL
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

### 11.2 Page Titles & Descriptions

| Page | Title | Meta Description |
|---|---|---|
| Home | `ServicePro — Field Service Management Software for Small Businesses` | `"Run your home service business like a pro. Scheduling, invoicing, and smart SMS for HVAC, plumbing, electrical & cleaning crews. From $79/month."` |
| Features | `Features — ServicePro` | `"Every tool you need to manage jobs, invoices, and customers. See all ServicePro features for home service businesses."` |
| Pricing | `Pricing — ServicePro` | `"Simple, transparent pricing from $79/month. No contracts. Try free for 14 days."` |
| About | `About ServicePro` | `"Built for home service business owners who are tired of overpriced, overcomplicated software."` |
| Contact | `Contact ServicePro` | `"Talk to our team. We're a real company with real people who respond within 1 business day."` |
| Blog | `Blog — ServicePro` | `"Tips, guides, and insights for HVAC, plumbing, electrical, and cleaning business owners."` |

### 11.3 Structured Data (JSON-LD)

Add JSON-LD `Organization` schema to the home page root template:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ServicePro",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "79",
    "priceCurrency": "USD"
  },
  "description": "Field service management software for home service businesses",
  "url": "https://www.getservicepro.com"
}
```

### 11.4 `robots.txt`

Serve from a controller. Content:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://www.getservicepro.com/sitemap.xml
```

### 11.5 `sitemap.xml`

Generate dynamically from the `SitemapController`. Include all static public pages with `<priority>` and `<changefreq>`. Home page priority `1.0`, others `0.8`.

---

## 12. Performance Requirements

- **Core Web Vitals:** Largest Contentful Paint (LCP) under 2.5 seconds. Cumulative Layout Shift (CLS) under 0.1.
- **Images:** No large image files in this build. All visuals are CSS/SVG/Vue-component-based app mockups. If any actual images are used, they must use the `<img loading="lazy">` attribute.
- **Fonts:** Inter is loaded with `display=swap`. Only weights 400, 500, 600, 700, 800 are loaded. Use `preconnect` link hints for the Google Fonts domain.
- **JavaScript:** Inertia lazy-loads pages. Each page component is code-split automatically by Vite.
- **Animations:** All animations use CSS transforms and opacity only — never `width`, `height`, `top`, `left` — to avoid layout recalculation.
- **CSS:** Tailwind v4 purges all unused styles. Do not use inline styles except for dynamic CSS custom properties.

---

## 13. Quality Checklist

Before declaring the landing page complete, verify every item in this list:

### Functionality
- [ ] Waitlist form submits successfully and shows success state
- [ ] Duplicate email returns "already on list" message gracefully
- [ ] Contact form submits and stores to database
- [ ] All navigation links work (including "coming soon" links that use `#`)
- [ ] Mobile hamburger menu opens and closes
- [ ] Pricing toggle between monthly and annual animates correctly
- [ ] FAQ accordion opens and closes correctly
- [ ] Announcement bar dismisses and does not reappear after dismissal
- [ ] Cookie banner accepts and does not reappear
- [ ] `CookieBanner` does not flash on initial load if already accepted
- [ ] Scroll-to-waitlist from hero CTA button works
- [ ] All external links (app.getservicepro.com) open correctly
- [ ] sitemap.xml and robots.txt are accessible and valid
- [ ] Form rate limiting works (blocks after 3 submissions)
- [ ] Honeypot spam prevention works

### Responsive Design
- [ ] Home page looks correct at 375px, 768px, 1024px, 1280px, 1440px widths
- [ ] All other pages tested at same breakpoints
- [ ] No horizontal scroll on any page at mobile widths
- [ ] Navbar hamburger menu works correctly at mobile widths
- [ ] Comparison table scrolls horizontally on mobile
- [ ] Pricing cards stack correctly on mobile
- [ ] Footer columns stack correctly on mobile

### Design Quality
- [ ] All pages use the defined colour palette — no off-brand colours
- [ ] Typography scale is consistent across all pages
- [ ] Spacing is consistent — no random padding or margin values
- [ ] All buttons use the `Button.vue` component — no ad-hoc button styling
- [ ] All scroll animations are smooth and not jarring
- [ ] Dark sections have correct inverted colour usage
- [ ] The hero app mockup looks convincingly like a real product

### SEO & Accessibility
- [ ] Every page has a unique `<title>` and `<meta description>`
- [ ] All images have `alt` attributes
- [ ] All interactive elements are keyboard-navigable
- [ ] Focus rings are visible on all interactive elements
- [ ] Colour contrast meets WCAG AA standards (4.5:1 for body text)
- [ ] Heading hierarchy is correct (one H1 per page, logical H2/H3 order)
- [ ] JSON-LD structured data is valid (validate with Google's Rich Results Test)

### Technical
- [ ] No console errors in browser developer tools
- [ ] No TypeScript errors (`npx tsc --noEmit` passes cleanly)
- [ ] All Vue components have typed props
- [ ] `php artisan route:list` shows all routes correctly
- [ ] `php artisan migrate:fresh` runs without errors
- [ ] `.env.example` documents all required environment variables
- [ ] Waitlist welcome email sends correctly (test with Mailpit or Mailtrap)

---

## Environment Variables Required

Add these to `.env` and document in `.env.example`:

```
APP_NAME="ServicePro"
APP_URL=http://getservicepro.test
APP_LOCALE=en

# App
VITE_APP_URL="${APP_URL}"
VITE_APP_ENV="${APP_ENV}"

# Waitlist
WAITLIST_COUNT_CACHE_TTL=60
WAITLIST_HONEYPOT_FIELD=website

# Launch dates (used in components and emails)
LAUNCH_BETA_DATE="April 1, 2026"
LAUNCH_PUBLIC_DATE="May 1, 2026"

# Mail (use Mailpit for local dev)
MAIL_MAILER=smtp
MAIL_FROM_ADDRESS="hello@getservicepro.com"
MAIL_FROM_NAME="ServicePro"

# App subdomain (links to main app — no auth here)
VITE_APP_SUBDOMAIN=https://app.getservicepro.com
```

---

*End of instructions. Build every section described. Do not skip sections or create stub placeholders unless explicitly marked as "placeholder" above. Every component should be production-ready in appearance.*
