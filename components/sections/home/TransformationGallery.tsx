"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { CompareSlider } from "@/components/ui/compare-slider";
import { projects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CTAS } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function TransformationGallery() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const reduced = usePrefersReducedMotion();

  return (
    <RevealSection variant="staggerBlur" className="surface-elevated section-pad section-divider">
      <div className="mx-auto max-w-content px-6">
        <RevealItem index={0}>
          <SectionHeading
            eyebrow="Recent work"
            title="Before. After. Every time."
            size="lg"
          />
        </RevealItem>

        <RevealItem index={1} className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <CompareSlider
                before={project.before}
                after={project.after}
                alt={project.title}
              />
            </motion.div>
          </AnimatePresence>
        </RevealItem>

        <div className="mt-8 flex flex-wrap gap-2">
          {projects.slice(0, 6).map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-all duration-base ease-luxury",
                i === active
                  ? "bg-obsidian text-bone shadow-card"
                  : "border border-hairline text-graphite hover:border-champagne/50 hover:text-champagne"
              )}
            >
              {p.city}
            </button>
          ))}
        </div>

        <Link href="/gallery" className="btn-ghost-underline mt-8 inline-block">
          {CTAS.viewGallery} →
        </Link>
      </div>
    </RevealSection>
  );
}
