"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { ProjectMedia } from "./ProjectMedia";
import { CategoryIndicator } from "./CategoryIndicator";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

const layoutStyles: Record<Project["layout"], string> = {
  hero: "md:col-span-12 min-h-[70vh] md:min-h-[85vh]",
  wide: "md:col-span-8 min-h-[55vh] md:min-h-[65vh]",
  standard: "md:col-span-6 min-h-[50vh] md:min-h-[58vh]",
  compact: "md:col-span-4 min-h-[42vh] md:min-h-[48vh]",
};

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const inner = (
    <>
        <div className="absolute inset-0">
          <ProjectMedia
            project={project}
            active={hovered}
            priority={index < 2}
            className="h-full"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 ring-1 ring-ink/10 ring-inset" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <CategoryIndicator category={project.category} className="mb-4" />
              <Magnetic strength={0.15} as="div">
                <h3 className="font-serif text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl lg:text-7xl">
                  {project.title}
                </h3>
              </Magnetic>
              {project.subtitle && (
                <p className="mt-2 font-serif text-lg italic text-mist/80 md:text-xl">
                  {project.subtitle}
                </p>
              )}
              <motion.p
                className="mt-4 max-w-md text-sm leading-relaxed text-stone md:text-base"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hovered ? 1 : 0,
                  height: hovered ? "auto" : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                {project.description}
              </motion.p>
            </div>

            <div className="hidden shrink-0 flex-col items-end gap-3 md:flex">
              {project.year && (
                <span className="font-mono text-[10px] tracking-[0.2em] text-stone">
                  {project.year}
                </span>
              )}
              {!project.comingSoon && (
                <motion.span
                  className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone"
                  animate={{ x: hovered ? 0 : 8, opacity: hovered ? 1 : 0.4 }}
                >
                  →
                </motion.span>
              )}
              {project.comingSoon && (
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-clay">
                  Soon
                </span>
              )}
            </div>
          </div>
        </div>
    </>
  );

  return (
    <motion.article
      className={cn("group relative col-span-12", layoutStyles[project.layout], className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {project.comingSoon ? (
        <div className="relative block h-full w-full overflow-hidden">{inner}</div>
      ) : (
        <Link
          href={project.href ?? `#${project.id}`}
          className="relative block h-full w-full overflow-hidden"
          data-cursor-label="View"
        >
          {inner}
        </Link>
      )}
    </motion.article>
  );
}
