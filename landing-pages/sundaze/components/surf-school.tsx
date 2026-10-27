"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Compass,
  Flag,
  Pause,
  Play,
  RotateCcw,
  Shell,
  Sparkles,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MotionTitle } from "./motion-title";
import { OceanEffects } from "./ocean-effects";

const waveNotes = [
  {
    title: "The peak",
    subtitle: "WHERE IT ALL STARTS",
    body: "The highest part of the breaking wave. Watch where it starts to fold: that’s the beginning of the ride, not a place to race other surfers.",
    x: 56,
    y: 26,
  },
  {
    title: "The shoulder",
    subtitle: "ROOM TO FIND YOUR FLOW",
    body: "The open, unbroken face beside the breaking part. This is the space a surfer follows along the wave. Look ahead, not down at your feet.",
    x: 81,
    y: 47,
  },
  {
    title: "The whitewater",
    subtitle: "SMALL BEGINNINGS COUNT",
    body: "The foamy water after a wave breaks. With a coach and suitable conditions, small whitewater is a friendly place to practise your first rides.",
    x: 27,
    y: 65,
  },
];
const equipment = [
  {
    id: "board",
    title: "A soft beginning.",
    name: "Soft-top board",
    body: "A wide, buoyant foam board helps with paddling and balance. Your coach can match the size to you. More volume, fewer wobbles.",
    note: "STABILITY FIRST. STYLE FOLLOWS.",
    icon: Waves,
  },
  {
    id: "leash",
    title: "Stay connected.",
    name: "Leash",
    body: "The leash connects your back ankle to your board. Check its condition before entering the water, and keep space around other people.",
    note: "SMALL DETAIL. BIG DIFFERENCE.",
    icon: Compass,
  },
  {
    id: "suit",
    title: "Warm is a feeling.",
    name: "Wetsuit",
    body: "A well-fitting wetsuit helps you stay comfortable in the water. Choose it for the local water temperature, with advice from your surf school.",
    note: "A GOOD FIT, NOT A GUESS.",
    icon: Shell,
  },
];
const questions = [
  {
    q: "Someone is already riding the wave. Your move?",
    options: [
      "Paddle for the same wave",
      "Give them space and wait",
      "Race to get in front",
    ],
    correct: 1,
    why: "One ride at a time. Give the surfer room and wait for another wave. There’s plenty of ocean to share.",
  },
  {
    q: "It’s your first session. Which board is a good starting point?",
    options: [
      "The smallest board possible",
      "A board chosen just for its colour",
      "A stable soft-top, sized with a coach",
    ],
    correct: 2,
    why: "A buoyant soft-top makes those first paddles and wobbles more forgiving. Your coach helps you find the right fit.",
  },
  {
    q: "The conditions look different from the forecast. What now?",
    options: [
      "Ask a lifeguard or coach before going in",
      "Assume yesterday’s advice still applies",
      "Follow the biggest group straight out",
    ],
    correct: 0,
    why: "Local advice comes first. Conditions change, and it’s always okay to choose another day.",
  },
];

