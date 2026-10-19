# php-for-netify

Static companion site for the [PHP Learning Platform](../php_learning) — a marketing
landing page plus **the complete course**: every published lesson (blocks, code
examples, diagrams, figures) exported from the platform database. Built with Astro +
Tailwind CSS 4, deployed to Netlify.

> **License note:** lesson content derives from a copyrighted book and carries page
> citations. Per the main project's licensing stance, this site should stay private
> (or be deployed with `noindex`), not be published as public book-derived material.

## Regenerate content

The static content is generated from the Laravel app — never hand-edit `src/data/`:

```bash
cd ../php_learning
php artisan lessons:export-static   # writes src/data/ + copies public/figures
```

The command dumps every published lesson via the same `LessonBuilder` the app renders
with (blocks with page citations, code examples with tiers/listing refs, Mermaid
diagrams, figures), plus `manifest.json` and `structure.json` (chapter/section tree).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the build locally
```

## Deploy to Netlify

**Option A — connect a repo (recommended):** push this folder to its own Git repo,
then in Netlify choose *Add new site → Import an existing project*. Netlify reads
`netlify.toml` (build: `npm run build`, publish: `dist`) automatically.

**Option B — drag and drop:** run `npm run build`, then drag the `dist/` folder onto
<https://app.netlify.com/drop>.

## Structure

```
src/
  data/              exported lesson JSON (manifest + structure + per-lesson files)
  lib/               content types + loaders, text helpers
  components/        shared (Citation, SourceBadge) + all 18 block renderers
  pages/
    index.astro      landing page
    404.astro        not-found page (served by Netlify automatically)
    lessons/         index (chapter-grouped) + [slug].astro lesson reader
public/
  figures/           book figure images copied from the platform
netlify.toml         build command + publish dir + security headers
```

## Block coverage

All 18 lesson block types from the platform are rendered: heading, paragraph,
bullets, callout, code (Shiki syntax highlighting), output, table, diagram (Mermaid,
client-side like the app), book quote, modern panel (BOOK/MODERN/WHY), prereq list,
exercise/quiz/card/interview refs (read-only lists), tabs, image (book figures),
code example (tier badge, listing ref, expected output, syntax notes, common
mistake), plus a fallback. Interactive exercise/quiz/flashcards intentionally link
back to the full app instead.
