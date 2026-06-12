"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormValidationAlert } from "@/components/forms/FormValidationAlert";
import { PreferredDateTimePicker } from "@/components/forms/PreferredDateTimePicker";
import { calculateEstimate, formatCurrency } from "@/lib/pricing";
import { computeScheduledRange } from "@/lib/appointment-schedule";
import { quoteContactSchema } from "@/lib/validators/quote-contact";
import {
  bookingTypeToAppointmentType,
  requiresPreferredDateTime,
} from "@/lib/validators/appointment";
import { FormField } from "@/components/forms/FormField";
import { FORM_COPY, QUOTE_COPY } from "@/lib/copy";
import { normalizePhotoUrls } from "@/lib/upload-url";
import { scaleIn } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { QuoteState } from "./quote-state";

export function StepEstimate({
  state,
  onContactChange,
  onComplete,
  onBack,
}: {
  state: QuoteState;
  onContactChange: (data: Partial<QuoteState>) => void;
  onComplete: (booking: QuoteState["bookingType"]) => void;
  onBack: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  const estimate = useMemo(() => {
    if (!state.tier) return { low: 0, high: 0 };
    return calculateEstimate(state.sqft, state.tier);
  }, [state.sqft, state.tier]);

  const validateBeforeSubmit = (bookingType: QuoteState["bookingType"]) => {
    const result = quoteContactSchema.safeParse({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      zip: state.zip,
    });
    const errs: Record<string, string> = {};
    if (!result.success) {
      result.error.issues.forEach((i) => {
        if (i.path[0]) errs[String(i.path[0])] = i.message;
      });
    }

    const appointmentType = bookingTypeToAppointmentType(bookingType);
    if (requiresPreferredDateTime(appointmentType)) {
      if (!state.preferredDate?.trim()) errs.preferredDate = "Preferred date is required";
      if (!state.preferredTime?.trim()) errs.preferredTime = "Preferred time is required";
      else if (
        state.preferredDate?.trim() &&
        !computeScheduledRange(state.preferredDate, state.preferredTime, appointmentType)
      ) {
        errs.preferredTime = "Enter a valid preferred date and time";
      }
    }

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.values(errs)[0];
      setValidationMessage(first ?? FORM_COPY.validationSummary);
      scrollToFirstField(errs);
      return false;
    }
    setValidationMessage(null);
    return true;
  };

  const scrollToFirstField = (errs: Record<string, string>) => {
    const firstKey = Object.keys(errs)[0];
    if (!firstKey) return;
    const idMap: Record<string, string> = {
      firstName: "q-first",
      lastName: "q-last",
      email: "q-email",
      phone: "q-phone",
      zip: "q-zip",
      preferredDate: "quote-date",
      preferredTime: "quote-time",
    };
    document.getElementById(idMap[firstKey] ?? firstKey)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const submitQuote = async (bookingType: QuoteState["bookingType"]) => {
    if (!state.tier || !state.spaceType || !validateBeforeSubmit(bookingType)) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: state.submissionId || undefined,
          spaceType: state.spaceType,
          sqft: state.sqft,
          tier: state.tier,
          photoUrls: normalizePhotoUrls(state.photoUrls),
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phone: state.phone,
          zip: state.zip,
          estimateLow: estimate.low,
          estimateHigh: estimate.high,
          bookingType: bookingType ?? "none",
          appointmentType: bookingTypeToAppointmentType(bookingType),
          preferredDate: state.preferredDate,
          preferredTime: state.preferredTime,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      onComplete(bookingType);
    } catch {
      setSubmitError(FORM_COPY.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const estimateEl = (
    <p className="mt-8 text-3xl font-medium tabular-nums text-obsidian md:text-4xl">
      {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
    </p>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
      <div className="lg:col-span-3">
        <h1 className="font-display text-3xl font-light text-obsidian sm:text-4xl">{QUOTE_COPY.step5Title}</h1>
        {reduced ? (
          estimateEl
        ) : (
          <motion.div initial="hidden" animate="visible" variants={scaleIn}>
            {estimateEl}
          </motion.div>
        )}
        <p className="mt-4 text-sm text-smoke">
          Final price confirmed after a free walk-through. Your range is valid for 30 days.
        </p>
        <div className="mt-4 space-y-3">
          <FormValidationAlert message={validationMessage} />
          {submitError && (
            <p className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
              {submitError}
            </p>
          )}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button
            className="btn-primary w-full sm:w-auto"
            disabled={submitting}
            onClick={() => submitQuote("virtual")}
          >
            {submitting ? FORM_COPY.sending : "Book virtual walk-through"}
          </Button>
          <Button
            className="btn-secondary w-full sm:w-auto"
            disabled={submitting}
            onClick={() => submitQuote("in-person")}
          >
            {submitting ? FORM_COPY.sending : "Book in-person measure"}
          </Button>
          <Button
            className="btn-secondary w-full sm:w-auto"
            disabled={submitting}
            onClick={() => submitQuote("none")}
          >
            Save estimate only
          </Button>
        </div>
        <Button onClick={onBack} className="btn-secondary mt-8">
          Back
        </Button>
      </div>
      <div className="rounded-sm border border-hairline bg-white p-4 sm:p-6 lg:col-span-2">
        <p className="text-sm font-medium text-obsidian">{FORM_COPY.saveEstimate}</p>
        <div className="mt-4 space-y-3">
          <FormField id="q-first" label="First name" error={fieldErrors.firstName}>
            <Input
              id="q-first"
              value={state.firstName}
              onChange={(e) => onContactChange({ firstName: e.target.value })}
              className="form-input"
              aria-invalid={!!fieldErrors.firstName}
            />
          </FormField>
          <FormField id="q-last" label="Last name" error={fieldErrors.lastName}>
            <Input
              id="q-last"
              value={state.lastName}
              onChange={(e) => onContactChange({ lastName: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField id="q-email" label="Email" error={fieldErrors.email}>
            <Input
              id="q-email"
              type="email"
              value={state.email}
              onChange={(e) => onContactChange({ email: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField id="q-phone" label="Phone" error={fieldErrors.phone}>
            <Input
              id="q-phone"
              value={state.phone}
              onChange={(e) => onContactChange({ phone: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField id="q-zip" label="ZIP" error={fieldErrors.zip}>
            <Input
              id="q-zip"
              value={state.zip}
              onChange={(e) => onContactChange({ zip: e.target.value })}
              className="form-input"
            />
          </FormField>
          <PreferredDateTimePicker
            appointmentType={
              state.bookingType === "none" ? "info-only" : state.bookingType ?? "virtual"
            }
            preferredDate={state.preferredDate}
            preferredTime={state.preferredTime}
            onDateChange={(v) => onContactChange({ preferredDate: v })}
            onTimeChange={(v) => onContactChange({ preferredTime: v })}
            allowToday
            dateError={fieldErrors.preferredDate}
            timeError={fieldErrors.preferredTime}
            idPrefix="quote"
            alwaysShow
          />
          <p className="text-xs text-smoke">
            Preferred date and time are required when booking a virtual or in-person appointment.
          </p>
        </div>
      </div>
    </div>
  );
}
