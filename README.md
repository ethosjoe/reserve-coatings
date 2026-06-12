# Reserve Coatings — Marketing Website

Metro Detroit premium epoxy floor coatings. Next.js 14, TypeScript, Tailwind, Instant Quote tool, Resend + CRM webhooks.

## Setup

```bash
cd ~/Projects/reserve-coatings
npm install
cp .env.example .env.local
# Fill in env vars (see table below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required (v1) | Purpose |
|----------|---------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL, sitemap, OG |
| `RESEND_API_KEY` | For email | Lead + quote confirmations |
| `RESEND_FROM_EMAIL` | With Resend | Sender address |
| `RESEND_TO_EMAIL` | With Resend | Internal notifications |
| `CRM_WEBHOOK_URL` | Recommended | GoHighLevel-compatible lead payload |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Recommended | Apps Script URL — logs all form submissions to Google Sheets |
| `UPLOADTHING_TOKEN` | **Required for quote photos** | UploadThing API token from [uploadthing.com](https://uploadthing.com) dashboard |
| `NEXT_PUBLIC_HEARTH_APPLY_URL` | Optional | Financing apply link |
| `STRIPE_*` / `DOCUSEAL_*` | Post-launch | Stubs in `lib/integrations/` |

## Deploy (Vercel)

1. Import repo, set env vars from `.env.example`
2. Add `images.remotePatterns` domains: `images.unsplash.com`, `utfs.io` (already in `next.config.mjs`)
3. `npm run build` must pass before promote

## Logo usage

| File | Use |
|------|-----|
| `public/images/brand/logo-primary.png` | Horizontal wordmark — header on bone, light pages, quote flow |
| `public/images/brand/logo-knockout.png` | Same horizontal mark (transparent) — header over dark heroes, footer, CTAs |
| `public/images/brand/logo-dark-lockup.png` | Full vertical lockup — loader and centered graphics on obsidian (not sticky nav) |
| `public/images/brand/logo-mark.png` | Roller icon — favicon / app icon |

## Content-replacement checklist

- [x] Real phone number in `lib/brand.ts` and `data/locations.ts`
- [x] High-res logos: primary, knock-out, dark lockup, mark
- [ ] Hero photography (home, garages, basements, outdoor, commercial)
- [ ] 42 color swatch images in `public/images/swatches/`
- [ ] Gallery before/after pairs per project in `data/projects.ts`
- [ ] Google Sheets webhook URL (`scripts/google-sheets-appointments.gs`)
- [ ] Hearth financing URL
- [ ] CRM webhook URL
- [ ] Google Maps embed API key (optional)
- [ ] Social profile URLs in `Header.tsx`
- [ ] UploadThing production keys

## Copy review checklist

Search `OWNER REVIEW` in `data/` and `content/` — all marketing copy is seeded for owner pass before launch.

## Component inventory

- `components/layout/` — Header, Footer, Logo, PageTitleBar, ContactForm, QuoteFormCard, CtaBand, HeroLeftAligned
- `components/sections/home/` — Homepage sections 4.1–4.9
- `components/sections/quote/` — 6-step Instant Quote flow
- `components/sections/shared/` — ReserveSystemDiagram, BeforeAfterSlider, ColorSwatchGrid, ServicePageTemplate
- `data/` — colors, cities, reviews, projects, promotions, services, finishTiers
- `content/` — `process.mdx`, `blog/*.mdx`

## Routes

| Path | Page |
|------|------|
| `/` | Homepage |
| `/quote` | Instant Quote tool |
| `/garages`, `/basements`, `/outdoor`, `/commercial` | Service pages |
| `/colors`, `/gallery`, `/gallery/[slug]` | Catalog + case studies |
| `/process`, `/blog`, `/blog/[slug]` | MDX content |
| `/contact`, `/promotions`, `/financing`, `/reviews` | Utility |

## Google Sheets appointments

1. Create a Google Sheet tab named `Appointments`
2. Paste `scripts/google-sheets-appointments.gs` into Apps Script
3. Run `setupSheet()` then `installOnEditTrigger()` once
4. Deploy as Web App → set `GOOGLE_SHEETS_WEBHOOK_URL`
5. Approve rows by changing `status` to `Approved` — Apps Script creates a Google Calendar event

## Post-launch integrations

- **Stripe:** `lib/integrations/stripe.ts` — deposit on contract signature
- **E-sign:** `lib/integrations/esign.ts` — DocuSeal or HelloSign

## Scripts

```bash
npm run dev    # Development
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint
```
