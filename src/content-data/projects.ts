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
    name: "Journal",
    desc: "Desktopowy dziennik w Markdownie, działający lokalnie: codzienna notatka z listą zadań, które same przechodzą na kolejny dzień, oraz notatki z podglądem na żywo.",
    status: "Aktywny",
    stack: "Electron · React · TypeScript",
    href: "https://github.com/mlysien/journal",
  },
  {
    name: "Integrify",
    desc: "Modułowa platforma do synchronizacji danych, tworzona przez 100 dni codziennych commitów w ramach konkursu 100commitów.",
    status: "Zarchiwizowany",
    stack: ".NET · C#",
    href: "https://github.com/mlysien/integrify",
  },
];
