import type { ReactNode } from "react";
import Link from "next/link";
import {
  business,
  contactLinks,
  navigation,
} from "@/content/business";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-slate-900">
      <a
        href="#page-content"
        className="sr-only focus:not-sr-only focus:block focus:bg-white focus:p-4 focus:text-teal-950"
      >
        Skip to content
      </a>

      <div className="bg-teal-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-sm">
          <span>
            {business.city}, {business.country}
          </span>

          <a
            href={contactLinks.phone}
            className="underline-offset-4 hover:underline"
          >
            {business.displayPhone}
          </a>
        </div>
      </div>

      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="max-w-xl">
              <span className="block text-2xl font-semibold tracking-tight">
                {business.shortName}
              </span>

              <span className="mt-1 block text-sm text-slate-600">
                {business.name}
              </span>
            </Link>

            <a
              href={contactLinks.phone}
              className="inline-flex rounded-full bg-teal-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-800"
            >
              Call us
            </a>
          </div>

          <nav
            aria-label="Main navigation"
            className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-100 pt-4"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded py-2 text-sm font-medium underline-offset-4 hover:text-teal-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div id="page-content" tabIndex={-1} className="flex-1">
        {children}
      </div>

      <footer className="mt-16 bg-teal-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">{business.name}</p>

            <address className="mt-4 text-sm not-italic leading-7 text-teal-100">
              {business.address}
            </address>
          </div>

          <div>
            <p className="font-semibold">Explore</p>

            <nav
              aria-label="Footer navigation"
              className="mt-4 grid gap-3 text-sm text-teal-100"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-semibold">Contact</p>

            <div className="mt-4 grid gap-4 text-sm text-teal-100">
              <a
                href={contactLinks.phone}
                className="w-fit underline-offset-4 hover:underline"
              >
                {business.displayPhone}
              </a>

              <a
                href={contactLinks.email}
                className="w-fit break-all underline-offset-4 hover:underline"
              >
                {business.email}
              </a>

              <a
                href={contactLinks.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit underline-offset-4 hover:underline"
              >
                Get directions ↗
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 px-5 py-5 text-center text-xs text-teal-100">
          © {new Date().getFullYear()} {business.shortName}.
          {" "}All rights reserved.
        </div>
      </footer>
    </div>
  );
}
