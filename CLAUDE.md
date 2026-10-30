# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev -- --port 3001` — dev server (the docs and `websiteConfig.siteUrl` default assume port 3001)
- `npm run build` — production build; `npx tsc --noEmit` — type check
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npm run check:setup` — validates env var shape (Node 22+, loads `.env.local`, no network calls, never prints values)

There is no test suite. Verification is manual: `/dev-tools/*` pages (404 in production via `app/dev-tools/layout.tsx`) exercise lead, appointment, form, coupon and review submissions.

## Architecture

Public marketing website for **one** local business (currently a dental clinic), Next.js 16 App Router + React 19 + Tailwind v4. It is a template reused per business: each business gets its own copy of this repo, its own deployment of a separate **admin** repo, its own Supabase project and its own API keys. Never mix data or keys across businesses.

### Content vs. data
- Static public content lives in `content/*.ts` (`business.ts`, `services.ts`, `pages.ts`, `contact.ts`, `inquiry.ts`, `booking.ts`). Pages in `app/` render from these via shared components in `components/website/` (`page-frame.tsx` header/footer, `content-sections.tsx`). Keep data fetching and submission logic out of visual components.
- Marketing services (`content/services.ts`, slugs drive `/services/[slug]`) are **separate** from bookable services, which come from the admin database by ID. Never hardcode service IDs.
- Don't invent reviews, ratings, prices, hours, qualifications, or patient counts in content.

### Website → admin API flow
The website has no database of its own at runtime. All writes go through Next route handlers in `app/api/website/*` and `app/api/analytics/events`, which proxy server-side to the admin app (`ADMIN_API_URL`) with per-purpose `x-api-key` headers (`WEBSITE_LEAD_API_KEY`, `WEBSITE_APPOINTMENT_API_KEY`, `WEBSITE_ANALYTICS_API_KEY`, `WEBSITE_CONFIG_API_KEY`). The shared helper is `lib/website/public-api.ts` (`server-only`, enforces HTTPS except localhost, 10s timeout).

Key per route: leads → `WEBSITE_LEAD_API_KEY`, appointments → `WEBSITE_APPOINTMENT_API_KEY`, analytics → `WEBSITE_ANALYTICS_API_KEY`; contact-config, forms (`/api/website/forms/submit`), coupons (`validate`/`redeem`) and reviews all use `WEBSITE_CONFIG_API_KEY`. Server actions in `app/actions/*` call the same admin endpoints directly through `lib/website/{leads,forms,coupons,reviews}.ts`. Admin-side endpoint list: `../CLAUDE.md`. `lib/website/admin-config.ts` (`/api/public/business-config`) is currently not imported anywhere.

Route handlers follow a common pattern: feature flag check (`LEAD_FORM_ENABLED` / `APPOINTMENT_FORM_ENABLED` must be `"true"`, else 503), JSON content-type required, `Origin` header must exactly equal the origin of `NEXT_PUBLIC_SITE_URL` (403 otherwise), then validate and forward.

`lib/website/contact-config.ts` fetches `/api/public/contact-config` from admin at request time: it returns `contact_mode` (`phone` | `email` — decides which contact field is required on forms) and the bookable service list. `app/contact` and `app/book-appointment` use it together with the env flags to decide whether forms render. Returns `null` on any failure, so forms degrade to unavailable.

### Analytics
`lib/website/analytics-client.ts` (client) is the single entry point for events; it is consent-gated via `localStorage` key `website_analytics_consent` and sends nothing when consent is declined (declining also clears the visitor ID). Layout mounts `PageViewTracker`, `ClickTracker` and `AnalyticsConsentBanner`. Click events must not record phone/email values or destination URL query strings. Events post to `/api/analytics/events` (zod-validated) which forwards via `lib/website/analytics.ts`. Events are tagged with optional `NEXT_PUBLIC_BUSINESS_ID`.

### Legacy code
`lib/supabase/*`, `config/dentist.ts`, `lib/website/dentist-config.ts` and the direct-Supabase loaders in `lib/website/` (`areas`, `faqs`, `hours`, `offers`, `services`, `business`) predate the admin-API design. Nothing in the current pages or dev tools imports them. They are reachable only through unused old components (`site-header.tsx`, `site-footer.tsx`, `forms/appointment-request-form.tsx`), so `NEXT_PUBLIC_SUPABASE_*` are optional. The live pages use `components/website/*`. Full list: `../ARCHIVE-CANDIDATES.md`.

### Other
- SEO: `app/sitemap.ts`, `app/robots.ts`; indexing stays off unless `NEXT_PUBLIC_ALLOW_INDEXING=true` (enable only on the final domain).
- Path alias `@/*` maps to the repo root.
- Further docs (some in Roman Urdu): `docs/REUSE-FOR-NEW-BUSINESS.md`, `docs/LAUNCH-SETUP.md`, `docs/WEBSITE-GUIDE.md`, `docs/INQUIRY-FORM.md`, `app/Guide/*.md` (tracking).
