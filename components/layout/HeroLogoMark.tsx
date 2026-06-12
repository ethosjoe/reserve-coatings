import { Logo } from "@/components/layout/Logo";
import type { LogoSize } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function HeroLogoMark({
  size = "hero",
  className,
}: {
  size?: Extract<LogoSize, "hero" | "heroCompact">;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hidden lg:flex lg:items-end lg:justify-end",
        className
      )}
    >
      <Logo variant="knockout" size={size} className="opacity-90" />
    </div>
  );
}
