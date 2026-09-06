import "server-only";

type AdminApiInput = {
  path: string;
  apiKey: string | undefined;
  body: unknown;
};

function getAdminApiUrl() {
  const origin = process.env.ADMIN_API_URL;

  if (!origin) {
    throw new Error("ADMIN_API_URL is missing.");
  }

  const url = new URL(origin);

  if (
    url.protocol !== "https:" &&
    !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))
  ) {
    throw new Error("ADMIN_API_URL must use HTTPS. HTTP is allowed only for localhost.");
  }

  return origin.replace(/\/$/, "");
}

export async function postAdminApi({ path, apiKey, body }: AdminApiInput) {
  if (!apiKey) {
    throw new Error("Website API key is missing.");
  }

  const response = await fetch(`${getAdminApiUrl()}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data && typeof data.error === "string"
        ? data.error
        : "Request failed.";

    return {
      ok: false as const,
      status: response.status,
      data: { success: false, error: message },
    };
  }

  return {
    ok: true as const,
    status: response.status,
    data,
  };
}