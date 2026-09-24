import { business } from "@/content/business";
import { faqContent } from "@/content/pages";
import { PageFrame } from "@/components/website/page-frame";
import {
  PageIntro,
  ContactCTA,
} from "@/components/website/content-sections";

export const metadata = {
  title: `FAQs | ${business.shortName}`,
  description: faqContent.description,
};

export default function FAQPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow={faqContent.eyebrow}
        title={faqContent.title}
        description={faqContent.description}
      />

      <section
        aria-label="Frequently asked questions"
        className="mx-auto max-w-3xl px-5 py-16"
      >
        {faqContent.items.map((item) => (
          <details
            key={item.question}
            className="mb-4 rounded-xl border border-stone-200 bg-white p-6"
          >
            <summary className="cursor-pointer font-semibold">
              {item.question}
            </summary>

            <p className="mt-4 leading-8 text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </section>

      <ContactCTA />
    </PageFrame>
  );
}
