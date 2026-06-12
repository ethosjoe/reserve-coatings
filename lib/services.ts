import type { SpaceType } from "@/components/sections/quote/quote-state";

export const LEAD_SERVICE_OPTIONS = [
  "Garage",
  "Basement",
  "Outdoor",
  "Commercial",
  "Multiple",
  "Not Sure",
] as const;

export type LeadService = (typeof LEAD_SERVICE_OPTIONS)[number];

export const LEAD_SERVICE_LABELS: Record<LeadService, string> = {
  Garage: "Garage",
  Basement: "Basement",
  Outdoor: "Outdoor",
  Commercial: "Commercial",
  Multiple: "Multiple",
  "Not Sure": "Not sure yet",
};

const SERVICE_TO_SPACE: Partial<Record<LeadService, SpaceType>> = {
  Garage: "garage",
  Basement: "basement",
  Outdoor: "outdoor",
  Commercial: "commercial",
};

const PATHNAME_TO_SERVICE: Record<string, LeadService> = {
  "/garages": "Garage",
  "/basements": "Basement",
  "/outdoor": "Outdoor",
  "/commercial": "Commercial",
};

export function leadServiceToSpaceType(service: LeadService): SpaceType | undefined {
  return SERVICE_TO_SPACE[service];
}

export function pathnameToLeadService(pathname: string): LeadService | undefined {
  for (const [path, service] of Object.entries(PATHNAME_TO_SERVICE)) {
    if (pathname === path || pathname.startsWith(`${path}/`)) {
      return service;
    }
  }
  return undefined;
}

export function quoteToolHref(service: LeadService | undefined): string {
  const space = service ? leadServiceToSpaceType(service) : undefined;
  if (space) return `/quote?step=2&space=${space}`;
  return "/quote?step=1";
}
