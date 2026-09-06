import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/website/urls";
import { websiteConfig } from "@/lib/website/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!websiteConfig.allowIndexing) return [];
  // Add routes only when their UI exists and they return a public 200 page.
  const staticPages = ["/"];

  return staticPages.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
