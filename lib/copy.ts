import {
  normalizeAppointmentType,
  requiresPreferredDateTime,
  type AppointmentType,
} from "@/lib/validators/appointment";

/** Centralized marketing & form copy — editorial, varied CTAs */

export const CTAS = {
  quotePrimary: "Get your estimate",
  quoteHero: "Start your estimate",
  quoteTool: "Open the quote tool",
  bookConsult: "Book a consultation",
  seeProcess: "See how we install",
  viewGallery: "View transformations",
  contact: "Talk to our team",
} as const;

export const FORM_COPY = {
  successTitle: "You're on the list",
  successBody:
    "A Reserve project specialist will review your request within one business day — usually sooner. Watch for our reply at the email you provided.",
  successBodyScheduled:
    "A Reserve project specialist will review your preferred time within one business day. Once your appointment is approved, you'll receive a confirmation email and a Google Calendar invite at the address you provided.",
  errorGeneric: "Something went wrong. Please try again or call us directly.",
  validationSummary:
    "Please complete all required fields — email is required, and preferred date and time are required when booking an appointment.",
  sending: "Sending…",
  saveEstimate: "Save your estimate",
} as const;

export function getFormSuccessCopy(appointmentType?: AppointmentType | "") {
  const scheduled = requiresPreferredDateTime(normalizeAppointmentType(appointmentType));
  return {
    title: FORM_COPY.successTitle,
    body: scheduled ? FORM_COPY.successBodyScheduled : FORM_COPY.successBody,
  };
}

export const HOME_COPY = {
  hero: {
    eyebrow: "Metro Detroit epoxy floors",
    badge: "Garage installs from",
    headline: "Floors that look custom. Installed in a day. Guaranteed for life.",
    sub: "Metallic, flake, and designer epoxy for garages and basements — moisture-tested prep, in-house installation crews, transferable lifetime warranty.",
    ctaPrimary: CTAS.quoteHero,
    ctaSecondary: CTAS.bookConsult,
  },
  quotePromo: {
    eyebrow: "60-second estimate",
    headline: "Your number, without the sales pitch.",
    sub: "Square footage, finish tier, optional photos — we return a real range backed by how we scope every Metro Detroit install.",
    cta: CTAS.quoteTool,
  },
  whyReserve: {
    eyebrow: "Why homeowners choose Reserve",
    headline: "Built like a product. Installed like a craft.",
  },
  footerCta: {
    eyebrow: "Reserve Coatings",
    headline: "Ready for a floor you'll never second-guess?",
    description:
      "Epoxy systems engineered for Michigan garages, basements, and outdoor living — installed in one day, backed for life.",
  },
} as const;

export const QUOTE_COPY = {
  step1Title: "What space are we transforming?",
  step2Title: "How much square footage?",
  step3Title: "Choose your finish tier",
  step4Title: "Add photos (optional)",
  step5Title: "Your personalized range",
  step6Title: "You're all set",
  progressLabel: "Instant estimate",
} as const;

export const PAGE_INTROS: Record<string, { eyebrow?: string; subtitle: string }> = {
  process: {
    eyebrow: "Our process",
    subtitle:
      "A documented six-stage protocol — moisture-tested prep, polyurea build, polyaspartic cure — executed by in-house Reserve crews.",
  },
  financing: {
    eyebrow: "Financing",
    subtitle: "Spread your investment over time without delaying the floor you want.",
  },
  reviews: {
    eyebrow: "Homeowner proof",
    subtitle: "Real Metro Detroit installs — rated 4.9 on Google, A+ with the BBB.",
  },
  blog: {
    eyebrow: "Insights",
    subtitle: "Guides on epoxy, polyurea, and what actually lasts in Michigan climates.",
  },
  promotions: {
    eyebrow: "Current offers",
    subtitle: "Seasonal savings on premium flake systems.",
  },
} as const;
