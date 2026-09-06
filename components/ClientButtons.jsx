'use client';  // <-- YEH SAB SE ZAROORI HAI

import { trackWebsiteEvent } from "@/lib/website/analytics-client";

export default function ClientButtons({ phone, whatsapp, mapUrl }) {
  return (
    <div className="mt-6 space-x-4">
      <a
        href={`tel:${phone}`}
        onClick={() =>
          trackWebsiteEvent({
            event_type: "call_click",
            label: "Header Call Button",
          })
        }
      >
        Call Now
      </a>

      <a
        href={`https://wa.me/${whatsapp}`}
        onClick={() =>
          trackWebsiteEvent({
            event_type: "whatsapp_click",
            label: "Hero WhatsApp Button",
          })
        }
      >
        WhatsApp
      </a>

      <a
        href={mapUrl}
        onClick={() =>
          trackWebsiteEvent({
            event_type: "map_click",
            label: "Contact Map Button",
          })
        }
      >
        Get Directions
      </a>

      <button
        type="button"
        onClick={() =>
          trackWebsiteEvent({
            event_type: "booking_click",
            label: "Hero Book Now Button",
          })
        }
      >
        Book Now
      </button>
    </div>
  );
}