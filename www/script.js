(() => {
  "use strict";
  const projects = window.PROJECTS || [];
  const root = document.documentElement;
  const repo =
    "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/";
  const ext = 'target="_blank" rel="noopener"';
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const pad = (n) => String(n).padStart(2, "0");
  const grid = document.querySelector("#projects");
  // The home page shows a selection (FEATURED in projects.js); /collection shows everything.
  const featured = grid.hasAttribute("data-featured")
    ? (window.FEATURED || []).map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean)
    : null;
  const shown = featured && featured.length ? featured : projects;
  // An old link to a card that now lives on /collection (lp.lndev.me/#kudo) still lands on it.
  const wanted = decodeURIComponent(location.hash.slice(1));
  if (featured && wanted && projects.some((p) => p.slug === wanted) && !shown.some((p) => p.slug === wanted)) {
    location.replace("/collection#" + encodeURIComponent(wanted));
    return;
  }
  const cards = shown.map((p) => {
    const i = projects.indexOf(p);
    const source = p.source || repo + p.slug;
    const destination = p.url || `https://${p.slug}-lndev.vercel.app`;
    return `<article class="project reveal" id="${esc(p.slug)}" data-group="${esc(p.group)}">
      <a class="project__media" href="${esc(destination)}" ${ext} aria-label="Visit ${esc(p.name)}"><img src="${esc(p.image)}" alt="${esc(p.name)} homepage — ${esc(p.direction)}" width="1600" height="900" loading="lazy" decoding="async"><span class="media__cta">Visit site <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a>
      <div class="project__body"><div class="project__top"><h3><span class="project__num">${pad(i + 1)}</span>${esc(p.name)}</h3><span class="project__category">${esc(p.category)}</span></div><p class="project__desc">${esc(p.short)}</p></div>
      <div class="project__links"><a href="${esc(destination)}" ${ext}>Live preview <span aria-hidden="true"><svg class="icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a><a href="${esc(source)}" ${ext} aria-label="${esc(p.name)} source code">Source code <span aria-hidden="true"><svg class="icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div>
      <details><summary>Behind the design</summary><div class="project__details"><p>${esc(p.description)}</p><dl><div><dt>Type</dt><dd>${esc(p.type)}</dd></div><div><dt>Stack</dt><dd>${esc(p.stack.join(" · "))}</dd></div><div><dt>Palette</dt><dd class="swatches" aria-label="Color palette">${p.colors.map((c) => `<i style="--c:${esc(c)}" title="${esc(c)}"></i>`).join("")}</dd></div></dl></div></details></article>`;
  });
  grid.innerHTML = cards.join("");
  document
    .querySelectorAll("[data-project-count]")
    .forEach((el) => (el.textContent = String(projects.length)));
  document
    .querySelectorAll("[data-project-rest]")
    .forEach((el) => (el.textContent = String(projects.length - shown.length)));
  if (!featured && wanted && shown.some((p) => p.slug === wanted))
    requestAnimationFrame(() => document.getElementById(wanted)?.scrollIntoView());
  // Shadcn Pages Pro (pro.js): stays hidden until PRO.live is true.
  const pro = window.PRO && window.PRO.live ? window.PRO : null;
  const section = document.querySelector("#pro");
  if (pro && section) {
    section.querySelectorAll("[data-pro-link]").forEach((a) => (a.href = pro.url));
    const price = section.querySelector("[data-pro-price]");
    price.innerHTML = `From <strong>$${esc(pro.price.launch)}</strong>${pro.price.regular > pro.price.launch ? ` <s>$${esc(pro.price.regular)}</s>` : ""} · one payment, lifetime updates`;
    const tile = (t) =>
      `<a class="pro__tile" href="${esc(pro.url)}/templates/${esc(t.slug)}" ${ext}><img src="showcase/pro/${esc(t.slug)}.webp" alt="${esc(t.name)}, ${esc(t.niche)}" width="960" height="600" loading="lazy" decoding="async"><span><strong>${esc(t.name)}</strong>${esc(t.niche)}</span></a>`;
    const half = Math.ceil(pro.showcase.length / 2);
    const rows = [pro.showcase.slice(0, half), pro.showcase.slice(half)];
    section.querySelector(".pro__wall").innerHTML = rows
      .map(
        (row, i) =>
          // The row is drawn twice for a seamless loop; the copy is hidden from assistive tech and the keyboard.
          `<div class="pro__row${i ? " pro__row--reverse" : ""}"><div class="pro__track">${row.map(tile).join("")}<span class="pro__copy-row" aria-hidden="true">${row.map((t) => tile(t).replace("<a ", '<a tabindex="-1" ')).join("")}</span></div></div>`,
      )
      .join("");
    section.hidden = false;
  }
  if (pro) {
    document.querySelectorAll(".project").forEach((card) => {
      const target = pro.fullSites[card.id];
      if (!target) return;
      card
        .querySelector(".project__body")
        .insertAdjacentHTML(
          "beforeend",
          `<a class="project__pro" href="${esc(pro.url)}/templates/${esc(target)}" ${ext}><span>PRO</span>The full site, every page <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></a>`,
        );
    });
  }
  document
    .querySelectorAll("[data-year]")
    .forEach((el) => (el.textContent = new Date().getFullYear()));
  const filterButtons = document.querySelectorAll("[data-filter]");
  function filterProjects(group) {
    filterButtons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.filter === group)),
    );
    let count = 0;
    document.querySelectorAll(".project").forEach((card) => {
      card.hidden = group !== "all" && card.dataset.group !== group;
      if (!card.hidden) {
        count++;
        card.classList.add("is-in");
      }
    });
    const status = document.querySelector("#filter-status");
    if (status) status.textContent = `${count} ${group === "all" ? "" : group + " "}projects`;
  }
  filterButtons.forEach((b) =>
    b.addEventListener("click", () => filterProjects(b.dataset.filter)),
  );
  const viewButton = document.querySelector(".view-toggle");
  viewButton?.addEventListener("click", () => {
    const index = grid.classList.toggle("is-index");
    viewButton.setAttribute("aria-pressed", String(index));
    viewButton.innerHTML = index
      ? '<span aria-hidden="true">⊞</span> Gallery view'
      : '<span aria-hidden="true">☷</span> Index view';
  });
  const themeButton = document.querySelector(".theme-toggle");
  function syncTheme() {
    themeButton.setAttribute(
      "aria-label",
      `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} mode`,
    );
  }
  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch {}
    syncTheme();
  });
  syncTheme();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  const featureStage = document.querySelector(".hero__display");
  if (featureStage) initHome();
  function initHome() {
  const featuredCards = [...featureStage.querySelectorAll(".feature-card")].filter(
    (card, index) => {
      card.hidden = !projects[index];
      return !card.hidden;
    },
  );
  const featurePositions = ["front", "next", "back"];
  let featureIndex = 0;
  let featureTimer;
  let featureSchedule = 0;
  let featureTransition = null;
  let featureVisible = false;
  let featureHovered = false;

  function setFeatureProject(card, project) {
    card.href = `/collection#${project.slug}`;
    card.setAttribute("aria-label", `Explore ${project.name}`);
    const image = card.querySelector("img");
    image.src = project.image;
    image.alt = `${project.name} — ${project.category}`;
    card.querySelector("small").textContent = project.category.toUpperCase();
    card.querySelector("strong").textContent = project.name;
  }

  function positionFeatureCards() {
    featuredCards.forEach((card, index) => {
      card.dataset.featurePosition = featurePositions[index];
      card.inert = index !== 0;
      card.tabIndex = index === 0 ? 0 : -1;
      if (index === 0) card.removeAttribute("aria-hidden");
      else card.setAttribute("aria-hidden", "true");
    });
  }

  // The same three elements carry the entire collection, one project ahead.
  function prepareNextFeature() {
    const project =
      projects[(featureIndex + featuredCards.length) % projects.length];
    const image = new Image();
    if (project) image.src = project.image;
    return {
      project,
      ready: project ? image.decode().catch(() => {}) : Promise.resolve(),
    };
  }

  featuredCards.forEach((card, index) => setFeatureProject(card, projects[index]));
  positionFeatureCards();
  let incomingFeature = prepareNextFeature();

  function finishFeatureTransition() {
    if (!featureTransition) return;
    const { card, project } = featureTransition;
    featureTransition = null;
    setFeatureProject(card, project);
    card.classList.remove("is-departing", "is-returning");
  }

  function canRotateFeature() {
    return !(
      paused ||
      reduced.matches ||
      document.hidden ||
      !featureVisible ||
      featureHovered ||
      featureStage.contains(document.activeElement) ||
      projects.length < 2
    );
  }

  function scheduleFeature() {
    clearTimeout(featureTimer);
    const schedule = ++featureSchedule;
    if (!canRotateFeature()) return;
    featureTimer = setTimeout(async () => {
      await incomingFeature.ready;
      if (schedule !== featureSchedule || !canRotateFeature()) return;
      finishFeatureTransition();
      const card = featuredCards.shift();
      featuredCards.push(card);
      featureIndex = (featureIndex + 1) % projects.length;
      featureTransition = { card, project: incomingFeature.project };
      card.classList.add("is-departing");
      positionFeatureCards();
      incomingFeature = prepareNextFeature();
      scheduleFeature();
    }, 5000);
  }

  featureStage.addEventListener("animationend", (event) => {
    if (event.target !== featureTransition?.card) return;
    if (event.animationName === "feature-depart") {
      // Swap only after the outgoing card is transparent, before it returns.
      setFeatureProject(featureTransition.card, featureTransition.project);
      event.target.classList.remove("is-departing");
      event.target.classList.add("is-returning");
    } else if (event.animationName === "feature-return") {
      finishFeatureTransition();
    }
  });
  featureStage.addEventListener("animationcancel", (event) => {
    if (event.target !== featureTransition?.card) return;
    const current =
      event.animationName === "feature-depart" ? "is-departing" : "is-returning";
    if (event.target.classList.contains(current)) finishFeatureTransition();
  });
  featureStage.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    featureHovered = true;
    scheduleFeature();
  });
  featureStage.addEventListener("pointerleave", () => {
    featureHovered = false;
    scheduleFeature();
  });
  featureStage.addEventListener("focusin", scheduleFeature);
  featureStage.addEventListener("focusout", () => {
    queueMicrotask(scheduleFeature);
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        featureVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        scheduleFeature();
      },
      { threshold: 0.2 },
    ).observe(featureStage);
  } else {
    featureVisible = true;
  }
  addEventListener("pagehide", () => {
    clearTimeout(featureTimer);
    featureSchedule++;
    finishFeatureTransition();
  });
  addEventListener("pageshow", scheduleFeature);
  addEventListener("hashchange", scheduleFeature);
  const motionButton = document.querySelector(".motion-toggle");
  function syncMotion() {
    const still = paused || reduced.matches;
    root.dataset.motion = still ? "still" : "full";
    if (still) finishFeatureTransition();
    motionButton.setAttribute("aria-pressed", String(still));
    motionButton.setAttribute(
      "aria-label",
      reduced.matches
        ? "Reduced motion is enabled in your system"
        : still
          ? "Resume animations"
          : "Pause animations",
    );
    motionButton.title = reduced.matches
      ? "System reduced motion is enabled"
      : still
        ? "Resume animations"
        : "Pause animations";
    motionButton.textContent = still ? "▷" : "Ⅱ";
    motionButton.disabled = reduced.matches;
    scheduleFeature();
  }
  motionButton.addEventListener("click", () => {
    paused = !paused;
    syncMotion();
  });
  reduced.addEventListener("change", syncMotion);
  syncMotion();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) finishFeatureTransition();
    scheduleFeature();
    document.querySelector(".ticker__track").style.animationPlayState =
      document.hidden ? "paused" : "";
  });
  }
  const nav = document.querySelector(".nav");
  let queued = false;
  addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          nav.classList.toggle("is-scrolled", scrollY > 8);
          queued = false;
        });
      }
    },
    { passive: true },
  );
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
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
  const copy = document.querySelector(".copy-button");
  let copyTimer;
  copy?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(
        "git clone https://github.com/ln-dev7/landing-pages.git\ncd landing-pages\ncd landing-pages/fallow\npnpm install\npnpm dev",
      );
      copy.innerHTML = `Copied <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m4 12 5 5L20 6"/></svg>`;
      document.querySelector("#copy-status").textContent = "Commands copied";
    } catch {
      document.querySelector("#copy-status").textContent =
        "Select the commands to copy them.";
    }
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copy.innerHTML = `Copy <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>`;
      document.querySelector("#copy-status").textContent = "";
    }, 3000);
  });
})();
