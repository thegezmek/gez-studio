import type { ProjectDetail } from "@/types/project-detail";
import { ALL_STILL_INDICES, makeStills } from "./helpers";

const stillAlt = "Bon Aime film still";

export const bonAimeDetail: ProjectDetail = {
  id: "bon-aime",
  headline: "Bon Aime",
  synopsis: [
    "An Amsterdam-based DJ and producer arrives in Kampala and steps into unfamiliar rooms, where jam sessions with a hip-hop collective and a youth studio unfold without rehearsal or expectation. In these first encounters, music emerges instinctively, shaped by presence, rhythm, and the shared act of listening. What begins as improvisation becomes a point of departure, leaving an imprint that lingers beyond the moment itself.",
    "Bon Aime follows this deepening creative journey as Adam returns to Amsterdam, carrying with him the atmosphere of those sessions. Working in solitude, he begins to merge his electronic language with the feeling of having been there, translating memory, connection, and place into sound. The film reveals the fragile and often unseen process through which music is formed, tracing how creation moves between encounter and reflection, and how a record becomes a vessel for experience.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Adam Shpilt" },
    { label: "Executive Producer", value: "Julian Oliver" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2023–2024" },
    { label: "Country", value: "Uganda, Netherlands" },
    { label: "Language", value: "English, Lugandan" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("bon-aime", stillAlt, ALL_STILL_INDICES),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1171295662?h=9de8571bf5",
    title: "Bon Aime — Trailer",
  },
};
