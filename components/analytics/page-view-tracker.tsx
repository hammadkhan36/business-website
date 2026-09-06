"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_KEY = "website_analytics_visitor_id";
const SESSION_KEY = "website_analytics_session_id";

function getId(storage: Storage, key: string) {
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

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const search = searchParams.toString();
    const path = search ? `${pathname}?${search}` : pathname;
    const params = new URLSearchParams(search);

    const payload = {
      event_type: "page_view" as const,
      path,
      visitor_id: getId(window.localStorage, VISITOR_KEY),
      session_id: getId(window.sessionStorage, SESSION_KEY),
      referrer_domain: getReferrerDomain(),
      metadata: {
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      },
    };

    void fetch("/api/analytics/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  }, [pathname, searchParams]);

  return null;
}
