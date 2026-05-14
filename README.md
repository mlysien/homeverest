# homeverest

Personal blog of Mateusz Łysień, built with Astro and focused on performance, readable typography, and SEO-friendly static output.

Site: https://homeverest.pl

## About

This repository contains the source code for the homeverest blog.

Key goals:
- Fast static pages
- Clean writing experience in Markdown
- Searchable content with Pagefind
- Automatic sitemap, RSS, and OG image generation

## Tech Stack

- Astro 5
- TypeScript
- Tailwind CSS 4
- Pagefind (client-side search index)
- Shiki code highlighting (+ transformers)
- Sharp + Satori + Resvg (image generation)

## Project Structure

Main directories:

- `src/data/blog/` - blog posts in Markdown
- `src/pages/` - routes and top-level pages
- `src/components/` - reusable Astro components
- `src/layouts/` - layout templates
- `src/utils/` - utilities (sorting, tags, slug helpers, OG tools)
- `public/` - static assets copied as-is

## Local Development

### Requirements

- Node.js LTS
- pnpm

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

The site runs on `http://localhost:4321`.

## Available Scripts

- `pnpm dev` - run Astro in development mode
- `pnpm build` - type-check, build static site, generate Pagefind index, copy index to `public/pagefind`
- `pnpm preview` - preview the production build locally
- `pnpm sync` - sync Astro types
- `pnpm lint` - run ESLint
- `pnpm format` - format files with Prettier
- `pnpm format:check` - verify formatting without changing files

## Writing New Posts

Add a new Markdown file under `src/data/blog/<year>/`.

Recommended steps:
1. Create a file with a kebab-case slug.
2. Add frontmatter (title, description, publish date, tags, etc.).
3. Add related assets to `src/assets/blog/` when needed.
4. Run `pnpm dev` and verify the post in the browser.

## Build and Deployment

This project uses Astro static output (`output: "static"`), so deployment is simple:

1. Run `pnpm build`.
2. Deploy the generated `dist/` directory to any static hosting platform.

The production site URL is configured in `src/config.ts` (`SITE.website`).

## Docker

The repository includes:

- `Dockerfile` for multi-stage static build and Nginx runtime
- `docker-compose.yml` for local development with Node LTS

Build and run with Docker:

```bash
docker build -t homeverest .
docker run --rm -p 8080:80 homeverest
```

## License

This project is licensed under the MIT License. See `LICENSE`.
