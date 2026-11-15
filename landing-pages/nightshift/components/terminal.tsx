"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useInView } from "motion/react";
import { toast } from "sonner";
import { incidents, spark, type Incident, type Kind } from "./incidents";

type Entry = {
  id: number;
  kind: Kind | "sys" | "user" | "reply" | "ask";
  text: string;
  chart?: number[];
  time?: string;
};

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let uid = 0;
const entry = (e: Omit<Entry, "id">): Entry => ({ ...e, id: ++uid });

function clock(start: string, offset: number) {
  const [h, m] = start.split(":").map(Number);
  const total = h * 3600 + m * 60 + 7 + offset;
  const hh = String(Math.floor(total / 3600) % 24).padStart(2, "0");
  const mm = String(Math.floor(total / 60) % 60).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

const HELP = `commands
  help          this list
  status        services right now
  incidents     tonight's incidents
  open <1-3>    replay an incident
  graph         api latency, last hour
  ack           acknowledge everything
  whoami        who is on call
  sleep         go back to bed
  clear         clear the screen`;

export function Terminal() {
  const [current, setCurrent] = useState<Incident>(incidents[0]);
  const [lines, setLines] = useState<Entry[]>([]);
  const [phase, setPhase] = useState<"idle" | "busy" | "ask" | "free">("idle");
  const [typing, setTyping] = useState<{ id: number; shown: number } | null>(
    null,
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const token = useRef(0);
  const tick = useRef(0);
  const started = useRef(false);
  const inView = useInView(box, { once: true, margin: "-10% 0px" });

  const print = useCallback((e: Omit<Entry, "id">) => {
    const made = entry(e);
    setLines((l) => [...l, made]);
    return made;
  }, []);

  const stream = useCallback(
    async (inc: Incident, list: Incident["intro"], mine: number) => {
      const quick = reduced();
      for (const l of list) {
        if (token.current !== mine) return false;
        tick.current += quick ? 1 : 2 + Math.round(Math.random() * 3);
        const made = print({ ...l, time: clock(inc.start, tick.current) });
        if (l.kind === "cmd" && !quick) {
          for (let i = 0; i <= l.text.length; i += 2) {
            if (token.current !== mine) return false;
            setTyping({ id: made.id, shown: i });
            await sleep(16);
          }
          setTyping(null);
          await sleep(260);
        } else if (!quick) {
          await sleep(l.kind === "chart" ? 700 : 520);
        }
      }
      return true;
    },
    [print],
  );

  const open = useCallback(
    async (inc: Incident) => {
      token.current += 1;
      const mine = token.current;
      tick.current = 0;
      setCurrent(inc);
      setTyping(null);
      setPhase("busy");
      setLines([
        entry({
          kind: "sys",
          text: `paged at ${inc.start} · ${inc.severity} · ${inc.service} · you are asleep`,
        }),
      ]);
      if (!reduced()) await sleep(500);
      const done = await stream(inc, inc.intro, mine);
      if (!done || token.current !== mine) return;
      print({ kind: "ask", text: inc.question });
      setPhase("ask");
    },
    [print, stream],
  );

  const answer = useCallback(
    async (yes: boolean) => {
      if (phase !== "ask") return;
      const mine = token.current;
      setPhase("busy");
      print({ kind: "user", text: yes ? "y" : "n" });
      const done = await stream(current, yes ? current.yes : current.no, mine);
      if (!done || token.current !== mine) return;
      print({
        kind: "sys",
        text: "type help for commands, or open 2 for the next incident",
      });
      setPhase("free");
    },
    [phase, current, print, stream],
  );

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    open(incidents[0]);
  }, [inView, open]);

  useEffect(() => {
    const el = box.current?.querySelector(".term-body");
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setCursor(-1);
    if (phase === "ask") {
      if (/^y(es)?$/i.test(cmd)) return answer(true);
      if (/^n(o)?$/i.test(cmd)) return answer(false);
      print({ kind: "user", text: cmd });
      print({ kind: "reply", text: "please answer y or n" });
      return;
    }
    print({ kind: "user", text: cmd });
    const [name, arg] = cmd.toLowerCase().split(/\s+/);
    const reply = (text: string) => print({ kind: "reply", text });
    switch (name) {
      case "help":
        return reply(HELP);
      case "status":
        return reply(
          "service         status   p95\napi-gateway     ok       180 ms\ncheckout        ok        96 ms\ndb-replica-2    ok       disk 61%\nsearch          ok        41 ms",
        );
      case "incidents":
        return reply(
          incidents
            .map(
              (i, n) =>
                `${n + 1}  ${i.start}  ${i.severity}  ${i.name.padEnd(14)} ${i.service}`,
            )
            .join("\n") + "\n\nopen <n> to replay one",
        );
      case "open": {
        const n = Number(arg);
        if (n >= 1 && n <= incidents.length) return void open(incidents[n - 1]);
        return reply("usage: open 1, open 2 or open 3");
      }
      case "graph":
        return print({
          kind: "chart",
          text: "p95 ms",
          chart: [180, 182, 179, 640, 1900, 2400, 900, 230, 180, 178, 181, 180],
        });
      case "ack":
        return reply(
          "acknowledged. nothing else is open. you can go back to sleep.",
        );
      case "whoami":
        return reply("you · primary on-call · currently asleep (good)");
      case "sleep":
        return reply("zzz. nightshift has the pager until 08:00.");
      case "date":
        return reply("Fri Nov 6 2026 · 05:07 UTC · sunrise in 2 h 14 min");
      case "sudo":
        return reply(
          "nice try. nightshift only does what your runbooks allow.",
        );
      case "clear":
        return setLines([]);
      default:
        return reply(`command not found: ${name}. type help.`);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (phase === "busy" || phase === "idle") return;
    run(input);
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown" && cursor >= 0) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div
      className="term"
      ref={box}
      aria-label="Interactive Nightshift terminal"
    >
      <div className="term-bar">
        <span className="term-title">nightshift — on-call — fri 06 nov</span>
        <div className="term-tabs" role="group" aria-label="Incidents">
          {incidents.map((i, n) => (
            <button
              key={i.id}
              type="button"
              aria-pressed={current.id === i.id}
              onClick={() => open(i)}
            >
              [{n + 1}] {i.name}
            </button>
          ))}
        </div>
      </div>
      <div
        className="term-body"
        onClick={() => field.current?.focus({ preventScroll: true })}
        aria-live="polite"
      >
        {lines.map((l) => {
          const shown =
            typing?.id === l.id ? l.text.slice(0, typing.shown) : l.text;
          return (
            <div key={l.id} className="row" data-kind={l.kind}>
              {l.time && <span className="ts">[{l.time}]</span>}
              {l.kind === "alert" && (
                <span className="tag tag-alert">ALERT</span>
              )}
              {l.kind === "agent" && <span className="who">nightshift ›</span>}
              {l.kind === "cmd" && <span className="who">$</span>}
              {l.kind === "ok" && <span className="tag tag-ok">RESOLVED</span>}
              {l.kind === "warn" && <span className="tag tag-warn">HOLD</span>}
              {l.kind === "user" && <span className="who">you $</span>}
              {l.kind === "ask" && <span className="tag tag-ask">ASK</span>}
              {l.kind === "chart" ? (
                <span className="chart">
                  <span className="chart-label">{l.text}</span>
                  <span
                    className="chart-bars"
                    data-trend={
                      (l.chart ?? [])[11] > (l.chart ?? [])[0] ? "up" : "down"
                    }
                  >
                    {spark(l.chart ?? [])}
                  </span>
                  <span className="chart-range">
                    {Math.min(...(l.chart ?? [0]))}–
                    {Math.max(...(l.chart ?? [0]))}
                  </span>
                </span>
              ) : (
                <span className="txt">
                  {shown}
                  {typing?.id === l.id && <i className="blk" />}
                </span>
              )}
              {l.kind === "ask" && phase === "ask" && (
                <span className="choices">
                  <button type="button" onClick={() => answer(true)}>
                    [y] yes
                  </button>
                  <button type="button" onClick={() => answer(false)}>
                    [n] no
                  </button>
                </span>
              )}
            </div>
          );
        })}
        <form className="prompt" onSubmit={submit}>
          <label htmlFor="term-input" className="who">
            {phase === "ask" ? "y/n ›" : "you $"}
          </label>
          <input
            id="term-input"
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={
              phase === "busy" || phase === "idle"
                ? "nightshift is working…"
                : phase === "ask"
                  ? "type y or n"
                  : "type help"
            }
            disabled={phase === "busy" || phase === "idle"}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command"
          />
          {(phase === "free" || phase === "ask") && (
            <i className="blk blk-idle" aria-hidden="true" />
          )}
        </form>
      </div>
      <div className="term-foot">
        <span>
          <i className="led" data-state={phase} />{" "}
          {phase === "busy"
            ? "investigating"
            : phase === "ask"
              ? "waiting for you"
              : "watching 42 services"}
        </span>
        <button
          type="button"
          onClick={() =>
            toast("Demo terminal", {
              description:
                "Commands run on this page only. Nothing touches a real server.",
            })
          }
        >
          what is this?
        </button>
      </div>
    </div>
  );
}
