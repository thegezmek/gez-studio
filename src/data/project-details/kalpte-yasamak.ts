import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

export const kalpteYasamakDetail: ProjectDetail = {
  id: "kalpte-yasamak",
  eyebrow: "Kalpte Yaşamak",
  headline: "Living in the Heart",
  navTitle: "Living in the Heart",
  synopsis: ["A yogi and heart surgeon, wife and husband, co-author a book about what it means to live in the heart."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Semin Yalman Yılmaz" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2025" },
    { label: "Country", value: "Türkiye" },
    { label: "Runtime", value: "8 mins 42 secs" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("kalpte-yasamak", "Kalpte Yaşamak still", [], 12),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1070372582",
    title: "Kalpte Yaşamak: Living in the Heart",
  },
};
