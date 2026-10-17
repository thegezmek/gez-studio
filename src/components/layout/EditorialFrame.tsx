"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/data/site";
import { scrollPageToTop } from "@/lib/scroll-to-top";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

function ToTop() {
  const reduceMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".home-editorial__foot");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      className={`home-editorial__up${open ? " is-open" : ""}`}
      aria-label="Back to top"
      aria-hidden={open ? undefined : true}
      tabIndex={open ? 0 : -1}
      data-interactive
      onClick={() => scrollPageToTop(reduceMotion)}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}

export function EditorialFrame({
  current,
  children,
}: {
  current?: "studio" | "contact";
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add("page-home");
    document.body.classList.add("page-home");
    return () => {
      document.documentElement.classList.remove("page-home");
      document.body.classList.remove("page-home");
    };
  }, []);

  return (
    <div className="page-shell page-shell--home">
      <main className="page-main page-main--home">
        <div className="home-editorial info-page">
          <nav className="info-nav" aria-label="Primary">
            <Link href="/" data-interactive>
              <span aria-hidden>/</span>
              {site.legalName}
            </Link>
            <Link href="/#films" data-interactive>
              <span aria-hidden>/</span>
              Films
            </Link>
            <Link
              href="/studio"
              data-interactive
              aria-current={current === "studio" ? "page" : undefined}
            >
              <span aria-hidden>/</span>
              Studio
            </Link>
            <Link
              href="/contact"
              data-interactive
              aria-current={current === "contact" ? "page" : undefined}
            >
              <span aria-hidden>/</span>
              Contact
            </Link>
          </nav>
          {children}
          <footer className="home-editorial__foot">
            <nav aria-label="Social">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" data-interactive>
                Instagram
              </a>
              <a href={site.social.vimeo} target="_blank" rel="noopener noreferrer" data-interactive>
                Vimeo
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" data-interactive>
                LinkedIn
              </a>
            </nav>
            <p className="home-editorial__foot-meta">
              <span>
                © {new Date().getFullYear()} {site.company.name}
              </span>
              <span>{site.company.address}</span>
              <span>Company No. {site.company.number}</span>
            </p>
          </footer>
          <ToTop />
        </div>
      </main>
    </div>
  );
}
