import type { ImageMetadata } from "astro";
import { statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

export type Photo = {
  src: ImageMetadata;
  caption: string;
  year: string;
  date: Date;
};

// Every image dropped into src/assets/photos shows up in the gallery.
const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

// Optional "2024-05-12-" / "2024-05-12_" / "2024-" prefix in the file name
const DATE_PREFIX = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?[-_ ]+/;

/** Earliest EXIF timestamp, i.e. when the photo was taken rather than edited. */
async function exifDate(path: string) {
  try {
    const { exif } = await sharp(path).metadata();
    const stamps = exif
      ?.toString("latin1")
      .match(/\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}/g)
      ?.map(s => new Date(s.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3")))
      .filter(d => !isNaN(d.getTime()));
    return stamps?.length
      ? new Date(Math.min(...stamps.map(Number)))
      : undefined;
  } catch {
    return undefined;
  }
}

async function photoDate(key: string, name: string) {
  const prefix = name.match(DATE_PREFIX);
  if (prefix) {
    const [, y, m = "01", d = "01"] = prefix;
    return new Date(`${y}-${m}-${d}`);
  }
  const path = join(process.cwd(), key);
  return (await exifDate(path)) ?? statSync(path).mtime;
}

const photos = await Promise.all(
  Object.entries(files).map(async ([key, mod]) => {
    const name = key
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, "");
    const date = await photoDate(key, name);
    return { src: mod.default, name, year: String(date.getFullYear()), date };
  })
);

// Oldest first (file name breaks ties)
photos.sort(
  (a, b) => a.date.getTime() - b.date.getTime() || a.name.localeCompare(b.name)
);

// Captions like "Październik 2025": when the photo was taken
const MONTH_YEAR = new Intl.DateTimeFormat("pl", {
  month: "long",
  year: "numeric",
});

const captioned: Photo[] = photos.map(({ src, year, date }) => {
  const label = MONTH_YEAR.format(date);
  return {
    src,
    year,
    date,
    caption: label.charAt(0).toUpperCase() + label.slice(1),
  };
});

/** Newest first */
export const PHOTOS: Photo[] = captioned.reverse();
