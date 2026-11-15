/**
 * Static site exporter for GitHub Pages.
 *
 * Renders every page (home, archive, tags, tag pages, posts, 404) to `dist/`
 * as directory-style `index.html` files (clean URLs), then copies the `public/`
 * assets. The GitHub Actions workflow runs `npm run build` with BASE_PATH set
 * to the repository name so links resolve under the project subpath.
 */
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const config = require("../config");
const posts = require("../lib/posts");

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const VIEWS = path.join(ROOT, "views");
const PUBLIC = path.join(ROOT, "public");

const base = process.env.BASE_PATH || config.basePath || "";

function makeLocals(extra = {}) {
  return {
    site: config,
    base,
    url: (p) => {
      const full = base + p;
      return full.endsWith("/") ? full : full + "/";
    },
    asset: (p) => (/^https?:\/\//i.test(p || "") ? p : base + (p || "")),
    formatDate: posts.formatDate,
    path: "",
    ...extra,
  };
}

async function render(view, locals, outFile) {
  const html = await ejs.renderFile(path.join(VIEWS, view + ".ejs"), locals, {
    views: [VIEWS],
  });
  const out = path.join(DIST, outFile);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log("  wrote", outFile);
}

async function main() {
  fs.rmSync(DIST, { recursive: true, force: true });

  const all = posts.getPosts();

  // Home
  const featured = all.find((p) => p.featured) || all[0] || null;
  const rest = all.filter((p) => p !== featured).slice(0, config.postsPerPage);
  await render("home", makeLocals({ featured, posts: rest, path: "/" }), "index.html");

  // Archive
  await render(
    "archive",
    makeLocals({ posts: all, archiveData: posts.getArchiveData(), path: "/archive" }),
    "archive/index.html",
  );

  // Tags
  const tags = posts.getTags();
  await render("tags", makeLocals({ tags, path: "/tags" }), "tags/index.html");
  for (const { tag } of tags) {
    await render(
      "tag",
      makeLocals({ tag, posts: posts.getPostsByTag(tag), path: "/tags/" + tag }),
      `tags/${encodeURIComponent(tag)}/index.html`,
    );
  }

  // Posts
  for (const p of all) {
    await render(
      "post",
      makeLocals({ post: p, related: posts.getRelated(p, 3), path: "/p/" + p.slug }),
      `p/${p.slug}/index.html`,
    );
  }

  // 404
  await render("404", makeLocals({ path: "" }), "404.html");

  // Prevent Jekyll from processing the generated output.
  fs.writeFileSync(path.join(DIST, ".nojekyll"), "");

  // Copy static assets (css, js, images, favicon).
  fs.cpSync(PUBLIC, DIST, { recursive: true });

  console.log(`\nBuilt static site to dist/ (${base || "/"} base path)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
