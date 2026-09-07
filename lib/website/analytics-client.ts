"use client";

export type WebsiteEventType =
  | "page_view"
  | "session_start"
  | "session_end"
  | "engagement_ping"
  | "call_click"
  | "whatsapp_click"
  | "map_click"
  | "booking_click"
  | "website_click"
  | "social_click"
  | "share_click"
  | "copy_phone_click"
  | "lead_form_start"
  | "lead_submit"
  | "lead_form_error"
  | "lead_form_abandon"
  | "appointment_form_start"
  | "appointment_submit"
  | "appointment_form_error"
  | "appointment_form_abandon"
  | "custom_form_start"
  | "form_submit"
  | "custom_form_error"
  | "custom_form_abandon"
  | "coupon_validate"
  | "coupon_redeem"
  | "offer_view"
  | "offer_click"
  | "service_view"
  | "service_click"
  | "review_form_start"
  | "review_submit"
  | "review_form_error";

type ConsentStatus = "accepted" | "rejected" | "unknown";

type TrackWebsiteEventInput = {
  event_type: WebsiteEventType;
  path?: string;
  label?: string | null;
  metadata?: Record<string, unknown>;
  business_id?: string | null;
  engagement_ms?: number | null;
  service_id?: string | null;
  service_name?: string | null;
  offer_id?: string | null;
  offer_title?: string | null;
  form_id?: string | null;
  form_name?: string | null;
  coupon_code?: string | null;
};

const VISITOR_KEY = "website_analytics_visitor_id";
const SESSION_KEY = "website_analytics_session_id";
const SESSION_STARTED_KEY = "website_analytics_session_started";
const CONSENT_KEY = "website_analytics_consent";

function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "unknown";

  const saved = window.localStorage.getItem(CONSENT_KEY);

  if (saved === "accepted" || saved === "rejected") {
    return saved;
  }

  return "unknown";
}

export function setAnalyticsConsent(value: ConsentStatus) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
}

export function getAnalyticsConsent() {
  return getConsentStatus();
}

function shouldTrack() {
  const consent = getConsentStatus();
  return consent !== "rejected";
}

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

function getUtmValue(key: string) {
  return new URLSearchParams(window.location.search).get(key);
}

function getDeviceType() {
  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";

  return "desktop";
}

function getBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  if (ua.includes("Firefox/")) return "Firefox";

  return "Other";
}

function getOS() {
  const ua = navigator.userAgent;

  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";

  return "Other";
}

