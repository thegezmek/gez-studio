"use client";

import { motion } from "framer-motion";
import { duration, ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

interface HomeTaglineAction {
  label: string;
  onClick: () => void;
}

interface HomeTaglineProps {
  lines: string | [string, string];
  label?: string;
  subtext?: string;
  action?: HomeTaglineAction;
  variant?: "default" | "closing";
}

export function HomeTagline({
  lines,
  label = "Studio statement",
  subtext,
  action,
  variant = "default",
}: HomeTaglineProps) {
  const reduceMotion = usePrefersReducedMotion();

  const line1 = typeof lines === "string" ? lines : lines[0];
  const line2 = typeof lines === "string" ? null : lines[1];

  return (
    <section
      className={`home-tagline${variant === "closing" ? " home-tagline--closing" : ""}`}
      aria-label={label}
    >
      <div className="home-tagline__inner">
        <p className="home-tagline__text">
          {line1}
          {line2 ? (
            <>
              <br />
              {line2}
            </>
          ) : null}
        </p>
        {reduceMotion ? (
          <span className="home-tagline__rule home-tagline__rule--static" aria-hidden />
        ) : (
          <motion.span
            className="home-tagline__rule"
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
            transition={{
              duration: duration.slow,
              delay: 0.22,
              ease: ease.cinematic,
            }}
            style={{ transformOrigin: "left center" }}
          />
        )}
        {subtext ? <p className="home-tagline__subtext">{subtext}</p> : null}
        {action ? (
          <button
            type="button"
            className="home-tagline__action"
            onClick={action.onClick}
            data-interactive
          >
            {action.label}
          </button>
        ) : null}
      </div>
    </section>
  );
}
