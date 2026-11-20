"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface TeamBannerSectionProps {
  imageSrc?: string;
}

export function TeamBannerSection({
  imageSrc = "/team-running.webp",
}: TeamBannerSectionProps) {
  return (
    <section id="team" className="relative w-full min-h-[540px] sm:min-h-[620px] lg:min-h-[700px] xl:min-h-[760px] flex items-center overflow-hidden bg-[#132219] scroll-mt-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Licensed mental health professional running under blue sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_30%] sm:object-[85%_25%] lg:object-[90%_20%] filter brightness-[0.95] contrast-[1.04]"
        />

        {/* Tailored Vignette — protects text on the left without covering the runner on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal text-white leading-[1.28] tracking-tight mb-8 sm:mb-10"
          >
            We Are A Team Of Licensed Mental Health Professionals Dedicated To
            Helping Individuals Overcome Emotional Challenges, Build Resilience,
            And Improve Overall Well-Being.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#d7f943] hover:bg-[#c6e835] text-[#0d1711] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Let&apos;s Talk with Us</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
