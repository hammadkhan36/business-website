import { createClient } from "@/lib/supabase/server";

export type WebsiteService = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  is_active: boolean | null;
};

export async function getWebsiteServices() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("id, name, slug, description, price, duration_minutes, is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as WebsiteService[];
}