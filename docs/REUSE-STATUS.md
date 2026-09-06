# Reusable business starter: verified status

Reviewed 2026-09-06 against hammadkhan36/my-admin and the connected Supabase project.

## Deployment model

Use a separate database, admin deployment and website deployment per business.
This is a reusable single-business template, not a shared-database tenant system.
Do not add business_id columns without a deliberate tenancy migration.

## Implemented in this branch

- Homepage and metadata use the existing admin business-config endpoint.
- The API secret stays server-side. Response fields are validated with Zod.
- Reads do not depend on a visitor having an admin login cookie.
- Request-scoped deduplication, a ten-second timeout and explicit upstream errors.
- Admin title, description, Open Graph image and Search Console verification are wired.
- Indexing is opt-in. Sitemap contains only the implemented homepage; fake modification dates removed.
- Existing direct Supabase loaders are retained for compatibility but require appropriate RLS policies; they are not the recommended integration path.

## Local verification

1. Run admin on port 3000 with WEBSITE_CONFIG_API_KEY set.
2. Copy .env.example to .env.local in this website and use the same API key.
3. Start website with npm run dev -- --port 3001.
4. Visit in a signed-out/private browser. Business data should load without login.
5. Change the business name in admin, reload website and inspect page title.
6. Check /robots.txt and /sitemap.xml. Indexing remains disabled by default.
7. Run npm run lint and npm run build with admin reachable.

## Pending work (not verified complete)

- Server adapters for existing lead, appointment, form, review and coupon endpoints.
- Submission validation, abuse protection, friendly errors and duplicate/retry handling.
- Appointment duration overlaps, timezone rules and concurrent booking tests.
- Feature/subscription enforcement on website APIs.
- Published pages/content blocks adapters and business-specific UI later.
- Resend delivery, per-event email preferences and durable retry tracking.
- Schema migrations, seed/bootstrap tooling and fresh-project installation test.
- Permission matrix, disabled-user tests, admin lint/typecheck/build and smoke tests.
- Supabase function privilege review: advisor warnings need inspection, not blanket revocation.

No live database changes or production deployment were made in this branch.
