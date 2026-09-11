import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitAppointmentRequestToAdmin } from "@/lib/website/appointments";

const appointmentSchema = z.object({
  customer_name: z.string().trim().min(2, "Name is required."),
  customer_phone: z.string().trim().min(7, "Phone number is required."),
  customer_email: z.string().trim().email().optional().or(z.literal("")),
  service: z.string().trim().optional(),
  appointment_date: z.string().trim().min(1, "Appointment date is required."),
  appointment_time: z.string().trim().min(1, "Appointment time is required."),
  notes: z.string().trim().optional(),
  page_url: z.string().trim().optional(),
  referrer: z.string().trim().optional(),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
});

function fail(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = appointmentSchema.safeParse(json);

  if (!parsed.success) {
    const firstError =
      parsed.error.issues[0]?.message || "Invalid appointment request.";

    return fail(firstError);
  }

  try {
    const result = await submitAppointmentRequestToAdmin(parsed.data);

    if (!result.success) {
      return fail(result.error || "Appointment request could not be submitted.");
    }

    return NextResponse.json(result);
  } catch (error) {
    return fail(
      error instanceof Error
        ? error.message
        : "Appointment request could not be submitted.",
      500
    );
  }
}