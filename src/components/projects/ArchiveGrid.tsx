"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { archiveProjects } from "@/data/projects";
import type { Project } from "@/types/project";
import { useArchiveScrollSnap } from "@/lib/use-archive-scroll-snap";
import { FilmPosterFrame } from "./FilmPosterFrame";

interface ArchiveGridProps {
  projects?: Project[];
  className?: string;
}

export function ArchiveGrid({ projects = archiveProjects, className }: ArchiveGridProps) {
  const archiveRef = useRef<HTMLElement>(null);
  const ratiosRef = useRef<Record<string, number>>({});
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");
  const pickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useArchiveScrollSnap(archiveRef);

  useEffect(() => {
    setActiveId(projects[0]?.id ?? "");
  }, [projects]);

  const pickActive = useCallback(() => {
    let bestId = projects[0]?.id ?? "";
    let bestRatio = 0;

    for (const project of projects) {
      const ratio = ratiosRef.current[project.id] ?? 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = project.id;
      }
    }

    if (bestRatio < 0.28) return;

    setActiveId((prev) => (prev === bestId ? prev : bestId));
  }, [projects]);

  const onVisibility = useCallback(
    (projectId: string, ratio: number) => {
      ratiosRef.current[projectId] = ratio;
      if (pickTimer.current) clearTimeout(pickTimer.current);
      pickTimer.current = setTimeout(pickActive, 48);
    },
    [pickActive],
  );

  useEffect(
    () => () => {
      if (pickTimer.current) clearTimeout(pickTimer.current);
    },
    [],
  );

  return (
    <section
      ref={archiveRef}
      className={
        className
          ? `film-archive film-archive--feature-stack ${className}`
          : "film-archive film-archive--feature-stack"
      }
      aria-label="Film archive"
      data-active-film={activeId || undefined}
    >
      {projects.map((project, index) => (
        <FilmPosterFrame
          key={project.id}
          project={project}
          index={index}
          isLast={index === projects.length - 1}
          isActive={activeId === project.id}
          onVisibility={onVisibility}
        />
      ))}

      <div className="film-archive__end" aria-hidden />
    </section>
  );
}
