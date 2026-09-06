import "server-only";
import { cache } from "react";
import { z } from "zod";

// Matches my-admin/app/api/public/business-config/route.ts.
const configSchema = z.object({
  success: z.literal(true),
  business: z.object({
    business_name: z.string().nullable(),
    short_name: z.string().nullable(),
    logo_url: z.string().nullable(),
    favicon_url: z.string().nullable(),
    theme_color: z.string(),
    contact_email: z.string().nullable(),
    contact_phone: z.string().nullable(),
    address: z.string().nullable(),
    social_links: z.record(z.string(), z.unknown()),
  }).nullable(),
  services: z.array(z.object({ id: z.string(), name: z.string(), description: z.string().nullable(), price: z.number().nullable(), duration_minutes: z.number().nullable(), sort_order: z.number() })),
  service_areas: z.array(z.object({ id: z.string(), area_name: z.string(), city: z.string().nullable(), sort_order: z.number() })),
  faqs: z.array(z.object({ id: z.string(), question: z.string(), answer: z.string(), sort_order: z.number() })),
  offers: z.array(z.object({ id: z.string(), title: z.string(), description: z.string().nullable(), discount_label: z.string().nullable(), starts_at: z.string().nullable(), ends_at: z.string().nullable(), cta_label: z.string().nullable(), cta_url: z.string().nullable(), image_url: z.string().nullable(), sort_order: z.number() })),
  business_hours: z.array(z.object({ day_of_week: z.number(), day_name: z.string(), opens_at: z.string().nullable(), closes_at: z.string().nullable(), is_closed: z.boolean(), is_24h: z.boolean() })),
  seo: z.object({
    default_meta_title: z.string().nullable(),
    default_meta_description: z.string().nullable(),
    og_image_url: z.string().nullable(),
    google_search_console_verification: z.string().nullable(),
    enable_local_business_schema: z.boolean(),
    enable_faq_schema: z.boolean(),
    enable_review_schema: z.boolean(),
  }).nullable(),
});

export type AdminWebsiteConfig = z.infer<typeof configSchema>;

// React cache deduplicates layout/page reads within one server render.
export const getAdminWebsiteConfig = cache(async (): Promise<AdminWebsiteConfig> => {
  const origin = process.env.ADMIN_API_URL;
  const key = process.env.WEBSITE_CONFIG_API_KEY;
  if (!origin || !key) {
    throw new Error("Configure ADMIN_API_URL and WEBSITE_CONFIG_API_KEY on the website server.");
  }
  const url = new URL("/api/public/business-config", origin);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) {
    throw new Error("ADMIN_API_URL must use HTTPS (HTTP is allowed for localhost).");
  }
  const response = await fetch(url, {
    headers: { "x-api-key": key },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Admin website configuration unavailable (${response.status}).`);
  const parsed = configSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error("Admin website configuration does not match the expected API contract.");
  return parsed.data;
});
