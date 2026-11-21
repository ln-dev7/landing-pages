"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

export function ContactFooterSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiry: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#0c1811]">
      {/* Full-width Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/contact-bg.webp"
          alt="Hands holding white flower in rain"
          fill
          className="object-cover object-center filter brightness-[0.78] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#18261e]/75 via-[#101e16]/65 to-[#08120c]/88" />
      </div>

      {/* Content Container (Full Width with generous inner bounds) */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20">
            {/* Left Column — Contact Info */}
            <div className="flex-1 lg:max-w-[480px] text-white">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 border border-white/30 mb-6">
                Contact Us
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold tracking-tight leading-[1.1] mb-4 sm:mb-5">
                Come Back To{" "}
                <span className="font-serif italic font-normal">Yourself</span>
              </h2>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-sm mb-8 sm:mb-10">
                Get mindful updates, prompts, and mental wellness tips to support
                your daily self-care rituals.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-white/80" />
                  </span>
                  <div className="text-sm text-white/80 leading-relaxed">
                    <span className="block font-medium text-white/95">
                      MindScript Studio
                    </span>
                    42 Willow Lane, Brooklyn, NY 11211 United States
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white/80" />
                  </span>
                  <span className="text-sm text-white/80">+1 (646) 980-2043</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white/80" />
                  </span>
                  <span className="text-sm text-white/80">
                    support@mindscriptstudio.com
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </span>
                  <span className="text-sm text-white/80">@mindscriptstudio</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </span>
                  <span className="text-sm text-white/80">@mindscript.studio</span>
                </div>
              </div>
            </div>

            {/* Right Column — Contact Form */}
            <div className="flex-1 w-full lg:max-w-[560px]">
              <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-5 sm:p-7 lg:p-9 shadow-2xl"
              >
                {/* First + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#121c17] mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your First Name"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm bg-[#f4f7f4] border border-[#dce3da] rounded-xl text-[#121c17] placeholder:text-[#95a89a] focus:outline-none focus:border-[#163327] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#121c17] mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your Last Name"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm bg-[#f4f7f4] border border-[#dce3da] rounded-xl text-[#121c17] placeholder:text-[#95a89a] focus:outline-none focus:border-[#163327] transition-colors"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#121c17] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm bg-[#f4f7f4] border border-[#dce3da] rounded-xl text-[#121c17] placeholder:text-[#95a89a] focus:outline-none focus:border-[#163327] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#121c17] mb-1.5">
                      Contact Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-[#55665d] bg-[#edf1ec] border border-r-0 border-[#dce3da] rounded-l-xl">
                        +1
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="w-full px-4 py-2.5 sm:py-3 text-sm bg-[#f4f7f4] border border-[#dce3da] rounded-r-xl text-[#121c17] placeholder:text-[#95a89a] focus:outline-none focus:border-[#163327] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Enquiry */}
                <div className="mb-5 sm:mb-6">
                  <label className="block text-xs sm:text-sm font-semibold text-[#121c17] mb-1.5">
                    Your Enquiry
                  </label>
                  <textarea
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleChange}
                    placeholder="Your Enquiry"
                    rows={5}
                    className="w-full px-4 py-2.5 sm:py-3 text-sm bg-[#f4f7f4] border border-[#dce3da] rounded-xl text-[#121c17] placeholder:text-[#95a89a] focus:outline-none focus:border-[#163327] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2.5 bg-[#9cb098] hover:bg-[#8ea38a] text-white pl-6 pr-2.5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                >
                  <span>Submit</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#163327] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bar (without border line) */}
          <div className="mt-14 sm:mt-20 lg:mt-24 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-2">
            {/* Center / Left — Copyright */}
            <div className="text-center sm:text-left">
              <span className="block text-xs text-white/50 mb-0.5">
                &copy;2025 Mindscript
              </span>
              <span className="text-sm sm:text-base font-serif italic text-white/70 tracking-wide">
                Strong Mind, Steady Life
              </span>
            </div>

            {/* Right — Tagline */}
            <span className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-white/80 tracking-wide">
              Train hard, play hard.
            </span>
          </div>
        </div>

        {/* Monumental Edge-to-Edge Wordmark with natural glyph proportions */}
        <div className="relative z-10 w-full overflow-hidden leading-none select-none pointer-events-none mt-4 sm:mt-6">
          <svg
            viewBox="0 0 940 185"
            className="w-full h-auto block"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="470"
              y="155"
              textAnchor="middle"
              className="font-bold fill-[#8ea389]"
              style={{
                fontFamily: "var(--font-hanken), system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.035em",
              }}
              fontSize="195"
            >
              MindScript
            </text>
          </svg>
        </div>
    </section>
  );
}
