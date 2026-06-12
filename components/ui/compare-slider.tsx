"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CompareSlider({
  before,
  after,
  alt,
  className,
}: {
  before: string;
  after: string;
  alt: string;
  className?: string;
}) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/10] w-full select-none overflow-hidden rounded-xl bg-obsidian shadow-card",
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      role="slider"
      aria-label={`Before and after: ${alt}`}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <Image
        src={after}
        alt={`After: ${alt}`}
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 100vw, 1280px"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={before}
          alt={`Before: ${alt}`}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          draggable={false}
        />
      </div>

      {/* Handle line */}
      <div
        className="absolute bottom-0 top-0 z-10 w-px bg-champagne/80"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-champagne bg-obsidian/90 shadow-glow-accent transition-transform duration-base ease-luxury",
            dragging && "scale-110"
          )}
        >
          <div className="flex gap-0.5">
            <span className="h-3 w-0.5 rounded-full bg-champagne/60" />
            <span className="h-3 w-0.5 rounded-full bg-champagne/60" />
          </div>
        </div>
      </div>

      <span className="absolute left-4 top-4 rounded-md border border-white/10 bg-obsidian/70 px-2.5 py-1 text-xs uppercase tracking-widest text-bone backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-md border border-white/10 bg-obsidian/70 px-2.5 py-1 text-xs uppercase tracking-widest text-bone backdrop-blur-sm">
        After
      </span>
    </div>
  );
}
