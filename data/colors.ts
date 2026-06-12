import type { FinishTier } from "@/lib/pricing";

export type ColorFinish = {
  name: string;
  tier: FinishTier;
  image: string;
  palette: string[];
  recommendedFor: string;
};

export const colors: ColorFinish[] = [
  { name: "Cabin Fever", tier: "standard", image: "/images/swatches/cabin-fever.png", palette: ["#F5F3EE", "#B8B0A4", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Cabin Fever", tier: "premium", image: "/images/swatches/cabin-fever-blend.png", palette: ["#F5F3EE", "#B8B0A4", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Stonewash", tier: "standard", image: "/images/swatches/stonewash.png", palette: ["#E8ECF0", "#6B8CAE", "#2C3E50"], recommendedFor: "Garages, utility spaces" },
  { name: "Stonewash", tier: "premium", image: "/images/swatches/stonewash-premium.png", palette: ["#E8ECF0", "#6B8CAE", "#2C3E50"], recommendedFor: "Finished basements, show garages" },
  { name: "Feather Gray", tier: "standard", image: "/images/swatches/feather-gray.png", palette: ["#F0F0F0", "#A8A8A8", "#1A1A1A"], recommendedFor: "Garages, utility spaces" },
  { name: "Feather Gray", tier: "premium", image: "/images/swatches/feather-gray-blend.png", palette: ["#F0F0F0", "#A8A8A8", "#1A1A1A"], recommendedFor: "Finished basements, show garages" },
  { name: "Domino", tier: "standard", image: "/images/swatches/domino-blend.png", palette: ["#FFFFFF", "#8C8C8C", "#1A1A1A"], recommendedFor: "Garages, utility spaces" },
  { name: "Domino", tier: "premium", image: "/images/swatches/domino-premium.png", palette: ["#FFFFFF", "#8C8C8C", "#1A1A1A"], recommendedFor: "Finished basements, show garages" },
  { name: "Nightfall", tier: "standard", image: "/images/swatches/nightfall.png", palette: ["#E0E0E0", "#6B6B6B", "#2A2A2C"], recommendedFor: "Garages, utility spaces" },
  { name: "Nightfall", tier: "premium", image: "/images/swatches/nightfall-premium.png", palette: ["#E0E0E0", "#6B6B6B", "#2A2A2C"], recommendedFor: "Finished basements, show garages" },
  { name: "Gravel", tier: "standard", image: "/images/swatches/gravel-blend.png", palette: ["#D4D4D4", "#7A7A7A", "#3D3D3D"], recommendedFor: "Garages, utility spaces" },
  { name: "Gravel", tier: "premium", image: "/images/swatches/gravel-premium.png", palette: ["#D4D4D4", "#7A7A7A", "#3D3D3D"], recommendedFor: "Finished basements, show garages" },
  { name: "Stargazer", tier: "standard", image: "/images/swatches/stargazer-blend.png", palette: ["#F5F5F5", "#9E9E9E", "#4A4A4A"], recommendedFor: "Garages, utility spaces" },
  { name: "Stargazer", tier: "premium", image: "/images/swatches/stargazer-premium.png", palette: ["#F5F5F5", "#9E9E9E", "#4A4A4A"], recommendedFor: "Finished basements, show garages" },
  { name: "Autumn Brown", tier: "standard", image: "/images/swatches/autumn-brown-blend.png", palette: ["#F0E6D8", "#A67B5B", "#3D2314"], recommendedFor: "Garages, utility spaces" },
  { name: "Autumn Brown", tier: "premium", image: "/images/swatches/autumn-brown-premium.png", palette: ["#F0E6D8", "#A67B5B", "#3D2314"], recommendedFor: "Finished basements, show garages" },
  { name: "Outback", tier: "standard", image: "/images/swatches/outback-blend.png", palette: ["#F5EDE0", "#C4A882", "#8B5E3C"], recommendedFor: "Garages, utility spaces" },
  { name: "Outback", tier: "premium", image: "/images/swatches/outback-premium.png", palette: ["#F5EDE0", "#C4A882", "#8B5E3C"], recommendedFor: "Finished basements, show garages" },
  { name: "Coyote", tier: "standard", image: "/images/swatches/coyote-blend.png", palette: ["#F0EBE3", "#B8956A", "#8B4513"], recommendedFor: "Garages, utility spaces" },
  { name: "Coyote", tier: "premium", image: "/images/swatches/coyote-premium.png", palette: ["#F0EBE3", "#B8956A", "#8B4513"], recommendedFor: "Finished basements, show garages" },
  { name: "Creekbed", tier: "standard", image: "/images/swatches/creekbed-blend.png", palette: ["#F5F0E8", "#C9A87C", "#6B4423"], recommendedFor: "Garages, utility spaces" },
  { name: "Creekbed", tier: "premium", image: "/images/swatches/creekbed-premium.png", palette: ["#F5F0E8", "#C9A87C", "#6B4423"], recommendedFor: "Finished basements, show garages" },
  { name: "Shoreline", tier: "standard", image: "/images/swatches/shoreline-blend.png", palette: ["#F5F2EB", "#D4C4A8", "#1A1A1A"], recommendedFor: "Garages, utility spaces" },
  { name: "Shoreline", tier: "premium", image: "/images/swatches/shoreline-premium.png", palette: ["#F5F2EB", "#D4C4A8", "#1A1A1A"], recommendedFor: "Finished basements, show garages" },
  { name: "Safari", tier: "standard", image: "/images/swatches/safari-blend.png", palette: ["#F0E8D8", "#C4A882", "#6B5344"], recommendedFor: "Garages, utility spaces" },
  { name: "Safari", tier: "premium", image: "/images/swatches/safari-premium.png", palette: ["#F0E8D8", "#C4A882", "#6B5344"], recommendedFor: "Finished basements, show garages" },
  { name: "Orbit", tier: "standard", image: "/images/swatches/orbit-blend.png", palette: ["#FFFFFF", "#4A90D9", "#1A1A1A"], recommendedFor: "Garages, utility spaces" },
  { name: "Orbit", tier: "premium", image: "/images/swatches/orbit-premium.png", palette: ["#FFFFFF", "#4A90D9", "#1A1A1A"], recommendedFor: "Finished basements, show garages" },
];
