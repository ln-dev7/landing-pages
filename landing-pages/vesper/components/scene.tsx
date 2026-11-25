/* The dusk scene is drawn in code: the same seed gives the same hills,
   stars and blossom on the server and in the browser. */

function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const n = (v: number) => Math.round(v * 10) / 10;

function ridgePath(y: (x: number) => number, height: number, width = 1440) {
  let d = `M0,${height} L0,${n(y(0))}`;
  for (let x = 16; x <= width; x += 16) d += ` L${x},${n(y(x))}`;
  return `${d} L${width},${height} Z`;
}

export function Stars() {
  const r = seeded(7);
  const stars = Array.from({ length: 70 }, () => ({
    left: n(r() * 100),
    top: n(r() * 100),
    size: r() > 0.86 ? 3 : 2,
    delay: n(r() * 4),
  }));
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <i
          key={i}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hills({ className = "hills" }: { className?: string }) {
  const far = (x: number) => 150 + 40 * Math.sin(x / 260 + 1) + 18 * Math.sin(x / 97);
  const mid = (x: number) => 205 + 50 * Math.sin(x / 330 + 3) + 14 * Math.sin(x / 71 + 2);
  const near = (x: number) => 268 + 36 * Math.sin(x / 210 + 5) + 10 * Math.sin(x / 53);
  return (
    <svg className={className} viewBox="0 0 1440 380" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5180" />
          <stop offset="1" stopColor="#4c3268" />
        </linearGradient>
        <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#573669" />
          <stop offset="1" stopColor="#33244f" />
        </linearGradient>
      </defs>
      <path d={ridgePath(far, 380)} fill="url(#hill-far)" />
      <path d={ridgePath(mid, 380)} fill="url(#hill-mid)" />
      <path d={ridgePath(near, 380)} fill="#281e46" />
    </svg>
  );
}

const mass = ["#2c1a3f", "#3b2150", "#4b2759"];
const back = ["#6e3360", "#8a4273", "#a7557f"];
const front = ["#f8c3c6", "#f39db0", "#e47a96", "#f9cfb1", "#cc5c85"];

export function Bloom() {
  const r = seeded(42);
  const side = (x: number) => Math.abs(x - 720) / 720;
  const ridge = (x: number) => 256 - 140 * side(x) ** 2 + 14 * Math.sin(x / 90) + 7 * Math.sin(x / 37 + 1);
  const dots: { x: number; y: number; r: number; c: string }[] = [];
  // Each row plants round shrubs along the ridge. They grow taller towards
  // the edges, so the middle stays open for the window behind them.
  const row = (
    palette: string[],
    lift: number,
    scale: number,
    step: number,
    count: number,
    size: [number, number],
  ) => {
    for (let x = -40; x <= 1480; x += step * (0.7 + r() * 0.6)) {
      const radius = (42 + r() * 34) * scale * (0.5 + 1.05 * side(x));
      const cy = ridge(x) - radius * lift;
      const total = count * (0.7 + r() * 0.6) * (0.8 + side(x));
      for (let i = 0; i < total; i++) {
        const angle = r() * Math.PI * 2;
        const dist = Math.sqrt(r()) * radius;
        const dx = Math.cos(angle) * dist * 1.12;
        const dy = Math.sin(angle) * dist * 0.94;
        // Dusk light comes from behind: the top of each shrub is brighter.
        const lit = 1 - (dy + radius) / (radius * 2);
        const pick = Math.min(palette.length - 1, Math.floor((1 - lit) * palette.length + r() * 1.2));
        dots.push({
          x: n(x + dx),
          y: n(cy + dy),
          r: n(size[0] + r() * (size[1] - size[0])),
          c: palette[pick],
        });
      }
    }
  };
  row(mass, 0.5, 1.12, 46, 16, [11, 22]);
  row(back, 0.62, 1, 54, 22, [3.5, 9]);
  row(front, 0.42, 1.04, 48, 26, [3, 8.5]);
  return (
    <svg className="bloom" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="bloom-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.2" stopColor="#221a40" />
          <stop offset="0.85" stopColor="#12112a" />
        </linearGradient>
      </defs>
      <path d={ridgePath(ridge, 420)} fill="url(#bloom-ground)" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} />
      ))}
    </svg>
  );
}

export function Fireflies() {
  const r = seeded(11);
  const flies = Array.from({ length: 14 }, () => ({
    left: n(4 + r() * 92),
    bottom: n(3 + r() * 24),
    delay: n(r() * 8),
    time: n(7 + r() * 6),
  }));
  return (
    <div className="fireflies" aria-hidden="true">
      {flies.map((f, i) => (
        <i
          key={i}
          style={{
            left: `${f.left}%`,
            bottom: `${f.bottom}%`,
            animationDelay: `-${f.delay}s`,
            animationDuration: `${f.time}s`,
          }}
        />
      ))}
    </div>
  );
}
