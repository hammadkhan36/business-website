import { createClient } from "@/lib/supabase/server";

export type WebsiteOffer = {
  id: string;
  title: string;
  description: string | null;
  discount_label: string | null;
  starts_at: string | null;
  ends_at: string | null;
  cta_label: string | null;
  cta_url: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export async function getWebsiteOffers() {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("offers")
    .select(
      "id, title, description, discount_label, starts_at, ends_at, cta_label, cta_url, image_url, is_active, sort_order, created_at, updated_at"
    )
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${today}`)
    .or(`ends_at.is.null,ends_at.gte.${today}`)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as WebsiteOffer[];
}