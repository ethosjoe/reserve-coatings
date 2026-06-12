export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  service: "Garage" | "Basement" | "Outdoor" | "Commercial";
  featured?: boolean;
};

export const reviews: Review[] = [
  {
    id: "1",
    name: "Michael L.",
    city: "Birmingham",
    rating: 5,
    text: "Reserve transformed our garage in a single day. The metallic finish catches the light exactly the way we hoped — quiet luxury, not flashy contractor energy.",
    date: "March 2026",
    service: "Garage",
    featured: true,
  },
  {
    id: "2",
    name: "Sarah K.",
    city: "Bloomfield Hills",
    rating: 5,
    text: "Transparent pricing from the instant quote through install. Crew was professional, on time, and the floor has held up perfectly through winter.",
    date: "February 2026",
    service: "Garage",
  },
  {
    id: "3",
    name: "David R.",
    city: "Northville",
    rating: 5,
    text: "Our basement finally feels finished. The moisture testing and prep gave us confidence — no shortcuts.",
    date: "January 2026",
    service: "Basement",
  },
  {
    id: "4",
    name: "Jennifer M.",
    city: "Rochester Hills",
    rating: 5,
    text: "Pool deck coating survived last summer and this winter without fading. Slip resistance is excellent when wet.",
    date: "December 2025",
    service: "Outdoor",
  },
  {
    id: "5",
    name: "Robert T.",
    city: "Troy",
    rating: 5,
    text: "Commercial showroom floor looks showroom-ready every morning. Line striping was crisp and OSHA-compliant.",
    date: "November 2025",
    service: "Commercial",
  },
  {
    id: "6",
    name: "Amanda P.",
    city: "Novi",
    rating: 5,
    text: "Loved the on-site color sampling — picked a designer flake we never would have chosen from photos alone.",
    date: "October 2025",
    service: "Basement",
  },
  {
    id: "7",
    name: "Chris W.",
    city: "Brighton",
    rating: 5,
    text: "One-day install as promised. Walked on it the next morning. Warranty documentation was clear and transferable.",
    date: "September 2025",
    service: "Garage",
  },
];

export const featuredReview = reviews.find((r) => r.featured) ?? reviews[0];
