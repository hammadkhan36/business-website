"use server";

import { submitAppointment } from "@/lib/website/appointments";

export async function submitAppointmentAction(formData: FormData) {
  const customer_name = String(formData.get("customer_name") || "").trim();
  const customer_phone = String(formData.get("customer_phone") || "").trim();
  const customer_email = String(formData.get("customer_email") || "").trim() || null;
  const service_id = String(formData.get("service_id") || "").trim() || null;
  const appointment_date = String(formData.get("appointment_date") || "").trim();
  const appointment_time = String(formData.get("appointment_time") || "").trim();
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!customer_name || !customer_phone || !appointment_date || !appointment_time) {
    return {
      success: false,
      message: "Name, phone, date and time are required.",
    };
  }

  try {
    await submitAppointment({
      customer_name,
      customer_phone,
      customer_email,
      service_id,
      appointment_date,
      appointment_time,
      notes,
    });

    return {
      success: true,
      message: "Appointment request submitted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Appointment could not be submitted.",
    };
  }
}