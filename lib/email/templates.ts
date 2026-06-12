import { BRAND } from "@/lib/brand";

export function leadConfirmationEmail(name: string) {
  return {
    subject: `We received your inquiry — ${BRAND.name}`,
    html: `<p>Hi ${name},</p><p>Thank you for contacting ${BRAND.name}. We respond within one business day with next steps.</p><p>— ${BRAND.name}<br>${BRAND.phone}</p>`,
  };
}

export function leadInternalEmail(data: Record<string, unknown>) {
  return {
    subject: `New lead — ${BRAND.name}`,
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
  };
}
