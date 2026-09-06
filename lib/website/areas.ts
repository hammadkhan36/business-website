import { createClient } from "@/lib/supabase/server";
import { websiteConfig } from "@/lib/website/config";

export type WebsiteArea = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  is_active: boolean | null;
  updated_at: string | null;
  created_at: string | null;
};

function withBusinessFilter(query: any) {
  if (!websiteConfig.businessId) return query;
  return query.eq("business_id", websiteConfig.businessId);
}

export async function getWebsiteAreas() {
  const supabase = await createClient();

  let query = supabase
    .from("service_areas")
    .select("id, name, slug, description, is_active, updated_at, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  query = withBusinessFilter(query);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []) as WebsiteArea[];
}

export async function getWebsiteAreaBySlug(slug: string) {
  const supabase = await createClient();

  let query = supabase
    .from("service_areas")
    .select("id, name, slug, description, is_active, updated_at, created_at")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  query = withBusinessFilter(query);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data as WebsiteArea | null;
}