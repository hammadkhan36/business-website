export type DentistNavItem = {
  label: string;
  href: string;
};

export type DentistService = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  imageAlt: string;
  startingPrice?: string;
  duration?: string;
  highlights: string[];
  ctaLabel: string;
};

export type DentistFaq = {
  question: string;
  answer: string;
};

export type DentistTrustPoint = {
  title: string;
  description: string;
};

export type DentistStat = {
  label: string;
  value: string;
};

export type DentistConfig = {
  niche: "dentist";
  siteName: string;
  defaultCity: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: DentistNavItem[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: {
      label: string;
      href: string;
      eventLabel: string;
    };
    secondaryCta: {
      label: string;
      href: string;
      eventLabel: string;
    };
  };
  emergency: {
    title: string;
    description: string;
    phoneFallback: string;
    ctaLabel: string;
  };
  stats: DentistStat[];
  trustPoints: DentistTrustPoint[];
  services: DentistService[];
  faqs: DentistFaq[];
  conversionSections: {
    bookingTitle: string;
    bookingDescription: string;
    leadTitle: string;
    leadDescription: string;
  };
};

export const dentistConfig: DentistConfig = {
  niche: "dentist",
  siteName: "Dental Care Clinic",
  defaultCity: "Your City",

  seo: {
    title: "Trusted Dentist in Your City | Dental Care Clinic",
    description:
      "Book dental checkups, teeth cleaning, whitening, implants, braces and emergency dental care with a trusted local dentist.",
    keywords: [
      "dentist near me",
      "dental clinic",
      "teeth cleaning",
      "teeth whitening",
      "dental implants",
      "emergency dentist",
      "family dentist",
      "braces dentist",
    ],
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Offers", href: "/offers" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Book Appointment", href: "/book-appointment" },
  ],

  hero: {
    eyebrow: "Modern family dental care",
    title: "Healthy smiles made simple, comfortable and affordable.",
    description:
      "A reusable dentist website starter built for local dental clinics. Connect services, offers, FAQs, leads and appointments from the admin dashboard.",
    primaryCta: {
      label: "Book Appointment",
      href: "/book-appointment",
      eventLabel: "Hero Book Appointment",
    },
    secondaryCta: {
      label: "Call Clinic",
      href: "tel:",
      eventLabel: "Hero Call Clinic",
    },
  },

  emergency: {
    title: "Dental emergency?",
    description:
      "Tooth pain, swelling, broken tooth or urgent dental issue? Call the clinic and request the earliest available appointment.",
    phoneFallback: "+1 000 000 0000",
    ctaLabel: "Call Now",
  },

  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "5k+", label: "Happy Patients" },
    { value: "24h", label: "Fast Response" },
    { value: "4.9", label: "Average Rating" },
  ],

  trustPoints: [
    {
      title: "Patient-friendly care",
      description:
        "Clear explanations, gentle treatment and a comfortable visit from start to finish.",
    },
    {
      title: "Appointment focused",
      description:
        "Website visitors can request appointments and every request can go into the admin panel.",
    },
    {
      title: "Trackable growth",
      description:
        "Calls, WhatsApp clicks, booking clicks, page views and form submissions can be tracked.",
    },
  ],

  services: [
    {
      slug: "dental-checkup",
      title: "Dental Checkup",
      shortDescription: "Routine oral health checkups for adults and children.",
      description:
        "Complete dental examination to detect cavities, gum issues, pain points and early oral health problems before they become serious.",
      icon: "stethoscope",
      imageAlt: "Dentist checking patient teeth",
      startingPrice: "From $49",
      duration: "30 min",
      highlights: [
        "Oral health examination",
        "Cavity and gum check",
        "Personal treatment advice",
      ],
      ctaLabel: "Book Checkup",
    },
    {
      slug: "teeth-cleaning",
      title: "Teeth Cleaning",
      shortDescription: "Professional cleaning for plaque and tartar removal.",
      description:
        "Deep yet gentle teeth cleaning to remove plaque, tartar and stains while helping prevent gum disease.",
      icon: "sparkles",
      imageAlt: "Professional teeth cleaning service",
      startingPrice: "From $79",
      duration: "45 min",
      highlights: [
        "Plaque removal",
        "Tartar cleaning",
        "Fresh and healthy smile",
      ],
      ctaLabel: "Book Cleaning",
    },
    {
      slug: "teeth-whitening",
      title: "Teeth Whitening",
      shortDescription: "Brighten your smile with safe whitening treatment.",
      description:
        "Cosmetic whitening treatment designed to reduce stains and improve smile brightness safely.",
      icon: "smile",
      imageAlt: "Teeth whitening result",
      startingPrice: "From $149",
      duration: "60 min",
      highlights: [
        "Smile brightness",
        "Stain reduction",
        "Safe whitening process",
      ],
      ctaLabel: "Book Whitening",
    },
    {
      slug: "dental-implants",
      title: "Dental Implants",
      shortDescription: "Replace missing teeth with natural-looking implants.",
      description:
        "Dental implant consultation and treatment planning for missing teeth replacement with long-term stability.",
      icon: "badge-check",
      imageAlt: "Dental implant consultation",
      startingPrice: "Consultation required",
      duration: "Consultation",
      highlights: [
        "Missing tooth replacement",
        "Natural look and feel",
        "Long-term solution",
      ],
      ctaLabel: "Request Consultation",
    },
    {
      slug: "braces-aligners",
      title: "Braces & Aligners",
      shortDescription: "Straighten teeth with braces or clear aligners.",
      description:
        "Orthodontic consultation for braces and aligners to improve teeth alignment, bite and smile confidence.",
      icon: "align-center",
      imageAlt: "Braces and aligners dental service",
      startingPrice: "Consultation required",
      duration: "Consultation",
      highlights: [
        "Teeth alignment",
        "Bite correction",
        "Clear aligner options",
      ],
      ctaLabel: "Book Consultation",
    },
    {
      slug: "emergency-dentist",
      title: "Emergency Dentist",
      shortDescription: "Urgent dental care for pain, swelling or broken teeth.",
      description:
        "Emergency dental support for tooth pain, swelling, broken teeth, infections and urgent dental problems.",
      icon: "alarm-clock",
      imageAlt: "Emergency dentist service",
      startingPrice: "Call clinic",
      duration: "Urgent",
      highlights: [
        "Tooth pain support",
        "Broken tooth help",
        "Urgent appointment request",
      ],
      ctaLabel: "Get Emergency Help",
    },
  ],

  faqs: [
    {
      question: "How do I book an appointment?",
      answer:
        "You can book from the website appointment form, call the clinic or send a message through the contact options.",
    },
    {
      question: "Can the website show services from the admin panel?",
      answer:
        "Yes. Services marked active and visible on website can be displayed from the admin dashboard data.",
    },
    {
      question: "Can leads and appointment requests go to the admin panel?",
      answer:
        "Yes. Lead forms and appointment forms can submit directly to the admin panel APIs.",
    },
    {
      question: "Can clicks and page visits be tracked?",
      answer:
        "Yes. Page views, call clicks, WhatsApp clicks, booking clicks, service clicks, offer clicks and form events can be tracked.",
    },
  ],

  conversionSections: {
    bookingTitle: "Ready to book your visit?",
    bookingDescription:
      "Let visitors request an appointment and send the request directly into the admin dashboard.",
    leadTitle: "Not ready to book?",
    leadDescription:
      "Use a simple inquiry form so the clinic can follow up with potential patients.",
  },
};