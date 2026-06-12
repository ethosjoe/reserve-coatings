"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { QUOTE_COPY } from "@/lib/copy";
import { staggerContainer, scaleIn } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { SpaceType } from "./quote-state";

const spaces: { id: SpaceType; label: string; image: string }[] = [
  { id: "garage", label: "Garage", image: IMAGES.garage },
  { id: "basement", label: "Basement", image: IMAGES.basement },
  { id: "outdoor", label: "Outdoor (Patio/Pool Deck)", image: IMAGES.outdoor },
  { id: "commercial", label: "Commercial", image: IMAGES.commercial },
];

export function StepSpaceType({ onSelect }: { onSelect: (s: SpaceType) => void }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-obsidian sm:text-4xl">{QUOTE_COPY.step1Title}</h1>
      <motion.div
        className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2"
        initial={reduced ? false : "hidden"}
        animate="visible"
        variants={reduced ? undefined : staggerContainer}
      >
        {spaces.map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            variants={reduced ? undefined : scaleIn}
            custom={i}
            whileHover={reduced ? undefined : { y: -4 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            className="group overflow-hidden rounded-sm border border-hairline bg-white text-left transition-colors hover:border-champagne/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <div className="relative aspect-video">
              <Image src={s.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="400px" />
            </div>
            <p className="p-4 font-display text-xl text-obsidian">{s.label}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
