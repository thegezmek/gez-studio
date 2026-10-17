import type { ProjectCredit, ProjectDetail, ProjectTrailerEmbed } from "@/types/project-detail";

function film(detail: {
  id: string;
  eyebrow: string;
  headline: string;
  synopsis?: string;
  credits?: ProjectCredit[];
  year?: string;
  country: string;
  runtime: string;
  trailer: ProjectTrailerEmbed;
}): ProjectDetail {
  return {
    id: detail.id,
    eyebrow: detail.eyebrow,
    headline: detail.headline,
    synopsis: detail.synopsis ? [detail.synopsis] : [],
    credits: [
      ...(detail.credits ?? []),
      { label: "Production Company", value: "Gez Studio" },
      ...(detail.year ? [{ label: "Year", value: detail.year }] : []),
      { label: "Country", value: detail.country },
      { label: "Runtime", value: detail.runtime },
    ],
    stills: [],
    trailer: detail.trailer,
  };
}

function vimeo(id: string, title: string, hash?: string): ProjectTrailerEmbed {
  const embedUrl = hash
    ? `https://player.vimeo.com/video/${id}?h=${hash}`
    : `https://player.vimeo.com/video/${id}`;
  return { provider: "vimeo", embedUrl, title };
}

function file(src: string, title: string): ProjectTrailerEmbed {
  return { provider: "file", embedUrl: src, title };
}

