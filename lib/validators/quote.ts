import { z } from "zod";
import {
  appointmentFieldsSchema,
  bookingTypeToAppointmentType,
} from "@/lib/validators/appointment";
import { appointmentScheduleRefinement } from "@/lib/validators/appointment-schedule-refinement";
import { emailSchema } from "@/lib/validators/email";
import { normalizePhotoUrls } from "@/lib/upload-url";

const photoUrlsSchema = z
  .array(z.string().min(1))
  .max(4)
  .optional()
  .transform((urls) => normalizePhotoUrls(urls));

export const quoteSchema = z
  .object({
    spaceType: z.enum(["garage", "basement", "outdoor", "commercial"]),
    sqft: z.number().min(100).max(5000),
    tier: z.enum(["standard", "premium"]),
    photoUrls: photoUrlsSchema,
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: emailSchema,
    phone: z.string().min(10),
    zip: z.string().min(5),
    estimateLow: z.number(),
    estimateHigh: z.number(),
    bookingType: z.enum(["virtual", "in-person", "none"]).optional(),
    submissionId: z.string().uuid().optional(),
  })
  .merge(appointmentFieldsSchema)
  .superRefine((data, ctx) => {
    const appointmentType =
      data.appointmentType ?? bookingTypeToAppointmentType(data.bookingType);
    appointmentScheduleRefinement(
      {
        appointmentType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
      },
      ctx
    );
  });

export type QuoteInput = z.infer<typeof quoteSchema>;
