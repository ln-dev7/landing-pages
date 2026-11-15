"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Clock3, Headset, Inbox, LifeBuoy, Menu, MessageCircle, Check, Phone, X } from "lucide-react";
import { toast } from "sonner";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { CountIn, spring } from "./motion-kit";
import { Halftone, formatCountdown, useCountdown } from "./halftone";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { Logo } from "./logo";
import { AppTile, Face, Plate, Site, Stars } from "./demo";
import { agents, apps, faqs, quotes, stats, updates, type AppId } from "./data";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE = "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/mesa";
const OFFER = 11 * 86400 + 6 * 3600 + 42 * 60 + 18;

const links = [
  { href: "#night", label: "A night" },
  { href: "#stories", label: "Stories" },
  { href: "#changelog", label: "Changelog" },
  { href: "#faq", label: "FAQ" },
];

const concept = () =>
  toast("Mesa is a concept by LN", {
    description: "There is no restaurant to sign up. Try the demo instead.",
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
    <motion.div ref={ref} className="apps-menu" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.18 }}>
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
          <motion.div className="m-menu" role="dialog" aria-modal="true" aria-label="Menu" initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={spring}>
            <div className="m-head">
              <a href="#top" className="brand" onClick={onClose}>
                <Logo /> mesa
              </a>
              <button type="button" className="button" onClick={() => { onClose(); onPick("book"); }}>
                See the apps
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
                      <motion.button key={a.id} type="button" onClick={() => { onClose(); onPick(a.id); }} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.03 * i }}>
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
              Open your first app free
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- Hero: tonight's floor ---------- */

type T = { id: number; seats: number; state: "free" | "booked" | "seated" | "dessert"; who?: string };
const startTables: T[] = [
  { id: 1, seats: 2, state: "seated", who: "Silva" },
  { id: 2, seats: 2, state: "free" },
  { id: 3, seats: 4, state: "booked", who: "Costa · 20:00" },
  { id: 4, seats: 4, state: "seated", who: "Lopes" },
  { id: 5, seats: 6, state: "booked", who: "Birthday · 20:30" },
  { id: 6, seats: 2, state: "dessert", who: "Rui & Sofia" },
  { id: 7, seats: 2, state: "free" },
  { id: 8, seats: 4, state: "seated", who: "Mendes" },
  { id: 9, seats: 2, state: "booked", who: "Ana · waitlist" },
  { id: 10, seats: 8, state: "seated", who: "Team dinner" },
];
const stateLabel = { free: "Free", booked: "Booked", seated: "Seated", dessert: "Dessert" };

