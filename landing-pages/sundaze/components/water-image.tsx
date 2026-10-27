"use client";
import { useEffect, useRef, useState } from "react";
import type { RippleInstance } from "./canvasui/Ripple";

/** Canvas UI Ripple, using the photo as its texture on every WebGL2 browser. */
export function WaterImage({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = host.current;
    const surface = el?.parentElement;
    if (!el || !surface) return;
    let disposed = false;
    let loading = false;
    let visible = false;
    let generation = 0;
    let instance: RippleInstance | null = null;
    let output: HTMLCanvasElement | undefined;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    async function initialize() {
      if (loading || instance || disposed || media.matches) return;
      loading = true;
      const current = ++generation;
      try {
        const [{ createRipple }, image] = await Promise.all([
          import("./canvasui/Ripple"),
          (async () => {
            const image = new Image();
            image.src = src;
            await image.decode();
            return image;
          })(),
        ]);
        if (disposed || media.matches || current !== generation) return;
        output = document.createElement("canvas");
        output.setAttribute("aria-hidden", "true");
        Object.assign(output.style, {
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
        });
        el!.appendChild(output);
        instance = createRipple(
          {
            source: document.createElement("canvas"),
            content: surface!,
            output,
            image,
          },
          {
            trigger: "click",
            interval: 0,
            amplitude: 0.5,
            speed: 0.65,
            wavelength: 80,
            rings: 2,
            decay: 1,
            refraction: 100,
            dispersion: 0.5,
            shine: 0.5,
          },
        );
        setReady(Boolean(instance));
        if (!instance) output.remove();
      } catch {
        if (!disposed) setReady(false);
        output?.remove();
      } finally {
        loading = false;
      }
    }
    function sync() {
      if (media.matches) {
        generation++;
        instance?.destroy();
        instance = null;
        output?.remove();
        setReady(false);
      } else if (visible) void initialize();
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) void initialize();
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    media.addEventListener("change", sync);
    return () => {
      disposed = true;
      generation++;
      observer.disconnect();
      media.removeEventListener("change", sync);
      instance?.destroy();
      output?.remove();
    };
  }, [src]);
  return (
    <div
      ref={host}
      className={`water-image ${ready ? "water-ready" : ""} ${className}`}
      aria-hidden="true"
    />
  );
}
