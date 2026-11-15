import { useId } from "react";

export function LaunchMark() {
  const raw = useId().replace(/:/g, "");
  const glass = `${raw}-glass`;
  const flame = `${raw}-flame`;

  return (
    <svg className="launch-mark" viewBox="0 0 72 72" aria-hidden>
      <defs>
        <radialGradient id={glass} cx="32%" cy="26%" r="72%">
          <stop offset="0%" stopColor="var(--color-fg)" stopOpacity="0.28" />
          <stop offset="46%" stopColor="var(--color-bg)" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <linearGradient id={flame} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
          <stop offset="40%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-fg)" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="34" fill={`url(#${glass})`} />
      <circle cx="36" cy="36" r="33.2" fill="none" stroke="var(--color-primary)" strokeOpacity="0.8" strokeWidth="1.2" />
      <circle cx="15" cy="22" r="0.8" fill="var(--color-fg)" />
      <circle cx="56" cy="18" r="0.7" fill="var(--color-accent)" />
      <circle cx="58" cy="44" r="0.6" fill="var(--color-fg)" />
      <g className="launch-mark-ship">
        <path className="launch-mark-flame" fill={`url(#${flame})`} d="M31.5 46.5c1.4 7 2.4 12 4.5 16 2.1-4 3.1-9 4.5-16-2.4 2.2-6.6 2.2-9 0Z" />
        <path fill="var(--color-accent)" d="M29.5 38.5 22 50.5h8.2Z" />
        <path fill="var(--color-accent)" d="M42.5 38.5 50 50.5h-8.2Z" />
        <path fill="var(--color-primary)" d="M30 27.5 36 13l6 14.5Z" />
        <rect x="30" y="26.5" width="12" height="20.5" rx="2" fill="var(--color-primary)" />
        <circle cx="36" cy="34" r="2.3" fill="var(--color-bg)" />
        <circle cx="36" cy="34" r="1.15" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
