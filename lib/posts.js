/**
 * Reads Markdown posts from /content/posts and exposes typed helpers.
 *
 * Each post file uses YAML frontmatter:
 *
 *   ---
 *   title: "Your post title"
 *   date: 2026-10-28
 *   description: "One-line summary shown on cards and in <meta>."
 *   tags: [ai, security]
 *   image: /images/cover-1.svg   # optional; empty = gradient placeholder
 *   author: Your Name            # optional; overrides config.author
 *   featured: true               # optional; pin to top of the home page
 *   draft: true                  # optional; hide from every page
 *   minutes: 7                   # optional; auto-estimated otherwise
 *   ---
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

marked.setOptions({ gfm: true, breaks: false });

function readingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Normalize a frontmatter date to a UTC-midnight Date so display is
// timezone-independent regardless of whether YAML handed us a string
// ("2026-11-10") or a Date object.
function parseDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
  }
  if (typeof value === "string") {
    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(value.trim());
    if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date(0);
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn(`[posts] No content directory at ${POSTS_DIR}`);
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");

      const tags = Array.isArray(data.tags)
        ? data.tags.map(String)
        : data.tags
          ? [String(data.tags)]
          : [];

      const date = parseDate(data.date);
      const excerpt =
        (data.description || "").trim() ||
        stripMarkdown(content).slice(0, 180) + "\u2026";

      return {
        slug,
        title: (data.title || slug).trim(),
        date,
        dateRaw: date.toISOString().slice(0, 10),
        description: excerpt,
        tags,
        image: data.image || "",
        author: data.author || null,
        draft: Boolean(data.draft),
        featured: Boolean(data.featured),
        minutes: data.minutes || readingTime(content),
        html: marked.parse(content),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date - a.date);
}

function getPosts() {
  // Reload from disk on every call so adding/editing a Markdown file
  // shows up on the next request — no server restart required.
  return loadPosts();
}

function getPost(slug) {
  return getPosts().find((p) => p.slug === slug) || null;
}

function getTags() {
  const counts = {};
  for (const p of getPosts()) {
    for (const t of p.tags) counts[t] = (counts[t] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

function getPostsByTag(tag) {
  return getPosts().filter((p) => p.tags.includes(tag));
}

function getRelated(post, limit = 3) {
  if (!post) return [];
  return getPosts()
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit);
}

// Dates are written as bare YYYY-MM-DD, so format in UTC to avoid
// off-by-one shifts across timezones.
function formatDate(d) {
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

module.exports = {
  getPosts,
  getPost,
  getTags,
  getPostsByTag,
  getRelated,
  formatDate,
};
