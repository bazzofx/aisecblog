const path = require("path");
const express = require("express");
const config = require("./config");
const posts = require("./lib/posts");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Shared data + helpers available to every template.
app.use((req, res, next) => {
  const base = config.basePath || "";
  res.locals.site = config;
  res.locals.base = base;
  // Internal path: prefix the base path and ensure a trailing slash so the
  // same templates work at "/" locally and "/aisecblog/" on GitHub Pages.
  res.locals.url = (p) => {
    const full = base + p;
    return full.endsWith("/") ? full : full + "/";
  };
  // Static asset: prefix the base path, but leave absolute URLs untouched.
  res.locals.asset = (p) => (/^https?:\/\//i.test(p || "") ? p : base + (p || ""));
  res.locals.formatDate = posts.formatDate;
  res.locals.path = (req.path || "/").replace(/\/+$/, "") || "/";
  next();
});

// Home — featured block on top, then the post grid.
app.get("/", (req, res) => {
  const all = posts.getPosts();
  const featured = all.find((p) => p.featured) || all[0] || null;
  const rest = all.filter((p) => p !== featured).slice(0, config.postsPerPage);
  res.render("home", { featured, posts: rest });
});

// Archive — every post, newest first.
app.get("/archive", (req, res) => {
  res.render("archive", { posts: posts.getPosts() });
});

// Tag index and per-tag listing.
app.get("/tags", (req, res) => {
  res.render("tags", { tags: posts.getTags() });
});

app.get("/tags/:tag", (req, res) => {
  const tag = req.params.tag;
  const list = posts.getPostsByTag(tag);
  res.render("tag", { tag, posts: list });
});

// Single post.
app.get("/p/:slug", (req, res, next) => {
  const post = posts.getPost(req.params.slug);
  if (!post) return next();
  res.render("post", { post, related: posts.getRelated(post, 3) });
});

// 404.
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  const line = "\u2500".repeat(48);
  console.log(`\n${line}`);
  console.log(`  ${config.name}`);
  console.log(`  \u2192 http://localhost:${PORT}`);
  console.log(`${line}\n`);
});
