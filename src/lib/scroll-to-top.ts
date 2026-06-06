"use client";

const TOP_EPSILON_PX = 4;
const MIN_DURATION_MS = 1800;
const MAX_DURATION_MS = 3400;
const MS_PER_PX = 0.42;
const BYPASS_BUFFER_MS = 600;

let bypassArchiveSnapUntil = 0;
let cancelActiveScroll: (() => void) | null = null;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function scrollDurationForDistance(distance: number): number {
  return Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, distance * MS_PER_PX));
}

export function beginScrollToTop(durationMs: number): void {
  bypassArchiveSnapUntil = Date.now() + durationMs + BYPASS_BUFFER_MS;
  document.documentElement.style.scrollSnapType = "none";
}

export function shouldBypassArchiveSnap(): boolean {
  return Date.now() < bypassArchiveSnapUntil;
}

export function restoreScrollSnap(): void {
  document.documentElement.style.scrollSnapType = "";
  bypassArchiveSnapUntil = 0;
}

function finishScrollToTop(): void {
  if (window.scrollY > TOP_EPSILON_PX) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
  restoreScrollSnap();
  cancelActiveScroll = null;
}

function animateScrollToTop(onComplete: () => void): () => void {
  const startY = window.scrollY;
  if (startY <= TOP_EPSILON_PX) {
    onComplete();
    return () => {};
  }

  const duration = scrollDurationForDistance(startY);
  const startTime = performance.now();
  let rafId = 0;

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = easeOutCubic(progress);
    window.scrollTo(0, Math.round(startY * (1 - eased)));

    if (progress < 1) {
      rafId = window.requestAnimationFrame(step);
      return;
    }

    window.scrollTo(0, 0);
    onComplete();
  };

  rafId = window.requestAnimationFrame(step);

  return () => {
    window.cancelAnimationFrame(rafId);
  };
}

export function scrollPageToTop(instant = false): void {
  cancelActiveScroll?.();

  if (instant || window.scrollY <= TOP_EPSILON_PX) {
    beginScrollToTop(0);
    finishScrollToTop();
    return;
  }

  const duration = scrollDurationForDistance(window.scrollY);
  beginScrollToTop(duration);

  cancelActiveScroll = animateScrollToTop(() => {
    finishScrollToTop();
  });
}
