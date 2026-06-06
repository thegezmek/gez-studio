export type ProjectCategory =
  | "feature-documentary"
  | "documentary-series"
  | "music-video"
  | "commercial"
  | "experimental";

export type MediaType =
  | "image"
  | "video"
  | "gif"
  | "ken-burns"
  | "parallax";

export type ProjectLayout = "hero" | "wide" | "standard" | "compact";

export interface ProjectMedia {
  type: MediaType;
  src: string;
  poster?: string;
  alt: string;
  /** Load and play immediately (gif loop / video autoplay when in view) */
  autoplay?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  /** Shown below description on archive cards (e.g. Docu-Series) */
  formatLabel?: string;
  /** Shown below format label (e.g. 73 mins) */
  runtime?: string;
  category: ProjectCategory;
  description: string;
  country?: string;
  trailerUrl?: string;
  sourceUrl?: string;
  sourceDate?: string;
  year?: string;
  href?: string;
  comingSoon?: boolean;
  featured?: boolean;
  layout: ProjectLayout;
  media: ProjectMedia;
  tags?: string[];
}
