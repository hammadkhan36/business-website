export const clinic = {
  name: "Elements Dentistry",
  phone: "+17147161155",
  displayPhone: "(714) 716-1155",
  address: "18952 Brookhurst St, Fountain Valley, CA 92708",
  timezone: "America/Los_Angeles",
  map: "https://www.google.com/maps/search/?api=1&query=Elements+Dentistry+18952+Brookhurst+St+Fountain+Valley+CA+92708",
  membership: "https://membership-plans.bento.net/elements-dentistry/001/",
  socials: {
    Instagram: "https://www.instagram.com/elementsdentistry/",
    Facebook: "https://www.facebook.com/profile.php?id=61553396636194",
    TikTok: "https://www.tiktok.com/@elementsdentistry",
    Zocdoc: "https://www.zocdoc.com/practice/elements-dentistry-132998",
  },
};
export type WeeklyHours = Record<number, string[][]>;
export const weeklyHours: WeeklyHours = {
  0: [], 1: [["10:00", "14:00"], ["15:00", "18:00"]],
  2: [["09:00", "13:00"], ["14:00", "18:00"]], 3: [],
  4: [["09:00", "13:00"], ["14:00", "18:00"]],
  5: [["08:00", "12:00"], ["13:00", "16:00"]], 6: [],
};
export const services = [
  {slug:"family-dentistry",title:"Family & preventive care",tagline:"A little care today. A healthier smile tomorrow.",description:"Dental examinations, cleanings and preventive visits for children, adults and older patients.",highlights:["Routine examinations","Professional cleaning","Personalized prevention"]},
  {slug:"special-care-dentistry",title:"Special care dentistry",tagline:"Dental care that meets you where you are.",description:"Individualized visits for patients with developmental, cognitive or complex medical needs. Call us to discuss accommodations.",highlights:["Individualized appointments","Caregiver collaboration","A comfortable pace"]},
  {slug:"cosmetic-dentistry",title:"Cosmetic dentistry",tagline:"Make room for your most confident smile.",description:"Discuss veneers, crowns and cosmetic treatment options with a consultation tailored to your goals.",highlights:["Smile consultation","Veneers and crowns","Individual treatment planning"]},
  {slug:"teeth-whitening",title:"KöR teeth whitening",tagline:"A brighter chapter for your smile.",description:"Ask about the KöR Whitening System and whether professional whitening is appropriate for your smile.",highlights:["Whitening consultation","KöR Whitening System","Personalized guidance"]},
  {slug:"dental-implants",title:"Dental implants",tagline:"Feel like yourself again.",description:"Explore implant placement and restoration for missing teeth. Your dentist will assess suitability and explain your options.",highlights:["Implant consultation","Placement and restoration","Oral surgery expertise"]},
  {slug:"clear-aligners",title:"Orthosnap clear aligners",tagline:"A new direction for your smile.",description:"Explore Orthosnap clear aligner treatment with our team, starting with a conversation about your smile.",highlights:["Alignment assessment","Orthosnap treatment","Ongoing guidance"]},
  {slug:"emergency-dentistry",title:"Emergency dental care",tagline:"When your smile needs attention, call us.",description:"Contact our office about tooth pain, a broken tooth or an urgent dental concern. Call during office hours to ask about availability.",highlights:["Call the office directly","Explain your concern","Ask about availability"]},
  {slug:"sedation-dentistry",title:"Sedation dentistry",tagline:"Let’s talk about feeling comfortable.",description:"Discuss dental anxiety, your health history and sedation options with our team before treatment.",highlights:["Comfort-focused consultation","Individual assessment","Care planning"]},
  {slug:"solea-laser",title:"Solea laser dentistry",tagline:"Thoughtful care. Modern technology.",description:"Our office offers Solea laser technology. Ask your dentist whether it is suitable for your planned treatment.",highlights:["Solea technology","Dentist-led assessment","Personalized treatment"]},
  {slug:"root-canals",title:"GentleWave root canals",tagline:"Care for the tooth you want to keep.",description:"Our practice offers GentleWave technology for root canal care. Your dentist will explain the recommended approach.",highlights:["Root canal evaluation","GentleWave technology","Follow-up guidance"]},
  {slug:"oral-surgery",title:"Oral surgery",tagline:"Specialist care, close to home.",description:"Meet Dr. Kalvyn Ngo to discuss oral surgery, including wisdom teeth removal and implant placement.",highlights:["Oral surgery consultation","Wisdom teeth","Implant placement"]},
  {slug:"dentures",title:"Dentures & restorative care",tagline:"Support for your everyday smile.",description:"Discuss dentures and restorative options with a plan centered on your needs and daily comfort.",highlights:["Restorative consultation","Denture care","Ongoing support"]},
];
export const doctors = [
  {slug:"tiffany-vo",name:"Dr. Tiffany Vo",role:"General Dentist",image:"/elements/tiffany.jpg",bio:"Dr. Tiffany Vo earned her DDS at the University of the Pacific Arthur A. Dugoni School of Dentistry in 2014. A Fountain Valley native and Kois Center graduate, she brings an interest in art and science to family and special care dentistry."},
  {slug:"trisha-vo",name:"Dr. Trisha Vo",role:"Special Care Dentist",image:"/elements/trisha.jpg",bio:"Dr. Trisha Vo earned her DDS at the University of the Pacific and completed a General Practice Residency at Rancho Los Amigos National Rehabilitation Center. Her work centers on making dental care more accessible for patients with complex needs."},
  {slug:"kalvyn-ngo",name:"Dr. Kalvyn Ngo",role:"Board-Certified Oral Surgeon",image:"/elements/kalvyn.jpg",bio:"Dr. Kalvyn Ngo trained at USC and Los Angeles General Medical Center. At Elements Dentistry, he offers oral surgery consultations and procedures including wisdom teeth removal and implant placement."},
];
export const faqs = [
  {question:"How do I request an appointment?",answer:"Choose a preferred date and time on our appointment form, or call (714) 716-1155. Online requests are reviewed by our team; your appointment is confirmed only after we contact you."},
  {question:"Where is the office?",answer:"Find us at 18952 Brookhurst St, Fountain Valley, CA 92708, near Brookhurst Street and Garfield Avenue."},
  {question:"Do you welcome patients with special care needs?",answer:"Yes. Please call so we can discuss accommodations and plan a suitable visit."},
  {question:"What if I do not have dental insurance?",answer:"Ask about our membership plan. Current benefits and pricing are available through our membership provider."},
  {question:"Can I request an emergency appointment?",answer:"Call (714) 716-1155 during office hours and describe your concern. Our team can advise on appointment availability."},
  {question:"What should I bring to my first visit?",answer:"Bring your identification, insurance information if applicable, and information requested by our office. Call ahead to discuss records or accessibility needs."},
];
export function timeLabel(t:string) {const [h,m]=t.split(":").map(Number);return `${h%12||12}${m?`:${String(m).padStart(2,"0")}`:""} ${h<12?"am":"pm"}`;}
export const publicPaths=["/","/about","/services","/meet-our-doctors","/contact","/book-appointment","/patient-information","/patient-information/financing","/patient-information/post-op-instructions","/faq","/offers","/reviews","/forms","/service-areas","/privacy","/accessibility"];
