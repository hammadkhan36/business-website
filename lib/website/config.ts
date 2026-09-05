export const websiteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
  businessId: process.env.NEXT_PUBLIC_BUSINESS_ID || null,

  defaultTitle: "Local Business Website",
  defaultDescription:
    "Professional local business services, contact details, offers, appointments and service areas.",

  city: process.env.NEXT_PUBLIC_BUSINESS_CITY || "",
  region: process.env.NEXT_PUBLIC_BUSINESS_REGION || "",
  country: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "Pakistan",
};