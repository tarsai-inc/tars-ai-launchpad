import type { Variants } from "framer-motion";

/** One easing curve across the entire site — precision, no bounce. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.07 },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.07 },
  }),
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