export const catalogueDetails: ProjectDetail[] = [
  film({
    id: "mark-rubin",
    eyebrow: "Biopic",
    headline: "Mark Rubin",
    synopsis: "From childhood observations of energy and motion, Mark Rubin develops a new way of seeing the world, transforming patterns in his mind into models.",
    year: "2025",
    country: "USA",
    runtime: "3 mins",
    trailer: vimeo("1127353208", "Mark Rubin", "bf2d7351eb"),
  }),
  film({
    id: "entrepreneurs-of-the-northeast",
    eyebrow: "Documentary",
    headline: "Entrepreneurs of the Northeast",
    credits: [
      { label: "Director–Editor–Producer", value: "Lewis Levent" },
      { label: "Partners", value: "Impulse NGO Network" },
    ],
    synopsis: "A behind-the-scenes documentary following filmmaker Lewis Levent's journey through eight states of Northeast India and North Bengal to capture the stories of 17 entrepreneurs.",
    year: "2023",
    country: "India",
    runtime: "3 mins",
    trailer: vimeo("1039352776", "Entrepreneurs of the Northeast"),
  }),
  film({
    id: "ecocide-law",
    eyebrow: "Documentary",
    headline: "Ecocide Law",
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "With", value: "Jojo Mehta" },
      { label: "Partners", value: "Stop Ecocide International" },
    ],
    synopsis: "With ecocide absent from the Rome Statute, Stop Ecocide International campaigns to make the destruction of nature an international crime. Not to punish, but to protect.",
    year: "2026",
    country: "United Kingdom",
    runtime: "5 mins",
    trailer: vimeo("1216857369", "Ecocide Law", "a076eaec7f"),
  }),
  film({
    id: "time-ritual",
    eyebrow: "Documentary",
    headline: "Time Ritual",
    credits: [
      { label: "Co-director–Editor", value: "Lewis Levent" },
      { label: "Co-director & Producer", value: "Lucian Tarnowski" },
      { label: "Partners", value: "United Planet, Damanhur Spiritual Community" },
    ],
    synopsis: "In Damanhur, Italy, home to the Temples of Humankind, one of the world's largest underground temple complexes, participants enter a six-day immersive game set in the future.",
    year: "2021",
    country: "Italy",
    runtime: "2 mins",
    trailer: vimeo("762098856", "Time Ritual"),
  }),
  film({
    id: "nanu",
    eyebrow: "Commercial",
    headline: "Nanu",
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Nazmiye Sabuncuoğlu Arslantürk" },
      { label: "Colorist", value: "Selçuk Demirci" },
    ],
    synopsis: "Jacline's journey of becoming a mother, preparing the dream room to raise her first child.",
    year: "2026",
    country: "Türkiye",
    runtime: "2 mins",
    trailer: vimeo("1225282841", "Nanu", "1594f32ac8"),
  }),
  film({
    id: "meshk",
    eyebrow: "Commercial",
    headline: "Meshk",
    year: "2021",
    country: "Türkiye",
    runtime: "2 mins",
    trailer: file("/projects/meshk.mp4", "Meshk"),
  }),
  film({
    id: "dynex-apollo",
    eyebrow: "Branded Film",
    headline: "Apollo: Quantum Chip",
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Daniela Herrmann" },
      { label: "Generative AI Artist", value: "Selçuk Demirci" },
      { label: "Animator", value: "Ezgi Lemur" },
    ],
    synopsis: "Meet Apollo, the world's first quantum-driven neuromorphic computing chip, operating at room temperature and designed to activate a multi-trillion-dollar quantum economy.",
    year: "2025",
    country: "Switzerland",
    runtime: "3 mins",
    trailer: vimeo("1139632833", "Apollo: Quantum Chip"),
  }),
  film({
    id: "the-vision-walk",
    eyebrow: "Biopic",
    headline: "The Vision Walk",
    credits: [
      { label: "Director–Editor", value: "Lewis Levent" },
      { label: "Producer", value: "Benjamin Butler" },
    ],
    year: "2024",
    country: "United Kingdom, Türkiye",
    runtime: "3 mins",
    trailer: vimeo("939651526", "The Vision Walk", "12c282453e"),
  }),
  film({
    id: "united-planet",
    eyebrow: "Branded Film",
    headline: "United Planet",
    synopsis: "The United Planet (UP) Game, where leaders step beyond linear time and experience futures in which our boldest visions are already accomplished.",
    year: "2022",
    country: "Spain",
    runtime: "2 mins",
    trailer: vimeo("1236375434", "United Planet", "4c70f68277"),
  }),
  film({
    id: "clara-hygienics",
    eyebrow: "Commercial",
    headline: "Clara Hygienics: Rosemary Touch",
    year: "2024",
    country: "Türkiye",
    runtime: "1 min",
    trailer: file("/projects/clara-hygienics.mp4", "Clara Hygienics: Rosemary Touch"),
  }),
  film({
    id: "cosmogenesis-universe",
    eyebrow: "Commercial",
    headline: "Cosmogenesis Labs: The Universe is You",
    year: "2024",
    country: "Türkiye",
    runtime: "1 min",
    trailer: file("/projects/cosmogenesis-universe.mp4", "Cosmogenesis Labs: The Universe is You"),
  }),
  film({
    id: "conscious-technology",
    eyebrow: "Event",
    headline: "Conscious Technology",
    year: "2024",
    country: "Spain",
    runtime: "6 mins",
    trailer: vimeo("968723255", "Conscious Technology", "fcf591f560"),
  }),
  film({
    id: "world-bank-icha",
    eyebrow: "Event",
    headline: "World Bank ICHA",
    synopsis: "The World Bank's International Corruption Hunters Alliance (ICHA) 2023 Forum in Abidjan, co-hosted by the Government of Côte d'Ivoire.",
    year: "2023",
    country: "Côte d'Ivoire",
    runtime: "7 mins",
    trailer: vimeo("838980654", "World Bank ICHA"),
  }),
  film({
    id: "nyc-climate-week",
    eyebrow: "Event",
    headline: "NYC Climate Week",
    synopsis: "At New York Climate Week, African business leaders and global partners come together to talk about investment in the continent's future.",
    year: "2022",
    country: "USA",
    runtime: "5 mins",
    trailer: vimeo("758976892", "NYC Climate Week"),
  }),
  film({
    id: "adamlar",
    eyebrow: "Music Video",
    headline: "Adamlar",
    year: "2019",
    country: "Türkiye",
    runtime: "5 mins",
    trailer: file("/projects/adamlar.mp4", "Adamlar"),
  }),
];
