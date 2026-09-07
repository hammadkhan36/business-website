import "server-only";
import { z } from "zod";

const eventSchema = z.object({
  event_type: z.enum([
    "page_view",
    "session_start",
    "session_end",
    "engagement_ping",

    "call_click",
    "whatsapp_click",
    "map_click",
    "booking_click",
    "website_click",
    "social_click",
    "share_click",
    "copy_phone_click",

    "lead_form_start",
    "lead_submit",
    "lead_form_error",
    "lead_form_abandon",

    "appointment_form_start",
    "appointment_submit",
    "appointment_form_error",
    "appointment_form_abandon",

    "custom_form_start",
    "form_submit",
    "custom_form_error",
    "custom_form_abandon",

    "coupon_validate",
    "coupon_redeem",
    "offer_view",
    "offer_click",

    "service_view",
    "service_click",

    "review_form_start",
    "review_submit",
    "review_form_error",
  ]),

  path: z.string().trim().min(1).max(500),
  label: z.string().trim().min(1).max(200).nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),

  business_id: z.string().uuid().nullable().optional(),

  visitor_id: z.string().trim().min(1).max(100).nullable().optional(),
  session_id: z.string().trim().min(1).max(100).nullable().optional(),

  page_title: z.string().trim().max(300).nullable().optional(),
  hostname: z.string().trim().max(255).nullable().optional(),
  referrer_url: z.string().trim().max(1000).nullable().optional(),
  referrer_domain: z.string().trim().max(255).nullable().optional(),

  utm_source: z.string().trim().max(255).nullable().optional(),
  utm_medium: z.string().trim().max(255).nullable().optional(),
  utm_campaign: z.string().trim().max(255).nullable().optional(),
  utm_term: z.string().trim().max(255).nullable().optional(),
  utm_content: z.string().trim().max(255).nullable().optional(),

  device_type: z.string().trim().max(50).nullable().optional(),
  browser: z.string().trim().max(100).nullable().optional(),
  os: z.string().trim().max(100).nullable().optional(),

  screen_width: z.number().int().positive().nullable().optional(),
  screen_height: z.number().int().positive().nullable().optional(),
  viewport_width: z.number().int().positive().nullable().optional(),
  viewport_height: z.number().int().positive().nullable().optional(),

  language: z.string().trim().max(50).nullable().optional(),
  timezone: z.string().trim().max(100).nullable().optional(),
  engagement_ms: z.number().int().nonnegative().nullable().optional(),

  service_id: z.string().uuid().nullable().optional(),
  service_name: z.string().trim().max(255).nullable().optional(),

  offer_id: z.string().uuid().nullable().optional(),
  offer_title: z.string().trim().max(255).nullable().optional(),

  form_id: z.string().uuid().nullable().optional(),
  form_name: z.string().trim().max(255).nullable().optional(),

  coupon_code: z.string().trim().max(100).nullable().optional(),

  consent_status: z.enum(["accepted", "rejected", "unknown"]).optional(),
});

export type WebsiteAnalyticsEvent = z.infer<typeof eventSchema>;

export async function sendAnalyticsEvent(input: WebsiteAnalyticsEvent) {
  const origin = process.env.ADMIN_API_URL;
  const apiKey = process.env.WEBSITE_ANALYTICS_API_KEY;

  if (!origin || !apiKey) {
    throw new Error("Configure ADMIN_API_URL and WEBSITE_ANALYTICS_API_KEY on the website server.");
  }

  const parsed = eventSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid analytics event.");
  }

  const url = new URL("/api/public/analytics/events", origin);

  if (
    url.protocol !== "https:" &&
    !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))
  ) {
    throw new Error("ADMIN_API_URL must use HTTPS. HTTP is allowed only for localhost.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(parsed.data),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Analytics event could not be recorded (${response.status}).`);
  }
}