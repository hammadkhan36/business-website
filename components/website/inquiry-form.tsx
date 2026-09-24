"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { inquiryContent } from "@/content/inquiry";

type InquiryFormProps = {
  enabled: boolean;
};

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";

export function InquiryForm({ enabled }: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!enabled || submitting.current || status === "success") {
      return;
    }

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    submitting.current = true;
    setStatus("sending");

    const fields = new FormData(form);

    try {
      const response = await fetch("/api/website/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fields.get("name"),
          phone: fields.get("phone"),
          email: fields.get("email"),
          message: fields.get("message"),
          website: fields.get("website"),
          contact_permission: fields.get("contact_permission") === "on",
          page_url: window.location.pathname,
        }),
        signal: AbortSignal.timeout(15_000),
      });

      const result: unknown = await response.json();

      const confirmed =
        response.ok &&
        result !== null &&
        typeof result === "object" &&
        "success" in result &&
        result.success === true;

      if (!confirmed) {
        throw new Error("Submission was not confirmed.");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <section
      aria-labelledby="inquiry-heading"
      className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8"
    >
      <h2 id="inquiry-heading" className="text-2xl font-semibold">
        {inquiryContent.title}
      </h2>

      <p className="mt-3 leading-7 text-slate-600">
        {inquiryContent.description}
      </p>

      {!enabled ? (
        <p className="mt-6 rounded-xl bg-stone-100 p-4 leading-7">
          {inquiryContent.unavailable}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <fieldset
            disabled={status === "sending" || status === "success"}
            className="space-y-5 disabled:opacity-70"
          >
            <legend className="sr-only">Enquiry details</legend>

            <div>
              <label htmlFor="inquiry-name" className="text-sm font-medium">
                {inquiryContent.nameLabel}
              </label>
              <input
                id="inquiry-name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="inquiry-phone" className="text-sm font-medium">
                {inquiryContent.phoneLabel}
              </label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                minLength={7}
                maxLength={30}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="inquiry-email" className="text-sm font-medium">
                {inquiryContent.emailLabel}
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-message"
                className="text-sm font-medium"
              >
                {inquiryContent.messageLabel}
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                required
                minLength={5}
                maxLength={2000}
                rows={5}
                aria-describedby="inquiry-privacy"
                className={inputClass}
              />
              <p
                id="inquiry-privacy"
                className="mt-2 text-sm leading-6 text-slate-600"
              >
                {inquiryContent.privacyNote}
              </p>
            </div>

            <div hidden aria-hidden="true">
              <label htmlFor="inquiry-website">Leave this empty</label>
              <input
                id="inquiry-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                name="contact_permission"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 accent-teal-800"
              />
              <span>{inquiryContent.permission}</span>
            </label>

            <button
              type="submit"
              className="rounded-full bg-teal-800 px-6 py-3 font-semibold text-white hover:bg-teal-950 disabled:cursor-not-allowed"
            >
              {status === "sending"
                ? inquiryContent.submitting
                : inquiryContent.submit}
            </button>
          </fieldset>

          <div aria-live="polite" aria-atomic="true">
            {status === "success" && (
              <p className="mt-5 rounded-xl bg-teal-50 p-4 text-teal-950">
                {inquiryContent.success}
              </p>
            )}
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-50 p-4 text-red-800"
            >
              {inquiryContent.error}
            </p>
          )}
        </form>
      )}
    </section>
  );
                }
