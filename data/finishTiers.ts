import type { FinishTier } from "@/lib/pricing";

export const finishTierCards: {
  id: FinishTier;
  title: string;
  priceRange: string;
  description: string;
  bestFor: string;
  image: string;
}[] = [
  {
    id: "standard",
    title: "Standard Flake",
    priceRange: "$5–$7 / sq ft",
    description:
      "Classic vinyl flake broadcast in a durable polyaspartic system. Clean, timeless, and built for daily garage use.",
    bestFor: "Garages, utility basements",
    image: "/images/swatches/swatch-standard-01.jpg",
  },
  {
    id: "premium",
    title: "Premium Designer",
    priceRange: "$7–$9 / sq ft",
    description:
      "Curated designer blends with richer depth and contrast. The most popular choice for finished basements and show garages.",
    bestFor: "Basements, primary garages",
    image: "/images/swatches/swatch-premium-01.jpg",
  },
];
