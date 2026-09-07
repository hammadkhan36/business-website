"use client";

import { useState } from "react";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";

export default function TestReviewPage() {
  const [message, setMessage] = useState("");

  async function submitReview() {
    setMessage("Submitting review...");

    const response = await fetch("/api/website/reviews", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        customer_name: "Test Review User",
        customer_phone: "+923001234569",
        customer_email: "review@example.com",
        rating: 5,
        title: "Great service",
        comment: "This is a test review from website.",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Review submit failed.");
      return;
    }

    trackWebsiteEvent({
      event_type: "review_submit",
      label: "Dev Test Review",
      metadata: {
        review_id: data.review_id,
      },
    });

    setMessage(data.message || "Review submitted successfully.");
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Review API Test</h1>

      <button
        type="button"
        onClick={submitReview}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Submit Test Review
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}