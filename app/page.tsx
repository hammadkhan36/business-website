// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert h-5 w-[100px]"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the{" "}
//             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
//               page.tsx
//             </code>{" "}
//             file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert h-[14px] w-4"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }











import { getWebsiteBusiness } from "@/lib/website/business";
import { getWebsiteBusinessHours } from "@/lib/website/hours";
import { getWebsiteFaqs } from "@/lib/website/faqs";
import { getWebsiteOffers } from "@/lib/website/offers";
import { getWebsiteServices } from "@/lib/website/services";
import { ContactActions } from "@/components/contact-actions";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function HomePage() {
  const [business, services, faqs, offers, hours] = await Promise.all([
    getWebsiteBusiness(),
    getWebsiteServices(),
    getWebsiteFaqs(),
    getWebsiteOffers(),
    getWebsiteBusinessHours(),
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader business={business} />
      <ContactActions
        phone={business?.contact_phone}
        email={business?.contact_email}
      />

      <section className="mx-auto max-w-6xl px-4 py-16">

        <p className="text-sm font-medium text-blue-600">Business Website Starter</p>

        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {business?.business_name || "Your Business Name"}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Professional local business website connected with your admin dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {business?.contact_phone && (
            <a href={`tel:${business.contact_phone}`} className="rounded-md bg-blue-600 px-5 py-3 text-white">
              Call Now
            </a>
          )}

          {business?.contact_email && (
            <a href={`mailto:${business.contact_email}`} className="rounded-md border px-5 py-3">
              Email Us
            </a>
          )}
        </div>
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold">Services</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-lg border bg-white p-5">
                <h3 className="font-semibold">{service.name}</h3>
                {service.description && (
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                )}
                {service.price !== null && (
                  <p className="mt-4 text-sm font-medium">From Rs. {service.price}</p>
                )}
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">No services added yet.</p>
          )}
        </div>
      </section>

      {offers.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-bold">Current Offers</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {offers.map((offer) => (
                <div key={offer.id} className="rounded-lg border border-blue-100 bg-blue-50 p-5">
                  <h3 className="font-semibold">{offer.title}</h3>
                  {offer.description && (
                    <p className="mt-2 text-sm text-slate-600">{offer.description}</p>
                  )}
                  {/* {offer.code && (
                    <p className="mt-4 text-sm font-bold text-blue-700">Code: {offer.code}</p>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold">Business Hours</h2>

          <div className="mt-6 grid gap-2 md:grid-cols-2">
            {hours.map((hour) => (
              <div key={hour.id} className="flex justify-between rounded-md border bg-white p-3 text-sm">
                <span>{dayNames[hour.day_of_week] || `Day ${hour.day_of_week}`}</span>
                <span className="font-medium">
                  {hour.is_closed
                    ? "Closed"
                    : hour.is_24h
                      ? "Open 24 hours"
                      : `${hour.opens_at || "-"} - ${hour.closes_at || "-"}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold">FAQs</h2>

          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="rounded-lg border p-5">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          {faqs.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">No FAQs added yet.</p>
          )}
        </div>
      </section>
      <SiteFooter business={business} />
    </main>
  );
}