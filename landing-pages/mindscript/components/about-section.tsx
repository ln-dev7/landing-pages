"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface AboutSectionProps {
  cardLeftSrc?: string;
  cardCenterSrc?: string;
  cardRightSrc?: string;
}

export function AboutSection({
  cardLeftSrc = "/card-left.webp",
  cardCenterSrc = "/card-center.webp",
  cardRightSrc = "/card-right.webp",
}: AboutSectionProps) {
  const stats = [
    {
      percentage: "93%",
      titleNormal: "Feel More Mentally",
      titleItalic: "Clear",
      description:
        "Most users say daily writing helps organize thoughts and reduce overwhelm.",
    },
    {
      percentage: "87%",
      titleNormal: "Feel More",
      titleItalic: "Connected",
      description:
        "Through guided prompts, they gain insight into their emotions and needs.",
    },
    {
      percentage: "95%",
      titleNormal: "",
      titleItalic: "Self-Care Routine",
      description:
        "Small, daily steps turn into powerful routines for mental wellness.",
    },
  ];

  return (
    <section id="about" className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Header Pill & Titles with scroll entrance */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Pill Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#163327] bg-[#e8eee6] border border-[#d3ded0] mb-5">
          About Us
        </span>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-[#121c17] leading-[1.15]">
          Your Space to Feel, Reflect,{" "}
          <span className="font-serif italic font-normal text-4xl sm:text-6xl lg:text-[62px] text-[#163327]">
            and Grow
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-[#55665d] max-w-2xl leading-relaxed">
          We make mental health support accessible to everyone, no matter their background or experience.
        </p>
      </motion.div>

      {/* Triptych Photo Fan */}
      <div className="relative my-16 sm:my-24 flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
        {/* Card Left */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, rotate: -8 }}
          viewport={{ once: true }}
          whileHover={{ rotate: -4, scale: 1.03, zIndex: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[210px] h-[300px] sm:w-[270px] sm:h-[380px] lg:w-[310px] lg:h-[430px] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-xl -mr-12 sm:-mr-16 z-0 bg-[#d8ded5]"
        >
          <Image
            src={cardLeftSrc}
            alt="Mindful reflection"
            fill
            className="object-cover object-center"
          />
        </motion.div>

        {/* Card Center (Main / Elevated) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, y: -6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[240px] h-[340px] sm:w-[310px] sm:h-[440px] lg:w-[350px] lg:h-[490px] rounded-[28px] sm:rounded-[34px] overflow-hidden shadow-2xl z-10 border-4 border-[#f8faf8] bg-[#c5d1c2]"
        >
          <Image
            src={cardCenterSrc}
            alt="Growth and peaceful state"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* Card Right */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 8 }}
          viewport={{ once: true }}
          whileHover={{ rotate: 4, scale: 1.03, zIndex: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[210px] h-[300px] sm:w-[270px] sm:h-[380px] lg:w-[310px] lg:h-[430px] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-xl -ml-12 sm:-ml-16 z-0 bg-[#d8ded5]"
        >
          <Image
            src={cardRightSrc}
            alt="Peaceful nature waters"
            fill
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Stats Grid with staggered scroll entrance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto text-center px-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Number */}
            <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#121c17] mb-2">
              {stat.percentage}
            </span>

            {/* Metric Title */}
            <h3 className="text-lg sm:text-xl font-medium text-[#121c17] mb-2.5">
              {stat.titleNormal && <span>{stat.titleNormal} </span>}
              <span className="font-serif italic font-normal text-[#163327]">
                {stat.titleItalic}
              </span>
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#55665d] leading-relaxed max-w-xs">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Learn More CTA */}
      <div className="flex justify-center mt-14 sm:mt-18">
        <Link
          href="#learn-more"
          className="inline-flex items-center gap-3 bg-[#9cb098] hover:bg-[#8ea38a] text-white pl-6 pr-2.5 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow"
        >
          <span>Learn More</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#163327] text-white">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
