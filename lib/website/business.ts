import { createClient } from "@/lib/supabase/server";

export type WebsiteBusiness = {
  business_name: string;
  short_name: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  theme_color: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

export async function getWebsiteBusiness(): Promise<WebsiteBusiness | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("business_settings")
    .select(
      "business_name, short_name, logo_url, favicon_url, theme_color, contact_email, contact_phone"
    )
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}