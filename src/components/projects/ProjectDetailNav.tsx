import Link from "next/link";
import type { ProjectNavigation } from "@/data/project-details";

interface ProjectDetailNavProps {
  navigation: ProjectNavigation;
}

function NavArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className="project-detail__nav-arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "prev" ? (
        <path d="M14 6l-6 6 6 6" />
      ) : (
        <path d="M10 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function ProjectDetailNav({ navigation }: ProjectDetailNavProps) {
  const { prev, next } = navigation;

  return (
    <nav className="project-detail__nav" aria-label="Project navigation">
      <div className="project-detail__nav-rule" aria-hidden />

      <div className="project-detail__nav-inner">
        <Link
          href={prev.href}
          className="project-detail__nav-link project-detail__nav-link--prev"
          data-interactive
          data-cursor-play
        >
          <NavArrow direction="prev" />
          <span className="project-detail__nav-copy">
            <span className="project-detail__nav-label">Previous project</span>
            <span className="project-detail__nav-title">{prev.title}</span>
          </span>
        </Link>

        <Link
          href={next.href}
          className="project-detail__nav-link project-detail__nav-link--next"
          data-interactive
          data-cursor-play
        >
          <span className="project-detail__nav-copy">
            <span className="project-detail__nav-label">Next project</span>
            <span className="project-detail__nav-title">{next.title}</span>
          </span>
          <NavArrow direction="next" />
        </Link>
      </div>
    </nav>
  );
}
