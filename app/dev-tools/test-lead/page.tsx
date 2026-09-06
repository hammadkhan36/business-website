"use client";

import { useState } from "react";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";

export default function TestLeadPage() {
  const [message, setMessage] = useState("");

  async function submitLead() {
    setMessage("Submitting lead...");

    const response = await fetch("/api/website/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test Lead",
        phone: "+923001234567",
        email: "test@example.com",
        service: "Website Test Service",
        message: "This is a test lead from business website.",
        page_url: window.location.href,
        referrer: document.referrer,
        utm_source: "dev-test",
        utm_medium: "local",
        utm_campaign: "api-test",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Lead submit failed.");
      return;
    }

    trackWebsiteEvent({
      event_type: "lead_submit",
      label: "Dev Test Lead",
      metadata: {
        lead_id: data.lead_id,
      },
    });

    setMessage(data.message || "Lead submitted successfully.");
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Lead API Test</h1>

      <button
        type="button"
        onClick={submitLead}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Submit Test Lead
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}