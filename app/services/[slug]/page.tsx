import { notFound } from "next/navigation";
import Link from "next/link";
import { business } from "@/content/business";
import {
  services,
  getServiceBySlug,
} from "@/content/services";
import { PageFrame } from "@/components/website/page-frame";
import {
  PageIntro,
  ContactCTA,
} from "@/components/website/content-sections";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Treatment not found" };
  }

  return {
    title: `${service.title} in ${business.city} | ${business.shortName}`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <PageFrame>
      <PageIntro
        eyebrow={`DENTAL CARE · ${business.city}`}
        title={service.title}
        description={service.summary}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Link
            href="/services"
            className="text-sm font-semibold text-teal-800"
          >
            ← All treatments
          </Link>

          <h2 className="mt-8 text-2xl font-semibold">
            Discuss your care with the clinic
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {service.description}
          </p>
        </div>

        <aside className="rounded-2xl border border-stone-200 bg-white p-7">
          <h2 className="text-xl font-semibold">
            What to discuss
          </h2>

          <ul className="mt-5 space-y-4">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-b border-stone-100 pb-4 text-slate-600"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <ContactCTA />
    </PageFrame>
  );
}
