"use client";

import {
  Copy,
  ExternalLink,
  MapPin,
  Phone,
  Share2,
  MessageCircle,
} from "lucide-react";
import {
  trackCallClick,
  trackCopyPhoneClick,
  trackMapClick,
  trackShareClick,
  trackWebsiteClick,
  trackWhatsAppClick,
} from "@/lib/website/analytics-client";

type ContactActionsProps = {
  phone?: string | null;
  whatsapp?: string | null;
  website?: string | null;
  address?: string | null;
  mapUrl?: string | null;
};

export function ContactActions({
  phone,
  whatsapp,
  website,
  address,
  mapUrl,
}: ContactActionsProps) {
  const cleanPhone = phone?.trim() || "";
  const cleanWhatsapp = whatsapp?.trim() || cleanPhone;
  const cleanWebsite = website?.trim() || "";
  const directionsUrl =
    mapUrl ||
    (address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : "");

  async function copyPhone() {
    if (!cleanPhone) return;

    await navigator.clipboard.writeText(cleanPhone);
    trackCopyPhoneClick(cleanPhone);
  }

  async function shareBusiness() {
    trackShareClick("Native Share");

    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {cleanPhone && (
        <a
          href={`tel:${cleanPhone}`}
          onClick={() => trackCallClick(cleanPhone)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      )}

      {cleanWhatsapp && (
        <a
          href={`https://wa.me/${cleanWhatsapp.replace(/[^\d]/g, "")}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick(cleanWhatsapp)}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      )}

      {directionsUrl && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackMapClick("Directions Button")}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <MapPin className="h-4 w-4" />
          Directions
        </a>
      )}

      {cleanWebsite && (
        <a
          href={cleanWebsite}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWebsiteClick(cleanWebsite)}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <ExternalLink className="h-4 w-4" />
          Website
        </a>
      )}

      {cleanPhone && (
        <button
          type="button"
          onClick={copyPhone}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <Copy className="h-4 w-4" />
          Copy Phone
        </button>
      )}

      <button
        type="button"
        onClick={shareBusiness}
        className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}