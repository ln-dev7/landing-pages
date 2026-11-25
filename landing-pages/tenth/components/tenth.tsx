"use client";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDownLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { CountIn, Pill, spring } from "@/components/motion-kit";
import { Credit, Faq, MobileMenu, concept } from "@/components/kit";

const links = [
  { href: "#how", label: "How it splits" },
  { href: "#calculator", label: "Calculator" },
  { href: "#card", label: "The card" },
  { href: "#pricing", label: "Pricing" },
];
const open = () => concept("Tenth", "There is no account to open. Change the share and watch the split instead.");
const usd = { style: "currency", currency: "USD", maximumFractionDigits: 0 } as const;

function Mark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 8.6 6.2L12 12Z" fill="currentColor" />
    </svg>
  );
}

/** Concentric dotted rings behind the card. */
function Rings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-500 -500 1000 1000" aria-hidden="true">
      {[150, 235, 320, 405, 490].map((r, i) => (
        <circle key={r} r={r} fill="none" stroke="currentColor" strokeWidth={i % 2 ? 1.5 : 2.5} strokeDasharray={i % 2 ? "1 9" : "0.1 12"} strokeLinecap="round" />
      ))}
    </svg>
  );
}

function PayCard() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 16 });
  const sy = useSpring(py, { stiffness: 140, damping: 16 });
  const rotateY = useTransform(sx, [0, 1], [-16, 16]);
  const rotateX = useTransform(sy, [0, 1], [12, -12]);
  const gx = useTransform(sx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(sy, [0, 1], ["0%", "100%"]);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, #ffffff3d, transparent 60%)`;

  return (
    <div
      className="card-stage"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div className="paycard" style={{ rotateX, rotateY }} aria-hidden="true">
        <motion.span className="paycard-sheen" style={{ background: sheen }} />
        <Rings className="paycard-rings" />
        <p className="paycard-brand">
          <Mark /> tenth
        </p>
        <span className="paycard-chip" />
        <p className="paycard-number">•••• •••• •••• 4410</p>
        <p className="paycard-name">
          Maya Okafor <span>12/29</span>
        </p>
      </motion.div>
    </div>
  );
}

const shares = [15, 25, 30];
const payments = [
  { from: "Studio Loma", amount: 1200 },
  { from: "Brightside Co.", amount: 640 },
  { from: "Atlas & Finch", amount: 2150 },
  { from: "Mira Books", amount: 480 },
  { from: "Northfold", amount: 900 },
];

