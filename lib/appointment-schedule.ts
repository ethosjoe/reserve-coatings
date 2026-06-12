import type { AppointmentType } from "@/lib/validators/appointment";

/** 30-minute slots Mon–Sat, 9:00 AM – 6:00 PM */
export const PREFERRED_TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 17 && minute === 30) continue;
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const mm = minute === 0 ? "00" : "30";
      slots.push(`${displayHour}:${mm} ${period}`);
    }
  }
  slots.push("6:00 PM");
  return slots;
})();

function parseTimeTo24h(time: string): { hours: number; minutes: number } | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return { hours, minutes };
}

function durationMinutes(appointmentType: AppointmentType | undefined): number {
  if (appointmentType === "phone-callback") return 30;
  if (appointmentType === "virtual" || appointmentType === "in-person") return 60;
  return 0;
}

/** Format ISO range for sheet + Google Calendar (America/Detroit). */
export function computeScheduledRange(
  preferredDate: string | undefined,
  preferredTime: string | undefined,
  appointmentType: AppointmentType | undefined
): { scheduledStart: string; scheduledEnd: string } | null {
  if (!preferredDate?.trim() || !preferredTime?.trim()) return null;
  if (!appointmentType || appointmentType === "info-only") return null;

  const parsed = parseTimeTo24h(preferredTime);
  if (!parsed) return null;

  const [year, month, day] = preferredDate.split("-").map(Number);
  if (!year || !month || !day) return null;

  // Detroit is UTC-5 (EST) / UTC-4 (EDT); use local offset via Intl for the date
  const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Detroit",
    timeZoneName: "shortOffset",
  }).formatToParts(probe);
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT-5";
  const offsetMatch = offsetPart.match(/GMT([+-]\d+)/);
  const offsetHours = offsetMatch ? parseInt(offsetMatch[1], 10) : -5;

  const startUtc = Date.UTC(
    year,
    month - 1,
    day,
    parsed.hours - offsetHours,
    parsed.minutes,
    0
  );
  const endUtc = startUtc + durationMinutes(appointmentType) * 60 * 1000;

  return {
    scheduledStart: new Date(startUtc).toISOString(),
    scheduledEnd: new Date(endUtc).toISOString(),
  };
}

export function minPreferredDate(allowToday = false): string {
  const d = new Date();
  if (!allowToday) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}
