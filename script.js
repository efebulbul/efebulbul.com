// Tema yönetimi
(function () {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle");

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
        root.setAttribute("data-theme", storedTheme);
    } else {
        // Sistem temasına göre varsayılan
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        root.setAttribute("data-theme", prefersLight ? "light" : "dark");
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const current = root.getAttribute("data-theme") || "dark";
            const next = current === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        });
    }
})();

// Mobil menü
(function () {
    const toggle = document.getElementById("mobile-menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    if (!toggle || !mobileNav) return;

    toggle.addEventListener("click", () => {
        const isOpen = mobileNav.style.display === "flex";
        mobileNav.style.display = isOpen ? "none" : "flex";
    });

    mobileNav.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.style.display = "none";
        });
    });
})();

// Aktif menü linki (sayfaya göre)
(function () {
    const links = document.querySelectorAll('.nav-link');
    if (!links.length) return;

    const path = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // index.html veya ana sayfa
        if ((path === '' || path === 'index.html') && href.includes('#hero')) {
            link.classList.add('active');
        }

        // tasklyx.html
        if (path === 'tasklyx.html' && href === 'tasklyx.html') {
            link.classList.add('active');
        }

        // tracklyx.html
        if (path === 'stride.html' && href === 'stride.html') {
            link.classList.add('active');
        }
    });
})();

// Scroll reveal
(function () {
    const reveals = document.querySelectorAll(".reveal");
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

// Proje filtreleme
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

// İletişim formu (Formspree)
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

// Yıl
(function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
})();

// Phone demo (Mini App Simulator)
(function () {
    const demos = document.querySelectorAll('[data-phone-demo]');
    if (!demos.length) return;

    demos.forEach(demo => {
        const dataEl = demo.querySelector('[data-demo-data]');
        const img = demo.querySelector('[data-demo-img]');
        const captionEl = demo.querySelector('[data-demo-caption]');
        const prevBtn = demo.querySelector('[data-demo-prev]');
        const nextBtn = demo.querySelector('[data-demo-next]');
        const dots = demo.querySelectorAll('[data-demo-dot]');
        const screen = demo.querySelector('.phone-screen');

        if (!dataEl || !img || !screen) return;

        let items = [];
        try {
            const parsed = JSON.parse(dataEl.textContent || '{}');
            items = parsed.items || [];
        } catch (e) {
            console.error('Phone demo JSON parse error', e);
            return;
        }

        if (!items.length) return;

        let index = 0;

        function setMissing(state) {
            screen.classList.toggle('is-missing', state);
        }

        function setActive(i) {
            index = (i + items.length) % items.length;
            const item = items[index];

            setMissing(false);

            img.onerror = () => setMissing(true);
            img.src = item.src;

            if (captionEl) {
                captionEl.textContent = item.caption || '';
            }

            dots.forEach(d => {
                const di = Number(d.getAttribute('data-demo-dot'));
                d.classList.toggle('is-active', di === index);
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => setActive(index - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => setActive(index + 1));

        dots.forEach(d => {
            d.addEventListener('click', () => {
                setActive(Number(d.getAttribute('data-demo-dot')));
            });
        });

        // init
        setActive(0);
    });
})();