function Floor() {
  const [tables, setTables] = useState(startTables);
  const covers = tables.filter((t) => t.state !== "free" && t.state !== "booked").reduce((s, t) => s + t.seats, 0) + 64;
  const tick = useRef(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      tick.current++;
      setTables((ts) => {
        const order = [3, 9, 5];
        const k = order[tick.current % order.length];
        return ts.map((t) => (t.id === k ? { ...t, state: t.state === "booked" ? "seated" : "booked" } : t));
      });
    }, 2600);
    return () => window.clearInterval(id);
  }, []);
  const seat = (id: number) =>
    setTables((ts) =>
      ts.map((t) =>
        t.id === id ? { ...t, state: t.state === "free" ? "seated" : t.state === "seated" ? "dessert" : t.state === "dessert" ? "free" : t.state, who: t.state === "free" ? "Walk-in" : t.who } : t,
      ),
    );
  return (
    <div className="floor">
      <div className="floor-head">
        <div>
          <b>Tonight · Friday</b>
          <small>Osteria Lume · main room</small>
        </div>
        <div className="floor-stats">
          <span>
            <b>
              <NumberFlow value={covers} />
            </b>{" "}
            covers
          </span>
          <span>
            <b>6</b> waiting
          </span>
          <span className="live-chip">
            <i /> Live
          </span>
        </div>
      </div>
      <div className="floor-grid">
        {tables.map((t) => (
          <motion.button key={t.id} type="button" layout className="tbl" data-state={t.state} data-seats={t.seats} onClick={() => seat(t.id)} whileTap={{ scale: 0.95 }} aria-label={`Table ${t.id}, ${stateLabel[t.state]}`}>
            <span className="tbl-n mono">T{t.id}</span>
            <span className="tbl-chairs" aria-hidden="true">
              {Array.from({ length: Math.min(t.seats, 8) }).map((_, i) => (
                <i key={i} />
              ))}
            </span>
            <span className="tbl-who">{t.who ?? "Tap to seat"}</span>
            <span className="tbl-state">{stateLabel[t.state]}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ---------- A night with Mesa ---------- */

function Moment({ id }: { id: AppId }) {
  if (id === "book")
    return (
      <div className="mo">
        <b className="mo-big">
          <CountIn value={100} suffix="%" />
        </b>
        <span>booked by 16:30</span>
      </div>
    );
  if (id === "wait")
    return (
      <div className="mo">
        <span className="mo-queue">
          {["AN", "JO", "RI", "MA", "TE", "LU"].map((x, i) => (
            <motion.span key={x} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: i * 0.06 }}>
              <Face init={x} tone={["#ffd061", "#ffa27e", "#a9d77f", "#cc9cf8", "#8ec8fb", "#ffa1c4"][i]} />
            </motion.span>
          ))}
        </span>
        <span>6 at the bar · ~12 min</span>
      </div>
    );
  if (id === "orders")
    return (
      <div className="mo mo-plate">
        <Plate kind="ragu" tone="#c8643a" />
        <span>
          <b>14</b> pickups
        </span>
      </div>
    );
  if (id === "loyalty")
    return (
      <div className="mo">
        <span className="mo-stamps">
          {Array.from({ length: 10 }).map((_, i) => (
            <i key={i} data-on={i < 9} />
          ))}
        </span>
        <span>9 of 10 · one more for dessert</span>
      </div>
    );
  if (id === "reviews")
    return (
      <div className="mo">
        <b className="mo-big">4.8</b>
        <span>
          <Stars n={5} size={12} /> 12 replies sent
        </span>
      </div>
    );
  return (
    <div className="mo">
      <span className="mo-gift">Osteria Lume · 50 €</span>
      <span>
        <b>
          <CountIn value={2350} suffix=" €" />
        </b>{" "}
        sold this week
      </span>
    </div>
  );
}

/* ---------- Support desk ---------- */

function SupportDesk() {
  const [tickets, setTickets] = useState(38);
  const [state, setState] = useState<Record<string, "idle" | "new" | "done">>({ Clara: "new", Duarte: "idle", Yara: "done" });
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
        <b>Service desk</b>
        <span>
          <i className="online" /> 14 online
        </span>
        <span className="desk-sep" />
        <span>
          <b>
            <NumberFlow value={tickets} />
          </b>{" "}
          open calls
        </span>
      </div>
      {agents.map((a, i) => (
        <div key={a.name} className="desk-row" data-active={state[a.name] === "new"}>
          <span className="desk-face">
            <Face init={a.init} tone={a.tone} />
            <i className="online" />
          </span>
          <span className="desk-who">
            <b>{a.name}</b>
            <small>On shift</small>
          </span>
          <AnimatePresence mode="wait">
            {state[a.name] !== "idle" && (
              <motion.span key={state[a.name]} className="desk-chip" data-kind={state[a.name]} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                {state[a.name] === "new" ? (
                  <>
                    <Phone size={12} /> Call from a kitchen
                  </>
                ) : (
                  <>
                    <Check size={12} /> Solved mid-service
                  </>
                )}
              </motion.span>
            )}
          </AnimatePresence>
          <span className="desk-open">
            <b>
              <NumberFlow value={open[i]} />
            </b>{" "}
            open
          </span>
        </div>
      ))}
      <div className="desk-foot">
        <span className="desk-faces">
          <Face init="NU" tone="#ffd061" />
          <Face init="PA" tone="#8ec8fb" />
          <Face init="EM" tone="#ffa1c4" />
        </span>
        <b>+11 more</b> on shift <span className="desk-sep" /> Until the last table
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Mesa() {
  const [app, setApp] = useState<AppId>("book");
  const [menu, setMenu] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quote, setQuote] = useState(0);
  const clock = useCountdown(OFFER);
  const current = apps.find((a) => a.id === app)!;
  const q = quotes[quote];
  const qa = apps.find((a) => a.id === q.app)!;
  useReveal();
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
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-pill">
          <a href="#top" className="brand" aria-label="Mesa home">
            <Logo /> mesa
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
          <button type="button" className="button nav-cta-m" onClick={() => pick("book")}>
            See the apps
          </button>
          <button type="button" className="icon-btn menu-btn" aria-label="Open menu" onClick={() => setMenu(true)}>
            <Menu size={20} />
          </button>
        </div>
        <button type="button" className="button nav-cta" onClick={() => pick("book")}>
          See the apps
        </button>
      </header>
      <MobileMenu open={menu} onClose={() => setMenu(false)} onPick={pick} />

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-card">
            <Halftone className="hero-dust" colors={["#241d17", "#33291f"]} cell={5} dot="round" seed={4} scale={26} shape="corners" bias={-0.1} />
            <div className="hero-copy">
              <p className="offer rise" style={{ animationDelay: ".1s" }}>
                <span>
                  <i /> Holiday season
                </span>
                <span className="offer-clock">
                  3 months free · ends in <b ref={clock}>{formatCountdown(OFFER)}</b>
                </span>
              </p>
              <h1>
                <span className="rise" style={{ animationDelay: ".2s" }}>
                  Fill every table,
                </span>
                <span className="rise grad" style={{ animationDelay: ".32s" }}>
                  every single night.
                </span>
              </h1>
              <p className="rise hero-sub" style={{ animationDelay: ".45s" }}>
                Six apps for independent restaurants: bookings, a waitlist, pickup orders, a stamp card, reviews and gift cards. They share one guest list.
              </p>
              <div className="rise" style={{ animationDelay: ".55s" }}>
                <button type="button" className="button button-light button-lg" onClick={() => pick("book")}>
                  See the apps
                </button>
              </div>
              <p className="rise hero-rating" style={{ animationDelay: ".65s" }}>
                4.8 <Stars /> from 5,120 imaginary restaurants
              </p>
            </div>
            <div className="hero-shot rise" style={{ animationDelay: ".75s" }}>
              <Halftone className="hero-edges" colors={["#3a1a10", "#8a3318", "#e8582f", "#ffb08c"]} cell={6} dot="round" seed={9} shape="left" scale={20} bias={-0.04} />
              <Halftone className="hero-edges hero-edges-r" colors={["#3a2a08", "#8c5f0a", "#e8a012", "#ffd98a"]} cell={6} dot="round" seed={13} shape="right" scale={20} bias={-0.04} />
              <div className="hero-window">
                <Floor />
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
                <span key={app + "g"} className="dot-in show-goal">
                  {current.goal}
                </span>
              </h2>
            </div>
            <div className="stage" style={{ background: current.wash }}>
              <Halftone key={app} className="stage-bg" colors={current.inks} cell={7} dot="round" seed={apps.findIndex((a) => a.id === app) + 5} scale={22} bias={-0.1} />
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
                  <Site app={app} />
                </div>
              </Tabs>
            </div>
          </section>

          <section className="night" id="night" aria-labelledby="night-title">
            <div className="row-head row-head-split" data-reveal>
              <div>
                <h2 id="night-title">A Friday with Mesa.</h2>
                <p>Six apps, one service. Here is who does what, hour by hour.</p>
              </div>
              <span className="night-clock mono">
                <Clock3 size={15} /> 16:30 → Sunday
              </span>
            </div>
            <ol className="night-grid">
              {apps.map((a, i) => (
                <motion.li key={a.id} className="night-card" data-reveal whileHover={{ y: -4 }} transition={spring}>
                  <button type="button" onClick={() => pick(a.id)} aria-label={`${a.name} at ${a.time}: ${a.moment}`}>
                    <div className="night-ht">
                      <Halftone colors={a.inks} cell={6} dot="round" seed={i * 2 + 30} scale={14} shape="rise" bias={0.02} />
                      <span className="night-time mono">{a.time}</span>
                      <Moment id={a.id} />
                    </div>
                    <div className="night-txt">
                      <h3>
                        <AppTile id={a.id} size={16} /> {a.name}
                      </h3>
                      <p>{a.moment}</p>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ol>
          </section>

          <section className="numbers" aria-label="Results">
            {stats.map((s, i) => (
              <div key={s.label} className="num" data-reveal>
                <b>
                  <CountIn value={s.v} suffix={s.suffix} format={s.v < 10 ? { minimumFractionDigits: 1 } : undefined} />
                </b>
                <span>{s.label}</span>
                <Halftone className="num-ht" colors={["#efe5d6", "#e1cdb3", "#c9a983"]} cell={5} dot="round" seed={40 + i} scale={12} shape="right" bias={0.02} />
              </div>
            ))}
          </section>

          <section className="voices" id="stories" aria-labelledby="stories-title">
            <div className="row-head" data-reveal>
              <h2 id="stories-title">Kitchens that run on Mesa.</h2>
              <p>Three imaginary restaurants, three different first apps.</p>
            </div>
            <div className="voice" data-reveal>
              <div className="voice-ht" style={{ background: qa.wash }}>
                <Halftone key={quote} colors={qa.inks} cell={7} dot="round" seed={quote * 7 + 3} scale={16} bias={0.04} />
                <span key={q.place} className="voice-mono dot-in">{q.place.split(" ").map((w) => w[0]).join("")}</span>
              </div>
              <div className="voice-body">
                <AnimatePresence mode="wait">
                  <motion.blockquote key={q.place} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={spring}>
                    “{q.text}”
                  </motion.blockquote>
                </AnimatePresence>
                <p className="voice-who">
                  <AppTile id={q.app} size={14} />
                  <span>
                    {q.who} · <b>{q.place}</b>, {q.city}
                  </span>
                </p>
                <div className="voice-tabs" role="tablist" aria-label="Restaurants">
                  {quotes.map((x, i) => (
                    <button key={x.place} type="button" role="tab" aria-selected={quote === i} onClick={() => setQuote(i)}>
                      <b>{x.place}</b>
                      <small>{x.city}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="updates" id="changelog" aria-labelledby="updates-title">
            <div className="row-head row-head-split" data-reveal>
              <div>
                <h2 id="updates-title">Fresh from the kitchen.</h2>
                <p>Every update across the Mesa apps, as it ships.</p>
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
                          {a.name} <AppTile id={u.app} size={12} />
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
              <h2 id="support-title">Someone picks up during service.</h2>
              <p>Friday at 8 pm is when things break. Our team works restaurant hours, and most of them have worked a pass.</p>
              <ul>
                <li>
                  <Headset size={18} /> A real person until your last table
                </li>
                <li>
                  <LifeBuoy size={18} /> Set up for you, menu and floor plan included
                </li>
                <li>
                  <Inbox size={18} /> Your guest list moved over for free
                </li>
              </ul>
              <button type="button" className="talk" onClick={concept}>
                <Face init="CL" tone="#ffa27e" /> Call the team
              </button>
            </div>
            <div className="frame-ht frame-dark" data-reveal>
              <Halftone colors={["#2b231c", "#4a3c30", "#76614d"]} cell={5} dot="round" seed={51} scale={16} bias={0.06} />
              <SupportDesk />
            </div>
          </div>
        </section>

        <div className="rail">
          <section className="faq-wrap" id="faq" aria-labelledby="faq-title">
            <div className="row-head" data-reveal>
              <h2 id="faq-title">Before your next service.</h2>
              <p>
                Still unsure?{" "}
                <button type="button" className="inline-link" onClick={concept}>
                  <MessageCircle size={14} /> Ask a person
                </button>
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
              The room is full.
              <span className="grad-dark"> The phone stays quiet.</span>
            </h2>
            <div className="closing-ctas">
              <button type="button" className="button button-lg" onClick={concept}>
                Open your first app free <ArrowRight size={16} />
              </button>
              <a className="button button-outline button-lg" href="#apps">
                Try the demo
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="rail footer-in">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <Logo /> mesa
            </a>
            <p>Fill every table, every single night.</p>
          </div>
          <div className="footer-cols">
            <div>
              <h4>Apps</h4>
              {apps.map((a) => (
                <button key={a.id} type="button" onClick={() => pick(a.id)}>
                  {a.name}
                </button>
              ))}
            </div>
            <div>
              <h4>Explore</h4>
              <a href="#night">A night</a>
              <a href="#stories">Stories</a>
              <a href="#changelog">Changelog</a>
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
              <a href={SUPPORT}>
                Support the project <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Mesa is a fictional product. The restaurants, guests, numbers and prices are invented for this demo.</p>
            <p>
              4.8 <Stars /> from 5,120 imaginary restaurants
            </p>
          </div>
        </div>
        <div className="giant" aria-hidden="true">
          <Halftone colors={["#ebe2d6", "#d6c6b1", "#b39c80", "#86705a"]} cell={6} dot="round" seed={6} scale={20} shape="text" text="mesa" />
        </div>
      </footer>
      <Toaster />
    </MotionConfig>
  );
}
