import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getAdminWebsiteConfig } from "@/lib/website/admin-config";
import { createSeoMetadata } from "@/lib/website/seo";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

// Read each deployment's admin configuration at request time, not during build.
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export async function generateMetadata(): Promise<Metadata> {
  const { business, seo } = await getAdminWebsiteConfig();
  return {
    ...createSeoMetadata({
      title: seo?.default_meta_title || business?.business_name || undefined,
      description: seo?.default_meta_description || undefined,
      image: seo?.og_image_url,
    }),
    verification: seo?.google_search_console_verification
      ? { google: seo.google_search_console_verification }
      : undefined,
    icons: business?.favicon_url ? { icon: business.favicon_url } : undefined,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageViewTracker />
        {children}
        </body>

    </html>
  );
}
