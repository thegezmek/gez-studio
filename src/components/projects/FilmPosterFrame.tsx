"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/types/project";
import { atmosphereFrameStyle } from "@/data/project-atmospheres";
import { aspectForLayout } from "@/lib/cursor-context";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

interface FilmPosterFrameProps {
  project: Project;
  index: number;
  compact?: boolean;
  brandedStack?: boolean;
  hideCopy?: boolean;
  /** Short-film cards: title and meta only */
  minimalCopy?: boolean;
  isLast?: boolean;
  isActive: boolean;
  /** Footer showcase: play GIF/video even when cell is not hovered */
  alwaysPlayMedia?: boolean;
  onVisibility?: (projectId: string, ratio: number) => void;
}

function yearFromProject(project: Project) {
  if (project.year) return project.year;
  const match = project.sourceDate?.match(/\d{4}/);
  return match?.[0] ?? null;
}

export function FilmPosterFrame({
  project,
  index,
  compact = false,
  brandedStack = false,
  hideCopy = false,
  minimalCopy = false,
  isLast = false,
  isActive,
  alwaysPlayMedia = false,
  onVisibility,
}: FilmPosterFrameProps) {
  const rootRef = useRef<HTMLElement>(null);
  const { media } = project;
  const isGif = media.type === "gif";
  const [inView, setInView] = useState(index === 0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (brandedStack) return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
        onVisibility?.(project.id, ratio);
        setInView(ratio >= 0.12);
      },
      {
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        rootMargin: "-18% 0px -22% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onVisibility, project.id, brandedStack]);

  const shouldPlayGif =
    isGif && !reduceMotion && (isActive || inView || alwaysPlayMedia);
  const shouldPlayVideo =
    media.type === "video" &&
    !reduceMotion &&
    (isActive || inView || alwaysPlayMedia);

  const year = yearFromProject(project);
  const meta = [year, project.country].filter(Boolean).join(" · ");
  const cursorMeta = [
    meta,
    project.runtime?.toLocaleUpperCase("en-US"),
    project.formatLabel,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      ref={rootRef}
      className={`film-frame${compact ? " film-frame--compact" : ""}${brandedStack ? " film-frame--branded-stack" : ""}${isLast ? " film-frame--last" : ""}`}
      data-film-id={project.id}
      data-film-index={index}
      data-active={isActive || undefined}
      data-in-view={inView || undefined}
      style={
        {
          "--film-index": index,
          ...atmosphereFrameStyle(project.id),
        } as React.CSSProperties
      }
    >
      <Link
        href={project.href ?? `/projects/${project.id}`}
        className="film-frame__link"
        data-interactive
        data-cursor-mode="frame"
        data-cursor-title={project.title}
        data-cursor-meta={cursorMeta || undefined}
        data-cursor-country={project.country}
        data-cursor-aspect={aspectForLayout(project.layout)}
        aria-label={`${project.title}${meta ? `, ${meta}` : ""}`}
      >
        <div className="film-frame__media">
          <FilmMedia
            project={project}
            priority={index < 1}
            shouldPlayGif={shouldPlayGif}
            shouldPlayVideo={shouldPlayVideo}
          />
        </div>

        <div className="film-frame__atmosphere" aria-hidden />
        <div className="film-frame__scrim" aria-hidden />

        {!hideCopy ? (
          <div className="film-frame__copy">
            {meta ? <p className="film-frame__meta">{meta}</p> : null}
            <h2 className="film-frame__title">{project.title}</h2>
            {!minimalCopy && project.subtitle ? (
              <p className="film-frame__subtitle">{project.subtitle}</p>
            ) : null}
            {!minimalCopy ? (
              <p className="film-frame__line">{project.description}</p>
            ) : null}
            {!minimalCopy && project.formatLabel ? (
              <p className="film-frame__format">
                {project.formatLabel.toLocaleUpperCase("en-US")}
              </p>
            ) : null}
            {project.runtime ? (
              <p className="film-frame__runtime">
                {project.runtime.toLocaleUpperCase("en-US")}
              </p>
            ) : null}
            <span className="film-frame__enter" aria-hidden>
              View film
            </span>
          </div>
        ) : null}
      </Link>
    </article>
  );
}

function FilmMedia({
  project,
  priority,
  shouldPlayGif,
  shouldPlayVideo,
}: {
  project: Project;
  priority: boolean;
  shouldPlayGif: boolean;
  shouldPlayVideo: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gifReady, setGifReady] = useState(false);
  const { media } = project;
  const poster =
    media.poster ?? (media.type === "image" ? media.src : undefined);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || media.type !== "video") return;
    if (shouldPlayVideo) {
      void el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [shouldPlayVideo, media.type]);

  if (media.type === "gif") {
    const showPoster = poster && (!shouldPlayGif || !gifReady);
    return (
      <>
        {showPoster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="film-frame__still"
            aria-hidden
          />
        ) : null}
        {shouldPlayGif ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${media.src}-active`}
            src={media.src}
            alt={media.alt}
            className={`film-frame__still film-frame__still--gif${gifReady ? " is-ready" : ""}`}
            loading="eager"
            decoding="async"
            onLoad={() => setGifReady(true)}
          />
        ) : null}
      </>
    );
  }

  if (media.type === "video" && media.src) {
    return (
      <>
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            className={`film-frame__still${shouldPlayVideo ? " film-frame__still--hidden" : ""}`}
            sizes="100vw"
            priority={priority}
            aria-hidden
          />
        ) : null}
        <video
          ref={videoRef}
          className={`film-frame__video${shouldPlayVideo ? " film-frame__video--visible" : ""}`}
          src={media.src}
          poster={poster}
          muted
          loop
          playsInline
          preload={shouldPlayVideo || priority ? "metadata" : "none"}
          aria-hidden
        />
      </>
    );
  }

  if (media.src.startsWith("/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={media.alt}
        className="film-frame__still"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      className="film-frame__still object-cover"
      sizes="100vw"
      priority={priority}
    />
  );
}
