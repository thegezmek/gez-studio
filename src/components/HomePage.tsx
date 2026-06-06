"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { archiveProjects } from "@/data/projects";
import { HomeV2Hero } from "@/components/home-v2/HomeV2Hero";
import { HomeTagline } from "@/components/home/HomeTagline";
import { FilmScrollProgress } from "@/components/home-v3/FilmScrollProgress";
import { ArchiveGrid } from "@/components/projects/ArchiveGrid";
import { BrandedShortsSection } from "@/components/projects/BrandedShortsSection";
import { FeatureFilmsStatement } from "@/components/projects/FeatureFilmsStatement";
import { MinimalHeader, type PanelId } from "@/components/layout/MinimalHeader";
import { StudioPanel } from "@/components/layout/StudioPanel";
import { ContactPanel } from "@/components/layout/ContactPanel";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function HomePage() {
  const [panel, setPanel] = useState<PanelId>(null);
  const closePanel = useCallback(() => setPanel(null), []);

  const heroProject =
    archiveProjects.find((p) => p.id === "from-ashes") ?? archiveProjects[0];
  const showcaseProjects = archiveProjects;
  const heroFilm = {
    ...heroProject,
    media: {
      ...heroProject.media,
      type: "video" as const,
      src: "/projects/v4-cover.mp4?v=2",
      poster: "/projects/v4-cover-poster.jpg?v=2",
    },
  };

  useEffect(() => {
    document.documentElement.classList.add("page-home");
    document.body.classList.add("page-film-archive", "page-home");
    return () => {
      document.documentElement.classList.remove("page-home");
      document.body.classList.remove("page-film-archive", "page-home");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("panel-open", panel !== null);
    return () => document.body.classList.remove("panel-open");
  }, [panel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePanel]);

  return (
    <div
      className="page-shell page-shell--archive page-shell--home"
      data-page="archive"
    >
      <FilmScrollProgress scopeSelector=".page-shell--home" />

      <main className="page-main page-main--archive page-main--home" id="archive">
        <HomeV2Hero
          project={heroFilm}
          showCopy={false}
          trackFilm={false}
          header={
            <MinimalHeader
              activePanel={panel}
              onOpen={setPanel}
              variant="archive"
            />
          }
        />

        <div className="home-content">
          <HomeTagline lines="Stories for a changing world." />
          <section className="home-feature-films" aria-label="Feature films">
            <FeatureFilmsStatement />
            {showcaseProjects.length > 0 ? (
              <ArchiveGrid projects={showcaseProjects} />
            ) : null}
          </section>
          <div
            className="home-section-space home-section-space--after-features"
            aria-hidden
          />
          <BrandedShortsSection layout="grid" />
        </div>
      </main>

      <HomeTagline
        variant="closing"
        label="Studio"
        lines="A boutique documentary film studio."
        subtext="Founded by British–Turkish filmmaker Lewis Levent."
        action={{ label: "Our story", onClick: () => setPanel("studio") }}
      />

      <SiteFooter variant="minimal" />

      <AnimatePresence>
        {panel === "studio" && <StudioPanel onClose={closePanel} />}
        {panel === "contact" && <ContactPanel onClose={closePanel} />}
      </AnimatePresence>
    </div>
  );
}
