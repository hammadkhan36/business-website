click tracker kasa add karna ha us ki examples daak lo






## ya call click tracker ki example ha 

import { ANALYTICS_EVENTS, ANALYTICS_LABELS } from "@/lib/website/analytics-events";
import { trackWebsiteEvent } from "@/lib/website/analytics-client";


<a
  href="tel:+923001234567"
  onClick={() =>
    trackWebsiteEvent({
      event_type: ANALYTICS_EVENTS.call_click,
  label: ANALYTICS_LABELS.heroCall,
    })
  }
>
  Call Now
</a>










## WhatsApp button:

<a
  href="https://wa.me/923001234567"
  onClick={() =>
        trackWebsiteEvent({
    event_type: ANALYTICS_EVENTS.whatsappClick,
    label: ANALYTICS_LABELS.heroWhatsApp,
    })
  }
>
  WhatsApp
</a>












 ##  Map button:

<a
  href="https://maps.google.com/?q=business"
  onClick={() =>
    trackWebsiteEvent({
     event_type: ANALYTICS_EVENTS.mapClick,
    label: ANALYTICS_LABELS.footerMap,
    })
  }
>
  Get Directions
</a>












## Book Now button:

<button
  type="button"
  onClick={() =>
    trackWebsiteEvent({
       event_type: ANALYTICS_EVENTS.bookingClick,
    label: ANALYTICS_LABELS.servicesBooking,
    })
  }
>
  Book Now
</button>