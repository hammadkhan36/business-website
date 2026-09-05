import { Mail, Phone } from "lucide-react";

type ContactActionsProps = {
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
};

function cleanPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export function ContactActions({ phone, email, whatsapp }: ContactActionsProps) {
  const callPhone = phone ? cleanPhone(phone) : "";
  const whatsappPhone = whatsapp || phone ? cleanPhone(whatsapp || phone || "") : "";

  return (
    <div className="flex flex-wrap gap-3">
      {callPhone && (
        <a
          href={`tel:${callPhone}`}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      )}

      {whatsappPhone && (
        <a
          href={`https://wa.me/${whatsappPhone.replace("+", "")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700"
        >
          WhatsApp
        </a>
      )}

      {email && (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium hover:bg-slate-50"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      )}
    </div>
  );
}