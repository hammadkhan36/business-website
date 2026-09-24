export type ServiceContent = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
};

export const services: ServiceContent[] = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    summary: "Discuss options for replacing missing teeth.",
    description:
      "Arrange a consultation with Dr Yousaf to discuss missing teeth, your concerns and the available treatment options. Your dentist will explain whether implant treatment is appropriate for you.",
    highlights: [
      "Consultation and assessment",
      "Individual treatment discussion",
      "Follow-up planning",
    ],
  },
  {
    slug: "braces-aligners",
    title: "Braces & Clear Aligners",
    summary: "Explore options for improving tooth alignment.",
    description:
      "Discuss braces and clear aligners with the clinic. Your dentist will assess your needs and explain the proposed approach, appointments and expected costs.",
    highlights: [
      "Alignment assessment",
      "Discussion of treatment options",
      "Review appointments",
    ],
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    summary: "Arrange an assessment for a tooth that needs attention.",
    description:
      "Book a consultation to discuss a troublesome tooth. The dentist will explain the findings and whether root canal treatment forms part of the recommended care.",
    highlights: [
      "Dental assessment",
      "Explanation of the proposed treatment",
      "Restoration and follow-up discussion",
    ],
  },
  {
    slug: "dental-fillings",
    title: "Dental Fillings",
    summary: "Discuss repairing a tooth or replacing an existing filling.",
    description:
      "The clinic offers consultations for dental fillings. Your dentist will explain the recommended restoration and answer your questions before treatment.",
    highlights: [
      "Tooth assessment",
      "Restoration options",
      "Aftercare discussion",
    ],
  },
  {
    slug: "crowns-bridges",
    title: "Dental Crowns & Bridges",
    summary: "Explore restorative options for your smile.",
    description:
      "Discuss crowns and bridges with the clinic. Your consultation includes an explanation of the recommended restoration, material options and appointment sequence.",
    highlights: [
      "Restorative consultation",
      "Material and treatment discussion",
      "Fitting and review appointments",
    ],
  },
  {
    slug: "teeth-cleaning",
    title: "Scaling & Polishing",
    summary: "Request an appointment for professional dental cleaning.",
    description:
      "Speak with the team about scaling and polishing. Your visit is also an opportunity to discuss your daily dental care routine and any concerns.",
    highlights: [
      "Cleaning appointment",
      "Oral hygiene discussion",
      "Ongoing care planning",
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    summary: "Ask about professional whitening options.",
    description:
      "Discuss whitening with your dentist before choosing a treatment. The consultation covers suitability, expectations and any questions you have.",
    highlights: [
      "Whitening consultation",
      "Suitability assessment",
      "Explanation of available options",
    ],
  },
  {
    slug: "dentures",
    title: "Complete & Partial Dentures",
    summary: "Discuss a replacement option for missing teeth.",
    description:
      "Arrange a consultation for complete or partial dentures. Talk through your preferences, the proposed fitting process and follow-up visits.",
    highlights: [
      "Denture consultation",
      "Individual fitting plan",
      "Adjustment and follow-up visits",
    ],
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    summary: "Get advice about a concern that may require oral surgery.",
    description:
      "Book an assessment to discuss your dental concern. The dentist will explain whether a procedure is recommended and what the next steps involve.",
    highlights: [
      "Initial assessment",
      "Procedure discussion",
      "Personal aftercare instructions",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
