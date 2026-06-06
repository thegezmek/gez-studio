import type { ProjectDetail } from "@/types/project-detail";

export const dynexDetail: ProjectDetail = {
  id: "dynex",
  headline: "Dynex",
  synopsis: [
    "The world's first documentary on neuromorphic quantum computing was showcased at the Guanajuato International Film Festival, presented by IDEA GTO in Leòn, Mexico, on July 20, 2024, by Dynex Co-Founder Daniela Herrmann.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2024" },
    { label: "Country", value: "USA" },
    { label: "Runtime", value: "74 secs" },
  ],
  stills: [],
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/989593030",
    title: "Dynex nQuantum — Trailer",
  },
};
