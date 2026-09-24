import Link from "next/link";
import { business, contactLinks } from "@/content/business";
import { homeContent } from "@/content/pages";
import { services } from "@/content/services";
import { PageFrame } from "@/components/website/page-frame";
import {
  ServiceGrid,
  ContactCTA,
} from "@/components/website/content-sections";

export const metadata = {
  title: `${business.shortName} Dental Implant Clinic | ${business.city}`,
  description: homeContent.description,
};

export default function HomePage() {
  return (
    <PageFrame>
      <section className="bg-teal-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-800">
              {homeContent.eyebrow}
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {homeContent.title}
            </h1>

            <p className="mt-6 max-w-xl leading-8 text-slate-600">
              {homeContent.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={contactLinks.phone}
                className="rounded-full bg-teal-950 px-6 py-3 text-sm font-semibold text-white"
              >
                Call {business.displayPhone}
              </a>

              <Link
                href="/services"
                className="rounded-full border border-teal-900 px-6 py-3 text-sm font-semibold text-teal-950"
              >
                Explore treatments →
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-teal-100 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
              Visit our clinic
            </p>

            <h2 className="mt-4 text-2xl font-semibold">
              {business.name}
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              {business.address}
            </p>

            <a
              href={contactLinks.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-medium text-teal-800 underline underline-offset-4"
            >
              Get directions ↗
            </a>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-semibold">
          {homeContent.servicesTitle}
        </h2>

        <p className="mb-8 mt-4 text-slate-600">
          {homeContent.servicesDescription}
        </p>

        <ServiceGrid items={services.slice(0, 6)} />

        <Link
          href="/services"
          className="mt-8 inline-block font-semibold text-teal-800"
        >
          View all treatments →
        </Link>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">
            {homeContent.approachTitle}
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {homeContent.approach.map((item) => (
              <article key={item.title}>
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </PageFrame>
  );
}
