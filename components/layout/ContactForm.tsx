"use client";

import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { leadSchema, type LeadInput } from "@/lib/validators/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentTypeSelect } from "@/components/forms/AppointmentTypeSelect";
import { FormValidationAlert } from "@/components/forms/FormValidationAlert";
import { PreferredDateTimePicker } from "@/components/forms/PreferredDateTimePicker";
import { FormField } from "@/components/forms/FormField";
import { FORM_COPY, getFormSuccessCopy } from "@/lib/copy";
import {
  applyZodIssues,
  getFirstZodMessage,
  readNamedFormFields,
  scrollToFieldName,
} from "@/lib/form-feedback";
import { fadeIn } from "@/lib/motion";
import { LEAD_SERVICE_LABELS, LEAD_SERVICE_OPTIONS } from "@/lib/services";
import { normalizePhoneDigits } from "@/lib/validators/phone";
import type { AppointmentType } from "@/lib/validators/appointment";

export function ContactForm({
  defaultService,
  formType = "contact",
  compact = false,
}: {
  defaultService?: LeadInput["service"];
  formType?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [successCopy, setSuccessCopy] = useState(getFormSuccessCopy("info-only"));
  const {
    register,
    setValue,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LeadInput>({
    defaultValues: {
      service: defaultService ?? "Not Sure",
      timeline: "Just exploring",
      budget: "Need a recommendation",
      source: "Google",
      appointmentType: "info-only" as AppointmentType,
      preferredDate: "",
      preferredTime: "",
      ...(compact ? { lastName: "—", city: "Metro Detroit", zip: "00000" } : {}),
    },
  });

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setValidationMessage(null);

    const raw = getValues();
    const fieldNames = compact
      ? (["firstName", "email", "phone", "message"] as const)
      : (["firstName", "lastName", "email", "phone", "city", "zip", "message"] as const);
    const fields = readNamedFormFields(event.currentTarget, fieldNames, raw);

    const data = {
      ...raw,
      ...fields,
      phone: normalizePhoneDigits(fields.phone || raw.phone || ""),
      service: raw.service ?? defaultService ?? "Not Sure",
      timeline: raw.timeline ?? "Just exploring",
      budget: raw.budget ?? "Need a recommendation",
      source: raw.source ?? "Google",
      appointmentType: raw.appointmentType ?? "info-only",
      preferredDate: raw.preferredDate ?? "",
      preferredTime: raw.preferredTime ?? "",
      ...(compact ? { lastName: "—", city: "Metro Detroit", zip: "00000" } : {}),
    };

    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      applyZodIssues(parsed.error, setError);
      setValidationMessage(getFirstZodMessage(parsed.error) ?? FORM_COPY.validationSummary);
      const firstField = parsed.error.issues.find((issue) => typeof issue.path[0] === "string")
        ?.path[0] as string | undefined;
      if (firstField) scrollToFieldName(firstField);
      return;
    }

    setStatus("loading");
    const payload = compact
      ? { ...parsed.data, formType }
      : { ...parsed.data, formType };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccessCopy(getFormSuccessCopy(parsed.data.appointmentType ?? "info-only"));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="rounded-sm border border-champagne/40 bg-white p-8"
      >
        <p className="font-display text-2xl text-obsidian">{successCopy.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-graphite">{successCopy.body}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => void submitForm(e)}
      className={compact ? "space-y-4 rounded-sm border border-hairline bg-white p-6 md:p-8" : "space-y-4"}
      noValidate
    >
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField
          id="firstName"
          label={compact ? "Name" : "First name"}
          error={errors.firstName?.message}
        >
          <Input id="firstName" {...register("firstName")} className="form-input" />
        </FormField>
        {!compact && (
          <FormField id="lastName" label="Last name" error={errors.lastName?.message}>
            <Input id="lastName" {...register("lastName")} className="form-input" />
          </FormField>
        )}
        <FormField id="email" label="Email" error={errors.email?.message}>
          <Input id="email" type="email" {...register("email")} className="form-input" />
        </FormField>
        <FormField id="phone" label="Phone" error={errors.phone?.message}>
          <Input id="phone" {...register("phone")} className="form-input" />
        </FormField>
        {!compact && (
          <>
            <FormField id="city" label="City" error={errors.city?.message}>
              <Input id="city" {...register("city")} className="form-input" />
            </FormField>
            <FormField id="zip" label="ZIP" error={errors.zip?.message}>
              <Input id="zip" {...register("zip")} className="form-input" />
            </FormField>
          </>
        )}
      </div>
      {!compact && (
        <>
          <FormField id="service" label="Service of interest">
            <Select
              value={watch("service")}
              onValueChange={(v) => setValue("service", v as LeadInput["service"])}
            >
              <SelectTrigger className="form-input mt-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEAD_SERVICE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {LEAD_SERVICE_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="timeline" label="Timeline">
              <Select
                value={watch("timeline")}
                onValueChange={(v) => setValue("timeline", v as LeadInput["timeline"])}
              >
                <SelectTrigger className="form-input mt-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["ASAP", "Within 30 days", "Within 90 days", "Just exploring"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField id="budget" label="Estimated budget">
              <Select
                value={watch("budget")}
                onValueChange={(v) => setValue("budget", v as LeadInput["budget"])}
              >
                <SelectTrigger className="form-input mt-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Under $2k", "$2–4k", "$4–7k", "$7k+", "Need a recommendation"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <FormField id="source" label="How did you hear about us?">
            <Select
              value={watch("source")}
              onValueChange={(v) => setValue("source", v as LeadInput["source"])}
            >
              <SelectTrigger className="form-input mt-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Google",
                  "Instagram",
                  "Facebook",
                  "Drove past a job",
                  "Referral",
                  "Nextdoor",
                  "Yelp",
                  "Other",
                ].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </>
      )}
      <FormValidationAlert message={validationMessage} />
      <AppointmentTypeSelect
        value={watch("appointmentType")}
        onChange={(v) => {
          setValue("appointmentType", v, { shouldValidate: true });
          if (v === "info-only") {
            setValue("preferredDate", "", { shouldValidate: true });
            setValue("preferredTime", "", { shouldValidate: true });
          }
        }}
        error={errors.appointmentType?.message}
      />
      <PreferredDateTimePicker
        appointmentType={watch("appointmentType")}
        preferredDate={watch("preferredDate") ?? ""}
        preferredTime={watch("preferredTime") ?? ""}
        onDateChange={(v) => setValue("preferredDate", v, { shouldValidate: true })}
        onTimeChange={(v) => setValue("preferredTime", v, { shouldValidate: true })}
        allowToday={watch("timeline") === "ASAP"}
        dateError={errors.preferredDate?.message}
        timeError={errors.preferredTime?.message}
        idPrefix="contact"
      />
      <FormField
        id="message"
        label={compact ? "Tell us about your project" : "Message (optional)"}
        error={errors.message?.message}
      >
        <Textarea id="message" {...register("message")} className="form-input" rows={compact ? 3 : 4} />
      </FormField>
      <Button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? FORM_COPY.sending : compact ? "Send inquiry" : "Send inquiry"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          {FORM_COPY.errorGeneric}
        </p>
      )}
      <p className="text-xs text-smoke">We never share your information.</p>
    </form>
  );
}
