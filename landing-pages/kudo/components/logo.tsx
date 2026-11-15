export function Logo({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "logo-mark logo-mark-sm" : "logo-mark"} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="7" fill="currentColor" />
      <path
        d="M12 17.6s-5.4-3.1-5.4-7a2.9 2.9 0 0 1 5.4-1.5 2.9 2.9 0 0 1 5.4 1.5c0 3.9-5.4 7-5.4 7z"
        fill="var(--logo-heart, #ffd23f)"
      />
    </svg>
  );
}
