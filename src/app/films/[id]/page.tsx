import { showcaseProjects } from "@/data/projects";
import { isInDevelopment } from "@/lib/project-path";
import { projectMetadata, renderProject, type ProjectRouteProps } from "@/lib/project-route";

export async function generateStaticParams() {
  return showcaseProjects.filter((project) => !isInDevelopment(project.id)).map((project) => ({ id: project.id }));
}

export const generateMetadata = projectMetadata;

export default function FilmPage(props: ProjectRouteProps) {
  return renderProject(props, "/films/");
}
