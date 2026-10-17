import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt =
  "From Ashes Part II: The Mountainside of Ormana film still";

export const fromAshesIiDetail: ProjectDetail = {
  id: "from-ashes-ii",
  eyebrow: "From Ashes Part II:",
  headline: "The Mountainside of Ormana",
  synopsis: ["As wildfire approaches Ormana, a mountain community draws on its knowledge of the forest to protect their 800-year-old village."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    {
      label: "Producers",
      value: "Lewis Levent, İlkay Bilgiç, Canay Atalay",
    },
    { label: "Executive Producer", value: "Julian Oliver" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2021–2026" },
    { label: "Country", value: "Türkiye" },
    { label: "Language", value: "Turkish, English" },
    { label: "Runtime", value: "55 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("from-ashes-ii", stillAlt, [0, 1, 2]),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1101667778?h=9933555489",
    title: "From Ashes Part II: The Mountainside of Ormana — Trailer",
  },
};
