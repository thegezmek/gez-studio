"use client";

import { useEffect, type RefObject } from "react";
import { shouldBypassArchiveSnap } from "@/lib/scroll-to-top";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

const SNAP_MIN_DELTA_PX = 6;
const SNAP_COOLDOWN_MS = 480;
const SETTLED_EPSILON_PX = 32;
const ZONE_BEFORE_FIRST_PX = 120;
/** In the final gap, commit to the last card unless scrolling up. */
const LAST_SEGMENT_COMMIT = 0.38;

function getStickyTopPx(): number {
  const probe = document.querySelector<HTMLElement>(
    ".film-archive--feature-stack .film-frame",
  );
  if (!probe) return 80;
  const top = parseFloat(getComputedStyle(probe).top);
  return Number.isFinite(top) ? top : 80;
}

function getFrames(archive: HTMLElement): HTMLElement[] {
  return Array.from(
    archive.querySelectorAll<HTMLElement>(".film-frame[data-film-id]"),
  );
}

function getArchiveDocumentTop(archive: HTMLElement): number {
  return archive.getBoundingClientRect().top + window.scrollY;
}

/** Flow-based targets — stable regardless of sticky state. */
function getFeatureSnapTargets(
  archive: HTMLElement,
  stickyTop: number,
): number[] {
  const frames = getFrames(archive);
  const archiveTop = getArchiveDocumentTop(archive);
  const padTop = parseFloat(getComputedStyle(archive).paddingTop) || 0;
  let flowY = archiveTop + padTop;

  return frames
    .map((frame) => {
      const link =
        frame.querySelector<HTMLElement>(".film-frame__link") ?? frame;
      const target = flowY + link.offsetTop - stickyTop;
      flowY += frame.offsetHeight;
      return target;
    })
    .filter((value) => Number.isFinite(value));
}

function alignLinkToSticky(
  archive: HTMLElement,
  frameIndex: number,
  stickyTop: number,
): number {
  const frame = getFrames(archive)[frameIndex];
  if (!frame) return window.scrollY;

  const link =
    frame.querySelector<HTMLElement>(".film-frame__link") ?? frame;
  const delta = link.getBoundingClientRect().top - stickyTop;
  return window.scrollY + delta;
}

type ScrollDirection = "up" | "down" | "none";

function isSettledOnTarget(
  scrollY: number,
  target: number,
  epsilon = SETTLED_EPSILON_PX,
): boolean {
  return Math.abs(scrollY - target) <= epsilon;
}

function pickTargetIndex(
  scrollY: number,
  targets: number[],
  direction: ScrollDirection,
): number {
  if (targets.length === 0) return 0;
  if (targets.length === 1) return 0;

  const last = targets.length - 1;

  if (direction !== "up" && last > 0) {
    const lastSegmentStart =
      targets[last - 1] +
      (targets[last] - targets[last - 1]) * LAST_SEGMENT_COMMIT;
    if (scrollY >= lastSegmentStart) {
      return last;
    }
  }

  if (direction === "down") {
    for (let index = 0; index < targets.length - 1; index += 1) {
      const mid = (targets[index] + targets[index + 1]) / 2;
      if (scrollY < mid) return index;
    }
    return last;
  }

  if (direction === "up") {
    for (let index = targets.length - 1; index > 0; index -= 1) {
      const mid = (targets[index - 1] + targets[index]) / 2;
      if (scrollY > mid) return index;
    }
    return 0;
  }

  let bestIndex = 0;
  let bestDistance = Infinity;
  for (let index = 0; index < targets.length; index += 1) {
    const distance = Math.abs(scrollY - targets[index]);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }
  return bestIndex;
}

function disableCssScrollSnap(): void {
  document.documentElement.style.scrollSnapType = "none";
}

function restoreCssScrollSnap(): void {
  document.documentElement.style.scrollSnapType = "";
}

export function useArchiveScrollSnap(
  archiveRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const archive = archiveRef.current;
    if (!archive) return;

    let verifyTimer: ReturnType<typeof setTimeout> | null = null;
    let cooldownTimer: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;
    let lastScrollY = window.scrollY;
    let scrollDirection: ScrollDirection = "none";

    const noteScrollDirection = (nextY: number) => {
      const delta = nextY - lastScrollY;
      if (Math.abs(delta) >= 1) {
        scrollDirection = delta > 0 ? "down" : "up";
      }
      lastScrollY = nextY;
    };

    const performSnap = (targetY: number, frameIndex: number, stickyTop: number) => {
      const liveTarget = alignLinkToSticky(archive, frameIndex, stickyTop);
      const target = Number.isFinite(liveTarget) ? liveTarget : targetY;
      const distance = Math.abs(window.scrollY - target);

      if (distance <= SNAP_MIN_DELTA_PX) {
        scrollDirection = "none";
        return;
      }

      isSnapping = true;
      disableCssScrollSnap();
      window.scrollTo({ top: target, behavior: "smooth" });

      if (verifyTimer) clearTimeout(verifyTimer);
      verifyTimer = setTimeout(() => {
        const correction = alignLinkToSticky(archive, frameIndex, stickyTop);
        if (
          !shouldBypassArchiveSnap() &&
          Number.isFinite(correction) &&
          Math.abs(window.scrollY - correction) > SNAP_MIN_DELTA_PX
        ) {
          window.scrollTo({ top: correction, behavior: "auto" });
        }
        isSnapping = false;
        restoreCssScrollSnap();
        scrollDirection = "none";
      }, SNAP_COOLDOWN_MS);

      if (cooldownTimer) clearTimeout(cooldownTimer);
      cooldownTimer = setTimeout(() => {
        isSnapping = false;
      }, SNAP_COOLDOWN_MS);
    };

    const snapOnRest = () => {
      if (isSnapping || shouldBypassArchiveSnap()) return;

      const scrollY = window.scrollY;
      const stickyTop = getStickyTopPx();
      const targets = getFeatureSnapTargets(archive, stickyTop);
      if (targets.length === 0) return;

      const lastIndex = targets.length - 1;
      const lastTarget = targets[lastIndex];
      const zoneTop = targets[0] - ZONE_BEFORE_FIRST_PX;

      if (scrollY < zoneTop || scrollY > lastTarget + SETTLED_EPSILON_PX) {
        scrollDirection = "none";
        return;
      }

      const targetIndex = pickTargetIndex(scrollY, targets, scrollDirection);
      const stableTarget = targets[targetIndex];

      if (isSettledOnTarget(scrollY, stableTarget)) {
        const liveTarget = alignLinkToSticky(archive, targetIndex, stickyTop);
        if (
          !Number.isFinite(liveTarget) ||
          isSettledOnTarget(scrollY, liveTarget)
        ) {
          scrollDirection = "none";
          return;
        }
      }

      performSnap(stableTarget, targetIndex, stickyTop);
    };

    const onScroll = () => {
      if (!isSnapping) {
        noteScrollDirection(window.scrollY);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) >= 1) {
        scrollDirection = event.deltaY > 0 ? "down" : "up";
      }
    };

    const onScrollEnd = () => snapOnRest();
    const onTouchEnd = () => snapOnRest();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchend", onTouchEnd);
      if (verifyTimer) clearTimeout(verifyTimer);
      if (cooldownTimer) clearTimeout(cooldownTimer);
      restoreCssScrollSnap();
    };
  }, [archiveRef, enabled, reduceMotion]);
}
