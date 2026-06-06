import type { ProjectDetail } from "@/types/project-detail";

const stillAlt =
  "From Ashes Part I: Land of the Honey Bug film still";

export const fromAshesDetail: ProjectDetail = {
  id: "from-ashes",
  eyebrow: "From Ashes Part I:",
  headline: "Land of the Honey Bug",
  synopsis: [
    "Two months after the 2021 wildfires, Hüseyin, an elderly beekeeper, walks through his village in Muğla, where his home and the surrounding pine forests that sustained an ancient beekeeping tradition have been reduced to ash.",
    "His return becomes an entry point into a community reckoning with what has been lost, as pine honey producers search for continuity in a landscape that no longer functions as it once did.",
    "What now defines the future of their age-old practice is what locals call the honey bug, a small forest insect found almost nowhere else on Earth, upon which the entire pine honey system depends.",
    "As beekeepers confront the fragility of this relationship, their story opens onto a wider reality, revealing how human actions, ecological imbalance, and a warming climate are reshaping the forests they depend on, and the future of a tradition that hangs in the balance.",
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
    { label: "Runtime", value: "73 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: Array.from({ length: 9 }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    return {
      src: `/projects/from-ashes-i/stills/new-${n}.png`,
      alt: `${stillAlt} ${index + 1}`,
      letterbox: index >= 2 && index <= 5,
    };
  }),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1099954712?h=8103f5b26c",
    title: "From Ashes Part I: Land of the Honey Bug — Trailer",
  },
};
