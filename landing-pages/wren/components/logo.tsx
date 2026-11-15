export function Logo({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "logo-mark logo-mark-sm" : "logo-mark"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M3 13.2C3 8.4 7 5 12 5c3.1 0 5.4 1.2 6.8 3.1L22 7l-1.6 3.6c.4.8.6 1.7.6 2.6 0 4.2-3.8 6.8-9 6.8-3.3 0-6-1-7.6-2.9L2 18l1.4-2.9c-.3-.6-.4-1.2-.4-1.9z" fill="currentColor" />
      <circle cx="15.6" cy="10.4" r="1.3" fill="var(--accent)" />
      <path d="M7.5 14.5c2 1.3 5 1.3 7.3-.3" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
