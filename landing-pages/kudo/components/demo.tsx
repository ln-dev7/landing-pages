"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck,
  CalendarClock,
  Check,
  CircleCheck,
  Crown,
  GraduationCap,
  HandCoins,
  Heart,
  Lock,
  Mail,
  Minus,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Star,
  User,
  Video,
} from "lucide-react";
import NumberFlow from "@number-flow/react";
import { spring } from "./motion-kit";
import { apps, creator, days, issues, lessons, products, slots, tiers, tipAmounts, type AppId } from "./data";

export const appIcons = {
  tips: HandCoins,
  members: Crown,
  shop: ShoppingBag,
  bookings: CalendarClock,
  courses: GraduationCap,
  letters: Mail,
} as const;

export function AppTile({ id, size = 22 }: { id: AppId; size?: number }) {
  const app = apps.find((a) => a.id === id)!;
  const Icon = appIcons[id];
  return (
    <span
      className="app-tile"
      style={{ background: `linear-gradient(160deg, ${app.tile[0]}, ${app.tile[1]})`, width: size + 12, height: size + 12 }}
      aria-hidden="true"
    >
      <Icon size={size * 0.68} strokeWidth={2.2} />
    </span>
  );
}

function Stars() {
  return (
    <span className="stars" aria-label="Rated 4.9 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

/* ---------- Illustrations ---------- */

function Vase({ tone = "#dfe5e8", glaze = "#5a7487", kind = "vase" }: { tone?: string; glaze?: string; kind?: string }) {
  const id = `g-${kind}-${glaze.slice(1)}`;
  return (
    <svg viewBox="0 0 200 220" className="piece" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor={glaze} stopOpacity=".95" />
          <stop offset=".45" stopColor={tone} />
          <stop offset="1" stopColor={glaze} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="206" rx="70" ry="8" fill="#0000000f" />
      {kind === "mug" ? (
        <>
          <path d="M150 92c26 0 26 52 0 52" fill="none" stroke={glaze} strokeWidth="12" strokeLinecap="round" />
          <path d="M48 64h106v120a22 22 0 0 1-22 22H70a22 22 0 0 1-22-22z" fill={`url(#${id})`} />
          <ellipse cx="101" cy="64" rx="53" ry="9" fill={tone} stroke={glaze} strokeOpacity=".4" />
        </>
      ) : kind === "plate" ? (
        <>
          <ellipse cx="100" cy="150" rx="88" ry="40" fill={`url(#${id})`} />
          <ellipse cx="100" cy="144" rx="62" ry="24" fill={tone} />
        </>
      ) : (
        <>
          <path d="M80 30h40v14c0 10 34 30 34 78 0 50-24 84-54 84s-54-34-54-84c0-48 34-68 34-78z" fill={`url(#${id})`} />
          <ellipse cx="100" cy="30" rx="20" ry="5" fill={tone} stroke={glaze} strokeOpacity=".4" />
        </>
      )}
      {Array.from({ length: 22 }).map((_, i) => (
        <circle key={i} cx={60 + ((i * 37) % 80)} cy={80 + ((i * 53) % 110)} r="1.4" fill={glaze} opacity=".35" />
      ))}
    </svg>
  );
}

function Face({ init, tone }: { init: string; tone: string }) {
  return (
    <span className="face" style={{ background: tone }}>
      {init}
    </span>
  );
}

const supporters = [
  ["MT", "#ffd76a"],
  ["DF", "#8fd2ff"],
  ["NH", "#b9a4ff"],
  ["AK", "#8be3b6"],
  ["JS", "#ff9fcf"],
  ["RB", "#ffab8a"],
  ["EL", "#c6c6cc"],
  ["OP", "#ffd76a"],
  ["CV", "#8be3b6"],
];

function Media({ app, product, lesson }: { app: AppId; product: string; lesson: number }) {
  const p = products.find((x) => x.id === product)!;
  if (app === "members")
    return (
      <div className="media media-wall">
        <span className="media-tag">Supporters wall</span>
        <div className="wall">
          {supporters.map(([i, t], k) => (
            <motion.span key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.05 * k }}>
              <Face init={i} tone={t} />
            </motion.span>
          ))}
        </div>
        <p className="wall-count">
          <b>1,284</b> members this month
        </p>
      </div>
    );
  if (app === "bookings")
    return (
      <div className="media media-call">
        <span className="media-tag">
          <Video size={12} /> Studio call
        </span>
        <div className="call">
          <div className="call-main">
            <Vase kind="vase" />
          </div>
          <div className="call-pip">
            <Face init="YO" tone="#8fd2ff" />
          </div>
          <span className="call-time mono">24:10</span>
        </div>
      </div>
    );
  if (app === "courses")
    return (
      <div className="media media-player">
        <span className="media-tag">Lesson {lesson + 1} of {lessons.length}</span>
        <div className="player">
          <Vase kind="mug" tone="#ece8df" glaze="#9c8b70" />
          <button type="button" className="player-play" aria-label="Play lesson">
            <Play size={18} fill="currentColor" />
          </button>
          <div className="player-bar">
            <motion.i animate={{ width: `${((lesson + 0.4) / lessons.length) * 100}%` }} transition={spring} />
          </div>
        </div>
        <p className="player-title">{lessons[lesson].t}</p>
      </div>
    );
  if (app === "letters")
    return (
      <div className="media media-letter">
        <span className="media-tag">Letter #{issues[0].n}</span>
        <div className="letter">
          <p className="letter-from">From Lina · {issues[0].d}</p>
          <h4>{issues[0].t}</h4>
          <div className="letter-img">
            <Vase kind="plate" tone="#ece8df" glaze="#9c8b70" />
          </div>
          <p className="letter-lines">
            <i />
            <i />
            <i style={{ width: "62%" }} />
          </p>
        </div>
      </div>
    );
  return (
    <div className="media">
      <span className="media-tag">{app === "shop" ? "Bestseller" : "New this week"}</span>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={app === "shop" ? p.id : "vase"}
          className="media-piece"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={spring}
        >
          {app === "shop" ? <Vase kind={p.id} tone={p.tone} glaze={p.glaze} /> : <Vase kind="vase" />}
        </motion.div>
      </AnimatePresence>
      {app === "tips" && (
        <motion.p className="tip-float" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.3 }}>
          <Face init="MT" tone="#ffd76a" /> Mei tipped $5 · “love the blue glaze”
        </motion.p>
      )}
    </div>
  );
}

