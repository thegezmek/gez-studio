const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconPrev() {
  return (
    <svg {...iconProps}>
      <path d="M14 6l-6 6 6 6" />
    </svg>
  );
}

export function IconNext() {
  return (
    <svg {...iconProps}>
      <path d="M10 6l6 6-6 6" />
    </svg>
  );
}

export function IconPause() {
  return (
    <svg {...iconProps}>
      <path d="M9 7v10M15 7v10" />
    </svg>
  );
}

export function IconPlay() {
  return (
    <svg {...iconProps}>
      <path d="M9 7.5v9l8-4.5-8-4.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
