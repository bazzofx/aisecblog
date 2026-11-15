/* Client-side behaviour: mobile nav + subscribe form. */
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

  // Subscribe form: write to Firestore when configured, else fall back.
  var form = document.querySelector("[data-subscribe-form]");
  if (form) {
    var note =
      form.querySelector("[data-subscribe-note]") ||
      (form.parentElement && form.parentElement.querySelector("[data-subscribe-note]"));
    var emailInput = form.querySelector("input[type='email']");

    function setNote(msg, color) {
      if (!note) return;
      note.textContent = msg;
      note.style.color = color || "";
    }

    form.addEventListener("submit", function (event) {
      // If an external endpoint is configured, submit natively.
      var action = form.getAttribute("action");
      if (action && action !== "#") return;

      event.preventDefault();
      var email = emailInput ? emailInput.value.trim() : "";
      if (!email) return;

      var cfg = window.__FIREBASE_CONFIG__;

      if (!cfg) {
        setNote("Email capture isn't configured yet.", "#b45309");
        return;
      }

      if (!window.firebase || !window.firebase.firestore) {
        console.warn(
          "Subscribe: Firebase SDK not loaded. The gstatic.com scripts may be blocked by an ad blocker or the browser is offline.",
        );
        setNote("Couldn't load the email service \u2014 try disabling your ad blocker.", "#b45309");
        return;
      }

      setNote("Saving\u2026", "#6b7280");
      try {
        if (!window.firebase.apps.length) window.firebase.initializeApp(cfg);
        var db = window.firebase.firestore();
        db.collection("subscribers")
          .add({
            email: email,
            createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(function () {
            setNote("Thanks! You're subscribed.", "#047857");
            form.reset();
          })
          .catch(function (err) {
            console.error("Subscribe failed:", err && err.code, err && err.message, err);
            setNote("Something went wrong \u2014 please try again.", "#b91c1c");
          });
      } catch (err) {
        console.error("Subscribe failed (sync):", err);
        setNote("Something went wrong \u2014 please try again.", "#b91c1c");
      }
    });
  }
})();
