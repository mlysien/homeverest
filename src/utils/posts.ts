import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { SITE } from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

type Post = CollectionEntry<"blog">;

const assets = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/blog/**/*.{png,jpg,jpeg,gif,webp}",
  { eager: true }
);

/** Resolves the post's leading `![banner](...)` image to an imported asset. */
export function getBanner(post: Post): ImageMetadata | undefined {
  const match = post.body?.match(/!\[banner\]\(([^)\s]+)\)/);
  if (!match || !post.filePath) return undefined;
  const dir = post.filePath.split("/").slice(0, -1);
  const segments = [...dir];
  for (const part of match[1].split("/")) {
    if (part === "..") segments.pop();
    else if (part !== ".") segments.push(part);
  }
  return assets[`/${segments.join("/")}`]?.default;
}

/** Estimated reading time, e.g. "6 min". */
export function getReadTime(post: Post) {
  const words = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function postDate(post: Post) {
  return dayjs(post.data.pubDatetime).tz(post.data.timezone || SITE.timezone);
}

/** "Oct 08, 2026" */
export const formatDate = (post: Post) => postDate(post).format("MMM DD, YYYY");

/** "Oct 08" */
export const formatShortDate = (post: Post) => postDate(post).format("MMM DD");

export const getYear = (post: Post) => postDate(post).format("YYYY");
