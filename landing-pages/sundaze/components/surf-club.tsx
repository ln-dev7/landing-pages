"use client";
import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Menu,
  Plus,
  Minus,
  Check,
  Waves,
  Sun,
  Coffee,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WaterImage } from "./water-image";
import { MotionTitle } from "./motion-title";
import { ScrollChoreography } from "./scroll-choreography";
import { SurfSchool } from "./surf-school";
import { Toaster } from "./ui/sonner";

const sessions = [
  {
    id: "foam",
    name: "First foam",
    level: "NEVER SURFED? PERFECT.",
    headline: "Everyone starts\nsomewhere.",
    description:
      "Soft boards, small waves, and a whole lot of cheering. Get comfortable in the water and find your feet, one happy wipeout at a time.",
    price: 65,
    duration: "2 hours",
    group: "Up to 6 people",
    capacity: 6,
    image: "lineup",
    alt: "Surfers sharing gentle turquoise waves",
    includes: ["Board & wetsuit", "Beach-side basics", "A very patient coach"],
  },
  {
    id: "line",
    name: "Find your line",
    level: "A LITTLE MORE CONFIDENT.",
    headline: "Less thinking.\nMore flowing.",
    description:
      "You can stand up. Now make the wave your own. Work on your positioning, reading the water, and linking those first turns.",
    price: 85,
    duration: "2.5 hours",
    group: "Up to 4 people",
    capacity: 4,
    image: "wave",
    alt: "A surfer riding a blue wave, seen from above",
    includes: [
      "Board & wetsuit",
      "Small-group coaching",
      "A little post-surf feedback",
    ],
  },
  {
    id: "dawn",
    name: "Dawn patrol",
    level: "FOR THE EARLY BIRDS.",
    headline: "First light.\nBest feeling.",
    description:
      "For confident paddlers who know their way around a wave. Share an early session, find a new line, and make it back for coffee.",
    price: 45,
    duration: "90 minutes",
    group: "Up to 6 people",
    capacity: 6,
    image: "sunset",
    alt: "A surfer gliding across a wave under a pink sky",
    includes: [
      "A local surf guide",
      "A shared wave check",
      "Coffee after the paddle",
    ],
  },
];
const faqs = [
  [
    "Do I need to have surfed before?",
    "Not for First foam. That session is built around beginners. You should be able to swim and feel comfortable in the sea; your coach would always check conditions before entering the water.",
  ],
  [
    "What would I bring?",
    "A swimsuit, towel, drinking water and reef-conscious sun protection. Boards and wetsuits are included in First foam and Find your line. Bring your own board for Dawn patrol.",
  ],
  [
    "What if the ocean has other plans?",
    "The ocean gets the final say. A real surf school would move or reschedule a session when conditions are unsuitable. No wave is worth rushing into.",
  ],
  [
    "Can I come on my own?",
    "Absolutely. The idea is to arrive as you are and leave knowing a few more people. Small groups keep things friendly.",
  ],
  [
    "Can I book an actual session here?",
    "Sundaze is a fictional surf club and an open-source design project. The session planner is a local demo: no bookings, payments or emails are sent.",
  ],
];
function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="23" stroke="currentColor" strokeWidth="5" />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d="M50 5V17"
          stroke="currentColor"
          strokeWidth="5"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <path d="M40 54q10 12 20 0" stroke="currentColor" strokeWidth="3" />
      <circle cx="42" cy="43" r="2.5" fill="currentColor" />
      <circle cx="58" cy="43" r="2.5" fill="currentColor" />
    </svg>
  );
}
function SessionPlanner({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: string;
}) {
  const [selected, setSelected] = useState(initial);
  const [guests, setGuests] = useState(1);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const session = sessions.find((s) => s.id === selected)!;
  useEffect(() => {
    if (open) {
      setSelected(initial);
      setGuests((g) =>
        Math.min(g, sessions.find((s) => s.id === initial)!.capacity),
      );
      setDone(false);
    }
  }, [open, initial]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="planner">
        <span className="eyebrow">A GOOD MORNING STARTS HERE</span>
        <SheetTitle>
          {done ? "Looks like a plan." : "Find your wave."}
        </SheetTitle>
        <SheetDescription>
          {done
            ? "Your demo session plan is ready. Nothing has been booked."
            : "Make a little room for the ocean. This planner is a demo, not a real booking."}
        </SheetDescription>
        {done ? (
          <div className="plan-done" role="status">
            <SunMark />
            <h3>See you out there, {name.trim() || "friend"}.</h3>
            <dl>
              <div>
                <dt>Your session</dt>
                <dd>{session.name}</dd>
              </div>
              <div>
                <dt>Your crew</dt>
                <dd>
                  {guests} {guests === 1 ? "surfer" : "surfers"}
                </dd>
              </div>
              <div>
                <dt>Sample total</dt>
                <dd>€{session.price * guests}</dd>
              </div>
            </dl>
            <p>
              Pack a towel. Bring your curiosity.
              <br />
              Leave a little space for the unexpected.
            </p>
            <Button onClick={() => setDone(false)}>
              Adjust my plan <ArrowRight size={18} />
            </Button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <Label className="field-heading">01 / Choose your session</Label>
            <Tabs
              value={selected}
              onValueChange={(v) => {
                setSelected(String(v));
                setGuests((g) =>
                  Math.min(g, sessions.find((s) => s.id === v)!.capacity),
                );
              }}
            >
              <TabsList aria-label="Your surf session">
                {sessions.map((s) => (
                  <TabsTrigger key={s.id} value={s.id}>
                    {s.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="planner-detail">
              <Waves />
              <span>
                {session.duration} · €{session.price} per person
              </span>
            </div>
            <div className="guest-field">
              <Label className="field-heading">02 / Your crew</Label>
              <div className="counter">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  aria-label="Remove one surfer"
                  disabled={guests === 1}
                  onClick={() => setGuests((g) => g - 1)}
                >
                  <Minus size={16} />
                </Button>
                <output aria-live="polite">{guests}</output>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  aria-label="Add one surfer"
                  disabled={guests === session.capacity}
                  onClick={() => setGuests((g) => g + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            <Label htmlFor="surfer-name" className="field-heading">
              03 / What should we call you?
            </Label>
            <Input
              id="surfer-name"
              required
              maxLength={40}
              autoComplete="given-name"
              placeholder="Your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="plan-total">
              <span>Sample total</span>
              <strong>€{session.price * guests}</strong>
            </div>
            <Button type="submit" className="wide">
              Make my session plan <ArrowUpRight size={20} />
            </Button>
            <p className="fineprint">
              No payment. No reservation. Your information stays in this page.
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
export default function SurfClub() {
  const [menu, setMenu] = useState(false),
    [planner, setPlanner] = useState(false),
    [initial, setInitial] = useState("foam"),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  function plan(id = "foam") {
    setInitial(id);
    setPlanner(true);
  }
  const nav = [
    ["The club", "#club"],
    ["Surf school", "#surf-school"],
    ["The sessions", "#sessions"],
    ["Good to know", "#faq"],
  ];
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="site-header">
        <a className="logo" href="#" aria-label="Sundaze home">
          sundaze
          <SunMark />
        </a>
        <nav aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Button className="button-yellow" onClick={() => plan()}>
            Let’s get salty <ArrowUpRight size={18} />
          </Button>
          <Button
            className="mobile-menu"
            variant="unstyled"
            aria-label="Open navigation"
            onClick={() => setMenu(true)}
          >
            <Menu />
          </Button>
        </div>
      </header>
      <ScrollChoreography />
      <main id="main">
        <section className="hero">
          <Image
            src="/images/lineup.jpg"
            fill
            sizes="100vw"
            loading="eager"
            alt="Surfers catching small waves together in clear turquoise water"
          />
          <WaterImage src="/images/lineup.jpg" className="hero-water" />
          <div className="hero-shade" />
          <div className="hero-topline">
            <span>LESS SCREEN TIME. MORE SEA TIME.</span>
            <span>A SURF CLUB FOR THE GOOD DAYS.</span>
          </div>
          <div className="hero-copy">
            <MotionTitle
              as="h1"
              lines={[
                { text: "A little salt." },
                { text: "A lot of good.", accent: true },
              ]}
            />
            <p>
              First waves. New friends. The kind of tired
              <br className="desktop-break" /> that makes you feel a little more
              alive.
            </p>
            <a href="#sessions" className="button button-yellow">
              Find your next wave <ArrowUpRight size={22} />
            </a>
          </div>
          <div className="hero-stamp">
            <SunMark />
            <span>
              GOOD TIMES
              <br />
              COME IN WAVES
            </span>
          </div>
          <div className="hero-bottom">
            <span>NO EGO. JUST OCEAN.</span>
            <a href="#club">
              Take a little look <ArrowDown size={18} />
            </a>
            <span>EST. IN A DAYDREAM / 2026</span>
          </div>
        </section>
        <section id="club" className="club section">
          <div className="club-title" data-reveal>
            <span className="eyebrow">01 / THE CLUB</span>
            <MotionTitle
              lines={[
                { text: "Not here" },
                { text: "to be perfect.", outline: true },
                { text: "Here to be" },
                { text: "present.", outline: true },
              ]}
            />
          </div>
          <div className="club-right" data-reveal>
            <div className="club-photo">
              <Image
                src="/images/wave.jpg"
                fill
                sizes="(max-width:700px) 90vw, 42vw"
                alt="Two surfers finding their own lines along a breaking wave"
              />
              <span className="photo-label">A LITTLE OUT OF OFFICE.</span>
            </div>
            <div className="club-note">
              <span className="note-arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
              <div>
                <h3>
                  The ocean doesn’t care
                  <br />
                  about your inbox.
                </h3>
                <p>
                  Neither do we. Sundaze is a place for getting your hair wet,
                  finding your feet, and sharing the good bits. No perfect
                  pop-up required. Just you, a board, and a little willingness
                  to fall in.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className={`ticker ${paused ? "is-paused" : ""}`}>
          <div className="ticker-track">
            {[0, 1].map((i) => (
              <div key={i} aria-hidden={i === 1}>
                {[
                  "BAD HAIR.",
                  "GOOD WAVES.",
                  "BETTER COMPANY.",
                  "BAD HAIR.",
                  "GOOD WAVES.",
                  "BETTER COMPANY.",
                ].map((t, index) => (
                  <span key={index} aria-hidden={index >= 3 ? true : undefined}>
                    {t}
                    <SunMark />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <Button
            variant="unstyled"
            className="ticker-pause"
            aria-label={
              paused ? "Resume scrolling band" : "Pause scrolling band"
            }
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </Button>
        </div>
        <SurfSchool onPlan={() => plan()} />
        <section id="sessions" className="sessions section">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow">06 / PICK YOUR PADDLE</span>
              <MotionTitle
                lines={[
                  { text: "Your wave." },
                  { text: "Your pace.", outline: true },
                ]}
              />
            </div>
            <p>
              No two surfers are the same.
              <br />
              There’s a good morning here for you.
            </p>
          </div>
          <Tabs defaultValue="foam">
            <TabsList aria-label="Explore surf sessions">
              {sessions.map((s, i) => (
                <TabsTrigger key={s.id} value={s.id}>
                  <span>0{i + 1}</span>
                  {s.name}
                  <ArrowUpRight size={19} />
                </TabsTrigger>
              ))}
            </TabsList>
            {sessions.map((s) => (
              <TabsContent key={s.id} value={s.id}>
                <div className="session-picture">
                  <Image
                    src={`/images/${s.image}.jpg`}
                    fill
                    sizes="(max-width:700px) 90vw, 50vw"
                    alt={s.alt}
                  />
                  <span>{s.level}</span>
                </div>
                <div className="session-copy">
                  <span className="eyebrow">
                    {s.duration} / {s.group}
                  </span>
                  <h3>
                    {s.headline.split("\n").map((l, i) => (
                      <span key={i}>
                        {l}
                        <br />
                      </span>
                    ))}
                  </h3>
                  <p>{s.description}</p>
                  <ul>
                    {s.includes.map((t) => (
                      <li key={t}>
                        <Check size={16} />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="session-price">
                    <span>
                      <strong>€{s.price}</strong> / person
                    </span>
                    <Button onClick={() => plan(s.id)}>
                      That’s my wave <ArrowUpRight size={18} />
                    </Button>
                  </div>
                  <small>Sample session & pricing · fictional surf club</small>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
        <section className="morning">
          <div className="morning-photo">
            <WaterImage src="/images/sunset.jpg" />
            <Image
              src="/images/sunset.jpg"
              fill
              sizes="100vw"
              alt="A surfer enjoying a quiet wave in the soft light of a pink sky"
            />
          </div>
          <div className="morning-content">
            <span className="eyebrow">
              07 / THE BEST KIND OF NOTHING PLANNED
            </span>
            <MotionTitle
              lines={[
                { text: "A very good" },
                { text: "use of a morning.", outline: true },
              ]}
            />
            <div className="morning-steps">
              {[
                [
                  Sun,
                  "01",
                  "Meet on the sand",
                  "Say hello. Stretch it out. Find a board that feels right.",
                ],
                [
                  Waves,
                  "02",
                  "Follow the feeling",
                  "A little practice. A little courage. A whole lot of water.",
                ],
                [
                  Coffee,
                  "03",
                  "Stay for the stories",
                  "Salty skin, warm coffee, and “did you see that one?”",
                ],
              ].map(([Icon, n, title, desc]) => {
                const I = Icon as typeof Sun;
                return (
                  <div key={String(n)} data-reveal>
                    <I strokeWidth={1.5} />
                    <span>{String(n)}</span>
                    <h3>{String(title)}</h3>
                    <p>{String(desc)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="faq" className="faq section">
          <div data-reveal>
            <span className="eyebrow">08 / BEFORE YOU JUMP IN</span>
            <MotionTitle
              lines={[{ text: "A few" }, { text: "shore things." }]}
            />
            <SunMark className="faq-sun" />
          </div>
          <Accordion>
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={String(i)}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="last-call">
          <div>
            <span className="eyebrow">THE TABS CAN WAIT.</span>
            <MotionTitle
              lines={[
                { text: "See you" },
                { text: "out there.", outline: true },
              ]}
            />
            <Button className="button-yellow" onClick={() => plan()}>
              Make room for a wave <ArrowUpRight />
            </Button>
          </div>
          <SunMark className="last-sun" />
          <a href="#" className="back-top" aria-label="Back to top">
            <ArrowUpRight />
          </a>
        </section>
      </main>
      <footer>
        <a href="#" className="logo">
          sundaze
          <SunMark />
        </a>
        <span>A fictional surf club. A real good feeling.</span>
        <div>
          <a href="https://lndev.me" target="_blank" rel="noreferrer">
            Built by LN <ArrowUpRight size={13} />
          </a>
          <a
            href="https://github.com/ln-dev7/landing-pages/tree/main/landing-pages/sundaze"
            target="_blank"
            rel="noreferrer"
          >
            Code & licenses <ArrowUpRight size={13} />
          </a>
          <a
            href="https://lndev.mychariow.shop/prd_3cu1s0"
            target="_blank"
            rel="noreferrer"
          >
            Support the project <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent className="nav-sheet">
          <SheetTitle>Let’s get outside.</SheetTitle>
          <SheetDescription>
            A little less screen. A little more sea.
          </SheetDescription>
          <nav>
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <SunMark />
        </SheetContent>
      </Sheet>
      <Toaster />
      <SessionPlanner
        open={planner}
        onOpenChange={setPlanner}
        initial={initial}
      />
    </>
  );
}
