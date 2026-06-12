import type { FinishTier } from "@/lib/pricing";

export type SpaceType = "garage" | "basement" | "outdoor" | "commercial";

export type QuoteState = {
  step: number;
  submissionId: string;
  spaceType?: SpaceType;
  sqft: number;
  tier?: FinishTier;
  photoUrls: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  bookingType?: "virtual" | "in-person" | "none";
  preferredDate: string;
  preferredTime: string;
};

export type QuoteAction =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_SPACE"; spaceType: SpaceType }
  | { type: "SET_SQFT"; sqft: number }
  | { type: "SET_TIER"; tier: FinishTier }
  | { type: "SET_PHOTOS"; photoUrls: string[] }
  | { type: "SET_SUBMISSION_ID"; submissionId: string }
  | { type: "SET_CONTACT"; data: Partial<QuoteState> }
  | { type: "SET_BOOKING"; bookingType: QuoteState["bookingType"] };

export const initialQuoteState: QuoteState = {
  step: 1,
  submissionId: "",
  sqft: 500,
  photoUrls: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  zip: "",
  preferredDate: "",
  preferredTime: "",
};

export function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_SPACE":
      return { ...state, spaceType: action.spaceType, step: 2 };
    case "SET_SQFT":
      return { ...state, sqft: action.sqft };
    case "SET_TIER":
      return { ...state, tier: action.tier, step: 4 };
    case "SET_PHOTOS":
      return { ...state, photoUrls: action.photoUrls };
    case "SET_SUBMISSION_ID":
      return { ...state, submissionId: action.submissionId };
    case "SET_CONTACT":
      return { ...state, ...action.data };
    case "SET_BOOKING":
      return { ...state, bookingType: action.bookingType, step: 6 };
    default:
      return state;
  }
}
