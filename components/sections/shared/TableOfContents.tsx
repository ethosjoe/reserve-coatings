"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: { id: string; title: string }[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const observers = headings.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => e.isIntersecting && setActive(id),
        { rootMargin: "-20% 0px -70% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [headings]);

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="eyebrow-gold mb-4">On this page</p>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block border-l-2 py-1 pl-3 transition-colors",
                active === h.id
                  ? "border-champagne text-obsidian"
                  : "border-transparent text-smoke hover:text-graphite"
              )}
            >
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
