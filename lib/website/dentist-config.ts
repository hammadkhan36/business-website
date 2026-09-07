import { dentistConfig, type DentistConfig } from "@/config/dentist";

type PartialDentistConfig = Partial<DentistConfig>;

export function getDentistConfig(overrides: PartialDentistConfig = {}): DentistConfig {
  return {
    ...dentistConfig,
    ...overrides,

    seo: {
      ...dentistConfig.seo,
      ...overrides.seo,
      keywords: overrides.seo?.keywords ?? dentistConfig.seo.keywords,
    },

    hero: {
      ...dentistConfig.hero,
      ...overrides.hero,
      primaryCta: {
        ...dentistConfig.hero.primaryCta,
        ...overrides.hero?.primaryCta,
      },
      secondaryCta: {
        ...dentistConfig.hero.secondaryCta,
        ...overrides.hero?.secondaryCta,
      },
    },

    emergency: {
      ...dentistConfig.emergency,
      ...overrides.emergency,
    },

    conversionSections: {
      ...dentistConfig.conversionSections,
      ...overrides.conversionSections,
    },

    nav: overrides.nav ?? dentistConfig.nav,
    stats: overrides.stats ?? dentistConfig.stats,
    trustPoints: overrides.trustPoints ?? dentistConfig.trustPoints,
    services: overrides.services ?? dentistConfig.services,
    faqs: overrides.faqs ?? dentistConfig.faqs,
  };
}