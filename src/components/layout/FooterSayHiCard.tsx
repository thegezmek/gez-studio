"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { SayHiEmailReveal } from "@/components/layout/SayHiEmailReveal";

export function FooterSayHiCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.55 });
  const reduceMotion = usePrefersReducedMotion();
  const open = reduceMotion || inView;

  return (
    <div
      ref={ref}
      className="site-footer__brand-stack"
      data-open={open || undefined}
    >
      <p className="type-index site-footer__label site-footer__collab-label">
        {site.contact.heading}
      </p>

      <SayHiEmailReveal open={open} />
    </div>
  );
}
