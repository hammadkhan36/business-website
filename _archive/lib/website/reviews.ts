import "server-only";

const adminApiUrl = process.env.ADMIN_API_URL;
const configApiKey = process.env.WEBSITE_CONFIG_API_KEY;

function getReviewConfig() {
  if (!adminApiUrl || !configApiKey) {
    throw new Error("Review API is not configured.");
  }

  return {
    adminApiUrl,
    configApiKey,
  };
}

export async function submitReview(input: {
  customer_name: string;
  customer_email?: string | null;
  rating: number;
  comment: string;
}) {
  const config = getReviewConfig();

  const response = await fetch(`${config.adminApiUrl}/api/public/reviews`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.configApiKey,
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Review could not be submitted.");
  }

  return data;
}