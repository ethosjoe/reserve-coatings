import { PageHero } from "@/components/layout/PageHero";
import { ServiceFooterCta } from "@/components/layout/ServiceFooterCta";
import { ContactForm } from "@/components/layout/ContactForm";
import { BenefitsList } from "@/components/sections/shared/BenefitsList";
import { ReserveSystemDiagram } from "@/components/sections/shared/ReserveSystemDiagram";
import { ReviewsSection } from "@/components/sections/home/ReviewsSection";
import { ServiceAreaStrip } from "@/components/sections/shared/ServiceAreaStrip";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { CTAS } from "@/lib/copy";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Commercial & Industrial",
  description: "Commercial floor coatings, polishing, line striping, and USDA-approved urethane cement.",
  path: "/commercial",
});

const services = [
  "Concrete polishing system",
  "Polyurea full flake system",
  "Grind & seal",
  "OSHA-compliant line striping",
  "USDA-approved urethane cement",
];

const industries = [
  "Retail & showrooms",
  "Warehouses & logistics",
  "Auto dealerships",
  "Restaurant kitchens",
  "Medical offices",
  "Manufacturing floors",
];

const benefits = [
  "Minimal downtime scheduling for active facilities",
  "OSHA-compliant slip and line striping",
  "USDA-approved urethane cement for food service",
  "Itemized commercial proposals — no surprise change orders",
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Commercial & industrial"
        subtitle="Specified for production floors, scoped for your budget — with minimal downtime."
        image={IMAGES.heroCommercial}
        imageAlt="Commercial showroom floor"
      />
      <RevealSection variant="staggerBlur" className="surface-warm section-pad">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <RevealItem index={0}>
              <p className="max-w-lg text-body leading-relaxed text-graphite">
                From showroom polish to heavy-duty flake systems, Reserve scopes commercial work with the same engineered prep standards as our residential installs — built around your operating hours.
              </p>
            </RevealItem>
            <RevealItem index={1}>
              <BenefitsList items={benefits} />
            </RevealItem>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <RevealItem key={s} index={i + 2}>
                <Card variant="elevated" interactive>
                  <p className="font-display text-lg text-obsidian">{s}</p>
                </Card>
              </RevealItem>
            ))}
          </div>
          <RevealItem index={8} className="mt-16">
            <SectionHeading title="Industries we coat" size="md" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {industries.map((item) => (
                <li key={item} className="flex items-center gap-2 text-graphite">
                  <span className="h-px w-6 bg-champagne" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/quote" className="btn-primary inline-flex">
                {CTAS.quotePrimary}
              </Link>
            </div>
          </RevealItem>
        </div>
      </RevealSection>
      <ReserveSystemDiagram />
      <ReviewsSection />
      <RevealSection variant="blurUp" className="surface-elevated section-pad section-divider">
        <div className="mx-auto max-w-content px-6">
          <SectionHeading
            title="Commercial inquiry"
            subtitle="Square footage, downtime window, and performance requirements — we'll respond within one business day."
            size="md"
          />
          <div className="mt-10 max-w-2xl">
            <Card variant="elevated">
              <ContactForm defaultService="Commercial" formType="commercial" />
            </Card>
          </div>
        </div>
      </RevealSection>
      <ServiceAreaStrip />
      <ServiceFooterCta
        headline="Request a commercial site walk."
        quoteLabel={CTAS.quotePrimary}
      />
    </>
  );
}
