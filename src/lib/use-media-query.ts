"use client";

import { useSyncExternalStore } from "react";

function subscribeMediaQuery(query: string, onStoreChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMediaQuery(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function usePrefersCoarsePointer() {
  return useMediaQuery("(pointer: coarse)");
}

export function useCustomCursorEnabled() {
  const coarse = usePrefersCoarsePointer();
  const reduced = usePrefersReducedMotion();
  return !coarse && !reduced;
}
