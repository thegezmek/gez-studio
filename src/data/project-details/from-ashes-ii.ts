import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt =
  "From Ashes Part II: The Mountainside of Ormana film still";

export const fromAshesIiDetail: ProjectDetail = {
  id: "from-ashes-ii",
  eyebrow: "From Ashes Part II:",
  headline: "The Mountainside of Ormana",
  synopsis: [
    "As wildfires spread across Türkiye's Mediterranean region in the summer of 2021, the Manavgat fire advanced toward the mountain village of Ormana, placing it directly in its path.",
    "Cut off from immediate support, residents were forced to make their own decisions as flames moved through the surrounding forests, drawing on local knowledge, instinct, and a deep familiarity with their landscape to protect their homes.",
    "Their experience becomes an account of what it means to face wildfire at the moment of impact, revealing both the limits of institutional response and the critical role of community action in the absence of it.",
    "Through their story, the film examines how fire is altering the conditions of life in fire-prone regions, and what adaptation demands of those living on the frontlines of a rapidly changing climate.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    {
      label: "Producers",
      value: "Lewis Levent, İlkay Bilgiç, Canay Atalay",
    },
    { label: "Executive Producer", value: "Julian Oliver" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2021–2025" },
    { label: "Country", value: "Türkiye" },
    { label: "Language", value: "Turkish, English" },
    { label: "Runtime", value: "55 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("from-ashes-ii", stillAlt, [3, 4, 5, 6, 7, 8]),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1101667778?h=9933555489",
    title: "From Ashes Part II: The Mountainside of Ormana — Trailer",
  },
};
