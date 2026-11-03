"use client";

import { useRef, useState, type ReactNode } from "react";
import { EditorialFrame } from "@/components/layout/EditorialFrame";
import { DottedTurkiyeText, TurkishCaps } from "@/components/ui/DottedTurkiye";
import { logoMetrics } from "@/data/collaborator-metrics";
import { collaborators, featuredCollaborators } from "@/data/collaborators";
import { site, team } from "@/data/site";

const partnerList = [...featuredCollaborators, ...collaborators];

// Optical sizing: every logo gets the same visual area (scaled down for dense,
// filled marks like seals), then is capped so very wide or tall marks stay calm.
const LOGO_AREA = 880; // px² at desktop size
const MAX_W = 70;
const MAX_H = 27;

function logoSize(slug: string) {
  const m = logoMetrics[slug] ?? { ratio: 2.5, ink: 0.33 };
  const area = LOGO_AREA * Math.min(1.25, Math.sqrt(0.33 / m.ink));
  let w = Math.sqrt(area * m.ratio);
  let h = w / m.ratio;
  if (w > MAX_W) {
    w = MAX_W;
    h = w / m.ratio;
  }
  if (h > MAX_H) {
    h = MAX_H;
    w = h * m.ratio;
  }
  return { width: Math.round(w), height: Math.round(h) };
}

function partnerLabel(slug: string, name: string): ReactNode {
  return slug === "turkiye-ari-yetistiricileri-merkez-birligi" ? (
    <TurkishCaps text={name} />
  ) : (
    <DottedTurkiyeText text={name} />
  );
}

// Logo grid with a name label that follows the cursor (or sits under a focused logo).
function CollaboratorLogos() {
  const tipRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const current = partnerList.find((partner) => partner.slug === active);

  const place = (x: number, y: number) => {
    if (tipRef.current) tipRef.current.style.transform = `translate3d(${x + 14}px, ${y + 18}px, 0)`;
  };

  return (
    <>
      <ul
        className="studio-about__logos"
        onMouseMove={(event) => place(event.clientX, event.clientY)}
        onMouseLeave={() => setActive(null)}
      >
        {partnerList.map((partner) => (
          <li key={partner.slug}>
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} (opens in new tab)`}
              data-slug={partner.slug}
              data-interactive
              onMouseEnter={(event) => {
                place(event.clientX, event.clientY);
                setActive(partner.slug);
              }}
              onFocus={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                place(rect.left, rect.bottom - 10);
                setActive(partner.slug);
              }}
              onBlur={() => setActive(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.src} alt="" decoding="async" style={logoSize(partner.slug)} />
            </a>
          </li>
        ))}
      </ul>
      <span
        ref={tipRef}
        className={`studio-about__logo-tip${current ? " is-on" : ""}`}
        aria-hidden
      >
        {current ? partnerLabel(current.slug, current.name) : null}
      </span>
    </>
  );
}

export function StudioPage() {
  const { studio } = site;

  return (
    <EditorialFrame current="studio">
      <article className="studio-about" aria-label="Studio">
        <header className="studio-about__bio">
          <p className="studio-about__kicker">
            <span aria-hidden>/</span> Bio
          </p>
          <h1>{site.about[0]}</h1>
          <div className="studio-about__bio-more">
            {site.about.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <div className="studio-about__links">
            <a href={`mailto:${site.contact.email}`} data-interactive>
              {site.contact.email}
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" data-interactive>
              Instagram
            </a>
            <a href={site.social.vimeo} target="_blank" rel="noopener noreferrer" data-interactive>
              Vimeo
            </a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" data-interactive>
              LinkedIn
            </a>
          </div>
        </header>

        <div className="studio-about__columns">
          <section>
            <h2>
              <span aria-hidden>/</span> {studio.production.label}
            </h2>
            <ul className="studio-about__list">
              {studio.production.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="studio-about__stack">
            <section>
              <h2>
                <span aria-hidden>/</span> {studio.team.label}
              </h2>
              <ul className="studio-about__list">
                {team.map((member) => {
                  const copy = (
                    <>
                      <span className="studio-about__name">
                        <DottedTurkiyeText text={member.name} />
                      </span>
                      <span className="studio-about__role">{member.role}</span>
                    </>
                  );
                  return (
                    <li key={member.name}>
                      {"url" in member && member.url ? (
                        <a href={member.url} target="_blank" rel="noopener noreferrer" data-interactive>
                          {copy}
                        </a>
                      ) : (
                        copy
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <h2>
                <span aria-hidden>/</span> {studio.collaborators.label}
              </h2>
              <CollaboratorLogos />
            </section>
          </div>
        </div>
      </article>
    </EditorialFrame>
  );
}
