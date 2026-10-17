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
  /** Source has black bars baked in; scale them out of frame */
  crop?: boolean;
}

export interface ProjectTrailerEmbed {
  provider: "vimeo" | "youtube" | "file";
  embedUrl: string;
  title: string;
}

export interface ProjectFeaturedVideo {
  title: string;
  runtime: string;
  cover: string;
  video: ProjectTrailerEmbed;
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
  musicVideos?: ProjectFeaturedVideo[];
}
