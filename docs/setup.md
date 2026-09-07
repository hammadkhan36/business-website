# Business Website Starter Setup

This website starter connects to the reusable `my-admin` dashboard through secure server-side APIs.

## Required Apps

- Admin panel: `my-admin`
- Website: `business-website`
- Database: Supabase
- Optional email provider: Resend

## Local Ports

Use this setup in local development:

```txt
my-admin: http://localhost:3000
business-website: http://localhost:3001



Website Environment Variables

Add these to business-website/.env.local:

ADMIN_API_URL=http://localhost:3000

WEBSITE_CONFIG_API_KEY=
WEBSITE_LEAD_API_KEY=
WEBSITE_APPOINTMENT_API_KEY=
WEBSITE_ANALYTICS_API_KEY=

NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_ALLOW_INDEXING=false
Admin Environment Variables

Add these to my-admin/.env.local:

WEBSITE_CONFIG_API_KEY=
WEBSITE_LEAD_API_KEY=
WEBSITE_APPOINTMENT_API_KEY=
WEBSITE_ANALYTICS_API_KEY=

The same key value must match between admin and website.

Example:

# my-admin
WEBSITE_LEAD_API_KEY=abc123

# business-website
WEBSITE_LEAD_API_KEY=abc123



Public Admin APIs

The website calls these admin APIs through local website proxy routes:
| Feature          | Website Route                   | Admin Route                    |
| ---------------- | ------------------------------- | ------------------------------ |
| Business config  | Server helper                   | `/api/public/business-config`  |
| Analytics events | `/api/analytics/events`         | `/api/public/analytics/events` |
| Leads            | `/api/website/leads`            | `/api/public/leads`            |
| Appointments     | `/api/website/appointments`     | `/api/public/appointments`     |
| Reviews          | `/api/website/reviews`          | `/api/public/reviews`          |
| Custom forms     | `/api/website/forms/submit`     | `/api/public/forms/submit`     |
| Coupon validate  | `/api/website/coupons/validate` | `/api/public/coupons/validate` |
| Coupon redeem    | `/api/website/coupons/redeem`   | `/api/public/coupons/redeem`   |




Supabase Tables Used

Website starter expects these tables from the admin project:

business_settings
services
service_areas
faqs
offers
business_hours
leads
customers
appointments
notifications
audit_logs
website_events
custom_forms
form_submissions
coupons
reviews
Analytics Events

Tracked event types:

page_view
call_click
whatsapp_click
map_click
booking_click
lead_submit
appointment_submit
coupon_validate
coupon_redeem
review_submit
form_submit
Local Test Pages

These pages are only for local development:

/dev-tools/test-lead
/dev-tools/test-appointment
/dev-tools/test-coupon
/dev-tools/test-review
/dev-tools/test-form

Production hides /dev-tools using:

app/dev-tools/layout.tsx
New Business Launch Checklist
Create or select Supabase project.
Run admin database SQL/migrations.
Add first superadmin or owner manually in Supabase.
Add business settings in admin dashboard.
Add services, service areas, FAQs, offers and hours.
Add website/admin API keys to both apps.
Start admin on port 3000.
Start website on port 3001.
Test business config loading.
Test lead submit.
Test appointment submit.
Test coupon validate/redeem.
Test review and custom form submit.
Check analytics events in admin dashboard.
Add final UI/UX for the business.
Update NEXT_PUBLIC_SITE_URL.
Set NEXT_PUBLIC_ALLOW_INDEXING=true only when ready to index.
Deploy admin and website.

## Iska faida

Next business ke liye aapko yaad nahi rakhna padega:

```txt
kaunsi env key chahiye
kaunsi API route hai
kaunsa test page hai
kaunsi Supabase table chahiye
launch se pehle kya verify karna hai


