"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface FilmScrollProgressProps {
  scopeSelector?: string;
}

interface ScrollMetrics {
  thumbTop: number;
  thumbHeight: number;
}

function getScrollMetrics(): ScrollMetrics {
  const scrollHeight = document.documentElement.scrollHeight;
  const viewport = window.innerHeight;
  const maxScroll = Math.max(0, scrollHeight - viewport);
  const thumbHeight = Math.min(100, Math.max(12, (viewport / scrollHeight) * 100));
  const travel = 100 - thumbHeight;
  const thumbTop = maxScroll > 0 ? (window.scrollY / maxScroll) * travel : 0;

  return { thumbTop, thumbHeight };
}

export function FilmScrollProgress({
  scopeSelector = ".page-shell--home",
}: FilmScrollProgressProps) {
  const reduceMotion = useReducedMotion();
  const [metrics, setMetrics] = useState<ScrollMetrics>({ thumbTop: 0, thumbHeight: 20 });
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollRaf = useRef<number | null>(null);

  const updateLayout = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const viewport = window.innerHeight;
    setIsScrollable(scrollHeight > viewport + 1);
    setMetrics(getScrollMetrics());
  }, []);

  const updateScroll = useCallback(() => {
    if (scrollRaf.current !== null) return;
    scrollRaf.current = window.requestAnimationFrame(() => {
      scrollRaf.current = null;
      setMetrics(getScrollMetrics());
    });
  }, []);

  useEffect(() => {
    updateLayout();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateLayout);

    const scope = document.querySelector(scopeSelector);
    const resizeObserver =
      scope && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateLayout)
        : null;
    if (scope) resizeObserver?.observe(scope);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateLayout);
      resizeObserver?.disconnect();
      if (scrollRaf.current !== null) {
        window.cancelAnimationFrame(scrollRaf.current);
      }
    };
  }, [scopeSelector, updateLayout, updateScroll]);

  if (!isScrollable) return null;

  const motionTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 0.61, 0.36, 1] as const };

  return (
    <nav className="film-scroll-progress" aria-label="Page scroll progress" aria-hidden>
      <div className="film-scroll-progress__track">
        <motion.div
          className="film-scroll-progress__thumb"
          animate={{
            top: `${metrics.thumbTop}%`,
            height: `${metrics.thumbHeight}%`,
          }}
          transition={motionTransition}
        />
      </div>
    </nav>
  );
}
