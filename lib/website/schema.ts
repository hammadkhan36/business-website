import { absoluteUrl } from "@/lib/website/urls";
import { createElement } from "react";

type BusinessSchemaInput = {
  name: string;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  logo?: string | null;
  image?: string | null;
  address?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
};

type FaqSchemaInput = {
  question: string;
  answer: string;
};

type ServiceSchemaInput = {
  name: string;
  description?: string | null;
  url?: string;
};

export function localBusinessSchema(input: BusinessSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    description: input.description || undefined,
    telephone: input.phone || undefined,
    email: input.email || undefined,
    url: absoluteUrl("/"),
    logo: input.logo || undefined,
    image: input.image || input.logo || undefined,
    address: input.address
      ? {
          "@type": "PostalAddress",
          streetAddress: input.address,
          addressLocality: input.city || undefined,
          addressRegion: input.region || undefined,
          addressCountry: input.country || undefined,
        }
      : undefined,
  };
}

export function faqSchema(faqs: FaqSchemaInput[]) {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(service: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description || undefined,
    url: service.url,
  };
}

export function jsonLd(data: unknown) {
  if (!data) return null;

  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  });
}