"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "I appreciate the consistent reminders to be kind and patient with myself as I learn and practice daily habits that are helping me find a calmer daily space.",
    name: "Stephanie Worse",
    role: "Member on forming more helpful habits",
    avatar: "/avatar-1.webp",
  },
  {
    id: 2,
    quote:
      "MindScript helped me realize that slowing down isn't giving up — it's how I finally started making real progress with my mental health.",
    name: "Daniel Frey",
    role: "Member on learning to think in more helpful ways",
    avatar: "/avatar-2.webp",
  },
  {
    id: 3,
    quote:
      "The journal prompts gave me language for feelings I didn't know how to express. I look forward to my morning reflection now more than my coffee.",
    name: "Amara Singh",
    role: "Member on building a reflective morning routine",
    avatar: "/avatar-3.webp",
  },
  {
    id: 4,
    quote:
      "I was skeptical at first, but after three weeks of guided prompts I noticed a real shift in how I respond to stress. This is a game-changer.",
    name: "Marcus Hale",
    role: "Member on managing stress through writing",
    avatar: "/avatar-4.webp",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goUp = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goDown = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const current = testimonials[currentIndex];
  const next = testimonials[(currentIndex + 1) % testimonials.length];

  return (
    <section
      id="testimonials"
      className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 lg:py-28"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 sm:gap-14 lg:gap-20">
        {/* Left Column — Text */}
        <div className="flex-1 lg:max-w-[480px] xl:max-w-[520px]">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#163327] bg-[#e8eee6] border border-[#d3ded0] mb-5 sm:mb-6">
            Testimonials
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight text-[#121c17] leading-[1.1] mb-4 sm:mb-5">
            Reflections From
            <br />
            Our{" "}
            <span className="font-serif italic font-normal text-[#163327]">
              Community
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#55665d] leading-relaxed max-w-sm sm:max-w-md mb-10 sm:mb-14 lg:mb-20">
            Our users share how small moments of reflection brought lasting
            clarity.
          </p>

          <div>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#121c17]">
              50k+
            </span>
            <span className="text-xs sm:text-sm lg:text-base text-[#55665d] mt-1 block">
              Members are enjoying happier
            </span>
          </div>
        </div>

        {/* Right Column — Card Carousel */}
        <div className="flex-1 w-full lg:max-w-[580px] xl:max-w-[620px] relative">
          {/* Navigation Arrows — mobile: bottom center, desktop: top-right */}
          <div className="hidden lg:flex absolute right-0 -top-1 z-30 flex-col gap-2.5">
            <button
              type="button"
              onClick={goUp}
              className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-[#163327] hover:bg-[#1f4233] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowUp className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={goDown}
              className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-[#163327] hover:bg-[#1f4233] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowDown className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Card Stack Container */}
          <div className="relative h-[380px] sm:h-[440px] lg:h-[480px]">
            {/* Background Image Card */}
            <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] lg:rounded-[34px] overflow-hidden shadow-2xl bg-[#1a2e23]">
              <Image
                src="/testimonial-bg.webp"
                alt="Peaceful water reflection"
                fill
                className="object-cover object-center opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a14]/60 to-transparent" />
            </div>

            {/* Main Testimonial Card (Floating) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute bottom-14 sm:bottom-16 left-3 right-3 sm:left-5 sm:right-14 lg:left-6 lg:right-16 z-20"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] p-4 sm:p-5 lg:p-7 shadow-xl">
                  <p className="text-[13px] sm:text-sm lg:text-[15px] text-[#1b2b22] leading-relaxed mb-4 sm:mb-5">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover flex-shrink-0 sm:w-10 sm:h-10"
                    />
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-[#121c17]">
                        {current.name}
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#55665d]">
                        {current.role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Peeking Next Card */}
            <div className="absolute bottom-1.5 sm:bottom-2 left-5 right-5 sm:left-7 sm:right-16 lg:left-8 lg:right-18 z-10">
              <div className="bg-white/55 backdrop-blur-sm rounded-[16px] sm:rounded-[20px] lg:rounded-[22px] px-4 sm:px-5 lg:px-7 py-3 sm:py-3.5 shadow-md">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Image
                    src={next.avatar}
                    alt={next.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover flex-shrink-0 opacity-70 sm:w-9 sm:h-9"
                  />
                  <span className="text-[11px] sm:text-xs text-[#55665d] truncate">
                    {next.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Arrows — centered below */}
          <div className="flex lg:hidden justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={goUp}
              className="w-11 h-11 rounded-full bg-[#163327] hover:bg-[#1f4233] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goDown}
              className="w-11 h-11 rounded-full bg-[#163327] hover:bg-[#1f4233] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
