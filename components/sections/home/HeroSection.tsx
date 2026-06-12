"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";
import { EyebrowLabel } from "@/components/layout/EyebrowLabel";
import { TrustStrip } from "@/components/layout/TrustStrip";
import { MagneticButton } from "@/components/ui/button";
import { HeroBackgroundVideo } from "@/components/sections/home/HeroBackgroundVideo";
import { MIN_PROJECT } from "@/lib/pricing";
import { HOME_COPY } from "@/lib/copy";
import { blurUp, blurUpHeading, staggerBlur } from "@/lib/motion";
import { useMotionLite } from "@/hooks/useMediaQuery";

export function HeroSection() {
  const price = MIN_PROJECT.toLocaleString("en-US");
  const lite = useMotionLite();
  const c = HOME_COPY.hero;
  const headlineWords = c.headline.split(" ");

  return (
    <section className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden lg:min-h-[100svh]">
      {/* Background video — mobile-optimized encode + poster fallback */}
      <div className="absolute inset-0">
        <HeroBackgroundVideo />
      </div>

      {/* Gradient scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/50 to-transparent" />
      <div id="hero-dark-sentinel" className="pointer-events-none absolute inset-0" aria-hidden />

      {/* Content */}
      <div className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-content grid-cols-1 items-end gap-8 px-5 pb-28 pt-28 sm:px-6 sm:pb-32 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[1fr_auto] lg:pb-36">
        <div className="flex min-h-0 flex-col justify-end">
        {lite ? (
          <HeroContent c={c} price={price} headlineWords={headlineWords} />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerBlur}
          >
            <HeroContent c={c} price={price} headlineWords={headlineWords} animated />
          </motion.div>
        )}
        </div>
        <HeroLogoMark className="pb-2" />
      </div>

      {/* Trust badges pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-obsidian/90 pb-[env(safe-area-inset-bottom)] md:bg-obsidian/40 md:backdrop-blur-xl">
        <div className="mx-auto max-w-content px-6 py-4">
          <TrustStrip />
        </div>
      </div>

      {/* Scroll cue */}
      {!lite && (
        <motion.div
          className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-bone/40"
          >
            <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function HeroContent({
  c,
  price,
  headlineWords,
  animated = false,
}: {
  c: (typeof HOME_COPY)["hero"];
  price: string;
  headlineWords: string[];
  animated?: boolean;
}) {
  const Wrap = animated ? motion.div : "div";
  const wrapProps = animated
    ? { variants: blurUp, custom: 0 }
    : {};

  return (
    <>
      <Wrap {...wrapProps}>
        <EyebrowLabel variant="gold">{c.eyebrow}</EyebrowLabel>
      </Wrap>

      <Wrap {...(animated ? { variants: blurUp, custom: 1 } : {})}>
        <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-champagne/50 bg-champagne/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne" />
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne">
            {c.badge} ${price}
          </span>
        </div>
      </Wrap>

      <h1 className="mt-6 max-w-2xl font-display text-display-lg text-bone text-balance">
        {animated
          ? headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={blurUpHeading}
                custom={i}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))
          : c.headline}
      </h1>

      <Wrap {...(animated ? { variants: blurUp, custom: 3 } : {})}>
        <p className="mt-5 max-w-lg text-body-lg text-bone/80">{c.sub}</p>
      </Wrap>

      <Wrap {...(animated ? { variants: blurUp, custom: 4 } : {})}>
        <p className="mt-3 font-display text-2xl font-light tabular-nums text-champagne md:text-3xl">
          From ${price}
        </p>
      </Wrap>

      <Wrap {...(animated ? { variants: blurUp, custom: 5 } : {})}>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href="/quote" className="inline-block">
            <MagneticButton
              variant="primary"
              size="lg"
              sheen
              className="min-h-[56px] bg-champagne px-10 text-[12px] font-semibold uppercase tracking-[0.2em] text-obsidian shadow-glow-accent hover:bg-brushed"
            >
              {c.ctaPrimary}
            </MagneticButton>
          </Link>
          <Link
            href="/contact"
            className="btn-ghost-underline inline-flex min-h-[56px] items-center justify-center px-4 text-bone"
          >
            {c.ctaSecondary}
          </Link>
        </div>
      </Wrap>

      <Wrap {...(animated ? { variants: blurUp, custom: 6 } : {})}>
        <p className="mt-4 text-xs text-bone/50">
          Instant range in 60 seconds · No obligation · Most garages qualify
        </p>
      </Wrap>
    </>
  );
}
