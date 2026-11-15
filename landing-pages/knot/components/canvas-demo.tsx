"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Database,
  FileText,
  Filter,
  Globe,
  Mail,
  MessageSquare,
  MousePointer2,
  Play,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import {
  CANVAS_H,
  CANVAS_W,
  NODE_H,
  NODE_W,
  flows,
  type Flow,
  type FlowNode,
} from "./flows";
import { Pill, spring } from "./motion-kit";

const icons: Record<string, typeof Mail> = {
  Payments: CreditCard,
  "AI write": Sparkles,
  Mail,
  Chat: MessageSquare,
  Schedule: Clock,
  Database,
  "AI chart": Bot,
  Calendar: CalendarDays,
  "Web research": Globe,
  Filter,
  Docs: FileText,
  CRM: Users,
};

const kindLabel: Record<FlowNode["kind"], string> = {
  trigger: "When",
  ai: "AI step",
  action: "Then",
  check: "Only if",
};

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Pos = Record<string, { x: number; y: number }>;
type Status = "ok" | "skipped";

function edgePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const ax = a.x + NODE_W / 2;
  const ay = a.y + NODE_H / 2;
  const bx = b.x + NODE_W / 2;
  const by = b.y + NODE_H / 2;
  const dx = bx - ax;
  const dy = by - ay;
  if (Math.abs(dx) >= Math.abs(dy) * 0.9) {
    const s = dx >= 0 ? 1 : -1;
    const x1 = ax + (s * NODE_W) / 2;
    const x2 = bx - (s * NODE_W) / 2;
    const m = (x1 + x2) / 2;
    return `M${x1},${ay} C${m},${ay} ${m},${by} ${x2},${by}`;
  }
  const s = dy >= 0 ? 1 : -1;
  const y1 = ay + (s * NODE_H) / 2;
  const y2 = by - (s * NODE_H) / 2;
  const m = (y1 + y2) / 2;
  return `M${ax},${y1} C${ax},${m} ${bx},${m} ${bx},${y2}`;
}

