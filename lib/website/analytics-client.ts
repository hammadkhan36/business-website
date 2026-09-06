// "use client";

// type WebsiteEventType =
//   | "page_view"
//   | "call_click"
//   | "whatsapp_click"
//   | "map_click"
//   | "booking_click"
//   | "lead_submit"
//   | "appointment_submit"
//   | "coupon_validate"
//   | "coupon_redeem"
//   | "review_submit"
//   | "form_submit";

// type TrackEventInput = {
//   event_type: WebsiteEventType;
//   path?: string;
//   label?: string;
//   metadata?: Record<string, unknown>;
// };

// function getOrCreateId(storage: Storage, key: string) {
//   const existing = storage.getItem(key);

//   if (existing) return existing;

//   const id = crypto.randomUUID();
//   storage.setItem(key, id);
//   return id;
// }

// function getReferrerDomain() {
//   if (!document.referrer) return null;

//   try {
//     return new URL(document.referrer).hostname;
//   } catch {
//     return null;
//   }
// }

// function getUtmMetadata() {
//   const params = new URLSearchParams(window.location.search);

//   return {
//     utm_source: params.get("utm_source"),
//     utm_medium: params.get("utm_medium"),
//     utm_campaign: params.get("utm_campaign"),
//   };
// }

// export function trackWebsiteEvent(input: TrackEventInput) {
//   const visitorId = getOrCreateId(
//     window.localStorage,
//     "website_analytics_visitor_id"
//   );

//   const sessionId = getOrCreateId(
//     window.sessionStorage,
//     "website_analytics_session_id"
//   );

//   void fetch("/api/analytics/events", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({
//       event_type: input.event_type,
//       path: input.path || window.location.pathname,
//       label: input.label || null,
//       metadata: {
//         ...getUtmMetadata(),
//         ...(input.metadata || {}),
//       },
//       visitor_id: visitorId,
//       session_id: sessionId,
//       referrer_domain: getReferrerDomain(),
//     }),
//     keepalive: true,
//   });
// }












"use client";

export type WebsiteEventType =
  | "page_view"
  | "call_click"
  | "whatsapp_click"
  | "map_click"
  | "booking_click"
  | "lead_submit"
  | "appointment_submit"
  | "coupon_validate"
  | "coupon_redeem"
  | "review_submit"
  | "form_submit";

type TrackWebsiteEventInput = {
  event_type: WebsiteEventType;
  path?: string;
  label?: string | null;
  metadata?: Record<string, unknown>;
};

const VISITOR_KEY = "website_analytics_visitor_id";
const SESSION_KEY = "website_analytics_session_id";

function getOrCreateId(storage: Storage, key: string) {
  const existing = storage.getItem(key);
  if (existing) return existing;

  const value = crypto.randomUUID();
  storage.setItem(key, value);
  return value;
}

function getReferrerDomain() {
  if (!document.referrer) return null;

  try {
    return new URL(document.referrer).hostname;
  } catch {
    return null;
  }
}

function getUtmMetadata() {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
}

export function trackWebsiteEvent(input: TrackWebsiteEventInput) {
  const path = input.path || `${window.location.pathname}${window.location.search}`;

  void fetch("/api/analytics/events", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      event_type: input.event_type,
      path,
      label: input.label ?? null,
      metadata: {
        ...getUtmMetadata(),
        ...(input.metadata || {}),
      },
      visitor_id: getOrCreateId(window.localStorage, VISITOR_KEY),
      session_id: getOrCreateId(window.sessionStorage, SESSION_KEY),
      referrer_domain: getReferrerDomain(),
    }),
    keepalive: true,
  });
}
