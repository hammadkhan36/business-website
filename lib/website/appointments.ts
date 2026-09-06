import "server-only";

const adminApiUrl = process.env.ADMIN_API_URL;
const appointmentApiKey = process.env.WEBSITE_APPOINTMENT_API_KEY;

function getAppointmentConfig() {
  if (!adminApiUrl || !appointmentApiKey) {
    throw new Error("Appointment API is not configured.");
  }

  return {
    adminApiUrl,
    appointmentApiKey,
  };
}

export async function getAppointmentSlots(input: {
  date: string;
  serviceId?: string | null;
}) {
  const config = getAppointmentConfig();

  const params = new URLSearchParams({
    date: input.date,
  });

  if (input.serviceId) {
    params.set("serviceId", input.serviceId);
  }

  const response = await fetch(
    `${config.adminApiUrl}/api/public/appointments/slots?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "x-api-key": config.appointmentApiKey,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Appointment slots could not be loaded.");
  }

  return data;
}

export async function submitAppointment(input: {
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  service_id?: string | null;
  appointment_date: string;
  appointment_time: string;
  notes?: string | null;
}) {
  const config = getAppointmentConfig();

  const response = await fetch(`${config.adminApiUrl}/api/public/appointments`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.appointmentApiKey,
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Appointment could not be submitted.");
  }

  return data;
}