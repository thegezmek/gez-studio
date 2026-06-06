"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SayHiEmailReveal } from "@/components/layout/SayHiEmailReveal";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

interface ContactPanelProps {
  onClose: () => void;
}

export function ContactPanel({ onClose }: ContactPanelProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [emailOpen, setEmailOpen] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setEmailOpen(true);
      return;
    }

    const timer = window.setTimeout(() => setEmailOpen(true), 380);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <motion.aside
      className="contact-panel panel-surface fixed inset-0 z-[100] flex flex-col backdrop-blur-md"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      role="dialog"
      aria-label="Contact"
    >
      <div className="panel-scroll flex-1 px-5 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-xl">
          <button
            type="button"
            data-interactive
            onClick={onClose}
            className="btn-stroke type-index mb-16 text-dim"
          >
            Close
          </button>

          <p className="type-index mb-6">Contact</p>
          <h2 className="text-4xl font-medium leading-tight tracking-[-0.03em] text-bright md:text-5xl">
            {site.contact.heading}
          </h2>

          <div className="contact-panel__email-wrap">
            <SayHiEmailReveal
              open={emailOpen}
              emailClassName="contact-panel__email text-2xl font-medium tracking-[-0.02em] text-bright transition-colors hover:text-mist md:text-3xl"
              iconClassName="contact-panel__email-icon"
            />
          </div>

          <div className="contact-panel__locations mt-14 space-y-10">
            {site.contact.locations.map((loc) => (
              <div key={loc.city}>
                <p className="contact-panel__city mb-3 text-lg font-medium text-bright md:text-xl">
                  {loc.city}
                </p>
                {"address" in loc && loc.address ? (
                  <p className="text-sm leading-relaxed text-dim">{loc.address}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-8 border-t border-steel/50 pt-12">
            <Link
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stroke type-index text-dim"
              data-interactive
            >
              Instagram
            </Link>
            <Link
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stroke type-index text-dim"
              data-interactive
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
