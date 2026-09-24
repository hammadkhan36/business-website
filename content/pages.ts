import { business } from "@/content/business";

export const homeContent = {
  eyebrow: `DENTAL CARE IN ${business.city.toUpperCase()}`,
  title: "Your smile. Our care. Close to home.",
  description:
    "Visit Dr Yousaf Dental Implant Clinic on Kamra Road, Attock. Start with a conversation about your concerns and the care you would like to explore.",

  servicesTitle: "Explore our treatments",
  servicesDescription:
    "Find out more about the treatments available at the clinic.",

  approachTitle: "A visit built around your questions",

  approach: [
    {
      title: "Start with a conversation",
      description:
        "Tell the dentist what you would like help with and ask your questions.",
    },
    {
      title: "Understand your options",
      description:
        "Discuss the proposed treatment, appointments and expected fees.",
    },
    {
      title: "Agree the next step",
      description:
        "Plan your next visit directly with the clinic team.",
    },
  ],
};

export const aboutContent = {
  eyebrow: "MEET YOUR DENTIST",
  title: "Asst Prof Dr M Yousaf Khan",
  introduction:
    "Dental consultations and treatment at Islamabad Specialist Clinic, Kamra Road, Attock.",

  sections: [
    {
      title: "Clinical practice and dental education",
      body:
        "Dr Muhammad Yousaf Khan sees patients in Attock and serves as an Assistant Professor at Bacha Khan Dental College, Mardan.",
    },
    {
      title: "Your questions matter",
      body:
        "Your consultation is an opportunity to explain your concerns, understand the proposed care and discuss the next steps before making a decision.",
    },
    {
      title: "Plan your visit",
      body:
        "Contact the clinic to confirm availability, consultation fees and any information you should bring to your appointment.",
    },
  ],
};

export const faqContent = {
  eyebrow: "BEFORE YOUR VISIT",
  title: "Frequently asked questions",
  description:
    "Practical information about contacting the clinic and arranging a visit.",

  items: [
    {
      question: "How can I arrange an appointment?",
      answer:
        `Call ${business.displayPhone} to discuss availability. An online appointment request is confirmed only after the clinic contacts you.`,
    },
    {
      question: "Where is the clinic?",
      answer: business.address,
    },
    {
      question: "What are the clinic hours?",
      answer:
        "Published hours are Monday–Thursday, 3 pm–9 pm, and Saturday–Sunday, 10 am–8 pm, Pakistan time. Friday hours are not listed. Please call to confirm Friday or holiday availability.",
    },
    {
      question: "How much will treatment cost?",
      answer:
        "Contact the clinic about consultation fees. Treatment costs depend on the assessment and proposed care, so ask for an estimate before proceeding.",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring any documents the clinic has requested. Call ahead to confirm preparation instructions and discuss medical information directly with your dentist.",
    },
    {
      question: "Can I ask about an urgent appointment?",
      answer:
        `Call ${business.displayPhone} to explain your concern and ask about the earliest available visit. Website requests are not an emergency response service.`,
    },
  ],
};
