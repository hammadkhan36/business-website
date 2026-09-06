import { getWebsiteBusiness } from "@/lib/website/business";
import { getWebsiteAreas } from "@/lib/website/areas";
import { getWebsiteFaqs } from "@/lib/website/faqs";
import { getWebsiteOffers } from "@/lib/website/offers";
import { getWebsiteBusinessHours } from "@/lib/website/hours";

export default async function HomePage() {
  const [business, areas, faqs, offers, hours] = await Promise.all([
    getWebsiteBusiness(),
    getWebsiteAreas(),
    getWebsiteFaqs(),
    getWebsiteOffers(),
    getWebsiteBusinessHours(),
  ]);

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