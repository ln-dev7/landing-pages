export function Logo({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "logo-mark logo-mark-sm" : "logo-mark"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 1.5v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 7.5l6.5 7.2L12 22.5l-6.5-7.8z" fill="currentColor" />
      <path d="M12 7.5l6.5 7.2h-13z" fill="var(--blue)" />
    </svg>
  );
}
