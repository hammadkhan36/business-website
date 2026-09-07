"use client";

import Link from "next/link";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";
import { ANALYTICS_EVENTS, ANALYTICS_LABELS } from "@/lib/website/analytics-events";

export function TrackedBookLink() {
  return (
    <Link
      href="/book"
      onClick={() =>
        trackWebsiteEvent({
          event_type: ANALYTICS_EVENTS.bookingClick,
          label: ANALYTICS_LABELS.heroBooking,
        })
      }
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
    >
      Book Now
    </Link>
  );
}