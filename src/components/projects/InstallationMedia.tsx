"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/types/project";
import { categoryBehavior } from "@/data/category-styles";
import { cn } from "@/lib/utils";

interface InstallationMediaProps {
  project: Project;
  priority?: boolean;
  active?: boolean;
}

export function InstallationMedia({
  project,
  priority = false,
  active = true,
}: InstallationMediaProps) {
  const { media, category } = project;
  const behavior = categoryBehavior[category];
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 22 });
  const sy = useSpring(my, { stiffness: 80, damping: 22 });
  const rotate = useTransform(sx, [-18, 18], [-0.5, 0.5]);

  const onMove = (e: React.MouseEvent) => {
    if (!behavior.mediaDrift || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * (category === "experimental" ? 18 : 10));
    my.set(py * (category === "experimental" ? 12 : 6));
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const kenBurns =
    active && (media.type === "ken-burns" || media.type === "image");

  return (
    <div
      ref={ref}
      className="installation-media-root"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="installation-media-inner"
        style={
          behavior.mediaDrift
            ? {
                x: sx,
                y: sy,
                rotate: category === "experimental" ? rotate : 0,
              }
            : undefined
        }
        animate={
          kenBurns
            ? { scale: [1, behavior.kenBurnsScale] }
            : { scale: 1 }
        }
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
        <MediaLayer media={media} priority={priority} active={active} />
      </motion.div>
      <div className="installation-media-scrim" aria-hidden />
    </div>
  );
}

function MediaLayer({
  media,
  priority,
  active = true,
}: {
  media: Project["media"];
  priority: boolean;
  active?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || media.type !== "video") return;

    if (active) {
      el.currentTime = 0;
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active, media.type, media.src]);

  if (media.type === "video") {
    return (
      <video
        ref={videoRef}
        className="installation-media-asset"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={media.alt}
      />
    );
  }

  if (media.type === "gif") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={active ? media.src : `${media.src}-idle`}
        src={media.src}
        alt={media.alt}
        className="installation-media-asset"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    );
  }

  return (
    <div className={cn("relative h-[130%] w-full", "installation-media-still")}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 70vw"
        priority={priority}
      />
    </div>
  );
}
