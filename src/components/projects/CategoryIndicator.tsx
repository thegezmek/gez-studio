import type { ProjectCategory } from "@/types/project";
import { categoryLabels } from "@/data/category-styles";
import { cn } from "@/lib/utils";

interface CategoryIndicatorProps {
  category: ProjectCategory;
  className?: string;
}

const icons: Record<ProjectCategory, string> = {
  "feature-documentary": "◐",
  "documentary-series": "◫",
  "music-video": "♪",
  commercial: "◇",
  experimental: "▤",
};

export function CategoryIndicator({ category, className }: CategoryIndicatorProps) {
  return (
    <span
      className={cn(
        "type-category inline-flex items-center gap-2",
        className,
      )}
    >
      <span aria-hidden className="text-[10px] opacity-70">
        {icons[category]}
      </span>
      {categoryLabels[category]}
    </span>
  );
}
