"use client";

import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { minPreferredDate, PREFERRED_TIME_SLOTS } from "@/lib/appointment-schedule";
import { requiresPreferredDateTime, type AppointmentType } from "@/lib/validators/appointment";

export function PreferredDateTimePicker({
  appointmentType,
  preferredDate,
  preferredTime,
  onDateChange,
  onTimeChange,
  allowToday = false,
  dateError,
  timeError,
  idPrefix = "appt",
  alwaysShow = false,
}: {
  appointmentType: AppointmentType | undefined;
  preferredDate: string;
  preferredTime: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  allowToday?: boolean;
  dateError?: string;
  timeError?: string;
  idPrefix?: string;
  alwaysShow?: boolean;
}) {
  if (!alwaysShow && !requiresPreferredDateTime(appointmentType)) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        id={`${idPrefix}-date`}
        label="Preferred date"
        error={dateError}
      >
        <Input
          id={`${idPrefix}-date`}
          type="date"
          min={minPreferredDate(allowToday)}
          value={preferredDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="form-input"
        />
      </FormField>
      <FormField
        id={`${idPrefix}-time`}
        label="Preferred time"
        error={timeError}
      >
        <Select value={preferredTime || undefined} onValueChange={onTimeChange}>
          <SelectTrigger id={`${idPrefix}-time`} className="form-input mt-0">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            {PREFERRED_TIME_SLOTS.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    </div>
  );
}
