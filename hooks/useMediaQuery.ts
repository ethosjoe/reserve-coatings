"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = () => setMatches(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** Disable heavy motion (parallax, blur, Ken Burns) on mobile or reduced-motion */
export function useMotionLite(): boolean {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  return reduced || isMobile;
}
