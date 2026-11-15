export type Line = {
  who: "caller" | "murmur";
  text: string;
  actions?: string[];
};

export type Call = {
  id: string;
  business: string;
  caller: string;
  initials: string;
  number: string;
  reason: string;
  tone: "calm" | "warm" | "urgent";
  lines: Line[];
  outcome: string;
  mood: string;
};

export const calls: Call[] = [
  {
    id: "dental",
    business: "Bright Smile Dental",
    caller: "Jordan Ellis",
    initials: "JE",
    number: "(555) 014-2290",
    reason: "Chipped tooth",
    tone: "calm",
    outcome: "Appointment booked",
    mood: "Relieved",
    lines: [
      {
        who: "caller",
        text: "Hi, I chipped a tooth last night. Can I get in this week?",
      },
      {
        who: "murmur",
        text: "Oh no, sorry to hear that. I can help. Is it painful, or just rough on the edge?",
      },
      { who: "caller", text: "It's a bit sensitive, not too bad." },
      {
        who: "murmur",
        text: "Got it. Dr. Okafor has Tuesday at 10:30 or Wednesday at 4:15. Which works better?",
        actions: ["Checked Dr. Okafor's calendar"],
      },
      { who: "caller", text: "Tuesday morning is perfect." },
      {
        who: "murmur",
        text: "Done. You're booked for Tuesday at 10:30. I'll text you the address and a reminder.",
        actions: ["Booked Tue 10:30 · Dr. Okafor", "Sent a confirmation text"],
      },
      { who: "caller", text: "Great, thank you!" },
      {
        who: "murmur",
        text: "Take care, Jordan. See you Tuesday.",
        actions: ["Noted: chipped tooth, mild sensitivity"],
      },
    ],
  },
  {
    id: "restaurant",
    business: "Nonna's Kitchen",
    caller: "Priya Raman",
    initials: "PR",
    number: "(555) 017-8834",
    reason: "Table for six",
    tone: "warm",
    outcome: "Table reserved",
    mood: "Delighted",
    lines: [
      {
        who: "caller",
        text: "Hey, do you have a table for six on Friday around eight?",
      },
      {
        who: "murmur",
        text: "Let me look. Eight is full inside, but I have 8:30 inside or 8:00 on the heated terrace.",
        actions: ["Checked Friday bookings"],
      },
      { who: "caller", text: "The terrace at eight sounds lovely." },
      {
        who: "murmur",
        text: "Wonderful. Any allergies, or a special occasion I should note?",
      },
      {
        who: "caller",
        text: "It's my mom's birthday, and one of us is gluten free.",
      },
      {
        who: "murmur",
        text: "Noted, both. Six on the terrace, Friday at 8:00, under Priya.",
        actions: [
          "Reserved terrace · 6 guests · Fri 8:00 pm",
          "Flagged gluten free · birthday",
        ],
      },
      { who: "caller", text: "Perfect, thanks." },
      {
        who: "murmur",
        text: "We'll have a candle ready. See you Friday!",
        actions: ["Sent a confirmation text"],
      },
    ],
  },
  {
    id: "plumbing",
    business: "Ace Plumbing",
    caller: "Sam Okoro",
    initials: "SO",
    number: "(555) 019-4471",
    reason: "Leak · urgent",
    tone: "urgent",
    outcome: "Handed to on-call plumber",
    mood: "Reassured",
    lines: [
      {
        who: "caller",
        text: "Water is coming through my kitchen ceiling. I need someone now.",
      },
      {
        who: "murmur",
        text: "That sounds urgent, Sam. First, can you turn off the main valve? It's usually under the sink or by the meter.",
        actions: ["Marked as urgent"],
      },
      { who: "caller", text: "Okay… done. It stopped." },
      {
        who: "murmur",
        text: "Good. I'm paging our on-call plumber now and sharing your address.",
        actions: ["Paged on-call · Marco", "Shared address and photos link"],
      },
      { who: "caller", text: "How long will it take?" },
      {
        who: "murmur",
        text: "Marco is 25 minutes away. I'll connect you so he can ask a few questions.",
        actions: ["Transferred the call to Marco"],
      },
    ],
  },
];

/** Simulated seconds a line takes to say. */
export const lineSeconds = (l: Line) =>
  Math.round((l.text.split(" ").length * 0.38 + 0.9) * 10) / 10;
