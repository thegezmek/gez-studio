import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialFrame } from "@/components/layout/EditorialFrame";
import { FilmPlayer } from "@/components/projects/FilmPlayer";
import { DottedTurkiyeText } from "@/components/ui/DottedTurkiye";
import { filmTitle, getProjectNavigation } from "@/data/project-details";
import { archiveKind, yearOf } from "@/lib/film-meta";
import type { Project } from "@/types/project";
import type { ProjectCredit, ProjectDetail } from "@/types/project-detail";

const DETAIL_LABELS = ["Production Company", "Year", "Country", "Language", "Runtime", "Locations"];

function titleCase(value: string) {
  return value.toLowerCase().replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="film-page__block">
      <h2 className="film-page__label">
        <span aria-hidden>/</span> {label}
      </h2>
      <div className="film-page__content">{children}</div>
    </section>
  );
}

function CreditGrid({ items }: { items: ProjectCredit[] }) {
  return (
    <dl className="film-page__grid">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>
            <DottedTurkiyeText text={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectDetailPage({ project, detail }: { project: Project; detail: ProjectDetail }) {
  const navigation = getProjectNavigation(detail.id);
  const kind = archiveKind(project);
  const year = yearOf(project);
  const meta = [year, kind, project.country].filter(Boolean) as string[];

  const credits = detail.credits.filter((credit) => !DETAIL_LABELS.includes(credit.label));
  const details: ProjectCredit[] = [
    { label: "Format", value: titleCase(kind) },
    ...detail.credits.filter((credit) => DETAIL_LABELS.includes(credit.label)),
  ];

  return (
    <EditorialFrame>
      <article className="film-page">
        <header className="film-page__head">
          <h1>{filmTitle(detail)}</h1>
          <p className="film-page__meta">
            {meta.map((item, index) => (
              <span key={item}>
                <DottedTurkiyeText text={item} />
                {index < meta.length - 1 ? "," : null}
              </span>
            ))}
          </p>
        </header>

        <FilmPlayer
          trailer={detail.trailer}
          cover={project.media.poster ?? (project.media.type === "image" ? project.media.src : undefined)}
          {...(detail.trailerLabel ? { label: detail.trailerLabel } : {})}
        />

        {detail.synopsis.length > 0 ? (
          <Block label="Log-line">
            <div className="film-page__about">
              {detail.synopsis.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>
                  <DottedTurkiyeText text={paragraph} />
                </p>
              ))}
            </div>
          </Block>
        ) : null}

        {credits.length > 0 ? (
          <Block label="Credits">
            <CreditGrid items={credits} />
          </Block>
        ) : null}

        <Block label="Details">
          <CreditGrid items={details} />
        </Block>

        {detail.musicVideos?.length ? (
          <section className="film-page__videos" aria-label="Music videos">
            {detail.musicVideos.map((item) => (
              <div key={item.title} className="film-page__video">
                <h3>
                  <span>{item.title}</span>
                  <span className="film-page__meta">{item.runtime}</span>
                </h3>
                <FilmPlayer trailer={item.video} cover={item.cover} label="Watch the video" />
              </div>
            ))}
          </section>
        ) : null}

        {detail.stills.length > 0 ? (
          <div className="film-page__stills">
            {detail.stills.map((still, index) => (
              <figure key={still.src}>
                <Image
                  src={still.src}
                  alt={still.alt}
                  width={1024}
                  height={576}
                  className={still.crop ? "is-letterbox" : undefined}
                  sizes={index % 3 === 0 ? "100vw" : "(max-width: 800px) 100vw, 50vw"}
                />
              </figure>
            ))}
          </div>
        ) : null}

        {navigation ? (
          <nav className="film-page__nav" aria-label="More films">
            <Link href={navigation.prev.href} data-interactive>
              <span>Previous</span>
              <strong>{navigation.prev.title}</strong>
            </Link>
            <Link href={navigation.next.href} data-interactive>
              <span>Next</span>
              <strong>{navigation.next.title}</strong>
            </Link>
          </nav>
        ) : null}
      </article>
    </EditorialFrame>
  );
}
