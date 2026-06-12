"use client";

import { FormField } from "@/components/forms/FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  APPOINTMENT_TYPE_LABELS,
  type AppointmentType,
} from "@/lib/validators/appointment";

const APPOINTMENT_TYPES = Object.keys(APPOINTMENT_TYPE_LABELS) as AppointmentType[];

export function AppointmentTypeSelect({
  value,
  onChange,
  error,
  id = "appointmentType",
  label = "How would you like to connect?",
}: {
  value: AppointmentType | undefined;
  onChange: (value: AppointmentType) => void;
  error?: string;
  id?: string;
  label?: string;
}) {
  return (
    <FormField id={id} label={label} error={error}>
      <Select
        value={value ?? "info-only"}
        onValueChange={(v) => onChange(v as AppointmentType)}
      >
        <SelectTrigger id={id} className="form-input mt-0">
          <SelectValue placeholder="Select appointment type" />
        </SelectTrigger>
        <SelectContent>
          {APPOINTMENT_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {APPOINTMENT_TYPE_LABELS[type]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
