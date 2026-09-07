import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Phone,
  Sparkles,
} from "lucide-react";
import { getDentistConfig } from "@/lib/website/dentist-config";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const config = getDentistConfig();

  return config.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getDentistConfig();
  const service = config.services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | ${config.siteName}`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const config = getDentistConfig();
  const service = config.services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = config.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <main>
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to services
          </Link>

          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm text-muted-foreground shadow-sm">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Dental service
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                {service.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                {service.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/book-appointment?service=${service.slug}`}
                  data-track-event="booking_click"
                  data-track-label={`Book ${service.title}`}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  {service.ctaLabel}
                </Link>

                <a
                  href={config.hero.secondaryCta.href}
                  data-track-event="call_click"
                  data-track-label={`Call from ${service.title}`}
                  className="inline-flex items-center justify-center rounded-full border bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Clinic
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                Service details
              </h2>

              <div className="mt-5 space-y-4">
                {service.startingPrice && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Starting price
                    </p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {service.startingPrice}
                    </p>
                  </div>
                )}

                {service.duration && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Duration
                    </p>
                    <p className="mt-1 flex items-center font-semibold text-slate-950">
                      <Clock className="mr-2 h-4 w-4 text-blue-600" />
                      {service.duration}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-slate-950">
                  What’s included
                </p>

                <div className="space-y-3">
                  {service.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Related Services
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Patients also view these treatments
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  data-track-event="service_click"
                  data-track-label={item.title}
                  className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.shortDescription}
                  </p>

                  <div className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600">
                    View service
                    <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}