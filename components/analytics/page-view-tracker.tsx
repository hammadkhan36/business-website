"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  getAnalyticsConsent,
  trackWebsiteEvent,
} from "@/lib/website/analytics-client";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    function send() {
      if (getAnalyticsConsent() !== "accepted") {
        lastPath.current = null;
        return;
      }

      if (!pathname || lastPath.current === pathname) {
        return;
      }

      trackWebsiteEvent({
        event_type: "page_view",
        path: pathname,
      });

      lastPath.current = pathname;
    }

    send();

    window.addEventListener(
      "website-analytics-consent-change",
      send
    );
    window.addEventListener("storage", send);

    return () => {
      window.removeEventListener(
        "website-analytics-consent-change",
        send
      );
      window.removeEventListener("storage", send);
    };
  }, [pathname]);

  return null;
}
