"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Projection booth atmosphere — static stock, slow exposure breathe,
 * mouse-driven lamp position (not sliding grain).
 */
export function ProjectionAtmosphere() {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const exposure = useMotionValue(1);
  const depthX = useMotionValue(0);
  const depthY = useMotionValue(0);
  const lamp = useMotionValue(0.28);

  const smoothMx = useSpring(mx, { stiffness: 40, damping: 28 });
  const smoothMy = useSpring(my, { stiffness: 40, damping: 28 });
  const smoothExposure = useSpring(exposure, { stiffness: 50, damping: 26 });
  const smoothDepthX = useSpring(depthX, { stiffness: 35, damping: 24 });
  const smoothDepthY = useSpring(depthY, { stiffness: 35, damping: 24 });
  const smoothLamp = useSpring(lamp, { stiffness: 55, damping: 22 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    const set = (name: string, val: string) => {
      root.style.setProperty(name, val);
    };

    if (reduced) {
      set("--proj-mx", "50%");
      set("--proj-my", "50%");
      set("--proj-exposure", "1");
      set("--proj-lamp", "0.2");
      return;
    }

    const apply = () => {
      set("--proj-mx", `${smoothMx.get()}%`);
      set("--proj-my", `${smoothMy.get()}%`);
      set(
        "--proj-exposure",
        String(Math.min(1.045, Math.max(0.965, smoothExposure.get()))),
      );
      set("--proj-depth-x", `${smoothDepthX.get()}px`);
      set("--proj-depth-y", `${smoothDepthY.get()}px`);
      set("--proj-lamp", String(Math.min(0.55, Math.max(0.18, smoothLamp.get()))));
      set(
        "--noise-opacity",
        String(Math.min(0.26, Math.max(0.11, 0.12 + smoothLamp.get() * 0.22))),
      );
    };

    const unsubs = [
      smoothMx.on("change", apply),
      smoothMy.on("change", apply),
      smoothExposure.on("change", apply),
      smoothDepthX.on("change", apply),
      smoothDepthY.on("change", apply),
      smoothLamp.on("change", apply),
    ];

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 100;
      const ny = (e.clientY / window.innerHeight) * 100;
      const cx = nx / 100 - 0.5;
      const cy = ny / 100 - 0.5;
      const dist = Math.min(1, Math.hypot(cx, cy) * 1.2);

      mx.set(nx);
      my.set(ny);
      depthX.set(cx * 5);
      depthY.set(cy * 4);
      exposure.set(0.985 + dist * 0.038);
      lamp.set(0.22 + dist * 0.22);

      const stage = document.querySelector(".projection-stage");
      if (stage) {
        const r = stage.getBoundingClientRect();
        const inside =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
        root.style.setProperty("--proj-stage-focus", inside ? "1" : "0");
      }
    };

    const onLeave = () => {
      mx.set(50);
      my.set(50);
      depthX.set(0);
      depthY.set(0);
      exposure.set(1);
      lamp.set(0.24);
      root.style.setProperty("--proj-stage-focus", "0");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    apply();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      unsubs.forEach((u) => u());
      [
        "--proj-mx",
        "--proj-my",
        "--proj-exposure",
        "--proj-depth-x",
        "--proj-depth-y",
        "--proj-lamp",
        "--proj-stage-focus",
        "--noise-opacity",
      ].forEach((v) => root.style.removeProperty(v));
    };
  }, [
    smoothMx,
    smoothMy,
    smoothExposure,
    smoothDepthX,
    smoothDepthY,
    smoothLamp,
    mx,
    my,
    exposure,
    depthX,
    depthY,
    lamp,
  ]);

  return (
    <div className="projection-atmosphere" aria-hidden>
      <div className="projection-atmosphere__stock" />
      <div className="projection-atmosphere__noise" />
      <div className="projection-atmosphere__noise-2" />
      <div className="projection-atmosphere__breathe" />
      <div className="projection-atmosphere__lamp" />
      <div className="projection-atmosphere__vignette" />
    </div>
  );
}
