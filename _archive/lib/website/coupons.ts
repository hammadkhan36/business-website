import "server-only";

const adminApiUrl = process.env.ADMIN_API_URL;
const configApiKey = process.env.WEBSITE_CONFIG_API_KEY;

function getCouponConfig() {
  if (!adminApiUrl || !configApiKey) {
    throw new Error("Coupon API is not configured.");
  }

  return {
    adminApiUrl,
    configApiKey,
  };
}

export async function validateCoupon(input: {
  code: string;
}) {
  const config = getCouponConfig();

  const response = await fetch(`${config.adminApiUrl}/api/public/coupons/validate`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.configApiKey,
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Coupon could not be validated.");
  }

  return data;
}

export async function redeemCoupon(input: {
  code: string;
}) {
  const config = getCouponConfig();

  const response = await fetch(`${config.adminApiUrl}/api/public/coupons/redeem`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.configApiKey,
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Coupon could not be redeemed.");
  }

  return data;
}