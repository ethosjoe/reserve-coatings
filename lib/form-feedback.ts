import type { ZodError } from "zod";
import type { FieldErrors, FieldValues, UseFormSetError } from "react-hook-form";

/** Zod 4 defaults to opaque "Invalid input" — map to plain language. */
export function friendlyZodMessage(message: string): string {
  if (message.startsWith("Invalid input")) {
    if (message.includes("received undefined") || message.includes("received null")) {
      return "This field is required.";
    }
    return "Please check this field.";
  }
  if (message.startsWith("Invalid option")) return "Please choose a valid option.";
  return message;
}

/** Read text fields from the DOM (autofill-safe) with RHF state as fallback. */
export function readNamedFormFields(
  form: HTMLFormElement,
  names: readonly string[],
  fallback: Record<string, string | undefined> = {}
): Record<string, string> {
  const formData = new FormData(form);
  const values: Record<string, string> = {};
  for (const name of names) {
    const fromDom = formData.get(name);
    values[name] =
      typeof fromDom === "string"
        ? fromDom
        : String(fallback[name] ?? "");
  }
  return values;
}

export function applyZodIssues<T extends FieldValues>(
  error: ZodError,
  setError: UseFormSetError<T>
) {
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string") continue;
    setError(field as Parameters<UseFormSetError<T>>[0], {
      message: friendlyZodMessage(issue.message),
    });
  }
}

export function getFirstZodMessage(error: ZodError): string | null {
  const first = error.issues[0];
  return first ? friendlyZodMessage(first.message) : null;
}

export function getFirstErrorMessage(errors: FieldErrors<FieldValues>): string | null {
  for (const value of Object.values(errors)) {
    if (!value) continue;
    if ("message" in value && typeof value.message === "string") {
      return friendlyZodMessage(value.message);
    }
    if (typeof value === "object") {
      const nested = getFirstErrorMessage(value as FieldErrors<FieldValues>);
      if (nested) return nested;
    }
  }
  return null;
}

function candidateIdsForField(field: string): string[] {
  const prefixes = ["contact", "widget", "q-card", "quote"];
  const ids = [field, ...prefixes.map((p) => `${p}-${field}`)];

  if (field === "preferredDate") {
    ids.push(...prefixes.map((p) => `${p}-date`), "preferredDate");
  }
  if (field === "preferredTime") {
    ids.push(...prefixes.map((p) => `${p}-time`), "preferredTime");
  }
  if (field === "appointmentType") {
    ids.push("q-appointmentType", "appointmentType", "widget-appointmentType");
  }

  return ids;
}

export function scrollToFieldName(field: string) {
  const el = candidateIdsForField(field)
    .map((id) => document.getElementById(id))
    .find(Boolean);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  if (el instanceof HTMLElement) el.focus();
}

export function scrollToFirstFormError(errors: FieldErrors<FieldValues>) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;

  const el = candidateIdsForField(firstKey)
    .map((id) => document.getElementById(id))
    .find(Boolean);

  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  if (el instanceof HTMLElement) el.focus();
}
