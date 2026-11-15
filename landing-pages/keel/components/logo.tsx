export function Logo({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "logo-mark logo-mark-sm" : "logo-mark"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M3 13.5h18l-3.2 6.2a2 2 0 0 1-1.8 1.1H8a2 2 0 0 1-1.8-1.1z" fill="currentColor" />
      <path d="M12.6 2.5v9h6.2z" fill="var(--accent)" />
      <path d="M11 5.5v6H6.6z" fill="currentColor" opacity=".55" />
    </svg>
  );
}
