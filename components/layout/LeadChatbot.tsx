"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { ClipboardList, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { FORM_COPY, CTAS, getFormSuccessCopy } from "@/lib/copy";
import { AppointmentTypeSelect } from "@/components/forms/AppointmentTypeSelect";
import { FormField } from "@/components/forms/FormField";
import { FormValidationAlert } from "@/components/forms/FormValidationAlert";
import { PreferredDateTimePicker } from "@/components/forms/PreferredDateTimePicker";
import {
  LEAD_SERVICE_LABELS,
  LEAD_SERVICE_OPTIONS,
  pathnameToLeadService,
  quoteToolHref,
  type LeadService,
} from "@/lib/services";
import {
  chatbotLeadSchema,
  chatbotToLeadPayload,
  type ChatbotLeadInput,
} from "@/lib/validators/chatbot";
import {
  applyZodIssues,
  getFirstZodMessage,
  readNamedFormFields,
  scrollToFieldName,
} from "@/lib/form-feedback";
import { normalizePhoneDigits } from "@/lib/validators/phone";
import { cn } from "@/lib/utils";

function getChatbotDefaults(pathname: string): ChatbotLeadInput {
  return {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: pathnameToLeadService(pathname) ?? "Not Sure",
    message: "",
    appointmentType: "info-only",
    preferredDate: "",
    preferredTime: "",
  };
}

