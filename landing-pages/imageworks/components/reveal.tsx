"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  inView = false,
  when = true,
  scale,
  duration = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  inView?: boolean;
  when?: boolean;
  scale?: number;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const initial =
    scale === undefined ? { opacity: 0, y } : { opacity: 0, y, scale };
  const target =
    scale === undefined ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={!shouldReduceMotion && initial}
      {...(inView
        ? { whileInView: target, viewport: { once: true, margin: "-80px" } }
        : { animate: when || shouldReduceMotion ? target : initial })}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
