export type MediaItem = {
  type: "article" | "podcast";
  title: string;
  outlet: string;
  date?: string;
  meta: string;
  href: string;
  /** YouTube video id, used for the thumbnail */
  youtube?: string;
};

/** Short Polish month names, as used in `date` ("kwi 2024") */
const MONTHS = [
  "sty",
  "lut",
  "mar",
  "kwi",
  "maj",
  "cze",
  "lip",
  "sie",
  "wrz",
  "paź",
  "lis",
  "gru",
];

/** "kwi 2024" -> 202403, comparable; undated items sort last */
function sortKey({ date }: MediaItem) {
  const [month, year] = date?.split(" ") ?? [];
  const m = MONTHS.indexOf(month);
  return m === -1 ? -1 : Number(year) * 100 + m;
}

const BGP_EPISODES = [
  "865bnirxGVs",
  "0f8qhMQiowQ",
  "bs9tKNP_PLQ",
  "YjnYh1PjMIM",
  "Fbej2cn9Wng",
  "_vgua0788vE",
];

const ITEMS: MediaItem[] = [
  {
    type: "article",
    title: "Jak wygląda praca Software System Engineera w intralogistyce?",
    outlet: "Just Join IT",
    date: "kwi 2024",
    meta: "Wywiad",
    href: "https://justjoin.it/blog/praca-software-system-engineera-intralogistyka",
  },
  // One episode a month, starting January 2025
  ...BGP_EPISODES.map((youtube, i) => ({
    type: "podcast" as const,
    title: `BGP Insights — Odcinek ${i + 1}`,
    outlet: "Beumer Group Poland",
    date: `${MONTHS[i]} 2025`,
    meta: "Prowadzący",
    href: `https://www.youtube.com/watch?v=${youtube}`,
    youtube,
  })),
  {
    type: "article",
    title: "Zdarzenia i delegaty w języku C#",
    outlet: "i-systems blog",
    date: "gru 2017",
    meta: "Artykuł techniczny",
    href: "https://blog.i-systems.pl/zdarzenia-delegaty-jezyku-c/",
  },
  {
    type: "article",
    title: "Wzorzec projektowy Adapter",
    outlet: "i-systems blog",
    date: "cze 2017",
    meta: "Artykuł techniczny",
    href: "https://blog.i-systems.pl/wzorzec-projektowy-adapter/",
  },
];

/** Newest first */
export const MEDIA = ITEMS.toSorted((a, b) => sortKey(b) - sortKey(a));
