"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CursorCountryHud } from "@/components/ui/CursorCountryHud";
import { getCursorContext, type CursorContext } from "@/lib/cursor-context";
import { useCustomCursorEnabled } from "@/lib/use-media-query";

const DEFAULT_CONTEXT: CursorContext = {
  mode: "scan",
  aspect: 2.43,
  tint: "180, 176, 168",
  showPlay: false,
  active: false,
};

export function CustomCursor() {
  const enabled = useCustomCursorEnabled();
  const [visible, setVisible] = useState(false);
  const [context, setContext] = useState<CursorContext>(DEFAULT_CONTEXT);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 26 });
  const ringY = useSpring(y, { stiffness: 180, damping: 26 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setContext(getCursorContext(e.clientX, e.clientY));
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const showCountryHud =
    context.mode === "frame" &&
    Boolean(context.country && context.countryKeys?.length);

  return (
    <div
      className={`custom-cursor-layer${visible ? " is-visible" : ""}`}
      aria-hidden
    >
      <motion.div
        className={`custom-cursor${showCountryHud ? " has-country-hud" : ""}${!showCountryHud && context.active ? " is-active" : ""}${!showCountryHud && context.showPlay ? " has-play" : ""}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: showCountryHud ? 1 : context.active ? 1.06 : 1 }}
        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <span className="custom-cursor__ring" />
        <motion.svg
          className="custom-cursor__play"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={false}
          animate={{
            opacity: showCountryHud ? 0 : context.showPlay ? 1 : 0,
            scale: showCountryHud
              ? 0.5
              : context.showPlay
                ? context.active
                  ? 1.32
                  : 1.08
                : 0.5,
          }}
          transition={{
            opacity: { duration: 0.2, ease: [0.22, 0.61, 0.36, 1] },
            scale: { duration: 0.24, ease: [0.22, 0.61, 0.36, 1] },
          }}
        >
          <path d="M10.2 7.8v8.4l7.2-4.2-7.2-4.2Z" fill="currentColor" />
        </motion.svg>
        {showCountryHud ? (
          <CursorCountryHud
            country={context.country!}
            countryKeys={context.countryKeys!}
            tint={context.tint}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
