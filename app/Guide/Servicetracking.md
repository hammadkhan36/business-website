Next Step 2: Service tracking connect karna

Ab services list/card jahan render hoti hai, har service button/card pe ye tracking lagani hai.

Agar tumhare paas ServiceCard component hai to usmein ye import add karo:

import {
  trackBookingClick,
  trackServiceClick,
  trackServiceView,
} from "@/lib/website/analytics-client";

Service card component ke andar:

useEffect(() => {
  trackServiceView(service.id, service.name);
}, [service.id, service.name]);

Button/card click par:

onClick={() => trackServiceClick(service.id, service.name)}

Booking button par:

onClick={() => trackBookingClick(service.id, service.name)}

Agar tum mujhe services wali current file bhej do, main uska complete file code de dunga.

Next Step 3: Offer tracking connect karna

Offer card/list jahan hai, wahan:

import {
  trackOfferClick,
  trackOfferView,
} from "@/lib/website/analytics-client";

Offer show hone par:

useEffect(() => {
  trackOfferView(offer.id, offer.title);
}, [offer.id, offer.title]);

Offer CTA click par:

onClick={() => trackOfferClick(offer.id, offer.title)}

Is se admin ko pata chalega:

kis offer ko log dekh rahe hain
kis offer par click aa rahe hain
kaunsi offer conversion la rahi hai
Next Step 4: Form tracking

Forms mein ye 4 events important hain:

form_start
form_error
form_submit
form_abandon

Lead form ke liye:

trackLeadFormStart();
trackLeadFormError("Phone number is required");
trackLeadSubmit({ service: selectedService });
trackLeadFormAbandon();

Appointment form ke liye:

trackAppointmentFormStart();
trackAppointmentFormError("Selected time is not available");
trackAppointmentSubmit({ service_id: serviceId, date });
trackAppointmentFormAbandon();

Custom form ke liye:

trackCustomFormStart(form.id, form.name);
trackCustomFormError("Required field missing", form.name, form.id);
trackFormSubmit(form.name, { slug: form.slug }, form.id);
trackCustomFormAbandon(form.name, form.id);