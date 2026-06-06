import Image from "next/image";
import Link from "next/link";
import { getProjectNavigation } from "@/data/project-details";
import type { ProjectDetail } from "@/types/project-detail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectDetailNav } from "@/components/projects/ProjectDetailNav";

interface ProjectDetailPageProps {
  detail: ProjectDetail;
}

export function ProjectDetailPage({ detail }: ProjectDetailPageProps) {
  const navigation = getProjectNavigation(detail.id);

  return (
    <div className="page-shell page-shell--project" data-page="project">
      <main className="project-detail">
        <article className="project-detail__article">
          <Link
            href="/"
            className="site-nav-btn font-bold project-detail__back"
            data-interactive
          >
            Back
          </Link>

          <header className="project-detail__header">
            {detail.eyebrow ? (
              <p className="project-detail__eyebrow">{detail.eyebrow}</p>
            ) : null}
            <h1 className="project-detail__title">{detail.headline}</h1>
          </header>

          <div className="project-detail__body">
            <div className="project-detail__synopsis">
              {detail.synopsis.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="project-detail__paragraph"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="project-detail__credits">
              {detail.credits.map((credit) => (
                <div key={credit.label} className="project-detail__credit">
                  <dt className="project-detail__credit-label">{credit.label}</dt>
                  <dd
                    className={`project-detail__credit-value${credit.highlight ? " project-detail__credit-value--highlight" : ""}`}
                  >
                    {credit.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {detail.trailer ? (
            <section
              className="project-detail__trailer"
              aria-labelledby="project-trailer-title"
            >
              <h2 id="project-trailer-title" className="project-detail__section-title">
                Trailer
              </h2>
              <div className="project-detail__trailer-frame">
                <iframe
                  src={detail.trailer.embedUrl}
                  title={detail.trailer.title}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </section>
          ) : null}

          {detail.stills.length > 0 ? (
            <section
              className="project-detail__stills"
              aria-labelledby="project-stills-title"
            >
              <h2 id="project-stills-title" className="project-detail__section-title">
                {detail.stillsTitle ?? "Film Stills"}
              </h2>
              <div className="project-detail__stills-grid">
                {detail.stills.map((still) => (
                  <figure
                    key={still.src}
                    className={`project-detail__still${still.letterbox ? " project-detail__still--letterbox" : ""}`}
                  >
                    <Image
                      src={still.src}
                      alt={still.alt}
                      width={1024}
                      height={576}
                      className="project-detail__still-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                    {still.letterbox ? (
                      <span
                        className="project-detail__still-letterbox"
                        aria-hidden="true"
                      />
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {navigation ? <ProjectDetailNav navigation={navigation} /> : null}
        </article>
      </main>

      <SiteFooter variant="minimal" />
    </div>
  );
}
