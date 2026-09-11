type AppointmentRequestInput = {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service?: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  page_url?: string;
  referrer?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

type AppointmentRequestResponse = {
  success: boolean;
  id?: string;
  error?: string;
};

function getAdminApiUrl() {
  const url = process.env.NEXT_PUBLIC_ADMIN_API_URL || process.env.ADMIN_API_URL;

  if (!url) {
    throw new Error("Admin API URL is missing.");
  }

  return url.replace(/\/$/, "");
}

export async function submitAppointmentRequest(
  input: AppointmentRequestInput
): Promise<AppointmentRequestResponse> {
  const response = await fetch("/api/website/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = (await response.json().catch(() => null)) as
    | AppointmentRequestResponse
    | null;

  if (!response.ok) {
    return {
      success: false,
      error: data?.error || "Appointment request could not be submitted.",
    };
  }

  return data ?? { success: true };
}

export async function submitAppointmentRequestToAdmin(
  input: AppointmentRequestInput
): Promise<AppointmentRequestResponse> {
  const adminApiUrl = getAdminApiUrl();

  const response = await fetch(`${adminApiUrl}/api/website/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.WEBSITE_CONFIG_API_KEY || "",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as
    | AppointmentRequestResponse
    | null;

  if (!response.ok) {
    return {
      success: false,
      error: data?.error || "Appointment request could not be submitted.",
    };
  }

  return data ?? { success: true };
}