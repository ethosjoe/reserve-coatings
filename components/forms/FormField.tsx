"use client";

import { Label } from "@/components/ui/label";
import { friendlyZodMessage } from "@/lib/form-feedback";
import { cn } from "@/lib/utils";

export function FormField({
  id,
  label,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={id} className="text-sm text-obsidian">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {friendlyZodMessage(error)}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-smoke">
          {hint}
        </p>
      )}
    </div>
  );
}
