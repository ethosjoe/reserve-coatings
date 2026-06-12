import Image from "next/image";
import Link from "next/link";
import { LOGOS, type LogoSize, type LogoVariant } from "@/lib/brand";
import { cn } from "@/lib/utils";

const variantMap: Record<LogoVariant, string> = {
  primary: LOGOS.primary,
  knockout: LOGOS.knockout,
  darkLockup: LOGOS.darkLockup,
  mark: LOGOS.mark,
};

const variantDimensions: Record<
  LogoVariant,
  { width: number; height: number }
> = {
  primary: { width: 240, height: 80 },
  knockout: { width: 240, height: 80 },
  darkLockup: { width: 200, height: 208 },
  mark: { width: 64, height: 62 },
};

const sizeClasses: Record<LogoSize, string> = {
  default: "h-9 w-auto max-w-[200px] object-contain object-left md:h-11 md:max-w-[240px]",
  nav: "h-10 w-auto max-w-[220px] object-contain object-left md:h-[52px] md:max-w-[280px]",
  hero: "h-12 w-auto max-w-[240px] object-contain object-left md:h-20 md:max-w-[320px]",
  heroCompact: "h-10 w-auto max-w-[200px] object-contain object-left md:h-14 md:max-w-[240px]",
  footer: "h-11 w-auto max-w-[220px] object-contain object-left md:h-14 md:max-w-[260px]",
};

const variantSizeClasses: Partial<Record<LogoVariant, string>> = {
  darkLockup: "h-auto w-[160px] max-w-[200px] object-contain object-center md:w-[200px]",
  mark: "h-10 w-10 object-contain object-center",
};

export function Logo({
  variant = "primary",
  size = "default",
  className,
  priority = false,
}: {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  priority?: boolean;
}) {
  const src = variantMap[variant];
  const dims = variantDimensions[variant];
  const imageClass =
    variantSizeClasses[variant] ?? sizeClasses[size];

  return (
    <Link href="/" className={cn("inline-block shrink-0", className)}>
      <Image
        src={src}
        alt="Reserve Coatings Epoxy Floors"
        width={dims.width}
        height={dims.height}
        priority={priority}
        className={imageClass}
      />
    </Link>
  );
}
