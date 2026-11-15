/**
 * Central site configuration.
 * Edit this file to change the blog's identity, navigation and behaviour.
 */
module.exports = {
  // --- Identity ---------------------------------------------------------
  name: "AI Security Blog",
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
  // the demo handler just shows a thank-you message).
  subscribeEndpoint: "",

  postsPerPage: 9,

  footer: {
    text: "Practical insights at the intersection of AI and security.",
  },
};
