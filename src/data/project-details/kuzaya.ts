import type { ProjectDetail } from "@/types/project-detail";
import { ALL_STILL_INDICES, makeStills } from "./helpers";

const stillAlt = "Kuzaya film still";

export const kuzayaDetail: ProjectDetail = {
  id: "kuzaya",
  headline: "Kuzaya",
  synopsis: [
    "In Kenya, declining soil health has left farmers increasingly dependent on costly inputs while yields continue to fall. In response, a range of actors, from farmers and scientists to agricultural enterprises and policymakers, are turning back toward natural processes that restore fertility through the living systems within the soil.",
    "Kuzaya follows the implementation of these approaches as they take hold across farms and institutions, revealing how industry and policy are beginning to support a return to biological balance. As the land starts to recover, the film observes what it takes to rebuild economic stability at its source, and the wider implications for the future of food.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Vigilance Atieno" },
    {
      label: "Executive Producers",
      value: "Tommie Hooft, Julian Oliver",
    },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2026" },
    { label: "Country", value: "Africa" },
    { label: "Language", value: "English, Swahili, Kinyarwanda" },
    { label: "Runtime", value: "60 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("kuzaya", stillAlt, ALL_STILL_INDICES),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1170298182?h=86b5767828",
    title: "Kuzaya — Trailer",
  },
};
