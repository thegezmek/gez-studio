import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { filmTitle, getProjectDetail } from "@/data/project-details";
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

  const title = detail ? filmTitle(detail) : project.title;
  const description = detail?.synopsis[0] ?? site.metaDescription;
  const image = project.media.poster ?? (project.media.type === "image" ? project.media.src : undefined);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/projects/${project.id}`,
      images: image ? [{ url: image, alt: project.title }] : undefined,
    },
    alternates: { canonical: `/projects/${project.id}` },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  const detail = getProjectDetail(id);

  if (!project || !detail) notFound();

  return <ProjectDetailPage project={project} detail={detail} />;
}
