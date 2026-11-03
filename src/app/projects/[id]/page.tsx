import { IN_DEVELOPMENT_IDS } from "@/lib/project-path";
import { projectMetadata, renderProject, type ProjectRouteProps } from "@/lib/project-route";

// Only in-development projects live here; finished films redirect to /films/ (see next.config.ts).
export async function generateStaticParams() {
  return IN_DEVELOPMENT_IDS.map((id) => ({ id }));
}

export const generateMetadata = projectMetadata;

export default function ProjectPage(props: ProjectRouteProps) {
  return renderProject(props, "/projects/");
}
