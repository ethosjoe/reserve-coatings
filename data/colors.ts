import type { FinishTier } from "@/lib/pricing";

export type ColorFinish = {
  name: string;
  tier: FinishTier;
  image: string;
  palette: string[];
  recommendedFor: string;
};

export const colors: ColorFinish[] = [
  { name: "Champagne Veil", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Graphite Mist", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Warm Quarry", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Silver Thread", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Pearl Harbor", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Midnight Flake", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Slate River", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Bronze Tide", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Copper Line", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Storm Cloud", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Arctic White", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Charcoal Luxe", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Frosted Ash", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Ember Glow", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Mocha Chip", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Pewter Dust", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Onyx Field", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Vintage Gold", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Almond Silk", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Cinder Block", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Cognac Swirl", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Pale Moss", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Sunlit Dune", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Shadow Line", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Terra Nova", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Cool Granite", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Nordic Grey", tier: "standard", image: "/images/swatches/swatch-standard-02.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Royal Flake", tier: "premium", image: "/images/swatches/swatch-premium-03.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
];
