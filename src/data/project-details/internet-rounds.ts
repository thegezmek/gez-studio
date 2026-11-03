import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

export const internetRoundsDetail: ProjectDetail = {
  id: "internet-rounds",
  eyebrow: "Commercial",
  headline: "Internet Rounds",
  synopsis: ["star.fun announces Internet Rounds: the fastest and loudest way to raise money on the internet. Presented by co-founder Adam Bergeman, with his Mum and dog."],
  credits: [
    { label: "Director", value: "Selçuk Demirci, Lewis Levent" },
    { label: "Cinematography", value: "Lewis Levent" },
    { label: "Producer", value: "Adam Bergeman" },
    { label: "Motion Design", value: "Douglas Fullerton" },
    { label: "Partners", value: "Star.Fun" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2026" },
    { label: "Country", value: "Spain" },
    { label: "Runtime", value: "1 min" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("internet-rounds", "Internet Rounds still", [], 12),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1235907270?h=fbbc63c05b",
    title: "Internet Rounds",
  },
};
