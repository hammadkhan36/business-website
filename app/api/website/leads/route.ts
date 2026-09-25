import { NextRequest, NextResponse } from "next/server";
import { postAdminApi } from "@/lib/website/public-api";

function fail(error: string, status: number) {
  return NextResponse.json(
    { success: false, error },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

function readText(
  body: Record<string, unknown>,
  field: string
): string {
  const value = body[field];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  if (
    process.env.LEAD_FORM_ENABLED !== "true" ||
    !process.env.ADMIN_API_URL ||
    !process.env.WEBSITE_LEAD_API_KEY
  ) {
    return fail("Online enquiries are currently unavailable.", 503);
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return fail("JSON request required.", 415);
  }

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredSiteUrl) {
    return fail("Online enquiries are currently unavailable.", 503);
  }

  let siteOrigin: string;

  try {
    siteOrigin = new URL(configuredSiteUrl).origin;
  } catch {
    return fail("Online enquiries are currently unavailable.", 503);
  }

  if (request.headers.get("origin") !== siteOrigin) {
    return fail("Request origin is not allowed.", 403);
  }

  let parsed: unknown;

  try {
    const raw = await request.text();

    if (new TextEncoder().encode(raw).length > 16_000) {
      return fail("Request is too large.", 413);
    }

    parsed = JSON.parse(raw);
  } catch {
    return fail("Invalid request.", 400);
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return fail("Invalid request.", 400);
  }

  const body = parsed as Record<string, unknown>;

  if (readText(body, "website")) {
    return fail("Unable to accept this enquiry.", 400);
  }

  const name = readText(body, "name");
  const rawPhone = readText(body, "phone");
  const email = readText(body, "email");
  const message = readText(body, "message");
  const service = readText(body, "service");

  if (name.length < 2 || name.length > 100) {
    return fail("Enter a name between 2 and 100 characters.", 400);
  }

  if (
    rawPhone.length > 30 ||
    !/^\+?[\d\s().-]+$/.test(rawPhone)
  ) {
    return fail("Enter a valid phone number.", 400);
  }

  const phone = rawPhone.replace(/[\s().-]/g, "");

  if (!/^\+?\d{7,15}$/.test(phone)) {
    return fail("Enter a valid phone number.", 400);
  }

  if (
    email &&
    (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return fail("Enter a valid email address.", 400);
  }

  if (
    message.length < 5 ||
    message.length > 2000 ||
    service.length > 150
  ) {
    return fail(
      "Message must be 5–2000 characters; service must be at most 150.",
      400
    );
  }

  if (body.contact_permission !== true) {
    return fail("Contact permission is required.", 400);
  }

  let pageUrl: string | undefined;
  const suppliedPage = readText(body, "page_url");

  if (suppliedPage && suppliedPage.length <= 2048) {
    try {
      const url = new URL(suppliedPage, siteOrigin);

      if (url.origin === siteOrigin) {
        pageUrl = `${siteOrigin}${url.pathname}`;
      }
    } catch {
      // Invalid optional page URLs are ignored.
    }
  }

  try {
    const result = await postAdminApi({
      path: "/api/public/leads",
      apiKey: process.env.WEBSITE_LEAD_API_KEY,
      body: {
        name,
        phone,
        email: email || undefined,
        message,
        service: service || undefined,
        page_url: pageUrl,
      },
    });

    const data = result.data;

    const confirmed =
      result.ok &&
      data !== null &&
      typeof data === "object" &&
      "success" in data &&
      data.success === true;

    if (!confirmed) {
      return fail("We could not confirm your submission.", 502);
    }

    return NextResponse.json(
      { success: true },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch {
    return fail("We could not confirm your submission.", 502);
  }
}
