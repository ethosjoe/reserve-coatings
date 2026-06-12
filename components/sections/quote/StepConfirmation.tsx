import Link from "next/link";
import { formatCurrency, calculateEstimate } from "@/lib/pricing";
import { FORM_COPY, QUOTE_COPY } from "@/lib/copy";
import { bookingTypeToAppointmentType } from "@/lib/validators/appointment";
import type { QuoteState } from "./quote-state";

export function StepConfirmation({ state }: { state: QuoteState }) {
  const estimate =
    state.tier ? calculateEstimate(state.sqft, state.tier) : { low: 0, high: 0 };
  const appointmentType = bookingTypeToAppointmentType(state.bookingType);
  const scheduled = appointmentType !== "info-only";

  return (
    <div className="text-center">
      <h1 className="font-display text-3xl font-light text-obsidian sm:text-4xl">{QUOTE_COPY.step6Title}</h1>
      <p className="mt-6 text-graphite">
        {state.spaceType} · {state.sqft} sq ft · {state.tier} tier
      </p>
      <p className="mt-2 text-2xl tabular-nums text-obsidian">
        {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
      </p>
      <p className="mt-8 text-sm leading-relaxed text-smoke">
        {scheduled ? (
          <>
            {FORM_COPY.successBodyScheduled} We also sent a summary of your estimate to{" "}
            <span className="text-graphite">{state.email}</span>.
          </>
        ) : (
          <>
            We saved your estimate and sent a summary to{" "}
            <span className="text-graphite">{state.email}</span>. {FORM_COPY.successBody}
          </>
        )}
      </p>
      <Link href="/" className="btn-primary mt-10 inline-flex">
        Return home
      </Link>
    </div>
  );
}
