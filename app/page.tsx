import { getAdminWebsiteConfig } from "@/lib/website/admin-config";

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
    </main>
  );
}
