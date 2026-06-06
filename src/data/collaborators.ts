export interface CollaboratorLogo {
  slug: string;
  name: string;
  src: string;
  url: string;
}

const allCollaborators: CollaboratorLogo[] = [
  {
    slug: "dynex",
    name: "Dynex",
    src: "/partners/dynex.png",
    url: "https://www.dynex.co/",
  },
  {
    slug: "impulse-ngo-network",
    name: "Impulse NGO Network",
    src: "/partners/impulse-ngo-network.png",
    url: "https://www.impulsengonetwork.org/",
  },
  {
    slug: "marula-proteen-limited",
    name: "Marula Proteen Ltd",
    src: "/partners/marula-proteen-limited.png",
    url: "https://weareproteen.com/",
  },
  {
    slug: "meta",
    name: "Meta",
    src: "/partners/meta.png",
    url: "https://about.meta.com/",
  },
  {
    slug: "rockefeller-foundation",
    name: "The Rockefeller Foundation",
    src: "/partners/rockefeller-foundation.png",
    url: "https://www.rockefellerfoundation.org/",
  },
  {
    slug: "world-bank",
    name: "The World Bank",
    src: "/partners/world-bank.png",
    url: "https://www.worldbank.org/",
  },
  {
    slug: "waterbear",
    name: "WaterBear",
    src: "/partners/waterbear.png",
    url: "https://www.waterbear.com/",
  },
  {
    slug: "worldview-international-foundation",
    name: "Worldview International Foundation",
    src: "/partners/worldview-international-foundation.png",
    url: "https://worldview.global/",
  },
  {
    slug: "stop",
    name: "Stop Ecocide International",
    src: "/partners/stop.png",
    url: "https://www.sei.org/",
  },
  {
    slug: "icipe",
    name: "icipe",
    src: "/partners/icipe.png",
    url: "https://www.icipe.org/",
  },
  {
    slug: "solid-africa",
    name: "Solid Africa",
    src: "/partners/solid-africa.png",
    url: "https://www.solidafrica.org/",
  },
  {
    slug: "vote",
    name: "V.O.T.E.",
    src: "/partners/vote.png",
    url: "https://voteearth.org/",
  },
  {
    slug: "regeneratex",
    name: "Regen Network",
    src: "/partners/regeneratex.png",
    url: "https://www.regeneratex.co/",
  },
  {
    slug: "leaders-on-purpose",
    name: "Leaders on Purpose",
    src: "/partners/leaders-on-purpose.png",
    url: "https://www.leadersonpurpose.com/",
  },
  {
    slug: "united-planet",
    name: "United Planet",
    src: "/partners/united-planet.png",
    url: "https://www.unitedplanet.org/",
  },
  {
    slug: "project-honeylight",
    name: "Project Honeylight",
    src: "/partners/project-honeylight.png",
    url: "https://projecthoneylight.life/",
  },
  {
    slug: "department-of-fisheries-thailand",
    name: "Department of Fisheries Thailand",
    src: "/partners/department-of-fisheries-thailand.png",
    url: "https://www4.fisheries.go.th/index.php/dof_en",
  },
  {
    slug: "daily-nation",
    name: "Daily Nation",
    src: "/partners/daily-nation.png",
    url: "https://www.nation.africa/",
  },
  {
    slug: "cgiar",
    name: "CGIAR",
    src: "/partners/cgiar.png",
    url: "https://www.cgiar.org/",
  },
  {
    slug: "star-fun",
    name: "star.",
    src: "/partners/star-fun.png",
    url: "https://star.fun/",
  },
  {
    slug: "biosorra",
    name: "Biosorra",
    src: "/partners/biosorra.png",
    url: "https://www.biosorra.com/",
  },
  {
    slug: "holland-greentech",
    name: "Holland Greentech",
    src: "/partners/holland-greentech.png",
    url: "https://www.hollandgreentech.com/",
  },
  {
    slug: "impulse-empower",
    name: "Impulse Empower",
    src: "/partners/impulse-empower.png",
    url: "https://www.impulsempower.com/",
  },
  {
    slug: "mugla-sitki-kocman-university",
    name: "Muğla Sıtkı Koçman University",
    src: "/partners/mugla-sitki-kocman-university.png",
    url: "https://www.mu.edu.tr/",
  },
  {
    slug: "istanbul-university-cerrahpasa",
    name: "Istanbul University-Cerrahpaşa",
    src: "/partners/istanbul-university-cerrahpasa.png",
    url: "https://www.iuc.edu.tr/en/",
  },
  {
    slug: "university-of-nairobi",
    name: "University of Nairobi",
    src: "/partners/university-of-nairobi.png",
    url: "https://www.uonbi.ac.ke/",
  },
  {
    slug: "turkiye-ari-yetistiricileri-merkez-birligi",
    name: "Türkiye Arı Yetiştiricileri Merkez Birliği",
    src: "/partners/turkiye-ari-yetistiricileri-merkez-birligi.png",
    url: "https://www.tab.org.tr/",
  },
];

export const featuredCollaboratorSlugs = [
  "meta",
  "impulse-ngo-network",
  "worldview-international-foundation",
  "rockefeller-foundation",
  "waterbear",
  "stop",
  "world-bank",
  "dynex",
  "solid-africa",
] as const;

const collaboratorBySlug = Object.fromEntries(
  allCollaborators.map((logo) => [logo.slug, logo]),
) as Record<string, CollaboratorLogo>;

export const featuredCollaborators = featuredCollaboratorSlugs.map(
  (slug) => collaboratorBySlug[slug],
);

const featuredSlugSet = new Set<string>(featuredCollaboratorSlugs);

export const collaborators = allCollaborators.filter(
  (logo) => !featuredSlugSet.has(logo.slug),
);
