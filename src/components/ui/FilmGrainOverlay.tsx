"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

const PARALLAX_X = 68;
const PARALLAX_Y = 54;

/**
 * Viewport grain between base BG and UI (z-index below site-layer).
 * Mouse parallax shifts grain opposite to cursor.
 */
export function FilmGrainOverlay() {
  const reduceMotion = usePrefersReducedMotion();
  const motionEnabled = !reduceMotion;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const shiftX = useSpring(mx, { stiffness: 72, damping: 22 });
  const shiftY = useSpring(my, { stiffness: 72, damping: 22 });

  useEffect(() => {
    if (!motionEnabled) return;

    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(-cx * PARALLAX_X);
      my.set(-cy * PARALLAX_Y);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [motionEnabled, mx, my]);

  if (!motionEnabled) {
    return (
      <div className="film-grain-overlay" aria-hidden>
        <div className="film-grain-overlay__track">
          <div className="film-grain-overlay__layer film-grain-overlay__layer--a" />
          <div className="film-grain-overlay__layer film-grain-overlay__layer--b" />
        </div>
      </div>
    );
  }

  return (
    <div className="film-grain-overlay" aria-hidden>
      <motion.div
        className="film-grain-overlay__track"
        style={{ x: shiftX, y: shiftY }}
      >
        <div className="film-grain-overlay__layer film-grain-overlay__layer--a" />
        <div className="film-grain-overlay__layer film-grain-overlay__layer--b" />
      </motion.div>
    </div>
  );
}
