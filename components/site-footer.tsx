import Link from "next/link";
import type { WebsiteBusiness } from "@/lib/website/business";

export function SiteFooter({ business }: { business: WebsiteBusiness | null }) {
  const name = business?.business_name || "Business";

  return (
    <footer className="border-t bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="font-bold">{name}</h2>
          <p className="mt-2 text-sm text-slate-300">
            Professional local business services you can trust.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <Link href="/services">Services</Link>
            <Link href="/areas">Service Areas</Link>
            <Link href="/offers">Offers</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            {business?.contact_phone && <a href={`tel:${business.contact_phone}`}>{business.contact_phone}</a>}
            {business?.contact_email && <a href={`mailto:${business.contact_email}`}>{business.contact_email}</a>}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );
}