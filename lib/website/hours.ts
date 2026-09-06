import { createClient } from "@/lib/supabase/server";

export type WebsiteBusinessHour = {
  id: string;
  day_of_week: number;
  day_name: string;
  opens_at: string | null;
  closes_at: string | null;
  is_closed: boolean;
  is_24h: boolean;
  updated_at: string;
};

export async function getWebsiteBusinessHours() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("business_hours")
    .select("id, day_of_week, day_name, opens_at, closes_at, is_closed, is_24h, updated_at")
    .order("day_of_week", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []) as WebsiteBusinessHour[];
}