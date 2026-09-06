"use server";

import { redeemCoupon, validateCoupon } from "@/lib/website/coupons";

export async function validateCouponAction(formData: FormData) {
  const code = String(formData.get("code") || "").trim();

  if (!code) {
    return {
      success: false,
      message: "Coupon code is required.",
    };
  }

  try {
    const coupon = await validateCoupon({ code });

    return {
      success: true,
      message: "Coupon is valid.",
      coupon,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Coupon could not be validated.",
    };
  }
}

export async function redeemCouponAction(formData: FormData) {
  const code = String(formData.get("code") || "").trim();

  if (!code) {
    return {
      success: false,
      message: "Coupon code is required.",
    };
  }

  try {
    const coupon = await redeemCoupon({ code });

    return {
      success: true,
      message: "Coupon redeemed successfully.",
      coupon,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Coupon could not be redeemed.",
    };
  }
}