"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { scrollPageToTop } from "@/lib/scroll-to-top";

interface ButtonPosition {
  bottom: number;
  right: number;
}

const BUTTON_DROP_PX = 36;
const SCROLL_RAIL_GAP_PX = 12;

function readScrollRailRect(): DOMRect | null {
  const track = document.querySelector(".film-scroll-progress__track");
  const rect = track?.getBoundingClientRect();
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  return rect;
}

function clampLeftOfScrollRail(
  right: number,
  buttonWidth: number,
  railRect: DOMRect,
): number {
  const maxCenterX = railRect.left - SCROLL_RAIL_GAP_PX - buttonWidth / 2;
  const centerX = window.innerWidth - right - buttonWidth / 2;
  const clampedCenterX = Math.min(centerX, maxCenterX);
  return Math.max(0, window.innerWidth - clampedCenterX - buttonWidth / 2);
}

function readClosingTaglineMetrics(footerTop: number) {
  const closing = document.querySelector(
    ".home-tagline--closing .home-tagline__inner",
  );
  if (!closing) return null;

  const rect = closing.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) return null;
  if (rect.bottom > footerTop + 8) return null;

  return { cardBottom: rect.bottom, cardRight: rect.right };
}

function readVisibleCardMetrics(footerTop: number) {
  const links = document.querySelectorAll<HTMLElement>(".film-frame__link");
  let cardBottom = 0;
  let cardRight = 0;
  let found = false;

  links.forEach((link) => {
    const rect = link.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
    if (rect.bottom > footerTop + 8) return;

    found = true;
    if (rect.bottom > cardBottom) cardBottom = rect.bottom;
    if (rect.right > cardRight) cardRight = rect.right;
  });

  const closing = readClosingTaglineMetrics(footerTop);
  if (closing) {
    found = true;
    if (closing.cardBottom > cardBottom) cardBottom = closing.cardBottom;
    if (closing.cardRight > cardRight) cardRight = closing.cardRight;
  }

  return found ? { cardBottom, cardRight } : null;
}

function readArchiveRight(): number | null {
  const archive =
    document.querySelector(".film-archive--shorts-columns__grid") ??
    document.querySelector(".film-archive--shorts-grid__list") ??
    document.querySelector(".film-archive--feature-stack");

  const right = archive?.getBoundingClientRect().right;
  return right != null && Number.isFinite(right) ? right : null;
}

function readScrollRailLeft(): number | null {
  const rail = document.querySelector(".film-scroll-progress");
  if (rail) return rail.getBoundingClientRect().left;

  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;top:0;right:var(--scroll-rail-right);width:var(--scroll-rail-width);height:1px;visibility:hidden;pointer-events:none;";
  document.body.appendChild(probe);
  const left = probe.getBoundingClientRect().left;
  probe.remove();
  return Number.isFinite(left) ? left : null;
}

function readButtonPosition(buttonWidth: number): ButtonPosition | null {
  const footer = document.querySelector(".site-footer");
  const footerTop = footer?.getBoundingClientRect().top ?? window.innerHeight;
  const cards = readVisibleCardMetrics(footerTop);
  if (!cards) return null;

  const archiveRight = readArchiveRight() ?? cards.cardRight;
  const railLeft = readScrollRailLeft();
  if (railLeft == null) return null;

  const gutterSpan = Math.max(0, railLeft - archiveRight);
  const gutterCenter = archiveRight + gutterSpan * 0.68;
  let right = Math.max(0, window.innerWidth - gutterCenter - buttonWidth / 2);
  const bottom = Math.max(0, window.innerHeight - cards.cardBottom - BUTTON_DROP_PX);

  const railRect = readScrollRailRect();
  if (railRect) {
    right = clampLeftOfScrollRail(right, buttonWidth, railRect);
  }

  return { bottom, right };
}

export function FooterBackToTop() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<ButtonPosition | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);

  const updatePosition = useCallback(() => {
    const width = buttonRef.current?.offsetWidth ?? 48;
    setPosition(readButtonPosition(width));
  }, []);

  const schedulePositionUpdate = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updatePosition();
    });
  }, [updatePosition]);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = entry.isIntersecting && entry.intersectionRatio >= 0.06;
        setVisible(show);
        if (show) schedulePositionUpdate();
      },
      {
        threshold: [0, 0.06, 0.12, 0.25],
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [schedulePositionUpdate]);

  useEffect(() => {
    if (!visible) return;

    updatePosition();
    window.addEventListener("scroll", schedulePositionUpdate, { passive: true });
    window.addEventListener("resize", schedulePositionUpdate);

    const archive = document.querySelector(".film-archive");
    const closing = document.querySelector(".home-tagline--closing");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedulePositionUpdate)
        : null;
    if (archive) resizeObserver?.observe(archive);
    if (closing) resizeObserver?.observe(closing);

    return () => {
      window.removeEventListener("scroll", schedulePositionUpdate);
      window.removeEventListener("resize", schedulePositionUpdate);
      resizeObserver?.disconnect();
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [visible, updatePosition, schedulePositionUpdate]);

  const scrollToTop = useCallback(() => {
    scrollPageToTop(reduceMotion);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          ref={buttonRef}
          type="button"
          className="footer-back-to-top"
          onClick={scrollToTop}
          data-interactive
          style={
            position
              ? { bottom: `${position.bottom}px`, right: `${position.right}px` }
              : undefined
          }
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }
          }
          aria-label="Back to top"
        >
          <span className="footer-back-to-top__arrow" aria-hidden>
            ↑
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
