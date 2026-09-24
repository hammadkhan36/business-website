export type BusinessContent = {
  name: string;
  shortName: string;
  city: string;
  country: string;
  timezone: string;
  currency: string;
  phone: string;
  displayPhone: string;
  email: string;
  address: string;
  mapUrl: string;
};

export const business: BusinessContent = {
  name: "Asst Prof Dr M Yousaf Dental Implant Clinic",
  shortName: "Dr M Yousaf",
  city: "Attock",
  country: "Pakistan",
  timezone: "Asia/Karachi",
  currency: "PKR",

  phone: "+923099111870",
  displayPhone: "0309 9111870",
  email: "dryousafdc@gmail.com",

  address:
    "Islamabad Specialist Clinic, Old Attock Medical Center, Kamra Road, Attock, Pakistan",

  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Asst+Prof+Dr+M+Yousaf+Dental+Implant+Clinic+Attock",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/services" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const contactLinks = {
  phone: `tel:${business.phone}`,
  email: `mailto:${business.email}`,
  directions: business.mapUrl,
};
