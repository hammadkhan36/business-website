import Link from "next/link";
import type { WebsiteBusiness } from "@/lib/website/business";

export function SiteHeader({ business }: { business: WebsiteBusiness | null }) {
  const name = business?.short_name || business?.business_name || "Business";

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          {business?.logo_url ? (
            <img
              src={business.logo_url}
              alt={name}
              className="h-9 w-9 rounded-md object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white">
              {name.charAt(0)}
            </span>
          )}
          <span>{name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/services">Services</Link>
          <Link href="/areas">Areas</Link>
          <Link href="/offers">Offers</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link
          href="/book"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}