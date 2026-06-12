"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { QuoteFormCard } from "@/components/layout/QuoteFormCard";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { CTAS } from "@/lib/copy";
import { useMotionLite } from "@/hooks/useMediaQuery";
import type { LeadInput } from "@/lib/validators/lead";

export function ServicePageHero({
  heroImage,
  heroAlt,
  heroEyebrow,
  headline,
  subhead,
  leadService,
}: {
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  headline: string;
  subhead: string;
  leadService: LeadInput["service"];
}) {
  const lite = useMotionLite();

  return (
    <section className="relative min-h-[60vh] overflow-hidden md:min-h-[72vh]">
      <div className="absolute inset-0">
        {lite ? (
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          >
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/50 to-obsidian/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/40 to-transparent" />
      <div id="hero-dark-sentinel" className="pointer-events-none absolute inset-0" aria-hidden />

      <RevealSection
        as="div"
        variant="stagger"
        className="relative mx-auto grid max-w-content gap-12 px-6 pb-16 pt-28 lg:grid-cols-2 lg:items-end"
      >
        <div>
          <RevealItem index={0}>
            <p className="text-eyebrow">{heroEyebrow}</p>
          </RevealItem>
          <RevealItem index={1} asHeading>
            <h1 className="mt-4 font-display text-display-lg text-bone text-balance">
              {headline}
            </h1>
          </RevealItem>
          <RevealItem index={2}>
            <p className="mt-4 max-w-lg text-body-lg text-bone/80">{subhead}</p>
          </RevealItem>
          <RevealItem index={3}>
            <Link href="/quote" className="btn-primary mt-8 inline-flex">
              {CTAS.quotePrimary}
            </Link>
          </RevealItem>
        </div>
        <RevealItem index={4} className="flex flex-col gap-6">
          <HeroLogoMark size="heroCompact" className="self-end" />
          <QuoteFormCard service={leadService} />
        </RevealItem>
      </RevealSection>
    </section>
  );
}
