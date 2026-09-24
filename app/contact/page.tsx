import type { Metadata } from "next";
import {
  business,
  contactLinks,
} from "@/content/business";
import { contactContent } from "@/content/contact";
import { PageFrame } from "@/components/website/page-frame";
import { InquiryForm } from "@/components/website/inquiry-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${contactContent.metadata.title} | ${business.name}`,
  description: `${contactContent.metadata.description} ${business.city}, ${business.country}.`,
};

const cardClass =
  "rounded-2xl border border-stone-200 bg-white p-6 shadow-sm";

const actionClass =
  "mt-6 inline-flex rounded-full bg-teal-800 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-950";

export default function ContactPage() {
  const formEnabled = Boolean(
    process.env.LEAD_FORM_ENABLED === "true" &&
    process.env.ADMIN_API_URL &&
    process.env.WEBSITE_LEAD_API_KEY &&
    process.env.NEXT_PUBLIC_SITE_URL
  );

  return (
    <PageFrame>
      <section className="border-b border-stone-200 bg-teal-50">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-800">
            {contactContent.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {contactContent.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {contactContent.introduction}
          </p>
        </div>
      </section>

      <section
        aria-label="Contact details"
        className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-2"
      >
        <article className={cardClass}>
          <h2 className="text-xl font-semibold">
            {contactContent.phone.title}
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            {contactContent.phone.description}
          </p>
          <p className="mt-4 text-xl font-semibold text-teal-900">
            {business.displayPhone}
          </p>
          <a href={contactLinks.phone} className={actionClass}>
            {contactContent.phone.action}
          </a>
        </article>

        <article className={cardClass}>
          <h2 className="text-xl font-semibold">
            {contactContent.email.title}
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            {contactContent.email.description}
          </p>
          <p className="mt-4 break-all font-semibold text-teal-900">
            {business.email}
          </p>
          <a href={contactLinks.email} className={actionClass}>
            {contactContent.email.action}
          </a>
        </article>

        <article className={cardClass}>
          <h2 className="text-xl font-semibold">
            {contactContent.location.title}
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            {contactContent.location.description}
          </p>
          <address className="mt-4 not-italic leading-7">
            {business.address}
          </address>
          <a
            href={contactLinks.directions}
            target="_blank"
            rel="noopener noreferrer"
            className={actionClass}
          >
            {contactContent.location.action} ↗
          </a>
        </article>

        <article className="rounded-2xl bg-teal-950 p-6 text-white">
          <h2 className="text-xl font-semibold">
            {contactContent.visit.title}
          </h2>
          <ul className="mt-5 list-disc space-y-4 pl-5 leading-7 text-teal-100">
            {contactContent.visit.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </section>

      <div className="mx-auto max-w-3xl px-5 pb-8">
        <InquiryForm enabled={formEnabled} />
      </div>
    </PageFrame>
  );
}
