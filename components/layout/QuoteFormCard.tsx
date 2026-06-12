"use client";

import { useState, type FormEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppointmentTypeSelect } from "@/components/forms/AppointmentTypeSelect";
import { FormValidationAlert } from "@/components/forms/FormValidationAlert";
import { PreferredDateTimePicker } from "@/components/forms/PreferredDateTimePicker";
import { FormField } from "@/components/forms/FormField";
import { FORM_COPY } from "@/lib/copy";
import {
  applyZodIssues,
  getFirstZodMessage,
  readNamedFormFields,
  scrollToFieldName,
} from "@/lib/form-feedback";
import { fadeIn } from "@/lib/motion";
import {
  appointmentFieldsSchema,
  type AppointmentType,
} from "@/lib/validators/appointment";
import { appointmentScheduleRefinement } from "@/lib/validators/appointment-schedule-refinement";
import { emailSchema } from "@/lib/validators/email";
import { normalizePhoneDigits, phoneSchema } from "@/lib/validators/phone";
import { getFormSuccessCopy } from "@/lib/copy";
import type { LeadInput } from "@/lib/validators/lead";

const quoteFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: emailSchema,
    phone: phoneSchema,
    zip: z.string().min(5, "Enter a valid ZIP code"),
    message: z.string().optional(),
  })
  .merge(appointmentFieldsSchema)
  .superRefine(appointmentScheduleRefinement);

type FormData = z.infer<typeof quoteFormSchema>;

const DEFAULT_VALUES: FormData = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  message: "",
  appointmentType: "info-only",
  preferredDate: "",
  preferredTime: "",
};

export function QuoteFormCard({ service = "Garage" }: { service?: LeadInput["service"] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [successCopy, setSuccessCopy] = useState(getFormSuccessCopy("info-only"));
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    control,
    setValue,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const appointmentType = watch("appointmentType") ?? "info-only";

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setValidationMessage(null);
    setSubmitError(null);

    const raw = getValues();
    const fields = readNamedFormFields(
      event.currentTarget,
      ["name", "email", "phone", "zip", "message"],
      raw
    );
    const data: FormData = {
      ...DEFAULT_VALUES,
      ...fields,
      appointmentType: raw.appointmentType ?? "info-only",
      preferredDate: raw.preferredDate ?? "",
      preferredTime: raw.preferredTime ?? "",
    };

    const parsed = quoteFormSchema.safeParse(data);
    if (!parsed.success) {
      applyZodIssues(parsed.error, setError);
      const summary = getFirstZodMessage(parsed.error) ?? FORM_COPY.validationSummary;
      setValidationMessage(summary);
      const firstField = parsed.error.issues.find((issue) => typeof issue.path[0] === "string")
        ?.path[0] as string | undefined;
      if (firstField) scrollToFieldName(firstField);
      document.getElementById("quote-form-card")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setStatus("loading");
    try {
      const valid = parsed.data;
      const [firstName, ...rest] = valid.name.trim().split(/\s+/);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || valid.name.trim(),
          lastName: rest.join(" ") || "—",
          email: valid.email,
          phone: normalizePhoneDigits(valid.phone),
          city: "Metro Detroit",
          zip: valid.zip,
          service,
          timeline: "ASAP",
          budget: "Need a recommendation",
          source: "Google",
          message: valid.message,
          formType: "quote-card",
          appointmentType: valid.appointmentType ?? "info-only",
          preferredDate: valid.preferredDate ?? "",
          preferredTime: valid.preferredTime ?? "",
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Submit failed");
      }
      setSuccessCopy(getFormSuccessCopy(valid.appointmentType ?? "info-only"));
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error && err.message !== "Submit failed"
          ? err.message
          : FORM_COPY.errorGeneric
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Card variant="glass" className="border-champagne/40">
          <p className="font-display text-xl text-obsidian">{successCopy.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-graphite">{successCopy.body}</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card variant="glass" id="quote-form-card" className="backdrop-blur-xl">
      <h3 className="font-display text-xl text-bone">Request a quote</h3>
      <p className="mt-1 text-xs text-bone/60">We respond within one business day.</p>
      <form
        onSubmit={(e) => void submitForm(e)}
        className="form-on-dark mt-4 space-y-3"
        noValidate
      >
        <FormValidationAlert message={validationMessage} />
        <FormField id="q-name" label="Name" error={errors.name?.message}>
          <Input
            id="q-name"
            {...register("name")}
            name="name"
            className="form-input"
            autoComplete="name"
          />
        </FormField>
        <FormField id="q-email" label="Email" error={errors.email?.message}>
          <Input
            id="q-email"
            type="email"
            {...register("email")}
            name="email"
            className="form-input"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </FormField>
        <FormField id="q-phone" label="Phone" error={errors.phone?.message}>
          <Input
            id="q-phone"
            type="tel"
            {...register("phone")}
            name="phone"
            className="form-input"
            autoComplete="tel"
            placeholder="(248) 222-7466"
          />
        </FormField>
        <FormField id="q-zip" label="ZIP" error={errors.zip?.message}>
          <Input
            id="q-zip"
            {...register("zip")}
            name="zip"
            className="form-input"
            autoComplete="postal-code"
            inputMode="numeric"
          />
        </FormField>
        <Controller
          name="appointmentType"
          control={control}
          defaultValue="info-only"
          render={({ field }) => (
            <AppointmentTypeSelect
              value={field.value ?? "info-only"}
              onChange={(v) => {
                field.onChange(v);
                if (v === "info-only") {
                  setValue("preferredDate", "");
                  setValue("preferredTime", "");
                }
              }}
              error={errors.appointmentType?.message}
              id="q-appointmentType"
            />
          )}
        />
        <PreferredDateTimePicker
          appointmentType={appointmentType as AppointmentType}
          preferredDate={watch("preferredDate") ?? ""}
          preferredTime={watch("preferredTime") ?? ""}
          onDateChange={(v) => setValue("preferredDate", v)}
          onTimeChange={(v) => setValue("preferredTime", v)}
          allowToday
          dateError={errors.preferredDate?.message}
          timeError={errors.preferredTime?.message}
          idPrefix="q-card"
        />
        <FormField id="q-msg" label="Project details (optional)">
          <Textarea
            id="q-msg"
            {...register("message")}
            name="message"
            className="form-input"
            rows={3}
          />
        </FormField>
        <FormValidationAlert message={validationMessage} />
        <Button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
          {status === "loading" ? FORM_COPY.sending : "Send request"}
        </Button>
        {status === "error" && submitError && (
          <p className="text-sm text-destructive" role="alert">
            {submitError}
          </p>
        )}
      </form>
    </Card>
  );
}
