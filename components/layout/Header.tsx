"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Logo } from "./Logo";
import { TextMeButton } from "./TextMeButton";
import { MainNav } from "./MainNav";
import { cn } from "@/lib/utils";

export function Header({ darkHero = false }: { darkHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(darkHero);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sentinel = document.getElementById("hero-dark-sentinel");
    if (!sentinel) {
      setOverDark(darkHero);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOverDark(entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [darkHero]);

  const logoVariant = overDark ? "knockout" : "primary";
  const navOnDark = overDark;

  return (
    <header className="sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={cn(
          "overflow-hidden bg-obsidian text-bone transition-[max-height,opacity] duration-base ease-luxury",
          scrolled ? "max-h-0 opacity-0 pointer-events-none" : "max-h-8 opacity-100"
        )}
      >
        <div className="mx-auto flex h-8 max-w-content items-center justify-between px-4 text-[10px] uppercase tracking-[0.2em] text-bone/80">
          <a
            href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-champagne"
          >
            <Phone className="h-3 w-3" aria-hidden />
            {BRAND.phone}
          </a>
          <span className="hidden sm:inline">Licensed & insured · Metro Detroit</span>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-base ease-luxury",
          scrolled
            ? overDark
              ? "border-white/10 bg-obsidian/95 py-2 shadow-card backdrop-blur-xl"
              : "border-hairline/60 bg-bone py-2 shadow-card backdrop-blur-xl"
            : overDark
              ? "border-white/10 bg-obsidian/90 py-4 shadow-card backdrop-blur-xl"
              : "border-hairline/40 bg-bone py-4 shadow-card backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4">
          <div
            className={cn(
              "origin-left transition-transform duration-base ease-luxury",
              scrolled ? "scale-[0.94]" : "scale-100"
            )}
          >
            <Logo variant={logoVariant} size="nav" priority />
          </div>
          <MainNav onDark={navOnDark} />
          <div className="flex items-center gap-2 sm:gap-3">
            <TextMeButton
              variant={navOnDark ? "navDark" : "nav"}
              className="hidden md:inline-flex"
            />
            <Link href="/quote" className="btn-primary hidden text-[11px] sm:inline-flex">
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
