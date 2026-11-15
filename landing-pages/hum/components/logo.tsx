export function Logo({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "logo-mark logo-mark-sm" : "logo-mark"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.6 4.2c-.5.4-1.2.1-1.2-.5V16h0A1.5 1.5 0 0 1 4 14.5z" fill="currentColor" />
      <path d="M8 9.6c1.3-1.6 2.7-1.6 4 0s2.7 1.6 4 0" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}
