export const chapters = [
  { id: "arrival", label: "The invitation", number: "00", progress: 0 },
  { id: "threshold", label: "An open door", number: "01", progress: 0.23 },
  { id: "portraits", label: "Family secrets", number: "02", progress: 0.43 },
  { id: "banquet", label: "The extra guest", number: "03", progress: 0.61 },
  { id: "seance", label: "The moon garden", number: "04", progress: 0.79 },
  { id: "departure", label: "The first light", number: "05", progress: 1 },
] as const;
export const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
export const smooth = (a: number, b: number, value: number) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const cameraStops = [
  [0, 0, 3.3, 14, 0, 2.5, 0],
  [0.14, 0, 2.7, 7, 0, 2.5, -5],
  [0.28, 0, 2.55, -4, 0, 2.6, -13],
  [0.44, 0.35, 2.7, -16, -0.4, 2.5, -24],
  [0.62, -0.25, 3.35, -29, 0, 2.3, -37],
  [0.79, 0, 3.25, -42, 0, 2.6, -49],
  [1, 0, 3.1, -52, 0, 2.5, -61],
];
export function cameraAt(progress: number) {
  const p = clamp(progress);
  const i = cameraStops.findIndex(
    (stop, index) =>
      index < cameraStops.length - 1 && p <= cameraStops[index + 1][0],
  );
  const a = cameraStops[Math.max(0, i)],
    b = cameraStops[Math.min(cameraStops.length - 1, Math.max(0, i) + 1)];
  const t = smooth(a[0], b[0], p);
  return a.slice(1).map((n, j) => n + (b[j + 1] - n) * t);
}

// The transom and the moving leaves never occupy the same vertical interval.
export const doorProfile = {
  spring: 4.3,
  top: 6.4,
  leafBottom: 0.04,
  leafTop: 4.22,
  transomBottom: 4.24,
};
export function archPoint(
  width: number,
  height: number,
  t: number,
): [number, number] {
  const r = width / 2,
    spring = height - r,
    distance = clamp(t) * (2 * spring + Math.PI * r);
  if (distance < spring) return [-r, distance];
  if (distance < spring + Math.PI * r) {
    const a = Math.PI - (distance - spring) / r;
    return [Math.cos(a) * r, spring + Math.sin(a) * r];
  }
  return [r, 2 * spring + Math.PI * r - distance];
}
