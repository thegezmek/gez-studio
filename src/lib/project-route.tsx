import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { filmTitle, getProjectDetail } from "@/data/project-details";
import { getProjectById } from "@/data/projects";
import { site } from "@/data/site";
import { projectPath } from "@/lib/project-path";

export type ProjectRouteProps = {
  params: Promise<{ id: string }>;
};

export async function projectMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  const detail = getProjectDetail(id);
  if (!project) return {};

  const title = detail ? filmTitle(detail) : project.title;
  const description = detail?.synopsis[0] ?? site.metaDescription;
  const image = project.media.poster ?? (project.media.type === "image" ? project.media.src : undefined);
  const url = projectPath(project.id);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image, alt: project.title }] : undefined,
    },
    alternates: { canonical: url },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** Renders the project page, or 404s when the id is unknown or belongs to the other route. */
export async function renderProject({ params }: ProjectRouteProps, prefix: "/films/" | "/projects/") {
  const { id } = await params;
  const project = getProjectById(id);
  const detail = getProjectDetail(id);

  if (!project || !detail || !projectPath(id).startsWith(prefix)) notFound();

  return <ProjectDetailPage project={project} detail={detail} />;
}
