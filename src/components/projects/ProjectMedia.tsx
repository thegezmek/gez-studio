"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { categoryBehavior } from "@/data/category-styles";
import { cn } from "@/lib/utils";

interface ProjectMediaProps {
  project: Project;
  className?: string;
  priority?: boolean;
  active?: boolean;
}

/** Legacy card media — installation uses InstallationMedia */
export function ProjectMedia({
  project,
  className,
  priority = false,
  active = true,
}: ProjectMediaProps) {
  const { media, category } = project;
  const behavior = categoryBehavior[category];
  const kenBurns =
    active && (media.type === "ken-burns" || media.type === "image");

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-charcoal", className)}>
      <motion.div
        className="absolute inset-0"
        animate={kenBurns ? { scale: [1, behavior.kenBurnsScale] } : { scale: 1 }}
        transition={
          kenBurns
            ? {
                duration: behavior.kenBurnsDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }
            : undefined
        }
      >
        <MediaContent media={media} priority={priority} />
      </motion.div>
    </div>
  );
}

function MediaContent({
  media,
  priority,
}: {
  media: Project["media"];
  priority: boolean;
}) {
  if (media.type === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
      />
    );
  }

  if (media.type === "gif") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={media.alt}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        className="object-cover"
        sizes="50vw"
        priority={priority}
      />
    </div>
  );
}
