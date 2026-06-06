import type { ProjectLayout } from "@/types/project";
import {
  countryKeysFromLabel,
  type CountryGeoKey,
} from "@/data/country-geo";
import {
  ACTIVE_SELECTOR,
  hitTarget,
  isPlayTarget,
} from "@/lib/cursor-targets";

export type CursorMode = "scan" | "frame" | "play" | "link" | "text";

export interface CursorContext {
  mode: CursorMode;
  title?: string;
  meta?: string;
  country?: string;
  countryKeys?: CountryGeoKey[];
  aspect: number;
  tint: string;
  showPlay: boolean;
  active: boolean;
}

const DEFAULT_TINT = "180, 176, 168";
const DEFAULT_ASPECT = 2.43;

export function aspectForLayout(layout: ProjectLayout): string {
  switch (layout) {
    case "hero":
      return "2.39/1";
    case "wide":
      return "16/9";
    case "compact":
      return "4/3";
    default:
      return "16/10";
  }
}

function parseAspect(raw: string | null | undefined): number {
  if (!raw) return DEFAULT_ASPECT;

  const ratio = raw.includes("/")
    ? raw.split("/").map((part) => Number(part.trim()))
    : null;

  if (ratio && ratio.length === 2 && ratio[0] > 0 && ratio[1] > 0) {
    return ratio[0] / ratio[1];
  }

  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_ASPECT;
}

function readTint(el: HTMLElement): string {
  const tinted = el.closest(
    ".film-frame, .home-v2-hero__media, [data-cursor-tint]",
  ) as HTMLElement | null;

  if (tinted) {
    const attrTint = tinted.getAttribute("data-cursor-tint");
    if (attrTint) return attrTint;

    const cssTint = getComputedStyle(tinted).getPropertyValue("--film-tint").trim();
    if (cssTint) return cssTint;
  }

  return DEFAULT_TINT;
}

const CONTINENT_FILM_COUNTRY: Record<string, string> = {
  kuzaya: "Africa",
  proteen: "Africa",
};

function readCountry(host: HTMLElement) {
  if (host.closest(".home-v2-hero--media-only")) {
    return { country: undefined, countryKeys: undefined };
  }

  const filmId = host
    .closest("[data-film-id]")
    ?.getAttribute("data-film-id");
  const country =
    (filmId && CONTINENT_FILM_COUNTRY[filmId]) ||
    host.getAttribute("data-cursor-country") ||
    undefined;

  return {
    country,
    countryKeys: country ? countryKeysFromLabel(country) : undefined,
  };
}

function readFromHost(host: HTMLElement, hit: HTMLElement): CursorContext {
  const mode = (host.getAttribute("data-cursor-mode") as CursorMode) || "scan";
  const title = host.getAttribute("data-cursor-title") ?? undefined;
  const meta =
    host.getAttribute("data-cursor-meta") ??
    host.getAttribute("data-cursor-label") ??
    undefined;
  const aspect = parseAspect(host.getAttribute("data-cursor-aspect"));
  const tint = host.getAttribute("data-cursor-tint") ?? readTint(host);
  const play = mode === "play" || isPlayTarget(hit);
  const { country, countryKeys } = readCountry(host);

  return {
    mode: play && mode === "frame" ? "frame" : mode,
    title,
    meta,
    country,
    countryKeys,
    aspect,
    tint,
    showPlay: play,
    active: true,
  };
}

function readFromFilmLink(link: HTMLElement, hit: HTMLElement): CursorContext {
  if (link.hasAttribute("data-cursor-mode")) {
    return readFromHost(link, hit);
  }

  return {
    mode: "frame",
    title: link.getAttribute("aria-label")?.replace(/^View\s+/i, "").split(",")[0],
    meta: undefined,
    aspect: DEFAULT_ASPECT,
    tint: readTint(link),
    showPlay: isPlayTarget(hit),
    active: true,
  };
}

export function getCursorContext(x: number, y: number): CursorContext {
  const hit = hitTarget(x, y);

  if (!hit) {
    return {
      mode: "scan",
      aspect: DEFAULT_ASPECT,
      tint: DEFAULT_TINT,
      showPlay: false,
      active: false,
    };
  }

  const explicitHost = hit.closest("[data-cursor-mode]") as HTMLElement | null;
  if (explicitHost) {
    const context = readFromHost(explicitHost, hit);
    return {
      ...context,
      active: true,
      showPlay: context.showPlay || isPlayTarget(hit),
    };
  }

  const filmLink = hit.closest(".film-frame__link") as HTMLElement | null;
  if (filmLink) {
    const context = readFromFilmLink(filmLink, hit);
    const title =
      filmLink.getAttribute("data-cursor-title") ??
      context.title;
    const meta = filmLink.getAttribute("data-cursor-meta") ?? undefined;
    const aspect = filmLink.hasAttribute("data-cursor-aspect")
      ? parseAspect(filmLink.getAttribute("data-cursor-aspect"))
      : context.aspect;
    const { country, countryKeys } = readCountry(filmLink);

    return {
      ...context,
      title,
      meta,
      country,
      countryKeys,
      aspect,
      tint: readTint(filmLink),
    };
  }

  if (isPlayTarget(hit)) {
    return {
      mode: "play",
      aspect: 16 / 9,
      tint: readTint(hit),
      showPlay: true,
      active: true,
      meta: hit.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? undefined,
    };
  }

  if (hit.closest("h1, h2, h3, h4, h5, h6")) {
    return {
      mode: "text",
      aspect: 2.6,
      tint: DEFAULT_TINT,
      showPlay: false,
      active: true,
    };
  }

  if (hit.closest(ACTIVE_SELECTOR)) {
    return {
      mode: "link",
      aspect: 2.1,
      tint: DEFAULT_TINT,
      showPlay: false,
      active: true,
      meta: hit.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? undefined,
    };
  }

  return {
    mode: "scan",
    aspect: DEFAULT_ASPECT,
    tint: DEFAULT_TINT,
    showPlay: false,
    active: false,
  };
}
