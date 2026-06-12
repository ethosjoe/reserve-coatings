"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { BeforeAfterSlider } from "@/components/sections/shared/BeforeAfterSlider";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { projects } from "@/data/projects";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const filters = ["All", "garages", "basements", "outdoor", "commercial", "metallic"] as const;

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const filtered =
    filter === "All"
      ? projects
      : filter === "metallic"
        ? projects.filter((p) => p.tier === "metallic")
        : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="RECENT WORK"
        title="Gallery"
        subtitle="Real Metro Detroit installs — garages, basements, outdoor, and commercial."
        image={IMAGES.gallery.garage.after}
        imageAlt="Finished garage epoxy floor"
      />
      <RevealSection variant="staggerBlur" className="surface-warm section-pad">
        <div className="mx-auto max-w-content px-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-all duration-base ease-luxury",
                  filter === f
                    ? "bg-obsidian text-bone shadow-card"
                    : "border border-hairline text-graphite hover:border-champagne/50 hover:text-champagne"
                )}
              >
                {f === "metallic" ? "Metallic" : f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <RevealItem key={p.slug} index={i}>
                <Link href={`/gallery/${p.slug}`} className="group block">
                  <BeforeAfterSlider before={p.before} after={p.after} alt={p.title} />
                  <h3 className="mt-4 font-display text-xl text-obsidian transition-colors duration-base ease-luxury group-hover:text-champagne">
                    {p.title}
                  </h3>
                  <p className="text-sm text-smoke">
                    {p.city} · {p.sqft} sq ft
                  </p>
                </Link>
              </RevealItem>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  );
}
