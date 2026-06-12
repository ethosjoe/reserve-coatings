"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, ChevronLeft } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Logo } from "./Logo";
import { TextMeButton } from "./TextMeButton";
import { MobileNavLinks } from "./MainNav";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PHONE_DIGITS = BRAND.phone.replace(/\D/g, "");

/**
 * Mobile-only navigation system (hidden at lg and up):
 * - Bottom dock fixed to the bottom of the screen: Call + Pricing Quote
 * - "Menu" tab fixed at 50% viewport height on the right edge,
 *   opening a slide-in drawer with the main navigation
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Right-edge Menu tab at 50% viewport height */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-1 rounded-l-md border border-r-0 border-champagne/40 bg-obsidian/90 py-4 pl-1.5 pr-1 text-bone shadow-card backdrop-blur-md transition-colors active:bg-obsidian lg:hidden"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-champagne" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] [writing-mode:vertical-rl]">
              Menu
            </span>
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 border-l border-champagne/20 bg-obsidian p-0 text-bone sm:max-w-md"
        >
          <SheetTitle className="sr-only">Main menu</SheetTitle>
          <div className="border-b border-champagne/20 px-8 py-6">
            <Logo variant="knockout" size="heroCompact" />
          </div>
          <nav
            className="flex flex-1 flex-col overflow-y-auto bg-obsidian px-8 pt-8"
            aria-label="Mobile"
          >
            <MobileNavLinks onNavigate={() => setOpen(false)} />
          </nav>
          <div className="space-y-3 border-t border-champagne/20 p-8 pb-[calc(2rem+env(safe-area-inset-bottom))]">
            <TextMeButton variant="footer" className="w-full justify-center" />
            <Link
              href="/quote"
              className="btn-primary w-full justify-center border border-champagne/40"
              onClick={() => setOpen(false)}
            >
              Get Instant Quote
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom dock: Call + Pricing Quote */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-champagne/25 bg-obsidian/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(11,11,12,0.35)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-champagne/40 bg-transparent px-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-bone transition-colors active:bg-champagne/10"
          >
            <Phone className="h-4 w-4 text-champagne" aria-hidden />
            Call
          </a>
          <Link
            href="/quote"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-champagne px-4 text-center text-[12px] font-semibold uppercase tracking-[0.15em] text-obsidian transition-colors active:bg-brushed"
          >
            Pricing Quote
          </Link>
        </div>
      </div>
    </>
  );
}
