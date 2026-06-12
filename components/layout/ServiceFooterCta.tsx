"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/lib/brand";
import { IMAGES } from "@/lib/images";
import { RevealSection } from "@/components/ui/reveal-wrapper";
import { MagneticButton } from "@/components/ui/button";
import { HOME_COPY, CTAS } from "@/lib/copy";

export function ServiceFooterCta({
  eyebrow = HOME_COPY.footerCta.eyebrow,
  headline = HOME_COPY.footerCta.headline,
  description = HOME_COPY.footerCta.description,
  bookLabel = CTAS.bookConsult,
  bookHref = "/contact",
  quoteLabel = CTAS.quotePrimary,
  quoteHref = "/quote",
}: {
  eyebrow?: string;
  headline?: string;
  description?: string;
  bookLabel?: string;
  bookHref?: string;
  quoteLabel?: string;
  quoteHref?: string;
}) {
  return (
    <section
      className="relative isolate min-h-[420px] overflow-hidden bg-obsidian md:min-h-[480px] lg:min-h-[520px]"
      aria-labelledby="footer-cta-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={IMAGES.footerCta}
          alt="Reserve Coatings professional standing in front of a Metro Detroit home with a finished epoxy garage floor"
          fill
          className="object-cover object-[58%_28%] sm:object-[62%_center] lg:object-[68%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(11,11,12,0.97)_0%,rgba(11,11,12,0.88)_38%,rgba(11,11,12,0.45)_62%,rgba(11,11,12,0.12)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/25 lg:from-obsidian/50"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
          aria-hidden
        />
      </div>

      <RevealSection
        as="div"
        variant="fadeUp"
        className="relative mx-auto flex min-h-[420px] max-w-content flex-col justify-center px-6 py-14 md:min-h-[480px] md:py-16 lg:min-h-[520px] lg:py-20"
      >
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-4 md:mb-10">
            <span className="h-px w-10 bg-champagne" aria-hidden />
            <p className="text-eyebrow">{eyebrow}</p>
          </div>

          <Logo variant="knockout" size="footer" className="mb-8 md:mb-10" />

          <h2
            id="footer-cta-heading"
            className="font-display text-display-lg text-bone text-balance"
          >
            {headline}
          </h2>

          <p className="mt-6 max-w-lg text-body-lg text-bone/80 md:mt-7">
            {description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-12">
            <Link href={bookHref} className="btn-ghost-underline inline-flex min-h-[52px] items-center justify-center px-6 text-bone">
              {bookLabel}
            </Link>
            <Link href={quoteHref} className="inline-block">
              <MagneticButton
                variant="primary"
                size="lg"
                sheen
                className="min-h-[52px] bg-champagne px-10 text-[11px] uppercase tracking-[0.22em] text-obsidian shadow-glow-accent hover:bg-brushed"
              >
                {quoteLabel}
              </MagneticButton>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-bone/10 pt-8 md:mt-12">
            <a
              href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 text-sm text-bone/70 transition-colors hover:text-champagne"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {BRAND.phone}
            </a>
            <span className="hidden h-3 w-px bg-bone/20 sm:block" aria-hidden />
            <p className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
              Licensed & insured · Lifetime warranty
            </p>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
