import { cn } from "@/lib/utils";
import { EyebrowLabel } from "@/components/layout/EyebrowLabel";

type HeadingLevel = "h1" | "h2" | "h3";

const displaySizeMap = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
} as const;

export function SectionHeading({
  eyebrow,
  eyebrowVariant = "accent",
  title,
  subtitle,
  align = "left",
  size = "lg",
  as = "h2",
  dark = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  eyebrowVariant?: "default" | "accent";
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  size?: keyof typeof displaySizeMap;
  as?: HeadingLevel;
  dark?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  const Tag = as;

  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <EyebrowLabel
          variant={
            eyebrowVariant === "accent"
              ? dark
                ? "gold"
                : "gold-contrast"
              : "default"
          }
          className={cn("mb-4", align === "center" && "mx-auto")}
        >
          {eyebrow}
        </EyebrowLabel>
      )}
      <Tag
        className={cn(
          "font-display font-light tracking-tight text-balance",
          displaySizeMap[size],
          dark ? "text-bone" : "text-obsidian",
          titleClassName
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-body-lg text-balance",
            dark ? "text-bone/70" : "text-graphite",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
