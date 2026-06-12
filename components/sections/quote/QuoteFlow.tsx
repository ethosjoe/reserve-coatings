"use client";

import { useReducer, useCallback, useRef, useEffect } from "react";
import { useQueryState, parseAsInteger, parseAsString, parseAsFloat } from "nuqs";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { quoteReducer, initialQuoteState, type SpaceType } from "./quote-state";
import { StepSpaceType } from "./StepSpaceType";
import { StepSquareFootage } from "./StepSquareFootage";
import { StepFinishTier } from "./StepFinishTier";
import { StepPhotos } from "./StepPhotos";
import { StepEstimate } from "./StepEstimate";
import { StepConfirmation } from "./StepConfirmation";
import { stepTransition } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { QUOTE_COPY } from "@/lib/copy";
import { normalizePhotoUrls } from "@/lib/upload-url";
import type { FinishTier } from "@/lib/pricing";

const QUOTE_PHOTOS_STORAGE_KEY = "reserve-quote-photo-urls";
const QUOTE_SUBMISSION_ID_KEY = "reserve-quote-submission-id";

function getOrCreateSubmissionId(): string {
  try {
    const stored = sessionStorage.getItem(QUOTE_SUBMISSION_ID_KEY);
    if (stored) return stored;
    const id = crypto.randomUUID();
    sessionStorage.setItem(QUOTE_SUBMISSION_ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function parseFinishTier(value: string | null | undefined): FinishTier | undefined {
  if (value === "standard" || value === "premium") return value;
  return undefined;
}

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  "Space type",
  "Square footage",
  "Finish tier",
  "Photos",
  "Estimate",
  "Confirmation",
];

export function QuoteFlow() {
  const reduced = usePrefersReducedMotion();
  const liveRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1));
  const [space, setSpace] = useQueryState("space", parseAsString);
  const [sqftQ, setSqftQ] = useQueryState("sqft", parseAsFloat.withDefault(500));
  const [tierQ, setTierQ] = useQueryState("tier", parseAsString);

  const [state, dispatch] = useReducer(quoteReducer, initialQuoteState, (base) => ({
    ...base,
    step: step ?? 1,
    submissionId: getOrCreateSubmissionId(),
    spaceType: (space as SpaceType) || undefined,
    sqft: sqftQ ?? 500,
    tier: parseFinishTier(tierQ),
    photoUrls: [],
  }));

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(QUOTE_PHOTOS_STORAGE_KEY);
      if (!stored) return;
      const photoUrls = normalizePhotoUrls(JSON.parse(stored) as string[]);
      if (photoUrls.length > 0) {
        dispatch({ type: "SET_PHOTOS", photoUrls });
      }
    } catch {
      // ignore invalid session storage
    }
  }, []);

  useEffect(() => {
    if (tierQ && !parseFinishTier(tierQ)) {
      setTierQ(null);
    }
  }, [tierQ, setTierQ]);

  useEffect(() => {
    try {
      if (state.photoUrls.length > 0) {
        sessionStorage.setItem(QUOTE_PHOTOS_STORAGE_KEY, JSON.stringify(state.photoUrls));
      } else {
        sessionStorage.removeItem(QUOTE_PHOTOS_STORAGE_KEY);
      }
    } catch {
      // ignore quota / private mode errors
    }
  }, [state.photoUrls]);

  const syncUrl = useCallback(
    (next: typeof state) => {
      setStep(next.step);
      if (next.spaceType) setSpace(next.spaceType);
      setSqftQ(next.sqft);
      if (next.tier) setTierQ(next.tier);
    },
    [setStep, setSpace, setSqftQ, setTierQ]
  );

  const goTo = (s: number) => {
    const next = { ...state, step: s };
    dispatch({ type: "SET_STEP", step: s });
    syncUrl(next);
  };

  const currentStep = step ?? state.step;
  const progress = (currentStep / TOTAL_STEPS) * 100;
  const transition = stepTransition(reduced);

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Step ${currentStep} of ${TOTAL_STEPS}: ${STEP_LABELS[currentStep - 1]}`;
    }
  }, [currentStep]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" />
      <Card variant="elevated" className="mb-8">
        <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-smoke">
          <span>{QUOTE_COPY.progressLabel}</span>
          <span>
            {currentStep} / {TOTAL_STEPS}
          </span>
        </div>
        <Progress
          value={progress}
          className="h-1.5 overflow-hidden rounded-full bg-hairline transition-all duration-base [&>div]:rounded-full [&>div]:bg-champagne [&>div]:transition-all [&>div]:duration-base"
        />
      </Card>

      <Card variant="elevated">
        <AnimatePresence mode="wait">
        <motion.div key={currentStep} {...transition}>
          {currentStep === 1 && (
            <StepSpaceType
              onSelect={(spaceType) => {
                dispatch({ type: "SET_SPACE", spaceType });
                syncUrl({ ...state, spaceType, step: 2 });
                setSpace(spaceType);
                setStep(2);
              }}
            />
          )}
          {currentStep === 2 && (
            <StepSquareFootage
              sqft={state.sqft}
              onChange={(sqft) => {
                dispatch({ type: "SET_SQFT", sqft });
                setSqftQ(sqft);
              }}
              onNext={() => goTo(3)}
              onBack={() => goTo(1)}
            />
          )}
          {currentStep === 3 && (
            <StepFinishTier
              onSelect={(tier) => {
                dispatch({ type: "SET_TIER", tier });
                syncUrl({ ...state, tier, step: 4 });
                setTierQ(tier);
                setStep(4);
              }}
              onBack={() => goTo(2)}
            />
          )}
          {currentStep === 4 && state.spaceType && state.tier && state.submissionId && (
            <StepPhotos
              submissionId={state.submissionId}
              spaceType={state.spaceType}
              sqft={state.sqft}
              tier={state.tier}
              urls={state.photoUrls}
              onChange={(photoUrls) => dispatch({ type: "SET_PHOTOS", photoUrls })}
              onNext={() => goTo(5)}
              onSkip={() => goTo(5)}
              onBack={() => goTo(3)}
            />
          )}
          {currentStep === 5 && state.tier && state.spaceType && (
            <StepEstimate
              state={state}
              onContactChange={(data) => dispatch({ type: "SET_CONTACT", data })}
              onComplete={(bookingType) => {
                dispatch({ type: "SET_BOOKING", bookingType });
                try {
                  sessionStorage.removeItem(QUOTE_PHOTOS_STORAGE_KEY);
                  sessionStorage.removeItem(QUOTE_SUBMISSION_ID_KEY);
                } catch {
                  // ignore
                }
                setStep(6);
              }}
              onBack={() => goTo(4)}
            />
          )}
          {currentStep === 6 && state.tier && state.spaceType && (
            <StepConfirmation state={state} />
          )}
        </motion.div>
      </AnimatePresence>
      </Card>
    </div>
  );
}
