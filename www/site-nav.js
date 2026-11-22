/*
 * Header and footer links that depend on data: Community (community.js) and Pro (pro.js).
 * "The idea" is only shown while neither exists; it gives way to Community and/or Pro.
 * Loaded on every page after community.js and pro.js.
 */
(() => {
  "use strict";
  const pro = window.PRO && window.PRO.live ? window.PRO : null;
  const community = (window.COMMUNITY || []).filter(
    (p) => p && p.slug && p.name && p.author && p.author.name && p.author.github,
  );
  const show = (selector, on = true) =>
    document.querySelectorAll(selector).forEach((el) => (el.hidden = !on));

  if (community.length) {
    show('[data-nav="community"]');
    document
      .querySelectorAll("[data-community-count]")
      .forEach((el) => (el.textContent = String(community.length).padStart(2, "0")));
  }
  if (pro) {
    show('[data-nav="pro"]');
    show('[data-footer="pro"]');
    document.querySelectorAll('[data-nav="pro"], [data-footer="pro"]').forEach((a) => (a.href = pro.url));
  }
  show('[data-nav="idea"]', !community.length && !pro);
})();
