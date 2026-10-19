import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt = "Green Refuge film still";

export const greenRefugeDetail: ProjectDetail = {
  id: "green-refuge",
  headline: "Green Refuge",
  synopsis: ["On the Indo-Myanmar border, displaced Zo communities and their Indigenous hosts rebuild livelihoods together through agroforestry."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Hasina Kharbhih" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2026" },
    { label: "Country", value: "India, Myanmar" },
    { label: "Language", value: "English, Burmese, Mizo, Manipuri" },
    { label: "Runtime", value: "60 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("green-refuge", stillAlt),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1169157132?h=584ddef2c5",
    title: "Green Refuge — Trailer",
  },
};
