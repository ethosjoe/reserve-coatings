import { z } from "zod";

export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((value) => normalizePhoneDigits(value).length >= 10, {
    message: "Enter a valid 10-digit phone number",
  });
