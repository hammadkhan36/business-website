import "server-only";
export type ContactConfig = { contact_mode: "phone" | "email"; services: { id: string; name: string }[] };
export async function getContactConfig(): Promise<ContactConfig | null> {
  try {
    const key = process.env.WEBSITE_CONFIG_API_KEY;
    const origin = new URL(process.env.ADMIN_API_URL || "");
    if (!key || (origin.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(origin.hostname))) return null;
    const response = await fetch(new URL("/api/public/contact-config", origin), {
      headers: { "x-api-key": key }, cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!["phone", "email"].includes(data.contact_mode) || !Array.isArray(data.services)) return null;
    if (!data.services.every((s: { id?: unknown; name?: unknown }) => typeof s.id === "string" && typeof s.name === "string")) return null;
    return data as ContactConfig;
  } catch { return null; }
}
