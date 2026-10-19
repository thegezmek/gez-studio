import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt = "Proteen film still";

export const proteenDetail: ProjectDetail = {
  id: "proteen",
  headline: "Proteen",
  synopsis: ["Featuring Ugandan-based waste management company Proteen, the film navigates the opportunity and challenges posed by organic waste."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Tommie Hooft" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2023" },
    { label: "Country", value: "Uganda" },
    { label: "Language", value: "English" },
    { label: "Partners", value: "Marula Proteen Ltd" },
    { label: "Runtime", value: "12 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("proteen", stillAlt),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/972957789",
    title: "Proteen — Trailer",
  },
};
