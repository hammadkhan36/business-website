"use client";

import { useState } from "react";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";

export default function TestFormPage() {
  const [message, setMessage] = useState("");

  async function submitForm() {
    setMessage("Submitting form...");

    const response = await fetch("/api/website/forms/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        form_slug: "contact",
        page_url: window.location.href,
        referrer: document.referrer,
        data: {
          name: "Test Form User",
          phone: "+923001234570",
          email: "form@example.com",
          message: "This is a test custom form submission.",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Form submit failed.");
      return;
    }

    trackWebsiteEvent({
      event_type: "form_submit",
      label: "Dev Test Custom Form",
      metadata: {
        form_slug: "contact",
        submission_id: data.submission_id,
      },
    });

    setMessage(data.message || "Form submitted successfully.");
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Custom Form API Test</h1>

      <button
        type="button"
        onClick={submitForm}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Submit Test Form
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}