import { ServiceFooterCta } from "@/components/layout/ServiceFooterCta";
import { ServicePageHero } from "@/components/layout/ServicePageHero";
import { ReserveSystemDiagram } from "@/components/sections/shared/ReserveSystemDiagram";
import { BenefitsList } from "@/components/sections/shared/BenefitsList";
import { ServiceAreaStrip } from "@/components/sections/shared/ServiceAreaStrip";
import { ReviewsSection } from "@/components/sections/home/ReviewsSection";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceJsonLd } from "@/lib/seo";
import type { LeadInput } from "@/lib/validators/lead";

export function ServicePageTemplate({
  title,
  leadService,
  heroImage,
  heroAlt,
  heroEyebrow,
  headline,
  subhead,
  intro,
  benefits,
}: {
  title: string;
  leadService: LeadInput["service"];
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  headline: string;
  subhead: string;
  intro: string;
  benefits: string[];
}) {
  return (
    <>
      <JsonLd data={serviceJsonLd(title, subhead)} />
      <ServicePageHero
        heroImage={heroImage}
        heroAlt={heroAlt}
        heroEyebrow={heroEyebrow}
        headline={headline}
        subhead={subhead}
        leadService={leadService}
      />
      <RevealSection variant="staggerBlur" className="surface-warm section-pad">
        <div className="mx-auto grid max-w-content gap-12 px-6 lg:grid-cols-2">
          <RevealItem index={0}>
            <p className="text-body leading-relaxed text-graphite">{intro}</p>
          </RevealItem>
          <RevealItem index={1}>
            <BenefitsList items={benefits} />
          </RevealItem>
        </div>
      </RevealSection>
      <ReserveSystemDiagram />
      <ReviewsSection />
      <ServiceAreaStrip />
      <ServiceFooterCta
        headline={`Ready to transform your space?`}
        description={`Reserve ${title.toLowerCase()} are engineered for Michigan weather—moisture-tested prep, W-2 crews, and a transferable lifetime warranty. Book a consultation or get your estimate in under a minute.`}
      />
    </>
  );
}
