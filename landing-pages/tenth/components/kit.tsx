"use client";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

export const LN = "https://lndev.me/";
export const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
export const source = (slug: string) =>
  `https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/${slug}`;

/** Every call to action lands here: the product is a concept. */
export const concept = (name: string, description: string) =>
  toast(`${name} is a concept by LN`, { description });

export type NavLink = { href: string; label: string };

export function MobileMenu({
  open,
  onOpenChange,
  name,
  tagline,
  links,
  cta,
  onCta,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  tagline: string;
  links: NavLink[];
  cta: string;
  onCta: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle>{name}</SheetTitle>
        <SheetDescription>{tagline}</SheetDescription>
        <nav className="sheet-links" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => onOpenChange(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <Button
          onClick={() => {
            onOpenChange(false);
            onCta();
          }}
        >
          {cta}
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion>
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Credit({ slug, name, note }: { slug: string; name: string; note: string }) {
  return (
    <div className="credit">
      <p>
        {name} is a fictional product. {note}
      </p>
      <p>
        Designed and developed by <a href={LN}>LN</a> · <a href={source(slug)}>Source</a> ·{" "}
        <a href={SUPPORT}>
          Support the project <ArrowUpRight size={12} />
        </a>
      </p>
    </div>
  );
}
