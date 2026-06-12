import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group/card relative flex flex-col gap-4 overflow-hidden text-sm transition-all duration-base ease-luxury card-sheen",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border border-hairline/60 bg-white text-card-foreground shadow-card hover:-translate-y-0.5 hover:shadow-card-hover bg-gradient-to-b from-white to-bone/30",
        dark: "rounded-xl border border-white/10 bg-obsidian text-bone shadow-card hover:-translate-y-0.5 hover:shadow-card-hover bg-gradient-to-b from-white/[0.04] to-transparent",
        glass:
          "rounded-xl border border-white/10 bg-obsidian/40 text-bone shadow-card backdrop-blur-xl hover:-translate-y-0.5 hover:shadow-card-hover",
        elevated:
          "rounded-xl border border-hairline/40 bg-surface-elevated text-obsidian shadow-card hover:-translate-y-0.5 hover:shadow-card-hover",
      },
      size: {
        default: "p-6 gap-4",
        sm: "p-4 gap-3",
        none: "p-0 gap-0",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);

function Card({
  className,
  variant,
  size,
  interactive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, size, interactive, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-display text-display-sm text-obsidian group-data-[variant=dark]/card:text-bone group-[.surface-deep]/card:text-bone",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-smoke", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t border-hairline/40 pt-4",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
