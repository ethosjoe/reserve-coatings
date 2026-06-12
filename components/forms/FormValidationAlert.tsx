import { friendlyZodMessage } from "@/lib/form-feedback";

export function FormValidationAlert({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <p
      className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
      role="alert"
    >
      {friendlyZodMessage(message)}
    </p>
  );
}
