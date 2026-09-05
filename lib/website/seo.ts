import type { Metadata } from "next";
import { websiteConfig } from "@/lib/website/config";
import { absoluteUrl } from "@/lib/website/urls";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
};

export function createSeoMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: SeoInput = {}): Metadata {
  const finalTitle = title || websiteConfig.defaultTitle;
  const finalDescription = description || websiteConfig.defaultDescription;
  const url = absoluteUrl(path);

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: image ? [image] : undefined,
    },
  };
}

export function createPageTitle(title: string, businessName?: string | null) {
  if (!businessName) return title;
  return `${title} | ${businessName}`;
}