/* ---------- Modules ---------- */

function TipsModule({ onSent }: { onSent: () => void }) {
  const [pick, setPick] = useState(5);
  const [sent, setSent] = useState(false);
  const [raised, setRaised] = useState(312);
  return (
    <div className="mod">
      <div className="radio-list" role="radiogroup" aria-label="Tip amount">
        {tipAmounts.map((t) => (
          <button key={t.amount} type="button" role="radio" aria-checked={pick === t.amount} className="radio-card" onClick={() => { setPick(t.amount); setSent(false); }}>
            <span className="radio-dot" />
            <span className="radio-main">
              <b>${t.amount}</b>
              <small>{t.label}</small>
            </span>
            {t.amount === 5 && <span className="chip-dark">Most sent</span>}
          </button>
        ))}
      </div>
      <div className="goal">
        <div className="goal-top">
          <span>Goal: a new kiln shelf</span>
          <b>
            <NumberFlow value={raised} prefix="$" /> / $400
          </b>
        </div>
        <div className="goal-bar">
          <motion.i animate={{ width: `${Math.min(100, (raised / 400) * 100)}%` }} transition={spring} />
        </div>
      </div>
      <button
        type="button"
        className="buy"
        id="kudo-buy"
        onClick={() => {
          if (sent) return;
          setSent(true);
          setRaised((r) => r + pick);
          onSent();
        }}
      >
        {sent ? (
          <>
            <Check size={16} /> Sent · Lina says thanks
          </>
        ) : (
          <>Send a ${pick} tip</>
        )}
      </button>
    </div>
  );
}

