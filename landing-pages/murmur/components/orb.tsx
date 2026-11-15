/**
 * A volumetric voice orb built from layered gradients. It breathes on its
 * own and swells with the `--level` custom property (0 to 1) set by its
 * parent while someone is speaking. Colours come from `--orb-a/b/c`.
 */
export function Orb({
  size = 280,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`orb ${className}`}
      style={{ "--orb-size": `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="orb-glow" />
      <span className="orb-core">
        <span className="orb-swirl" />
        <span className="orb-swirl orb-swirl-2" />
        <span className="orb-shine" />
      </span>
    </span>
  );
}
