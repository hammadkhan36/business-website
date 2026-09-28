# Naye business ke liye website reuse karna

## 1. Separate setup

Dono repositories ki apni copy aur har business ke separate admin/website hosting projects banayein. Admin repository ke `database/README.md` ke mutabiq naya Supabase setup karein. Purane business ki keys, customer data aur environment files copy na karein.

## 2. Data aur design kahan change karna hai?

| File/folder | Kya change hoga |
|---|---|
| `content/business.ts` | Business name, phone, email, address, map link, navigation |
| `content/pages.ts` | Main page copy |
| `content/services.ts` | Public treatment/service descriptions aur slugs |
| `content/contact.ts` | Contact page wording |
| `content/inquiry.ts` | Enquiry form wording |
| `content/booking.ts` | Booking form wording |
| `components/website/` | Page sections, forms, header/footer ka appearance |
| `app/globals.css` | Shared styling |
| `app/*/page.tsx` | Page structure/layout |
| Admin services screen | Booking services, duration, active/visible settings |

Public marketing services aur bookable services alag sources hain: marketing copy content files mein hai; booking form admin database ke service IDs load karta hai. Launch se pehle dono lists ko business ke mutabiq align karein. Fake service IDs hardcode na karein.

## 3. Contact preference

Admin communication settings mein phone ya email primary choose karein. Website current mode server se load karti hai; primary input required aur secondary optional hota hai. Website form mein manually required flags change karne ki zaroorat nahi.

## 4. Environment

`.env.example` ko local development ke liye `.env.local` copy karein, ya hosting settings mein values add karein. `ADMIN_API_URL` admin ka origin hai; `NEXT_PUBLIC_SITE_URL` public website ka exact origin hai. Form requests ka origin match zaroori hai. Preview testing ke liye preview-specific URL/config use karein. Real secrets GitHub mein commit na karein.

`npm run check:setup` missing settings batata hai. Lead/booking flags false hon to forms intentionally unavailable rahengi. Keys/backend ready hone ke baad flags true karein aur redeploy karein. Search indexing sirf final domain aur real content ready hone par enable karein.

## 5. Trackers

Page/session events aur call/map/booking clicks existing analytics consent gate use karte hain. Booking start/success/error events bhi connected hain. Click events phone/email values ya destination URL query record nahi karte. Consent decline par client tracker send nahi karta. Provider/hosting access logs is consent system se separate hain.

## 6. Launch test

Mobile aur desktop navigation, all service pages, form required fields, saved admin records, duplicate retry, booking conflict, enabled email notifications aur consent behavior check karein. Current booking is one shared calendar, not separate calendars per staff/chair.

## Manual account work

Domain/DNS, hosting secret values, first Auth user, Resend account/sender verification aur scheduler credentials account owner configure karega. Reusable code/SQL is ka replacement nahi; instructions admin `database/README.md` aur dono repos ke `docs/LAUNCH-SETUP.md` mein hain.
