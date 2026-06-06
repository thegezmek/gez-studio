import Link from "next/link";
import { site } from "@/data/site";
import { FooterAnalogClock } from "./FooterAnalogClock";
import { FooterBackToTop } from "./FooterBackToTop";
import { FooterSayHiCard } from "./FooterSayHiCard";

interface SiteFooterProps {
  variant?: "default" | "minimal";
}

export function SiteFooter({ variant = "default" }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`site-footer${variant === "minimal" ? " site-footer--minimal" : ""}`}
    >
      <FooterBackToTop />
      <div className="site-footer__inner">
        <div className="site-footer__start">
          <div className="site-footer__brand">
            <FooterSayHiCard />
          </div>

          <div className="site-footer__locations">
            {site.contact.locations.map((loc) => (
              <div key={loc.city} className="site-footer__loc">
                <p className="type-index site-footer__label">{loc.city}</p>
                <FooterAnalogClock city={loc.city} timezone={loc.timezone} />
              </div>
            ))}
          </div>
        </div>

        <nav className="site-footer__social" aria-label="Social">
          <Link
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="type-index site-footer__link"
            data-interactive
          >
            Instagram
          </Link>
          <Link
            href={site.social.vimeo}
            target="_blank"
            rel="noopener noreferrer"
            className="type-index site-footer__link"
            data-interactive
          >
            Vimeo
          </Link>
          <Link
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="type-index site-footer__link"
            data-interactive
          >
            LinkedIn
          </Link>
        </nav>
      </div>

      <p className="type-index site-footer__copy">
        All rights reserved © {year} {site.legalName}
      </p>
    </footer>
  );
}
