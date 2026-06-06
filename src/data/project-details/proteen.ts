import type { ProjectDetail } from "@/types/project-detail";
import { ALL_STILL_INDICES, makeStills } from "./helpers";

const stillAlt = "Proteen film still";

export const proteenDetail: ProjectDetail = {
  id: "proteen",
  headline: "Proteen",
  synopsis: [
    "Proteen sets out to address a growing waste crisis, leading to the discovery of black soldier fly farming as a way to convert organic waste into valuable resources. What begins as an experiment evolves into the creation of Proteen, a company built on the principles of circular economy, where waste becomes both fertilizer and animal feed.",
    "The film follows this early formation as it unfolds, capturing the uncertainty, trial, and conviction behind building a new model from the ground up. Through Proteen's emergence, it reveals how innovation can arise from observation of natural systems, and how one enterprise begins to redefine the relationship between waste, food, and economic opportunity.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Tommie Hooft" },
    { label: "Executive Producer", value: "Julian Oliver" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2023" },
    { label: "Country", value: "Uganda" },
    { label: "Language", value: "English" },
    { label: "Partners", value: "Marula Proteen Ltd" },
    { label: "Runtime", value: "20 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("proteen", stillAlt, ALL_STILL_INDICES),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/972957789",
    title: "Proteen — Trailer",
  },
};
