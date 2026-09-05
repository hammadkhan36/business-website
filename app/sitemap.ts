import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/website/urls";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "/",
    "/services",
    "/areas",
    "/offers",
    "/contact",
    "/book",
    "/about",
    "/privacy-policy",
    "/terms",
  ];

  return staticPages.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}