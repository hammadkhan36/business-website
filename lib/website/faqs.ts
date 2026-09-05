import { createClient } from "@/lib/supabase/server";

export type WebsiteFaq = {
  id: string;
  question: string;
  answer: string;
  is_active: boolean | null;
};

export async function getWebsiteFaqs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("faqs")
    .select("id, question, answer, is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}