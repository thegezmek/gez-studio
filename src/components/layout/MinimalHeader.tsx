"use client";

import Link from "next/link";
import { SiteLogo } from "@/components/layout/SiteLogo";

export type PanelId = "studio" | "contact" | null;

interface MinimalHeaderProps {
  activePanel: PanelId;
  onOpen: (panel: Exclude<PanelId, null>) => void;
  variant?: "default" | "archive";
}

export function MinimalHeader({
  activePanel,
  onOpen,
  variant = "default",
}: MinimalHeaderProps) {
  return (
    <header
      className={`site-header${variant === "archive" ? " site-header--archive" : ""}`}
    >
      <nav className="site-header__left" aria-label="Primary">
        <button
          type="button"
          data-interactive
          onClick={() => onOpen("studio")}
          className={`site-nav-btn font-bold ${activePanel === "studio" ? "is-active" : ""}`}
        >
          Studio
        </button>
      </nav>

      <Link href="/" className="site-header__brand" data-interactive aria-label="GEZ Studio home">
        <SiteLogo />
      </Link>

      <nav className="site-header__right" aria-label="Contact">
        <button
          type="button"
          data-interactive
          onClick={() => onOpen("contact")}
          className={`site-nav-btn font-bold ${activePanel === "contact" ? "is-active" : ""}`}
        >
          Contact
        </button>
      </nav>
    </header>
  );
}
