import { createClient } from "@/lib/supabase/server";

export type WebsiteService = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  show_on_website: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export async function getWebsiteServices() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select(
      "id, name, description, price, duration_minutes, show_on_website, is_active, sort_order, created_at, updated_at"
    )
    .eq("is_active", true)
    .eq("show_on_website", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as WebsiteService[];
}