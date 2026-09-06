import { createClient } from "@/lib/supabase/server";

export type WebsiteArea = {
  id: string;
  area_name: string;
  city: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export async function getWebsiteAreas() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_areas")
    .select("id, area_name, city, is_active, sort_order, created_at, updated_at")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as WebsiteArea[];
}