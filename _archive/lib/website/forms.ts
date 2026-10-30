import "server-only";

const adminApiUrl = process.env.ADMIN_API_URL;
const configApiKey = process.env.WEBSITE_CONFIG_API_KEY;

function getFormsConfig() {
  if (!adminApiUrl || !configApiKey) {
    throw new Error("Forms API is not configured.");
  }

  return {
    adminApiUrl,
    configApiKey,
  };
}

export async function getCustomForms() {
  const config = getFormsConfig();

  const response = await fetch(`${config.adminApiUrl}/api/public/forms`, {
    method: "GET",
    headers: {
      "x-api-key": config.configApiKey,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Forms could not be loaded.");
  }

  return data;
}

export async function submitCustomForm(input: {
  form_id: string;
  fields: Record<string, string | number | boolean | null>;
  page_url?: string | null;
}) {
  const config = getFormsConfig();

  const response = await fetch(`${config.adminApiUrl}/api/public/forms/submit`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.configApiKey,
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Form could not be submitted.");
  }

  return data;
}