export function CanvasDemo({
  flowId,
  onFlowChange,
}: {
  flowId: string;
  onFlowChange: (id: string) => void;
}) {
  const flow = flows.find((f) => f.id === flowId) as Flow;
  const [typed, setTyped] = useState(0);
  const [built, setBuilt] = useState(0);
  const [pos, setPos] = useState<Pos>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [off, setOff] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [packets, setPackets] = useState<{ key: string; d: string }[]>([]);
  const [log, setLog] = useState<
    { id: string; text: string; ok: boolean; at: string }[]
  >([]);
  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState(1284);
  const [scale, setScale] = useState(1);
  const wrap = useRef<HTMLDivElement>(null);
  const token = useRef(0);
  const drag = useRef<{
    id: string;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);

  // Reset and rebuild whenever the recipe changes.
  useEffect(() => {
    token.current += 1;
    const mine = token.current;
    setPos(
      Object.fromEntries(flow.nodes.map((n) => [n.id, { x: n.x, y: n.y }])),
    );
    setSelected(null);
    setOff({});
    setStatus({});
    setActive(null);
    setPackets([]);
    setLog([]);
    setRunning(false);
    if (reduced()) {
      setTyped(flow.prompt.length);
      setBuilt(flow.nodes.length);
      return;
    }
    setTyped(0);
    setBuilt(0);
    (async () => {
      await sleep(350);
      for (let i = 1; i <= flow.prompt.length; i += 2) {
        if (token.current !== mine) return;
        setTyped(i);
        await sleep(22);
      }
      setTyped(flow.prompt.length);
      await sleep(260);
      for (let i = 1; i <= flow.nodes.length; i++) {
        if (token.current !== mine) return;
        setBuilt(i);
        await sleep(300);
      }
    })();
  }, [flow]);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    // Small screens keep the steps readable and scroll sideways instead.
    const ro = new ResizeObserver(() =>
      setScale(Math.max(0.62, Math.min(1, el.clientWidth / CANVAS_W))),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ready = typed >= flow.prompt.length && built >= flow.nodes.length;

  const descendants = useCallback(
    (id: string, seen = new Set<string>()) => {
      flow.edges
        .filter((e) => e.from === id)
        .forEach((e) => {
          if (!seen.has(e.to)) {
            seen.add(e.to);
            descendants(e.to, seen);
          }
        });
      return seen;
    },
    [flow],
  );

  const run = async () => {
    if (running || !ready) return;
    token.current += 1;
    const mine = token.current;
    setRunning(true);
    setStatus({});
    setLog([]);
    const quick = reduced();
    const blocked = new Set<string>();
    Object.keys(off)
      .filter((k) => off[k])
      .forEach((k) => {
        blocked.add(k);
        descendants(k).forEach((d) => blocked.add(d));
      });
    const start = flow.nodes.filter(
      (n) => !flow.edges.some((e) => e.to === n.id),
    );
    let wave = start.map((n) => n.id);
    const visited = new Set<string>();
    const clock = new Date(Date.UTC(2026, 10, 6, 9, 41, 0));
    let tick = 0;
    while (wave.length) {
      if (token.current !== mine) return;
      for (const id of wave) {
        visited.add(id);
        const node = flow.nodes.find((n) => n.id === id) as FlowNode;
        setActive(id);
        if (!quick) await sleep(520);
        if (token.current !== mine) return;
        const skipped = blocked.has(id) || node.skip;
        setStatus((s) => ({ ...s, [id]: skipped ? "skipped" : "ok" }));
        tick += 1;
        const at = new Date(clock.getTime() + tick * 1300)
          .toISOString()
          .slice(11, 19);
        setLog((l) => [
          ...l,
          {
            id,
            ok: !skipped,
            at,
            text: blocked.has(id)
              ? `${node.title} · skipped, the step is off`
              : node.log,
          },
        ]);
      }
      const next = flow.edges.filter(
        (e) => wave.includes(e.from) && !visited.has(e.to),
      );
      const live = next.filter((e) => !blocked.has(e.from));
      if (live.length && !quick) {
        setPackets(
          live.map((e) => ({
            key: `${e.from}-${e.to}-${tick}`,
            d: edgePath(pos[e.from], pos[e.to]),
          })),
        );
        await sleep(620);
        setPackets([]);
      }
      wave = Array.from(new Set(next.map((e) => e.to)));
    }
    setActive(null);
    setRunning(false);
    setRuns((r) => r + 1);
  };

  // Dragging
  const onDown = (e: React.PointerEvent, id: string) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = {
      id,
      sx: e.clientX,
      sy: e.clientY,
      ox: pos[id].x,
      oy: pos[id].y,
      moved: false,
    };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.sx) / scale;
    const dy = (e.clientY - d.sy) / scale;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    if (!d.moved) return;
    setPos((p) => ({
      ...p,
      [d.id]: {
        x: Math.max(0, Math.min(CANVAS_W - NODE_W, d.ox + dx)),
        y: Math.max(0, Math.min(CANVAS_H - NODE_H, d.oy + dy)),
      },
    }));
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) setSelected((s) => (s === d.id ? null : d.id));
  };
  const onKey = (e: React.KeyboardEvent, id: string) => {
    const step = e.shiftKey ? 30 : 10;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected((s) => (s === id ? null : id));
    } else if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      setPos((p) => ({
        ...p,
        [id]: {
          x: Math.max(0, Math.min(CANVAS_W - NODE_W, p[id].x + dx)),
          y: Math.max(0, Math.min(CANVAS_H - NODE_H, p[id].y + dy)),
        },
      }));
    }
  };

  const shownNodes = flow.nodes.slice(0, built);
  const shownEdges = useMemo(
    () =>
      flow.edges.filter(
        (e) =>
          shownNodes.some((n) => n.id === e.from) &&
          shownNodes.some((n) => n.id === e.to),
      ),
    [flow, shownNodes],
  );
  const sel = flow.nodes.find((n) => n.id === selected);
  const SelIcon = sel ? (icons[sel.app] ?? Zap) : Zap;

  return (
    <div className="studio" aria-label="Interactive Knot canvas">
      <header className="studio-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>Untitled knot</strong>
        <span
          className="studio-status mono"
          data-state={running ? "run" : ready ? "ready" : "build"}
        >
          {running ? "Running test…" : ready ? "Ready" : "Building…"}
        </span>
        <span className="runs mono">
          <NumberFlow value={runs} locales="en-US" /> runs this month
        </span>
      </header>

      <div className="prompt">
        <span className="prompt-label mono">Tell Knot</span>
        <p aria-live="polite">
          {flow.prompt.slice(0, typed)}
          {typed < flow.prompt.length && <i className="caret" />}
        </p>
        <motion.button
          type="button"
          className="button button-sm"
          whileTap={{ scale: 0.95, x: 2, y: 2 }}
          onClick={run}
          disabled={!ready || running}
        >
          <Play size={14} /> {running ? "Running" : "Run test"}
        </motion.button>
      </div>
      <div className="chips" role="group" aria-label="Example sentences">
        {flows.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={f.id === flowId}
            onClick={() => onFlowChange(f.id)}
          >
            {f.id === flowId && (
              <Pill id="chip-pill" className="pill chip-pill" />
            )}
            <span>{f.chip}</span>
          </button>
        ))}
      </div>

      <div className="studio-body">
        <div
          className="canvas-wrap"
          ref={wrap}
          style={{ minHeight: CANVAS_H * scale }}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div
            className="canvas-sizer"
            style={{ width: CANVAS_W * scale, height: CANVAS_H * scale }}
          >
            <div
              className="canvas"
              style={{
                width: CANVAS_W,
                height: CANVAS_H,
                transform: `scale(${scale})`,
              }}
            >
              <svg
                className="edges"
                width={CANVAS_W}
                height={CANVAS_H}
                aria-hidden="true"
              >
                {shownEdges.map((e) => {
                  const d = edgePath(
                    pos[e.from] ?? { x: 0, y: 0 },
                    pos[e.to] ?? { x: 0, y: 0 },
                  );
                  const dim = off[e.from] || status[e.to] === "skipped";
                  return (
                    <g key={`${flow.id}-${e.from}-${e.to}`} data-dim={dim}>
                      <motion.path
                        d={d}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                      {e.label && <EdgeLabel d={d} label={e.label} />}
                    </g>
                  );
                })}
              </svg>
              {packets.map((p) => (
                <motion.span
                  key={p.key}
                  className="packet"
                  style={{ offsetPath: `path("${p.d}")` }}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              ))}
              <AnimatePresence>
                {shownNodes.map((n) => {
                  const Icon = icons[n.app] ?? Zap;
                  const p = pos[n.id] ?? { x: n.x, y: n.y };
                  return (
                    <motion.div
                      key={`${flow.id}-${n.id}`}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected === n.id}
                      aria-label={`${kindLabel[n.kind]}: ${n.title}. Drag or use arrow keys to move.`}
                      className="node"
                      data-kind={n.kind}
                      data-active={active === n.id}
                      data-status={status[n.id]}
                      data-off={Boolean(off[n.id])}
                      style={{
                        left: p.x,
                        top: p.y,
                        width: NODE_W,
                        height: NODE_H,
                      }}
                      initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        bounce: 0.45,
                        duration: 0.55,
                      }}
                      onPointerDown={(e) => onDown(e, n.id)}
                      onKeyDown={(e) => onKey(e, n.id)}
                    >
                      <span className="node-top">
                        <span className="node-icon">
                          <Icon size={13} />
                        </span>
                        <span className="mono">{kindLabel[n.kind]}</span>
                        <AnimatePresence>
                          {status[n.id] && (
                            <motion.span
                              className="node-badge"
                              data-status={status[n.id]}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{
                                type: "spring",
                                bounce: 0.6,
                                duration: 0.4,
                              }}
                            >
                              {status[n.id] === "ok" ? (
                                <Check size={10} />
                              ) : (
                                "–"
                              )}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <strong>{n.title}</strong>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          <p className="canvas-hint mono">
            <MousePointer2 size={12} aria-hidden="true" /> Drag steps around.
            Click one to inspect.
          </p>
        </div>

        <aside className="inspector" aria-label="Inspector">
          <AnimatePresence mode="wait" initial={false}>
            {sel ? (
              <motion.div
                key={sel.id}
                className="inspect"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={spring}
              >
                <span className="inspect-kind" data-kind={sel.kind}>
                  <SelIcon size={13} /> {kindLabel[sel.kind]} · {sel.app}
                </span>
                <h4>{sel.title}</h4>
                <dl>
                  <div>
                    <dt className="mono">config</dt>
                    <dd className="mono">{sel.detail}</dd>
                  </div>
                  <div>
                    <dt className="mono">retries</dt>
                    <dd className="mono">3 · backoff</dd>
                  </div>
                </dl>
                <label className="toggle">
                  <span>Step is on</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!off[sel.id]}
                    className="switch"
                    disabled={sel.kind === "trigger" || running}
                    onClick={() =>
                      setOff((o) => ({ ...o, [sel.id]: !o[sel.id] }))
                    }
                  >
                    <motion.i layout transition={spring} />
                  </button>
                </label>
                {sel.kind === "trigger" && (
                  <small className="inspect-note">
                    The trigger starts the knot, so it stays on.
                  </small>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="none"
                className="inspect inspect-empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={spring}
              >
                <h4>{flow.chip}</h4>
                <p>
                  {flow.nodes.length} steps, built from one sentence. Pick a
                  step to see its settings or switch it off, then run a test.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="log">
            <span className="mono log-title">Test run</span>
            <ol aria-live="polite">
              <AnimatePresence initial={false}>
                {log.map((l) => (
                  <motion.li
                    key={l.id + l.at}
                    data-ok={l.ok}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={spring}
                  >
                    <span className="mono">{l.at}</span>
                    {l.text}
                  </motion.li>
                ))}
              </AnimatePresence>
              {log.length === 0 && (
                <li className="log-empty">Nothing yet. Press Run test.</li>
              )}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}

function EdgeLabel({ d, label }: { d: string; label: string }) {
  // Place the label at the middle of the curve.
  const ref = useRef<SVGPathElement>(null);
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const p = ref.current;
    if (!p) return;
    const l = p.getTotalLength();
    const m = p.getPointAtLength(l / 2);
    setPt({ x: m.x, y: m.y });
  }, [d]);
  return (
    <>
      <path ref={ref} d={d} fill="none" stroke="none" />
      {pt && (
        <g className="edge-label" transform={`translate(${pt.x}, ${pt.y})`}>
          <rect x={-17} y={-11} width={34} height={22} rx={11} />
          <text textAnchor="middle" dy={4}>
            {label}
          </text>
        </g>
      )}
    </>
  );
}
