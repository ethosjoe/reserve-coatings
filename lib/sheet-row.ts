import { computeScheduledRange } from "@/lib/appointment-schedule";
import { normalizePhotoUrls } from "@/lib/upload-url";
import { formatCurrency } from "@/lib/pricing";
import {
  bookingTypeToAppointmentType,
  requiresPreferredDateTime,
  type AppointmentType,
} from "@/lib/validators/appointment";
import { normalizeEmail } from "@/lib/validators/email";
import { leadServiceToSpaceType } from "@/lib/services";
import type { LeadInput } from "@/lib/validators/lead";
import type { FinishTier } from "@/lib/pricing";
import type { QuoteInput } from "@/lib/validators/quote";

export const SHEET_COLUMNS = [
  "submissionId",
  "submittedAt",
  "submissionType",
  "formType",
  "status",
  "appointmentType",
  "preferredDate",
  "preferredTime",
  "scheduledStart",
  "scheduledEnd",
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "zip",
  "service",
  "timeline",
  "budget",
  "source",
  "message",
  "bookingType",
  "estimateRange",
  "spaceType",
  "sqft",
  "tier",
  "photoUrls",
  "approvedAt",
  "calendarEventId",
  "calendarEventLink",
  "syncError",
] as const;

export type SheetRow = Record<(typeof SHEET_COLUMNS)[number], string>;

function emptyRow(): SheetRow {
  return Object.fromEntries(SHEET_COLUMNS.map((col) => [col, ""])) as SheetRow;
}

function applyAppointmentFields(
  row: SheetRow,
  appointmentType: AppointmentType | undefined,
  preferredDate: string | undefined,
  preferredTime: string | undefined
) {
  const type = appointmentType ?? "info-only";
  row.appointmentType = type;
  row.preferredDate = preferredDate?.trim() ?? "";
  row.preferredTime = preferredTime?.trim() ?? "";
  row.scheduledStart = "";
  row.scheduledEnd = "";

  if (!requiresPreferredDateTime(type)) return;

  const range = computeScheduledRange(preferredDate, preferredTime, type);
  if (!range) {
    throw new Error("Invalid preferred date and time for scheduled appointment");
  }
  if (Number.isNaN(Date.parse(range.scheduledStart))) {
    throw new Error("Invalid scheduledStart ISO value");
  }
  if (Number.isNaN(Date.parse(range.scheduledEnd))) {
    throw new Error("Invalid scheduledEnd ISO value");
  }

  row.scheduledStart = range.scheduledStart;
  row.scheduledEnd = range.scheduledEnd;
}

export function buildLeadSheetRow(data: LeadInput): SheetRow {
  const row = emptyRow();
  row.submittedAt = new Date().toISOString();
  row.submissionType = "lead";
  row.formType = data.formType ?? "";
  row.status = "Pending";
  row.firstName = data.firstName.trim();
  row.lastName = data.lastName.trim();
  row.email = normalizeEmail(data.email);
  row.phone = data.phone;
  row.city = data.city;
  row.zip = data.zip;
  row.service = data.service;
  const spaceType = leadServiceToSpaceType(data.service);
  if (spaceType) row.spaceType = spaceType;
  row.timeline = data.timeline;
  row.budget = data.budget;
  row.source = data.source;
  row.message = data.message ?? "";

  applyAppointmentFields(
    row,
    data.appointmentType ?? "info-only",
    data.preferredDate,
    data.preferredTime
  );
  return row;
}

export function buildQuoteSheetRow(data: QuoteInput): SheetRow {
  const row = emptyRow();
  const appointmentType =
    data.appointmentType ?? bookingTypeToAppointmentType(data.bookingType);

  row.submittedAt = new Date().toISOString();
  row.submissionType = "instant_quote";
  row.formType = "instant-quote";
  row.status = "Pending";
  row.submissionId = data.submissionId?.trim() ?? "";
  row.firstName = data.firstName.trim();
  row.lastName = data.lastName.trim();
  row.email = normalizeEmail(data.email);
  row.phone = data.phone;
  row.zip = data.zip;
  row.bookingType = data.bookingType ?? "none";
  row.estimateRange = `${formatCurrency(data.estimateLow)} – ${formatCurrency(data.estimateHigh)}`;
  row.spaceType = data.spaceType;
  row.sqft = String(data.sqft);
  row.tier = data.tier;
  row.photoUrls = normalizePhotoUrls(data.photoUrls).join("\n");

  applyAppointmentFields(row, appointmentType, data.preferredDate, data.preferredTime);
  return row;
}

export type QuotePhotoSyncInput = {
  submissionId: string;
  spaceType: QuoteInput["spaceType"];
  sqft: number;
  tier: FinishTier;
  photoUrls: string[];
};

export function buildQuotePhotoSyncRow(data: QuotePhotoSyncInput): SheetRow {
  const row = emptyRow();
  row.submissionId = data.submissionId.trim();
  row.submittedAt = new Date().toISOString();
  row.submissionType = "instant_quote";
  row.formType = "instant-quote";
  row.status = "Pending";
  row.spaceType = data.spaceType;
  row.sqft = String(data.sqft);
  row.tier = data.tier;
  row.photoUrls = normalizePhotoUrls(data.photoUrls).join("\n");
  row.appointmentType = "info-only";
  return row;
}
