import Link from "next/link";
import { contactLinks } from "@/content/business";
import type { ServiceContent } from "@/content/services";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-stone-200 bg-teal-50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
          {eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}

export function ServiceGrid({
  items,
}: {
  items: ServiceContent[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-7 transition hover:border-teal-700 hover:shadow-md"
        >
          <span className="mb-6 text-sm font-medium text-teal-700">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h2 className="text-xl font-semibold">
            {service.title}
          </h2>

          <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
            {service.summary}
          </p>

          <span className="mt-6 text-sm font-semibold text-teal-800">
            Explore treatment →
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-8">
      <div className="rounded-2xl bg-teal-950 p-8 text-white sm:p-12">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Ready to discuss your next visit?
        </h2>

        <p className="mt-4 max-w-2xl leading-7 text-teal-100">
          Contact the clinic to ask a question, discuss
          availability or arrange a consultation.
        </p>

        <div className="mt-7 flex flex-wrap gap-4">
          <a
            href={contactLinks.phone}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-950"
          >
            Call the clinic
          </a>

          <Link
            href="/contact"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold"
          >
            Contact details →
          </Link>
        </div>
      </div>
    </section>
  );
}
