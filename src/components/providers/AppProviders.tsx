"use client";

import { CustomCursor } from "@/components/ui/CustomCursor";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { FilmGrainOverlay } from "@/components/ui/FilmGrainOverlay";
import { ProjectionAtmosphere } from "@/components/ui/ProjectionAtmosphere";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="ambient-layer">
        <div className="ambient-layer__backdrop" aria-hidden>
          <AmbientBackground />
          <ProjectionAtmosphere />
        </div>
      </div>

      <FilmGrainOverlay />

      <div className="site-layer">{children}</div>

      <CustomCursor />
    </>
  );
}
