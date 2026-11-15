export function Logo({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "logo-mark logo-mark-sm" : "logo-mark"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 3.5h9.5L19 8v12.5H5z" fill="currentColor" />
      <path d="M14.5 3.5V8H19z" fill="var(--accent)" />
      <path d="M8 12h8M8 15.5h5.5" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
