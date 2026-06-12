import { z } from "zod";

/** Trimmed, non-empty email — required for sheet + post-approval notifications. */
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");

export function normalizeEmail(email: string): string {
  return emailSchema.parse(email);
}
