import { websiteConfig } from "@/lib/website/config";

export function absoluteUrl(path = "/") {
  const siteUrl = websiteConfig.siteUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${cleanPath}`;
}

export function serviceUrl(slug: string) {
  return absoluteUrl(`/services/${slug}`);
}

export function areaUrl(slug: string) {
  return absoluteUrl(`/areas/${slug}`);
}

export function offerUrl() {
  return absoluteUrl("/offers");
}

export function contactUrl() {
  return absoluteUrl("/contact");
}

export function bookingUrl() {
  return absoluteUrl("/book");
}