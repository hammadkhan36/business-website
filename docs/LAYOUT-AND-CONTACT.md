# Shared Layout aur Contact Page

## Website ka structure

Har page ko app/layout.tsx automatically wrap karta hai.

Layout ke andar SiteShell shared header, navigation aur footer
render karta hai.

PageFrame sirf page ka main content render karta hai.

Har page mein header/footer dobara add nahi karna.

## Kis change ke liye kaunsi file?

| Change | File |
| --- | --- |
| Business name, phone, email, address, map | content/business.ts |
| Navigation links | content/business.ts |
| Contact page ki wording | content/contact.ts |
| Shared header/footer ka design | components/website/site-shell.tsx |
| Contact page ka design | app/contact/page.tsx |
| Global fonts aur layout | app/layout.tsx |
| Page content wrapper | components/website/page-frame.tsx |

## Naya page banana

1. app ke andar page ka folder banao.
2. Us folder mein page.tsx banao.
3. PageFrame import karo.
4. Page content ko PageFrame ke andar rakho.
5. Zaroorat ho to content/business.ts ki navigation mein link add karo.

PageFrame use karte waqt andar doosra main element mat lagao.
Sections aur articles use kar sakte ho.

## Contact actions

- Call button configured phone number kholta hai.
- Email button visitor ka email app kholta hai.
- Directions button Google Maps kholta hai.

Email button website se automatically email send nahi karta.
Visitor apne email app se email send karta hai.

## Abhi pending

- Inquiry form aur admin Leads API integration.
- Appointment flow ki end-to-end verification.
- Analytics events aur consent handling ki verification.
- Production deployment aur mobile checks.

Contact page par abhi online inquiry submit nahi hoti.

## Har business ka separate setup

Har business ke liye:

1. Alag Supabase account/project.
2. Alag admin deployment.
3. Alag website deployment.
4. Usi business ke API keys aur environment variables.
5. Usi business ka content aur branding.

Existing business ke database credentials ya API keys
new business mein copy nahi karne.

Public content content/ files mein rakho.
Secret keys content/ files mein kabhi mat rakho.

## Check karne ka tareeqa

1. Home, About, Treatments, FAQs aur Contact kholo.
2. Har page par header/footer sirf ek baar hone chahiye.
3. Mobile width par navigation readable honi chahiye.
4. Phone, email aur Google Maps links check karo.
5. Keyboard se Tab press karke Skip to content check karo.
6. npm run build chalao.

Build error aaye to complete error text share karo.
