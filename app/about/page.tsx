import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { getDentistConfig } from "@/lib/website/dentist-config";

export const metadata: Metadata = {
  title: "About Our Dental Clinic | Dental Care Clinic",
  description:
    "Learn about our patient-friendly dental clinic, treatment approach, trust points and dental care values.",
};

export default function AboutPage() {
  const config = getDentistConfig();

  return (
    <main>
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              About The Clinic
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              A calm, modern dental experience built around patient trust.
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
              Ye dentist starter website ka about page hai. Is mein clinic ki
              story, trust points, patient care approach aur appointment CTA ready
              hai. Baad mein business owner ka real data admin panel se connect
              kar denge.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-appointment"
                data-track-event="booking_click"
                data-track-label="About Page Book Appointment"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <CalendarCheck className="mr-2 h-4 w-4" />
                Book Appointment
              </Link>

              <Link
                href="/services"
                data-track-event="service_click"
                data-track-label="About Page View Services"
                className="inline-flex items-center justify-center rounded-full border bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                View Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border bg-white p-6 shadow-sm">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <Sparkles className="h-8 w-8 text-cyan-300" />

              <h2 className="mt-6 text-2xl font-bold">
                Designed for local dental clinics
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Is starter ko hum har dentist client ke liye reuse kar sakte hain:
                same structure, same admin connection, sirf UI, images aur content
                update.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {config.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/10 p-4">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="mt-1 text-xs text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Why Patients Choose Us
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Simple care, clear communication and trackable growth.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {config.trustPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border p-6">
                <BadgeCheck className="mb-4 h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-950">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 md:px-6 lg:px-8">
          <div className="rounded-2xl border bg-white p-6">
            <HeartHandshake className="mb-4 h-7 w-7 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-950">
              Gentle patient care
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Website copy dentist clients ke liye patient comfort aur trust ko
              highlight karegi.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <ShieldCheck className="mb-4 h-7 w-7 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-950">
              Clean service structure
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Har service ka apna SEO page hoga, jo Google ranking ke liye useful
              hota hai.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <Users className="mb-4 h-7 w-7 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-950">
              Lead and appointment ready
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Contact aur appointment forms admin panel mein lead/customer data
              create kar sakte hain.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}