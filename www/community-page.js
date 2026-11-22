(() => {
  "use strict";
  const root = document.documentElement;
  const repo = "https://github.com/ln-dev7/landing-pages/tree/master/community/";
  const ext = 'target="_blank" rel="noopener"';
  const arrow =
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
  const pad = (n) => String(n).padStart(2, "0");
  const initials = (name) =>
    String(name || "?")
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  // Keep only usable entries, newest first, so a half-filled entry never breaks the page.
  const entries = (window.COMMUNITY || [])
    .filter((p) => p && p.slug && p.name && p.author && p.author.name && p.author.github)
    .sort((a, b) => String(b.added || "").localeCompare(String(a.added || "")));

  const list = document.querySelector("#community-projects");
  const empty = document.querySelector("#community-empty");
  // Header links (Community, Pro, The idea) are handled by site-nav.js.

  if (!entries.length) {
    list.hidden = true;
    empty.hidden = false;
  } else {
    empty.hidden = true;
    list.innerHTML = entries
      .map((p, i) => {
        const destination = p.url || `https://${p.slug}-community.vercel.app`;
        const source = p.source || repo + p.slug;
        const profile = `https://github.com/${encodeURIComponent(p.author.github)}`;
        const media = p.image
          ? `<img src="${esc(p.image)}" alt="${esc(p.name)} homepage" width="1600" height="900" loading="lazy" decoding="async">`
          : `<span class="project__placeholder" aria-hidden="true">${esc(initials(p.name))}</span>`;
        const details =
          p.description || p.type || (p.stack && p.stack.length) || (p.colors && p.colors.length)
            ? `<details><summary>Behind the design</summary><div class="project__details">${p.description ? `<p>${esc(p.description)}</p>` : ""}<dl>${p.type ? `<div><dt>Type</dt><dd>${esc(p.type)}</dd></div>` : ""}${p.stack && p.stack.length ? `<div><dt>Stack</dt><dd>${esc(p.stack.join(" · "))}</dd></div>` : ""}${p.colors && p.colors.length ? `<div><dt>Palette</dt><dd class="swatches" aria-label="Color palette">${p.colors.map((c) => `<i style="--c:${esc(c)}" title="${esc(c)}"></i>`).join("")}</dd></div>` : ""}</dl></div></details>`
            : "";
        return `<article class="project reveal" id="${esc(p.slug)}">
      <a class="project__media" href="${esc(destination)}" ${ext} aria-label="Visit ${esc(p.name)}">${media}<span class="media__cta">Visit site ${arrow}</span></a>
      <div class="project__body"><div class="project__top"><h3><span class="project__num">${pad(i + 1)}</span>${esc(p.name)}</h3>${p.category ? `<span class="project__category">${esc(p.category)}</span>` : ""}</div>${p.short ? `<p class="project__desc">${esc(p.short)}</p>` : ""}
      <a class="project__author" href="${profile}" ${ext}><img src="${profile}.png?size=64" alt="" width="20" height="20" loading="lazy" decoding="async"><span>by <strong>${esc(p.author.name)}</strong> <span class="project__handle">@${esc(p.author.github)}</span></span></a></div>
      <div class="project__links"><a href="${esc(destination)}" ${ext}>Live preview <span aria-hidden="true">${arrow}</span></a><a href="${esc(source)}" ${ext} aria-label="${esc(p.name)} source code">Source code <span aria-hidden="true">${arrow}</span></a></div>
      ${details}</article>`;
      })
      .join("");
    // A broken avatar falls back to the author's initials.
    list.querySelectorAll(".project__author img").forEach((img) =>
      img.addEventListener("error", () => img.replaceWith(Object.assign(document.createElement("span"), { className: "project__avatar", textContent: initials(img.closest(".project__author").querySelector("strong").textContent) }))),
    );
  }

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  const themeButton = document.querySelector(".theme-toggle");
  const syncTheme = () =>
    themeButton.setAttribute("aria-label", `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} mode`);
  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch {}
    syncTheme();
  });
  syncTheme();

  const nav = document.querySelector(".nav");
  let queued = false;
  addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        nav.classList.toggle("is-scrolled", scrollY > 8);
        queued = false;
      });
    },
    { passive: true },
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (items) =>
        items.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.04 },
    );
    root.classList.add("motion-ready");
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }
})();
