import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt = "Worldview Seaweed film still";

export const worldviewSeaweedDetail: ProjectDetail = {
  id: "worldview-seaweed",
  headline: "Worldview Seaweed",
  synopsis: ["A story of seaweed, sustainability, and CO₂ mitigation through a collaborative pilot uniting public and private sectors with Thai coastal communities."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Dr Arne Fjørtoft" },
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
  stills: makeStills("worldview-seaweed", stillAlt, [0]),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/965374218",
    title: "Worldview Seaweed — Trailer",
  },
};
