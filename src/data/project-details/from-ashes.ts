import type { ProjectDetail } from "@/types/project-detail";

const stillAlt =
  "From Ashes Part I: Land of the Honey Bug film still";

export const fromAshesDetail: ProjectDetail = {
  id: "from-ashes",
  eyebrow: "From Ashes Part I:",
  headline: "Land of the Honey Bug",
  synopsis: ["After the fires, a beekeeper returns to a vanished forest and an ancient tradition facing an uncertain future."],
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
    { label: "Runtime", value: "73 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: Array.from({ length: 9 }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    return {
      src: `/projects/from-ashes-i/stills/new-${n}.png`,
      alt: `${stillAlt} ${index + 1}`,
      crop: [0, 1, 6, 7, 8].includes(index),
    };
  }),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1099954712?h=8103f5b26c",
    title: "From Ashes Part I: Land of the Honey Bug — Trailer",
  },
};
