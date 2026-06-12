"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Marquee } from "@/components/ui/marquee";
import { colors } from "@/data/colors";
import { finishTierCards } from "@/data/finishTiers";
import { FINISH_TIERS } from "@/lib/pricing";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

export function ColorPreviewSection() {
  const preview = colors.slice(0, 12);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <RevealSection variant="staggerBlur" className="surface-warm section-pad">
      <div className="mx-auto max-w-content px-6">
        <RevealItem index={0}>
          <SectionHeading
            eyebrow="Finishes"
            title={`${colors.length} finishes. One designed for your space.`}
            subtitle="Standard flake and premium designer blends — on-site sampling with every consultation."
            size="lg"
          />
          <p className="mt-4 font-display text-display-sm text-champagne">
            <CountUp value={colors.length} /> finishes
          </p>
        </RevealItem>

        {/* Swatch grid */}
        <div className="mt-10 hidden flex-wrap justify-center gap-4 sm:flex">
          {preview.map((color, i) => (
            <div
              key={color.name}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "relative h-[140px] w-[140px] overflow-hidden rounded-full border border-hairline/60 transition-all duration-base ease-luxury card-sheen",
                  hoveredIndex === i && "-translate-y-2 shadow-glow-accent"
                )}
              >
                <Image
                  src={color.image}
                  alt={color.name}
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              </div>
              <div
                className={cn(
                  "pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center opacity-0 transition-opacity duration-base",
                  hoveredIndex === i && "opacity-100"
                )}
              >
                <p className="text-xs text-graphite">{color.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-champagne">
                  {FINISH_TIERS[color.tier].label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile marquee band */}
        <div className="mt-10 sm:hidden">
          <Marquee speed={30}>
            {preview.map((color) => (
              <div
                key={color.name}
                className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full border border-white/10"
              >
                <Image
                  src={color.image}
                  alt={color.name}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
            ))}
          </Marquee>
        </div>

        <RevealItem index={2} className="mt-16 border-t border-hairline pt-8">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex flex-wrap gap-8 md:gap-12">
              {finishTierCards.map((tier) => (
                <div key={tier.id} className="group">
                  <p className="font-display text-lg text-obsidian transition-colors group-hover:text-champagne">
                    {tier.title}
                  </p>
                  <p className="tabular-nums text-sm text-smoke">{tier.priceRange}</p>
                </div>
              ))}
            </div>
            <Link href="/colors" className="btn-ghost-underline text-champagne">
              View the full catalog →
            </Link>
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
