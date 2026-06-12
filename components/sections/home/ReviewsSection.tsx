"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { featuredReview, reviews } from "@/data/reviews";
import { useMotionLite } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

function StarRating({ count, animate = false }: { count: number; animate?: boolean }) {
  return (
    <motion.p
      className="text-champagne"
      aria-label={`${count} stars`}
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {"★".repeat(count)}
    </motion.p>
  );
}

export function ReviewsSection() {
  const grid = reviews.filter((r) => !r.featured).slice(0, 6);
  const featuredList = reviews.filter((r) => r.featured);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduced = usePrefersReducedMotion();
  const lite = useMotionLite();
  const noDrag = reduced || lite;
  const displayFeatured = featuredList[featuredIndex] ?? featuredReview;
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || featuredList.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setFeaturedIndex((i) => (i + 1) % featuredList.length);
    }, 8000);
    return () => clearInterval(id);
  }, [reduced, featuredList.length]);

  const goTo = (index: number) => {
    setDirection(index > featuredIndex ? 1 : -1);
    setFeaturedIndex(index);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 50) return;
    if (info.offset.x < 0) {
      setDirection(1);
      setFeaturedIndex((i) => (i + 1) % featuredList.length);
    } else {
      setDirection(-1);
      setFeaturedIndex((i) => (i - 1 + featuredList.length) % featuredList.length);
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  };

  return (
    <RevealSection variant="stagger" className="surface-warm section-pad">
      <div className="mx-auto max-w-content px-6">
        <RevealItem index={0}>
          <SectionHeading
            eyebrow="What clients say"
            title={
              <>
                <CountUp value={4.9} decimals={1} suffix=" stars" /> across{" "}
                <CountUp value={100} suffix="+" /> Metro Detroit installs.
              </>
            }
            size="lg"
          />
        </RevealItem>

        {/* Featured editorial pull-quote carousel */}
        <RevealItem index={1} className="mt-12">
          <div
            ref={dragRef}
            className={cn(
              "relative max-w-3xl",
              !noDrag && "cursor-grab active:cursor-grabbing"
            )}
          >
            <span
              className="absolute -left-2 -top-6 font-display text-7xl text-champagne/30 md:-left-4 md:-top-8 md:text-8xl"
              aria-hidden
            >
              &ldquo;
            </span>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={displayFeatured.id}
                custom={direction}
                variants={reduced ? undefined : slideVariants}
                initial={reduced ? undefined : "enter"}
                animate={reduced ? undefined : "center"}
                exit={reduced ? undefined : "exit"}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag={noDrag ? false : "x"}
                dragConstraints={dragRef}
                dragElastic={0.1}
                onDragEnd={onDragEnd}
                className="relative pl-6 md:pl-8"
              >
                <StarRating count={displayFeatured.rating} animate={!reduced} />
                <p className="mt-4 font-display text-2xl italic leading-relaxed text-obsidian text-balance md:text-3xl">
                  {displayFeatured.text}
                </p>
                <footer className="mt-6 text-sm text-smoke">
                  — {displayFeatured.name}, {displayFeatured.city} ·{" "}
                  {displayFeatured.service} · {displayFeatured.date}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {featuredList.length > 1 && (
              <div className="mt-6 flex gap-2">
                {featuredList.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show review ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-base ease-luxury",
                      i === featuredIndex
                        ? "w-8 bg-champagne"
                        : "w-1.5 bg-hairline hover:bg-champagne/50"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </RevealItem>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {grid.map((r, i) => (
            <RevealItem key={r.id} index={i + 2}>
              <Card variant="elevated" interactive className="h-full">
                <StarRating count={r.rating} />
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite">
                  {r.text}
                </p>
                <p className="mt-4 text-xs text-smoke">
                  {r.name} · {r.city} · {r.service}
                </p>
              </Card>
            </RevealItem>
          ))}
        </div>

        <Link
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-underline mt-10 inline-block"
        >
          Read all reviews on Google →
        </Link>
      </div>
    </RevealSection>
  );
}
