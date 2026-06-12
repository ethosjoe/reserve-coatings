import { z } from "zod";

export const appointmentTypeSchema = z.enum([
  "virtual",
  "in-person",
  "phone-callback",
  "info-only",
]);

export type AppointmentType = z.infer<typeof appointmentTypeSchema>;

export const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  virtual: "Virtual walk-through",
  "in-person": "In-person measure",
  "phone-callback": "Phone callback",
  "info-only": "Just send info — no appointment",
};

export const appointmentFieldsSchema = z.object({
  appointmentType: appointmentTypeSchema.optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

const SCHEDULED_TYPES: AppointmentType[] = ["virtual", "in-person", "phone-callback"];

export function requiresPreferredDateTime(
  appointmentType: AppointmentType | undefined
): boolean {
  return !!appointmentType && SCHEDULED_TYPES.includes(appointmentType);
}

export function normalizeAppointmentType(
  value: AppointmentType | "" | undefined
): AppointmentType | undefined {
  return value === "" || value === undefined ? undefined : value;
}

export function appointmentRefinement(
  data: {
    appointmentType?: AppointmentType | "";
    preferredDate?: string;
    preferredTime?: string;
  },
  ctx: z.RefinementCtx
) {
  const appointmentType = normalizeAppointmentType(data.appointmentType);
  if (!requiresPreferredDateTime(appointmentType)) return;

  if (!data.preferredDate?.trim()) {
    ctx.addIssue({
      code: "custom",
      message: "Preferred date is required",
      path: ["preferredDate"],
    });
  }
  if (!data.preferredTime?.trim()) {
    ctx.addIssue({
      code: "custom",
      message: "Preferred time is required",
      path: ["preferredTime"],
    });
  }
}

export function bookingTypeToAppointmentType(
  bookingType: "virtual" | "in-person" | "none" | undefined
): AppointmentType {
  if (bookingType === "virtual") return "virtual";
  if (bookingType === "in-person") return "in-person";
  return "info-only";
}
