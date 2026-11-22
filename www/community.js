/*
 * Community landing pages, shown on /community. One entry per merged pull request (see CONTRIBUTING.md).
 * Newest first. The page renders, counts and sorts everything from this list: adding an entry is
 * all it takes, nothing else in the HTML needs to change.
 *
 * Fields (only slug, name, author.name and author.github are required):
 *   slug         folder name in community/<slug>
 *   name         display name
 *   category     one line, what the fictional product is ("Habit tracker for runners")
 *   short        one sentence shown under the name
 *   description  two or three sentences shown under "Behind the design"
 *   image        screenshot, 1600×900, stored in showcase/community/<slug>.jpg
 *   url          live preview (defaults to https://<slug>-community.vercel.app)
 *   source       source code (defaults to the community/<slug> folder on GitHub)
 *   type         fonts used
 *   stack        ["Next.js 16", "Tailwind CSS 4", "shadcn/ui", …]
 *   colors       up to four hex colours
 *   author       { name: "Their name", github: "their-github-handle" }
 *   added        merge date, "YYYY-MM-DD"
 *
 * Example:
 *   {
 *     slug: "example",
 *     name: "Example",
 *     category: "Habit tracker for runners",
 *     short: "Run every day, one streak at a time.",
 *     description: "…",
 *     image: "showcase/community/example.jpg",
 *     type: "Inter Tight, Geist Mono",
 *     stack: ["Next.js 16", "Tailwind CSS 4", "shadcn/ui"],
 *     colors: ["#F4F4F3", "#0B0B0E", "#FFD23F"],
 *     author: { name: "Jane Doe", github: "janedoe" },
 *     added: "2026-12-01",
 *   },
 */
window.COMMUNITY = [];
