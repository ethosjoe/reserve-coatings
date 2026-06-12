"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuxuryLoader } from "./LuxuryLoader";

/**
 * Branded splash on first load only — no overlay on in-app navigation
 * (avoids the site feeling like it reloads on every click).
 */
export function LuxuryLoadingProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [initialSplash, setInitialSplash] = useState(true);

  useEffect(() => {
    const done = () => setInitialSplash(false);
    if (document.readyState === "complete") {
      const t = setTimeout(done, reduceMotion ? 0 : 700);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", done, { once: true });
    const fallback = setTimeout(done, 1800);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(fallback);
    };
  }, [reduceMotion]);

  return (
    <>
      {children}
      <AnimatePresence mode="wait">
        {initialSplash && (
          <motion.div
            key="luxury-loader"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-obsidian"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
            }
            aria-hidden={!initialSplash}
          >
            <LuxuryLoader variant="overlay" className="min-h-0 bg-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
