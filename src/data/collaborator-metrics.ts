/**
 * Measured from the PNGs in /public/partners (content trimmed to its bounds).
 * ratio = width / height, ink = share of opaque pixels. Used to size logos
 * so each reads at the same optical weight instead of the same box.
 * Regenerate if a logo file changes.
 */
export const logoMetrics: Record<string, { ratio: number; ink: number }> = {
  "biosorra": { ratio: 3.141, ink: 0.277 },
  "cgiar": { ratio: 0.854, ink: 0.302 },
  "daily-nation": { ratio: 5.875, ink: 0.231 },
  "department-of-fisheries-thailand": { ratio: 1.000, ink: 0.788 },
  "dynex": { ratio: 4.452, ink: 0.277 },
  "holland-greentech": { ratio: 1.475, ink: 0.335 },
  "icipe": { ratio: 2.654, ink: 0.312 },
  "impulse-empower": { ratio: 1.832, ink: 0.198 },
  "impulse-ngo-network": { ratio: 2.674, ink: 0.310 },
  "istanbul-university-cerrahpasa": { ratio: 1.000, ink: 0.784 },
  "leaders-on-purpose": { ratio: 1.477, ink: 0.301 },
  "marula-proteen-limited": { ratio: 2.314, ink: 0.477 },
  "meta": { ratio: 4.189, ink: 0.422 },
  "mugla-sitki-kocman-university": { ratio: 0.627, ink: 0.280 },
  "project-honeylight": { ratio: 4.683, ink: 0.473 },
  "regeneratex": { ratio: 1.193, ink: 0.289 },
  "rockefeller-foundation": { ratio: 2.674, ink: 0.346 },
  "solid-africa": { ratio: 0.951, ink: 0.377 },
  "star-fun": { ratio: 2.763, ink: 0.368 },
  "stop": { ratio: 1.604, ink: 0.385 },
  "turkiye-ari-yetistiricileri-merkez-birligi": { ratio: 1.002, ink: 0.747 },
  "united-planet": { ratio: 1.568, ink: 0.312 },
  "university-of-nairobi": { ratio: 2.134, ink: 0.185 },
  "vote": { ratio: 0.987, ink: 0.364 },
  "waterbear": { ratio: 4.601, ink: 0.279 },
  "world-bank": { ratio: 4.971, ink: 0.275 },
  "worldview-international-foundation": { ratio: 1.355, ink: 0.173 },
};
