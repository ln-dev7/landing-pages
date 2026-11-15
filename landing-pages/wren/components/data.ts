export type Style = "Concise" | "Balanced" | "Detailed";

export const files = [
  { name: "Q3-results.pdf", kind: "PDF", size: "2.1 MB" },
  { name: "churn-by-plan.csv", kind: "CSV", size: "84 KB" },
  { name: "offsite-notes.md", kind: "Notes", size: "12 KB" },
];

export const projects = [
  { id: "memo", name: "Board memo Q4", files: 3 },
  { id: "pricing", name: "Pricing research", files: 7 },
  { id: "thesis", name: "Thesis notes", files: 12 },
];
export const recents = ["Compare two job offers", "Plan my week", "Rewrite the FAQ", "Explain this lease"];

export type Draft = { title: string; blocks: { h?: string; p: string }[] };

export const memo: Record<"v1" | "v2", Draft> = {
  v1: {
    title: "Q4 board memo",
    blocks: [
      { h: "Where we are", p: "Revenue grew 18% in Q3 to $4.2M, ahead of plan. Growth came from the Team plan, which now brings in 61% of new revenue." },
      { h: "What worries us", p: "Churn on the Starter plan rose from 3.1% to 4.4% a month. Most of it comes from teams who never invited a second person." },
      { h: "What we propose", p: "Move the invite step after the first project, and give Starter teams a guided setup call. We expect churn back under 3.5% by January." },
      { h: "What we ask the board", p: "Approve two hires for onboarding and a $120k budget for the setup calls." },
    ],
  },
  v2: {
    title: "Q4 board memo, short",
    blocks: [
      { p: "Q3 revenue: $4.2M, up 18%, led by the Team plan." },
      { p: "Risk: Starter churn rose to 4.4% a month, mostly teams of one." },
      { p: "Plan: invite step later, guided setup calls. Target under 3.5% by January." },
      { p: "Ask: two onboarding hires and $120k." },
    ],
  },
};

export const answers: Record<Style, string> = {
  Concise: "Done. The memo is in the draft: growth is strong, Starter churn is the risk, and the ask is two hires and $120k.",
  Balanced:
    "I wrote the memo in the draft. It opens with the 18% growth, then explains why Starter churn rose to 4.4%, using your churn file. The proposal and the ask come from the offsite notes.",
  Detailed:
    "The draft is ready. I took the revenue figures from Q3-results.pdf, the churn by plan from the CSV and the proposal from your offsite notes. One thing to check: the notes mention $120k for setup calls, but the results deck says $100k. I used the newer number.",
};

export const thinking = [
  "Reading Q3-results.pdf, 14 pages",
  "Comparing churn across 3 plans",
  "Matching the offsite notes to the numbers",
  "Writing for a board audience",
];

export const risks = [
  "The churn fix depends on a design change that is not built yet.",
  "Two hires take about 8 weeks to ramp up, so the effect starts in February.",
  "The $120k assumes 300 setup calls. Fewer sign-ups would leave budget unused.",
];

export const styleTexts: Record<"Plain" | "Formal" | "Friendly", string[]> = {
  Plain: [
    "Your trial ends Friday. Pick a plan to keep your work.",
    "Your trial ends this Friday. To keep your projects and files, pick a plan before then. Nothing is lost if you wait a few days.",
    "Your free trial ends this Friday at midnight. To keep your projects, files and history, choose a plan before then. If you need more time, reply to this email and we will extend it by a week. Nothing is deleted in the meantime.",
  ],
  Formal: [
    "Your trial period concludes on Friday. Please select a plan to retain access.",
    "We would like to remind you that your trial period concludes this Friday. To retain your projects and files, please select a plan at your convenience.",
    "We would like to remind you that your trial period concludes this Friday at midnight. To retain uninterrupted access to your projects, files and history, we kindly ask that you select a plan beforehand. Should you require additional time, an extension of one week can be arranged upon request.",
  ],
  Friendly: [
    "Heads up: your trial wraps up Friday! Grab a plan to keep going.",
    "Quick heads up: your trial wraps up this Friday! Pick a plan whenever you are ready and all your projects come along with you.",
    "Quick heads up: your trial wraps up this Friday at midnight! Pick a plan whenever you are ready and everything you made comes along. Need a little longer? Just hit reply and we will happily add another week. Nothing disappears in the meantime.",
  ],
};

export const contextFiles = [
  { id: "brand", name: "Brand voice.pdf", tokens: 18 },
  { id: "interviews", name: "12 customer interviews", tokens: 34 },
  { id: "pricing", name: "Pricing.xlsx", tokens: 9 },
  { id: "roadmap", name: "Roadmap 2027.md", tokens: 14 },
];

export const uses = [
  {
    id: "write",
    tab: "Write",
    ask: "Turn my messy notes into a launch announcement.",
    think: ["read 2 pages of notes", "found the 3 features that matter", "kept your tone from past posts", "cut it to 180 words"],
    result: "A post you can publish, in your voice.",
    detail: "Wren keeps the facts from your notes and asks before it adds anything new.",
    bars: [30, 46, 58, 72, 84, 92],
  },
  {
    id: "analyze",
    tab: "Analyze",
    ask: "Why did signups dip in August?",
    think: ["opened signups.csv, 12,400 rows", "split by channel and week", "found paid search down 41%", "matched it to the budget change"],
    result: "The dip is paid search, after the budget cut.",
    detail: "Every number links to the rows it came from, so you can check the work.",
    bars: [70, 72, 68, 40, 44, 66],
  },
  {
    id: "code",
    tab: "Code",
    ask: "This query is slow. Can you fix it?",
    think: ["read the query and the schema", "spotted a scan on orders.created_at", "suggested an index", "rewrote the join"],
    result: "From 4.2 s to 90 ms, with the reason why.",
    detail: "Wren explains each change, so you learn the fix instead of pasting it.",
    bars: [100, 82, 60, 34, 12, 4],
  },
  {
    id: "learn",
    tab: "Learn",
    ask: "Explain how vaccines train the immune system.",
    think: ["started from what you already know", "used one clear analogy", "checked three facts", "ended with a short quiz"],
    result: "A five-minute explanation, then three questions.",
    detail: "Ask it to go deeper or simpler at any point. It adjusts as you go.",
    bars: [20, 38, 52, 66, 80, 88],
  },
];
