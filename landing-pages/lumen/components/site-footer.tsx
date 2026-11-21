import Link from "next/link";
import { ArrowChip } from "./product-section";

interface FooterLink {
  label: string;
  href: string;
}

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Platform", href: "#product" },
  { label: "Workflows", href: "#product" },
  { label: "Integrations", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About", href: "#" },
  { label: "Customers", href: "#partners" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Contact", href: "#" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { label: "Documentation", href: "#" },
  { label: "API reference", href: "#" },
  { label: "Status", href: "#" },
  { label: "Security", href: "#" },
  { label: "Trust center", href: "#" },
];

const CONNECT_LINKS: FooterLink[] = [
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
];

function FooterColumn({
  title,
  links,
  external,
}: {
  title: string;
  links: FooterLink[];
  external?: boolean;
}) {
  return (
    <div className="col-span-1 lg:col-span-2">
      <h4 className="font-mono text-xs uppercase tracking-widest text-foreground/55 mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-foreground/85 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="footer-sticky z-0 bg-background text-foreground flex flex-col select-none"
    >
      {/* Top Banner */}
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 pt-24 lg:pt-32">
        <span className="inline-flex items-center rounded-md border border-foreground/[0.08] px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70">
          Get in touch
        </span>

        <div className="mt-6 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.95] max-w-5xl">
          <p className="block">Build with intent.</p>
          <p className="block text-foreground/55">Ship without limits.</p>
        </div>

        <div className="mt-12">
          <Link
            href="mailto:hello@lumen.app"
            className="group inline-flex items-stretch gap-1"
          >
            <span className="px-5 py-3 rounded-md bg-foreground text-background text-xs font-medium tracking-widest uppercase">
              hello@lumen.app
            </span>
            <ArrowChip className="bg-foreground text-background" />
          </Link>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 mt-24 lg:mt-32 py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="col-span-2 lg:col-span-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-xl font-medium tracking-tight"
          >
            <span
              aria-hidden="true"
              className="h-8 w-8 rounded-full border-2 border-foreground/70"
            />
            Lumen
          </Link>
          <p className="mt-4 text-foreground/55 max-w-xs leading-relaxed">
            The shared surface where teams design, deploy, and scale modern
            software — without the seams between tools.
          </p>
        </div>

        <FooterColumn title="Product" links={PRODUCT_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Resources" links={RESOURCE_LINKS} />
        <FooterColumn title="Connect" links={CONNECT_LINKS} external />
      </div>

      {/* Legal & Copyright */}
      <div className="mt-auto border-t border-foreground/[0.08]">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-sm text-foreground/55">
          <p>© 2026 Lumen Labs, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
