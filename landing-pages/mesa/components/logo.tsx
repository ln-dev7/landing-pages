export function Logo({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "logo-mark logo-mark-sm" : "logo-mark"} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <circle cx="12" cy="12" r="6.2" fill="none" stroke="var(--logo-ring, #ffb547)" strokeWidth="2.2" />
      <path d="M5.2 5.6v4.2M7.2 5.6v4.2M6.2 9.8v8.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18.6 5.6c-1.6 1-2 3.2-2 5.2h2v7.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
