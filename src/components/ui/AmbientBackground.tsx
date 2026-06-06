"use client";

/** Static base texture (animated grain sits above this, below UI). */
export function AmbientBackground() {
  return (
    <div className="projection-stack" aria-hidden>
      <div className="projection-bg-wrap">
        <div className="projection-bg" />
      </div>
      <div className="projection-vignette" />
    </div>
  );
}
