import { cn } from "@/lib/utils";
import { site } from "@/data/site";

interface SiteLogoProps {
  className?: string;
}

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <span className={cn("site-logo", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.logos.icon}
        alt="GEZ Studio"
        width={989}
        height={676}
        className="site-logo__img"
        decoding="async"
        fetchPriority="high"
      />
    </span>
  );
}
