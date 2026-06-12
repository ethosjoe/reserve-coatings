"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    label: "BASECOAT",
    description:
      "Polyurea primer penetrates and bonds — 4x the tensile strength of standard epoxy.",
    color: "from-champagne/20 to-transparent",
  },
  {
    num: "02",
    label: "BROADCAST",
    description:
      "Hand-broadcast vinyl flake — your palette, applied wet into the base.",
    color: "from-champagne/30 to-champagne/5",
  },
  {
    num: "03",
    label: "TOPCOAT",
    description:
      "Polyaspartic clear topcoat — UV-stable, antimicrobial, 100% chemical resistant.",
    color: "from-champagne/40 to-champagne/10",
  },
];

export function ReserveSystemDiagram({
  dark = true,
  showProcessLink = true,
}: {
  dark?: boolean;
  showProcessLink?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const layer1Y = useTransform(scrollYProgress, [0.1, 0.35], [80, 0]);
  const layer2Y = useTransform(scrollYProgress, [0.25, 0.5], [80, 0]);
  const layer3Y = useTransform(scrollYProgress, [0.4, 0.65], [80, 0]);
  const layerOpacities = [
    useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
    useTransform(scrollYProgress, [0.25, 0.45], [0, 1]),
    useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
  ];

  return (
    <RevealSection
      variant="staggerBlur"
      className={cn(
        "section-grain section-pad",
        dark ? "surface-deep" : "surface-warm"
      )}
    >
      <div ref={containerRef} className="mx-auto max-w-content px-6">
        <RevealItem index={0}>
          <SectionHeading
            eyebrow="The Reserve system"
            eyebrowVariant="accent"
            title="Three engineered layers. One disciplined install day."
            dark={dark}
            size="lg"
          />
        </RevealItem>

        {/* Desktop scrollytelling */}
        <div className="relative mt-16 hidden lg:block">
          <div className="grid grid-cols-2 gap-16">
            <div className="sticky top-32 self-start">
              <div className="relative aspect-square max-w-md">
                {steps.map((step, i) => {
                  const y = [layer1Y, layer2Y, layer3Y][i];
                  const opacity = layerOpacities[i];
                  return (
                    <motion.div
                      key={step.num}
                      className={cn(
                        "absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br shadow-card",
                        step.color,
                        dark ? "bg-obsidian" : "bg-white"
                      )}
                      style={
                        reduced
                          ? { zIndex: i + 1, opacity: 1, y: i * 12 }
                          : { zIndex: i + 1, y, opacity }
                      }
                    >
                      <div className="flex h-full flex-col justify-end p-8">
                        <span className="font-display text-5xl text-champagne/30">
                          {step.num}
                        </span>
                        <p className="mt-2 text-eyebrow">{step.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-[60vh] pb-[40vh]">
              {steps.map((step) => (
                <div key={step.num} className="min-h-[40vh] flex flex-col justify-center">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-full border font-display text-lg",
                      dark
                        ? "border-champagne/40 bg-champagne/10 text-champagne"
                        : "border-champagne/60 bg-white text-champagne"
                    )}
                  >
                    {step.num}
                  </span>
                  <p className="mt-6 text-eyebrow">{step.label}</p>
                  <p
                    className={cn(
                      "mt-3 max-w-md text-body leading-relaxed",
                      dark ? "text-bone/80" : "text-graphite"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="mt-12 space-y-6 lg:hidden">
          {steps.map((step, i) => (
            <RevealItem key={step.num} index={i + 1}>
              <Card variant={dark ? "dark" : "default"} className="relative">
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl bg-gradient-to-br opacity-50",
                    step.color
                  )}
                  aria-hidden
                />
                <div className="relative">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-full border font-display text-lg",
                      dark
                        ? "border-champagne/40 bg-champagne/10 text-champagne"
                        : "border-champagne/60 bg-white text-champagne"
                    )}
                  >
                    {step.num}
                  </span>
                  <p className="mt-4 text-eyebrow">{step.label}</p>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      dark ? "text-bone/80" : "text-graphite"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </Card>
            </RevealItem>
          ))}
        </div>

        {showProcessLink && (
          <div className="mt-12 text-center">
            <Link href="/process" className="btn-ghost-underline text-champagne">
              See the full process →
            </Link>
          </div>
        )}
      </div>
    </RevealSection>
  );
}
