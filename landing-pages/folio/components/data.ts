export type BlockType = "h2" | "p" | "todo" | "callout" | "bullet" | "quote" | "db";
export type Block = {
  id: string;
  type: BlockType;
  text: string;
  done?: boolean;
};

export type TaskStatus = "Not started" | "In progress" | "Done";
export type Task = {
  id: string;
  name: string;
  owner: string;
  status: TaskStatus;
  day: number; // 0 = Mon … 4 = Fri
  due: string;
};

export const owners: Record<string, string> = {
  Ana: "#e8a33d",
  Theo: "#3b82f6",
  Mina: "#ec4899",
  Sam: "#13865d",
};

export const tasks: Task[] = [
  { id: "t1", name: "Final pricing page copy", owner: "Mina", status: "In progress", day: 1, due: "Tue" },
  { id: "t2", name: "Record the demo video", owner: "Theo", status: "Not started", day: 2, due: "Wed" },
  { id: "t3", name: "Press kit and screenshots", owner: "Ana", status: "Done", day: 0, due: "Mon" },
  { id: "t4", name: "Email to the waitlist", owner: "Sam", status: "Not started", day: 3, due: "Thu" },
  { id: "t5", name: "Launch day checklist", owner: "Ana", status: "In progress", day: 4, due: "Fri" },
];

export type Page = {
  id: string;
  title: string;
  icon: "rocket" | "book" | "notes" | "palette" | "users" | "home" | "sun" | "pen";
  color: string;
  parent?: string;
  editedBy: string;
  blocks: Block[];
};

export const pages: Page[] = [
  {
    id: "launch",
    title: "Launch plan",
    icon: "rocket",
    color: "#13865d",
    editedBy: "Ana",
    blocks: [
      { id: "b1", type: "callout", text: "Launch is on Friday, November 20. Everything below should be done by Thursday night." },
      { id: "b2", type: "h2", text: "Goals" },
      { id: "b3", type: "bullet", text: "1,500 sign-ups in the first week" },
      { id: "b4", type: "bullet", text: "A demo video under two minutes" },
      { id: "b5", type: "h2", text: "Before launch" },
      { id: "b6", type: "todo", text: "Freeze the pricing page", done: true },
      { id: "b7", type: "todo", text: "Test the sign-up flow on mobile", done: false },
      { id: "b8", type: "todo", text: "Brief support on the new plans", done: false },
      { id: "b9", type: "db", text: "Launch tasks" },
    ],
  },
  { id: "handbook", title: "Handbook", icon: "book", color: "#3b82f6", editedBy: "Theo", blocks: [] },
  {
    id: "onboarding",
    title: "Onboarding",
    icon: "users",
    color: "#3b82f6",
    parent: "handbook",
    editedBy: "Theo",
    blocks: [
      { id: "o1", type: "p", text: "Welcome to Juniper. Your first week is about meeting people, not shipping code." },
      { id: "o2", type: "h2", text: "Day one" },
      { id: "o3", type: "todo", text: "Laptop, accounts and a coffee with your buddy", done: true },
      { id: "o4", type: "todo", text: "Read the three docs pinned in #general", done: false },
      { id: "o5", type: "quote", text: "Ask the question twice before you guess once." },
    ],
  },
  { id: "remote", title: "Remote work", icon: "home", color: "#3b82f6", parent: "handbook", editedBy: "Mina", blocks: [] },
  { id: "notes", title: "Meeting notes", icon: "notes", color: "#e8a33d", editedBy: "Sam", blocks: [] },
  {
    id: "review",
    title: "Design review · Nov 4",
    icon: "pen",
    color: "#e8a33d",
    parent: "notes",
    editedBy: "Mina",
    blocks: [
      { id: "r1", type: "p", text: "Attendees: Mina, Theo, Ana. We reviewed the new onboarding screens." },
      { id: "r2", type: "h2", text: "Decisions" },
      { id: "r3", type: "bullet", text: "Keep the progress bar, drop the confetti" },
      { id: "r4", type: "bullet", text: "Move the invite step after the first project" },
      { id: "r5", type: "h2", text: "Follow-ups" },
      { id: "r6", type: "todo", text: "Theo: prototype the new invite step", done: false },
    ],
  },
  { id: "brand", title: "Brand guide", icon: "palette", color: "#ec4899", editedBy: "Mina", blocks: [] },
];

/** Blocks the "/" menu inserts, by type. */
export const slashItems: { type: BlockType; label: string; hint: string; sample: string }[] = [
  { type: "h2", label: "Heading", hint: "Big section title", sample: "After launch" },
  { type: "todo", label: "To-do list", hint: "Track a task", sample: "Thank the beta testers by email" },
  { type: "callout", label: "Callout", hint: "Make it stand out", sample: "Press embargo lifts at 9:00 Paris time." },
  { type: "quote", label: "Quote", hint: "Capture a line", sample: "Ship it on Friday, polish it on Monday." },
  { type: "bullet", label: "Bulleted list", hint: "A simple list", sample: "Post the video on every channel" },
];

export const templates = [
  { name: "Weekly team meeting", cat: "People", uses: 18400, color: "#e8a33d", icon: "notes" as const },
  { name: "Product spec", cat: "Engineering", uses: 22100, color: "#3b82f6", icon: "pen" as const },
  { name: "Design critique", cat: "Design", uses: 9600, color: "#ec4899", icon: "palette" as const },
  { name: "Onboarding checklist", cat: "People", uses: 15300, color: "#13865d", icon: "users" as const },
  { name: "Bug triage board", cat: "Engineering", uses: 12800, color: "#ef4444", icon: "rocket" as const },
  { name: "Reading list", cat: "Personal", uses: 30900, color: "#8b5cf6", icon: "book" as const },
  { name: "Brand moodboard", cat: "Design", uses: 7200, color: "#f97316", icon: "sun" as const },
  { name: "Habit tracker", cat: "Personal", uses: 41000, color: "#0ea5e9", icon: "home" as const },
];
