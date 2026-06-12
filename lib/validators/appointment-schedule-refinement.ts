import type { z } from "zod";
import { computeScheduledRange } from "@/lib/appointment-schedule";
import {
  appointmentRefinement,
  normalizeAppointmentType,
  requiresPreferredDateTime,
  type AppointmentType,
} from "@/lib/validators/appointment";

type AppointmentFields = {
  appointmentType?: AppointmentType | "";
  preferredDate?: string;
  preferredTime?: string;
};

/** Validates preferred date/time presence and that ISO scheduled range can be computed. */
export function appointmentScheduleRefinement(
  data: AppointmentFields,
  ctx: z.RefinementCtx
) {
  appointmentRefinement(data, ctx);
  if (ctx.issues.length > 0) return;

  const appointmentType = normalizeAppointmentType(data.appointmentType);
  if (!requiresPreferredDateTime(appointmentType)) return;

  const range = computeScheduledRange(
    data.preferredDate,
    data.preferredTime,
    appointmentType
  );
  if (!range) {
    ctx.addIssue({
      code: "custom",
      message: "Enter a valid preferred date and time",
      path: ["preferredTime"],
    });
    return;
  }

  if (Number.isNaN(Date.parse(range.scheduledStart))) {
    ctx.addIssue({
      code: "custom",
      message: "Could not compute appointment start time",
      path: ["preferredTime"],
    });
  }
}
