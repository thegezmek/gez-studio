import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt = "Kuzaya film still";

export const kuzayaDetail: ProjectDetail = {
  id: "kuzaya",
  headline: "Kuzaya",
  synopsis: ["Across East Africa, farmers, scientists, and agricultural innovators seek to restore soil fertility and reduce dependence on chemical inputs."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Vigilance Atieno" },
    { label: "Executive Producer", value: "Tommie Hooft" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2026" },
    { label: "Country", value: "Africa" },
    { label: "Language", value: "English, Swahili, Kinyarwanda" },
    { label: "Runtime", value: "60 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("kuzaya", stillAlt),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1170298182?h=86b5767828",
    title: "Kuzaya — Trailer",
  },
};
