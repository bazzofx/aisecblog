/* Lightweight client-side behaviour: mobile nav + placeholder subscribe. */
(function () {
  "use strict";

  // Mobile navigation toggle.
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.classList.toggle("is-open", !open);
    });

    // Close the panel when a link inside it is chosen.
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        panel.classList.remove("is-open");
      }
    });
  }

  // Subscribe form: if no endpoint is configured, show a friendly note.
  var form = document.querySelector("[data-subscribe-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      var endpoint = form.getAttribute("data-subscribe-endpoint");
      if (!endpoint) {
        event.preventDefault();
        var note =
          form.querySelector("[data-subscribe-note]") ||
          (form.parentElement &&
            form.parentElement.querySelector("[data-subscribe-note]"));
        if (note) {
          note.textContent =
            "Thanks! This is a placeholder form — connect a provider in config.js to collect real subscribers.";
          note.style.color = "#047857";
        }
        form.reset();
      }
    });
  }
})();
