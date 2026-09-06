"use client";

import { useState } from "react";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";

export default function TestAppointmentPage() {
  const [message, setMessage] = useState("");

  async function submitAppointment() {
    setMessage("Submitting appointment...");

    const response = await fetch("/api/website/appointments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        customer_name: "Test Appointment",
        customer_phone: "+923001234568",
        customer_email: "appointment@example.com",
        service_id: null,
        appointment_date: "2026-09-10",
        appointment_time: "14:30",
        notes: "This is a test appointment from website.",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Appointment submit failed.");
      return;
    }

    trackWebsiteEvent({
      event_type: "appointment_submit",
      label: "Dev Test Appointment",
      metadata: {
        appointment_id: data.appointment_id,
      },
    });

    setMessage(data.message || "Appointment submitted successfully.");
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Appointment API Test</h1>

      <button
        type="button"
        onClick={submitAppointment}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Submit Test Appointment
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}