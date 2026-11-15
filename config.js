/**
 * Central site configuration.
 * Edit this file to change the blog's identity, navigation and behaviour.
 */
module.exports = {
  // --- Identity ---------------------------------------------------------
  name: "AI Cyber Samurai",
  tagline:
    "Practical insights, real-world use cases, and tools at the intersection of AI and security.",
  description:
    "A modern blog about applying AI to security engineering — prompts, tooling, automation, and hands-on walkthroughs.",

  // Canonical base URL (no trailing slash).
  url: "http://localhost:3000",

  author: {
    name: "Your Name",
    email: "you@example.com",
    twitter: "", // optional handle (without @); leave "" to hide
  },

  // Optional logo image, relative to /public (e.g. "/images/logo.svg").
  // Leave "" to render the site name as a text logo.
  logo: "",

  // Base path when hosted under a subpath, e.g. a GitHub Pages project site
  // (https://<user>.github.io/aisecblog/). Leave "" for local dev / root
  // hosting. The deploy workflow overrides this via the BASE_PATH env var.
  basePath: "",

  // --- Navigation -------------------------------------------------------
  nav: [
    { label: "Home", href: "/" },
    { label: "Archive", href: "/archive" },
    { label: "Tags", href: "/tags" },
  ],

  // --- Features ---------------------------------------------------------
  // Show a subscribe call-to-action (placeholder form — wire it up below).
  subscribe: true,
  // Where the subscribe form should POST to ("" disables the form action;
  // leave "" to use the Firebase integration below instead).
  subscribeEndpoint: "",

  // --- Firebase (email collection) ---------------------------------------
  // To save subscribe-form emails to Firestore, set `enabled: true` and fill
  // in `apiKey` and `appId` from:
  //   Firebase console → ⚙️ Project settings → Your apps → Web app → Config
  // The apiKey is a public identifier, not a secret (Firestore security rules
  // do the real authorization), so it is safe to commit to the repo.
  firebase: {
    enabled: true,
    apiKey: "AIzaSyBrl4_C8jcHiPwLfl1sXG2R-KYp8lM-GbU",
    authDomain: "aiblog-4f459.firebaseapp.com",
    projectId: "aiblog-4f459",
    storageBucket: "aiblog-4f459.firebasestorage.app",
    messagingSenderId: "453445326248",
    appId: "1:453445326248:web:e5fbf8e94eb287e7b9b99d",
    measurementId: "G-KP5XBTL4CG",
  },

  postsPerPage: 9,

  footer: {
    text: "Practical insights at the intersection of AI and security.",
  },
};
