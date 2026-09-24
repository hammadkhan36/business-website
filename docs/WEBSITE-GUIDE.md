# Website Guide

## 1. What this project does

This project is the public website for one business.

Every business gets its own:
- Website deployment.
- Admin deployment.
- Supabase project.
- Private connection keys.

Two businesses must never share a database accidentally.

## 2. Where to change business information

Open content/business.ts.

Change:
- Business name.
- City and country.
- Phone number.
- Email.
- Address.
- Map URL.
- Timezone and currency.

This file contains public information only.
Never put passwords or private API keys here.

## 3. Where to change services

Open content/services.ts.

Each service has:
- slug: the final part of its website URL.
- title: the service name.
- summary: short card and page introduction.
- description: longer information.
- highlights: points displayed on the detail page.

Adding a service creates:
- A card on the Services page.
- An individual service detail page.

Example:
slug: "dental-implants"

URL:
/services/dental-implants

Changing a published slug requires a redirect from its old URL.

## 4. Where to change page text

Open content/pages.ts.

It contains:
- Homepage text.
- About page text.
- Frequently asked questions.

Change text here without changing the UI layout.

## 5. Where to change design

Shared header and footer:
components/website/page-frame.tsx

Shared service cards and page introductions:
components/website/content-sections.tsx

Individual page layouts:
app/page.tsx
app/about/page.tsx
app/services/page.tsx
app/services/[slug]/page.tsx
app/faq/page.tsx

Changing a shared component updates all pages that use it.

Do not put database queries or form submission code
inside visual card or layout components.

## 6. Current integration boundary

This batch renders informational pages from local content files.

It does not complete:
- Contact form integration.
- Appointment form integration.
- Consent-aware tracking corrections.
- Production SEO configuration.
- Deployment verification.

Existing integration code remains in lib/website and app/api.

A later integration batch will connect forms and trackers.
Do not mark those features verified merely because a button exists.

## 7. Running the website

Open a terminal in the business-website folder.

Install dependencies:

npm ci

Start the development server:

npm run dev -- --port 3001

Open:
http://localhost:3001

Stop the server:
Press Ctrl+C in the terminal.

## 8. Checking changes

Open:
- /
- /about
- /services
- /services/dental-implants
- /faq

Check:
- Navigation links work.
- Phone links use the correct number.
- Service cards open the correct pages.
- FAQ questions expand.
- Mobile navigation opens.
- No horizontal scrolling occurs on mobile.

Run:

npx tsc --noEmit
npm run build

Record any errors before proceeding to the next batch.

## 9. Setting up a new business

1. Create a separate client copy from the approved starter version.
2. Do not copy another client's .env.local file.
3. Create the new client's Supabase project.
4. Apply the documented database migrations.
5. Create that client's initial admin accounts.
6. Generate new private integration keys.
7. Configure the client's admin and website deployments.
8. Replace public business content.
9. Adjust the UI if needed.
10. Test submissions against the correct database.
11. Confirm production domains and indexing settings.

Do not copy customer, lead, appointment or analytics records
from another client's database.

## 10. Content rules

Use confirmed business information.

Do not invent:
- Reviews or ratings.
- Patient counts.
- Professional qualifications.
- Treatment prices.
- Opening hours.
- Guaranteed results.

Confirm business details before production launch.
