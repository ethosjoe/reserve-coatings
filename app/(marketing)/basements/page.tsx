import { ServicePageTemplate } from "@/components/sections/shared/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Basement Floor Coatings",
  description:
    "Moisture-tolerant basement epoxy and flake floors for Metro Detroit. BBB A+, 4.9 Google, lifetime warranty.",
  path: "/basements",
});

const benefits = [
  "Moisture-tolerant polyurea system",
  "No peel or lift like painted floors",
  "Antimicrobial topcoat",
  "Designer standard and premium flake options",
  "One-day installation",
  "Transferable lifetime warranty",
];

export default function BasementsPage() {
  return (
    <ServicePageTemplate
      title="Basement Floor Coatings"
      leadService="Basement"
      heroImage={IMAGES.heroBasement}
      heroAlt="Finished basement with warm lighting and coated floor"
      heroEyebrow="RESIDENTIAL · METRO DETROIT"
      headline="Basement floors that finally feel like the rest of the house."
      subhead="Moisture-tested, designer finishes, and a crew that doesn't subcontract."
      intro="Painted basement floors peel. Carpet traps moisture. Reserve's polyurea system is engineered for below-grade humidity — moisture tested before install, diamond ground, and sealed with a UV-stable polyaspartic topcoat. BBB A+ rated. 4.9 stars on Google."
      benefits={benefits}
    />
  );
}
