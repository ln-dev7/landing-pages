import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SiteHeader() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Our Team", href: "#team" },
    { label: "Insights", href: "#insights" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="relative w-full z-30 pt-6 sm:pt-8 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Leaf / Sprout Stylized Icon */}
          <svg
            className="w-6 h-6 text-[#d7f943] transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
          <span className="text-xl sm:text-2xl font-medium tracking-tight text-[#d7f943]">
            Wellnest
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-light text-white/85 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div>
          <Link
            href="#demo"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-white/90 text-[#0c140e] px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <span>Book Demo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
