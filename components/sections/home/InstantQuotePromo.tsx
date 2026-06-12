"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/pricing";
import { IMAGES } from "@/lib/images";
import { HOME_COPY } from "@/lib/copy";
import { useMotionLite } from "@/hooks/useMediaQuery";

export function InstantQuotePromo() {
  const c = HOME_COPY.quotePromo;
  const lite = useMotionLite();

  return (
    <RevealSection variant="stagger" className="surface-elevated section-pad section-divider">
      <div className="mx-auto grid max-w-content items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        <RevealItem index={0}>
          <SectionHeading
            eyebrow={c.eyebrow}
            eyebrowVariant="accent"
            title={c.headline}
            subtitle={c.sub}
            size="lg"
          />
          <Link href="/quote" className="btn-primary mt-10 inline-flex">
            {c.cta}
          </Link>
        </RevealItem>

        <RevealItem index={1}>
          <div className={lite ? "lg:pl-8" : "perspective-[1200px] lg:pl-8"}>
            <motion.div
              className="relative"
              initial={lite ? undefined : { rotateY: -8, rotateX: 4 }}
              whileInView={lite ? undefined : { rotateY: -6, rotateX: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                variant="elevated"
                className="overflow-hidden shadow-glow-accent"
              >
                <div className="border-b border-hairline bg-obsidian px-5 py-3">
                  <p className="text-eyebrow">Instant quote</p>
                </div>
                <div className="p-5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-obsidian/5">
                    <Image
                      src={IMAGES.heroGarage}
                      alt="Garage floor preview"
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-obsidian/80 px-2 py-1 text-[10px] uppercase tracking-widest text-bone backdrop-blur-sm">
                      Photo uploaded
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                    <motion.div
                      className="rounded-lg border border-hairline/60 bg-bone px-3 py-2"
                      animate={lite ? undefined : { y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <p className="text-[10px] uppercase tracking-widest text-smoke">
                        Square footage
                      </p>
                      <p className="mt-1 font-medium text-obsidian">500 sq ft</p>
                    </motion.div>
                    <motion.div
                      className="rounded-lg border border-champagne/30 bg-champagne/5 px-3 py-2 text-right"
                      animate={lite ? undefined : { y: [0, 4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                      <p className="text-[10px] uppercase tracking-widest text-smoke">
                        Estimate range
                      </p>
                      <p className="animate-estimate-pulse mt-1 font-display text-xl tabular-nums text-obsidian">
                        {formatCurrency(2500)}–{formatCurrency(3100)}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
