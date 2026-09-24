import { business } from "@/content/business";
import { aboutContent } from "@/content/pages";
import { PageFrame } from "@/components/website/page-frame";
import {
  PageIntro,
  ContactCTA,
} from "@/components/website/content-sections";

export const metadata = {
  title: `About ${business.shortName} | ${business.city}`,
  description: aboutContent.introduction,
};

export default function AboutPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.title}
        description={aboutContent.introduction}
      />

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
        {aboutContent.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-stone-200 bg-white p-7"
          >
            <h2 className="text-xl font-semibold">
              {section.title}
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <ContactCTA />
    </PageFrame>
  );
}
