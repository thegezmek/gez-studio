"use client";

import { EditorialFrame } from "@/components/layout/EditorialFrame";
import { site } from "@/data/site";

export function ContactPage() {
  return (
    <EditorialFrame current="contact">
      <article className="info-page__body" aria-label="Contact">
        <header className="info-hero">
          <p className="home-editorial__kicker">Contact</p>
          <h1>Let&apos;s start something.</h1>
          <p className="info-copy">{site.contact.intro}</p>
          <a className="info-email" href={`mailto:${site.contact.email}`} data-interactive>
            <svg
              className="info-email__icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3.5" y="5.5" width="17" height="13" rx="1.25" />
              <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
            </svg>
            {site.contact.email}
          </a>
        </header>
      </article>

      <section className="info-block">
        <div className="info-split">
          {site.contact.locations.map((loc) => (
            <article key={loc.city}>
              <h2>{loc.city}</h2>
              {"address" in loc && loc.address ? <p>{loc.address}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </EditorialFrame>
  );
}
