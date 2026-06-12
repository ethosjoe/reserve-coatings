"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-base ease-luxury outline-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        primary:
          "bg-obsidian px-6 py-3 uppercase tracking-[0.15em] text-bone hover:bg-graphite active:scale-[0.98] focus-visible:ring-offset-bone",
        secondary:
          "border-hairline bg-bone px-6 py-3 uppercase tracking-[0.15em] text-obsidian hover:border-champagne/60 active:scale-[0.98]",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground",
        ghost:
          "relative px-2 py-1 uppercase tracking-[0.15em] text-obsidian hover:text-champagne after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-champagne after:transition-transform after:duration-base after:ease-luxury hover:after:scale-x-100",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-1.5 px-4",
        sm: "h-8 gap-1 px-3 text-xs",
        lg: "h-12 gap-2 px-8 text-sm",
        icon: "size-10",
        "icon-sm": "size-8",
      },
      sheen: {
        true: "btn-sheen overflow-hidden",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      sheen: false,
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  sheen = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, sheen, className }))}
      {...props}
    />
  );
}

function MagneticButton({
  className,
  variant = "primary",
  size = "default",
  sheen = true,
  strength = 0.15,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    strength?: number;
  }) {
  const reduced = usePrefersReducedMotion();
  const ref = React.useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setOffset({ x, y });
    },
    [reduced, strength]
  );

  const handleMouseLeave = React.useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, sheen, className }),
        !reduced && "will-change-transform"
      )}
      style={
        !reduced
          ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, MagneticButton, buttonVariants };
