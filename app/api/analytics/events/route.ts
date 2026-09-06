import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendAnalyticsEvent } from "@/lib/website/analytics";

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

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && origin !== request.nextUrl.origin) {
    return fail("Invalid request origin.", 403);
  }

  const json: unknown = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(json);

  if (!parsed.success) {
    return fail("Invalid analytics event.", 400);
  }

  try {
    await sendAnalyticsEvent(parsed.data);
    return NextResponse.json({ success: true });
  } catch {
    return fail("Analytics event could not be saved.", 502);
  }
}