# Website Inquiry Form

## Connection

Visitor form submit karta hai.

Website ka /api/website/leads route input validate karta hai.
Website server secret key ke saath admin API call karta hai.
Admin API apne connected Supabase mein lead save karti hai.

Browser ko admin API key nahi milti.

## Files

- content/inquiry.ts: labels aur messages.
- components/website/inquiry-form.tsx: form UI aur submission.
- app/api/website/leads/route.ts: validation aur API forwarding.
- app/contact/page.tsx: Contact page aur form availability.
- lib/website/public-api.ts: existing server-side admin API helper.

## Environment variables

Website environment mein ye variables chahiye:

LEAD_FORM_ENABLED=false
ADMIN_API_URL=https://your-business-admin.example.com
WEBSITE_LEAD_API_KEY=your-unique-secret
NEXT_PUBLIC_SITE_URL=https://your-business-website.example.com

Values placeholders hain. Actual setup ke mutabik replace karo.

ADMIN_API_URL mein admin ka base URL do.
Us ke end par /api/public/leads mat lagao.

NEXT_PUBLIC_SITE_URL exact website origin hona chahiye.
Local development mein website jis port par chale, wahi URL do.
Example: http://localhost:3000

Admin environment mein WEBSITE_LEAD_API_KEY ki same value chahiye.

Existing variables ko delete mat karo.
Variable pehle se ho to uski value update karo.
Duplicate entries mat banao.

Local variables .env.local mein rakho.
Secret-containing env files GitHub par commit mat karo.
Hosting environment change ke baad redeploy karo.
Local change ke baad development server restart karo.

## Har business alag

Har business ka apna:

- Supabase account/project
- Admin deployment
- Website deployment
- Unique website API key

Sirf business content change karna database connection
change nahi karta. Environment variables bhi verify karo.

## Form enable karna

Initially LEAD_FORM_ENABLED=false rakho.

Correct admin aur database connection verify karne ke baad
test environment mein LEAD_FORM_ENABLED=true karo.

Production enable karne se pehle backend issues neeche
di hui checklist ke mutabik resolve karo.

## Testing

1. npm run build chalao.
2. Contact page kholo.
3. Empty required fields ke saath submit block hona chahiye.
4. Valid test enquiry sirf test database mein submit karo.
5. Success ke baad admin Leads mein entry verify karo.
6. Customers mein linked customer verify karo.
7. Incorrect API key par success message nahi aana chahiye.
8. Form disabled ho to phone/email fallback dikhna chahiye.

Test ke liye real patient information use mat karo.

## Current limitations

- Honeypot basic bot filtering hai; rate limiting nahi.
- Client double-click protection database idempotency nahi.
- Network timeout ka matlab zaroori nahi ke lead save nahi hui.
- Admin API existing customer ka name/email overwrite karti hai.
- Admin logging/notification failure lead save hone ke baad
  error return kar sakta hai.
- Contact permission checkbox database mein separately
  persist nahi hota.
- Inquiry submission appointment confirmation nahi hai.
- Form analytics integration abhi pending hai.

## Production se pehle

- Existing customer overwrite behavior fix karo.
- Retry/idempotency aur partial-success handling fix karo.
- Public endpoint par rate limiting/bot protection add karo.
- Correct business database mein end-to-end test karo.
