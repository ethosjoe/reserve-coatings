"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LOGOS } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LuxuryLoaderProps = {
  /** Full viewport overlay vs inline block */
  variant?: "overlay" | "inline";
  className?: string;
};

/**
 * Reserve "cure line" loader — gold band levels across like wet epoxy,
 * not a generic spinner.
 */
export function LuxuryLoader({ variant = "overlay", className }: LuxuryLoaderProps) {
  const reduceMotion = useReducedMotion();

  const content = (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden px-8",
        variant === "overlay" && "min-h-[100dvh] w-full",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      {/* Logo */}
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <Image
          src={LOGOS.darkLockup}
          alt=""
          width={200}
          height={208}
          priority
          className="h-auto w-[140px] md:w-[180px]"
        />
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-champagne/25 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            aria-hidden
          />
        )}
      </motion.div>

      {/* Leveling cure line */}
      <div className="relative mt-10 h-px w-48 overflow-hidden md:w-56">
        <div className="absolute inset-0 bg-hairline/30" aria-hidden />
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-champagne to-brushed"
          initial={reduceMotion ? { width: "100%" } : { width: "0%" }}
          animate={{ width: ["0%", "100%", "100%", "0%"] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.4, repeat: Infinity, ease: [0.45, 0, 0.15, 1], times: [0, 0.45, 0.55, 1] }
          }
          aria-hidden
        />
        {!reduceMotion && (
          <motion.div
            className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-champagne shadow-[0_0_12px_rgba(201,165,92,0.8)]"
            initial={{ left: "0%" }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: [0.45, 0, 0.15, 1] }}
            aria-hidden
          />
        )}
      </div>

      <motion.p
        initial={reduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="eyebrow-gold mt-8 text-center"
      >
        Engineered for permanence
      </motion.p>

      {/* Ambient flake motes */}
      {!reduceMotion &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full bg-champagne/40"
            style={{
              width: 2 + (i % 2),
              height: 2 + (i % 2),
              left: `${18 + i * 14}%`,
              top: `${32 + (i % 3) * 18}%`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.6, 0], y: [-4, -20] }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
            aria-hidden
          />
        ))}
    </div>
  );

  if (variant === "inline") {
    return (
      <div className={cn("relative bg-bone", className)}>
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "section-grain relative flex min-h-[100dvh] w-full items-center justify-center bg-obsidian",
        className
      )}
    >
      {content}
    </div>
  );
}
