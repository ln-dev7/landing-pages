"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useInView, type PanInfo } from "motion/react";
import { ArrowDown, Check, GripVertical, ScanLine } from "lucide-react";
import {
  categories,
  history,
  INCOME,
  months,
  receipts,
  type CategoryId,
} from "./receipts";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const usd = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const;
const usd0 = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
} as const;

type Stage = "idle" | "scan" | "read" | "done";

export function BooksDemo() {
  const [active, setActive] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [fields, setFields] = useState(0);
  const [booked, setBooked] = useState<Record<string, CategoryId>>({});
  const [over, setOver] = useState(false);
  // Drag on mouse and trackpad; on touch screens a tap scans, so the list still scrolls.
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    setCanDrag(window.matchMedia("(pointer: fine)").matches);
  }, []);
  const drop = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const token = useRef(0);
  const inView = useInView(root, { once: true, margin: "-20% 0px" });

  const receipt = receipts.find((r) => r.id === active);

  const scan = useCallback(async (id: string) => {
    token.current += 1;
    const mine = token.current;
    const quick = reduced();
    setActive(id);
    setFields(0);
    setStage("scan");
    if (!quick) await sleep(1300);
    if (token.current !== mine) return;
    setStage("read");
    for (let i = 1; i <= 5; i++) {
      if (!quick) await sleep(240);
      if (token.current !== mine) return;
      setFields(i);
    }
    const r = receipts.find((x) => x.id === id);
    if (r) setBooked((b) => ({ ...b, [id]: b[id] ?? r.category }));
    setStage("done");
  }, []);

  useEffect(() => {
    if (inView) {
      const t = window.setTimeout(() => scan("r1"), reduced() ? 0 : 500);
      return () => window.clearTimeout(t);
    }
  }, [inView, scan]);

  const inside = (info: PanInfo) => {
    const box = drop.current?.getBoundingClientRect();
    if (!box) return false;
    const x = info.point.x - window.scrollX;
    const y = info.point.y - window.scrollY;
    return x > box.left && x < box.right && y > box.top && y < box.bottom;
  };

  const spent = Object.entries(booked).reduce((s, [id]) => {
    const r = receipts.find((x) => x.id === id);
    return s + (r?.total ?? 0);
  }, 0);
  const deductible = Object.entries(booked).reduce((s, [id, cat]) => {
    const r = receipts.find((x) => x.id === id);
    const d = categories.find((c) => c.id === cat)?.deductible ?? 1;
    return s + (r?.total ?? 0) * d;
  }, 0);
  const profit = INCOME - deductible;
  const pot = profit * 0.28;
  const left = receipts.filter((r) => !booked[r.id]);
  const all = [...history, profit];
  const max = Math.max(...history, INCOME);

  const fieldRows = receipt
    ? [
        { k: "Merchant", v: receipt.merchant },
        { k: "Date", v: `${receipt.date}, 2026` },
        { k: "Total", v: `$${receipt.total.toFixed(2)}` },
        { k: "Tax", v: `$${receipt.tax.toFixed(2)}` },
        { k: "Paid with", v: receipt.bank },
      ]
    : [];

  return (
    <div
      className="books"
      ref={root}
      aria-label="Interactive Tally bookkeeping demo"
    >
      <div className="b-col b-inbox">
        <header className="b-head">
          <span className="lbl">01 · Inbox</span>
          <span className="lbl dim">
            <NumberFlow value={left.length} /> to book
          </span>
        </header>
        <p className="b-help">
          {canDrag
            ? "Drag a receipt onto the scanner, or click it."
            : "Tap a receipt to scan it."}
        </p>
        <ul className="inbox">
          {receipts.map((r) => {
            const done = Boolean(booked[r.id]);
            return (
              <motion.li
                key={r.id}
                layout
                drag={!done && canDrag}
                data-drag={!done && canDrag}
                dragSnapToOrigin
                dragElastic={0.6}
                whileDrag={{
                  scale: 1.04,
                  rotate: -2,
                  zIndex: 20,
                  boxShadow: "8px 8px 0 #0d0d0d",
                }}
                onDrag={(_, info) => setOver(inside(info))}
                onDragEnd={(_, info) => {
                  setOver(false);
                  if (inside(info)) scan(r.id);
                }}
                data-done={done}
                data-active={active === r.id}
              >
                <button
                  type="button"
                  onClick={() => scan(r.id)}
                  aria-label={`Scan ${r.merchant} receipt`}
                >
                  <GripVertical size={14} className="grip" aria-hidden="true" />
                  <span className="in-name">
                    <strong>{r.merchant}</strong>
                    <small>{r.what}</small>
                  </span>
                  <span className="in-amt">${r.total.toFixed(2)}</span>
                  <span className="in-state">
                    {done ? <Check size={14} /> : <ScanLine size={14} />}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className="b-col b-scan">
        <header className="b-head">
          <span className="lbl">02 · Scanner</span>
          <span className="lbl dim">
            {stage === "scan"
              ? "reading…"
              : stage === "read"
                ? "extracting"
                : stage === "done"
                  ? "booked"
                  : "ready"}
          </span>
        </header>
        <div className="drop" ref={drop} data-over={over} data-stage={stage}>
          <AnimatePresence mode="wait">
            {receipt ? (
              <motion.div
                key={receipt.id}
                className="paper"
                initial={{ y: -40, opacity: 0, rotate: -3 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 30, opacity: 0, rotate: 2 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              >
                <strong className="p-merchant">
                  {receipt.merchant.toUpperCase()}
                </strong>
                <span className="p-date">{receipt.date} 2026 · 12:41</span>
                <ul>
                  {receipt.items.map(([n, v]) => (
                    <li key={n}>
                      <span>{n}</span>
                      <span>{v.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-total">
                  <span>TOTAL</span>
                  <span>{receipt.total.toFixed(2)}</span>
                </div>
                <span className="p-thanks">THANK YOU</span>
                {stage === "scan" && (
                  <span className="beam" aria-hidden="true" />
                )}
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                className="drop-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ArrowDown size={18} /> Drop a receipt here
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="b-col b-out">
        <header className="b-head">
          <span className="lbl">03 · Booked as</span>
          {receipt && stage !== "scan" && (
            <span className="lbl conf">
              <NumberFlow
                value={receipt.confidence}
                format={{ style: "percent" }}
              />{" "}
              sure
            </span>
          )}
        </header>
        <dl className="fields">
          {fieldRows.map((f, i) => (
            <div key={f.k} data-on={i < fields}>
              <dt>{f.k}</dt>
              <dd>
                <AnimatePresence mode="wait">
                  {i < fields ? (
                    <motion.span
                      key={receipt?.id + f.k}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {f.v}
                    </motion.span>
                  ) : (
                    <span className="ph">—</span>
                  )}
                </AnimatePresence>
              </dd>
            </div>
          ))}
        </dl>
        <div className="cats" role="radiogroup" aria-label="Category">
          {categories.map((c) => {
            const on = active
              ? (booked[active] ?? receipt?.category) === c.id
              : false;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={stage !== "done" || !active}
                onClick={() =>
                  active && setBooked((b) => ({ ...b, [active]: c.id }))
                }
              >
                {on && (
                  <motion.span
                    layoutId="cat-mark"
                    className="cat-mark"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
        <p className="b-note">
          {receipt && stage === "done"
            ? `${categories.find((c) => c.id === (booked[receipt.id] ?? receipt.category))?.deductible === 0.5 ? "50% deductible as a business meal." : "Fully deductible."} Matched to your bank feed.`
            : "Tally picks a category. Change it if it’s wrong; it learns."}
        </p>
      </div>

      <div className="ledger">
        {[
          { k: "Income, Nov", v: INCOME },
          { k: "Expenses booked", v: spent },
          { k: "Profit", v: profit },
          { k: "Set aside for tax", v: pot, hot: true },
        ].map((x) => (
          <div key={x.k} className="ledger-cell" data-hot={x.hot}>
            <span className="lbl">{x.k}</span>
            <strong>
              <NumberFlow
                value={x.v}
                format={x.k === "Expenses booked" ? usd : usd0}
                locales="en-US"
              />
            </strong>
          </div>
        ))}
        <div className="ledger-chart" aria-label="Profit by month">
          {all.map((v, i) => (
            <div key={months[i]} className="bar-wrap">
              <motion.span
                className="bar"
                data-now={i === all.length - 1}
                initial={false}
                animate={{ height: `${(v / max) * 100}%` }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              <small>{months[i]}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
