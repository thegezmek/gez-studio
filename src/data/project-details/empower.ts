import type { ProjectDetail } from "@/types/project-detail";
import { ALL_STILL_INDICES, makeStills } from "./helpers";

const stillAlt = "Empower film still";

export const empowerDetail: ProjectDetail = {
  id: "empower",
  headline: "Empower",
  synopsis: [
    "In Northeast India, limited economic opportunity and the pressures of unsafe migration leave many women vulnerable to trafficking and exploitation. Through a community-led weaving initiative supported by Impulse NGO Network, they begin transforming traditional knowledge into a source of income, allowing them to support themselves without leaving home.",
    "Empower follows this process as it unfolds, revealing how financial independence becomes a form of protection. As livelihoods take shape within their own communities, the film observes how weaving offers more than income, it creates stability, agency, and a pathway that reduces the need to enter uncertain and dangerous migration routes.",
  ],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer", value: "Hasina Kharbhih" },
    { label: "Executive Producer", value: "Julian Oliver" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2021–2025" },
    { label: "Country", value: "India" },
    { label: "Language", value: "English, Hindi, Burmese" },
    { label: "Runtime", value: "20 mins" },
  ],
  stillsTitle: "Film Stills",
  stills: makeStills("empower", stillAlt, ALL_STILL_INDICES),
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1068557433",
    title: "Empower — Trailer",
  },
};
