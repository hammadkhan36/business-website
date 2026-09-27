import { NextRequest, NextResponse } from "next/server";
import { getContactConfig } from "@/lib/website/contact-config";
import { postAdminApi } from "@/lib/website/public-api";
function reply(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: NextRequest) {
  if (process.env.APPOINTMENT_FORM_ENABLED !== "true") return reply({ error: "Online booking unavailable." }, 503);
  let origin: string;
  try { origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "").origin; }
  catch { return reply({ error: "Online booking unavailable." }, 503); }
  if (request.headers.get("origin") !== origin) return reply({ error: "Origin not allowed." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "JSON required." }, 415);
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 16000) return reply({ error: "Request too large." }, 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
  } catch { return reply({ error: "Invalid request." }, 400); }
  const text = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
  if (text("website") || body.contact_permission !== true) return reply({ error: "Contact permission required." }, 400);
  const submissionId = text("submission_id");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) return reply({ error: "Reload the form before submitting." }, 400);
  const config = await getContactConfig();
  if (!config) return reply({ error: "Contact settings unavailable." }, 503);
  const name = text("name"), phone = text("phone").replace(/[\s().-]/g, ""), email = text("email").toLowerCase();
  if (name.length < 2 || name.length > 100 || !text(config.contact_mode)) return reply({ error: `Name and ${config.contact_mode} are required.` }, 400);
  if ((phone && !/^\+?\d{7,15}$/.test(phone)) || (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))) return reply({ error: "Check your contact details." }, 400);
  if (!config.services.some(s => s.id === text("service_id"))) return reply({ error: "Choose an available service." }, 400);
  const date = text("appointment_date"), time = text("appointment_time");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || text("notes").length > 2000) return reply({ error: "Check date, time and notes." }, 400);
  try {
    const result = await postAdminApi({ path: "/api/public/appointments", apiKey: process.env.WEBSITE_APPOINTMENT_API_KEY,
      body: { submission_id: submissionId, name, phone, email, service_id: text("service_id"), appointment_date: date, appointment_time: time, notes: text("notes") } });
    const data = result.data;
    if (!result.ok) return reply({ error: [400, 409, 429].includes(result.status) ? result.data.error : "We could not confirm your request." }, [400, 409, 429].includes(result.status) ? result.status : 502);
    if (!data || typeof data !== "object" || !("success" in data) || data.success !== true) return reply({ error: "We could not confirm your request." }, 502);
    return reply({ success: true }, 201);
  } catch { return reply({ error: "We could not confirm your request. Please contact the business." }, 502); }
}
