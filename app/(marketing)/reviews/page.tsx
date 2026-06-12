"use client";

import { useState } from "react";
import { PageTitleBar } from "@/components/layout/PageTitleBar";
import { PAGE_INTROS } from "@/lib/copy";
import { reviews } from "@/data/reviews";
import { cn } from "@/lib/utils";

const filters = ["All", "Garage", "Basement", "Outdoor", "Commercial"] as const;

export default function ReviewsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const filtered =
    filter === "All" ? reviews : reviews.filter((r) => r.service === filter);

  return (
    <>
      <PageTitleBar
        eyebrow={PAGE_INTROS.reviews.eyebrow ?? "Reviews"}
        title="Client Reviews"
        subtitle={PAGE_INTROS.reviews.subtitle}
      />
      <section className="bg-bone py-16">
        <div className="mx-auto max-w-content px-6">
          <h2 className="font-display text-4xl font-light text-obsidian">
            4.9 stars across 100+ installs.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-sm px-4 py-2 text-xs uppercase tracking-widest",
                  filter === f ? "bg-obsidian text-bone" : "border border-hairline"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {filtered.map((r) => (
              <article
                key={r.id}
                className="mb-6 break-inside-avoid rounded-sm border border-hairline bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hairline text-sm font-medium text-obsidian">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-obsidian">{r.name}</p>
                    <p className="text-xs text-smoke">{r.city} · {r.service}</p>
                  </div>
                </div>
                <p className="mt-2 text-champagne">{"★".repeat(r.rating)}</p>
                <p className="mt-3 text-sm text-graphite">{r.text}</p>
                <p className="mt-2 text-xs text-smoke">{r.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
