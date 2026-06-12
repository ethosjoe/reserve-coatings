import { z } from "zod";
import { LEAD_SERVICE_OPTIONS } from "@/lib/services";
import { appointmentFieldsSchema } from "@/lib/validators/appointment";
import { appointmentScheduleRefinement } from "@/lib/validators/appointment-schedule-refinement";
import { emailSchema } from "@/lib/validators/email";

export const chatbotLeadSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(10, "Phone is required"),
    email: emailSchema,
    service: z.enum(LEAD_SERVICE_OPTIONS).optional(),
    message: z.string().optional(),
    formType: z.literal("chatbot").optional(),
  })
  .merge(appointmentFieldsSchema)
  .superRefine(appointmentScheduleRefinement);

export type ChatbotLeadInput = z.infer<typeof chatbotLeadSchema>;

export function chatbotToLeadPayload(data: ChatbotLeadInput) {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email,
    phone: data.phone,
    city: "Metro Detroit",
    zip: "00000",
    service: data.service ?? ("Not Sure" as const),
    timeline: "Just exploring" as const,
    budget: "Need a recommendation" as const,
    source: "Other" as const,
    message: data.message,
    formType: "chatbot",
    appointmentType: data.appointmentType,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
  };
}
