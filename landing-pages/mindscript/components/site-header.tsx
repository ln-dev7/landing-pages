import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "How We Help", href: "#help" },
    { label: "Journal Prompts", href: "#prompts" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="w-full max-w-[1680px] mx-auto px-3 sm:px-5 lg:px-6 pt-6 pb-4">
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            className="w-7 h-7 text-[#163327] transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="12" height="12" rx="3" fill="currentColor" />
            <rect x="16" width="12" height="12" rx="3" fill="currentColor" />
            <rect y="16" width="12" height="12" rx="3" fill="currentColor" />
            <rect x="16" y="16" width="12" height="12" rx="3" fill="currentColor" />
            <path
              d="M6 6L22 22"
              stroke="#f6f8f5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight text-[#163327]">
            MindScript
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#2d3a33] hover:text-[#163327] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center">
          <Link
            href="#start"
            className="inline-flex items-center gap-2.5 bg-[#9cb098] hover:bg-[#8ea38a] text-white pl-5 pr-2 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-sm hover:shadow"
          >
            <span>Start Now</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#163327] text-white">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
