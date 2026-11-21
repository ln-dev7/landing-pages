"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface DotFieldProps {
  stageId: string;
  className?: string;
  alpha?: number;
}

const smoothstep = (e: number) => e * e * (3 - 2 * e);
const clamp01 = (e: number) => (e < 0 ? 0 : e > 1 ? 1 : e);

function getThemeColors() {
  if (typeof document === "undefined") {
    return { color: "#ffffff", alpha: 0.32 };
  }
  const el = document.documentElement;
  const isDark = el.classList.contains("dark");
  const color =
    getComputedStyle(el).getPropertyValue("--foreground").trim() ||
    (isDark ? "#fafafa" : "#0a0a0a");
  return {
    color,
    alpha: isDark ? 0.32 : 0.22,
  };
}

export function DotField({ stageId, className, alpha = 1 }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = document.getElementById(stageId);
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement || stage;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let centerX = 0;
    let centerY = 0;
    let maxRadius = 1;
    let theme = getThemeColors();

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseInfluence = 0;
    let isHovering = 0;

    const resize = () => {
      const parentRect = parent.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      width = parentRect.width;
      height = parentRect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      centerX = width / 2;
      centerY = stageRect.top - parentRect.top + stageRect.height / 2;
      maxRadius = 0.78 * Math.hypot(width / 2, height / 2);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = theme.color;

      const progress = shouldReduceMotion
        ? 1
        : 1 - Math.pow(1 - clamp01((time - 0.35) / 2.6), 3);

      if (progress <= 0) return;

      const animatedRadius = progress * (maxRadius + 160);
      const wavePhase = (time / 5.5) * Math.PI * 2;
      const hasMouse = mouseInfluence > 0.001;

      const startX = centerX - 26 * Math.ceil(centerX / 26);
      const startY = centerY - 26 * Math.ceil(centerY / 26);

      for (let y = startY; y <= height + 26; y += 26) {
        for (let x = startX; x <= width + 26; x += 26) {
          const distToCenter = Math.hypot(x - centerX, y - centerY);
          const normalizedDist = distToCenter / maxRadius;
          if (normalizedDist > 1.2) continue;

          const edgeFade =
            Math.exp(-3 * normalizedDist * normalizedDist) *
            smoothstep(clamp01(y / 160)) *
            smoothstep(clamp01((height - y) / 160));

          let dotAlpha = theme.alpha * alpha * edgeFade;
          let dotRadius = 1.2;
          let renderX = x;
          let renderY = y;

          if (!shouldReduceMotion) {
            const wave = 0.5 + 0.5 * Math.sin(distToCenter / 110 - wavePhase);
            dotAlpha *= 0.55 + 0.45 * wave;
            dotRadius *= 1 + 0.3 * (wave - 0.5);
            dotAlpha *= clamp01((animatedRadius - distToCenter) / 140);

            if (hasMouse) {
              const dx = x - mouseX;
              const dy = y - mouseY;
              const distToMouse = Math.hypot(dx, dy);
              if (distToMouse < 170) {
                const factor = 1 - distToMouse / 170;
                const force = factor * factor * mouseInfluence;
                const offset = (14 * force) / (distToMouse || 1);
                renderX += dx * offset;
                renderY += dy * offset;
                dotRadius *= 1 + 1.1 * force;
                dotAlpha += 0.4 * force * (0.35 + 0.65 * edgeFade);
              }
            }
          }

          if (dotAlpha < 0.004) continue;

          ctx.globalAlpha = Math.min(1, Math.max(0, dotAlpha));
          ctx.beginPath();
          ctx.arc(renderX, renderY, dotRadius, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resizeObserver.observe(stage);

    const mutationObserver = new MutationObserver(() => {
      theme = getThemeColors();
      if (shouldReduceMotion) draw(0);
    });
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (shouldReduceMotion) {
      draw(0);
      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }

    let elapsed = 0;
    let lastTime = 0;
    let animId = 0;
    let isVisible = true;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const delta = Math.min(now - lastTime, 100) / 1000;
      lastTime = now;
      elapsed += delta;

      const smoothSpeed = 1 - Math.exp(-9 * delta);
      mouseX += (targetX - mouseX) * smoothSpeed;
      mouseY += (targetY - mouseY) * smoothSpeed;

      const influenceSpeed = 1 - Math.exp(-5 * delta);
      mouseInfluence += (isHovering - mouseInfluence) * influenceSpeed;

      draw(elapsed);
    };

    const stop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const start = () => {
      if (!animId && isVisible && !document.hidden) {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = parent.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      const inside =
        targetX >= 0 &&
        targetY >= 0 &&
        targetX <= rect.width &&
        targetY <= rect.height;

      if (inside && isHovering === 0) {
        mouseX = targetX;
        mouseY = targetY;
      }
      isHovering = inside ? 1 : 0;
    };

    const handlePointerLeave = () => {
      isHovering = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) start();
        else stop();
      },
      { rootMargin: "80px" }
    );
    intersectionObserver.observe(parent);

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [stageId, alpha, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 block size-full ${
        className ?? ""
      }`}
    />
  );
}
