import { createClient } from "@/lib/supabase/server";

export type WebsiteBusiness = {
  id: string;
  business_name: string | null;
  short_name: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  theme_color: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  social_links: Record<string, unknown>;
  updated_at: string;
};

export async function getWebsiteBusiness() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("business_settings")
    .select(
      "id, business_name, short_name, logo_url, favicon_url, theme_color, contact_email, contact_phone, address, social_links, updated_at"
    )
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data as WebsiteBusiness | null;
}