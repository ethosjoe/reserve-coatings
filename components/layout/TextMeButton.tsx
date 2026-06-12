import { MessageSquare } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { buildSmsUrl } from "@/lib/sms";
import { cn } from "@/lib/utils";

type Variant = "nav" | "navDark" | "utility" | "footer" | "cta";

const styles: Record<Variant, string> = {
  nav: "inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-bone px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-obsidian transition-colors hover:border-champagne/60 hover:text-champagne",
  navDark:
    "inline-flex items-center gap-1.5 rounded-sm border border-champagne/40 bg-transparent px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-bone transition-colors hover:border-champagne hover:bg-champagne/10",
  utility:
    "inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-bone/90 transition-colors hover:text-champagne",
  footer:
    "inline-flex items-center gap-1.5 rounded-sm border border-champagne/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-champagne hover:bg-champagne/10",
  cta: "inline-flex items-center gap-2 rounded-sm border border-champagne/50 bg-transparent px-5 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-bone transition-colors hover:border-champagne hover:bg-champagne/10",
};

export function TextMeButton({
  variant = "nav",
  className,
  label = "Text me",
}: {
  variant?: Variant;
  className?: string;
  label?: string;
}) {
  const href = buildSmsUrl();

  return (
    <a
      href={href}
      className={cn(styles[variant], className)}
      aria-label={`${label} at ${BRAND.phone} — opens Messages with a pre-filled text to Reserve Coatings`}
    >
      <MessageSquare className={variant === "utility" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      {label}
    </a>
  );
}
