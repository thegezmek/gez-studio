export const site = {
  name: "gez.studio",
  legalName: "GEZ.STUDIO",
  logos: {
    icon: "/branding/gez-icon.svg",
    horizontalWhite: "/branding/horizontal-white-gez-logo.svg",
  },
  tagline: "the wandering doc studio",
  headline: "THE WANDERING DOC STUDIO",
  pageTitle: "GEZ.STUDIO | The Wandering Doc Studio",
  metaDescription:
    "A production company creating feature documentaries, branded films and short-form storytelling for global audiences.",
  description:
    "Gez Studio is a nomadic documentary studio creating cinematic stories across culture, environment, and social change.",
  mission: "Amplifying bold solutions for our changing planet.",
  featureFilms: {
    title: "Feature Films",
    lead:
      "Documentary productions for cinema, television and digital platforms, spanning original and commissioned projects.",
  },
  brandedShorts: {
    title: "Short Films",
    description:
      "Short-form documentary, branded and music films for festivals, digital platforms and commissioned partners.",
  },
  brandedShortCategories: {
    dynex: {
      title: "Branded Film",
      description:
        "Commissioned films for organisations and innovators — cinematic storytelling shaped around brand purpose, product launches, and ideas that need room to breathe on screen.",
    },
    "kalpte-yasamak": {
      title: "Short Films",
      description:
        "Compact documentary portraits and shorter-form work — intimate stories told with the same cinematic attention, distilled into a tighter frame.",
    },
    "voice-of-the-earth": {
      title: "Music Video",
      description:
        "Music-driven visual work that merges performance, place, and narrative — expanding documentary form through sound, rhythm, and collaboration with artists and communities.",
    },
  },
  studio: {
    title: "GEZ.STUDIO",
    intro: [
      "Gez Studio is an independent documentary film studio producing original and commissioned films across cinema, television and digital platforms.",
      "Working internationally, we develop stories at the intersection of culture, environment and social change, combining field research with cinematic storytelling.",
    ],
    founder: {
      label: "Founder",
      paragraphs: [
        "Founded by British–Turkish filmmaker Lewis Levent, Gez Studio emerged from years spent documenting communities navigating environmental and social transformation.",
        "From wildfire-affected villages in Türkiye to refugee settlements in the Eastern Himalayas and regenerative farming initiatives across Africa, the studio's work is grounded in long-term engagement with the people and places it documents.",
      ],
    },
    team: {
      label: "Team",
      description:
        "A multidisciplinary team of filmmakers, designers and storytellers working between the UK and Türkiye.",
    },
    production: {
      label: "What We Create",
      items: [
        "Feature documentaries",
        "Documentary series",
        "Branded films",
        "Music videos",
      ],
    },
    collaborators: {
      label: "Selected Collaborators",
      description:
        "We've collaborated with broadcasters, NGOs, foundations, brands and production partners working across social and environmental impact.",
    },
  },
  url: "https://gez.studio",
  social: {
    instagram: "https://www.instagram.com/gez.studio/",
    vimeo: "https://vimeo.com/gezstudio",
    linkedin:
      "https://www.linkedin.com/company/gezstudio/posts/?feedView=all",
  },
  contact: {
    heading: "Collaborations and distribution:",
    email: "hi@gez.studio",
    locations: [
      {
        city: "London",
        timezone: "Europe/London",
        address: "128 City Road, EC1V 2NX, United Kingdom",
      },
      {
        city: "İstanbul",
        timezone: "Europe/Istanbul",
        address: "Kuzguncuk, Simitçi Tahir, 32, 34764, Türkiye",
      },
      {
        city: "Barcelona",
        timezone: "Europe/Madrid",
      },
    ],
  },
} as const;

export const team = [
  {
    name: "Lewis Levent",
    role: "Founder & Filmmaker",
    photo: "/team/lewis-levent.jpg",
    url: "https://lewislevent.com/",
  },
  {
    name: "Selçuk Demirci",
    role: "Creative Producer",
    photo: "/team/selcuk-demirci.jpg",
    url: "https://selchukdemirci.online/",
  },
  {
    name: "Anthony Croft",
    role: "Sound Post-Production",
    photo: "/team/anthony-croft.jpg",
    url: "https://www.instagram.com/resonancesound_uk/",
  },
  {
    name: "Ezgi Lemur",
    role: "Motion Designer & Animator",
    photo: "/team/ezgi-lemur.jpg",
    url: "https://www.instagram.com/ezgi.lemur/",
  },
  {
    name: "İlker Yurtcan",
    role: "Music Composer",
    photo: "/team/ilker-yurtcan.png",
    url: "https://www.instagram.com/ilkeryurtcanmusic",
  },
] as const;
