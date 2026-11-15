export function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="murmur-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc285" />
          <stop offset="0.5" stopColor="#ff6f61" />
          <stop offset="1" stopColor="#8f75ff" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#murmur-logo)" />
      <path
        d="M7 13.5v-3M10 15.5v-7M14 16.5v-9M17 13.5v-3"
        stroke="#0b0c10"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}
