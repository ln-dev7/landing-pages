"use client";
import { useEffect } from "react";
export function ScrollChoreography() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const photos = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".club-photo,.morning-photo,.session-picture",
      ),
    );
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".wave-atlas,.kit-art,.quiz-paper,.morning-steps>div,.last-call",
      ),
    );
    panels.forEach((el) => el.classList.add("scroll-stage"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("stage-visible", e.isIntersecting),
        ),
      { threshold: 0.14 },
    );
    panels.forEach((el) => io.observe(el));
    let raf = 0;
    const paint = () => {
      raf = 0;
      const reduced = media.matches;
      photos.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const p = Math.max(
          -1,
          Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight),
        );
        el.style.setProperty("--photo-shift", `${reduced ? 0 : p * 65}px`);
      });
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero)
        hero.style.setProperty(
          "--hero-drift",
          `${reduced ? 0 : Math.min(scrollY * 0.08, 65)}px`,
        );
    };
    const update = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      media.removeEventListener("change", update);
      panels.forEach((el) =>
        el.classList.remove("scroll-stage", "stage-visible"),
      );
    };
  }, []);
  return null;
}
