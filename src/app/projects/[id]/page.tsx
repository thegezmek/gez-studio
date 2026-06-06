import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { ProjectDetailShell } from "@/components/projects/ProjectDetailShell";
import { getProjectDetail } from "@/data/project-details";
import { getProjectById, showcaseProjects } from "@/data/projects";
import { site } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return showcaseProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  const detail = getProjectDetail(id);
  if (!project) return {};

  const title = detail
    ? [detail.eyebrow, detail.headline].filter(Boolean).join(" | ")
    : project.title;
  const description = detail?.synopsis[0] ?? site.metaDescription;

  return {
    title,
    description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  const detail = getProjectDetail(id);

  if (!project) notFound();

  if (detail) {
    return (
      <ProjectDetailShell>
        <ProjectDetailPage detail={detail} />
      </ProjectDetailShell>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 text-bone md:px-10">
      <Link
        href="/"
        className="type-index inline-block text-dim transition-colors hover:text-bright"
      >
        Back to Archive
      </Link>

      <section className="mt-10">
        <p className="type-index text-dim">
          {project.country} {project.sourceDate ? `— ${project.sourceDate}` : ""}
        </p>
        <h1 className="mt-4 text-5xl font-medium tracking-[-0.03em] text-bright md:text-7xl">
          {project.title}
        </h1>
        {project.subtitle ? (
          <p className="mt-4 text-xl text-mist md:text-2xl">{project.subtitle}</p>
        ) : null}
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-mist">
          {project.description}
        </p>
      </section>

      <section className="mt-12 overflow-hidden rounded-md border border-steel/30 bg-charcoal/30">
        <ProjectMedia id={project.id} />
      </section>

      <section className="mt-10 flex flex-wrap items-center gap-4">
        {project.trailerUrl ? (
          <a
            href={project.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="type-index border border-steel/40 px-5 py-3 text-bright transition-colors hover:border-mist hover:bg-slate/30"
          >
            Trailer Link
          </a>
        ) : null}
        {project.sourceUrl ? (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="type-index border border-steel/40 px-5 py-3 text-bright transition-colors hover:border-mist hover:bg-slate/30"
          >
            Source Page
          </a>
        ) : null}
      </section>
    </main>
  );
}

function ProjectMedia({ id }: { id: string }) {
  const project = getProjectById(id);
  if (!project) return null;

  if (project.media.type === "video") {
    return (
      <video
        className="h-[38vh] w-full object-cover md:h-[52vh]"
        src={project.media.src}
        poster={project.media.poster}
        autoPlay
        muted
        loop
        playsInline
        controls
      />
    );
  }

  return (
    <div className="relative h-[38vh] w-full md:h-[52vh]">
      <Image
        src={project.media.src}
        alt={project.media.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority
      />
    </div>
  );
}
