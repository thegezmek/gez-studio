import type { ProjectStill } from "@/types/project-detail";

export function makeStills(
  slug: string,
  altPrefix: string,
  cropIndices: readonly number[] = [],
  count = 9,
): ProjectStill[] {
  return Array.from({ length: count }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    return {
      src: `/projects/${slug}/stills/still-${n}.png`,
      alt: `${altPrefix} ${index + 1}`,
      crop: cropIndices.includes(index),
    };
  });
}
