"use client";

import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const DAHLIAS_PHOTO = "/images/dahlias.jpg";

interface FormatItem {
  name: string;
  ratio: string;
  aspectClass: string;
  flexClass: string;
  objectPos: string;
  alt: string;
}

const FORMATS: FormatItem[] = [
  {
    name: "Banner",
    ratio: "16:9",
    aspectClass: "aspect-[16/9]",
    flexClass: "lg:flex-[1.7777777777777777_1_0%]",
    objectPos: "object-[50%_40%]",
    alt: "Pink dahlias in motion, framed for a banner at 16:9.",
  },
  {
    name: "Feed",
    ratio: "1:1",
    aspectClass: "aspect-[1/1]",
    flexClass: "lg:flex-[1.0_1_0%]",
    objectPos: "object-[50%_50%]",
    alt: "Pink dahlias in motion, framed for a feed at 1:1.",
  },
  {
    name: "Portrait",
    ratio: "4:5",
    aspectClass: "aspect-[4/5]",
    flexClass: "lg:flex-[0.8_1_0%]",
    objectPos: "object-[55%_50%]",
    alt: "Pink dahlias in motion, framed for a portrait at 4:5.",
  },
  {
    name: "Story",
    ratio: "9:16",
    aspectClass: "aspect-[9/16]",
    flexClass: "lg:flex-[0.5625_1_0%]",
    objectPos: "object-[52%_45%]",
    alt: "Pink dahlias in motion, framed for a story at 9:16.",
  },
];

export function FormatsSection() {
  return (
    <section
      id="formats"
      aria-labelledby="formats-heading"
      className="scroll-mt-20 py-24 sm:py-32 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* Section Heading */}
        <SectionHeading
          id="formats-heading"
          title="Every size in the plan, from the same take."
          description="Reframed by the model rather than cropped, so the subject is recomposed for each format and nothing important falls off the edge."
        />

        {/* 4 Format Cards Grid / Horizontal Scroll on Mobile */}
        <Reveal inView y={24} className="mt-12 lg:mt-14">
          <ul className="-mx-4 flex [scrollbar-width:none] gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:gap-5 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {FORMATS.map((item) => (
              <li
                key={item.name}
                className={`min-w-0 flex-none ${item.flexClass}`}
              >
                <figure className="group flex flex-col">
                  {/* Aspect Container */}
                  <div
                    className={`relative isolate h-[180px] w-auto [transform:translateZ(0)] overflow-hidden rounded-2xl bg-muted sm:h-[260px] lg:h-auto lg:w-full ${item.aspectClass}`}
                  >
                    <Image
                      src={DAHLIAS_PHOTO}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.03] ${item.objectPos}`}
                    />
                  </div>

                  {/* Caption */}
                  <figcaption className="mt-4 flex items-baseline justify-between text-[15px]">
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {item.ratio}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
