import type { MetadataRoute } from "next";
import { websiteConfig } from "@/lib/website/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${websiteConfig.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}