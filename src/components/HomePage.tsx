"use client";

import { useEffect } from "react";
import { archiveProjects, brandedShorts } from "@/data/projects";
import { HomeEditorialOpen } from "@/components/home/HomeEditorialOpen";

export function HomePage() {
  useEffect(() => {
    document.documentElement.classList.add("page-home");
    document.body.classList.add("page-home");
    return () => {
      document.documentElement.classList.remove("page-home");
      document.body.classList.remove("page-home");
    };
  }, []);

  return (
    <div
      className="page-shell page-shell--archive page-shell--home"
      data-page="archive"
    >
      <main className="page-main page-main--home">
        <HomeEditorialOpen films={[...archiveProjects, ...brandedShorts]} />
      </main>
    </div>
  );
}
