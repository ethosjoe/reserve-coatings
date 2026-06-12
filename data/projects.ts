import { IMAGES } from "@/lib/images";

export type Project = {
  slug: string;
  title: string;
  city: string;
  sqft: number;
  tier: "standard" | "premium" | "metallic";
  category: "garages" | "basements" | "outdoor" | "commercial";
  date: string;
  finish: string;
  before: string;
  after: string;
  images: string[];
  testimonial?: string;
  approach?: string;
  space?: string;
  result?: string;
};

const g = IMAGES.gallery;

export const projects: Project[] = [
  {
    slug: "bloomfield-hills-garage",
    title: "Bloomfield Hills Garage",
    city: "Bloomfield Hills",
    sqft: 1200,
    tier: "metallic",
    category: "garages",
    date: "March 2026",
    finish: "Luxury Metallic — Champagne Veil",
    before: g.garage.before,
    after: g.garage.after,
    images: [g.garage.before, g.garage.after],
    space: "Three-car garage with existing epoxy failure and oil staining near the bay doors.",
    approach: "Moisture test, oil contamination treatment, diamond grind, crack repair, polyurea broadcast, polyaspartic topcoat.",
    result: "One-day install. Client walked on the floor the next morning.",
    testimonial: "Exactly the Restoration Hardware basement energy — for the garage.",
  },
  {
    slug: "northville-basement",
    title: "Northville Basement",
    city: "Northville",
    sqft: 800,
    tier: "premium",
    category: "basements",
    date: "February 2026",
    finish: "Premium Designer — Graphite Mist",
    before: g.basement.before,
    after: g.basement.after,
    images: [g.basement.before, g.basement.after],
  },
  {
    slug: "birmingham-garage",
    title: "Birmingham Show Garage",
    city: "Birmingham",
    sqft: 600,
    tier: "metallic",
    category: "garages",
    date: "January 2026",
    finish: "Luxury Metallic — Gold Leaf",
    before: g.garage.before,
    after: g.garage.after,
    images: [g.garage.before, g.garage.after],
  },
  {
    slug: "rochester-pool-deck",
    title: "Rochester Hills Pool Deck",
    city: "Rochester Hills",
    sqft: 450,
    tier: "premium",
    category: "outdoor",
    date: "December 2025",
    finish: "Premium Designer — Cool Granite",
    before: g.outdoor.before,
    after: g.outdoor.after,
    images: [g.outdoor.before, g.outdoor.after],
  },
  {
    slug: "troy-commercial",
    title: "Troy Auto Showroom",
    city: "Troy",
    sqft: 3200,
    tier: "standard",
    category: "commercial",
    date: "November 2025",
    finish: "Polyurea Full Flake System",
    before: g.commercial.before,
    after: g.commercial.after,
    images: [g.commercial.before, g.commercial.after],
  },
  {
    slug: "novi-basement",
    title: "Novi Entertainment Basement",
    city: "Novi",
    sqft: 1100,
    tier: "metallic",
    category: "basements",
    date: "October 2025",
    finish: "Luxury Metallic — Metallic Dawn",
    before: g.basement.before,
    after: g.basement.after,
    images: [g.basement.before, g.basement.after],
  },
  {
    slug: "brighton-garage",
    title: "Brighton Two-Car Garage",
    city: "Brighton",
    sqft: 480,
    tier: "standard",
    category: "garages",
    date: "September 2025",
    finish: "Standard Flake — Pearl Harbor",
    before: g.garage.before,
    after: g.garage.after,
    images: [g.garage.before, g.garage.after],
  },
  {
    slug: "milford-patio",
    title: "Milford Patio & Entry",
    city: "Milford",
    sqft: 320,
    tier: "premium",
    category: "outdoor",
    date: "August 2025",
    finish: "Premium Designer — River Stone",
    before: g.outdoor.before,
    after: g.outdoor.after,
    images: [g.outdoor.before, g.outdoor.after],
  },
];
