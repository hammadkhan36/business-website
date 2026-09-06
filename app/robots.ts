import type { MetadataRoute } from "next";
import { websiteConfig } from "@/lib/website/config";

export default function robots(): MetadataRoute.Robots {
  if (!websiteConfig.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${websiteConfig.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
