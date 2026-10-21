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

const BGP_EPISODES = [
  "865bnirxGVs",
  "0f8qhMQiowQ",
  "bs9tKNP_PLQ",
  "YjnYh1PjMIM",
  "Fbej2cn9Wng",
  "_vgua0788vE",
];

export const MEDIA: MediaItem[] = [
  {
    type: "article",
    title: "Jak wygląda praca Software System Engineera w intralogistyce?",
    outlet: "Just Join IT",
    date: "Apr 2024",
    meta: "Interview",
    href: "https://justjoin.it/blog/praca-software-system-engineera-intralogistyka",
  },
  ...BGP_EPISODES.map((youtube, i) => ({
    type: "podcast" as const,
    title: `BGP Insights — Episode ${i + 1}`,
    outlet: "Beumer Group Poland",
    meta: "Host",
    href: `https://www.youtube.com/watch?v=${youtube}`,
    youtube,
  })).reverse(),
  {
    type: "article",
    title: "Zdarzenia i delegaty w języku C#",
    outlet: "i-systems blog",
    date: "Dec 2017",
    meta: "Technical article",
    href: "https://blog.i-systems.pl/zdarzenia-delegaty-jezyku-c/",
  },
  {
    type: "article",
    title: "Wzorzec projektowy Adapter",
    outlet: "i-systems blog",
    date: "Jun 2017",
    meta: "Technical article",
    href: "https://blog.i-systems.pl/wzorzec-projektowy-adapter/",
  },
];
