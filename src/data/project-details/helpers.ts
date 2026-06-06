import type { ProjectStill } from "@/types/project-detail";

/** 0-based indices for all nine grid stills */
export const ALL_STILL_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export function makeStills(
  slug: string,
  altPrefix: string,
  letterboxIndices: readonly number[] = [],
  count = 9,
): ProjectStill[] {
  return Array.from({ length: count }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    return {
      src: `/projects/${slug}/stills/still-${n}.png`,
      alt: `${altPrefix} ${index + 1}`,
      letterbox: letterboxIndices.includes(index),
    };
  });
}
