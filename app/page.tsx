// import { getAdminWebsiteConfig } from "@/lib/website/admin-config";
// import { trackWebsiteEvent } from "@/lib/website/analytics-client";

// import ClientButtons from "@/components/ClientButtons"; // test ka lia 

// export default async function HomePage() {
//   const { business, service_areas: areas, faqs, offers, business_hours: hours } =
//     await getAdminWebsiteConfig();

//   return (
//     <main className="p-6">
//       <h1>{business?.business_name || "Business Website Starter"}</h1>

//       <pre className="mt-6 whitespace-pre-wrap text-xs">
//         {JSON.stringify(
//           {
//             business,
//             areas: areas.length,
//             faqs: faqs.length,
//             offers: offers.length,
//             hours: hours.length,
//           },
//           null,
//           2
//         )}
//       </pre>

//       {/* Purani wali saari <a> aur <button> wali div hata di. Ab yeh naya component laga diya: */}
//       <ClientButtons
//         phone={ "923001234567"}
//         whatsapp={ "923001234567"}
//         mapUrl="https://maps.google.com/?q=business"
//       />


//     </main>
//   );
// }











import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { getDentistConfig } from "@/lib/website/dentist-config";

export default function HomePage() {
  const config = getDentistConfig();

  return (
    <main>
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              {config.hero.eyebrow}
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              {config.hero.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              {config.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={config.hero.primaryCta.href}
                data-track-event="booking_click"
                data-track-label={config.hero.primaryCta.eventLabel}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                {config.hero.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <a
                href={config.hero.secondaryCta.href}
                data-track-event="call_click"
                data-track-label={config.hero.secondaryCta.eventLabel}
                className="inline-flex items-center justify-center rounded-full border bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                <Phone className="mr-2 h-4 w-4" />
                {config.hero.secondaryCta.label}
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {config.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border bg-white/80 p-4 shadow-sm"
                >
                  <div className="text-2xl font-bold text-slate-950">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border bg-white p-4 shadow-xl">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-100">Today’s focus</p>
                    <h2 className="text-2xl font-bold">Smile care made easy</h2>
                  </div>
                  <div className="rounded-full bg-white/20 p-3">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <CalendarCheck className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Appointment requests</p>
                        <p className="text-sm text-blue-100">
                          Send booking requests to admin panel.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Call tracking</p>
                        <p className="text-sm text-blue-100">
                          Track how many visitors call the clinic.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Service interest</p>
                        <p className="text-sm text-blue-100">
                          See which dental services get more clicks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {config.trustPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border p-6">
                <BadgeCheck className="mb-4 h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Dental Services
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Popular treatments patients look for
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Ye section baad mein admin panel ke services table se connect hoga.
                Abhi default dentist starter data se show ho raha hai.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all services
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {config.services.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-track-event="service_click"
                data-track-label={service.title}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Sparkles className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {service.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.startingPrice && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {service.startingPrice}
                    </span>
                  )}

                  {service.duration && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      <Clock className="mr-1 h-3 w-3" />
                      {service.duration}
                    </span>
                  )}
                </div>

                <div className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600">
                  {service.ctaLabel}
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
            <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  Emergency Dental Care
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {config.emergency.title}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-300">
                  {config.emergency.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href={`tel:${config.emergency.phoneFallback}`}
                  data-track-event="call_click"
                  data-track-label="Emergency CTA Call"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {config.emergency.ctaLabel}
                </a>

                <Link
                  href="/contact"
                  data-track-event="contact_click"
                  data-track-label="Emergency CTA Contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Clinic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              FAQs
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Common questions before booking
            </h2>
            <p className="mt-3 text-muted-foreground">
              Ye bhi baad mein admin panel ke FAQs table se connect hoga.
            </p>
          </div>

          <div className="space-y-3">
            {config.faqs.slice(0, 4).map((faq) => (
              <div key={faq.question} className="rounded-2xl border bg-white p-5">
                <h3 className="font-semibold text-slate-950">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 rounded-[2rem] border bg-gradient-to-br from-blue-50 to-white p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                {config.conversionSections.bookingTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {config.conversionSections.bookingDescription}
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Serving {config.defaultCity}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-blue-600" />
                  Appointment request ready
                </span>
              </div>
            </div>

            <Link
              href="/book-appointment"
              data-track-event="booking_click"
              data-track-label="Final CTA Book Appointment"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Book Appointment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}