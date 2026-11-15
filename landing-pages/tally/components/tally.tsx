"use client";
import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  Minus,
  Plus,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { BooksDemo } from "./books-demo";
import { CountIn, spring, useActiveSection } from "./motion-kit";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE =
  "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/tally";

const links = [
  { href: "#demo", label: "Demo" },
  { href: "#tax", label: "Tax pot" },
  { href: "#invoices", label: "Invoices" },
  { href: "#pricing", label: "Pricing" },
];
const sections = ["demo", "how", "tax", "invoices", "pricing", "faq"];

const concept = () =>
  toast("Tally is a concept by LN", {
    description: "No account, no bank connection. The books above are a demo.",
  });

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => (el.dataset.visible = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "true";
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const brackets = [
  { id: "low", label: "Lower", rate: 0.22 },
  { id: "mid", label: "Middle", rate: 0.28 },
  { id: "high", label: "Higher", rate: 0.35 },
];
const clients = [
  { id: "orbitly", name: "Orbitly", rate: 95 },
  { id: "lumen", name: "Lumen & Co", rate: 110 },
  { id: "fernway", name: "Fernway", rate: 85 },
];
const steps = ["Sent", "Opened", "Paid"] as const;

const faqs = [
  {
    q: "Who is Tally for?",
    a: "Freelancers and one-person companies who would rather do the work than the books. If you send invoices and keep receipts, Tally is for you.",
  },
  {
    q: "Does Tally file my taxes?",
    a: "No. It keeps your books ready and estimates what to set aside. You or your accountant still file. The estimate is not tax advice.",
  },
  {
    q: "What if it picks the wrong category?",
    a: "Change it with one click. Tally remembers and books the next receipt from that merchant the way you did.",
  },
  {
    q: "Is any of this real?",
    a: "Tally is a fictional product designed by LN. Merchants, clients, amounts and prices on this page are invented, and nothing connects to a bank.",
  },
];

export default function Tally() {
  const [menu, setMenu] = useState(false);
  const [income, setIncome] = useState(8400);
  const [bracket, setBracket] = useState("mid");
  const [client, setClient] = useState(clients[0].id);
  const [hours, setHours] = useState(24);
  const [sent, setSent] = useState(-1);
  const [yearly, setYearly] = useState(true);
  const timers = useRef<number[]>([]);
  const { active, select } = useActiveSection(sections);
  useReveal();

  useEffect(
    () => () => timers.current.forEach((t) => window.clearTimeout(t)),
    [],
  );

  const rate = brackets.find((b) => b.id === bracket)?.rate ?? 0.28;
  const pot = Math.round(income * rate);
  const safe = income - pot;
  const c = clients.find((x) => x.id === client) ?? clients[0];
  const total = hours * c.rate;

  const send = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    setSent(0);
    timers.current = [
      window.setTimeout(() => setSent(1), 1100),
      window.setTimeout(() => {
        setSent(2);
        toast("Paid", {
          description: `${c.name} paid $${total.toLocaleString("en-US")}. Demo only.`,
        });
      }, 2600),
    ];
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid-lines" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Tally home">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            Tally
          </a>
          <nav aria-label="Main" className="nav-links">
            {links.map((l) => {
              const id = l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active === id ? "location" : undefined}
                  onClick={() => select(id)}
                >
                  {l.label}
                  {active === id && (
                    <motion.i
                      layoutId="nav-rule"
                      className="nav-rule"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.45,
                      }}
                    />
                  )}
                </a>
              );
            })}
            <a href={LN}>Docs</a>
          </nav>
          <div className="nav-actions">
            <Button onClick={concept}>Start free</Button>
            <Button
              variant="unstyled"
              className="menu-button"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent>
          <SheetTitle>Tally</SheetTitle>
          <SheetDescription>Receipts in. Taxes sorted.</SheetDescription>
          <nav aria-label="Mobile" className="sheet-links">
            {[...links, { href: LN, label: "Docs" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => {
                  if (l.href.startsWith("#")) select(l.href.slice(1));
                  setMenu(false);
                }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.05 + i * 0.05 }}
              >
                <span className="mono">0{i + 1}</span> {l.label}
              </motion.a>
            ))}
          </nav>
          <Button
            onClick={() => {
              setMenu(false);
              concept();
            }}
          >
            Start free
          </Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero shell" id="top">
          <div className="hero-meta mono">
            <span>Tally</span>
            <span>Bookkeeping for one</span>
            <span>Nov 2026</span>
          </div>
          <h1>
            {[
              ["Receipts", "in."],
              ["Taxes", "sorted."],
            ].map(([a, b], i) => (
              <span key={a} className="h-line">
                <motion.span
                  initial={{ y: "140%" }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.9,
                    delay: 0.1 + i * 0.12,
                  }}
                >
                  {a} <em>{b}</em>
                </motion.span>
              </span>
            ))}
          </h1>
          <div className="hero-foot">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.5 }}
            >
              Tally reads every receipt, matches it to your bank, books it in
              the right category and tells you exactly how much to put aside for
              tax. You keep working.
            </motion.p>
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.6 }}
            >
              <Button size="lg" onClick={concept}>
                Start free <ArrowRight size={16} />
              </Button>
              <a
                className="button button-outline button-lg"
                href="#demo"
                onClick={() => select("demo")}
              >
                Book a receipt
              </a>
            </motion.div>
          </div>
        </section>

        <section className="shell demo" id="demo">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, duration: 0.9, delay: 0.7 }}
          >
            <BooksDemo />
          </motion.div>
        </section>

        <section className="band" aria-label="Tally in numbers">
          <div className="shell band-inner">
            {[
              { v: 4, s: " s", l: "to read and book a receipt" },
              { v: 11, s: " h", l: "of admin saved every month" },
              { v: 38, s: "", l: "currencies, converted on the day" },
            ].map((x) => (
              <div key={x.l} className="band-cell" data-reveal>
                <CountIn className="band-num" value={x.v} suffix={x.s} />
                <span>{x.l}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="shell section" id="how">
          <div className="sec-head" data-reveal>
            <span className="mono">How it works</span>
            <h2>Three steps. Zero spreadsheets.</h2>
          </div>
          <ol className="how">
            {[
              {
                n: "01",
                t: "Snap or forward",
                b: "Photograph a receipt or forward the email. Tally reads merchant, date, amount and tax in seconds.",
              },
              {
                n: "02",
                t: "Matched and booked",
                b: "It finds the payment in your bank feed and books it in the right category, with the right deductible share.",
              },
              {
                n: "03",
                t: "Always ready",
                b: "Profit, tax to set aside and a clean ledger your accountant can open any day of the year.",
              },
            ].map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ ...spring, delay: i * 0.1 }}
              >
                <span className="how-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="shell section tax" id="tax">
          <div className="sec-head" data-reveal>
            <span className="mono">Tax pot</span>
            <h2>Know what’s yours before you spend it.</h2>
          </div>
          <div className="tax-grid" data-reveal>
            <div className="tax-controls">
              <label htmlFor="income" className="mono">
                Profit this month
              </label>
              <strong className="tax-income">
                <NumberFlow
                  value={income}
                  format={{
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }}
                  locales="en-US"
                />
              </strong>
              <input
                id="income"
                type="range"
                min={1000}
                max={30000}
                step={100}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                style={
                  {
                    "--fill": `${((income - 1000) / 29000) * 100}%`,
                  } as React.CSSProperties
                }
              />
              <span className="mono">Tax bracket</span>
              <div className="seg" role="radiogroup" aria-label="Tax bracket">
                {brackets.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    role="radio"
                    aria-checked={bracket === b.id}
                    onClick={() => setBracket(b.id)}
                  >
                    {bracket === b.id && (
                      <motion.span
                        layoutId="seg-fill"
                        className="seg-fill"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.4,
                        }}
                      />
                    )}
                    <span>
                      {b.label} · {Math.round(b.rate * 100)}%
                    </span>
                  </button>
                ))}
              </div>
              <p className="fine">An estimate to plan with, not tax advice.</p>
            </div>
            <div className="tax-out">
              <div className="split" aria-hidden="true">
                <motion.span
                  className="split-pot"
                  animate={{ width: `${rate * 100}%` }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
                <span className="split-safe" />
              </div>
              <div className="tax-nums">
                <div>
                  <span className="mono">Put aside</span>
                  <strong className="hot">
                    <NumberFlow
                      value={pot}
                      format={{
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }}
                      locales="en-US"
                    />
                  </strong>
                </div>
                <div>
                  <span className="mono">Safe to spend</span>
                  <strong>
                    <NumberFlow
                      value={safe}
                      format={{
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }}
                      locales="en-US"
                    />
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell section invoices" id="invoices">
          <div className="sec-head" data-reveal>
            <span className="mono">Invoices</span>
            <h2>Send it in ten seconds. Watch it get paid.</h2>
          </div>
          <div className="inv" data-reveal>
            <div className="inv-form">
              <span className="mono">Client</span>
              <div
                className="seg seg-wide"
                role="radiogroup"
                aria-label="Client"
              >
                {clients.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    role="radio"
                    aria-checked={client === x.id}
                    onClick={() => {
                      setClient(x.id);
                      setSent(-1);
                    }}
                  >
                    {client === x.id && (
                      <motion.span
                        layoutId="client-fill"
                        className="seg-fill"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.4,
                        }}
                      />
                    )}
                    <span>{x.name}</span>
                  </button>
                ))}
              </div>
              <span className="mono">Hours</span>
              <div className="stepper">
                <button
                  type="button"
                  aria-label="Fewer hours"
                  onClick={() => {
                    setHours((h) => Math.max(1, h - 1));
                    setSent(-1);
                  }}
                >
                  <Minus size={16} />
                </button>
                <b>
                  <NumberFlow value={hours} />
                </b>
                <button
                  type="button"
                  aria-label="More hours"
                  onClick={() => {
                    setHours((h) => Math.min(200, h + 1));
                    setSent(-1);
                  }}
                >
                  <Plus size={16} />
                </button>
                <span className="mono dim">× ${c.rate}/h</span>
              </div>
              <Button size="lg" onClick={send} disabled={sent >= 0 && sent < 2}>
                <Send size={15} />{" "}
                {sent >= 2
                  ? "Send another"
                  : sent >= 0
                    ? "Sending…"
                    : "Send invoice"}
              </Button>
            </div>
            <div className="inv-paper">
              <div className="inv-top">
                <span className="mono">Invoice 2026-041</span>
                <span className="mono">Due in 14 days</span>
              </div>
              <h3>{c.name}</h3>
              <div className="inv-line">
                <span>Design work, November</span>
                <span className="mono">
                  {hours} h × ${c.rate}
                </span>
              </div>
              <div className="inv-total">
                <span className="mono">Total</span>
                <strong>
                  <NumberFlow
                    value={total}
                    format={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                    locales="en-US"
                  />
                </strong>
              </div>
              <ol className="inv-steps">
                {steps.map((s, i) => (
                  <li key={s} data-on={sent >= i}>
                    <motion.i
                      animate={{
                        scale: sent >= i ? 1 : 0.6,
                        opacity: sent >= i ? 1 : 0.3,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.5,
                        duration: 0.4,
                      }}
                    >
                      {sent >= i && <Check size={11} />}
                    </motion.i>
                    {s}
                  </li>
                ))}
              </ol>
              <AnimatePresence>
                {sent >= 2 && (
                  <motion.span
                    className="stamp"
                    initial={{ opacity: 0, scale: 1.8, rotate: -24 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                  >
                    PAID
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="shell section pricing" id="pricing">
          <div className="sec-head" data-reveal>
            <span className="mono">Pricing</span>
            <h2>One price. Less than one billable hour.</h2>
            <div
              className="seg seg-small"
              role="radiogroup"
              aria-label="Billing period"
            >
              {[
                { v: false, l: "Monthly" },
                { v: true, l: "Yearly −25%" },
              ].map((o) => (
                <button
                  key={o.l}
                  type="button"
                  role="radio"
                  aria-checked={yearly === o.v}
                  onClick={() => setYearly(o.v)}
                >
                  {yearly === o.v && (
                    <motion.span
                      layoutId="bill-fill"
                      className="seg-fill"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.4,
                      }}
                    />
                  )}
                  <span>{o.l}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="price-table" data-reveal>
            {[
              {
                name: "Starter",
                m: 0,
                note: "For your first clients",
                f: ["20 receipts a month", "Bank feed", "Tax pot estimate"],
              },
              {
                name: "Solo",
                m: 16,
                note: "Everything, for one person",
                f: [
                  "Unlimited receipts",
                  "Invoices and reminders",
                  "Accountant access",
                  "38 currencies",
                ],
                hot: true,
              },
            ].map((p) => (
              <article key={p.name} className="price-col" data-hot={p.hot}>
                <header>
                  <h3>{p.name}</h3>
                  <span className="mono">{p.note}</span>
                </header>
                <strong className="price-num">
                  <NumberFlow
                    value={yearly ? Math.round(p.m * 0.75) : p.m}
                    format={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                    locales="en-US"
                  />
                  <span className="mono">/mo</span>
                </strong>
                <ul>
                  {p.f.map((f) => (
                    <li key={f}>
                      <Check size={15} /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.hot ? "default" : "outline"}
                  onClick={concept}
                >
                  {p.m === 0 ? "Start free" : `Get ${p.name}`}
                </Button>
              </article>
            ))}
          </div>
          <p className="fine">
            Fictional prices for a concept product. Nothing is billed.
          </p>
        </section>

        <section className="shell section faq" id="faq">
          <div className="sec-head" data-reveal>
            <span className="mono">Questions</span>
            <h2>Asked and answered.</h2>
          </div>
          <Accordion className="faq-list" data-reveal>
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>
                  <span className="mono faq-n">0{i + 1}</span>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="closing" data-reveal>
          <div className="shell">
            <h2>
              Do the work.
              <br />
              Tally does the books.
            </h2>
            <div className="hero-ctas">
              <Button size="lg" onClick={concept}>
                Start free <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer shell">
        <p>
          Tally is a fictional product. Merchants, clients, amounts and prices
          are invented for this demo.
        </p>
        <p>
          Designed and developed by <a href={LN}>LN</a> ·{" "}
          <a href={SOURCE}>Source</a> ·{" "}
          <a href={SUPPORT}>
            Support the project <ArrowUpRight size={12} />
          </a>
        </p>
      </footer>
      <Toaster />
    </MotionConfig>
  );
}
