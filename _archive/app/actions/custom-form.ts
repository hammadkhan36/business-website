"use server";

import { submitCustomForm } from "@/lib/website/forms";

export async function submitCustomFormAction(formData: FormData) {
  const form_id = String(formData.get("form_id") || "").trim();

  if (!form_id) {
    return {
      success: false,
      message: "Form id is required.",
    };
  }

  const fields: Record<string, string> = {};

  formData.forEach((value, key) => {
    if (key !== "form_id" && typeof value === "string") {
      fields[key] = value;
    }
  });

  try {
    await submitCustomForm({
      form_id,
      fields,
    });

    return {
      success: true,
      message: "Form submitted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Form could not be submitted.",
    };
  }
}