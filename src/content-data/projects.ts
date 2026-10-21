export type Project = {
  name: string;
  desc: string;
  status: "Aktywny" | "Zarchiwizowany";
  stack: string;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    name: "homeverest",
    desc: "Ta strona. Statyczny blog w Astro z wyszukiwarką Pagefind, kanałem RSS i generowanymi obrazkami OG.",
    status: "Aktywny",
    stack: "Astro · TypeScript",
    href: "https://github.com/mlysien/homeverest",
  },
  {
    name: "Pomodoro",
    desc: "Desktopowy timer Pomodoro zbudowany od zera z Cursorem jako partnerem do programowania w parach.",
    status: "Aktywny",
    stack: "Tauri · Rust · TypeScript",
    href: "https://github.com/mlysien/Pomodoro",
  },
  {
    name: "Integrify",
    desc: "Modułowa platforma do synchronizacji danych, tworzona przez 100 dni codziennych commitów w ramach konkursu 100commitów.",
    status: "Zarchiwizowany",
    stack: ".NET · C#",
    href: "https://github.com/mlysien/integrify",
  },
];
