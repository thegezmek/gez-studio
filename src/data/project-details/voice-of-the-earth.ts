import type { ProjectDetail } from "@/types/project-detail";

export const voiceOfTheEarthDetail: ProjectDetail = {
  id: "voice-of-the-earth",
  headline: "Voice of the Earth",
  synopsis: ["Raine Piyãko of the Ashaninka tribe brings the sacred music of the Amazon together with a symphonic orchestral ensemble from Hungary."],
  credits: [
    { label: "Director–Editor", value: "Lewis Levent" },
    { label: "Producer–Composer", value: "Ryan Whitewolf" },
    { label: "Artist", value: "Raine Piyãko" },
    { label: "Production Company", value: "Gez Studio" },
    { label: "Year", value: "2024" },
    { label: "Country", value: "Amazon" },
    { label: "Runtime", value: "3 mins 50 secs" },
  ],
  stills: [],
  trailer: {
    provider: "vimeo",
    embedUrl: "https://player.vimeo.com/video/1034632699",
    title: "Voice of the Earth",
  },
  musicVideos: [
    {
      title: "Kamine Nana",
      runtime: "5 mins 37 secs",
      cover: "/projects/voice-of-the-earth-kamine-nana-poster.jpg?v=2",
      video: {
        provider: "vimeo",
        embedUrl: "https://player.vimeo.com/video/1079899991",
        title: "Kamine Nana",
      },
    },
    {
      title: "Nana",
      runtime: "7 mins 6 secs",
      cover: "/projects/voice-of-the-earth-nana-poster.jpg?v=2",
      video: {
        provider: "vimeo",
        embedUrl: "https://player.vimeo.com/video/1108895359?h=7235adde5b",
        title: "Nana",
      },
    },
  ],
};
