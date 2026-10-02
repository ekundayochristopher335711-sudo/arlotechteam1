/** Arlotech mark: the original hexagon + chevron, recoloured to the new palette. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className="logo__mark">
      <rect width="48" height="48" rx="13" fill="var(--danfo)" />
      <path d="M24 10l12 7v14l-12 7-12-7V17z" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 23l12 7 12-7" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo__word">Arlotech</span>
    </span>
  );
}
