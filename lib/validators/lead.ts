import { z } from "zod";
import { appointmentFieldsSchema } from "@/lib/validators/appointment";
import { appointmentScheduleRefinement } from "@/lib/validators/appointment-schedule-refinement";
import { emailSchema } from "@/lib/validators/email";

export const leadSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: emailSchema,
    phone: z.string().min(10, "Phone number is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(5, "ZIP code is required"),
    service: z.enum([
      "Garage",
      "Basement",
      "Outdoor",
      "Commercial",
      "Multiple",
      "Not Sure",
    ]),
    timeline: z.enum([
      "ASAP",
      "Within 30 days",
      "Within 90 days",
      "Just exploring",
    ]),
    budget: z.enum([
      "Under $2k",
      "$2–4k",
      "$4–7k",
      "$7k+",
      "Need a recommendation",
    ]),
    source: z.enum([
      "Google",
      "Instagram",
      "Facebook",
      "Drove past a job",
      "Referral",
      "Nextdoor",
      "Yelp",
      "Other",
    ]),
    message: z.string().optional(),
    formType: z.string().optional(),
  })
  .merge(appointmentFieldsSchema)
  .superRefine(appointmentScheduleRefinement);

export type LeadInput = z.infer<typeof leadSchema>;
