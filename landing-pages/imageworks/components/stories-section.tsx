"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

interface StoryItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  photoUrl: string;
  caption: string;
}

const STORIES: StoryItem[] = [
  {
    quote:
      "We used to lose the first week of every campaign to sourcing. Now the art director writes the brief on Monday morning and we are choosing between finished options by lunch.",
    name: "Mara Lindqvist",
    role: "Head of Design",
    company: "Ruma Studio",
    photoUrl:
      "https://images.unsplash.com/photo-1785403241652-5289a59f6f86?w=1200&h=1400&q=80&auto=format&fit=crop",
    caption: "Spring campaign hero, first take.",
  },
  {
    quote:
      "The brand rules are the part nobody talks about. Safe areas and logo clearance simply hold, so I stopped checking and started directing.",
    name: "Tomas Reyes",
    role: "Creative Director",
    company: "Fieldnote",
    photoUrl:
      "https://images.unsplash.com/photo-1756992293716-b843700b5ab0?w=1200&h=1400&q=80&auto=format&fit=crop",
    caption: "Packaging series, twelve variations, one kept.",
  },
  {
    quote:
      "Every size the media plan asks for, reframed instead of cropped. Our production days went from three a month to none.",
    name: "Jonah Weiss",
    role: "Producer",
    company: "Sable & Co",
    photoUrl:
      "https://images.unsplash.com/photo-1776662958125-893f153f592a?w=1200&h=1400&q=80&auto=format&fit=crop",
    caption: "Out-of-home set, four formats from one render.",
  },
  {
    quote:
      "Legal signed off in an afternoon. Rights, data and provenance were already answered in writing before anyone asked.",
    name: "Elin Marsh",
    role: "Marketing Operations",
    company: "Northlane",
    photoUrl:
      "https://images.unsplash.com/photo-1731635793329-0fdd79d179db?w=1200&h=1400&q=80&auto=format&fit=crop",
    caption: "Editorial header, approved same day.",
  },
];

export function StoriesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const componentId = useId();
  const tablistRef = useRef<HTMLDivElement | null>(null);

  // Auto rotate every 7 seconds
  useEffect(() => {
    if (isInteracted || shouldReduceMotion) return;
    const timer = window.setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % STORIES.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [activeIdx, isInteracted, shouldReduceMotion]);

  const selectTab = useCallback((idx: number) => {
    setActiveIdx(idx);
    setIsInteracted(true);
  }, []);

  const currentStory = STORIES[activeIdx] ?? STORIES[0];

  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="scroll-mt-20 py-24 sm:py-32 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* Section Heading */}
        <SectionHeading
          id="stories-heading"
          title="Teams that stopped waiting on pictures."
          description="Design, brand and production leads on what changed once the images kept pace with the ideas."
        />

        <Reveal inView y={24} className="mt-12 lg:mt-14">
          <div
            onPointerEnter={() => setIsInteracted(true)}
            className="grid gap-6 rounded-2xl border border-border bg-muted p-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8"
          >
            {/* Left Content Column */}
            <div className="flex min-w-0 flex-col justify-between px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10 lg:pb-8">
              {/* Quote Block */}
              <div className="relative min-h-[14rem] sm:min-h-[12rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.blockquote
                    key={activeIdx}
                    id={`${componentId}-panel-${activeIdx}`}
                    role="tabpanel"
                    aria-labelledby={`${componentId}-tab-${activeIdx}`}
                    initial={
                      shouldReduceMotion ? undefined : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduceMotion ? undefined : { opacity: 0, y: -8 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <p className="font-serif text-[clamp(1.75rem,2.8vw,2.625rem)] leading-[1.15] tracking-[-0.015em] text-pretty text-foreground">
                      “{currentStory.quote}”
                    </p>
                    <footer className="mt-8 text-[15px]">
                      <span className="font-medium text-foreground">
                        {currentStory.name}
                      </span>
                      <span className="text-muted-foreground">
                        , {currentStory.role}, {currentStory.company}
                      </span>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Tab Navigation List */}
              <div
                ref={tablistRef}
                role="tablist"
                aria-label="Stories"
                className="-mx-6 mt-12 flex [scrollbar-width:none] gap-x-7 overflow-x-auto px-6 pt-5 whitespace-nowrap sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden border-t border-border/70"
              >
                {STORIES.map((item, idx) => {
                  const isSelected = idx === activeIdx;
                  return (
                    <button
                      key={item.company}
                      type="button"
                      role="tab"
                      id={`${componentId}-tab-${idx}`}
                      aria-selected={isSelected}
                      aria-controls={`${componentId}-panel-${idx}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => selectTab(idx)}
                      className={`relative -mt-5 shrink-0 rounded-sm pt-5 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer ${
                        isSelected
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="story-tab"
                          aria-hidden="true"
                          className="absolute inset-x-0 -top-px h-px bg-foreground"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 400, damping: 40 }
                          }
                        />
                      )}
                      {item.company}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Photo Column */}
            <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-background sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeIdx}
                  initial={
                    shouldReduceMotion ? undefined : { opacity: 0, scale: 1.03 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentStory.photoUrl}
                    alt={currentStory.caption}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm text-white/90 sm:p-6">
                    {currentStory.caption}
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
