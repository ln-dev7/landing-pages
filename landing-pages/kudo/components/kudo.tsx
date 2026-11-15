"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Headset,
  Inbox,
  LifeBuoy,
  Menu,
  MessageCircle,
  Ticket,
  X,
} from "lucide-react";
import { toast } from "sonner";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { CountIn, spring } from "./motion-kit";
import { Halftone, formatCountdown, useCountdown } from "./halftone";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { Logo } from "./logo";
import { AppTile, Face, Stars, Storefront, Vase } from "./demo";
import { agents, apps, faqs, stories, updates, type AppId } from "./data";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE = "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/kudo";
const OFFER = 6 * 86400 + 14 * 3600 + 10 * 60 + 49;

const links = [
  { href: "#stories", label: "Stories" },
  { href: "#changelog", label: "Changelog" },
  { href: "#support", label: "Support" },
  { href: "#faq", label: "FAQ" },
];

const concept = () =>
  toast("Kudo is a concept by LN", {
    description: "There is no account to open. Play with the creator page instead.",
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
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Header ---------- */

function AppsMenu({ onPick, onClose }: { onPick: (id: AppId) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const down = (e: PointerEvent) => {
      if (!ref.current?.parentElement?.contains(e.target as Node)) onClose();
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [onClose]);
  return (
    <motion.div
      ref={ref}
      className="apps-menu"
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18 }}
    >
      {apps.map((a) => (
        <button key={a.id} type="button" onClick={() => onPick(a.id)}>
          <AppTile id={a.id} size={20} />
          <span>
            <b>{a.name}</b>
            <small>{a.line}</small>
          </span>
        </button>
      ))}
    </motion.div>
  );
}

function MobileMenu({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (id: AppId) => void }) {
  const [sub, setSub] = useState(false);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="m-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="m-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={spring}
          >
            <div className="m-head">
              <a href="#top" className="brand" onClick={onClose}>
                <Logo /> Kudo
              </a>
              <button type="button" className="button" onClick={() => { onClose(); onPick("tips"); }}>
                Explore apps
              </button>
              <button type="button" className="icon-btn" aria-label="Close menu" onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <div className="m-body">
              <button type="button" className="m-row" aria-expanded={sub} onClick={() => setSub((v) => !v)} data-on={sub}>
                Apps <ChevronDown size={16} />
              </button>
              <AnimatePresence initial={false}>
                {sub && (
                  <motion.div className="m-apps" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    {apps.map((a, i) => (
                      <motion.button
                        key={a.id}
                        type="button"
                        onClick={() => { onClose(); onPick(a.id); }}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ...spring, delay: 0.03 * i }}
                      >
                        <AppTile id={a.id} size={16} /> {a.name}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {links.map((l) => (
                <a key={l.href} href={l.href} className="m-row" onClick={onClose}>
                  {l.label}
                </a>
              ))}
            </div>
            <button type="button" className="button button-lg m-cta" onClick={() => { onClose(); concept(); }}>
              Start for free
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- Hero preview ---------- */

function HeroPage() {
  const [members, setMembers] = useState(1284);
  const [tip, setTip] = useState<number | null>(null);
  useEffect(() => {
    const id = window.setInterval(() => setMembers((m) => m + 1), 3200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="hp">
      <div className="hp-cover">
        <Vase kind="vase" />
        <Vase kind="mug" tone="#e9dccb" glaze="#8a6d52" />
      </div>
      <div className="hp-body">
        <span className="hp-avatar">LO</span>
        <div className="hp-id">
          <h3>Lina Ortiz</h3>
          <p>Ceramics studio in Lisbon · @lina.makes</p>
        </div>
        <div className="hp-stats">
          <span>
            <b>
              <NumberFlow value={members} />
            </b>{" "}
            members
          </span>
          <span>
            <b>18.4k</b> fans
          </span>
        </div>
      </div>
      <div className="hp-tips" role="group" aria-label="Send a tip">
        {[3, 5, 10].map((v) => (
          <button key={v} type="button" data-on={tip === v} onClick={() => setTip(v)}>
            ${v}
          </button>
        ))}
        <button type="button" className="hp-send" onClick={() => tip && toast(`You tipped Lina $${tip}`, { description: "Nothing was charged. Kudo is a concept." })}>
          {tip ? `Send $${tip}` : "Support Lina"}
        </button>
      </div>
    </div>
  );
}

/* ---------- App previews in the suite grid ---------- */

function PreviewTips() {
  const [v, setV] = useState(64);
  return (
    <div className="pv">
      <div className="pv-row">
        <span className="pv-title">Tip goal · new kiln shelf</span>
        <b><NumberFlow value={v} suffix="%" /></b>
      </div>
      <div className="goal-bar"><motion.i animate={{ width: `${v}%` }} transition={spring} /></div>
      <div className="pv-pills">
        {[3, 5, 10].map((a) => (
          <button key={a} type="button" onClick={() => setV((x) => Math.min(100, x + a))}>+ ${a}</button>
        ))}
      </div>
      <ul className="pv-feed">
        <li><Face init="MT" tone="#ffd76a" /> Mei · $5 · <i>“love the blue glaze”</i></li>
        <li><Face init="DF" tone="#8fd2ff" /> Dario · $10 · <i>“for the kiln!”</i></li>
      </ul>
    </div>
  );
}

function PreviewMembers() {
  const bars = [38, 44, 52, 58, 70, 84];
  return (
    <div className="pv">
      <div className="pv-row">
        <span className="pv-title">Monthly from members</span>
        <b>$4,180</b>
      </div>
      <div className="pv-bars">
        {bars.map((b, i) => (
          <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${b}%` }} viewport={{ once: true }} transition={{ ...spring, delay: i * 0.06 }} />
        ))}
      </div>
      <div className="pv-tiers">
        <span>Fan <b>612</b></span>
        <span>Studio <b>584</b></span>
        <span>Patron <b>88</b></span>
      </div>
    </div>
  );
}

function PreviewShop() {
  const [qty, setQty] = useState(2);
  return (
    <div className="pv">
      <div className="pv-row"><span className="pv-title">Bag</span><span className="pv-muted">{qty + 1} items</span></div>
      <div className="pv-item">
        <span className="pv-thumb"><Vase kind="mug" tone="#e9dccb" glaze="#8a6d52" /></span>
        <span><b>Speckled mug</b><small>× {qty}</small></span>
        <div className="stepper sm">
          <button type="button" aria-label="One less mug" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <button type="button" aria-label="One more mug" onClick={() => setQty((q) => Math.min(6, q + 1))}>+</button>
        </div>
      </div>
      <div className="pv-item">
        <span className="pv-thumb"><Vase kind="vase" /></span>
        <span><b>Moon vase</b><small>× 1</small></span>
        <span className="pv-free">Free gift</span>
      </div>
      <button type="button" className="buy sm">Checkout · <NumberFlow value={34 * qty + 72} prefix="$" /></button>
    </div>
  );
}

function PreviewBookings() {
  const [on, setOn] = useState<number[]>([1, 6]);
  return (
    <div className="pv">
      <div className="pv-row"><span className="pv-title">This week</span><span className="pv-muted">{on.length} calls booked</span></div>
      <div className="pv-week">
        {["M", "T", "W", "T", "F"].map((d, c) => (
          <div key={c}>
            <small>{d}</small>
            {[0, 1].map((r) => {
              const i = c * 2 + r;
              return (
                <button key={r} type="button" aria-pressed={on.includes(i)} onClick={() => setOn((l) => (l.includes(i) ? l.filter((x) => x !== i) : [...l, i]))}>
                  {r ? "14:00" : "10:00"}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCourses() {
  const rows = [
    { n: "Ana K.", p: 100 },
    { n: "Joel S.", p: 72 },
    { n: "Rita B.", p: 45 },
    { n: "Omar P.", p: 18 },
  ];
  return (
    <div className="pv">
      <div className="pv-row"><span className="pv-title">Wheel throwing, from zero</span><span className="pv-muted">412 students</span></div>
      <ul className="pv-students">
        {rows.map((r, i) => (
          <li key={r.n}>
            <span>{r.n}</span>
            <span className="pv-track"><motion.i initial={{ width: 0 }} whileInView={{ width: `${r.p}%` }} viewport={{ once: true }} transition={{ ...spring, delay: i * 0.08 }} /></span>
            <span className="mono">{r.p === 100 ? <Check size={12} /> : `${r.p}%`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PreviewLetters() {
  const flows = [
    { t: "Welcome letter", s: "Right away", done: true },
    { t: "Thanks for your first tip", s: "Right away", done: true },
    { t: "New member welcome", s: "After 1 day", done: true },
    { t: "We miss you", s: "After 30 days", done: false },
  ];
  return (
    <div className="pv">
      <div className="pv-row"><span className="pv-title">Your letters</span><span className="live-chip"><i /> Live</span></div>
      <ul className="pv-flows">
        {flows.map((f) => (
          <li key={f.t} data-done={f.done}>
            <span className="flow-dot">{f.done && <Check size={10} />}</span>
            <b>{f.t}</b>
            <small>{f.s}</small>
          </li>
        ))}
      </ul>
      <div className="pv-rates"><span>Open rate <b>71%</b></span><span>Click rate <b>18%</b></span></div>
    </div>
  );
}

const previews: Record<AppId, () => React.ReactElement> = {
  tips: PreviewTips,
  members: PreviewMembers,
  shop: PreviewShop,
  bookings: PreviewBookings,
  courses: PreviewCourses,
  letters: PreviewLetters,
};

/* ---------- Support desk ---------- */

function SupportDesk() {
  const [tickets, setTickets] = useState(147);
  const [state, setState] = useState<Record<string, "idle" | "new" | "done">>({ Inès: "idle", Tomás: "new", Amara: "done" });
  const [open, setOpen] = useState(agents.map((a) => a.open));
  useEffect(() => {
    let k = 0;
    const id = window.setInterval(() => {
      k++;
      const who = agents[k % agents.length].name;
      setState((s) => ({ ...s, [who]: s[who] === "new" ? "done" : "new" }));
      setOpen((o) => o.map((v, i) => (i === k % agents.length ? Math.max(1, v + (k % 2 ? 1 : -1)) : v)));
      setTickets((t) => t + (k % 2 ? 1 : -1));
    }, 2400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="desk">
      <div className="desk-head">
        <b>Support desk</b>
        <span><i className="online" /> 22 online</span>
        <span className="desk-sep" />
        <span><b><NumberFlow value={tickets} /></b> open tickets</span>
      </div>
      {agents.map((a, i) => (
        <div key={a.name} className="desk-row" data-active={state[a.name] === "new"}>
          <span className="desk-face">
            <Face init={a.init} tone={a.tone} />
            <i className="online" />
          </span>
          <span className="desk-who"><b>{a.name}</b><small>Online</small></span>
          <AnimatePresence mode="wait">
            {state[a.name] !== "idle" && (
              <motion.span key={state[a.name]} className="desk-chip" data-kind={state[a.name]} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                {state[a.name] === "new" ? <><Inbox size={12} /> New ticket</> : <><Check size={12} /> Ticket resolved</>}
              </motion.span>
            )}
          </AnimatePresence>
          <span className="desk-open"><b><NumberFlow value={open[i]} /></b> open</span>
        </div>
      ))}
      <div className="desk-foot">
        <span className="desk-faces">
          <Face init="RB" tone="#ffab8a" />
          <Face init="CV" tone="#8be3b6" />
          <Face init="EL" tone="#b9a4ff" />
        </span>
        <b>+19 more</b> online now <span className="desk-sep" /> Around the clock
      </div>
    </div>
  );
}

/* ---------- Page ---------- */


/* Header: the CTA rolls through the six app tiles, the logo heart beats in their colours. */
function useAppCycle(ms = 2200) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % apps.length), ms);
    return () => window.clearInterval(id);
  }, [ms, reduce]);
  return i;
}

function TileSlot({ i }: { i: number }) {
  const a = apps[i];
  return (
    <span className="tile-slot" aria-hidden="true">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={a.id}
          className="tile-slot-in"
          initial={{ y: "115%", rotate: -12 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ y: "-115%", rotate: 12 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        >
          <AppTile id={a.id} size={14} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Kudo() {
  const [app, setApp] = useState<AppId>("tips");
  const [menu, setMenu] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const clock = useCountdown(OFFER);
  const current = apps.find((a) => a.id === app)!;
  useReveal();
  const cycle = useAppCycle();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pick = (id: AppId) => {
    setApp(id);
    setAppsOpen(false);
    document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-pill">
          <a href="#top" className="brand" aria-label="Kudo home" style={{ ["--logo-heart" as string]: apps[cycle].tile[0] }}>
            <span key={cycle} className="beat">
              <Logo />
            </span>{" "}
            Kudo
          </a>
          <nav aria-label="Main" className="nav-links">
            <div className="apps-wrap">
              <button type="button" className="nav-link" aria-expanded={appsOpen} aria-haspopup="true" onClick={() => setAppsOpen((v) => !v)}>
                Apps <ChevronDown size={14} />
              </button>
              <AnimatePresence>{appsOpen && <AppsMenu onPick={pick} onClose={() => setAppsOpen(false)} />}</AnimatePresence>
            </div>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>
          <button type="button" className="button nav-cta-m" onClick={() => pick("tips")}>
            Explore apps
          </button>
          <button type="button" className="icon-btn menu-btn" aria-label="Open menu" onClick={() => setMenu(true)}>
            <Menu size={20} />
          </button>
        </div>
        <button type="button" className="button nav-cta" onClick={() => pick(apps[cycle].id)}>
          <TileSlot i={cycle} /> Explore apps
        </button>
      </header>
      <MobileMenu open={menu} onClose={() => setMenu(false)} onPick={pick} />

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-card">
            <Halftone className="hero-dust" colors={["#1d1d24", "#2b2b35"]} cell={4} seed={3} scale={30} shape="corners" bias={-0.15} />
            <div className="hero-copy">
              <p className="offer rise" style={{ animationDelay: ".1s" }}>
                <span><i /> Creator Week</span>
                <span className="offer-clock">
                  0% fees · ends in <b ref={clock}>{formatCountdown(OFFER)}</b>
                </span>
              </p>
              <h1>
                <span className="rise" style={{ animationDelay: ".2s" }}>Get paid by the people</span>
                <span className="rise grad" style={{ animationDelay: ".32s" }}>who love your work.</span>
              </h1>
              <p className="rise hero-sub" style={{ animationDelay: ".45s" }}>
                Six small apps for tips, memberships, a shop, paid calls, courses and letters. Add them to the page your fans already visit.
              </p>
              <div className="rise" style={{ animationDelay: ".55s" }}>
                <button type="button" className="button button-light button-lg" onClick={() => pick("tips")}>
                  Explore apps
                </button>
              </div>
              <p className="rise hero-rating" style={{ animationDelay: ".65s" }}>
                4.9 <Stars /> (8,214) on the Creator Market
              </p>
            </div>
            <div className="hero-shot rise" style={{ animationDelay: ".75s" }}>
              <Halftone className="hero-edges" colors={["#1a2048", "#2c3a9e", "#5468f2", "#a8b6ff"]} cell={5} seed={7} shape="left" scale={22} bias={-0.06} />
              <Halftone className="hero-edges hero-edges-r" colors={["#36142c", "#87295f", "#e2479a", "#ffb8dc"]} cell={5} seed={11} shape="right" scale={22} bias={-0.06} />
              <div className="hero-window">
                <HeroPage />
              </div>
            </div>
          </div>
        </section>

        <div className="rail">
          <section className="showcase" id="apps" aria-labelledby="apps-title">
            <div className="show-head" data-reveal>
              <h2 id="apps-title">
                <span key={app} className="dot-in show-name">
                  <AppTile id={app} size={30} /> {current.name}
                </span>{" "}
                <span className="show-to">to</span>{" "}
                <span key={app + "g"} className="dot-in show-goal">{current.goal}</span>
              </h2>
            </div>
            <div className="stage" style={{ background: current.wash }}>
              <Halftone key={app} className="stage-bg" colors={current.inks} cell={5} seed={apps.findIndex((a) => a.id === app) + 2} scale={34} bias={-0.12} />
              <Tabs value={app} onValueChange={(v) => setApp(v as AppId)} className="panel" data-reveal>
                <TabsList className="app-tabs" style={{ ["--tab-wash" as string]: current.wash }}>
                  {apps.map((a) => (
                    <TabsTrigger key={a.id} value={a.id} className="app-tab" style={{ ["--tab-c" as string]: a.tile[1] }}>
                      <AppTile id={a.id} size={18} />
                      <span>{a.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div key={app} className="dot-in">
                  <Storefront app={app} />
                </div>
              </Tabs>
            </div>
          </section>

          <section className="suite" id="suite" aria-labelledby="suite-title">
            <div className="row-head" data-reveal>
              <h2 id="suite-title">Six apps. One page.</h2>
              <p>Every app plugs into the same creator page, so fans never leave to pay you.</p>
            </div>
            <div className="suite-grid">
              {apps.map((a, i) => {
                const P = previews[a.id];
                return (
                  <article key={a.id} className="suite-cell" data-reveal>
                    <h3>
                      <AppTile id={a.id} size={24} /> {a.name}
                    </h3>
                    <p>{a.line}</p>
                    <button type="button" className="arrow-link" onClick={() => pick(a.id)}>
                      Explore {a.name.toLowerCase()} <ArrowRight size={14} />
                    </button>
                    <div className="frame-ht">
                      <Halftone colors={a.inks} cell={4} seed={i * 3 + 1} scale={18} bias={0.12} />
                      <div className="frame-card">
                        <P />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="stories" id="stories" aria-labelledby="stories-title">
            <div className="row-head row-head-split" data-reveal>
              <div>
                <h2 id="stories-title">How creators grow with Kudo.</h2>
                <p>Trusted by 64,000+ imaginary creators.</p>
              </div>
              <button type="button" className="arrow-link" onClick={concept}>
                See more stories <ArrowRight size={14} />
              </button>
            </div>
            <div className="story-grid">
              {stories.map((s, i) => {
                const a = apps.find((x) => x.id === s.app)!;
                return (
                  <motion.figure key={s.who} className="story" data-reveal whileHover={{ y: -4 }} transition={spring}>
                    <div className="story-ht">
                      <Halftone colors={a.inks} cell={4} seed={i + 20} scale={16} shape="rise" bias={0.1} />
                      <span className="story-stat">
                        <CountIn value={s.stat} format={s.stat < 10 ? { minimumFractionDigits: 1 } : undefined} prefix={s.unit.startsWith("$") ? "$" : undefined} />
                      </span>
                      <span className="story-unit">{s.unit.replace(/^\$ /, "")}</span>
                    </div>
                    <blockquote>“{s.quote}”</blockquote>
                    <figcaption>
                      <AppTile id={s.app} size={14} />
                      <span>
                        <b>{s.who}</b>
                        <small>{s.what}</small>
                      </span>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </section>

          <section className="updates" id="changelog" aria-labelledby="updates-title">
            <div className="row-head row-head-split" data-reveal>
              <div>
                <h2 id="updates-title">What’s new at Kudo.</h2>
                <p>Every update across the Kudo apps, as it ships.</p>
              </div>
              <button type="button" className="arrow-link" onClick={concept}>
                See all updates <ArrowRight size={14} />
              </button>
            </div>
            <ul className="update-list">
              {updates.map((u) => {
                const a = apps.find((x) => x.id === u.app)!;
                return (
                  <li key={u.t} data-reveal>
                    <button type="button" onClick={() => pick(u.app)}>
                      <span className="u-main">
                        <b>{u.t}</b>
                        <span>{u.d}</span>
                      </span>
                      <span className="u-meta">
                        <span>
                          {a.name} <AppTile id={u.app} size={14} />
                        </span>
                        <small>{u.date}</small>
                      </span>
                      <ArrowUpRight size={18} className="u-arrow" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <section className="support" id="support" aria-labelledby="support-title">
          <div className="support-in">
            <div className="support-copy" data-reveal>
              <h2 id="support-title">Real people, around the clock.</h2>
              <p>When a payout looks wrong at 2 a.m., someone answers. No bots in front of the humans.</p>
              <ul>
                <li><Headset size={18} /> 24/7 support from a real team</li>
                <li><LifeBuoy size={18} /> Clear guides and practical answers</li>
                <li><Ticket size={18} /> The right apps, set up for your page</li>
              </ul>
              <button type="button" className="talk" onClick={concept}>
                <Face init="IN" tone="#ffd76a" /> Talk to our team
              </button>
            </div>
            <div className="frame-ht frame-dark" data-reveal>
              <Halftone colors={["#2a2a33", "#45454f", "#6d6d7a"]} cell={4} seed={31} scale={18} bias={0.08} />
              <SupportDesk />
            </div>
          </div>
        </section>

        <div className="rail">
          <section className="faq-wrap" id="faq" aria-labelledby="faq-title">
            <div className="row-head" data-reveal>
              <h2 id="faq-title">Before you start.</h2>
              <p>
                Still curious? <button type="button" className="inline-link" onClick={concept}><MessageCircle size={14} /> Ask the team</button>
              </p>
            </div>
            <Accordion className="faq" data-reveal>
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="closing" data-reveal>
            <h2>
              Your fans already want to help.
              <span className="grad-dark"> Give them a way.</span>
            </h2>
            <div className="closing-ctas">
              <button type="button" className="button button-lg" onClick={concept}>
                Start for free <ArrowRight size={16} />
              </button>
              <a className="button button-outline button-lg" href="#apps">
                <Clock size={15} /> Try the demo
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="rail footer-in">
          <div className="footer-brand">
            <a href="#top" className="brand"><Logo /> Kudo</a>
            <p>Get paid by the people who love your work.</p>
          </div>
          <div className="footer-cols">
            <div>
              <h4>Apps</h4>
              {apps.map((a) => (
                <button key={a.id} type="button" onClick={() => pick(a.id)}>{a.name}</button>
              ))}
            </div>
            <div>
              <h4>Explore</h4>
              <a href="#stories">Stories</a>
              <a href="#changelog">Changelog</a>
              <a href="#suite">All apps</a>
            </div>
            <div>
              <h4>Help</h4>
              <a href="#support">Support</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h4>Made by</h4>
              <a href={LN}>LN</a>
              <a href={SOURCE}>Source</a>
              <a href={SUPPORT}>Support the project <ArrowUpRight size={12} /></a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Kudo is a fictional product. The creators, numbers and prices are invented for this demo.</p>
            <p>
              4.9 <Stars /> (8,214) on the Creator Market
            </p>
          </div>
        </div>
        <div className="giant" aria-hidden="true">
          <Halftone colors={["#e4e4e6", "#c9c9cd", "#a3a3a9", "#7a7a82"]} cell={4} seed={5} scale={22} shape="text" text="kudo" />
        </div>
      </footer>
      <Toaster />
    </MotionConfig>
  );
}
