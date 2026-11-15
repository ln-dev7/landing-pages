"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  Check,
  Pause,
  PhoneCall,
  PhoneForwarded,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { calls, lineSeconds, type Call } from "./calls";
import { Pill, spring } from "./motion-kit";
import { Orb } from "./orb";

const BARS = 44;

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Player = {
  line: number; // index of the line being spoken
  chars: number; // characters revealed in that line
  playing: boolean;
  ended: boolean;
};

const fresh: Player = { line: 0, chars: 0, playing: false, ended: false };

export function CallConsole() {
  const [callId, setCallId] = useState(calls[0].id);
  const [player, setPlayer] = useState<Player>(fresh);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const call = calls.find((c) => c.id === callId) as Call;
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, margin: "-15% 0px" });
  const thread = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const speaker = useRef<"caller" | "murmur" | null>(null);
  const level = useRef(0);
  const orbRef = useRef<HTMLDivElement>(null);

  // Autoplay the first call once the console is on screen.
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(
      () =>
        setPlayer((p) =>
          p.line === 0 && p.chars === 0 ? { ...p, playing: true } : p,
        ),
      reduced() ? 0 : 900,
    );
    return () => window.clearTimeout(t);
  }, [inView]);

  // Reveal the transcript.
  useEffect(() => {
    if (!player.playing || player.ended) return;
    const current = call.lines[player.line];
    if (!current) return;
    if (reduced()) {
      setPlayer({
        line: call.lines.length - 1,
        chars: 9999,
        playing: false,
        ended: true,
      });
      return;
    }
    const done = player.chars >= current.text.length;
    const cps = (current.who === "murmur" ? 52 : 40) * speed;
    const t = window.setTimeout(
      () =>
        setPlayer((p) => {
          if (!done) return { ...p, chars: p.chars + 2 };
          if (p.line >= call.lines.length - 1)
            return { ...p, playing: false, ended: true };
          return { ...p, line: p.line + 1, chars: 0 };
        }),
      done ? 520 / speed : (2 / cps) * 1000,
    );
    return () => window.clearTimeout(t);
  }, [player, call, speed]);

  const current = call.lines[player.line];
  const speaking =
    player.playing && current && player.chars < current.text.length
      ? current.who
      : null;
  speaker.current = speaking;

  // Waveform and orb, driven outside React for smoothness.
  useEffect(() => {
    if (reduced()) return;
    let frame = 0;
    let t = 0;
    const loop = () => {
      t += 1;
      const target = speaker.current ? 1 : 0;
      level.current += (target - level.current) * 0.08;
      bars.current.forEach((el, i) => {
        if (!el) return;
        const wave =
          Math.abs(Math.sin(t * 0.09 + i * 0.55)) * 0.55 +
          Math.abs(Math.sin(t * 0.21 + i * 1.7)) * 0.45;
        const h = 0.08 + level.current * wave * (0.55 + Math.random() * 0.45);
        el.style.transform = `scaleY(${h.toFixed(3)})`;
      });
      orbRef.current?.style.setProperty(
        "--level",
        (speaker.current === "murmur"
          ? level.current
          : level.current * 0.35
        ).toFixed(3),
      );
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Keep the latest line in view.
  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [player.line, player.chars]);

  const select = useCallback((id: string) => {
    setCallId(id);
    setPlayer({ ...fresh, playing: true });
  }, []);

  const shownLines = call.lines.slice(0, player.line + 1).map((l, i) => ({
    ...l,
    text: i < player.line ? l.text : l.text.slice(0, player.chars),
    complete: i < player.line || player.chars >= l.text.length,
  }));
  if (player.line === 0 && player.chars === 0 && !player.playing)
    shownLines.length = 0;

  const actions = call.lines
    .slice(0, player.line + 1)
    .filter((l, i) => i < player.line || player.chars >= l.text.length)
    .flatMap((l) => l.actions ?? []);

  const elapsed =
    call.lines.slice(0, player.line).reduce((s, l) => s + lineSeconds(l), 0) +
    (current
      ? lineSeconds(current) * Math.min(1, player.chars / current.text.length)
      : 0);
  const secs = Math.floor(elapsed);
  const status = player.ended
    ? "Call ended"
    : player.playing
      ? "On call"
      : player.chars === 0 && player.line === 0
        ? "Ringing"
        : "Paused";

  return (
    <div
      className="console"
      ref={root}
      aria-label="Interactive Murmur call demo"
    >
      <aside className="queue" aria-label="Incoming calls">
        <span className="panel-label">Incoming today</span>
        {calls.map((c) => (
          <button
            key={c.id}
            type="button"
            className="queue-item"
            aria-pressed={c.id === callId}
            onClick={() => select(c.id)}
          >
            {c.id === callId && (
              <Pill id="queue-pill" className="pill queue-pill" />
            )}
            <span className="avatar" data-tone={c.tone}>
              {c.initials}
            </span>
            <span className="queue-text">
              <strong>{c.business}</strong>
              <small>
                {c.caller} · {c.reason}
              </small>
            </span>
            {c.tone === "urgent" && (
              <i className="urgent-dot" aria-label="Urgent" />
            )}
          </button>
        ))}
        <p className="queue-foot">
          <PhoneCall size={13} aria-hidden="true" /> Calls stay on this page.
          Nobody is dialed.
        </p>
      </aside>

      <section className="stage" aria-label={`Call with ${call.caller}`}>
        <header className="stage-head">
          <div>
            <strong>{call.business}</strong>
            <small className="mono">{call.number}</small>
          </div>
          <span className="call-state" data-state={status}>
            <i /> {status}
            <span className="mono timer">
              <NumberFlow value={Math.floor(secs / 60)} />:
              <NumberFlow
                value={secs % 60}
                format={{ minimumIntegerDigits: 2 }}
              />
            </span>
          </span>
        </header>

        <div className="voice">
          <div className="voice-orb" ref={orbRef}>
            <Orb size={74} />
          </div>
          <div
            className="wave"
            data-speaker={speaking ?? "none"}
            aria-hidden="true"
          >
            {Array.from({ length: BARS }, (_, i) => (
              <span
                key={i}
                ref={(el) => {
                  bars.current[i] = el;
                }}
              />
            ))}
          </div>
          <span className="voice-label">
            {speaking === "murmur"
              ? "Murmur is speaking"
              : speaking === "caller"
                ? `${call.caller.split(" ")[0]} is speaking`
                : player.ended
                  ? "Summary ready"
                  : "Listening"}
          </span>
        </div>

        <div className="transcript" ref={thread} aria-live="polite">
          <AnimatePresence initial={false}>
            {shownLines.map((l, i) => (
              <motion.p
                key={`${call.id}-${i}`}
                className="line"
                data-who={l.who}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={spring}
              >
                <span className="who">
                  {l.who === "murmur" ? "Murmur" : call.caller.split(" ")[0]}
                </span>
                {l.text}
                {!l.complete && <i className="cursor" />}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <footer className="controls">
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            className="ctrl ctrl-main"
            aria-label={player.playing ? "Pause call" : "Play call"}
            onClick={() =>
              player.ended
                ? setPlayer({ ...fresh, playing: true })
                : setPlayer((p) => ({ ...p, playing: !p.playing }))
            }
          >
            {player.playing ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            className="ctrl"
            aria-label="Restart call"
            onClick={() => setPlayer({ ...fresh, playing: true })}
          >
            <RotateCcw size={15} />
          </motion.button>
          <div className="speed" role="group" aria-label="Playback speed">
            {([1, 2] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={speed === s}
                onClick={() => setSpeed(s)}
              >
                {speed === s && <Pill id="speed-pill" />}
                <span>{s}×</span>
              </button>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            className="takeover"
            onClick={() =>
              toast("You'd be on the line now", {
                description: "Take over hands any live call to you. Demo only.",
              })
            }
          >
            <PhoneForwarded size={14} /> Take over
          </motion.button>
        </footer>
      </section>

      <aside className="actions" aria-label="What Murmur did">
        <span className="panel-label">
          <Sparkles size={13} aria-hidden="true" /> Murmur did
        </span>
        <ol>
          <AnimatePresence initial={false}>
            {actions.map((a, i) => (
              <motion.li
                key={`${call.id}-${a}`}
                initial={{ opacity: 0, x: 12, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  ...spring,
                  delay: i === actions.length - 1 ? 0.05 : 0,
                }}
              >
                <span className="tick">
                  <Check size={11} />
                </span>
                {a}
              </motion.li>
            ))}
          </AnimatePresence>
          {actions.length === 0 && (
            <li className="actions-empty">
              Actions appear here as the call goes.
            </li>
          )}
        </ol>
        <AnimatePresence>
          {player.ended && (
            <motion.div
              className="summary"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={spring}
            >
              <span className="panel-label">Summary sent to you</span>
              <strong>{call.outcome}</strong>
              <dl>
                <div>
                  <dt>Length</dt>
                  <dd className="mono">
                    {Math.floor(secs / 60)}:{String(secs % 60).padStart(2, "0")}
                  </dd>
                </div>
                <div>
                  <dt>Caller felt</dt>
                  <dd>{call.mood}</dd>
                </div>
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}
