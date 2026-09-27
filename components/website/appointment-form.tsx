"use client";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";
import { useRef, useState, type FormEvent } from "react";
import { bookingContent } from "@/content/booking";
type Config = { contact_mode: "phone" | "email"; services: { id: string; name: string }[] };
const input = "mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3";
export function AppointmentForm({ config }: { config: Config }) {
  const busy = useRef(false);
  const submission = useRef({ payload: "", id: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || status === "success") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    busy.current = true; setStatus("sending");
    const fields = new FormData(form);
    const payload = JSON.stringify(Object.fromEntries(fields));
    if (submission.current.payload !== payload || !submission.current.id) submission.current = { payload, id: crypto.randomUUID() };
    try {
      const response = await fetch("/api/website/appointments", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fields), submission_id: submission.current.id, contact_permission: fields.get("contact_permission") === "on" }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error(data.error || "We could not confirm your request.");
      trackWebsiteEvent({ event_type: "appointment_submit", label: "Website appointment" });
      form.reset(); setStatus("success"); setMessage(bookingContent.success);
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Please try again."); }
    finally { busy.current = false; }
  }
  return <form onSubmit={submit} className="rounded-2xl border border-stone-200 bg-white p-6">
    <fieldset disabled={status === "sending" || status === "success"} className="space-y-5">
      <legend className="sr-only">Appointment request</legend>
      <label className="block">Name<input name="name" autoComplete="name" required minLength={2} maxLength={100} className={input} /></label>
      <label className="block">Phone {config.contact_mode === "phone" ? "(required)" : "(optional)"}<input name="phone" type="tel" autoComplete="tel" required={config.contact_mode === "phone"} maxLength={30} className={input} /></label>
      <label className="block">Email {config.contact_mode === "email" ? "(required)" : "(optional)"}<input name="email" type="email" autoComplete="email" required={config.contact_mode === "email"} maxLength={254} className={input} /></label>
      <label className="block">Service<select name="service_id" required className={input}><option value="">Choose a service</option>{config.services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>Preferred date<input name="appointment_date" type="date" required className={input} /></label>
        <label>Preferred time<input name="appointment_time" type="time" required className={input} /></label>
      </div>
      <label className="block">Notes (optional)<textarea name="notes" maxLength={2000} rows={4} className={input} /></label>
      <p className="text-sm text-slate-600">{bookingContent.privacy}</p>
      <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="flex gap-3 text-sm"><input type="checkbox" name="contact_permission" required />{bookingContent.permission}</label>
      <button className="rounded-full bg-teal-800 px-6 py-3 font-semibold text-white">{status === "sending" ? "Sending…" : "Request appointment"}</button>
    </fieldset>
    <p role="status" className="mt-5">{message}</p>
  </form>;
}
