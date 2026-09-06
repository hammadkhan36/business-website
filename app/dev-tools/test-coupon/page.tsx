"use client";

import { useState } from "react";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";

export default function TestCouponPage() {
  const [message, setMessage] = useState("");

  async function validateCoupon() {
    setMessage("Validating coupon...");

    const response = await fetch("/api/website/coupons/validate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        code: "Habb11",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Coupon validation failed.");
      return;
    }

    trackWebsiteEvent({
      event_type: "coupon_validate",
      label: "Dev Test Coupon Validate",
      metadata: {
        code: data.coupon?.code,
      },
    });

    setMessage(data.message || "Coupon is valid.");
  }

  async function redeemCoupon() {
    setMessage("Redeeming coupon...");

    const response = await fetch("/api/website/coupons/redeem", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        code: "Habb11",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Coupon redeem failed.");
      return;
    }

    trackWebsiteEvent({
      event_type: "coupon_redeem",
      label: "Dev Test Coupon Redeem",
      metadata: {
        code: data.code,
        used_count: data.used_count,
      },
    });

    setMessage(data.message || "Coupon redeemed successfully.");
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Coupon API Test</h1>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={validateCoupon}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Validate Coupon
        </button>

        <button
          type="button"
          onClick={redeemCoupon}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Redeem Coupon
        </button>
      </div>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}