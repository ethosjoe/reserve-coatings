/** Shared easing — luxury ease-out */
export const easeLuxury = [0.22, 1, 0.36, 1] as const;

/** Duration constants matching CSS tokens */
export const DURATION_FAST = 0.2;
export const DURATION_BASE = 0.4;
export const DURATION_SLOW = 0.6;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_SLOW + 0.05, ease: easeLuxury, delay: i * 0.08 },
  }),
};

export const blurUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_SLOW, ease: easeLuxury, delay: i * 0.08 },
  }),
};

export const blurUpHeading = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_SLOW, ease: easeLuxury },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_BASE + 0.15, ease: easeLuxury },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION_BASE + 0.1, ease: easeLuxury, delay: i * 0.06 },
  }),
};

export const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_BASE + 0.05, ease: easeLuxury },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerBlur = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

/** Step transitions for quote wizard */
export function stepTransition(reducedMotion: boolean) {
  if (reducedMotion) {
    return { duration: 0 };
  }
  return {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
    transition: { duration: 0.35, ease: easeLuxury },
  };
}
