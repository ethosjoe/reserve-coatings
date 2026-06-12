import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { ColorSwatchGrid } from "@/components/sections/shared/ColorSwatchGrid";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { FINISH_TIERS } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Colors & Finishes",
  description: "Twenty-eight flake finishes with on-site sampling. Standard and premium tiers.",
  path: "/colors",
});

const tiers = [
  { key: "standard" as const, pricing: "$5–$7 / sq ft" },
  { key: "premium" as const, pricing: "$7–$9 / sq ft" },
];

export default function ColorsPage() {
  return (
    <>
      <PageHero
        eyebrow="FINISHES"
        title="Colors & finishes"
        subtitle="Twenty-eight flake systems. On-site sampling included with every consultation."
        image={IMAGES.heroColors}
        imageAlt="Epoxy flake finish close-up"
      />
      {tiers.map((tier, i) => (
        <RevealSection
          key={tier.key}
          variant="staggerBlur"
          className={cn(
            "section-pad section-divider",
            i % 2 === 0 ? "surface-warm" : "surface-elevated"
          )}
        >
          <div className="mx-auto max-w-content px-6">
            <RevealItem index={0}>
              <SectionHeading
                title={FINISH_TIERS[tier.key].label}
                subtitle={tier.pricing}
                size="md"
              />
            </RevealItem>
            <RevealItem index={1} className="mt-8">
              <ColorSwatchGrid tier={tier.key} />
            </RevealItem>
          </div>
        </RevealSection>
      ))}
      <CtaBand
        headline="Can't pick from a screen? We bring samples to you."
        buttonLabel="Schedule a sample visit"
        buttonHref="/contact"
      />
    </>
  );
}
