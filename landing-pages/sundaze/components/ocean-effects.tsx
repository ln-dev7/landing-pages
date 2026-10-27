"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const Liquid = dynamic(() => import("./canvasui/Liquid"), { ssr: false });
const Ripple = dynamic(() => import("./canvasui/Ripple"), { ssr: false });

// Only decorative layers enter the experimental canvas subtree. All interactive
// controls and readable content stay in the ordinary DOM on every browser.
export function OceanEffects({
  kind,
  active = true,
}: {
  kind: "liquid" | "ripple";
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div ref={ref} className="ocean-effects" aria-hidden="true">
      {visible &&
        active &&
        !reduced &&
        (kind === "liquid" ? (
          <Liquid
            style={{ width: "100%", height: "100%" }}
            simResolution={64}
            dyeResolution={256}
            pressureIterations={12}
            color={[0.3, 0.85, 0.92]}
            intensity={0.8}
            blend={0.2}
            distortion={0.12}
            force={8}
            radius={0.2}
          >
            <div className="effect-surface" />
          </Liquid>
        ) : (
          <Ripple
            style={{ width: "100%", height: "100%" }}
            trigger="click"
            amplitude={0.8}
            speed={0.5}
            wavelength={24}
            rings={3}
            shine={0.5}
            dispersion={0}
            interval={0}
          >
            <div className="effect-surface" />
          </Ripple>
        ))}
    </div>
  );
}