function Hero() {
  const [share, setShare] = useState(25);
  const [paid, setPaid] = useState(0);
  const gross = 6400 + payments.slice(0, paid).reduce((t, p) => t + p.amount, 0);
  const aside = Math.round((gross * share) / 100);
  const last = paid > 0 ? payments[paid - 1] : null;

  useEffect(() => {
    if (paid >= payments.length) return;
    const id = window.setTimeout(() => setPaid((p) => p + 1), paid === 0 ? 1600 : 3000);
    return () => window.clearTimeout(id);
  }, [paid]);

  return (
    <section className="hero" id="top">
      <Rings className="hero-rings" />
      <div className="wrap hero-stack">
        <h1>
          <span className="line-1">Spend what’s yours.</span> <span className="line-2">The rest is already set aside.</span>
        </h1>
        <div className="hero-card">
          <div className="tag tag-yours">
            <p>Yours to spend</p>
            <p className="tag-value">
              <NumberFlow value={gross - aside} format={usd} locales="en-US" />
            </p>
          </div>
          <div className="card-col">
            <div className="feed" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={paid}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  {last ? (
                    <>
                      <ArrowDownLeft size={15} /> {last.from} paid <b>${last.amount.toLocaleString("en-US")}</b>
                    </>
                  ) : (
                    <>Waiting for the next payment</>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
            <PayCard />
          </div>
          <div className="tag tag-aside">
            <p>Set aside for tax</p>
            <p className="tag-value">
              <NumberFlow value={aside} format={usd} locales="en-US" />
            </p>
          </div>
        </div>
        <div className="hero-foot">
          <p className="hero-sub">
            Tenth is a card for people who work for themselves. Every payment is split the moment it lands, so the
            balance you see is the balance you can spend.
          </p>
          <div className="hero-actions">
            <Button size="lg" onClick={open}>
              Open your account <ArrowRight size={17} />
            </Button>
            <div className="share" role="group" aria-label="Share set aside from every payment">
              <span>Set aside</span>
              {shares.map((s) => (
                <button key={s} type="button" aria-pressed={share === s} onClick={() => setShare(s)}>
                  {share === s && <Pill id="share-pill" />}
                  <span>{s}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { title: "A client pays you", text: "The money lands in your Tenth account like any transfer. Nothing to tag, nothing to remember." },
  { title: "Your share for tax moves out", text: "Within a second, the share you chose goes into a separate pot the card cannot reach." },
  { title: "What is left is yours", text: "The balance on the card is already net of tax. If it says you can afford it, you can." },
  { title: "The pot pays the bill", text: "When the tax office asks, the money is sitting there. You approve the payment and get on with your day." },
];

function Calculator() {
  const [income, setIncome] = useState(5200);
  const [share, setShare] = useState(25);
  const monthlyAside = Math.round((income * share) / 100);
  return (
    <div className="calc">
      <div className="calc-form">
        <label htmlFor="income">
          <span>You invoice about</span>
          <b>
            <NumberFlow value={income} format={usd} locales="en-US" /> a month
          </b>
        </label>
        <input
          id="income"
          type="range"
          min={1000}
          max={15000}
          step={200}
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          style={{ "--fill": `${((income - 1000) / 14000) * 100}%` } as React.CSSProperties}
        />
        <label htmlFor="share">
          <span>You set aside</span>
          <b>
            <NumberFlow value={share} suffix="%" /> of it
          </b>
        </label>
        <input
          id="share"
          type="range"
          min={10}
          max={40}
          step={1}
          value={share}
          onChange={(e) => setShare(Number(e.target.value))}
          style={{ "--fill": `${((share - 10) / 30) * 100}%` } as React.CSSProperties}
        />
        <p className="fine">An illustration with invented numbers. It is not tax advice.</p>
      </div>
      <div className="calc-result">
        <p>Waiting in the pot after twelve months</p>
        <p className="calc-big">
          <NumberFlow value={monthlyAside * 12} format={usd} locales="en-US" />
        </p>
        <div className="bar" aria-hidden="true">
          <motion.span animate={{ width: `${100 - share}%` }} transition={spring} />
        </div>
        <dl>
          <div>
            <dt>Yours each month</dt>
            <dd>
              <NumberFlow value={income - monthlyAside} format={usd} locales="en-US" />
            </dd>
          </div>
          <div>
            <dt>Set aside each month</dt>
            <dd>
              <NumberFlow value={monthlyAside} format={usd} locales="en-US" />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

const stats = [
  { value: 1, suffix: " sec", label: "from payment to split" },
  { value: 4, suffix: "", label: "deadlines a year, none missed" },
  { value: 0, suffix: "", label: "surprises in April" },
];
const plans = [
  { name: "Tenth", price: "$0", note: "for as long as you like", features: ["The card and the tax pot", "Automatic split on every payment", "One share for all income"], featured: false },
  { name: "Tenth Plus", price: "$9", note: "a month", features: ["A different share per client", "Receipts attached to payments", "Deadline reminders", "Year-end file for your accountant"], featured: true },
];
const faq = [
  { q: "Which share should I pick?", a: "That depends on where you live and what you earn, so ask an accountant. Tenth lets you change the share at any time, and the change applies from the next payment." },
  { q: "Can I take money out of the pot?", a: "Yes, it is your money. Tenth asks you to confirm and shows what the pot will be short of at the next deadline." },
  { q: "My income changes every month. Does that matter?", a: "No. The split is a share of each payment, not a fixed amount, so a slow month sets aside less and a good month sets aside more." },
  { q: "Does the card work everywhere?", a: "In this concept it is an ordinary debit card that works online, in shops and in your phone's wallet." },
  { q: "Is Tenth a real bank?", a: "No. This page is a design concept. The card, the people and every figure are invented, and nothing here is financial advice." },
];

export default function Tenth() {
  const [menu, setMenu] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="wrap header-in">
          <a href="#top" className="brand">
            <Mark /> tenth
          </a>
          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <button type="button" className="text-button nav-extra" onClick={open}>
              Log in
            </button>
            <Button size="sm" className="nav-extra" onClick={open}>
              Get the card
            </Button>
            <button type="button" className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={menu}
        onOpenChange={setMenu}
        name="tenth"
        tagline="Spend what's yours."
        links={links}
        cta="Get the card"
        onCta={open}
      />

      <main id="main">
        <Hero />

        <section className="band">
          <div className="wrap">
            <blockquote>
              <p>“I used to find out what I owed in April. Now I know what is mine every Friday.”</p>
              <footer>Maya Okafor, illustrator, on her own since 2021</footer>
            </blockquote>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>
                    <CountIn value={s.value} suffix={s.suffix} />
                  </dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <div className="head">
              <h2>What happens when you get paid</h2>
            </div>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="step-n">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="calculator">
          <div className="wrap">
            <div className="head">
              <h2>See the split on your own numbers</h2>
            </div>
            <Calculator />
          </div>
        </section>

        <section className="section" id="card">
          <div className="wrap">
            <div className="head split">
              <h2>A card that only knows what is yours</h2>
              <p className="lede">The tax pot lives next to your account, out of the card’s reach. Everything else works like the card you already carry.</p>
            </div>
            <div className="bento">
              <article className="tile tile-wide">
                <div>
                  <h3>One balance, and it is true</h3>
                  <p>No mental maths at the till. The number on the screen has tax taken out already.</p>
                </div>
                <div className="mini-balance" aria-hidden="true">
                  <p>Yours to spend</p>
                  <p className="mini-big">$4,027</p>
                  <ul>
                    <li>
                      Linseed Art Supply <span>−$86</span>
                    </li>
                    <li>
                      Train to Leeds <span>−$42</span>
                    </li>
                    <li>
                      Studio Loma <span className="in">+$900</span>
                    </li>
                  </ul>
                </div>
              </article>
              <article className="tile tile-deep">
                <h3>Deadlines, three weeks ahead</h3>
                <p>Tenth tells you what is due, when, and whether the pot covers it.</p>
                <ul className="dates" aria-hidden="true">
                  {["15 Apr", "15 Jun", "15 Sep", "15 Jan"].map((d, i) => (
                    <li key={d} data-done={i < 2}>
                      {i < 2 ? <Check size={13} strokeWidth={3} /> : null}
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="tile">
                <h3>Receipts stay with the payment</h3>
                <p>Take a photo at the counter. Tenth attaches it to the right line, so expenses are ready when you need them.</p>
              </article>
              <article className="tile">
                <h3>One file for your accountant</h3>
                <p>Income, set-aside and expenses for the year, exported in a single spreadsheet.</p>
              </article>
              <article className="tile">
                <h3>A share per client</h3>
                <p>Set aside more from the client who pays gross, less from the one who withholds.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="wrap pricing">
            <div className="head">
              <h2>Free to split. A little more to stay organised.</h2>
              <p className="lede">Prices are invented for this concept. Nothing is billed.</p>
            </div>
            <div className="plans">
              {plans.map((p) => (
                <article className="plan" key={p.name} data-featured={p.featured}>
                  <p className="plan-name">{p.name}</p>
                  <p className="price">
                    {p.price} <span>{p.note}</span>
                  </p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={15} strokeWidth={2.6} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.featured ? "default" : "outline"} onClick={open}>
                    {p.featured ? "Start with Plus" : "Get the card"}
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap faq-grid">
            <div className="head">
              <h2>Before you ask your accountant</h2>
            </div>
            <Faq items={faq} />
          </div>
        </section>

        <section className="closing">
          <Rings className="closing-rings" />
          <div className="wrap">
            <h2>Know what is yours by Friday.</h2>
            <Button size="lg" onClick={open}>
              Open your account <ArrowRight size={17} />
            </Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <a href="#top" className="brand">
              <Mark /> tenth
            </a>
            <nav aria-label="Footer">
              {links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <Credit slug="tenth" name="Tenth" note="The card, the people and the figures are invented, and nothing here is financial advice." />
        </div>
      </footer>
      <Toaster />
    </MotionConfig>
  );
}
