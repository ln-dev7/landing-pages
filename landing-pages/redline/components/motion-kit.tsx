"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import NumberFlow, { type Format } from "@number-flow/react";
import { motion, useInView } from "motion/react";

export const spring = { type: "spring", bounce: 0.18, duration: 0.5 } as const;

/** A soft pill that slides between the options of a segmented control. */
export function Pill({
  id,
  className = "pill",
}: {
  id: string;
  className?: string;
}) {
  return (
    <motion.span
      layoutId={id}
      className={className}
      transition={spring}
      aria-hidden="true"
    />
  );
}

/** Number that counts up from zero the first time it scrolls into view. */
export function CountIn({
  value,
  format,
  prefix,
  suffix,
  className,
}: {
  value: number;
  format?: Format;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={inView ? value : 0}
        format={format}
        prefix={prefix}
        suffix={suffix}
        locales="en-US"
      />
    </span>
  );
}

/**
 * Scroll spy for the header. The last section whose top has passed the
 * header wins. Clicking a link selects it immediately and holds it until
 * the smooth scroll settles, so the pill never flickers through the
 * sections in between.
 */
export function useActiveSection(ids: string[], offset = 140) {
  const [active, setActive] = useState<string | null>(null);
  const hold = useRef<string | null>(null);
  const timer = useRef<number>(0);
  const key = ids.join(",");

  useEffect(() => {
    const list = key.split(",");
    const update = () => {
      if (hold.current) return;
      let current: string | null = null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    const release = () => {
      const id = hold.current;
      if (!id) return;
      // Only let go once the clicked section has actually arrived (or the
      // page cannot scroll any further).
      const top = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (Math.abs(top - offset) > offset && !atBottom) return;
      hold.current = null;
      update();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("scrollend", release);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("scrollend", release);
      window.removeEventListener("resize", update);
    };
  }, [key, offset]);

  const select = useCallback((id: string) => {
    hold.current = id;
    setActive(id);
    window.clearTimeout(timer.current);
    // Fallback for browsers without the scrollend event.
    timer.current = window.setTimeout(() => {
      hold.current = null;
    }, 1600);
  }, []);

  return { active, select };
}
