import { submitAppointment } from "@/lib/website/appointments";

async function createTestAppointment() {
  "use server";

  await submitAppointment({
    customer_name: "Appointment Test User",
    customer_phone: "03001234568",
    customer_email: "appointment-test@example.com",
    service_id: null,
    appointment_date: "2026-09-10",
    appointment_time: "11:00",
    notes: "Testing appointment from website.",
  });
}

export default function TestAppointmentPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Appointment API Test</h1>

      <form action={createTestAppointment} className="mt-4">
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Create Test Appointment
        </button>
      </form>
    </main>
  );
}