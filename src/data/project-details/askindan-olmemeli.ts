import type { ProjectDetail } from "@/types/project-detail";
import { makeStills } from "./helpers";

export const askindanOlmemeliDetail: ProjectDetail = {
  id: "askindan-olmemeli",
  eyebrow: "Music Video",
  headline: "Aşkından Ölmemelİ",
  synopsis: ["Sena Şener brings retro pop and soul into the cinematic world of Yeşilçam, stepping into a 1970s Istanbul jazz bar where past and present live side by side."],
  credits: [
    { label: "Director–Editor", value: "Selçuk Demirci" },
    { label: "Artist", value: "Sena Şener" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2026" },
    { label: "Country", value: "Türkiye" },
    { label: "Runtime", value: "4 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("askindan-olmemeli", "Aşkından Ölmemeli still", [], 12),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1214067881?h=8bc34101ff",
    title: "Aşkından Ölmemelİ",
  },
};
