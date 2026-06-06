"use client";

import { useEffect } from "react";

export function ProjectDetailShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("page-film-archive");
    return () => document.body.classList.remove("page-film-archive");
  }, []);

  return children;
}
