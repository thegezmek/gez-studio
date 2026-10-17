"use client";

import { EditorialFrame } from "@/components/layout/EditorialFrame";
import { DottedTurkiyeText, TurkishCaps } from "@/components/ui/DottedTurkiye";
import { collaborators, featuredCollaborators } from "@/data/collaborators";
import { site, team } from "@/data/site";

const partnerList = [...featuredCollaborators, ...collaborators];

export function StudioPage() {
  const { studio } = site;

  return (
    <EditorialFrame current="studio">
      <article className="studio-about" aria-label="Studio">
        <header className="studio-about__bio">
          <p className="studio-about__kicker">
            <span aria-hidden>/</span> Bio
          </p>
          <h1>{site.description}</h1>
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
              <span aria-hidden>/</span> {studio.founder.label}
            </h2>
            <div className="studio-about__prose">
              {studio.founder.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>
                  <DottedTurkiyeText text={paragraph} />
                </p>
              ))}
            </div>
          </section>

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
        </div>

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

          <section>
            <h2>
              <span aria-hidden>/</span> {studio.collaborators.label}
            </h2>
            <ul className="studio-about__partners">
              {partnerList.map((partner) => (
                <li key={partner.slug}>
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" data-interactive>
                    {partner.slug === "turkiye-ari-yetistiricileri-merkez-birligi" ? (
                      <TurkishCaps text={partner.name} />
                    ) : (
                      <DottedTurkiyeText text={partner.name} />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </EditorialFrame>
  );
}
