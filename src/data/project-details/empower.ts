import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt = "Empower film still";

export const empowerDetail: ProjectDetail = {
  id: "empower",
  headline: "Empower",
  synopsis: ["An indigenous artisan collective across Northeast India weaves peace silk, fostering resilience against human trafficking and unsafe migration."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Hasina Kharbhih" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2025" },
    { label: "Country", value: "India" },
    { label: "Language", value: "English, Hindi, Burmese" },
    { label: "Runtime", value: "20 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("empower", stillAlt),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1068557433",
    title: "Empower — Trailer",
  },
};
