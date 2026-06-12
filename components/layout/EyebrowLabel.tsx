import { cn } from "@/lib/utils";

export function EyebrowLabel({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "gold" | "gold-contrast";
  className?: string;
}) {
  return (
    <p
      className={cn(
        variant === "gold"
          ? "text-eyebrow"
          : variant === "gold-contrast"
            ? "font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#7A5C2E]"
            : "text-eyebrow-muted",
        className
      )}
    >
      {children}
    </p>
  );
}
