# Aaron Tao — Portfolio

> I build AI products that ship.

Live at **[taohaonan.com](https://www.taohaonan.com)**.

Source for my personal portfolio. A Next.js App Router site with MDX-backed writings, light/dark themes, a `⌘K` command palette, and a handful of details I cared enough about to bother engineering.

<p align="center">
  <img src="Web.png" width="900" alt="Portfolio screenshot" />
</p>

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18 + Tailwind CSS 3 |
| Animation | Framer Motion 11 (respects `prefers-reduced-motion`) |
| Theming | `next-themes` — light + dark, system-aware, no FOUC |
| Command palette | `cmdk` |
| Writings | MDX via `next-mdx-remote` with frontmatter |
| Email | Resend (contact form) |
| Hosting | Vercel |

## Things worth pointing out

- **`⌘K` command palette.** Fuzzy-search across pages, projects, writings, theme toggle, and contact actions. Triggered by `⌘K` / `Ctrl K` or the navbar `Search` button.
- **Two themes, no flash on first paint.** Surfaces use CSS variables so the flip is consistent across every component, including MDX-rendered articles.
- **Per-writing OG images.** Every MDX post gets its own 1200×630 share card rendered with `next/og` `ImageResponse` at build time. The site root has a matching one.
- **Article-scoped reading progress.** On `/writings/[slug]` the top progress bar measures how far you are through the `<article>`, not the full page (navbar + footer don't skew it).
- **A scrolling turtle** (`ScrollCompanion`) that walks across the bottom of the page with your scroll position. It does nothing useful. That is the point.
- **RSS** at `/feed.xml`, **sitemap** at `/sitemap.xml`, **robots** at `/robots.txt` — all generated from real frontmatter data, no hand-maintained lists.
- **Accessibility-aware motion.** `prefers-reduced-motion` is honoured both via a CSS sledgehammer and `<MotionConfig reducedMotion="user">`; decorative animation stops for users who opt out.
- **404 with personality.** A wandering turtle and a `⌘K` hint, because someone is going to land there.

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

For the contact form to actually send, set the following in `.env.local`:

```
RESEND_API_KEY=...
FROM_EMAIL=...
MY_EMAIL=...
```

Without them the form returns 500; the rest of the site works fine.

## Layout

```
src/
├── app/                       Next.js App Router
│   ├── components/            UI (HeroSection, NavBar, CommandPalette, …)
│   ├── writings/              Post listing + dynamic [slug] route
│   │   └── [slug]/
│   │       ├── page.js
│   │       ├── opengraph-image.jsx    Per-post OG card
│   │       └── twitter-image.jsx
│   ├── api/send/              Contact form endpoint (Resend)
│   ├── feed.xml/route.js      RSS feed
│   ├── sitemap.js             Sitemap
│   ├── robots.js              robots.txt
│   ├── opengraph-image.jsx    Site-wide OG card
│   ├── twitter-image.jsx
│   └── not-found.jsx          404
├── content/writings/          MDX articles
└── lib/writings.js            Frontmatter loader
```

## Add a writing

Drop a new MDX file in `src/content/writings/`:

```yaml
---
title: "..."
slug: "..."
date: "2026-04-29"
summary: "..."
tags: ["RAG", "..."]
category: "project" | "ideas"
readingTime: "6 min"
---
```

The post then appears in `/writings`, on the homepage feed, in `sitemap.xml`, and in `feed.xml`, and gets its own OG / Twitter card — all on the next build. No additional wiring.

## Contact

- [taoaaron5@gmail.com](mailto:taoaaron5@gmail.com)
- [github.com/HAONANTAO](https://github.com/HAONANTAO)
- [linkedin.com/in/haonan-tao-aaron](https://www.linkedin.com/in/haonan-tao-aaron/)

## License

MIT — see [LICENSE](LICENSE).
