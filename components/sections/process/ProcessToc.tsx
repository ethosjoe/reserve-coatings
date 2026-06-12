"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { processTocGroups } from "@/data/process";

const allIds = processTocGroups.flatMap((g) => g.items.map((i) => i.id));

export function ProcessToc({ className }: { className?: string }) {
  const [active, setActive] = useState(allIds[0]);

  useEffect(() => {
    const observers = allIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav
      aria-label="Process page sections"
      className={cn(
        "rounded-sm border border-hairline bg-white p-5 shadow-[0_8px_32px_-12px_rgba(11,11,12,0.06)]",
        className
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne">
        On this page
      </p>
      <div className="mt-5 space-y-6">
        {processTocGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-smoke">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block rounded-sm py-1.5 pl-3 text-[13px] leading-snug transition-colors",
                      active === item.id
                        ? "border-l-2 border-champagne bg-champagne/5 font-medium text-obsidian"
                        : "border-l-2 border-transparent text-graphite hover:border-champagne/40 hover:bg-bone/80 hover:text-obsidian"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

/** Mobile jump links — horizontal scroll */
export function ProcessTocMobile() {
  const stageItems = processTocGroups.find((g) => g.label === "Install stages")?.items ?? [];

  return (
    <nav
      aria-label="Jump to install stage"
      className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:hidden"
    >
      {stageItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="shrink-0 rounded-full border border-hairline bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-graphite transition-colors hover:border-champagne/50 hover:text-obsidian"
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
