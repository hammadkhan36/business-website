"use client";

import { useEffect } from "react";
import {
  trackOfferClick,
  trackOfferView,
} from "@/lib/website/analytics-client";

type TrackedOfferCardProps = {
  offer: {
    id: string;
    title: string;
    description?: string | null;
    discount_label?: string | null;
    cta_label?: string | null;
    cta_url?: string | null;
    image_url?: string | null;
  };
};

export function TrackedOfferCard({ offer }: TrackedOfferCardProps) {
  useEffect(() => {
    trackOfferView(offer.id, offer.title);
  }, [offer.id, offer.title]);

  return (
    <article className="overflow-hidden rounded-lg border bg-card">
      {offer.image_url && (
        <img
          src={offer.image_url}
          alt={offer.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="space-y-3 p-4">
        {offer.discount_label && (
          <span className="inline-flex rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            {offer.discount_label}
          </span>
        )}

        <div>
          <h3 className="text-lg font-semibold">{offer.title}</h3>

          {offer.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {offer.description}
            </p>
          )}
        </div>

        {offer.cta_url && (
          <a
            href={offer.cta_url}
            onClick={() => trackOfferClick(offer.id, offer.title)}
            className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {offer.cta_label || "View Offer"}
          </a>
        )}
      </div>
    </article>
  );
}