function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}`;
}

export function trackWebsiteEvent(input: TrackWebsiteEventInput) {
  if (typeof window === "undefined") return;
  if (!shouldTrack()) return;

  const path = input.path || getCurrentPath();
  const visitorId = getOrCreateId(window.localStorage, VISITOR_KEY);
  const sessionId = getOrCreateId(window.sessionStorage, SESSION_KEY);

  void fetch("/api/analytics/events", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      event_type: input.event_type,
      path,
      label: input.label ?? null,
      metadata: input.metadata ?? {},

      business_id: input.business_id ?? process.env.NEXT_PUBLIC_BUSINESS_ID ?? null,

      visitor_id: visitorId,
      session_id: sessionId,

      page_title: document.title || null,
      hostname: window.location.hostname,
      referrer_url: document.referrer || null,
      referrer_domain: getReferrerDomain(),

      utm_source: getUtmValue("utm_source"),
      utm_medium: getUtmValue("utm_medium"),
      utm_campaign: getUtmValue("utm_campaign"),
      utm_term: getUtmValue("utm_term"),
      utm_content: getUtmValue("utm_content"),

      device_type: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),

      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,

      language: navigator.language || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      engagement_ms: input.engagement_ms ?? null,

      service_id: input.service_id ?? null,
      service_name: input.service_name ?? null,

      offer_id: input.offer_id ?? null,
      offer_title: input.offer_title ?? null,

      form_id: input.form_id ?? null,
      form_name: input.form_name ?? null,

      coupon_code: input.coupon_code ?? null,
      consent_status: getConsentStatus(),
    }),
    keepalive: true,
  }).catch(() => {
    // Analytics should never break the website experience.
  });
}

export function trackSessionStart() {
  if (typeof window === "undefined") return;

  const alreadyStarted = window.sessionStorage.getItem(SESSION_STARTED_KEY);

  if (alreadyStarted) return;

  window.sessionStorage.setItem(SESSION_STARTED_KEY, "true");

  trackWebsiteEvent({
    event_type: "session_start",
    label: "Session Started",
  });
}

export function trackEngagement(engagementMs: number) {
  trackWebsiteEvent({
    event_type: "engagement_ping",
    label: "Engagement Time",
    engagement_ms: engagementMs,
  });
}

export function trackSessionEnd(engagementMs: number) {
  trackWebsiteEvent({
    event_type: "session_end",
    label: "Session Ended",
    engagement_ms: engagementMs,
  });
}

export function trackCallClick(phone?: string | null, label = "Call Button") {
  trackWebsiteEvent({
    event_type: "call_click",
    label,
    metadata: { phone: phone || null },
  });
}

export function trackWhatsAppClick(phone?: string | null, label = "WhatsApp Button") {
  trackWebsiteEvent({
    event_type: "whatsapp_click",
    label,
    metadata: { phone: phone || null },
  });
}

export function trackMapClick(label = "Map Directions") {
  trackWebsiteEvent({
    event_type: "map_click",
    label,
  });
}

export function trackBookingClick(serviceId?: string | null, serviceName?: string | null) {
  trackWebsiteEvent({
    event_type: "booking_click",
    label: "Booking Button",
    service_id: serviceId ?? null,
    service_name: serviceName ?? null,
  });
}

export function trackWebsiteClick(url?: string | null) {
  trackWebsiteEvent({
    event_type: "website_click",
    label: "External Website Click",
    metadata: { url: url || null },
  });
}

export function trackSocialClick(platform: string, url?: string | null) {
  trackWebsiteEvent({
    event_type: "social_click",
    label: platform,
    metadata: { platform, url: url || null },
  });
}

export function trackShareClick(platform?: string | null) {
  trackWebsiteEvent({
    event_type: "share_click",
    label: platform || "Share Button",
    metadata: { platform: platform || null },
  });
}

export function trackCopyPhoneClick(phone?: string | null) {
  trackWebsiteEvent({
    event_type: "copy_phone_click",
    label: "Copy Phone",
    metadata: { phone: phone || null },
  });
}

export function trackServiceView(serviceId?: string | null, serviceName?: string | null) {
  trackWebsiteEvent({
    event_type: "service_view",
    label: serviceName || "Service Viewed",
    service_id: serviceId ?? null,
    service_name: serviceName ?? null,
  });
}

export function trackServiceClick(serviceId?: string | null, serviceName?: string | null) {
  trackWebsiteEvent({
    event_type: "service_click",
    label: serviceName || "Service Clicked",
    service_id: serviceId ?? null,
    service_name: serviceName ?? null,
  });
}

export function trackOfferView(offerId?: string | null, offerTitle?: string | null) {
  trackWebsiteEvent({
    event_type: "offer_view",
    label: offerTitle || "Offer Viewed",
    offer_id: offerId ?? null,
    offer_title: offerTitle ?? null,
  });
}

export function trackOfferClick(offerId?: string | null, offerTitle?: string | null) {
  trackWebsiteEvent({
    event_type: "offer_click",
    label: offerTitle || "Offer Clicked",
    offer_id: offerId ?? null,
    offer_title: offerTitle ?? null,
  });
}

export function trackLeadFormStart(formName = "Lead Form") {
  trackWebsiteEvent({
    event_type: "lead_form_start",
    label: formName,
    form_name: formName,
  });
}

export function trackLeadSubmit(metadata?: Record<string, unknown>) {
  trackWebsiteEvent({
    event_type: "lead_submit",
    label: "Lead Form Submitted",
    metadata,
  });
}

export function trackLeadFormError(error: string, formName = "Lead Form") {
  trackWebsiteEvent({
    event_type: "lead_form_error",
    label: formName,
    form_name: formName,
    metadata: { error },
  });
}

export function trackLeadFormAbandon(formName = "Lead Form") {
  trackWebsiteEvent({
    event_type: "lead_form_abandon",
    label: formName,
    form_name: formName,
  });
}

export function trackAppointmentFormStart(formName = "Appointment Form") {
  trackWebsiteEvent({
    event_type: "appointment_form_start",
    label: formName,
    form_name: formName,
  });
}

export function trackAppointmentSubmit(metadata?: Record<string, unknown>) {
  trackWebsiteEvent({
    event_type: "appointment_submit",
    label: "Appointment Form Submitted",
    metadata,
  });
}

export function trackAppointmentFormError(error: string, formName = "Appointment Form") {
  trackWebsiteEvent({
    event_type: "appointment_form_error",
    label: formName,
    form_name: formName,
    metadata: { error },
  });
}

export function trackAppointmentFormAbandon(formName = "Appointment Form") {
  trackWebsiteEvent({
    event_type: "appointment_form_abandon",
    label: formName,
    form_name: formName,
  });
}

export function trackCustomFormStart(formId?: string | null, formName?: string | null) {
  trackWebsiteEvent({
    event_type: "custom_form_start",
    label: formName || "Custom Form Started",
    form_id: formId ?? null,
    form_name: formName ?? null,
  });
}

export function trackFormSubmit(
  formName?: string | null,
  metadata?: Record<string, unknown>,
  formId?: string | null
) {
  trackWebsiteEvent({
    event_type: "form_submit",
    label: formName || "Custom Form Submitted",
    form_id: formId ?? null,
    form_name: formName ?? null,
    metadata,
  });
}

export function trackCustomFormError(
  error: string,
  formName?: string | null,
  formId?: string | null
) {
  trackWebsiteEvent({
    event_type: "custom_form_error",
    label: formName || "Custom Form Error",
    form_id: formId ?? null,
    form_name: formName ?? null,
    metadata: { error },
  });
}

export function trackCustomFormAbandon(formName?: string | null, formId?: string | null) {
  trackWebsiteEvent({
    event_type: "custom_form_abandon",
    label: formName || "Custom Form Abandoned",
    form_id: formId ?? null,
    form_name: formName ?? null,
  });
}

export function trackCouponValidate(code?: string | null) {
  trackWebsiteEvent({
    event_type: "coupon_validate",
    label: "Coupon Validated",
    coupon_code: code ?? null,
  });
}

export function trackCouponRedeem(code?: string | null) {
  trackWebsiteEvent({
    event_type: "coupon_redeem",
    label: "Coupon Redeemed",
    coupon_code: code ?? null,
  });
}

export function trackReviewFormStart() {
  trackWebsiteEvent({
    event_type: "review_form_start",
    label: "Review Form Started",
  });
}

export function trackReviewSubmit(metadata?: Record<string, unknown>) {
  trackWebsiteEvent({
    event_type: "review_submit",
    label: "Review Submitted",
    metadata,
  });
}

export function trackReviewFormError(error: string) {
  trackWebsiteEvent({
    event_type: "review_form_error",
    label: "Review Form Error",
    metadata: { error },
  });
}