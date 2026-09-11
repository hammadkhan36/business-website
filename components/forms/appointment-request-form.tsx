"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitAppointmentRequest } from "@/lib/website/appointments";
import type { DentistService } from "@/config/dentist";

type AppointmentRequestFormProps = {
  services: DentistService[];
  selectedServiceSlug?: string;
};

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

export function AppointmentRequestForm({
  services,
  selectedServiceSlug,
}: AppointmentRequestFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<FormStatus>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);

    const payload = {
      customer_name: String(formData.get("customer_name") || "").trim(),
      customer_phone: String(formData.get("customer_phone") || "").trim(),
      customer_email: String(formData.get("customer_email") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      appointment_date: String(formData.get("appointment_date") || "").trim(),
      appointment_time: String(formData.get("appointment_time") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      page_url: window.location.href,
      referrer: document.referrer,
      utm_source: new URLSearchParams(window.location.search).get("utm_source"),
      utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
      utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign"),
    };

    if (!payload.customer_name || !payload.customer_phone) {
      setStatus({
        type: "error",
        message: "Please enter your name and phone number.",
      });
      return;
    }

    if (!payload.appointment_date || !payload.appointment_time) {
      setStatus({
        type: "error",
        message: "Please select appointment date and time.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const result = await submitAppointmentRequest(payload);

    if (!result.success) {
      setIsSubmitting(false);
      setStatus({
        type: "error",
        message: result.error || "Appointment request could not be submitted.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Appointment request submitted successfully.",
    });

    router.push("/thank-you?type=appointment");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="source" value="website" />

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
          defaultValue={selectedServiceSlug ?? ""}
          className="h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none ring-blue-600/20 transition focus:ring-4"
        >
          <option value="">Select service</option>
          {services.map((service) => (
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

      {status.type !== "idle" && (
        <div
          className={
            status.type === "success"
              ? "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              : "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          }
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        data-track-event="appointment_submit"
        data-track-label="Appointment Form Submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Request Appointment
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}