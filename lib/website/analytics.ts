import "server-only";
import { z } from "zod";

const eventSchema = z.object({
  event_type: z.enum([
    "page_view",
    "call_click",
    "whatsapp_click",
    "map_click",
    "booking_click",
    "lead_submit",
    "appointment_submit",
    "coupon_validate",
    "coupon_redeem",
    "review_submit",
    "form_submit",
  ]),
  path: z.string().trim().min(1).max(500),
  label: z.string().trim().min(1).max(200).nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  visitor_id: z.string().trim().min(1).max(100).nullable().optional(),
  session_id: z.string().trim().min(1).max(100).nullable().optional(),
  referrer_domain: z.string().trim().min(1).max(255).nullable().optional(),
});

export type WebsiteAnalyticsEvent = z.infer<typeof eventSchema>;

function getAdminApiUrl() {
  const url = process.env.ADMIN_API_URL;

  if (!url) {
    throw new Error("ADMIN_API_URL is missing.");
  }

  return url.replace(/\/$/, "");
}

export async function sendAnalyticsEvent(input: WebsiteAnalyticsEvent) {
  const parsed = eventSchema.parse(input);
  const apiKey = process.env.WEBSITE_ANALYTICS_API_KEY;

  if (!apiKey) {
    throw new Error("WEBSITE_ANALYTICS_API_KEY is missing.");
  }

  const response = await fetch(`${getAdminApiUrl()}/api/public/analytics/events`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(parsed),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Analytics event could not be saved (${response.status}).`);
  }

  return response.json() as Promise<{ success: boolean }>;
}