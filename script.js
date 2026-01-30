// =============================
// Theme management (dark/light)
// =============================
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.setAttribute("data-theme", storedTheme);
  } else {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    root.setAttribute("data-theme", prefersLight ? "light" : "dark");
  }

  // Dev warning: if main stylesheet failed to load, page may look plain/white
  try {
    const hasCss = Array.from(document.styleSheets || []).some(s => (s.href || '').includes('style.css'));
    if (!hasCss) {
      console.warn('[efebulbul] style.css not detected. Check <link rel="stylesheet"> path for this page.');
    }
  } catch (_) {}

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// =============================
// Mobile menu
// =============================
(function () {
  const toggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (!toggle || !mobileNav) return;

  function setOpen(open) {
    mobileNav.style.display = open ? "flex" : "none";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  // init
  setOpen(false);

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.style.display === "flex";
    setOpen(!isOpen);
  });

  mobileNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
})();

// =============================
// Active nav link (page-aware)
// =============================
(function () {
  const links = document.querySelectorAll(".nav-link");
  if (!links.length) return;

  const path = window.location.pathname.split("/").filter(Boolean).pop() || "";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // index.html or root
    if ((path === "" || path === "index.html") && href.includes("#hero")) {
      link.classList.add("active");
    }

    // legacy standalone pages (kept for compatibility)
    if (path === "taskly.html" && href === "taskly.html") link.classList.add("active");
    if (path === "stride.html" && href === "stride.html") link.classList.add("active");
  });
})();

// =============================
// Active nav link (on scroll)
// Highlights the current section while scrolling (includes #news)
// =============================
(function () {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  if (!navLinks.length) return;

  // Only handle same-page hash links (e.g. #hero, #about, #news)
  const hashLinks = navLinks
    .map((a) => ({
      el: a,
      href: a.getAttribute('href') || ''
    }))
    .filter((x) => x.href.startsWith('#'));

  if (!hashLinks.length) return;

  const sections = hashLinks
    .map((x) => document.querySelector(x.href))
    .filter(Boolean);

  if (!sections.length) return;

  function setActiveById(id) {
    navLinks.forEach((a) => a.classList.remove('active'));
    const match = hashLinks.find((x) => x.href === `#${id}`);
    if (match) match.el.classList.add('active');
  }

  // If user landed with a hash, activate it
  if (window.location.hash) {
    const id = window.location.hash.replace('#', '');
    if (id) setActiveById(id);
  }

  if (!('IntersectionObserver' in window)) return;

  // Observe sections; when a section is near the top, mark it active
  const observer = new IntersectionObserver(
    (entries) => {
      // Prefer the most visible intersecting section
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

      if (!visible.length) return;
      const id = visible[0].target.id;
      if (id) setActiveById(id);
    },
    {
      // Top offset accounts for sticky header
      rootMargin: '-25% 0px -65% 0px',
      threshold: [0.05, 0.15, 0.3, 0.6],
    }
  );

  sections.forEach((s) => observer.observe(s));
})();

// =============================
// Scroll reveal
// =============================
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
})();

// =============================
// Project filtering
// =============================
(function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;
        card.style.display = shouldShow ? "block" : "none";
      });
    });
  });
})();

// =============================
// Contact form (Formspree)
// =============================
(function () {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (!form || !statusEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "Gönderiliyor...";

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xvgjyodd", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusEl.textContent = "Mesajın başarıyla gönderildi! 📩";
        form.reset();
      } else {
        statusEl.textContent = "Gönderimde bir sorun oluştu. Lütfen tekrar dene.";
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Bağlantı hatası. Lütfen tekrar dene.";
    }
  });
})();

// =============================
// Footer year
// =============================
(function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();

// =============================
// Phone demo (Mini App Simulator)
// =============================
(function () {
  const demos = document.querySelectorAll("[data-phone-demo]");
  if (!demos.length) return;

  demos.forEach((demo) => {
    const dataEl = demo.querySelector("[data-demo-data]");
    const img = demo.querySelector("[data-demo-img]");
    const captionEl = demo.querySelector("[data-demo-caption]");
    const prevBtn = demo.querySelector("[data-demo-prev]");
    const nextBtn = demo.querySelector("[data-demo-next]");
    const dots = demo.querySelectorAll("[data-demo-dot]");
    const screen = demo.querySelector(".phone-screen");

    if (!dataEl || !img || !screen) return;

    let items = [];
    try {
      const parsed = JSON.parse(dataEl.textContent || "{}");
      items = parsed.items || [];
    } catch (e) {
      console.error("Phone demo JSON parse error", e);
      return;
    }

    if (!items.length) return;

    let index = 0;

    function setMissing(state) {
      screen.classList.toggle("is-missing", state);
    }

    function setActive(i) {
      index = (i + items.length) % items.length;
      const item = items[index];

      setMissing(false);

      img.onerror = () => setMissing(true);
      img.src = item.src;

      if (captionEl) captionEl.textContent = item.caption || "";

      dots.forEach((d) => {
        const di = Number(d.getAttribute("data-demo-dot"));
        d.classList.toggle("is-active", di === index);
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => setActive(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => setActive(index + 1));

    dots.forEach((d) => {
      d.addEventListener("click", () => {
        setActive(Number(d.getAttribute("data-demo-dot")));
      });
    });

    setActive(0);
  });
})();
