"use server";

import { submitReview } from "@/lib/website/reviews";

export async function submitReviewAction(formData: FormData) {
  const customer_name = String(formData.get("customer_name") || "").trim();
  const customer_email = String(formData.get("customer_email") || "").trim() || null;
  const rating = Number(formData.get("rating") || 0);
  const comment = String(formData.get("comment") || "").trim();

  if (!customer_name || !rating || !comment) {
    return {
      success: false,
      message: "Name, rating and comment are required.",
    };
  }

  if (rating < 1 || rating > 5) {
    return {
      success: false,
      message: "Rating must be between 1 and 5.",
    };
  }

  try {
    await submitReview({
      customer_name,
      customer_email,
      rating,
      comment,
    });

    return {
      success: true,
      message: "Review submitted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Review could not be submitted.",
    };
  }
}