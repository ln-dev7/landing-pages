export type Range = "7d" | "30d" | "90d";

function wave(count: number, base: number, amp: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const v =
      base +
      Math.sin(i * 0.9 + seed) * amp +
      Math.sin(i * 0.37 + seed * 2) * amp * 0.6;
    return Math.round(v * 10) / 10;
  });
}

function withDrop(values: number[], from: number, depth: number) {
  return values.map((v, i) =>
    i >= from ? Math.round((v - depth + Math.sin(i) * 0.3) * 10) / 10 : v,
  );
}

const days30 = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 9, 6 + i));
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
});

export const ranges: Record<
  Range,
  {
    labels: string[];
    current: number[];
    previous: number[];
    drop: number;
    kpis: {
      label: string;
      value: number;
      unit: "" | "%";
      delta: number;
      deltaUnit: "%" | " pts";
      good: boolean;
    }[];
  }
> = {
  "7d": {
    labels: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
    current: [46.4, 46.1, 46.8, 45.9, 46.3, 46.2, 40.6],
    previous: [44.9, 45.2, 44.6, 45.4, 45.1, 44.8, 45.3],
    drop: 6,
    kpis: [
      { label: "Daily active teams", value: 2814, unit: "", delta: 3.1, deltaUnit: "%", good: true },
      { label: "Onboarding completion", value: 40.6, unit: "%", delta: 5.6, deltaUnit: " pts", good: false },
      { label: "Free → paid", value: 8.7, unit: "%", delta: 0.2, deltaUnit: " pts", good: true },
    ],
  },
  "30d": {
    labels: days30,
    current: withDrop(wave(30, 45.6, 0.7, 1), 27, 5.2),
    previous: wave(30, 44.2, 0.5, 4),
    drop: 27,
    kpis: [
      { label: "Daily active teams", value: 2690, unit: "", delta: 6.4, deltaUnit: "%", good: true },
      { label: "Onboarding completion", value: 42.1, unit: "%", delta: 1.9, deltaUnit: " pts", good: false },
      { label: "Free → paid", value: 8.9, unit: "%", delta: 0.6, deltaUnit: " pts", good: true },
    ],
  },
  "90d": {
    labels: Array.from({ length: 13 }, (_, i) => `W${i + 32}`),
    current: withDrop(wave(13, 44.8, 0.9, 2), 12, 3.4),
    previous: wave(13, 42.6, 0.6, 6),
    drop: 12,
    kpis: [
      { label: "Daily active teams", value: 2402, unit: "", delta: 18.0, deltaUnit: "%", good: true },
      { label: "Onboarding completion", value: 44.0, unit: "%", delta: 1.4, deltaUnit: " pts", good: true },
      { label: "Free → paid", value: 8.2, unit: "%", delta: 0.9, deltaUnit: " pts", good: true },
    ],
  },
};

export type Answer = {
  id: string;
  question: string;
  text: string;
  focus: "drop" | "none";
  detail:
    | { kind: "cause"; segment: string; impact: string; reason: string }
    | { kind: "bars"; rows: { label: string; value: number; note: string }[] }
    | { kind: "stat"; value: number; note: string };
};

export const answers: Answer[] = [
  {
    id: "onboarding",
    question: "What happened to onboarding on Tuesday?",
    text: "Onboarding completion fell from 46.2% to 40.6% on Tuesday and hasn't recovered. Almost all of the drop comes from one segment.",
    focus: "drop",
    detail: {
      kind: "cause",
      segment: "Android · app 5.8",
      impact: "−11.3 pts vs. everyone else",
      reason:
        "The “Invite your team” step began failing after release 5.8. 1,204 invite_sent errors since Tuesday 09:40.",
    },
  },
  {
    id: "plans",
    question: "Which trial converts best?",
    text: "Team trials convert at 12.4%, almost twice Starter. Trials that connect a warehouse in their first two days convert 3.1× more often.",
    focus: "none",
    detail: {
      kind: "bars",
      rows: [
        { label: "Team", value: 12.4, note: "1,880 trials" },
        { label: "Starter", value: 6.5, note: "5,212 trials" },
        { label: "Company", value: 9.8, note: "214 trials" },
      ],
    },
  },
  {
    id: "checklist",
    question: "Did the new checklist help?",
    text: "Yes, modestly. Teams who saw the new checklist finished onboarding more often, and the effect holds on every platform.",
    focus: "none",
    detail: {
      kind: "stat",
      value: 4.8,
      note: "95% confidence · 3,940 teams · 21 days",
    },
  },
  {
    id: "exports",
    question: "Who stopped using exports?",
    text: "312 teams stopped exporting after October 20. 71% of them are on Starter and reached the new monthly export limit.",
    focus: "none",
    detail: {
      kind: "cause",
      segment: "Starter · 10+ exports a month",
      impact: "312 teams · 71% of the decline",
      reason:
        "They hit the 10-export limit introduced on October 20. Only 9% upgraded afterwards.",
    },
  },
];
