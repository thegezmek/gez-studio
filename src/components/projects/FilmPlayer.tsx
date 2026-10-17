"use client";

import { useState } from "react";
import type { ProjectTrailerEmbed } from "@/types/project-detail";

function withAutoplay(url: string) {
  const embed = new URL(url);
  embed.searchParams.set("autoplay", "1");
  return embed.toString();
}

export function FilmPlayer({
  trailer,
  cover,
  label = "Watch the film",
}: {
  trailer?: ProjectTrailerEmbed;
  cover?: string;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && trailer) {
    return (
      <div className="film-page__player">
        {trailer.provider === "file" ? (
          <video src={trailer.embedUrl} title={trailer.title} controls autoPlay playsInline />
        ) : (
          <iframe
            src={withAutoplay(trailer.embedUrl)}
            title={trailer.title}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    );
  }

  return (
    <div className="film-page__player">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" width={1920} height={1080} fetchPriority="high" />
      ) : null}
      {trailer ? (
        <button
          type="button"
          className="film-page__play"
          data-interactive
          onClick={() => setPlaying(true)}
        >
          <span>{label}</span>
        </button>
      ) : null}
    </div>
  );
}
