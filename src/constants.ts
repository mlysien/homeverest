import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconInstagram from "@/assets/icons/IconInstagram.svg";
import IconLightroom from "@/assets/icons/IconLightroom.svg";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/mlysien",
    linkTitle: `Mój profil na GitHubie`,
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mlysien/",
    linkTitle: `Mój profil na LinkedInie`,
    icon: IconLinkedin,
  },
  {
    name: "E-mail",
    href: "mailto:mateusz.lysien@homeverest.pl",
    linkTitle: `Napisz do mnie`,
    icon: IconMail,
  },
] as const;

export const PHOTO_LINKS: (Social & { cta: string })[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/mlysien.jpg/",
    linkTitle: `Moje zdjęcia na Instagramie`,
    cta: "Zobacz więcej na moim Instagramie",
    icon: IconInstagram,
  },
  {
    name: "Lightroom",
    href: "https://lightroom.adobe.com/u/mateuszysie",
    linkTitle: `Moje zdjęcia w Lightroomie`,
    cta: "Przeglądaj moje albumy w Lightroomie",
    icon: IconLightroom,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=",
    linkTitle: `Udostępnij wpis na LinkedInie`,
    icon: IconLinkedin,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Udostępnij wpis na X`,
    icon: IconBrandX,
  },
] as const;
