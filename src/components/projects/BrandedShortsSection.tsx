"use client";

import { site } from "@/data/site";
import { ShortFilmsArchive } from "./ShortFilmsArchive";

interface BrandedShortsSectionProps {
  layout?: "stack" | "columns" | "grid";
}

export function BrandedShortsSection({ layout = "stack" }: BrandedShortsSectionProps) {
  const { title, description } = site.brandedShorts;

  return (
    <section
      className="branded-shorts branded-shorts--archive-films"
      aria-label="Short films"
    >
      <div
        className="archive-statement archive-statement--short-films"
        aria-labelledby="short-films-title"
      >
        <div className="archive-statement__inner">
          <div className="archive-statement__row">
            <h2 id="short-films-title" className="archive-statement__title">
              {title}
            </h2>
            <p className="archive-statement__lead archive-statement__lead--wrap">
              {description}
            </p>
          </div>
        </div>
      </div>
      <ShortFilmsArchive layout={layout} />
    </section>
  );
}
