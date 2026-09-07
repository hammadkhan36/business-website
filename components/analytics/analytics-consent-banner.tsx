"use client";

import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackWebsiteEvent,
} from "@/lib/website/analytics-client";

export function AnalyticsConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(getAnalyticsConsent() === "unknown");
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-lg border bg-background p-4 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Website experience tracking</p>
          <p className="text-xs text-muted-foreground">
            We use basic analytics to understand visits, clicks and form activity.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            onClick={() => {
              setAnalyticsConsent("rejected");
              setShowBanner(false);
            }}
          >
            Reject
          </button>

          <button
            type="button"
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
            onClick={() => {
              setAnalyticsConsent("accepted");
              setShowBanner(false);

              trackWebsiteEvent({
                event_type: "page_view",
                label: "Consent Accepted",
              });
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}