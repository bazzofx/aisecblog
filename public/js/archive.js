/* AI Cyber Samurai — Archive page interactions (vanilla JS, no dependencies). */
(function () {
  "use strict";

  var posts = Array.isArray(window.__POSTS__) ? window.__POSTS__ : [];
  var base = window.__BASE__ || "";

  var svg = document.getElementById("archive-svg");
  var nodesGroup = document.getElementById("archive-nodes");
  var labelsGroup = document.getElementById("archive-labels");
  var arc = document.getElementById("archive-arc");
  var tooltip = document.getElementById("archive-tooltip");
  var filtersEl = document.getElementById("archive-filters");
  var searchInput = document.getElementById("archive-search");
  var kbdEl = document.getElementById("archive-kbd");
  var sortEl = document.getElementById("archive-sort");
  var gridEl = document.getElementById("archive-grid");
  var countEl = document.getElementById("archive-count");
  var emptyEl = document.getElementById("archive-empty");
  var previewEl = document.getElementById("archive-preview");

  var state = { filter: "All", query: "", sort: "newest", selected: 0 };

  var CX = 280;
  var CY = 280;
  var R_NODE = 210;
  var R_LABEL = 234;
  var R_ARC = 250;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function url(p) {
    return base + p;
  }

  function asset(p) {
    return /^https?:\/\//i.test(p || "") ? p : base + (p || "");
  }

  function shortDate(iso) {
    var m = /^(\d{4})-(\d{2})/.exec(iso || "");
    if (!m) return "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[parseInt(m[2], 10) - 1] + " '" + m[1].slice(2);
  }

  function visiblePosts() {
    var list = posts.slice();
    if (state.filter !== "All") {
      list = list.filter(function (p) {
        return (p.tags || []).indexOf(state.filter) !== -1;
      });
    }
    if (state.query) {
      var q = state.query.toLowerCase();
      list = list.filter(function (p) {
        var hay = [p.title, p.description, p.dateLabel, (p.tags || []).join(" ")].join(" ").toLowerCase();
        return hay.indexOf(q) !== -1;
      });
    }
    if (state.sort === "oldest") list.sort(function (a, b) { return a.date.localeCompare(b.date); });
    else if (state.sort === "az") list.sort(function (a, b) { return a.title.localeCompare(b.title); });
    else list.sort(function (a, b) { return b.date.localeCompare(a.date); }); // newest first
    return list;
  }

  function angleFor(i, n) {
    return (i / n) * Math.PI * 2 - Math.PI / 2;
  }

  function nodeXY(i, n, r) {
    var a = angleFor(i, n);
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  }

  function renderFilters() {
    var tags = {};
    posts.forEach(function (p) {
      (p.tags || []).forEach(function (t) { tags[t] = true; });
    });
    var list = ["All"].concat(Object.keys(tags).sort());
    filtersEl.innerHTML = list
      .map(function (t) {
        return '<button class="archive-filter' + (t === state.filter ? " is-active" : "") + '" type="button" data-tag="' + esc(t) + '">' + esc(t) + "</button>";
      })
      .join("");
  }

  function renderTimeline() {
    var list = visiblePosts();
    var n = list.length;
    if (!n) {
      nodesGroup.innerHTML = "";
      labelsGroup.innerHTML = "";
      arc.setAttribute("stroke-dasharray", "0 0");
      tooltip.classList.remove("is-visible");
      return;
    }
    var sel = Math.min(state.selected, n - 1);

    var C = 2 * Math.PI * R_ARC;
    var frac = (sel + 1) / n;
    arc.setAttribute("transform", "rotate(-90 " + CX + " " + CY + ")");
    arc.setAttribute("stroke-dasharray", frac * C + " " + C);

    var showLabels = n <= 12;
    var nodesHtml = "";
    var labelsHtml = "";
    for (var i = 0; i < n; i++) {
      var p = list[i];
      var xy = nodeXY(i, n, R_NODE);
      var active = i === sel;
      if (active) {
        nodesHtml += '<circle class="archive-halo" cx="' + xy.x.toFixed(1) + '" cy="' + xy.y.toFixed(1) + '" r="13"></circle>';
      }
      nodesHtml +=
        '<circle class="archive-node' + (active ? " is-active" : "") + '" cx="' + xy.x.toFixed(1) + '" cy="' + xy.y.toFixed(1) + '" r="7" data-index="' + i + '" aria-label="' + esc(p.dateLabel) + ' — ' + esc(p.title) + '"></circle>';
      if (showLabels) {
        var lxy = nodeXY(i, n, R_LABEL);
        labelsHtml += '<text class="archive-label" x="' + lxy.x.toFixed(1) + '" y="' + (lxy.y + 3.5).toFixed(1) + '">' + esc(shortDate(p.date)) + "</text>";
      }
    }
    nodesGroup.innerHTML = nodesHtml;
    labelsGroup.innerHTML = labelsHtml;

    var axy = nodeXY(sel, n, R_NODE);
    tooltip.textContent = list[sel].dateLabel;
    tooltip.style.left = (axy.x / 560) * 100 + "%";
    tooltip.style.top = (axy.y / 560) * 100 + "%";
    tooltip.classList.add("is-visible");
  }

  function renderPreview(post, animate) {
    if (!post) {
      previewEl.innerHTML = "";
      return;
    }
    if (animate) previewEl.classList.add("is-switching");

    var tags = (post.tags || [])
      .map(function (t) { return '<span class="archive-preview-tag">' + esc(t) + "</span>"; })
      .join("");
    var media = post.image
      ? '<img src="' + esc(asset(post.image)) + '" alt="" loading="lazy" />'
      : '<div class="archive-preview-media-fallback">' + esc(post.title) + "</div>";

    previewEl.innerHTML =
      '<div class="archive-preview-text">' +
        '<span class="archive-preview-date">' + esc(post.dateLabel) + "</span>" +
        '<h3 class="archive-preview-title"><a href="' + esc(url("/p/" + post.slug + "/")) + '">' + esc(post.title) + "</a></h3>" +
        '<div class="archive-preview-tags">' + tags + "</div>" +
        '<p class="archive-preview-desc">' + esc(post.description) + "</p>" +
        '<div class="archive-preview-actions">' +
          '<a class="archive-preview-read" href="' + esc(url("/p/" + post.slug + "/")) + '">Read post' + arrowSvg() + "</a>" +
          '<button class="archive-preview-bookmark" type="button" aria-label="Bookmark post">' + bookmarkSvg() + "</button>" +
        "</div>" +
      "</div>" +
      '<div class="archive-preview-media">' + media + "</div>";

    if (animate) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { previewEl.classList.remove("is-switching"); });
      });
    }
  }

  function arrowSvg() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  }

  function bookmarkSvg() {
    return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z"/></svg>';
  }

  function renderGrid() {
    var list = visiblePosts();
    countEl.textContent = list.length + (list.length === 1 ? " post" : " posts");
    emptyEl.hidden = list.length !== 0;
    var sel = Math.min(state.selected, Math.max(0, list.length - 1));
    gridEl.innerHTML = list
      .map(function (p, i) {
        var tags = (p.tags || [])
          .map(function (t) { return '<span class="archive-card-tag">' + esc(t) + "</span>"; })
          .join("");
        return (
          '<article class="archive-card' + (i === sel ? " is-selected" : "") + '" tabindex="0" role="button" data-index="' + i + '" aria-label="' + esc(p.title) + '">' +
            '<span class="archive-card-date">' + esc(p.dateLabel) + "</span>" +
            '<h3 class="archive-card-title">' + esc(p.title) + "</h3>" +
            '<div class="archive-card-tags">' + tags + "</div>" +
            '<span class="archive-card-arrow">' + arrowSvg() + "</span>" +
          "</article>"
        );
      })
      .join("");
  }

  function select(i, animate) {
    var list = visiblePosts();
    if (!list.length) {
      renderPreview(null);
      return;
    }
    i = Math.max(0, Math.min(i, list.length - 1));
    state.selected = i;
    renderTimeline();
    renderPreview(list[i], animate);
    renderGrid();
  }

  function apply() {
    var list = visiblePosts();
    state.selected = Math.min(state.selected, Math.max(0, list.length - 1));
    renderTimeline();
    renderPreview(list[state.selected] || null, false);
    renderGrid();
  }

  // --- events ------------------------------------------------------------
  function onFilterClick(e) {
    var btn = e.target.closest(".archive-filter");
    if (!btn) return;
    state.filter = btn.getAttribute("data-tag");
    state.selected = 0;
    renderFilters();
    apply();
  }

  function onSearch() {
    state.query = searchInput.value.trim();
    state.selected = 0;
    apply();
  }

  function onSort() {
    state.sort = sortEl.value;
    state.selected = 0;
    apply();
  }

  function onTimelineHover(e) {
    var node = e.target.closest(".archive-node");
    if (!node) return;
    var list = visiblePosts();
    var post = list[parseInt(node.getAttribute("data-index"), 10)];
    if (post) renderPreview(post, false);
  }

  function onTimelineClick(e) {
    var node = e.target.closest(".archive-node");
    if (!node) return;
    select(parseInt(node.getAttribute("data-index"), 10), true);
  }

  function onTimelineWheel(e) {
    e.preventDefault();
    var dir = e.deltaY > 0 ? 1 : -1;
    select(state.selected + dir, true);
  }

  function onTimelineKey(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(state.selected + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(state.selected - 1, true);
    }
  }

  var dragging = false;

  function nearestIndex(clientX, clientY) {
    var list = visiblePosts();
    var n = list.length;
    if (!n) return 0;
    var rect = svg.getBoundingClientRect();
    var scale = 560 / rect.width;
    var x = (clientX - rect.left) * scale;
    var y = (clientY - rect.top) * scale;
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < n; i++) {
      var xy = nodeXY(i, n, R_NODE);
      var d = (x - xy.x) * (x - xy.x) + (y - xy.y) * (y - xy.y);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  }

  function onPointerDown(e) {
    dragging = true;
    select(nearestIndex(e.clientX, e.clientY), true);
    if (svg.setPointerCapture) svg.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    select(nearestIndex(e.clientX, e.clientY), false);
  }

  function onPointerUp() {
    dragging = false;
  }

  function onGridClick(e) {
    var card = e.target.closest(".archive-card");
    if (!card) return;
    select(parseInt(card.getAttribute("data-index"), 10), true);
  }

  function onGridKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      var card = e.target.closest(".archive-card");
      if (!card) return;
      e.preventDefault();
      select(parseInt(card.getAttribute("data-index"), 10), true);
    }
  }

  function onDocKey(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      searchInput.focus();
    }
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  function init() {
    if (!posts.length) {
      emptyEl.hidden = false;
      countEl.textContent = "0 posts";
      gridEl.innerHTML = "";
      renderPreview(null);
      return;
    }

    var mac = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
    kbdEl.innerHTML = mac ? "&#8984;&nbsp;K" : "Ctrl&nbsp;K";

    renderFilters();
    renderTimeline();
    renderPreview(visiblePosts()[0] || null, false);
    renderGrid();

    filtersEl.addEventListener("click", onFilterClick);
    searchInput.addEventListener("input", debounce(onSearch, 160));
    sortEl.addEventListener("change", onSort);
    svg.addEventListener("click", onTimelineClick);
    svg.addEventListener("mouseover", onTimelineHover);
    svg.addEventListener("wheel", onTimelineWheel, { passive: false });
    svg.addEventListener("keydown", onTimelineKey);
    svg.addEventListener("pointerdown", onPointerDown);
    svg.addEventListener("pointermove", onPointerMove);
    svg.addEventListener("pointerup", onPointerUp);
    svg.addEventListener("pointercancel", onPointerUp);
    gridEl.addEventListener("click", onGridClick);
    gridEl.addEventListener("keydown", onGridKey);
    document.addEventListener("keydown", onDocKey);
  }

  init();
})();
