"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span" | "button" | "a";
  href?: string;
  onClick?: () => void;
  cursorLabel?: string;
}

export function Magnetic({
  children,
  className,
  strength = 0.35,
  as = "div",
  href,
  onClick,
  cursorLabel,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as === "a" ? "a" : as === "button" ? "button" : as === "span" ? "span" : "div"];

  return (
    <Component
      ref={ref as never}
      data-magnetic
      data-cursor-label={cursorLabel}
      href={href}
      onClick={onClick}
      className={cn("relative", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </Component>
  );
}
