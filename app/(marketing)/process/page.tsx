import { PageHero } from "@/components/layout/PageHero";
import { PAGE_INTROS } from "@/lib/copy";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  ProcessOverviewSection,
  ProcessJourneySection,
  ProcessStagesSection,
  ProcessSystemSection,
  ProcessStandardsSection,
  ProcessFaqSection,
} from "@/components/sections/process/ProcessPageContent";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "The Reserve Process",
  description:
    "Detailed six-stage epoxy installation protocol: moisture testing, decontamination, diamond grinding, crack repair, polyurea broadcast, and polyaspartic topcoat. Metro Detroit.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow={PAGE_INTROS.process.eyebrow ?? "Our process"}
        title="The Reserve Process"
        subtitle={PAGE_INTROS.process.subtitle}
        image={IMAGES.heroProcess}
        imageAlt="Reserve Coatings installer profiling a concrete garage floor"
      />
      <ProcessOverviewSection />
      <ProcessJourneySection />
      <ProcessStagesSection />
      <ProcessSystemSection />
      <ProcessStandardsSection />
      <ProcessFaqSection />
      <CtaBand headline="Ready for a floor built to last?" />
    </>
  );
}
