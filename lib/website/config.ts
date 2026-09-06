export const websiteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
  // Enable only after business-specific UI and public content are ready.
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",

  defaultTitle: "Local Business Website",
  defaultDescription:
    "Professional local business services, contact details, offers, appointments and service areas.",

  city: process.env.NEXT_PUBLIC_BUSINESS_CITY || "",
  region: process.env.NEXT_PUBLIC_BUSINESS_REGION || "",
  country: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "Pakistan",
};
