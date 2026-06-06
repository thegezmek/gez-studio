"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { brandedShorts } from "@/data/projects";
import type { Project } from "@/types/project";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/motion";
import { FilmPosterFrame } from "./FilmPosterFrame";

const shortFilmColumns: Project[][] = brandedShorts.reduce<Project[][]>(
  (cols, project, index) => {
    cols[index % 2].push(project);
    return cols;
  },
  [[], []],
);

interface ShortFilmsArchiveProps {
  layout?: "stack" | "columns" | "grid";
}

/** Branded short films — stack, sticky columns, or scroll-reveal grid */
export function ShortFilmsArchive({ layout = "stack" }: ShortFilmsArchiveProps) {
  const ratiosRef = useRef<Record<string, number>>({});
  const [activeId, setActiveId] = useState(brandedShorts[0]?.id ?? "");
  const pickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pickActive = useCallback(() => {
    let bestId = brandedShorts[0]?.id ?? "";
    let bestRatio = 0;

    for (const project of brandedShorts) {
      const ratio = ratiosRef.current[project.id] ?? 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = project.id;
      }
    }

    if (bestRatio < 0.28) return;

    setActiveId((prev) => (prev === bestId ? prev : bestId));
  }, []);

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

  if (layout === "grid") {
    return (
      <section
        className="film-archive film-archive--shorts-grid"
        aria-label="Short films archive"
        data-active-film={activeId || undefined}
      >
        <ul className="film-archive--shorts-grid__list">
          {brandedShorts.map((project, index) => (
            <li key={project.id} className="film-archive--shorts-grid__item">
              <Reveal
                className="film-archive--shorts-grid__reveal"
                delay={index * stagger.base}
                amount={0.18}
              >
                <FilmPosterFrame
                  project={project}
                  index={index}
                  isLast={index === brandedShorts.length - 1}
                  isActive={activeId === project.id}
                  minimalCopy
                  onVisibility={onVisibility}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (layout === "stack") {
    return (
      <section
        className="film-archive film-archive--shorts-stack"
        aria-label="Short films archive"
        data-active-film={activeId || undefined}
      >
        {brandedShorts.map((project, index) => (
          <FilmPosterFrame
            key={project.id}
            project={project}
            index={index}
            isLast={index === brandedShorts.length - 1}
            isActive={activeId === project.id}
            minimalCopy
            onVisibility={onVisibility}
          />
        ))}
        <div className="film-archive__end" aria-hidden />
      </section>
    );
  }

  return (
    <section
      className="film-archive film-archive--shorts-columns"
      aria-label="Short films archive"
      data-active-film={activeId || undefined}
    >
      <div className="film-archive--shorts-columns__grid">
        {shortFilmColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="film-archive--shorts-columns__column"
            aria-label={`Short films column ${columnIndex + 1}`}
          >
            {column.map((project, index) => (
              <FilmPosterFrame
                key={project.id}
                project={project}
                index={index}
                isLast={index === column.length - 1}
                isActive={activeId === project.id}
                minimalCopy
                onVisibility={onVisibility}
              />
            ))}
            <div
              className="film-archive__end film-archive__end--shorts"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
