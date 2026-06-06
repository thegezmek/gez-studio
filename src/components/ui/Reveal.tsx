"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  amount?: number;
  once?: boolean;
}

const offsets = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 48 },
  right: { x: -48 },
  none: {},
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.2,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offsets[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration.reveal,
        delay,
        ease: ease.cinematic,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
