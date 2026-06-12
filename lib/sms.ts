import { BRAND } from "@/lib/brand";

/** E.164-style digits only for sms: links */
export function phoneDigits(phone: string = BRAND.smsPhone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
}

/**
 * Build sms: URL with a pre-filled body.
 * Uses encodeURIComponent (spaces as %20) — URLSearchParams uses + which
 * some clients show literally instead of as spaces.
 */
export function buildSmsUrl(
  body: string = BRAND.smsBody,
  phone: string = BRAND.smsPhone
) {
  return `sms:+${phoneDigits(phone)}?body=${encodeURIComponent(body)}`;
}