export function SurfSchool({ onPlan }: { onPlan: () => void }) {
  const [wave, setWave] = useState(0);
  const [wavesSeen, setWavesSeen] = useState<number[]>([]);
  const [kitSeen, setKitSeen] = useState<string[]>([]);
  const [kit, setKit] = useState("board");
  const [answer, setAnswer] = useState<number | null>(null);
  const [question, setQuestion] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [motion, setMotion] = useState(true);
  const [ride, setRide] = useState<"ready" | "running" | "won" | "missed">(
    "ready",
  );
  const [reduced, setReduced] = useState(true);
  const [position, setPosition] = useState(0);
  const start = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const badges = [wavesSeen.length === 3, kitSeen.length === 3, finished];
  const earned = badges.filter(Boolean).length;
  const previous = useRef(0);
  useEffect(() => {
    if (earned > previous.current)
      toast.success(
        earned === 3
          ? "Your sunshine passport is complete!"
          : "A little more ocean-wise. Stamp earned!",
      );
    previous.current = earned;
  }, [earned]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(media.matches);
      setRide("ready");
      if (timer.current) clearTimeout(timer.current);
    };
    sync();
    media.addEventListener("change", sync);
    const stop = () => {
      if (document.hidden) {
        setRide("ready");
        if (timer.current) clearTimeout(timer.current);
      }
    };
    document.addEventListener("visibilitychange", stop);
    return () => {
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", stop);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  function catchWave() {
    if (ride !== "running") {
      if (reduced || !motion) {
        setPosition(50);
        setRide("won");
        return;
      }
      setPosition(0);
      start.current = performance.now();
      setRide("running");
      timer.current = setTimeout(() => {
        setPosition(100);
        setRide("missed");
      }, 2800);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    const p = Math.min(100, (performance.now() - start.current) / 28);
    setPosition(p);
    setRide(p >= 38 && p <= 62 ? "won" : "missed");
  }
  const q = questions[question];
  return (
    <div className={`surf-school ${motion ? "" : "school-paused"}`}>
      <section id="surf-school" className="sea-lab section">
        <div className="school-heading" data-reveal>
          <div>
            <span className="eyebrow">02 / A LITTLE OCEAN KNOW-HOW</span>
            <MotionTitle
              lines={[
                { text: "Read the wave." },
                { text: "Find your way.", outline: true },
              ]}
            />
          </div>
          <p>
            You don’t need to know everything.
            <br />
            Start with three little things.
            <br />
            <a href="#passport">
              Collect three stamps along the way <ArrowDown size={15} />
            </a>
          </p>
        </div>
        <div className="wave-atlas" data-reveal>
          <div className="atlas-scene">
            <OceanEffects kind="liquid" active={motion} />
            <div className="atlas-caption">
              <span>THE WAVE / FIELD NOTES 001</span>
              <Button
                variant="unstyled"
                className="motion-control"
                onClick={() => {
                  setMotion(!motion);
                  setRide("ready");
                  if (timer.current) clearTimeout(timer.current);
                }}
                aria-label={
                  motion ? "Pause ocean effects" : "Resume ocean effects"
                }
              >
                {motion ? <Pause size={16} /> : <Play size={16} />}
              </Button>
            </div>
            <svg
              className="wave-drawing"
              viewBox="0 0 800 470"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="sea-wash" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#b5efe2" />
                  <stop offset="1" stopColor="#2f80af" />
                </linearGradient>
              </defs>
              <path
                fill="url(#sea-wash)"
                d="M-20 350C130 370 200 320 290 255S420 40 490 100C560 170 447 220 430 192C483 218 523 133 467 126C397 117 419 290 570 290C690 288 750 333 820 315V490H-20Z"
              />
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  className="wave-contour"
                  style={{ animationDelay: `${i * -1}s` }}
                  transform={`translate(0 ${i * 30})`}
                  d="M-20 350C130 370 200 320 290 255S420 40 490 100C560 170 447 220 430 192C483 218 523 133 467 126C397 117 419 290 570 290C690 288 750 333 820 315"
                  stroke="#f3f8d9"
                  strokeWidth={i === 0 ? 4 : 1}
                  opacity={1 - i * 0.18}
                />
              ))}
              <path
                d="M75 355Q180 270 304 303M95 370Q230 293 310 320"
                stroke="#fff9de"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="1 19"
              />
            </svg>
            {waveNotes.map((n, i) => (
              <Button
                key={n.title}
                variant="unstyled"
                className={`wave-pin ${wave === i ? "selected" : ""}`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                aria-label={`Explore ${n.title.toLowerCase()}`}
                aria-pressed={wave === i}
                onClick={() => {
                  setWave(i);
                  setWavesSeen((old) => (old.includes(i) ? old : [...old, i]));
                }}
              >
                {wavesSeen.includes(i) ? (
                  <Check size={18} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </Button>
            ))}
            <span className="atlas-bottom">
              MOVE OVER THE WATER. TAP THE NUMBERS.
            </span>
          </div>
          <div className="wave-explanation" aria-live="polite">
            <span className="eyebrow">{waveNotes[wave].subtitle}</span>
            <div key={wave} className="note-enter">
              <span className="lesson-number">0{wave + 1}</span>
              <h3>{waveNotes[wave].title}</h3>
              <p>{waveNotes[wave].body}</p>
            </div>
            <div className="lesson-progress">
              {[0, 1, 2].map((i) => (
                <span key={i} data-checked={wavesSeen.includes(i)} />
              ))}
              <small>{wavesSeen.length}/3 explored</small>
            </div>
          </div>
        </div>
        <div className="ocean-note">
          <Flag size={22} />
          <p>
            Every beach is different. Check the weather, tides and local advice
            with a coach or lifeguard before getting in.{" "}
            <a
              href="https://rnli.org/safety/choose-your-activity/surfing"
              target="_blank"
              rel="noreferrer"
            >
              Read the RNLI surf guide <ArrowUpRight size={14} />
            </a>
          </p>
        </div>
      </section>

      <section className="kit-section section" id="board-room">
        <div className="school-heading" data-reveal>
          <div>
            <span className="eyebrow">03 / THE BOARD ROOM</span>
            <MotionTitle
              lines={[
                { text: "Good kit." },
                { text: "Better beginnings.", outline: true },
              ]}
            />
          </div>
          <p>
            Three essentials. No mystery.
            <br />
            Open each field note to earn your kit stamp.
          </p>
        </div>
        <Tabs
          value={kit}
          onValueChange={(value) => {
            setKit(String(value));
            setKitSeen((old) =>
              old.includes(String(value)) ? old : [...old, String(value)],
            );
          }}
          className="kit-tabs"
        >
          <TabsList aria-label="Explore surf equipment">
            {equipment.map((e, i) => (
              <TabsTrigger key={e.id} value={e.id}>
                <span>0{i + 1}</span>
                {e.name}
                {kitSeen.includes(e.id) ? (
                  <Check size={18} />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {equipment.map((e) => (
            <TabsContent key={e.id} value={e.id} className="kit-panel">
              <div className={`kit-art kit-${e.id}`}>
                <span className="kit-coordinate">
                  SUNDAZE SUPPLY CO. / {e.id.toUpperCase()}
                </span>
                {e.id === "suit" ? (
                  <svg viewBox="0 0 300 370" aria-hidden="true">
                    <path
                      d="M110 40Q150 70 190 40L255 75 279 185 236 194 207 117 204 208 222 331 170 338 151 236 130 338 78 331 97 208 94 117 64 194 21 185 45 75Z"
                      fill="#1745e8"
                    />
                    <path
                      d="M110 40Q150 88 190 40M150 75V203M98 205Q150 228 204 205"
                      stroke="#b5efe2"
                      strokeWidth="3"
                      fill="none"
                    />
                    <text
                      x="116"
                      y="144"
                      fill="#ffe34a"
                      fontSize="20"
                      fontWeight="bold"
                    >
                      sundaze
                    </text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 300 400" aria-hidden="true">
                    <ellipse
                      cx="153"
                      cy="355"
                      rx="90"
                      ry="14"
                      fill="#133566"
                      opacity=".08"
                    />
                    <path
                      d="M150 20C65 68 63 231 102 341Q150 370 198 341C237 231 235 68 150 20Z"
                      fill="#ffe34a"
                      stroke="#1745e8"
                      strokeWidth="2"
                    />
                    <path d="M150 21V351" stroke="#fffaf0" strokeWidth="36" />
                    <path d="M150 21V351" stroke="#1745e8" strokeWidth="2" />
                    <text
                      x="113"
                      y="170"
                      fill="#1745e8"
                      fontSize="22"
                      fontWeight="bold"
                      transform="rotate(90 150 170)"
                    >
                      sundaze
                    </text>
                    {e.id === "leash" && (
                      <path
                        className="leash-line"
                        d="M155 338C265 360 270 252 235 250S230 322 278 310"
                        fill="none"
                        stroke="#fa7550"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                )}
                <span className="kit-sticker">
                  LESS GEAR.
                  <br />
                  MORE HERE.
                </span>
              </div>
              <div className="kit-copy">
                <e.icon size={35} strokeWidth={1.4} />
                <span className="eyebrow">{e.note}</span>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setKitSeen((old) =>
                      old.includes(e.id) ? old : [...old, e.id],
                    )
                  }
                >
                  {kitSeen.includes(e.id)
                    ? "Got it!"
                    : "Got it — stamp this note"}
                  <Check size={17} />
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section
        className="rhythm-section section"
        aria-labelledby="rhythm-title"
      >
        <div>
          <span className="eyebrow">04 / A LITTLE PLAY BEFORE THE PADDLE</span>
          <MotionTitle
            id="rhythm-title"
            lines={[
              { text: "Find your" },
              { text: "little moment.", outline: true },
            ]}
          />
          <p>
            Good things take timing. Stop the little board in the sunshine zone.
            Just a tiny game, not a surf lesson.
          </p>
        </div>
        <div className="rhythm-game">
          <OceanEffects kind="ripple" active={motion} />
          <span className="eyebrow">THE GOOD-TIMING CLUB</span>
          <div className={`timing-ocean ${ride}`}>
            <div className="timing-lines" />
            <div className="timing-zone">
              <SunIcon />
              <span>RIGHT HERE</span>
            </div>
            <div
              className="timing-board"
              style={{ left: ride === "running" ? undefined : `${position}%` }}
            >
              <Waves size={25} />
            </div>
          </div>
          <div className="game-feedback" aria-live="polite">
            {ride === "won"
              ? "That’s the feeling. Nicely caught!"
              : ride === "missed"
                ? "A little early. A little late. Another wave awaits."
                : ride === "running"
                  ? "Wait for the yellow, then catch it."
                  : reduced || !motion
                    ? "Motion is off. Your wave is waiting in the sunshine."
                    : "Start the wave. Catch the sunshine."}
          </div>
          <Button className="button-yellow" onClick={catchWave}>
            {ride === "running"
              ? "Catch it!"
              : ride === "ready"
                ? "Send a little wave"
                : "One more wave"}
            {ride === "running" ? <Flag size={18} /> : <ArrowRight size={18} />}
          </Button>
        </div>
      </section>

      <section id="passport" className="passport-section section">
        <div className="passport-copy" data-reveal>
          <span className="eyebrow">05 / YOUR POCKETFUL OF SUNSHINE</span>
          <MotionTitle
            lines={[
              { text: "A little wiser." },
              { text: "A little saltier.", outline: true },
            ]}
          />
          <p>
            Three questions. A few good habits.
            <br />
            Keep trying — curiosity always wins here.
          </p>
          <div className="passport-stamps">
            {[
              [Waves, "Wave reader"],
              [Shell, "Kit curious"],
              [CheckCheck, "Good company"],
            ].map(([Icon, name], i) => {
              const Mark = Icon as typeof Waves;
              return (
                <div
                  className={`passport-stamp ${badges[i] ? "earned" : ""}`}
                  key={String(name)}
                >
                  <Mark size={28} />
                  <span>{String(name)}</span>
                  <small>{badges[i] ? "STAMPED" : "TO DISCOVER"}</small>
                </div>
              );
            })}
          </div>
          <div className="passport-count" aria-live="polite">
            <span>{earned}/3 stamps collected</span>
            <div>
              <i style={{ width: `${(earned / 3) * 100}%` }} />
            </div>
          </div>
          <small>
            Your stamps stay on this page. No account, no leaderboard.
          </small>
        </div>
        <div className="quiz-paper">
          {!finished ? (
            <>
              <span className="eyebrow">
                THE GOOD-SURFER QUIZ / 0{question + 1} OF 03
              </span>
              <h3>{q.q}</h3>
              <div className="quiz-options">
                {q.options.map((option, i) => (
                  <Button
                    variant="unstyled"
                    key={option}
                    className={`quiz-option ${answer === i ? (i === q.correct ? "correct" : "try-again") : ""}`}
                    disabled={answer === q.correct}
                    onClick={() => {
                      setAnswer(i);
                      if (i === q.correct)
                        setSolved((old) =>
                          old.includes(question) ? old : [...old, question],
                        );
                    }}
                  >
                    <span>{String.fromCharCode(65 + i)}</span>
                    {option}
                    {answer === i && i === q.correct && <Check size={18} />}
                  </Button>
                ))}
              </div>
              <div className="quiz-feedback" aria-live="polite">
                {answer !== null &&
                  (answer === q.correct ? (
                    <>
                      <strong>Exactly. Good vibes, good habits.</strong>
                      <p>{q.why}</p>
                    </>
                  ) : (
                    <p>
                      Not quite. Think about space, support and local knowledge.
                      Give it another go.
                    </p>
                  ))}
              </div>
              {answer === q.correct && (
                <Button
                  onClick={() => {
                    if (question === 2) {
                      setFinished(true);
                    } else {
                      setQuestion(question + 1);
                      setAnswer(null);
                    }
                  }}
                >
                  {question === 2 ? "Collect my stamp" : "Next little question"}
                  <ArrowRight size={18} />
                </Button>
              )}
            </>
          ) : (
            <div className="quiz-finish">
              <Sparkles size={46} />
              <span className="eyebrow">GOOD COMPANY LOOKS GOOD ON YOU</span>
              <h3>
                More aware.
                <br />
                Already winning.
              </h3>
              <p>
                {solved.length}/3 understood. Take that curiosity to the beach,
                ask questions, and learn with a qualified coach.
              </p>
              <Button onClick={onPlan}>
                Find your first session <ArrowUpRight size={18} />
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setQuestion(0);
                  setAnswer(null);
                  setSolved([]);
                  setFinished(false);
                }}
              >
                <RotateCcw size={15} />
                Try the quiz again
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
function SunIcon() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      <circle cx="20" cy="20" r="8" fill="currentColor" />
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d="M20 2V7"
          stroke="currentColor"
          strokeWidth="2"
          transform={`rotate(${i * 45} 20 20)`}
        />
      ))}
    </svg>
  );
}
