import { business } from "@/content/business";
import { services } from "@/content/services";
import { PageFrame } from "@/components/website/page-frame";
import {
  PageIntro,
  ServiceGrid,
  ContactCTA,
} from "@/components/website/content-sections";

export const metadata = {
  title: `Dental Treatments in ${business.city} | ${business.shortName}`,
  description:
    `Explore dental treatments at ${business.name}, ${business.city}.`,
};

export default function ServicesPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow={`TREATMENTS IN ${business.city.toUpperCase()}`}
        title="Explore care for your smile."
        description="Learn about the treatments available at the clinic and contact the team to discuss a consultation."
      />

      <section
        aria-label="Available treatments"
        className="mx-auto max-w-6xl px-5 py-16"
      >
        <ServiceGrid items={services} />
      </section>

      <ContactCTA />
    </PageFrame>
  );
}
