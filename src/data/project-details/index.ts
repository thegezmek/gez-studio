import type { ProjectDetail } from "@/types/project-detail";
import { askindanOlmemeliDetail } from "./askindan-olmemeli";
import { catalogueDetails } from "./catalogue-films";
import { bonAimeDetail } from "./bon-aime";
import { dynexDetail } from "./dynex";
import { ebcDetail } from "./ebc";
import { internetRoundsDetail } from "./internet-rounds";
import { empowerDetail } from "./empower";
import { fromAshesDetail } from "./from-ashes";
import { fromAshesIiDetail } from "./from-ashes-ii";
import { greenRefugeDetail } from "./green-refuge";
import { kalpteYasamakDetail } from "./kalpte-yasamak";
import { kuzayaDetail } from "./kuzaya";
import { nothingDisappearsDetail } from "./nothing-disappears";
import { proteenDetail } from "./proteen";
import { voiceOfTheEarthDetail } from "./voice-of-the-earth";
import { worldviewSeaweedDetail } from "./worldview-seaweed";

/** Collection order for prev / next navigation on detail pages */
export const orderedProjectDetails: ProjectDetail[] = [
  nothingDisappearsDetail,
  fromAshesDetail,
  fromAshesIiDetail,
  greenRefugeDetail,
  bonAimeDetail,
  kuzayaDetail,
  empowerDetail,
  worldviewSeaweedDetail,
  proteenDetail,
  dynexDetail,
  ebcDetail,
  kalpteYasamakDetail,
  voiceOfTheEarthDetail,
  askindanOlmemeliDetail,
  internetRoundsDetail,
  ...catalogueDetails,
];

const projectDetails: Record<string, ProjectDetail> = Object.fromEntries(
  orderedProjectDetails.map((detail) => [detail.id, detail]),
);

export interface ProjectNavItem {
  id: string;
  href: string;
  title: string;
}

export interface ProjectNavigation {
  prev: ProjectNavItem;
  next: ProjectNavItem;
  position: number;
  total: number;
}

/** Eyebrows ending in ":" are part of the title; others are category tags. */
export function filmTitle(detail: ProjectDetail): string {
  if (detail.navTitle) return detail.navTitle;
  return detail.eyebrow?.trim().endsWith(":")
    ? `${detail.eyebrow.trim()} ${detail.headline}`
    : detail.headline;
}

function toNavItem(detail: ProjectDetail): ProjectNavItem {
  return {
    id: detail.id,
    href: `/projects/${detail.id}`,
    title: filmTitle(detail),
  };
}

export function getProjectDetail(id: string): ProjectDetail | undefined {
  return projectDetails[id];
}

export function getProjectNavigation(id: string): ProjectNavigation | null {
  const total = orderedProjectDetails.length;
  if (total <= 1) return null;

  const index = orderedProjectDetails.findIndex((detail) => detail.id === id);
  if (index === -1) return null;

  const prevIdx = (index - 1 + total) % total;
  const nextIdx = (index + 1) % total;

  return {
    prev: toNavItem(orderedProjectDetails[prevIdx]),
    next: toNavItem(orderedProjectDetails[nextIdx]),
    position: index + 1,
    total,
  };
}
