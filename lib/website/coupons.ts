import { createClient } from "@/lib/supabase/server";

export type WebsiteCoupon = {
  id: string;
  code: string;
  title: string;
  description: string | null;
  discount_type: "percent" | "fixed";
  discount_value: number;
  starts_at: string | null;
  ends_at: string | null;
  usage_limit: number | null;
  used_count: number;
  is_active: boolean;
};

export async function getValidCoupon(code: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("coupons")
    .select(
      "id, code, title, description, discount_type, discount_value, starts_at, ends_at, usage_limit, used_count, is_active"
    )
    .eq("code", code.trim().toUpperCase())
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${today}`)
    .or(`ends_at.is.null,ends_at.gte.${today}`)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const coupon = data as WebsiteCoupon;

  if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit) {
    return null;
  }

  return coupon;
}