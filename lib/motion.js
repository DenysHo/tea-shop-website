export const EASE_CALM = [0.22, 1, 0.36, 1];

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

export const drawerRight = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { type: "spring", stiffness: 320, damping: 36 },
};

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CALM, delay: Math.min(i, 8) * 0.06 },
  }),
};

export const gallerySlideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "25%" : "-25%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-25%" : "25%", opacity: 0 }),
};

export const gallerySlideTransition = {
  x: { type: "spring", stiffness: 300, damping: 32 },
  opacity: { duration: 0.25 },
};

export const thumbSpring = { type: "spring", stiffness: 400, damping: 32 };

export const reorderSpring = { type: "spring", stiffness: 500, damping: 42 };

export const SLIDER_INTERVAL_MS = 5000;
