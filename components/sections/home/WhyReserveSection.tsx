import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { IMAGES } from "@/lib/images";
import { HOME_COPY, CTAS } from "@/lib/copy";

const checklist = [
  "In-house installation crews — never subcontracted",
  "Transferable lifetime residential warranty",
  "One-day installation, walk on it the next morning",
  "Free on-site color sampling before you commit",
  "US-made polyaspartic and polyurea materials",
  "Transparent pricing — every quote itemized",
];

const highlights = [
  {
    title: "Seasonal promotion",
    desc: "Spring garage refresh — complimentary crack repair on installs booked before April 30.",
    href: "/promotions",
    image: IMAGES.heroGarage,
  },
  {
    title: "Financing",
    desc: "0% APR for 12 months through Hearth. Most approvals in under 60 seconds.",
    href: "/financing",
    image: IMAGES.heroCommercial,
  },
  {
    title: "The Reserve process",
    desc: "Installation guide, material specs, and what to expect on install day.",
    href: "/process",
    image: IMAGES.heroProcess,
  },
];

export function WhyReserveSection() {
  const c = HOME_COPY.whyReserve;

  return (
    <section className="grid lg:grid-cols-2">
      <RevealSection
        variant="stagger"
        className="section-grain surface-deep px-6 py-20 lg:px-12 lg:py-24"
      >
        <RevealItem index={0}>
          <SectionHeading
            eyebrow={c.eyebrow}
            eyebrowVariant="accent"
            title={c.headline}
            subtitle="No subcontractors. No pressure. No surprise revisions on install day — every job is scoped from your photos and a walk-through, then installed by an in-house Reserve crew."
            dark
            size="lg"
          />
        </RevealItem>
        <ul className="mt-8 space-y-3">
          {checklist.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-bone/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <RevealItem index={7}>
          <Link href="/contact" className="btn-primary mt-10 inline-flex min-h-[48px]">
            {CTAS.bookConsult}
          </Link>
        </RevealItem>
      </RevealSection>

      <div className="relative flex flex-col">
        <div className="relative min-h-[200px] overflow-hidden sm:min-h-[240px] lg:min-h-[280px]">
          <Image
            src={IMAGES.heroProcess}
            alt="Reserve Coatings installer applying epoxy basecoat"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-bone" />
        </div>

        <RevealSection
          variant="stagger"
          className="flex flex-1 flex-col gap-6 surface-warm px-6 py-10 lg:px-10 lg:py-12"
          as="div"
        >
          {highlights.map((card, i) => (
            <RevealItem key={card.title} index={i}>
              <Link href={card.href} className="group block">
                <Card variant="elevated" size="none" interactive className="overflow-hidden">
                  <div className="grid sm:grid-cols-[140px_1fr]">
                    <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[120px]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-slow ease-luxury lg:group-hover:scale-[1.05]"
                        sizes="140px"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl text-obsidian transition-colors duration-base group-hover:text-champagne">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-graphite">{card.desc}</p>
                      <span className="btn-ghost-underline mt-3 inline-block text-xs uppercase tracking-widest text-champagne">
                        Learn more
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
