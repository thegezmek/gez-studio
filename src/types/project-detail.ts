export interface ProjectHeroMedia {
  type: "video" | "image";
  src: string;
  poster?: string;
  alt: string;
}

export interface ProjectCredit {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ProjectStill {
  src: string;
  alt: string;
  /** Overlay cinematic letterbox bars (for full-frame source stills) */
  letterbox?: boolean;
}

export interface ProjectTrailerEmbed {
  provider: "vimeo";
  embedUrl: string;
  title: string;
}

export interface ProjectDetail {
  id: string;
  eyebrow?: string;
  headline: string;
  /** Prev/next nav label; defaults to eyebrow + headline when eyebrow is set */
  navTitle?: string;
  heroMedia?: ProjectHeroMedia;
  synopsis: string[];
  credits: ProjectCredit[];
  stills: ProjectStill[];
  stillsTitle?: string;
  trailer?: ProjectTrailerEmbed;
}
