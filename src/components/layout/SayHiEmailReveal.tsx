"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { duration, ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6.5h16v11H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

interface SayHiEmailRevealProps {
  open: boolean;
  emailClassName?: string;
  iconClassName?: string;
}

export function SayHiEmailReveal({
  open,
  emailClassName = "site-footer__email",
  iconClassName = "site-footer__email-icon",
}: SayHiEmailRevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const mailto = `mailto:${site.contact.email}`;
  const isOpen = reduceMotion || open;

  return (
    <div className="site-footer__say-hi-card">
      <motion.div
        className="site-footer__say-hi-card-shell"
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{
          duration: reduceMotion ? 0 : duration.base,
          ease: ease.cinematic,
        }}
      >
        <motion.div
          className="site-footer__say-hi-card-panel"
          initial={false}
          animate={
            isOpen
              ? { clipPath: "inset(0% 0% 0% 0%)" }
              : { clipPath: "inset(100% 0% 0% 0%)" }
          }
          transition={{
            duration: reduceMotion ? 0 : duration.base,
            ease: ease.cinematic,
          }}
        >
          <motion.div
            className="site-footer__cta"
            initial={false}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: reduceMotion ? 0 : duration.fast,
              delay: isOpen && !reduceMotion ? 0.38 : 0,
              ease: ease.cinematic,
            }}
          >
            <a
              href={mailto}
              className={emailClassName}
              data-interactive
              data-cursor-play
            >
              <MailIcon className={iconClassName} />
              {site.contact.email}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
