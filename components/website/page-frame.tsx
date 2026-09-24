import type { ReactNode } from "react";
import Link from "next/link";
import {
  business,
  contactLinks,
  navigation,
} from "@/content/business";

type PageFrameProps = {
  children: ReactNode;
};

export function PageFrame({ children }: PageFrameProps) {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <a
        href="#page-content"
        className="sr-only focus:not-sr-only focus:block focus:bg-white focus:p-4"
      >
        Skip to content
      </a>

      <div className="bg-teal-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 text-xs sm:text-sm">
          <span>Dental care in {business.city}</span>

          <a href={contactLinks.phone}>
            {business.displayPhone}
          </a>
        </div>
      </div>

      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-5">
          <Link href="/" className="min-w-0">
            <span className="block text-xl font-semibold tracking-tight">
              {business.shortName}
            </span>

            <span className="text-xs tracking-wider text-slate-600">
              DENTAL IMPLANT CLINIC
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 text-sm md:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-teal-700 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <details className="relative md:hidden">
            <summary className="cursor-pointer rounded-lg border px-4 py-2 text-sm">
              Menu
            </summary>

            <nav
              aria-label="Mobile navigation"
              className="absolute right-0 z-50 mt-3 w-56 rounded-xl border bg-white p-3 shadow-lg"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-sm hover:bg-stone-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>

      <main id="page-content">{children}</main>

      <footer className="mt-16 bg-teal-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">
              {business.name}
            </p>

            <p className="mt-4 text-sm leading-7 text-teal-100">
              {business.address}
            </p>
          </div>

          <div>
            <p className="font-semibold">Explore</p>

            <nav
              aria-label="Footer navigation"
              className="mt-4 grid gap-3 text-sm text-teal-100"
            >
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-semibold">Contact the clinic</p>

            <div className="mt-4 grid gap-3 text-sm text-teal-100">
              <a href={contactLinks.phone}>
                {business.displayPhone}
              </a>

              <a
                href={contactLinks.email}
                className="break-all"
              >
                {business.email}
              </a>

              <a
                href={contactLinks.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions ↗
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 px-5 py-5 text-center text-xs text-teal-100">
          © {new Date().getFullYear()} {business.shortName}.
          All rights reserved.
        </div>
      </footer>
    </div>
  );
}
