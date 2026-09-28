"use client";
import { useEffect } from "react";
import { trackWebsiteEvent, type WebsiteEventType } from "@/lib/website/analytics-client";

// Reuses the existing consent gate; never records phone numbers, emails or URL queries.
export function ClickTracker() {
  useEffect(() => {
    function click(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;
      let url: URL;
      try { url = new URL(link.getAttribute("href") || "", window.location.origin); } catch { return; }
      let type: WebsiteEventType | undefined;
      if (url.protocol === "tel:") type = "call_click";
      else if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) type = "whatsapp_click";
      else if ((url.hostname === "www.google.com" && url.pathname.startsWith("/maps")) || url.hostname === "maps.google.com" || url.hostname === "maps.app.goo.gl") type = "map_click";
      else if (url.origin === window.location.origin && url.pathname === "/book-appointment") type = "booking_click";
      if (type) trackWebsiteEvent({ event_type: type, label: type });
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
