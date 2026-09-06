click tracker kasa add karna ha us ki examples daak lo






## ya call click tracker ki example ha 

import { trackWebsiteEvent } from "@/lib/website/analytics-client";

<a
  href="tel:+923001234567"
  onClick={() =>
    trackWebsiteEvent({
      event_type: "call_click",
      label: "Header Call Button",
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
      event_type: "whatsapp_click",
      label: "Hero WhatsApp Button",
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
      event_type: "map_click",
      label: "Contact Map Button",
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
      event_type: "booking_click",
      label: "Hero Book Now Button",
    })
  }
>
  Book Now
</button>