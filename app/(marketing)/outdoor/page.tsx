import { PageHero } from "@/components/layout/PageHero";
import { ServiceFooterCta } from "@/components/layout/ServiceFooterCta";
import { BenefitsList } from "@/components/sections/shared/BenefitsList";
import { ReserveSystemDiagram } from "@/components/sections/shared/ReserveSystemDiagram";
import { ReviewsSection } from "@/components/sections/home/ReviewsSection";
import { ServiceAreaStrip } from "@/components/sections/shared/ServiceAreaStrip";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { CTAS } from "@/lib/copy";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Outdoor Coatings",
  description: "Pool deck, patio, and walkway coatings built for Michigan summers and winters.",
  path: "/outdoor",
});

const applications = [
  { title: "Pool decks", desc: "UV-stable, slip-resistant, pool-chemical resistant." },
  { title: "Patios", desc: "Entertaining-ready finishes with freeze-thaw durability." },
  { title: "Walkways", desc: "Salt and ice melt resistant with antimicrobial topcoat." },
  { title: "Porches & steps", desc: "Seamless transitions with custom slip profiles." },
];

const benefits = [
  "UV-stable polyaspartic topcoats for Michigan sun exposure",
  "Custom slip profiles for wet and icy conditions",
  "Freeze-thaw tested prep and crack isolation",
  "Chemical resistance for pool and de-icing salts",
];

export default function OutdoorPage() {
  return (
    <>
      <PageHero
        eyebrow="Exterior"
        title="Outdoor coatings"
        subtitle="UV stability, freeze-thaw resistance, and slip profiles engineered for Michigan."
        image={IMAGES.heroOutdoor}
        imageAlt="Pool deck at golden hour"
      />
      <RevealSection variant="staggerBlur" className="surface-warm section-pad">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <RevealItem index={0}>
              <p className="max-w-lg text-body leading-relaxed text-graphite">
                Reserve outdoor systems use the same polyurea base and polyaspartic topcoat as our garage work — specified for patios, pool decks, and walkways that see sun, salt, and standing water.
              </p>
            </RevealItem>
            <RevealItem index={1}>
              <BenefitsList items={benefits} />
            </RevealItem>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {applications.map((app, i) => (
              <RevealItem key={app.title} index={i + 2}>
                <Card variant="elevated" interactive className="h-full">
                  <h3 className="font-display text-display-sm text-obsidian">{app.title}</h3>
                  <p className="mt-3 leading-relaxed text-graphite">{app.desc}</p>
                </Card>
              </RevealItem>
            ))}
          </div>
          <RevealItem index={6} className="mt-12 text-center">
            <Link href="/quote" className="btn-primary inline-flex">
              {CTAS.quotePrimary}
            </Link>
          </RevealItem>
        </div>
      </RevealSection>
      <ReserveSystemDiagram dark={false} />
      <ReviewsSection />
      <ServiceAreaStrip />
      <ServiceFooterCta headline="Ready to coat your outdoor space?" />
    </>
  );
}
