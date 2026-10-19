import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt = "Bon Aimé film still";

export const bonAimeDetail: ProjectDetail = {
  id: "bon-aime",
  headline: "Bon Aimé",
  synopsis: ["An Amsterdam-based DJ travels to Kampala, where spontaneous musical encounters become the foundation of a new record."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Adam Shpilt" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2023–2024" },
    { label: "Country", value: "Uganda, Netherlands" },
    { label: "Language", value: "English, Lugandan" },
    { label: "Runtime", value: "60 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("bon-aime", stillAlt),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1171295662?h=9de8571bf5",
    title: "Bon Aimé — Trailer",
  },
};
