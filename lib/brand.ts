/** Single source of truth — display phone and sms:/tel: links always match */
const BRAND_PHONE_DIGITS = "2482227466";

function formatUsPhone(digits: string): string {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const BRAND = {
  name: "Reserve Coatings",
  tagline: "Metro Detroit's Preferred Epoxy Services.",
  phone: formatUsPhone(BRAND_PHONE_DIGITS),
  /** 10-digit number for sms: links (Text me CTA) */
  smsPhone: BRAND_PHONE_DIGITS,
  smsBody:
    "Hi Reserve Coatings — I'm interested in epoxy floor coating for my Metro Detroit home. Could you help me with next steps?",
  email: "info@reservecoatings.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reservecoatings.com",
} as const;

export const LOGOS = {
  primary: "/images/brand/logo-primary.png",
  knockout: "/images/brand/logo-knockout.png",
  darkLockup: "/images/brand/logo-dark-lockup.png",
  mark: "/images/brand/logo-mark.png",
} as const;

export type LogoVariant = keyof typeof LOGOS;

export const LOGO_HEIGHT = {
  nav: { mobile: 40, desktop: 52 },
  hero: { mobile: 48, desktop: 80 },
  heroCompact: { mobile: 40, desktop: 56 },
  footer: { mobile: 44, desktop: 56 },
} as const;

export type LogoSize = "default" | "nav" | "hero" | "heroCompact" | "footer";

export const NAV_SERVICES = [
  { href: "/garages", label: "Garage Floors" },
  { href: "/basements", label: "Basement Floors" },
  { href: "/outdoor", label: "Outdoor & Patio" },
  { href: "/commercial", label: "Commercial" },
] as const;

export const TRUST_STATS = {
  googleRating: 4.9,
  installCount: 100,
} as const;

export const NAV_LINKS = [
  { href: "/colors", label: "Colors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;
