"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  speed = 40,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        pauseOnHover && "group/marquee hover:[&_.marquee-track]:[animation-play-state:paused]",
        className
      )}
    >
      <div
        className="marquee-track flex w-max gap-6"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
