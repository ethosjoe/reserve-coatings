import { writeFileSync } from "fs";

const tiers = ["standard", "premium", "metallic"];
const names = [
  "Champagne Veil", "Graphite Mist", "Obsidian Blend", "Warm Quarry", "Silver Thread",
  "Gold Leaf", "Pearl Harbor", "Midnight Flake", "Birch Bark", "Slate River",
  "Bronze Tide", "Ivory Coast", "Copper Line", "Storm Cloud", "Desert Sand",
  "Arctic White", "Charcoal Luxe", "Honeycomb", "Frosted Ash", "Ember Glow",
  "Platinum Wave", "Mocha Chip", "Pewter Dust", "Cream Marble", "Onyx Field",
  "Vintage Gold", "Steel Wool", "Almond Silk", "Cinder Block", "Mist Harbor",
  "Cognac Swirl", "Pale Moss", "River Stone", "Sunlit Dune", "Shadow Line",
  "Blanc Slate", "Terra Nova", "Cool Granite", "Warm Slate", "Nordic Grey",
  "Royal Flake", "Metallic Dawn",
];
const rec = {
  standard: "Garages, utility spaces",
  premium: "Finished basements, show garages",
  metallic: "Entertainment spaces, luxury installs",
};

const lines = names.map((name, i) => {
  const tier = tiers[i % 3];
  const num = String(i + 1).padStart(2, "0");
  return `  { name: "${name}", tier: "${tier}", image: "/images/swatches/${tier}-${num}.jpg", palette: ["#F7F4EE", "#C9A55C", "#2A2A2C"], recommendedFor: "${rec[tier]}" },`;
});

const content = `import type { FinishTier } from "@/lib/pricing";

export type ColorFinish = {
  name: string;
  tier: FinishTier;
  image: string;
  palette: string[];
  recommendedFor: string;
};

export const colors: ColorFinish[] = [
${lines.join("\n")}
];
`;

writeFileSync("data/colors.ts", content);
