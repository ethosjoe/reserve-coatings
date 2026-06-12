"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EyebrowLabel } from "./EyebrowLabel";
import { HeroLogoMark } from "./HeroLogoMark";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { useMotionLite } from "@/hooks/useMediaQuery";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}) {
  const lite = useMotionLite();

  return (
    <section className="relative min-h-[42vh] overflow-hidden md:min-h-[48vh]">
      <div className="absolute inset-0">
        {lite ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.04 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-obsidian/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/30 to-transparent" />
      <div id="hero-dark-sentinel" className="pointer-events-none absolute inset-0" aria-hidden />
      <RevealSection
        as="div"
        variant="stagger"
        className="relative mx-auto grid min-h-[42vh] max-w-content grid-cols-1 items-end gap-8 px-6 pb-14 pt-28 md:min-h-[48vh] md:pb-16 lg:grid-cols-[1fr_auto]"
      >
        <div>
        <RevealItem index={0}>
          <EyebrowLabel variant="gold">{eyebrow}</EyebrowLabel>
        </RevealItem>
        <RevealItem index={1} asHeading>
          <h1 className="mt-4 max-w-3xl font-display text-display-lg text-bone text-balance">
            {title}
          </h1>
        </RevealItem>
        {subtitle && (
          <RevealItem index={2}>
            <p className="mt-4 max-w-xl text-body-lg text-bone/80">{subtitle}</p>
          </RevealItem>
        )}
        </div>
        <HeroLogoMark size="heroCompact" className="pb-2" />
      </RevealSection>
    </section>
  );
}
