"use client";

import { RevealSection } from "@/components/motion/RevealSection";
import { Card } from "@/components/ui/card";

export function TrustStrip() {
  const items = [
    { label: "4.9", detail: "Google" },
    { label: "BBB", detail: "A+ Rated" },
    { label: "Lifetime", detail: "Warranty" },
    { label: "USA", detail: "Materials" },
  ];

  return (
    <RevealSection as="div" variant="fadeIn">
      <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <Card
              variant="glass"
              size="sm"
              className="min-w-[80px] border-white/10 px-4 py-2.5 shadow-none hover:shadow-glow-accent"
            >
              <span className="block text-[10px] uppercase tracking-[0.2em] text-champagne">
                {item.label}
              </span>
              <span className="text-xs text-bone/80">{item.detail}</span>
            </Card>
          </li>
        ))}
      </ul>
    </RevealSection>
  );
}
