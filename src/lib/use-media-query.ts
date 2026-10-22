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

const noopSubscribe = () => () => {};

/** False while rendering on the server and during hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
