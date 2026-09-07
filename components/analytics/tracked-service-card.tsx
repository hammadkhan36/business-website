"use client";

import { useEffect } from "react";
import {
  trackBookingClick,
  trackServiceClick,
  trackServiceView,
} from "@/lib/website/analytics-client";

type TrackedServiceCardProps = {
  service: {
    id: string;
    name: string;
    description?: string | null;
    price?: number | string | null;
    duration_minutes?: number | null;
  };
  bookingHref?: string;
};

export function TrackedServiceCard({
  service,
  bookingHref = "/appointments",
}: TrackedServiceCardProps) {
  useEffect(() => {
    trackServiceView(service.id, service.name);
  }, [service.id, service.name]);

  return (
    <article
      className="rounded-lg border bg-card p-4"
      onClick={() => trackServiceClick(service.id, service.name)}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{service.name}</h3>

        {service.description && (
          <p className="text-sm text-muted-foreground">
            {service.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {service.price !== null && service.price !== undefined && (
            <span className="rounded-md bg-muted px-2 py-1">
              Price: {service.price}
            </span>
          )}

          {service.duration_minutes && (
            <span className="rounded-md bg-muted px-2 py-1">
              {service.duration_minutes} min
            </span>
          )}
        </div>
      </div>

      <a
        href={`${bookingHref}?service=${service.id}`}
        onClick={(event) => {
          event.stopPropagation();
          trackBookingClick(service.id, service.name);
        }}
        className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Book This Service
      </a>
    </article>
  );
}