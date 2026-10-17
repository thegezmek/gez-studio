import type { ProjectDetail } from "@/types/project-detail";

export const dynexDetail: ProjectDetail = {
  id: "dynex",
  headline: "Dynex",
  synopsis: ["The world's first documentary on neuromorphic quantum computing, presented by Dynex co-founder Daniela Herrmann at the Guanajuato International Film Festival in Mexico, 2024."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Daniela Herrmann" },
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
