import { ServicePageTemplate } from "@/components/sections/shared/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Garage Floor Coatings",
  description:
    "Premium epoxy and flake garage floor coatings in Bloomfield Hills, Birmingham, Rochester Hills and Metro Detroit. Lifetime warranty, one-day install.",
  path: "/garages",
});

const benefits = [
  "4x Stronger than Epoxy",
  "Lifetime Warranty",
  "Hot-Tire-Pickup Resistant",
  "UV-Stable for South-Facing Garages",
  "One-Day Install",
  "Slip-Resistant",
  "Antimicrobial",
];

export default function GaragesPage() {
  return (
    <ServicePageTemplate
      title="Garage Floor Coatings"
      leadService="Garage"
      heroImage={IMAGES.heroGarage}
      heroAlt="Finished garage floor with sports car"
      heroEyebrow="RESIDENTIAL · METRO DETROIT"
      headline="A garage floor that's actually worth showing off."
      subhead="Polyurea and polyaspartic systems built for Michigan salt, freeze-thaw, and hot-tire pickup."
      intro="Michigan garages take punishment — freeze-thaw cycles, road salt, oil drips, and hot tires on summer afternoons. Reserve specs a moisture-tested, oil-assessed, diamond-ground substrate before a single coat goes down. The result is a floor that looks like it belongs in a Birmingham showroom, not a contractor portfolio."
      benefits={benefits}
    />
  );
}
