export const site = {
  name: "gez.studio",
  legalName: "GEZ.STUDIO",
  company: {
    name: "Gez Studio Ltd",
    number: "13193161",
    address: "128 City Rd, London EC1V 2NX, United Kingdom",
  },
  pageTitle: "GEZ.STUDIO | Film production",
  metaDescription:
    "We tell stories through the lens of documentary realism, producing feature-length and short films for cinema, television and digital platforms. Curious by nature, we’re often on the road, capturing stories from across the world. Established in London, based in Barcelona.",
  description:
    "We tell stories through the lens of documentary realism, producing feature-length and short films for cinema, television and digital platforms. Curious by nature, we’re often on the road, capturing stories from across the world. Established in London, based in Barcelona.",
  studio: {
    title: "GEZ.STUDIO",
    founder: {
      label: "Founder",
      paragraphs: [
        "Founded by British–Turkish filmmaker Lewis Levent, Gez Studio emerged from years spent documenting communities navigating environmental and social transformation.",
        "From wildfire-affected villages in Türkiye to refugee settlements in the Eastern Himalayas and regenerative farming initiatives across Africa, the studio's work is grounded in long-term engagement with the people and places it documents.",
      ],
    },
    team: {
      label: "Team",
    },
    production: {
      label: "What We Create",
      items: [
        "Documentary",
        "Biopic",
        "Commercial",
        "Branded film",
        "Event",
        "Music video",
      ],
    },
    collaborators: {
      label: "Selected Collaborators",
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
    intro:
      "Whether it's a film, a collaboration, or just a conversation, we'd love to hear from you.",
    email: "hi@gez.studio",
    locations: [
      {
        city: "London",
        timezone: "Europe/London",
        address: "128 City Road, EC1V 2NX, United Kingdom",
      },
      {
        city: "Barcelona",
        timezone: "Europe/Madrid",
        address: "Passatge de Cantí, 11, 3-2, 08005, Barcelona, Spain",
      },
    ],
  },
} as const;

export const team = [
  {
    name: "Lewis Levent",
    role: "Founder & Filmmaker",
    photo: "/team/lewis-levent-headshot.jpg",
    url: "https://lewislevent.com/",
  },
  {
    name: "Selçuk Demirci",
    role: "Creative Producer / Filmmaker",
    photo: "/team/selcuk-demirci.jpg",
    url: "https://selchukdemirci.online/",
  },
  {
    name: "İlkay Bilgiç",
    role: "Producer",
    photo: "/team/ilkay-bilgic-bw.jpg",
    url: "https://www.instagram.com/ilkay.bilgic/",
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
    photo: "/team/ezgi-lemur-headshot.png",
    url: "https://www.instagram.com/ezgi.lemur/",
  },
  {
    name: "İlker Yurtcan",
    role: "Music Composer",
    photo: "/team/ilker-yurtcan.png",
    url: "https://www.instagram.com/ilkeryurtcanmusic",
  },
] as const;
