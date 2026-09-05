import { createClient } from "@/lib/supabase/server";

export type WebsiteOffer = {
  id: string;
  title: string;
  description: string | null;
  code: string | null;
  is_active: boolean | null;
  starts_at: string | null;
  ends_at: string | null;
};

export async function getWebsiteOffers() {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("offers")
    .select("id, title, description,  is_active, starts_at, ends_at")
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("created_at", { ascending: false });
// code,
  if (error) throw new Error(error.message);

  return data ?? [];
}