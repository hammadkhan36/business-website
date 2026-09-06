

Page views aur button clicks se hume traffic ka idea mil gaya. Ab hume ye track karna hai ke visitor ne actual action complete kiya ya nahi:


> lead_submit
> appointment_submit
> form_submit
> review_submit
> coupon_validate
> coupon_redeem



## Step 1: Lead submit tracking

Jahan website mein lead create hoti hai, successful API response ke baad ye call add karo:

`trackWebsiteEvent({
  event_type: "lead_submit",
  label: "Lead Form Submitted",
  metadata: {
    service: formData.get("service"),
    source: "website",
  },
});`

Agar lead submit server action/API route mein ho rahi hai, to client-side form submit success ke baad lagana best hai.







## Step 2: Appointment submit tracking

Appointment booking success ke baad:

`trackWebsiteEvent({
  event_type: "appointment_submit",
  label: "Appointment Form Submitted",
  metadata: {
    service_id: selectedServiceId,
    appointment_date: appointmentDate,
  },
});`

Is se dashboard mein pata chalega:

Kitne log Book Now click karte hain
Kitne actually appointment submit karte hain
Conversion rate kitna hai






## Step 3: Coupon tracking

Coupon validate button par:

`trackWebsiteEvent({
  event_type: "coupon_validate",
  label: "Coupon Validated",
  metadata: {
    code: couponCode,
  },
});`

Coupon actual use/redeem hone ke baad:

`trackWebsiteEvent({
  event_type: "coupon_redeem",
  label: "Coupon Redeemed",
  metadata: {
    code: couponCode,
  },
});`

Note: validate sirf check hai. redeem actual use count/update ke liye hota hai.









## Step 4: Review submit tracking

Review successful submit ke baad:

trackWebsiteEvent({
  event_type: "review_submit",
  label: "Review Submitted",
});







## Step 5: Admin analytics dashboard

Jab ye events save hona start ho jayen, phir admin panel mein analytics page banayenge:

/app/(admin)/analytics/page.tsx

Wahan show hoga:

Total page views
Unique visitors
Call clicks
WhatsApp clicks
Booking clicks
Leads submitted
Appointments submitted
Coupon usage
Top pages
Top buttons
Traffic sources