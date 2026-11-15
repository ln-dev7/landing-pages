export const people = {
  ana: { name: "Ana Moretti", short: "Ana", color: "#f59e0b", status: "online" },
  theo: { name: "Theo Laurent", short: "Theo", color: "#3b82f6", status: "away" },
  mina: { name: "Mina Okafor", short: "Mina", color: "#10b981", status: "online" },
  sam: { name: "Sam Ruiz", short: "Sam", color: "#8b5cf6", status: "online" },
  you: { name: "You", short: "You", color: "#e0407b", status: "online" },
} as const;
export type Who = keyof typeof people;

export type Reaction = { icon: "thumbs" | "heart" | "party" | "eyes" | "check"; n: number; mine?: boolean };
export type Msg = {
  id: string;
  who: Who;
  time: string;
  text: string;
  reactions?: Reaction[];
  replies?: { who: Who; text: string; time: string }[];
  file?: string;
};

export type Channel = {
  id: string;
  name: string;
  topic: string;
  unread: number;
  dm?: Who;
  msgs: Msg[];
  /** What a teammate answers when you post here. */
  reply: { who: Who; text: string };
};

export const channels: Channel[] = [
  {
    id: "launch",
    name: "launch",
    topic: "Everything for Friday's release",
    unread: 4,
    reply: { who: "ana", text: "Perfect, I'll add it to the checklist." },
    msgs: [
      {
        id: "l1", who: "ana", time: "9:12", text: "Morning! Release candidate is up on staging. Please click around before noon.",
        reactions: [{ icon: "eyes", n: 3 }, { icon: "thumbs", n: 2 }],
      },
      {
        id: "l2", who: "theo", time: "9:40", text: "Found one thing: the pricing toggle resets after login. Fix is in review.",
        reactions: [{ icon: "check", n: 1 }],
        replies: [
          { who: "ana", text: "Is it safe for Friday?", time: "9:42" },
          { who: "theo", text: "Yes, it's one line and has a test.", time: "9:44" },
          { who: "mina", text: "Approved. Merging after lunch.", time: "9:51" },
        ],
      },
      { id: "l3", who: "mina", time: "10:05", text: "Launch video is final. 1 min 48 s, captions in 6 languages.", file: "launch-video-final.mp4", reactions: [{ icon: "party", n: 5 }, { icon: "heart", n: 3 }] },
      { id: "l4", who: "sam", time: "10:21", text: "Support macros for the new plans are ready. I'll brief the team at 3." },
    ],
  },
  {
    id: "design",
    name: "design",
    topic: "Critiques, files and the occasional moodboard",
    unread: 2,
    reply: { who: "mina", text: "Love it. Can you drop the file in the thread?" },
    msgs: [
      { id: "d1", who: "mina", time: "8:55", text: "New onboarding screens are in the file. Feedback by Thursday please.", reactions: [{ icon: "eyes", n: 2 }] },
      {
        id: "d2", who: "theo", time: "9:30", text: "The progress bar works. The confetti… less so.", reactions: [{ icon: "thumbs", n: 4 }],
        replies: [{ who: "mina", text: "Fair. Confetti is gone.", time: "9:33" }],
      },
    ],
  },
  {
    id: "support",
    name: "support",
    topic: "Customer questions and bug reports",
    unread: 7,
    reply: { who: "sam", text: "Thanks! I'll let the customer know right away." },
    msgs: [
      { id: "s1", who: "sam", time: "9:02", text: "Three customers asked about invoices in euros. Do we support that yet?" },
      { id: "s2", who: "ana", time: "9:20", text: "Not yet. It ships next week, you can promise it.", reactions: [{ icon: "check", n: 2 }] },
      { id: "s3", who: "sam", time: "10:10", text: "Login on Safari is slow for one big account. Looking into it." },
    ],
  },
  {
    id: "dm-ana",
    name: "Ana Moretti",
    topic: "Direct message",
    unread: 0,
    dm: "ana",
    reply: { who: "ana", text: "Sounds good! Talk at 4." },
    msgs: [{ id: "a1", who: "ana", time: "8:30", text: "Can we sync for ten minutes this afternoon about the launch email?" }],
  },
];

export const catchup = [
  { channel: "launch", text: "The release candidate is on staging. The pricing toggle bug is fixed and approved for Friday.", jump: "l2" },
  { channel: "launch", text: "The launch video is final (1:48, six languages).", jump: "l3" },
  { channel: "support", text: "Customers ask about euro invoices: they ship next week, you can promise them.", jump: "s2" },
  { channel: "design", text: "Onboarding feedback is due Thursday. The confetti was dropped.", jump: "d2" },
];

export const workflows = [
  { id: "gh", app: "GitHub", when: "A pull request is merged", to: "#launch", text: "PR #482 merged: fix pricing toggle after login", color: "#111113" },
  { id: "cal", app: "Calendar", when: "A meeting starts", to: "your status", text: "Status set to “In a meeting” until 3:30", color: "#3b82f6" },
  { id: "desk", app: "Helpdesk", when: "An urgent ticket arrives", to: "#support", text: "Urgent: Brightloom can't export invoices", color: "#ef4444" },
  { id: "form", app: "Forms", when: "Someone joins the beta", to: "#growth", text: "New beta sign-up: 1,204 this week", color: "#10b981" },
];
