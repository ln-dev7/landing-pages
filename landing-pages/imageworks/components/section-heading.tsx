"use client";

import React from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  id,
  title,
  description,
  aside,
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${
        className ?? ""
      }`}
    >
      <div>
        <Reveal inView>
          <h2
            id={id}
            className="max-w-3xl font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal inView delay={0.08}>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-pretty text-muted-foreground sm:text-base">
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal inView delay={0.16} className="shrink-0">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
