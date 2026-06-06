import type { ProjectDetail } from "@/types/project-detail";
import { ALL_STILL_INDICES, makeStills } from "./helpers";

const stillAlt = "Worldview Seaweed film still";

export const worldviewSeaweedDetail: ProjectDetail = {
  id: "worldview-seaweed",
  headline: "Worldview Seaweed",
  synopsis: [
    "In coastal Thailand, seaweed cultivation is being explored as a way to strengthen livelihoods and respond to environmental change. Working in partnership with local communities, the Worldview Climate Foundation introduces new farming approaches that build on traditional knowledge while adapting to shifting ocean conditions.",
    "Worldview Seaweed follows this process as it unfolds, revealing how ocean cultivation can support economic resilience while contributing to wider ecological balance. The film offers a coastal perspective on food production, extending the collection's exploration of how natural systems continue to shape the future of sustenance.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Dr Arne Fjørtoft" },
    { label: "Executive Producer", value: "Julian Oliver" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2023" },
    { label: "Country", value: "Thailand" },
    { label: "Language", value: "English, Thai" },
    {
      label: "Partners",
      value: "Worldview International Foundation",
    },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("worldview-seaweed", stillAlt, ALL_STILL_INDICES),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/965374218",
    title: "Worldview Seaweed — Trailer",
  },
};
