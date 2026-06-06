"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/types/project";
import { atmosphereFrameStyle, getProjectAtmosphere } from "@/data/project-atmospheres";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

interface HomeV2HeroProps {
  project: Project;
  header?: React.ReactNode;
  showCopy?: boolean;
  trackFilm?: boolean;
}

function yearFromProject(project: Project) {
  if (project.year) return project.year;
  const match = project.sourceDate?.match(/\d{4}/);
  return match?.[0] ?? null;
}

export function HomeV2Hero({
  project,
  header,
  showCopy = true,
  trackFilm = true,
}: HomeV2HeroProps) {
  const reduceMotion = usePrefersReducedMotion();
  const year = yearFromProject(project);
  const meta = [year, project.country].filter(Boolean).join(" · ");
  const cursorMeta = [meta, project.runtime?.toLocaleUpperCase("en-US")]
    .filter(Boolean)
    .join(" · ");
  const atmosphere = getProjectAtmosphere(project.id);

  const href = project.href ?? `/projects/${project.id}`;

  const media = (
    <div
      className="home-v2-hero__media"
      style={atmosphereFrameStyle(project.id) as React.CSSProperties}
    >
      <HeroMedia project={project} reduceMotion={reduceMotion} />
      {showCopy ? <div className="home-v2-hero__scrim" aria-hidden /> : null}
    </div>
  );

  const copy = showCopy ? (
    <div className="home-v2-hero__copy">
      {meta ? <p className="home-v2-hero__meta">{meta}</p> : null}
      <h1 className="home-v2-hero__title">{project.title}</h1>
      {project.subtitle ? (
        <p className="home-v2-hero__subtitle">{project.subtitle}</p>
      ) : null}
      <p className="film-frame__line">{project.description}</p>
      {project.formatLabel ? (
        <p className="film-frame__format">
          {project.formatLabel.toLocaleUpperCase("en-US")}
        </p>
      ) : null}
      {project.runtime ? (
        <p className="film-frame__runtime">
          {project.runtime.toLocaleUpperCase("en-US")}
        </p>
      ) : null}
      <span className="home-v2-hero__cta">View film</span>
    </div>
  ) : null;

  return (
    <section
      className={`home-v2-hero${showCopy ? "" : " home-v2-hero--media-only"}`}
      aria-label={
        showCopy
          ? `Featured film: ${project.title}`
          : "Studio cover"
      }
    >
      <div className="home-v2-hero__frame">
        {header}
        {showCopy ? (
          <Link
            href={href}
            className="home-v2-hero__link"
            {...(trackFilm ? { "data-film-id": project.id } : {})}
            data-interactive
            data-cursor-mode="frame"
            data-cursor-title={project.title}
            data-cursor-meta={cursorMeta || undefined}
            data-cursor-country={project.country}
            data-cursor-aspect="2.39/1"
            data-cursor-tint={atmosphere.tint}
            aria-label={`View ${project.title}${project.subtitle ? `: ${project.subtitle}` : ""}`}
          >
            {media}
            {copy}
          </Link>
        ) : (
          <div className="home-v2-hero__surface" aria-hidden>
            {media}
          </div>
        )}
      </div>

      <p className="home-v2-hero__scroll-hint" aria-hidden>
        Scroll
      </p>
    </section>
  );
}

function HeroMedia({
  project,
  reduceMotion,
}: {
  project: Project;
  reduceMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const { media } = project;
  const poster =
    media.poster ?? (media.type === "image" ? media.src : undefined);

  const markVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  const tryPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el || media.type !== "video" || reduceMotion) return;
    void el.play().then(markVideoReady).catch(() => undefined);
  }, [markVideoReady, media.type, reduceMotion]);

  useEffect(() => {
    setVideoReady(false);
  }, [media.src]);

  useEffect(() => {
    tryPlay();
  }, [media.src, tryPlay]);

  if (media.type === "video" && media.src) {
    return (
      <>
        {poster ? (
          // Local poster — plain img avoids stale Next/Image optimizer cache on swaps
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className={`home-v2-hero__still${videoReady ? " home-v2-hero__still--hidden" : ""}`}
            decoding="async"
            fetchPriority="high"
            aria-hidden
          />
        ) : null}
        {!reduceMotion ? (
          <video
            ref={videoRef}
            className={`home-v2-hero__video${videoReady ? " home-v2-hero__video--visible" : ""}`}
            src={media.src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onCanPlay={tryPlay}
            onLoadedData={markVideoReady}
            onPlaying={markVideoReady}
            aria-hidden
          />
        ) : null}
      </>
    );
  }

  if (media.src.startsWith("/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={media.alt}
        className="home-v2-hero__still"
        loading="eager"
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      className="home-v2-hero__still object-cover"
      sizes="100vw"
      priority
    />
  );
}