function MembersModule() {
  const [pick, setPick] = useState("studio");
  const [joined, setJoined] = useState(false);
  const tier = tiers.find((t) => t.id === pick)!;
  return (
    <div className="mod">
      <div className="radio-list" role="radiogroup" aria-label="Membership tier">
        {tiers.map((t) => (
          <button key={t.id} type="button" role="radio" aria-checked={pick === t.id} className="radio-card" onClick={() => { setPick(t.id); setJoined(false); }}>
            <span className="radio-dot" />
            <span className="radio-main">
              <b>{t.name}</b>
              <small>{t.perks[0]}</small>
            </span>
            {t.tag && <span className="chip-dark">{t.tag}</span>}
            <span className="radio-price">${t.price}<small>/mo</small></span>
          </button>
        ))}
      </div>
      <ul className="perks">
        {tier.perks.map((p) => (
          <motion.li key={tier.id + p} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={spring}>
            <Check size={13} /> {p}
          </motion.li>
        ))}
      </ul>
      <button type="button" className="buy" onClick={() => setJoined(true)}>
        {joined ? (
          <>
            <BadgeCheck size={16} /> Welcome to {tier.name}
          </>
        ) : (
          <>Join {tier.name} · ${tier.price}/mo</>
        )}
      </button>
    </div>
  );
}

function ShopModule({ product, setProduct, onAdd }: { product: string; setProduct: (p: string) => void; onAdd: (n: number) => void }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const p = products.find((x) => x.id === product)!;
  return (
    <div className="mod">
      <div className="radio-list" role="radiogroup" aria-label="Piece">
        {products.map((x) => (
          <button key={x.id} type="button" role="radio" aria-checked={product === x.id} className="radio-card" onClick={() => { setProduct(x.id); setAdded(false); }}>
            <span className="swatch" style={{ background: `linear-gradient(135deg, ${x.tone}, ${x.glaze})` }} />
            <span className="radio-main">
              <b>{x.name}</b>
              <small>Made to order · ships in 5 days</small>
            </span>
            <span className="radio-price">${x.price}</span>
          </button>
        ))}
      </div>
      <div className="qty-row">
        <span>Quantity</span>
        <div className="stepper">
          <button type="button" aria-label="One less" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus size={14} />
          </button>
          <NumberFlow value={qty} />
          <button type="button" aria-label="One more" onClick={() => setQty((q) => Math.min(9, q + 1))}>
            <Plus size={14} />
          </button>
        </div>
      </div>
      <button type="button" className="buy" onClick={() => { setAdded(true); onAdd(qty); }}>
        {added ? (
          <>
            <Check size={16} /> Added to your bag
          </>
        ) : (
          <>
            Add to bag <NumberFlow value={p.price * qty} prefix="$" />
          </>
        )}
      </button>
    </div>
  );
}

function BookingsModule() {
  const [day, setDay] = useState("fri");
  const [slot, setSlot] = useState("14:00");
  const [booked, setBooked] = useState(false);
  const d = days.find((x) => x.id === day)!;
  return (
    <div className="mod">
      <div className="mod-label">30-min studio call · $40</div>
      <div className="day-row" role="radiogroup" aria-label="Day">
        {days.map((x) => (
          <button key={x.id} type="button" role="radio" aria-checked={day === x.id} className="day" onClick={() => { setDay(x.id); setBooked(false); }}>
            <small>{x.d}</small>
            <b>{x.n}</b>
          </button>
        ))}
      </div>
      <div className="slot-row" role="radiogroup" aria-label="Time">
        {slots.map((s, i) => (
          <button key={s} type="button" role="radio" aria-checked={slot === s} disabled={day === "sat" && i < 2} className="slot mono" onClick={() => { setSlot(s); setBooked(false); }}>
            {s}
          </button>
        ))}
      </div>
      <button type="button" className="buy" onClick={() => setBooked(true)}>
        {booked ? (
          <>
            <CalendarClock size={16} /> Booked · invite sent
          </>
        ) : (
          <>
            Book {d.d} {d.n}, {slot}
          </>
        )}
      </button>
    </div>
  );
}

