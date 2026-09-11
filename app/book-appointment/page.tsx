import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { getDentistConfig } from "@/lib/website/dentist-config";

export const metadata: Metadata = {
  title: "Book Dentist Appointment | Dental Care Clinic",
  description:
    "Request a dental appointment for checkup, teeth cleaning, whitening, braces, implants or emergency dental care.",
};

type BookAppointmentPageProps = {
  searchParams?: Promise<{
    service?: string;
  }>;
};

export default async function BookAppointmentPage({
  searchParams,
}: BookAppointmentPageProps) {
  const config = getDentistConfig();
  const params = searchParams ? await searchParams : {};
  const selectedService = config.services.find(
    (service) => service.slug === params.service
  );

  const phone = config.emergency.phoneFallback;
  const whatsappNumber = phone.replace(/[^\d]/g, "");

  return (
    <main>
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1fr_0.9fr] md:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Book Appointment
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Request your dental appointment online.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Visitor yahan appointment request submit karega. Next step mein ye
              form admin panel ki appointment API se connect hoga, jahan se admin
              approve, reject ya reschedule kar sakega.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <CalendarCheck className="mb-3 h-6 w-6 text-blue-600" />
                <h2 className="font-semibold text-slate-950">
                  Appointment request
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Request admin dashboard mein pending appointment ke form mein
                  ja sakti hai.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <ShieldCheck className="mb-3 h-6 w-6 text-blue-600" />
                <h2 className="font-semibold text-slate-950">
                  Lead tracking ready
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Appointment ke sath visitor source, page URL aur campaign data
                  track ho sakta hai.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-950">
                Appointment Details
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {selectedService
                  ? `Selected service: ${selectedService.title}`
                  : "Choose a service and preferred appointment time."}
              </p>
            </div>

            <form className="space-y-4">
              <input
                type="hidden"
                name="source"
                value="website"
              />

              <div>
                <label
                  htmlFor="customer_name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <input
                  id="customer_name"
                  name="customer_name"
                  type="text"
                  placeholder="Your full name"
                  className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="customer_phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone
                  </label>
                  <input
                    id="customer_phone"
                    name="customer_phone"
                    type="tel"
                    placeholder="Phone number"
                    className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer_email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="customer_email"
                    name="customer_email"
                    type="email"
                    placeholder="Email address"
                    className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  defaultValue={selectedService?.slug ?? ""}
                  className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                >
                  <option value="">Select service</option>
                  {config.services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="appointment_date"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="appointment_date"
                    name="appointment_date"
                    type="date"
                    className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appointment_time"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Preferred Time
                  </label>
                  <input
                    id="appointment_time"
                    name="appointment_time"
                    type="time"
                    className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Tell us about your dental concern"
                  className="w-full resize-none rounded-xl border bg-white px-3 py-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                />
              </div>

              <button
                type="button"
                data-track-event="appointment_submit"
                data-track-label="Appointment Form Placeholder"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Request Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                This form is ready for API connection. Next step mein hum actual
                submit action add karenge.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-3 md:px-6 lg:px-8">
          <a
            href={`tel:${phone}`}
            data-track-event="call_click"
            data-track-label="Booking Page Call"
            className="rounded-2xl border p-6 transition hover:bg-slate-50"
          >
            <Phone className="mb-4 h-6 w-6 text-blue-600" />
            <h2 className="font-semibold text-slate-950">Call Clinic</h2>
            <p className="mt-2 text-sm text-muted-foreground">{phone}</p>
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            data-track-event="whatsapp_click"
            data-track-label="Booking Page WhatsApp"
            className="rounded-2xl border p-6 transition hover:bg-slate-50"
          >
            <MessageCircle className="mb-4 h-6 w-6 text-emerald-600" />
            <h2 className="font-semibold text-slate-950">WhatsApp</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask a quick question before booking.
            </p>
          </a>

          <div className="rounded-2xl border p-6">
            <Clock className="mb-4 h-6 w-6 text-amber-600" />
            <h2 className="font-semibold text-slate-950">Response Time</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Clinic team can review appointment requests from admin dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <CheckCircle2 className="mx-auto mb-5 h-10 w-10 text-blue-600" />

          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Appointment workflow ready for admin panel
          </h2>

          <p className="mt-4 text-muted-foreground">
            Website visitor request submit karega, admin panel mein appointment
            create hogi, notification generate hogi aur analytics mein
            appointment submit event track hoga.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center justify-center rounded-full border bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-50"
          >
            View Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}