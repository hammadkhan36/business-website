import { PageFrame } from "@/components/website/page-frame";
import { AppointmentForm } from "@/components/website/appointment-form";
import { getContactConfig } from "@/lib/website/contact-config";
import { bookingContent } from "@/content/booking";
export const dynamic = "force-dynamic";
export const metadata = { title: bookingContent.title, description: bookingContent.introduction };
export default async function BookingPage() {
  const config = await getContactConfig();
  const enabled = process.env.APPOINTMENT_FORM_ENABLED === "true" && Boolean(process.env.WEBSITE_APPOINTMENT_API_KEY && process.env.NEXT_PUBLIC_SITE_URL);
  return <PageFrame><section className="mx-auto max-w-3xl space-y-6 px-5 py-16">
    <h1 className="text-4xl font-semibold">{bookingContent.title}</h1><p className="text-lg leading-8 text-slate-600">{bookingContent.introduction}</p>
    {enabled && config && config.services.length ? <AppointmentForm config={config} /> : <p>{bookingContent.unavailable}</p>}
  </section></PageFrame>;
}
