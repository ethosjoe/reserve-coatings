export type ProcessStage = {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  tagline: string;
  body: string;
  checklist: string[];
  whyItMatters: string;
  duration?: string;
};

export const processOverview = {
  headline: "Six documented stages. One accountable crew. Zero guesswork on install day.",
  subhead:
    "Every Reserve floor follows the same protocol — from substrate diagnostics through polyaspartic cure. We publish it here so you know exactly what happens before we roll the first coat.",
};

export const processMetrics = [
  { value: "6", label: "Prep & coating stages" },
  { value: "1", label: "Disciplined install day" },
  { value: "24h", label: "Light foot traffic" },
  { value: "100%", label: "W-2 Reserve crews" },
] as const;

export const processJourney = [
  {
    phase: "Before we arrive",
    steps: [
      {
        title: "Walk-through & scope",
        detail:
          "Square footage, drainage, cracks, and finish tier are documented — your quote matches the scope we verify on site.",
      },
      {
        title: "Color approval",
        detail:
          "Flake blends are sampled on site so the installed floor matches what you signed off on.",
      },
    ],
  },
  {
    phase: "Install day",
    steps: [
      {
        title: "Substrate prep",
        detail:
          "Moisture testing, decontamination, grinding, and crack repair run in sequence — no stage is skipped for speed.",
      },
      {
        title: "Coating application",
        detail:
          "Polyurea base, broadcast, and polyaspartic topcoat within manufacturer recoat windows.",
      },
    ],
  },
  {
    phase: "After cure",
    steps: [
      {
        title: "Hand-off",
        detail:
          "Care instructions, warranty registration, and a walk-through of your finished surface.",
      },
    ],
  },
] as const;

