import { getAdminWebsiteConfig } from "@/lib/website/admin-config";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";

import ClientButtons from "@/components/ClientButtons"; // test ka lia 

export default async function HomePage() {
  const { business, service_areas: areas, faqs, offers, business_hours: hours } =
    await getAdminWebsiteConfig();

  return (
    <main className="p-6">
      <h1>{business?.business_name || "Business Website Starter"}</h1>

      <pre className="mt-6 whitespace-pre-wrap text-xs">
        {JSON.stringify(
          {
            business,
            areas: areas.length,
            faqs: faqs.length,
            offers: offers.length,
            hours: hours.length,
          },
          null,
          2
        )}
      </pre>

      {/* Purani wali saari <a> aur <button> wali div hata di. Ab yeh naya component laga diya: */}
      <ClientButtons
        phone={ "923001234567"}
        whatsapp={ "923001234567"}
        mapUrl="https://maps.google.com/?q=business"
      />


    </main>
  );
}
