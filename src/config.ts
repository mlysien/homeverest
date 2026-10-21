export const SITE = {
  website: "https://homeverest.pl", // replace this with your deployed domain
  author: "Mateusz Łysień",
  profile: "https://homeverest.pl/about",
  desc: "Notatki o oprogramowaniu, architekturze i budowaniu rzeczy.",
  title: "homeverest",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: false,
  postPerIndex: 3,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edytuj stronę",
    url: "https://github.com/mlysien/homeverest/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "pl", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Warsaw", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
