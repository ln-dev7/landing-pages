"use client";

import { useRef, ElementType, ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface RevealHeadlineProps {
  children: string;
  as?: ElementType;
  className?: string;
  id?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  mutedFrom?: number;
}

export function RevealHeadline({
  children,
  as: Component = "h2",
  className,
  id,
  stagger = 0.07,
  delay = 0,
  amount = 0.5,
  mutedFrom,
}: RevealHeadlineProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const tokens = children.split(/(\s+)/);
  const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <Component ref={ref} id={id} className={className}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return <span key={`s-${i}`}> </span>;
        }

        const wordIndex = tokens
          .slice(0, i)
          .filter((t) => !/^\s+$/.test(t)).length;
        const isMuted = mutedFrom !== undefined && wordIndex >= mutedFrom;

        return (
          <span
            key={`w-${i}`}
            className="relative inline-block overflow-hidden align-baseline pb-[0.15em]"
          >
            <span
              className={`relative ${
                isMuted ? "text-foreground/35" : "text-foreground"
              }`}
            >
              {token}
            </span>
            <motion.span
              aria-hidden="true"
              initial={{ y: "0%" }}
              animate={inView ? { y: "110%" } : { y: "0%" }}
              transition={{ ...transition, delay: delay + wordIndex * stagger }}
              className="absolute inset-x-0 -top-[0.05em] -bottom-[0.2em] bg-background will-change-transform"
            />
          </span>
        );
      })}
    </Component>
  );
}
