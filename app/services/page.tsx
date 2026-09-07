import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, Clock, Sparkles } from "lucide-react";
import { getDentistConfig } from "@/lib/website/dentist-config";

export const metadata: Metadata = {
  title: "Dental Services | Dental Care Clinic",
  description:
    "Explore dental checkups, teeth cleaning, whitening, implants, braces, aligners and emergency dental services.",
};

export default function ServicesPage() {
  const config = getDentistConfig();

  return (
    <main>
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Dental Services
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Treatments designed for healthy, confident smiles.
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
              Ye services abhi dentist starter config se aa rahi hain. Baad mein
              ye admin panel ke services table se connect hongi, jahan se business
              owner services update kar sakega.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {config.services.map((service) => (
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

                <h2 className="text-xl font-semibold text-slate-950">
                  {service.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
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

                <div className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="rounded-[2rem] border bg-gradient-to-br from-blue-50 to-white p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  Not sure which treatment you need?
                </h2>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Patient consultation CTA. Is button ka click analytics mein
                  track hoga aur appointment page par le jayega.
                </p>
              </div>

              <Link
                href="/book-appointment"
                data-track-event="booking_click"
                data-track-label="Services Page Book Appointment"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <CalendarCheck className="mr-2 h-4 w-4" />
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}