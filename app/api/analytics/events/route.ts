import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {requireElementsConnection} from "@/lib/website/elements-data";
import { sendAnalyticsEvent } from "@/lib/website/analytics";

const browserEventSchema = z.object({
  event_type: z.string().trim().min(1),
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

function hasSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json(
      { success: false, error: "Invalid origin." },
      { status: 403 }
    );
  }

  const json: unknown = await request.json().catch(() => null);
  const parsed = browserEventSchema.safeParse(json);

  if (!parsed.success) {
    console.error("Website analytics validation error:", parsed.error.flatten());

    return NextResponse.json(
      {
        success: false,
        error: "Invalid analytics event.",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  if(parsed.data.consent_status!=="accepted")return NextResponse.json({success:true,skipped:true});
  parsed.data.metadata={};parsed.data.referrer_url=null;parsed.data.path=parsed.data.path.split(/[?#]/)[0];
  try {
    await requireElementsConnection();
    await sendAnalyticsEvent(
      parsed.data as Parameters<typeof sendAnalyticsEvent>[0]
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown analytics error";

    console.error("Website analytics proxy error:", message);

    return NextResponse.json(
      {
        success: false,
        error: "Analytics temporarily unavailable.",
      },
      { status: 502 }
    );
  }
}