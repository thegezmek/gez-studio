import type { CSSProperties } from "react";

export interface ProjectAtmosphere {
  /** RGB triplet for CSS rgb(var(--film-tint) / α) */
  tint: string;
  hue: string;
  /** Full overlay gradient */
  wash: string;
  /** Page-level ambient bleed when this film is active */
  pageGlow: string;
}

const defaultAtmosphere: ProjectAtmosphere = {
  tint: "180, 176, 168",
  hue: "#b4b0a8",
  wash:
    "linear-gradient(165deg, rgb(0 0 0 / 0.15) 0%, rgb(0 0 0 / 0.55) 55%, rgb(0 0 0 / 0.82) 100%)",
  pageGlow: "radial-gradient(ellipse 90% 50% at 50% 0%, rgb(180 176 168 / 0.08), transparent 70%)",
};

export const projectAtmospheres: Record<string, ProjectAtmosphere> = {
  "from-ashes": {
    tint: "210, 118, 62",
    hue: "#d2763e",
    wash:
      "linear-gradient(175deg, rgb(210 118 62 / 0.22) 0%, rgb(24 18 14 / 0.35) 40%, rgb(0 0 0 / 0.78) 100%)",
    pageGlow:
      "radial-gradient(ellipse 100% 55% at 50% 15%, rgb(210 118 62 / 0.14), transparent 68%)",
  },
  "from-ashes-ii": {
    tint: "198, 92, 48",
    hue: "#c65c30",
    wash:
      "linear-gradient(175deg, rgb(198 92 48 / 0.24) 0%, rgb(22 16 12 / 0.38) 42%, rgb(0 0 0 / 0.8) 100%)",
    pageGlow:
      "radial-gradient(ellipse 100% 55% at 50% 15%, rgb(198 92 48 / 0.16), transparent 68%)",
  },
  "green-refuge": {
    tint: "92, 128, 78",
    hue: "#5c804e",
    wash:
      "linear-gradient(175deg, rgb(92 128 78 / 0.2) 0%, rgb(18 22 16 / 0.38) 42%, rgb(0 0 0 / 0.8) 100%)",
    pageGlow:
      "radial-gradient(ellipse 100% 55% at 50% 15%, rgb(92 128 78 / 0.14), transparent 68%)",
  },
  empower: {
    tint: "186, 142, 98",
    hue: "#ba8e62",
    wash:
      "linear-gradient(180deg, rgb(186 142 98 / 0.18) 0%, rgb(20 16 12 / 0.4) 45%, rgb(0 0 0 / 0.8) 100%)",
    pageGlow:
      "radial-gradient(ellipse 95% 50% at 48% 12%, rgb(186 142 98 / 0.12), transparent 65%)",
  },
  "worldview-seaweed": {
    tint: "72, 148, 138",
    hue: "#48948a",
    wash:
      "linear-gradient(170deg, rgb(72 148 138 / 0.25) 0%, rgb(12 28 26 / 0.35) 42%, rgb(0 0 0 / 0.78) 100%)",
    pageGlow:
      "radial-gradient(ellipse 100% 52% at 50% 10%, rgb(72 148 138 / 0.16), transparent 70%)",
  },
  proteen: {
    tint: "118, 158, 88",
    hue: "#769e58",
    wash:
      "linear-gradient(175deg, rgb(118 158 88 / 0.2) 0%, rgb(16 22 12 / 0.38) 44%, rgb(0 0 0 / 0.8) 100%)",
    pageGlow:
      "radial-gradient(ellipse 92% 48% at 52% 14%, rgb(118 158 88 / 0.13), transparent 66%)",
  },
  "bon-aime": {
    tint: "198, 88, 72",
    hue: "#c65848",
    wash:
      "linear-gradient(172deg, rgb(198 88 72 / 0.22) 0%, rgb(28 14 12 / 0.4) 46%, rgb(0 0 0 / 0.8) 100%)",
    pageGlow:
      "radial-gradient(ellipse 94% 50% at 50% 12%, rgb(198 88 72 / 0.14), transparent 68%)",
  },
  kuzaya: {
    tint: "168, 132, 72",
    hue: "#a88448",
    wash:
      "linear-gradient(175deg, rgb(168 132 72 / 0.22) 0%, rgb(22 18 10 / 0.4) 44%, rgb(0 0 0 / 0.82) 100%)",
    pageGlow:
      "radial-gradient(ellipse 96% 52% at 50% 12%, rgb(168 132 72 / 0.14), transparent 68%)",
  },
  "kalpte-yasamak": {
    tint: "168, 108, 128",
    hue: "#a86c80",
    wash:
      "linear-gradient(168deg, rgb(168 108 128 / 0.2) 0%, rgb(22 14 18 / 0.42) 46%, rgb(0 0 0 / 0.82) 100%)",
    pageGlow:
      "radial-gradient(ellipse 96% 50% at 50% 12%, rgb(168 108 128 / 0.12), transparent 68%)",
  },
  dynex: {
    tint: "88, 128, 198",
    hue: "#5880c6",
    wash:
      "linear-gradient(175deg, rgb(88 128 198 / 0.22) 0%, rgb(10 14 28 / 0.45) 48%, rgb(0 0 0 / 0.82) 100%)",
    pageGlow:
      "radial-gradient(ellipse 100% 54% at 50% 8%, rgb(88 128 198 / 0.15), transparent 72%)",
  },
  apollo: {
    tint: "108, 98, 188",
    hue: "#6c62bc",
    wash:
      "linear-gradient(172deg, rgb(108 98 188 / 0.24) 0%, rgb(14 12 26 / 0.4) 44%, rgb(0 0 0 / 0.8) 100%)",
    pageGlow:
      "radial-gradient(ellipse 94% 52% at 48% 10%, rgb(108 98 188 / 0.14), transparent 70%)",
  },
  "voice-of-the-earth": {
    tint: "58, 128, 88",
    hue: "#3a8058",
    wash:
      "linear-gradient(168deg, rgb(58 128 88 / 0.26) 0%, rgb(8 20 14 / 0.38) 40%, rgb(0 0 0 / 0.78) 100%)",
    pageGlow:
      "radial-gradient(ellipse 98% 55% at 50% 12%, rgb(58 128 88 / 0.16), transparent 68%)",
  },
};

export function getProjectAtmosphere(projectId: string): ProjectAtmosphere {
  return projectAtmospheres[projectId] ?? defaultAtmosphere;
}

export function atmosphereFrameStyle(projectId: string): CSSProperties {
  const a = getProjectAtmosphere(projectId);
  return {
    "--film-tint": a.tint,
    "--film-hue": a.hue,
    "--film-wash": a.wash,
  } as CSSProperties;
}

export function atmospherePageStyle(projectId: string): CSSProperties {
  const a = getProjectAtmosphere(projectId);
  return {
    "--page-tint": a.tint,
    "--page-glow": a.pageGlow,
  } as CSSProperties;
}
