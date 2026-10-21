import type { ProjectDetail } from "@/types/project-detail";

const stillAlt = "Nothing Disappears still";

export const nothingDisappearsDetail: ProjectDetail = {
  id: "nothing-disappears",
  headline: "Nothing Disappears",
  synopsis: [
    "Across La Garrotxa in Catalonia, you'll find a forest no one planted, a chapel in a crater, and a town built out of the cliff it stands on. It was all molten once.",
  ],
  credits: [
    { label: "Director–Editor", value: "Selçuk Demirci" },
    { label: "Director of Photography", value: "Lewis Levent" },
    { label: "With", value: "Deniz Balkanlı" },
    { label: "Production Support", value: "José Villanueva Guadalupe Martínez" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2026–" },
    { label: "Country", value: "Spain" },
    { label: "Language", value: "English, Catalan, Spanish" },
    { label: "Runtime", value: "TBC" },
    {
      label: "Locations",
      value:
        "La Fageda d'en Jordà, Santa Margarida, Castellfollit de la Roca",
    },
  ],
  stills: Array.from({ length: 37 }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    return {
      src: `/projects/nothing-disappears/frames/frame-${n}.jpg`,
      alt: `${stillAlt} ${index + 1}`,
      crop: false,
    };
  }),
};