export function LeadChatbot() {
  const pathname = usePathname();
  const defaultValues = useMemo(() => getChatbotDefaults(pathname), [pathname]);

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successCopy, setSuccessCopy] = useState(getFormSuccessCopy("info-only"));
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    setValue,
    watch,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ChatbotLeadInput>({
    defaultValues,
  });

  const selectedService = watch("service") as LeadService | undefined;

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setSubmitError(null);
    setValidationMessage(null);

    const raw = getValues();
    const fields = readNamedFormFields(
      event.currentTarget,
      ["firstName", "lastName", "phone", "email", "message", "service"],
      raw
    );

    const data: ChatbotLeadInput = {
      ...defaultValues,
      ...raw,
      ...fields,
      phone: normalizePhoneDigits(fields.phone || raw.phone || ""),
      service: (fields.service || raw.service || defaultValues.service) as LeadService,
      appointmentType: raw.appointmentType ?? "info-only",
      preferredDate: raw.preferredDate ?? "",
      preferredTime: raw.preferredTime ?? "",
    };

    const parsed = chatbotLeadSchema.safeParse(data);
    if (!parsed.success) {
      applyZodIssues(parsed.error, setError);
      setValidationMessage(getFirstZodMessage(parsed.error) ?? FORM_COPY.validationSummary);
      const firstField = parsed.error.issues.find((issue) => typeof issue.path[0] === "string")
        ?.path[0] as string | undefined;
      if (firstField) scrollToFieldName(firstField);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatbotToLeadPayload({ ...parsed.data, formType: "chatbot" })),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSuccessCopy(getFormSuccessCopy(parsed.data.appointmentType ?? "info-only"));
      setSubmitted(true);
    } catch {
      setSubmitError(FORM_COPY.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  const openPanel = () => {
    setOpen(true);
    if (submitted) {
      setSubmitted(false);
      reset(getChatbotDefaults(pathname));
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[59] bg-obsidian/40 backdrop-blur-[2px]"
              aria-label="Close quote form"
              onClick={close}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-[calc(8.25rem+env(safe-area-inset-bottom))] right-4 z-[60] flex max-h-[min(640px,calc(100dvh-13rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-md border border-hairline bg-white shadow-[0_24px_80px_-12px_rgba(11,11,12,0.35)] md:right-6 lg:bottom-20 lg:max-h-[min(640px,calc(100dvh-6rem))]"
              role="dialog"
              aria-label="Request a quote"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="flex items-start justify-between gap-4 border-b border-hairline bg-bone px-5 py-4">
                <div>
                  <p className="font-display text-xl text-obsidian">Instant quote</p>
                  <p className="mt-0.5 text-xs text-smoke">Takes less than a minute</p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-sm p-1 text-smoke hover:bg-hairline/50 hover:text-obsidian"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {submitted ? (
                  <div className="py-8 text-center">
                    <p className="font-display text-2xl text-obsidian">{successCopy.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">
                      {successCopy.body}
                    </p>
                    <Button type="button" className="btn-primary mt-8" onClick={close}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => void submitForm(e)}
                    className="space-y-4"
                    noValidate
                  >
                    <Link
                      href={quoteToolHref(selectedService)}
                      className="flex w-full items-center justify-center rounded-sm border border-champagne/60 bg-champagne/10 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-obsidian transition-colors hover:bg-champagne/20"
                      onClick={close}
                    >
                      {CTAS.quoteTool}
                    </Link>
                    <p className="text-center text-[10px] uppercase tracking-widest text-smoke">
                      or send a quick request
                    </p>

                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <FormField id="widget-service" label="Service">
                          <input type="hidden" name="service" value={field.value ?? "Not Sure"} />
                          <Select
                            value={field.value ?? "Not Sure"}
                            onValueChange={(v) => field.onChange(v as LeadService)}
                          >
                            <SelectTrigger id="widget-service" className="form-input mt-0">
                              <SelectValue placeholder="Select a service" />
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
                      )}
                    />

                    <FormField id="widget-message" label="Project details">
                      <Textarea
                        id="widget-message"
                        {...register("message")}
                        rows={3}
                        placeholder="Garage size, timeline, questions…"
                        className="form-input resize-none"
                      />
                    </FormField>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        id="widget-firstName"
                        label="First name"
                        error={errors.firstName?.message}
                      >
                        <Input
                          id="widget-firstName"
                          {...register("firstName")}
                          className="form-input"
                          autoComplete="given-name"
                        />
                      </FormField>
                      <FormField
                        id="widget-lastName"
                        label="Last name"
                        error={errors.lastName?.message}
                      >
                        <Input
                          id="widget-lastName"
                          {...register("lastName")}
                          className="form-input"
                          autoComplete="family-name"
                        />
                      </FormField>
                    </div>

                    <FormField
                      id="widget-phone"
                      label="Phone number"
                      error={errors.phone?.message}
                    >
                      <Input
                        id="widget-phone"
                        type="tel"
                        {...register("phone")}
                        className="form-input"
                        autoComplete="tel"
                      />
                    </FormField>

                    <FormField id="widget-email" label="Email address" error={errors.email?.message}>
                      <Input
                        id="widget-email"
                        type="email"
                        {...register("email")}
                        className="form-input"
                        autoComplete="email"
                      />
                    </FormField>

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
                      id="widget-appointmentType"
                    />
                    <PreferredDateTimePicker
                      appointmentType={watch("appointmentType")}
                      preferredDate={watch("preferredDate") ?? ""}
                      preferredTime={watch("preferredTime") ?? ""}
                      onDateChange={(v) => setValue("preferredDate", v, { shouldValidate: true })}
                      onTimeChange={(v) => setValue("preferredTime", v, { shouldValidate: true })}
                      dateError={errors.preferredDate?.message}
                      timeError={errors.preferredTime?.message}
                      idPrefix="widget"
                    />

                    <p className="text-[11px] leading-relaxed text-smoke">
                      By submitting this form I agree to receive text messages and emails from{" "}
                      {BRAND.name}. Msg &amp; data rates may apply. Reply STOP to opt out.
                    </p>

                    <FormValidationAlert message={validationMessage} />

                    {submitError && (
                      <p className="text-xs text-destructive" role="alert">
                        {submitError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="btn-primary w-full py-3.5 text-[11px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? FORM_COPY.sending : "Send my quote request"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={open ? close : openPanel}
        className={cn(
          "fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-[45] flex items-center gap-2 rounded-full bg-champagne px-5 py-3.5 text-obsidian shadow-lg transition-all hover:bg-brushed md:right-6 lg:bottom-6 lg:z-[60]",
          open && "ring-2 ring-champagne ring-offset-2 ring-offset-bone"
        )}
        aria-expanded={open}
      >
        <ClipboardList className="h-5 w-5" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-[0.12em]">
          {open ? "Close" : "Get quote"}
        </span>
      </button>
    </>
  );
}