function CoursesModule({ lesson, setLesson }: { lesson: number; setLesson: (n: number) => void }) {
  return (
    <div className="mod">
      <div className="course-top">
        <span>Wheel throwing, from zero</span>
        <b>
          <NumberFlow value={Math.round((lesson / lessons.length) * 100)} suffix="%" />
        </b>
      </div>
      <div className="goal-bar">
        <motion.i animate={{ width: `${(lesson / lessons.length) * 100}%` }} transition={spring} />
      </div>
      <ol className="lessons">
        {lessons.map((l, i) => (
          <li key={l.t} data-state={i < lesson ? "done" : i === lesson ? "now" : "next"}>
            <span className="lesson-mark">{i < lesson ? <Check size={12} /> : i > lesson + 1 ? <Lock size={11} /> : i + 1}</span>
            <span className="lesson-t">{l.t}</span>
            <span className="mono lesson-m">{l.m} min</span>
          </li>
        ))}
      </ol>
      <button type="button" className="buy" onClick={() => setLesson(Math.min(lessons.length - 1, lesson + 1))}>
        {lesson >= lessons.length - 1 ? "Final lesson unlocked" : <>Mark lesson {lesson + 1} as done</>}
      </button>
    </div>
  );
}

function LettersModule() {
  const [email, setEmail] = useState("you@studio.com");
  const [done, setDone] = useState(false);
  return (
    <div className="mod">
      <form
        className="sub-form"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <label htmlFor="kudo-email" className="sr-only">
          Email
        </label>
        <input id="kudo-email" value={email} onChange={(e) => { setEmail(e.target.value); setDone(false); }} />
        <button type="submit" className="buy">
          {done ? <Check size={16} /> : "Subscribe free"}
        </button>
      </form>
      <AnimatePresence>
        {done && (
          <motion.p className="sub-ok" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }}>
            <CircleCheck size={14} /> Check your inbox, Lina&rsquo;s next letter comes on Thursday.
          </motion.p>
        )}
      </AnimatePresence>
      <div className="mod-label">Latest letters</div>
      <ul className="issues">
        {issues.map((i) => (
          <li key={i.n}>
            <span className="mono">#{i.n}</span>
            <span className="issue-t">{i.t}</span>
            <span className="mono issue-o">{i.opens} opened</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Storefront ---------- */

export function Storefront({ app }: { app: AppId }) {
  const [product, setProduct] = useState("mug");
  const [bag, setBag] = useState(0);
  const [lesson, setLesson] = useState(2);
  const [liked, setLiked] = useState(false);
  return (
    <div className="store">
      <div className="store-bar">
        <nav aria-label="Creator page">
          <b>Page</b>
          <span>Shop</span>
          <span>Posts</span>
        </nav>
        <div className="store-icons">
          <Search size={17} />
          <User size={17} />
          <span className="bag">
            <ShoppingBag size={17} />
            <AnimatePresence>
              {bag > 0 && (
                <motion.i key={bag} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={spring}>
                  {bag}
                </motion.i>
              )}
            </AnimatePresence>
          </span>
        </div>
      </div>
      <div className="store-body">
        <div className="thumbs" aria-hidden="true">
          {products.map((p) => (
            <span key={p.id} data-on={app === "shop" && product === p.id}>
              <Vase kind={p.id} tone={p.tone} glaze={p.glaze} />
            </span>
          ))}
          <span>
            <Vase kind="vase" />
          </span>
        </div>
        <Media app={app} product={product} lesson={lesson} />
        <div className="store-side">
          <div className="store-head">
            <p className="rating">
              <Stars /> 4.9 <span>2,184 supporters</span>
            </p>
            <h3>
              {creator.name}
              <button type="button" className="like" aria-pressed={liked} aria-label="Follow Lina" onClick={() => setLiked((v) => !v)}>
                <Heart size={16} fill={liked ? "currentColor" : "none"} />
              </button>
            </h3>
            <p className="store-craft">
              {creator.craft} · {creator.handle}
            </p>
          </div>
          {app === "tips" && <TipsModule onSent={() => undefined} />}
          {app === "members" && <MembersModule />}
          {app === "shop" && <ShopModule product={product} setProduct={setProduct} onAdd={(n) => setBag((b) => b + n)} />}
          {app === "bookings" && <BookingsModule />}
          {app === "courses" && <CoursesModule lesson={lesson} setLesson={setLesson} />}
          {app === "letters" && <LettersModule />}
        </div>
      </div>
    </div>
  );
}

export { Stars, Vase, Face };
