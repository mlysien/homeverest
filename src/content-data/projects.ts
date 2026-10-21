export type Project = {
  name: string;
  desc: string;
  status: "Active" | "Archived";
  stack: string;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    name: "homeverest",
    desc: "This site. A static Astro blog with Pagefind search, an RSS feed and generated OG images.",
    status: "Active",
    stack: "Astro · TypeScript",
    href: "https://github.com/mlysien/homeverest",
  },
  {
    name: "Pomodoro",
    desc: "A desktop Pomodoro timer built from scratch with Cursor as a pair-programming partner.",
    status: "Active",
    stack: "Tauri · Rust · TypeScript",
    href: "https://github.com/mlysien/Pomodoro",
  },
  {
    name: "Integrify",
    desc: "A modular data-synchronisation platform built over 100 days of daily commits for the 100commitów contest.",
    status: "Archived",
    stack: ".NET · C#",
    href: "https://github.com/mlysien/integrify",
  },
];
