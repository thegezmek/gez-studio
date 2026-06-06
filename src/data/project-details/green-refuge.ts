import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

const stillAlt = "Green Refuge film still";

export const greenRefugeDetail: ProjectDetail = {
  id: "green-refuge",
  headline: "Green Refuge",
  synopsis: [
    "As Zo communities flee violence across the Myanmar border into Northeast India, they arrive without formal recognition as refugees, leaving them in a state of legal and economic vulnerability, dependent on the Indigenous ethnic groups who receive them. With limited access to land, income, or protection, both displaced and host communities face growing pressure to sustain themselves.",
    "Through a community-led agroforestry initiative, they begin cultivating food and restoring degraded land together, creating a shared economic foundation that strengthens stability on both sides.",
    "Green Refuge follows this fragile collaboration as it takes root, revealing how rebuilding livelihood in place can reduce the need for unsafe migration, and how refuge is shaped not only by those who arrive, but by those who choose to receive them.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Hasina Kharbhih" },
    { label: "Executive Producer", value: "Julian Oliver" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2021–2025" },
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
