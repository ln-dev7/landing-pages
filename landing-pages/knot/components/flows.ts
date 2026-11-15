export type Kind = "trigger" | "ai" | "action" | "check";

export type FlowNode = {
  id: string;
  kind: Kind;
  app: string;
  title: string;
  detail: string;
  log: string;
  x: number;
  y: number;
  /** A branch the sample run does not take. */
  skip?: boolean;
};

export type Flow = {
  id: string;
  chip: string;
  prompt: string;
  nodes: FlowNode[];
  edges: { from: string; to: string; label?: string }[];
};

export const NODE_W = 172;
export const NODE_H = 78;
export const CANVAS_W = 760;
export const CANVAS_H = 420;

export const flows: Flow[] = [
  {
    id: "payments",
    chip: "Failed payments",
    prompt:
      "When a payment fails, email the customer kindly and tell #billing.",
    nodes: [
      {
        id: "a",
        kind: "trigger",
        app: "Payments",
        title: "Payment failed",
        detail: "event: invoice.failed",
        log: "Payment failed · inv_2041 · $49.00",
        x: 16,
        y: 170,
      },
      {
        id: "b",
        kind: "ai",
        app: "AI write",
        title: "Write a kind email",
        detail: "tone: warm · add retry link",
        log: "Drafted 84 words, retry link included",
        x: 290,
        y: 56,
      },
      {
        id: "c",
        kind: "action",
        app: "Mail",
        title: "Send the email",
        detail: "to: customer.email",
        log: "Sent to dana@lumenco.example",
        x: 570,
        y: 56,
      },
      {
        id: "d",
        kind: "action",
        app: "Chat",
        title: "Post to #billing",
        detail: "“{name} failed · {amount}”",
        log: "Posted in #billing",
        x: 430,
        y: 296,
      },
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "a", to: "d" },
    ],
  },
  {
    id: "weekly",
    chip: "Monday report",
    prompt:
      "Every Monday at 9, chart last week's sign-ups and send it to #team.",
    nodes: [
      {
        id: "a",
        kind: "trigger",
        app: "Schedule",
        title: "Every Monday 9:00",
        detail: "timezone: Europe/Lisbon",
        log: "Started Mon 9:00",
        x: 16,
        y: 60,
      },
      {
        id: "b",
        kind: "action",
        app: "Database",
        title: "Get last week's sign-ups",
        detail: "group by: day",
        log: "Found 1,284 sign-ups in 7 rows",
        x: 196,
        y: 240,
      },
      {
        id: "c",
        kind: "ai",
        app: "AI chart",
        title: "Make a bar chart",
        detail: "highlight: best day",
        log: "Chart ready · best day Thursday",
        x: 384,
        y: 60,
      },
      {
        id: "d",
        kind: "action",
        app: "Chat",
        title: "Send to #team",
        detail: "with a one-line summary",
        log: "Posted in #team with chart",
        x: 572,
        y: 240,
      },
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d" },
    ],
  },
  {
    id: "demo",
    chip: "Demo booked",
    prompt:
      "When someone books a demo, research their company and brief the right person.",
    nodes: [
      {
        id: "a",
        kind: "trigger",
        app: "Calendar",
        title: "Demo booked",
        detail: "calendar: Sales demos",
        log: "Demo booked by Kai · Orbitly",
        x: 10,
        y: 170,
      },
      {
        id: "b",
        kind: "ai",
        app: "Web research",
        title: "Research the company",
        detail: "size · product · news",
        log: "Orbitly · 120 people · Series B",
        x: 200,
        y: 170,
      },
      {
        id: "c",
        kind: "check",
        app: "Filter",
        title: "More than 50 people?",
        detail: "if: company.size > 50",
        log: "Yes, 120 people",
        x: 390,
        y: 170,
      },
      {
        id: "d",
        kind: "ai",
        app: "Docs",
        title: "Brief the account lead",
        detail: "1 page · send to owner",
        log: "Brief sent to Rosa",
        x: 580,
        y: 40,
      },
      {
        id: "e",
        kind: "action",
        app: "CRM",
        title: "Add to nurture list",
        detail: "list: Small teams",
        log: "Branch not taken",
        x: 580,
        y: 300,
        skip: true,
      },
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d", label: "yes" },
      { from: "c", to: "e", label: "no" },
    ],
  },
];
