import "server-only";

const adminApiUrl = process.env.ADMIN_API_URL;
const leadApiKey = process.env.WEBSITE_LEAD_API_KEY;

export async function submitLead(input: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  page_url?: string;
}) {
  if (!adminApiUrl || !leadApiKey) {
    throw new Error("Lead API is not configured.");
  }

  const response = await fetch(`${adminApiUrl}/api/public/leads`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": leadApiKey,
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Lead could not be submitted.");
  }

  return data;
}