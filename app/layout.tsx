import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { business } from "@/content/business";
import { SiteShell } from "@/components/website/site-shell";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { AnalyticsConsentBanner } from "@/components/analytics/analytics-consent-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: business.name,
  description: `${business.name} in ${business.city}, ${business.country}. Find contact details and directions.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>

        <SiteShell>{children}</SiteShell>

        <Suspense fallback={null}>
          <AnalyticsConsentBanner />
        </Suspense>
      </body>
    </html>
  );
}
