import { useId } from "react";

export function LaunchMark() {
  const raw = useId().replace(/:/g, "");
  const glass = `${raw}-glass`;
  const flame = `${raw}-flame`;
  const core = `${raw}-core`;

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
          <stop offset="55%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-primary)" />
        </linearGradient>
        <linearGradient id={core} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-fg)" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="34" fill={`url(#${glass})`} />
      <circle cx="36" cy="36" r="33.2" fill="none" stroke="var(--color-primary)" strokeOpacity="0.8" strokeWidth="1.2" />
      <circle cx="15" cy="22" r="0.8" fill="var(--color-fg)" />
      <circle cx="56" cy="18" r="0.7" fill="var(--color-accent)" />
      <circle cx="58" cy="44" r="0.6" fill="var(--color-fg)" />
      <g className="launch-mark-ship">
        <g className="launch-mark-plume">
          <path className="launch-mark-tongue launch-mark-tongue-l" fill={`url(#${flame})`} d="M32 47c-2 5-5 9-3.2 14 2.4-4 3.4-8 4.6-14-0.6 1-1 1-1.4 0Z" />
          <path className="launch-mark-tongue launch-mark-tongue-r" fill={`url(#${flame})`} d="M40 47c2 5 5 9 3.2 14-2.4-4-3.4-8-4.6-14 0.6 1 1 1 1.4 0Z" />
          <path className="launch-mark-tongue launch-mark-tongue-c" fill={`url(#${core})`} d="M33.2 46.2c0.8 6 1.6 11 2.8 15 1.2-4 2-9 2.8-15-1.6 1.6-4 1.6-5.6 0Z" />
          <circle className="launch-mark-ember launch-mark-ember-a" cx="34.2" cy="52" r="0.7" fill="var(--color-fg)" />
          <circle className="launch-mark-ember launch-mark-ember-b" cx="38" cy="50.5" r="0.55" fill="var(--color-primary)" />
        </g>
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
