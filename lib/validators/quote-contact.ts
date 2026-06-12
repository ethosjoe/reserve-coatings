import { z } from "zod";
import { emailSchema } from "@/lib/validators/email";

export const quoteContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: emailSchema,
  phone: z.string().min(10, "Enter a valid phone number"),
  zip: z.string().min(5, "Enter a valid ZIP code"),
});

export type QuoteContactInput = z.infer<typeof quoteContactSchema>;
