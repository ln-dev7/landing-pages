"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  CalendarCheck,
  Check,
  Gift,
  MessageSquareQuote,
  Minus,
  Plus,
  Search,
  ShoppingBasket,
  Smartphone,
  Star,
  User,
  Users,
} from "lucide-react";
import NumberFlow from "@number-flow/react";
import { spring } from "./motion-kit";
import { apps, dishes, full, giftAmounts, giftStyles, place, reviewList, times, type AppId } from "./data";

export const appIcons = {
  book: CalendarCheck,
  wait: Users,
  orders: ShoppingBasket,
  loyalty: Award,
  reviews: MessageSquareQuote,
  gifts: Gift,
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

export function Stars({ n = 5, size = 13 }: { n?: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${n} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} fill={i < n ? "currentColor" : "none"} strokeWidth={i < n ? 0 : 1.5} />
      ))}
    </span>
  );
}

export function Face({ init, tone }: { init: string; tone: string }) {
  return (
    <span className="face" style={{ background: tone }}>
      {init}
    </span>
  );
}

/* ---------- Illustrations ---------- */

export function Plate({ tone = "#f4d27a", kind = "cacio" }: { tone?: string; kind?: string }) {
  return (
    <svg viewBox="0 0 200 200" className="plate" aria-hidden="true">
      <ellipse cx="104" cy="112" rx="88" ry="84" fill="#0000000d" />
      <circle cx="100" cy="100" r="86" fill="#fbf8f3" stroke="#e8e0d4" strokeWidth="2" />
      <circle cx="100" cy="100" r="62" fill="#f4eee5" />
      {kind === "tira" ? (
        <>
          <rect x="62" y="70" width="76" height="58" rx="8" fill={tone} />
          <rect x="62" y="70" width="76" height="14" rx="6" fill="#5b3a22" />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={68 + ((i * 23) % 66)} cy={74 + ((i * 7) % 8)} r="1.6" fill="#2d1b10" opacity=".6" />
          ))}
        </>
      ) : (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${62 + i * 3} ${100 + i * 2}c${10 - i} -${30 - i * 2} ${50 + i * 2} -${34 - i} ${66 - i * 4} ${-4 + i}s-${20 + i} ${30 - i} -${46 - i * 3} ${22 - i * 2}`}
              fill="none"
              stroke={tone}
              strokeWidth="7"
              strokeLinecap="round"
              opacity={0.9 - i * 0.06}
            />
          ))}
          {kind === "ragu" && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={80 + i * 10} cy={92 + (i % 2) * 14} r="6" fill="#7a2f17" opacity=".85" />)}
          {kind === "cacio" && Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={70 + ((i * 29) % 62)} cy={74 + ((i * 17) % 54)} r="1.3" fill="#2a2420" opacity=".6" />)}
          <path d="M120 70c6-6 14-4 16 2" stroke="#5b8a2b" strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}

function TableTop() {
  return (
    <svg viewBox="0 0 260 200" className="tabletop" aria-hidden="true">
      <rect x="10" y="10" width="240" height="180" rx="22" fill="#ead9c4" />
      <rect x="10" y="10" width="240" height="180" rx="22" fill="url(#cloth)" opacity=".5" />
      <defs>
        <pattern id="cloth" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#d8bfa2" />
          <rect x="10" y="10" width="10" height="10" fill="#d8bfa2" />
        </pattern>
      </defs>
      <circle cx="78" cy="100" r="40" fill="#fbf8f3" stroke="#e1d6c7" strokeWidth="2" />
      <circle cx="182" cy="100" r="40" fill="#fbf8f3" stroke="#e1d6c7" strokeWidth="2" />
      <circle cx="130" cy="44" r="14" fill="#ffffffb0" stroke="#cbbba6" />
      <circle cx="130" cy="156" r="14" fill="#ffffffb0" stroke="#cbbba6" />
      <rect x="124" y="84" width="12" height="32" rx="6" fill="#e8582f" />
      <path d="M130 84c-3-8 3-12 0-18" stroke="#ffd061" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ---------- Media ---------- */

function Media({ app, dish, stamps, gift }: { app: AppId; dish: string; stamps: number; gift: { amount: number; style: string; to: string } }) {
  if (app === "wait")
    return (
      <div className="media media-phone">
        <span className="media-tag">
          <Smartphone size={12} /> Guest&rsquo;s phone
        </span>
        <div className="phone">
          <p className="phone-top mono">19:52</p>
          <div className="sms">
            <b>Osteria Lume</b>
            <p>Hi Ana, your table for 2 is ready. Come to the bar and we will seat you.</p>
          </div>
          <div className="sms sms-me">On my way!</div>
        </div>
      </div>
    );
  if (app === "loyalty")
    return (
      <div className="media media-card">
        <span className="media-tag">Stamp card</span>
        <div className="stamp-card">
          <p>
            <b>Osteria Lume</b> · regulars
          </p>
          <div className="stamps">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} data-on={i < stamps} data-last={i === 9}>
                {i < stamps ? <Check size={14} /> : i === 9 ? <Gift size={14} /> : i + 1}
              </span>
            ))}
          </div>
          <small>{stamps >= 10 ? "Dessert is on us tonight" : `${10 - stamps} visits to a free dessert`}</small>
        </div>
      </div>
    );
  if (app === "reviews")
    return (
      <div className="media media-rating">
        <span className="media-tag">This month</span>
        <div className="rating-big">
          <b>4.8</b>
          <Stars n={5} size={18} />
          <small>212 new reviews</small>
        </div>
        <ul className="rating-bars">
          {[78, 14, 5, 2, 1].map((v, i) => (
            <li key={i}>
              <span className="mono">{5 - i}</span>
              <span className="rb">
                <motion.i initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ ...spring, delay: i * 0.05 }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  if (app === "gifts") {
    const s = giftStyles.find((x) => x.id === gift.style)!;
    return (
      <div className="media media-gift">
        <span className="media-tag">Preview</span>
        <motion.div key={gift.style} className="gift-card" style={{ background: s.bg }} initial={{ rotate: -4, scale: 0.94, opacity: 0 }} animate={{ rotate: -3, scale: 1, opacity: 1 }} transition={spring}>
          <span className="gift-name">Osteria Lume</span>
          <b>
            <NumberFlow value={gift.amount} suffix=" €" />
          </b>
          <span className="gift-to">For {gift.to || "someone nice"}</span>
          <span className="gift-chip" />
        </motion.div>
      </div>
    );
  }
  if (app === "orders") {
    const d = dishes.find((x) => x.id === dish)!;
    return (
      <div className="media">
        <span className="media-tag">Pickup · ready in 20 min</span>
        <AnimatePresence mode="popLayout">
          <motion.div key={d.id} className="media-piece" initial={{ opacity: 0, rotate: -20, scale: 0.9 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={spring}>
            <Plate kind={d.id} tone={d.tone} />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  return (
    <div className="media">
      <span className="media-tag">Tonight · 2 tables left</span>
      <div className="media-piece">
        <TableTop />
      </div>
    </div>
  );
}

/* ---------- Modules ---------- */

function BookModule() {
  const [size, setSize] = useState(2);
  const [day, setDay] = useState("Tonight");
  const [time, setTime] = useState("20:30");
  const [done, setDone] = useState(false);
  const deposit = size >= 6 ? size * 10 : 0;
  return (
    <div className="mod">
      <div className="qty-row">
        <span>Guests</span>
        <div className="stepper">
          <button type="button" aria-label="One guest less" onClick={() => { setSize((s) => Math.max(1, s - 1)); setDone(false); }}>
            <Minus size={14} />
          </button>
          <NumberFlow value={size} />
          <button type="button" aria-label="One guest more" onClick={() => { setSize((s) => Math.min(12, s + 1)); setDone(false); }}>
            <Plus size={14} />
          </button>
        </div>
      </div>
      <div className="day-row" role="radiogroup" aria-label="Day">
        {["Tonight", "Fri", "Sat", "Sun"].map((d) => (
          <button key={d} type="button" role="radio" aria-checked={day === d} className="day" onClick={() => { setDay(d); setDone(false); }}>
            <b className="day-sm">{d}</b>
          </button>
        ))}
      </div>
      <div className="slot-row slot-row-3" role="radiogroup" aria-label="Time">
        {times.map((t) => (
          <button key={t} type="button" role="radio" aria-checked={time === t} disabled={day === "Tonight" && full.includes(t)} className="slot mono" onClick={() => { setTime(t); setDone(false); }}>
            {t}
          </button>
        ))}
      </div>
      <p className="mod-note">{deposit ? `Deposit of ${deposit} € for groups of six or more, taken off the bill.` : "No deposit for tables under six."}</p>
      <button type="button" className="buy" onClick={() => setDone(true)}>
        {done ? (
          <>
            <Check size={16} /> Table held · see you at {time}
          </>
        ) : (
          <>
            Book for {size}, {day.toLowerCase() === "tonight" ? "tonight" : day} {time}
          </>
        )}
      </button>
    </div>
  );
}

function WaitModule() {
  const [size, setSize] = useState(2);
  const [pos, setPos] = useState<number | null>(null);
  useEffect(() => {
    if (pos === null || pos === 0) return;
    const id = window.setTimeout(() => setPos((p) => (p ? p - 1 : 0)), 1300);
    return () => window.clearTimeout(id);
  }, [pos]);
  return (
    <div className="mod">
      <div className="mod-label">Party size</div>
      <div className="chip-row" role="radiogroup" aria-label="Party size">
        {[1, 2, 3, 4, 6].map((n) => (
          <button key={n} type="button" role="radio" aria-checked={size === n} className="chip-pick" onClick={() => setSize(n)}>
            {n}
          </button>
        ))}
      </div>
      <div className="wait-board">
        <div>
          <small>Wait right now</small>
          <b>{pos === null ? "~15 min" : pos === 0 ? "Now" : `~${pos * 4} min`}</b>
        </div>
        <div>
          <small>Your place</small>
          <b>{pos === null ? "–" : pos === 0 ? "Seated" : <NumberFlow value={pos} prefix="#" />}</b>
        </div>
      </div>
      <AnimatePresence>
        {pos === 0 && (
          <motion.p className="sub-ok" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }}>
            <Check size={14} /> Text sent: your table for {size} is ready.
          </motion.p>
        )}
      </AnimatePresence>
      <button type="button" className="buy" id="mesa-wait" onClick={() => setPos(4)} disabled={pos !== null && pos > 0}>
        {pos === null ? <>Join the waitlist · {size} {size > 1 ? "guests" : "guest"}</> : pos === 0 ? "Table ready" : "You are on the list"}
      </button>
    </div>
  );
}

function OrdersModule({ dish, setDish }: { dish: string; setDish: (d: string) => void }) {
  const [qty, setQty] = useState<Record<string, number>>({ cacio: 1, ragu: 1, tira: 0 });
  const [slot, setSlot] = useState("20:30");
  const [sent, setSent] = useState(false);
  const total = dishes.reduce((s, d) => s + d.price * (qty[d.id] || 0), 0);
  return (
    <div className="mod">
      <ul className="menu-list">
        {dishes.map((d) => (
          <li key={d.id} data-on={dish === d.id}>
            <button type="button" className="menu-name" onClick={() => setDish(d.id)}>
              <span className="swatch" style={{ background: d.tone }} />
              <span>
                <b>{d.name}</b>
                <small>{d.price} €</small>
              </span>
            </button>
            <div className="stepper sm">
              <button type="button" aria-label={`One less ${d.name}`} onClick={() => { setQty((q) => ({ ...q, [d.id]: Math.max(0, (q[d.id] || 0) - 1) })); setSent(false); }}>
                <Minus size={12} />
              </button>
              <NumberFlow value={qty[d.id] || 0} />
              <button type="button" aria-label={`One more ${d.name}`} onClick={() => { setDish(d.id); setQty((q) => ({ ...q, [d.id]: Math.min(9, (q[d.id] || 0) + 1) })); setSent(false); }}>
                <Plus size={12} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="chip-row" role="radiogroup" aria-label="Pickup time">
        {["20:15", "20:30", "20:45"].map((t) => (
          <button key={t} type="button" role="radio" aria-checked={slot === t} className="chip-pick mono" onClick={() => setSlot(t)}>
            {t}
          </button>
        ))}
      </div>
      <button type="button" className="buy" onClick={() => setSent(true)} disabled={!total}>
        {sent ? (
          <>
            <Check size={16} /> Sent to the kitchen · {slot}
          </>
        ) : (
          <>
            Order for pickup · <NumberFlow value={total} suffix=" €" />
          </>
        )}
      </button>
    </div>
  );
}

function LoyaltyModule({ stamps, setStamps }: { stamps: number; setStamps: (n: number) => void }) {
  return (
    <div className="mod">
      <div className="loyal-top">
        <div>
          <small>Guest</small>
          <b>Table 12 · Rui & Sofia</b>
        </div>
        <div>
          <small>Visits</small>
          <b>
            <NumberFlow value={stamps} /> / 10
          </b>
        </div>
      </div>
      <div className="goal-bar">
        <motion.i animate={{ width: `${stamps * 10}%` }} transition={spring} />
      </div>
      <ul className="perks">
        <li><Check size={13} /> Stamp added when the bill is paid</li>
        <li><Check size={13} /> Works in Apple and Google wallets</li>
        <li><Check size={13} /> A birthday glass of wine, on the house</li>
      </ul>
      <button type="button" className="buy" id="mesa-stamp" onClick={() => setStamps(stamps >= 10 ? 7 : stamps + 1)}>
        {stamps >= 10 ? "Reward served · start a new card" : "Add tonight's visit"}
      </button>
    </div>
  );
}

const replyText =
  "Thank you, Marta! Nonna's ragù recipe is staying on the menu all winter. Glad the waitlist text found you at the right moment. See you soon. Inês";

function ReviewsModule() {
  const [typed, setTyped] = useState(0);
  const [sent, setSent] = useState(false);
  const timer = useRef(0);
  const start = () => {
    window.clearInterval(timer.current);
    setSent(false);
    setTyped(0);
    timer.current = window.setInterval(() => {
      setTyped((n) => {
        if (n >= replyText.length) {
          window.clearInterval(timer.current);
          return n;
        }
        return n + 3;
      });
    }, 30);
  };
  useEffect(() => () => window.clearInterval(timer.current), []);
  const r = reviewList[0];
  return (
    <div className="mod">
      <div className="review">
        <div className="review-top">
          <b>{r.who}</b>
          <Stars n={r.stars} size={12} />
          <span className="mono">{r.src}</span>
        </div>
        <p>{r.text}</p>
      </div>
      <div className="reply" data-on={typed > 0}>
        <span className="mono reply-k">Your reply</span>
        <p>
          {typed > 0 ? replyText.slice(0, typed) : "Draft a reply in your voice, then edit it if you like."}
          {typed > 0 && typed < replyText.length && <i className="caret" />}
        </p>
      </div>
      {typed >= replyText.length ? (
        <button type="button" className="buy" onClick={() => setSent(true)}>
          {sent ? (
            <>
              <Check size={16} /> Reply posted on Google
            </>
          ) : (
            "Post the reply"
          )}
        </button>
      ) : (
        <button type="button" className="buy" id="mesa-draft" onClick={start}>
          Draft a reply
        </button>
      )}
    </div>
  );
}

function GiftsModule({ gift, setGift }: { gift: { amount: number; style: string; to: string }; setGift: (g: { amount: number; style: string; to: string }) => void }) {
  const [paid, setPaid] = useState(false);
  return (
    <div className="mod">
      <div className="chip-row" role="radiogroup" aria-label="Amount">
        {giftAmounts.map((a) => (
          <button key={a} type="button" role="radio" aria-checked={gift.amount === a} className="chip-pick" onClick={() => { setGift({ ...gift, amount: a }); setPaid(false); }}>
            {a} €
          </button>
        ))}
      </div>
      <div className="mod-label">Card</div>
      <div className="style-row" role="radiogroup" aria-label="Card style">
        {giftStyles.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={gift.style === s.id} aria-label={`${s.id} card`} style={{ background: s.bg }} onClick={() => { setGift({ ...gift, style: s.id }); setPaid(false); }} />
        ))}
      </div>
      <label className="field">
        <span>For</span>
        <input value={gift.to} onChange={(e) => { setGift({ ...gift, to: e.target.value }); setPaid(false); }} maxLength={22} />
      </label>
      <button type="button" className="buy" onClick={() => setPaid(true)}>
        {paid ? (
          <>
            <Gift size={16} /> Sent to {gift.to || "your guest"}
          </>
        ) : (
          <>Buy a {gift.amount} € gift card</>
        )}
      </button>
    </div>
  );
}

/* ---------- Restaurant site ---------- */

export function Site({ app }: { app: AppId }) {
  const [dish, setDish] = useState("cacio");
  const [stamps, setStamps] = useState(7);
  const [gift, setGift] = useState({ amount: 50, style: "tomato", to: "Mum & Dad" });
  return (
    <div className="store">
      <div className="store-bar">
        <nav aria-label="Restaurant site">
          <b>Book</b>
          <span>Menu</span>
          <span>Gift cards</span>
        </nav>
        <div className="store-icons">
          <Search size={17} />
          <User size={17} />
          <ShoppingBasket size={17} />
        </div>
      </div>
      <div className="store-body store-body-2">
        <Media app={app} dish={dish} stamps={stamps} gift={gift} />
        <div className="store-side">
          <div className="store-head">
            <p className="rating">
              <Stars /> {place.rating} <span>{place.reviews.toLocaleString("en-US")} reviews</span>
            </p>
            <h3>{place.name}</h3>
            <p className="store-craft">{place.where}</p>
          </div>
          {app === "book" && <BookModule />}
          {app === "wait" && <WaitModule />}
          {app === "orders" && <OrdersModule dish={dish} setDish={setDish} />}
          {app === "loyalty" && <LoyaltyModule stamps={stamps} setStamps={setStamps} />}
          {app === "reviews" && <ReviewsModule />}
          {app === "gifts" && <GiftsModule gift={gift} setGift={setGift} />}
        </div>
      </div>
    </div>
  );
}
