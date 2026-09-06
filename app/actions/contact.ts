"use server";

import { submitLead } from "@/lib/website/leads";

export async function submitContactAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim() || undefined;
  const service = String(formData.get("service") || "").trim() || undefined;
  const message = String(formData.get("message") || "").trim() || undefined;

  if (!name || !phone) {
    return {
      success: false,
      message: "Name and phone are required.",
    };
  }

  try {
    await submitLead({
      name,
      phone,
      email,
      service,
      message,
    });

    return {
      success: true,
      message: "Your request has been submitted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Request could not be submitted.",
    };
  }
}