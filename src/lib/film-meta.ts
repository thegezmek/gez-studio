import type { Project } from "@/types/project";

export const ARCHIVE_KINDS = [
  "DOCUMENTARY",
  "BIOPIC",
  "COMMERCIAL",
  "BRANDED FILM",
  "EVENT",
  "MUSIC VIDEO",
] as const;

export type ArchiveKind = (typeof ARCHIVE_KINDS)[number];

export function archiveKind(film: Project): ArchiveKind {
  const label = film.formatLabel?.toLowerCase() ?? "";
  if (label.includes("music")) return "MUSIC VIDEO";
  if (label.includes("branded")) return "BRANDED FILM";
  if (label.includes("commercial")) return "COMMERCIAL";
  if (label.includes("event")) return "EVENT";
  if (label.includes("biopic")) return "BIOPIC";
  return "DOCUMENTARY";
}

export function yearOf(project: Project) {
  if (project.year) return project.year;
  return project.sourceDate?.match(/\d{4}/)?.[0] ?? "";
}
