/** Ring highlight — interactive copy & controls */
export const ACTIVE_SELECTOR =
  "button, a, [data-interactive], h1, h2, h3, h4, h5, h6";

/** Always show play cursor (mailto CTAs, media surfaces, nav) */
export const PLAY_SELECTOR = [
  "button",
  ".site-nav-btn",
  ".film-frame__media",
  ".home-v2-hero__link",
  ".project-detail__trailer-frame",
  ".short-films-gallery__fallback-img",
  ".installation-media-root img",
  ".installation-media-root video",
  ".site-footer__social .site-footer__link",
  ".site-footer__email",
  ".contact-panel__email",
  ".studio-panel__team-photo-link",
  ".project-detail__nav-link",
  "[data-cursor-play]",
].join(", ");

export const PLAY_BLOCK_SELECTOR =
  ".film-frame__copy, .archive-statement, .studio-panel, .footer-back-to-top";

function isPointerHit(el: Element): boolean {
  if (!(el instanceof HTMLElement)) return false;
  if (el.closest(".custom-cursor-layer")) return false;
  return window.getComputedStyle(el).pointerEvents !== "none";
}

/** Topmost element under cursor that receives pointer events */
export function hitTarget(x: number, y: number): HTMLElement | null {
  for (const node of document.elementsFromPoint(x, y)) {
    if (isPointerHit(node) && node instanceof HTMLElement) return node;
  }
  return null;
}

export function isPlayTarget(el: HTMLElement | null): boolean {
  if (!el) return false;
  if (
    el.closest(
      ".studio-panel__team-photo-link, .contact-panel__email, .project-detail__nav-link",
    )
  ) {
    return true;
  }
  if (el.closest(PLAY_BLOCK_SELECTOR)) return false;
  return !!el.closest(PLAY_SELECTOR);
}

export function isActiveTarget(el: HTMLElement | null): boolean {
  if (!el) return false;
  return !!el.closest(ACTIVE_SELECTOR);
}