export const installStages: ProcessStage[] = [
  {
    id: "moisture-testing",
    number: "01",
    shortTitle: "Moisture test",
    title: "Moisture vapor testing",
    tagline: "We measure the slab before we commit a coating system to it.",
    body: "Concrete holds more water than most homeowners expect. We test moisture vapor emission (MVER) and, when required, in-situ relative humidity per industry standards. Elevated readings stop the clock until remediation is designed — we do not encapsulate a wet slab and call it fixed.",
    checklist: [
      "Calcium chloride or in-situ RH testing on representative slab areas",
      "Documented readings compared to coating manufacturer limits",
      "Remediation plan when readings fail",
      "Re-test after remediation before basecoat",
    ],
    whyItMatters:
      "Coating failure from vapor pressure is among the most expensive garage floor callbacks. Testing is non-negotiable on every Reserve job.",
    duration: "30–45 min",
  },
  {
    id: "oil-contamination",
    number: "02",
    shortTitle: "Decontamination",
    title: "Oil & petroleum decontamination",
    tagline: "Chemistry-specific profiling — not a generic degrease.",
    body: "Hydrocarbons penetrate concrete beyond what you can see. We map saturated zones, extract contamination with compatible solvents and media, and profile the surface so primer achieves bond — especially on vehicle paths and lift areas.",
    checklist: [
      "Mapping of oil-stained zones",
      "Solvent extraction and absorbent media where needed",
      "Profiling verification — no sealed patches left behind",
      "Isolated primer on stubborn areas when required",
    ],
    whyItMatters:
      "Epoxy over oil-contaminated concrete delaminates in ribbons. Targeted extraction costs less than a full re-coat later.",
    duration: "1–3 hours",
  },
  {
    id: "diamond-grinding",
    number: "03",
    shortTitle: "Diamond grind",
    title: "Mechanical diamond grinding",
    tagline: "We open the pore structure — no acid etch shortcuts.",
    body: "Planetary grinders with progressive diamond tooling achieve a consistent CSP (concrete surface profile) for mechanical adhesion — uniform texture, weak paste removed, sound substrate exposed.",
    checklist: [
      "Progressive grit sequence for slab hardness",
      "Edge and detail grinding at walls and posts",
      "Vacuum-assisted dust control",
      "Final gloss and profile inspection",
    ],
    whyItMatters:
      "Acid etching is inconsistent and poor on hardened concrete. Mechanical profiling is what commercial specifiers require.",
    duration: "2–5 hours",
  },
  {
    id: "crack-repair",
    number: "04",
    shortTitle: "Crack repair",
    title: "Crack & joint treatment",
    tagline: "Movement is managed — not hidden under the finish.",
    body: "Control joints and cracks are routed, cleaned, and filled with flexible or semi-rigid epoxies matched to expected movement. Spalls are rebuilt so the plane reads flat under raking light.",
    checklist: [
      "Routing and cleaning of active cracks",
      "Flexible fill in control joints",
      "Feathered transitions before basecoat",
      "Cure verification",
    ],
    whyItMatters:
      "Decorative finishes amplify defects underneath. Proper joint work prevents telegraphed cracking.",
    duration: "1–4 hours",
  },
  {
    id: "polyurea-broadcast",
    number: "05",
    shortTitle: "Base & broadcast",
    title: "Polyurea base & broadcast",
    tagline: "Primer, body, and your chosen aesthetic.",
    body: "Moisture-tolerant polyurea primer penetrates the profiled slab, followed by the build coat. Flake is hand-broadcast to full rejection while wet, per your approved sample.",
    checklist: [
      "Polyurea primer at manufacturer spread rate",
      "Build coat within recoat window",
      "Hand broadcast per approved sample",
      "Holiday inspection before topcoat",
    ],
    whyItMatters:
      "Polyurea outperforms commodity epoxy on Michigan slabs under thermal cycling and road salt.",
    duration: "3–5 hours",
  },
  {
    id: "polyaspartic-topcoat",
    number: "06",
    shortTitle: "Topcoat",
    title: "Polyaspartic clear topcoat",
    tagline: "UV-stable protection — light traffic the next morning.",
    body: "Fast-curing polyaspartic clear at specified film build, with optional anti-slip additive. Return-to-service timelines are provided in writing at hand-off.",
    checklist: [
      "Polyaspartic clear at specified thickness",
      "Optional slip-resistant additive",
      "UV-stable formulation for daylight exposure",
      "Written cure and vehicle-load guidance",
    ],
    whyItMatters:
      "Polyaspartic resists hot-tire pickup, yellowing, and chemicals better than traditional epoxy clears.",
    duration: "2–3 hrs · 24h foot traffic",
  },
];

export const processStandards = {
  never: [
    "Subcontracting to unaffiliated crews",
    "Acid etch-only prep on garage slabs",
    "Coating over failed moisture readings",
    "Surprise price changes on install day",
  ],
  always: [
    "W-2 Reserve installers on every job",
    "Written scope from walk-through notes",
    "Manufacturer-compliant spread rates",
    "Transferable lifetime warranty (residential)",
  ],
};

export const processFaqs = [
  {
    question: "How long does a typical garage take?",
    answer:
      "Most single- and double-bay garages are prepped and coated in one day, with light foot traffic often available the next morning. Heavily remediated slabs may add a prep-only day.",
  },
  {
    question: "Can you coat in winter?",
    answer:
      "Yes, with temperature-controlled conditions and adjusted cure schedules. We will not apply outside manufacturer parameters.",
  },
  {
    question: "What should I do before the crew arrives?",
    answer:
      "Clear the space, ensure power and access, and share any known moisture or oil history. We handle containment, grinding, and coating.",
  },
] as const;

/** Grouped navigation for process page sidebar */
export const processTocGroups = [
  {
    label: "Overview",
    items: [
      { id: "overview", title: "Protocol summary" },
      { id: "journey", title: "Project timeline" },
    ],
  },
  {
    label: "Install stages",
    items: installStages.map((s) => ({
      id: s.id,
      title: `${s.number} ${s.shortTitle}`,
    })),
  },
  {
    label: "Finish",
    items: [
      { id: "reserve-system", title: "Coating system" },
      { id: "standards", title: "Our standards" },
      { id: "faq", title: "Questions" },
    ],
  },
] as const;
