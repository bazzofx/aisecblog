# AI Security Blog

A modern, self-contained **Node.js blog** whose visual design is recreated from the
[SecEngAI.com](https://labs.secengai.com/) publication — the beehiiv "block" layout
with **Inter** typography, a hot-pink primary (`#FF0EAD`), a mustard secondary
(`#DFD150`), 6px radii, black code blocks, and a responsive card grid.

You write posts as plain **Markdown files**; the server renders everything else
(home, post, archive and tag pages) with the theme.

---

## Quick start

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

For development with auto-reload on file changes (Node 18.11+):

```bash
npm run dev
```

## Requirements

- Node.js **18.11+** (uses `node --watch` for the dev script; plain `npm start`
  works on any Node 18+).

## How it works

- **`server.js`** — Express app and routes.
- **`lib/posts.js`** — loads and parses Markdown posts from `content/posts/`.
- **`config.js`** — the single place for your site's name, tagline, nav and author.
- **`views/`** — EJS templates (partials + pages).
- **`public/css/styles.css`** — the extracted theme. All colors live in the
  `:root` design tokens at the top.
- **`public/js/main.js`** — mobile nav toggle + the placeholder subscribe form.

---

## Writing a post

Create a `.md` file in **`content/posts/`**. The filename (minus `.md`) becomes the
post's URL slug, e.g. `my-first-post.md` → `/p/my-first-post`.

Each post starts with YAML frontmatter:

```yaml
---
title: "Your post title"
date: "2026-11-10"        # quoted YYYY-MM-DD (recommended)
description: "One-line summary shown on cards and in search results."
tags: [AI, Security]       # list, or a single string "AI"
image: /images/cover-1.svg # optional; omit for the gradient placeholder
author: Your Name          # optional; overrides config.js author
featured: true             # optional; pins to the top of the home page
draft: true                # optional; hides the post everywhere
minutes: 7                 # optional; read time is auto-estimated otherwise
---

Your Markdown content here.
```

Everything after the closing `---` is rendered as the article body. Supported:
headings, **bold** / *italic*, lists, `inline code`, fenced code blocks,
blockquotes, links, images, tables, and `==highlighted==`-style `<mark>`.

Posts are re-read from `content/posts/` on every request, so **adding or editing a
`.md` file shows up on the next page refresh — no server restart needed.**

## Frontmatter reference

| Field         | Type             | Default           | Notes                              |
| ------------- | ---------------- | ----------------- | ---------------------------------- |
| `title`       | string           | filename slug     | Shown everywhere                   |
| `date`        | `"YYYY-MM-DD"`   | 1970-01-01        | Sort order; quote it to be safe    |
| `description` | string           | first 180 chars   | Card + `<meta>` description        |
| `tags`        | list or string   | `[]`              | Link to `/tags/<tag>`              |
| `image`       | path or URL      | none              | `/images/...` or a full URL        |
| `author`      | string           | `config.author`   | Per-post override                  |
| `featured`    | boolean          | `false`           | Top block on the home page         |
| `draft`       | boolean          | `false`           | `true` hides the post              |
| `minutes`     | number           | auto (words/200)  | Displayed read time                |

---

## Customizing

### 1. Identity, nav, author — `config.js`

Everything user-facing (name, tagline, description, author, nav links, logo,
and the `githubUrl` shown in the navbar/footer) is in [`config.js`](config.js).
Change it and restart.

### 2. Colors & typography — `public/css/styles.css`

The theme tokens are the `:root` block at the top of
[`public/css/styles.css`](public/css/styles.css):

```css
--wt-primary-color: #ff0ead;   /* buttons, accents, tag pills */
--wt-secondary-color: #dfd150; /* secondary buttons, highlights */
--wt-background-color: #ffffff;
--wt-text-on-background-color: #0a0a0a;
--wt-border-radius: 6px;
```

Change those values and the whole site updates. Fonts are loaded from Google
Fonts (`Inter` + `JetBrains Mono`) in
[`views/partials/head.ejs`](views/partials/head.ejs).

### 3. Cover images

Drop images into `public/images/` and reference them as `/images/name.ext`.
The three shipped `cover-*.svg` files are simple gradient placeholders you can
replace with real screenshots or photos.

### 4. The subscribe form

The footer form is a **placeholder**. To collect real subscribers, set
`subscribeEndpoint` in `config.js` to your provider's form action URL (Mailchimp,
Buttondown, beehiiv, ConvertKit, etc.). Until you do, submitting just shows a
thank-you note. Set `subscribe: false` to hide it entirely.

---

## GitHub Pages

The repo is wired to publish a static copy on GitHub Pages at
**`https://bazzofx.github.io/aisecblog/`**.

1. **Push to `main`** — the workflow in
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs
   `npm run build` and publishes the generated `dist/` folder.
2. **Enable Pages** — on GitHub, open the repo → *Settings → Pages → Source* and
   choose **GitHub Actions**. (Do this once.)
3. The site is then live at `https://bazzofx.github.io/aisecblog/`.

The workflow builds with `BASE_PATH=/aisecblog`, so every link and asset is
prefixed with the project subpath. To preview the same output locally:

```bash
npm run build          # builds dist/ (BASE_PATH defaults to "")
npx serve dist         # serve the static output
```

> If you rename the repository, update `BASE_PATH` in
> [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) to the new name.

---

## Project structure

```
.
├── server.js                  # Express app + routes
├── config.js                  # site identity, githubUrl & settings
├── lib/
│   └── posts.js               # Markdown loader & helpers
├── content/
│   └── posts/                 # ← write your posts here
├── views/
│   ├── partials/              # head, navbar, footer, post-card
│   └── home.ejs  archive.ejs  tags.ejs  tag.ejs  post.ejs  404.ejs
├── public/
│   ├── css/styles.css         # theme
│   ├── js/main.js             # nav + subscribe
│   ├── images/                # covers + icons
│   └── favicon.svg
├── scripts/
│   └── build.js               # static export → dist/ (GitHub Pages)
├── .github/
│   └── workflows/deploy.yml   # Pages build & deploy
└── package.json
```

## Design provenance

The layout and styling are a faithful recreation of the *SecEngAI.com* beehiiv
publication, which was mirrored locally for reference. Only the visual language
was reproduced; all content here is original placeholder material for you to
replace.
