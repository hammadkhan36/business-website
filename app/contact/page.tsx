import Link from "next/link";
import type { Metadata } from "next";
import {
  CalendarCheck,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { getDentistConfig } from "@/lib/website/dentist-config";

export const metadata: Metadata = {
  title: "Contact Dental Care Clinic | Book a Dentist Appointment",
  description:
    "Contact the dental clinic, call, WhatsApp, get directions or request an appointment online.",
};

export default function ContactPage() {
  const config = getDentistConfig();

  const phone = config.emergency.phoneFallback;
  const whatsappNumber = phone.replace(/[^\d]/g, "");
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=dental+clinic";

  return (
    <main>
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Contact
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Contact the clinic or request your appointment.
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
              Ye contact page conversion-focused hai. Call, WhatsApp, map aur
              appointment buttons tracking ke liye ready hain.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-6 lg:px-8">
          <div className="space-y-4">
            <a
              href={`tel:${phone}`}
              data-track-event="call_click"
              data-track-label="Contact Page Call"
              className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:bg-slate-50"
            >
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-950">Call Clinic</h2>
                <p className="mt-1 text-sm text-muted-foreground">{phone}</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              data-track-event="whatsapp_click"
              data-track-label="Contact Page WhatsApp"
              className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:bg-slate-50"
            >
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-950">WhatsApp</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send a quick message to the clinic.
                </p>
              </div>
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              data-track-event="map_click"
              data-track-label="Contact Page Map"
              className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:bg-slate-50"
            >
              <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-950">Get Directions</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open clinic location in Google Maps.
                </p>
              </div>
            </a>

            <Link
              href="/book-appointment"
              data-track-event="booking_click"
              data-track-label="Contact Page Book Appointment"
              className="flex items-start gap-4 rounded-2xl border bg-blue-600 p-5 text-white shadow-sm transition hover:bg-blue-700"
            >
              <div className="rounded-2xl bg-white/15 p-3">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">Book Appointment</h2>
                <p className="mt-1 text-sm text-blue-100">
                  Request your dental appointment online.
                </p>
              </div>
            </Link>
          </div>

          <div className="rounded-[2rem] border bg-slate-50 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-950">
                Send an inquiry
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Next step mein is form ko admin panel ki Leads API se connect
                karenge. Abhi structure ready kar rahe hain.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="h-11 w-full rounded-xl border bg-white px-10 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border bg-white px-3 py-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
                />
              </div>

              <button
                type="button"
                data-track-event="form_start"
                data-track-label="Contact Inquiry Placeholder"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}