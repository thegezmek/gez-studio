import type { ProjectCategory } from "@/types/project";
import type { Variants } from "framer-motion";

export const categoryLabels: Record<ProjectCategory, string> = {
  "feature-documentary": "Feature Documentary",
  "documentary-series": "Documentary Series",
  "music-video": "Music Video",
  commercial: "Commercial",
  experimental: "Experimental",
};

/** Soft cinematic crossfade timing */
export const cinematicReveal = {
  duration: 1.15,
  exitDuration: 0.9,
  ease: [0.22, 0.61, 0.36, 1] as const,
  keyframeTimes: [0, 1] as const,
  exitTimes: [0, 1] as const,
};

export interface CategoryBehavior {
  autoInterval: number;
  transitionDuration: number;
  kenBurnsDuration: number;
  kenBurnsScale: number;
  mediaDrift: boolean;
  revealEase: readonly [number, number, number, number];
}

export const categoryBehavior: Record<ProjectCategory, CategoryBehavior> = {
  "feature-documentary": {
    autoInterval: 14000,
    transitionDuration: cinematicReveal.duration,
    kenBurnsDuration: 22,
    kenBurnsScale: 1.05,
    mediaDrift: false,
    revealEase: cinematicReveal.ease,
  },
  "documentary-series": {
    autoInterval: 15000,
    transitionDuration: cinematicReveal.duration,
    kenBurnsDuration: 26,
    kenBurnsScale: 1.04,
    mediaDrift: false,
    revealEase: cinematicReveal.ease,
  },
  "music-video": {
    autoInterval: 6500,
    transitionDuration: cinematicReveal.duration,
    kenBurnsDuration: 9,
    kenBurnsScale: 1.09,
    mediaDrift: true,
    revealEase: cinematicReveal.ease,
  },
  commercial: {
    autoInterval: 8500,
    transitionDuration: cinematicReveal.duration,
    kenBurnsDuration: 14,
    kenBurnsScale: 1.03,
    mediaDrift: false,
    revealEase: cinematicReveal.ease,
  },
  experimental: {
    autoInterval: 10000,
    transitionDuration: cinematicReveal.duration,
    kenBurnsDuration: 18,
    kenBurnsScale: 1.07,
    mediaDrift: true,
    revealEase: cinematicReveal.ease,
  },
};

/** Minimal reveal: no slit, no focus-flash, only smooth fade + tiny drift */
function tvPowerReveal(direction: number): Variants {
  const xOffset = direction > 0 ? 10 : -10;

  return {
    initial: {
      opacity: 0,
      scale: 1.02,
      x: xOffset,
      filter: "brightness(0.95) saturate(0.96)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "brightness(1) saturate(1)",
    },
    exit: {
      opacity: 0,
      scale: 1.01,
      x: -xOffset * 0.8,
      filter: "brightness(0.98) saturate(0.98)",
      transition: {
        duration: cinematicReveal.exitDuration,
        ease: cinematicReveal.ease,
      },
    },
  };
}

export function getRevealVariants(
  _category: ProjectCategory,
  direction: number,
): Variants {
  return tvPowerReveal(direction);
}
