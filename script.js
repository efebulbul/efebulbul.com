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

// Dil (TR / EN / DE)
(function () {
  const STORAGE_KEY = "lang";
  const supported = ["tr", "en", "de"];

  // Minimal dictionary (we can expand later)
  const translations = {
    tr: {
      // NAV
      "nav.home": "Ana Sayfa",
      "nav.about": "Hakkımda",
      "nav.skills": "Yetenekler",
      "nav.experience": "Deneyim",
      "nav.projects": "Projeler",
      "nav.projects_home": "Projeler (Ana Sayfa)",
      "nav.news": "Haberler",
      "nav.schedule": "Program",
      "nav.contact": "İletişim",

      // NAV (sub)
      "nav.taskly": "Taskly",
      "nav.stride": "Stride",

      // HERO
      "hero.eyebrow": "iOS Developer • MIS Student",
      "hero.h1.pre": "Merhaba, ben",
      "hero.h1.post": ".",
      "hero.h1.line2": "Ürün odaklı, temiz kod seven bir geliştiriciyim.",
      "hero.subtitle": "İstanbul Topkapı Üniversitesi Yönetim Bilişim Sistemleri öğrencisiyim.\n                        iOS geliştirme, yapay zekâ ve yazılım projeleriyle gerçek problemler çözen ürünler\n                        üretmeye odaklanıyorum.",
      "hero.cta.contact": "Benimle İletişime Geç",
      "hero.cta.projects": "Projelerimi Gör",
      "hero.meta.location": "Lokasyon",
      "hero.meta.role": "Rol",
      "hero.meta.focus": "Odak",
      "hero.meta.location_value": "İstanbul, Türkiye",
      "hero.meta.role_value": "iOS Developer & MIS Student",
      "hero.meta.focus_value": "Mobil Uygulamalar · AI · Frontend",

      // PROFILE
      "profile.title": "iOS Developer • MIS Student",
      "profile.summary": "Swift, UIKit ve modern mobil deneyimler üzerine çalışan; performans, tasarım ve\n                            kullanıcı odaklılık konusunda titiz bir geliştiriciyim.",
      "profile.links.email": "Email",
      "profile.links.linkedin": "LinkedIn",
      "profile.links.github": "GitHub",
      "profile.links.cv": "CV",

      // ABOUT
      "about.h2": "Hakkımda",
      "about.p": "Profesyonel olarak kimim, nasıl çalışırım?",
      "about.text1": "Ben Efe, İstanbul Topkapı Üniversitesi’nde Yönetim Bilişim Sistemleri okuyan ve\n                        ağırlıklı olarak <strong>iOS geliştirme</strong> alanında ilerleyen bir yazılımcıyım.",
      "about.text2": "Kullanıcı deneyimini merkeze alan, performans ve okunabilir kodu önemseyen bir\n                            geliştiriciyim. Uygulamalarımda; temiz mimari yaklaşımlar, yeniden kullanılabilir\n                            komponentler ve ölçeklenebilir altyapılar kurmaya odaklanıyorum.",
      "about.text3": "Uzun vadede hedefim; mobil geliştirme, yapay zekâ ve veri odaklı sistemleri birleştirerek\n                            hem Türkiye’de hem de global ölçekte katma değer üreten ürünler geliştirmek.",
      "about.highlights.fields": "Alanlar",
      "about.highlights.fields_desc": "iOS Development, UI/UX, REST API, Firebase, Frontend, Piyasalar & Portföy Takibi",
      "about.highlights.strengths": "Güçlü Yönler",
      "about.highlights.strengths_desc": "Problem çözme, detaycılık, sorumluluk alma, sürekli öğrenme",
      "about.highlights.languages": "Diller",
      "about.highlights.languages_desc": "Türkçe (Ana dil), İngilizce (B2)",

      // SKILLS
      "skills.h2": "Yetenekler",
      "skills.p": "Teknik becerilerim ve güçlü olduğum alanlar.",
      "skills.col.mobile": "Mobil Geliştirme",
      "skills.col.backend": "Backend & Veri",
      "skills.col.web": "Web & Diğer",

      // EXPERIENCE
      "exp.h2": "Deneyim",
      "exp.p": "Profesyonel ve proje bazlı deneyimlerim.",
      "exp.item1.title": "iOS Developer (Staj)",
      "exp.item2.title": "Freelance iOS Geliştirici",

      // EDUCATION
      "edu.h2": "Eğitim",
      "edu.p": "Akademik geçmişim.",
      "edu.topkapi.title": "İstanbul Topkapı Üniversitesi",
      "edu.topkapi.department": "Yönetim Bilişim Sistemleri (YBS)",
      "edu.topkapi.date": "Lisans • 2024 – Devam ediyor • İstanbul",
      "edu.topkapi.desc": "İşletme, bilişim sistemleri, veri ve yazılım geliştirme alanlarını birleştiren disiplinler arası bir eğitim alıyorum. Öğrendiklerimi aktif projelerde kullanarak teoriyi pratikle birleştirmeye odaklanıyorum.",

      "edu.istanbul.title": "İstanbul Üniversitesi",
      "edu.istanbul.department": "Bilgisayar Programcılığı",
      "edu.istanbul.date": "Önlisans • 2023 – • İstanbul",
      "edu.istanbul.desc": "Bilgisayar programcılığı eğitimimde; yazılım temelleri, algoritmik düşünme ve veri odaklı uygulamalar üzerine yoğunlaşıyorum. Öğrendiklerimi projelere dönüştürerek pratik geliştirme deneyimi kazanıyor, modern teknolojilerle çözüm üretme yetkinliğimi artırıyorum.",

      // PROJECTS
      "projects.h2": "Projeler",
      "projects.p": "Gerçek kullanıcıya dokunan, üzerinde çalıştığım uygulamalar.",
      "projects.filter.all": "Tümü",
      "projects.filter.ios": "iOS",
      "projects.filter.web": "Web",
      "projects.filter.other": "Diğer",
      "projects.read": "Oku",
      "projects.taskly.chip": "iOS • App Store",
      "projects.taskly.title": "Taskly – Akıllı Görev Yöneticisi",
      "projects.taskly.desc": "Görevleri kategori, emoji ve hatırlatıcılarla düzenleyen, minimal ve performanslı bir to-do uygulaması. Local notifications, Firebase senkronizasyonu ve çoklu tema desteği içeriyor.",
      "projects.taskly.link.detail": "Detay",
      "projects.taskly.link.appstore": "App Store",
      "projects.taskly.link.github": "GitHub",

      "projects.stride.chip": "iOS • Devam",
      "projects.stride.title": "Stride – Koşu & Aktivite Takibi",
      "projects.stride.desc": "Koşu ve yürüyüşleri gerçek zamanlı izleyen, MapKit ile rota çizen, tempo, mesafe ve kalori takibi sunan bir fitness uygulaması.",
      "projects.stride.link.detail": "Detay",

      "projects.article.chip": "Medium Yazısı",
      "projects.article.title": "Apple Fitness tarzı 3D rozet sistemi (SwiftUI & RealityKit)",
      "projects.article.desc": "Stride içinde USDZ tabanlı 3D başarı rozetlerini nasıl entegre ettiğimi anlattığım yazı.",
      "projects.article.link.read": "Oku",

      "projects.cv.chip": "Web",
      "projects.cv.title": "Kişisel CV & Portfolio Sitesi",
      "projects.cv.desc": "HTML, CSS ve JavaScript ile hazırlanan, profesyonel kimliğimi yansıtan, responsive ve performanslı bir kişisel web sitesi.",
      "projects.cv.link.live": "Canlı Demo",
      "projects.cv.link.github": "GitHub",

      // NEWS
      "news.h2": "Güncel Haberler",
      "news.p": "Paylaştığım içerikler, güncellemeler ve duyurular.",
      "news.card1.meta": "Medium",
      "news.card1.title": "Apple Fitness tarzı 3D rozet sistemi (SwiftUI & RealityKit)",
      "news.card1.desc": "Stride içinde USDZ tabanlı 3D başarı rozetlerini nasıl entegre ettiğimi anlattığım yazı.",

      "news.card2.meta": "App Store",
      "news.card2.title": "TasklyX Yayında Yılbaşı Konsepti",
      "news.card2.desc": "Yapımını üstlendiğim TasklyX için v1.0.3 Yılbaşı Konseptiyle karşınızdayız!",

      "news.card3.meta": "Apple Developer",
      "news.card3.title": "App Store 2025 Ödülü kazananları açıklandı.",
      "news.card3.desc": "Dünyanın dört bir yanından gelen bu geliştiricilerin App Store projeleri.",

      "news.link.aria": "Haberi aç",

      // SCHEDULE
      "schedule.h2": "Program",
      "schedule.day.mon": "Pazartesi",
      "schedule.day.tue": "Salı",
      "schedule.day.wed": "Çarşamba",
      "schedule.day.thu": "Perşembe",
      "schedule.day.fri": "Cuma",

      "schedule.gym": "Gym / Koşu",
      "schedule.study": "Öğrenme",
      "schedule.rest": "Dinlenme",
      "schedule.work": "Staj/İOS",

      // CONTACT
      "contact.h2": "İletişim",
      "contact.p": "Proje, staj veya iş fırsatları için benimle iletişime geçebilirsiniz.",
      "contact.info": "iOS geliştirme, ürün odaklı projeler, girişimcilik ve teknoloji tabanlı iş fikirleri üzerine\n                            konuşmak isterseniz bana e-posta gönderebilir veya LinkedIn üzerinden ulaşabilirsiniz.",
      "contact.label.email": "Email:",
      "contact.label.location": "Lokasyon:",
      "contact.label.linkedin": "LinkedIn:",
      "contact.label.github": "GitHub:",
      "contact.value.location": "İstanbul, Türkiye",

      // FORM
      "form.name": "Ad Soyad",
      "form.email": "E-posta",
      "form.subject": "Konu",
      "form.message": "Mesaj",
      "form.submit": "Mesajı Gönder",
      "form.ph.name": "Adınız ve soyadınız",
      "form.ph.email": "ornek@mail.com",
      "form.ph.subject": "Kısa bir konu yazın",
      "form.ph.message": "Mesajınızı buraya yazın...",
      "form.status.sending": "Gönderiliyor...",
      "form.status.success": "Mesajın başarıyla gönderildi! 📩",
      "form.status.error": "Gönderimde bir sorun oluştu. Lütfen tekrar dene.",
      "form.status.network": "Bağlantı hatası. Lütfen tekrar dene.",

      // HEAD
      "head.title": "Efe Bülbül | iOS Developer & MIS Student",
      "head.desc": "Efe Bülbül - iOS Developer, Management Information Systems student. CV, projeler ve iletişim.",

      // NAV (a11y + dropdown)
      "nav.projects_dropdown_home": "Projeler",
      "nav.aria.projects_menu": "Projeler menüsü",
      "nav.aria.lang": "Dil seçimi",

      // NEWS (a11y)
      "news.aria.list": "Haberler listesi",
      "news.article1.alt": "Apple Fitness tarzı 3D rozet",
      "news.article2.alt": "LinkedIn paylaşımı",
      "news.article3.alt": "Taskly ve Stride güncellemeleri",

      // SCHEDULE (a11y)
      "schedule.aria.board": "Haftalık program",

      // EXPERIENCE (details)
      "exp.tek.title": "iOS Developer (Staj)",
      "exp.tek.company": "Teknasyon – İstanbul",
      "exp.tek.date": "2025 • Staj",
      "exp.tek.item1": "Mevcut iOS uygulamalarında bug fix, feature geliştirme ve performans iyileştirmeleri yaptım.",
      "exp.tek.item2": "UIKit ile component bazlı tasarımlar, reusable view pattern’leri ve temiz kod pratikleri üzerinde çalıştım.",
      "exp.tek.item3": "Takım içinde code review süreçlerine dahil oldum, Git flow ve PR süreçlerine alıştım.",

      "exp.freelance.title": "Freelance iOS Geliştirici",
      "exp.freelance.company": "Bireysel",
      "exp.freelance.date": "2024 – Devam ediyor",
      "exp.freelance.item1": "App Store’da yayınlanan kişisel projeler geliştirdim (Taskly, Stride vb.).",
      "exp.freelance.item2": "Kullanıcı dostu arayüzler, local notifications, premium özellik kurguları ve analitik entegrasyonları üzerinde çalıştım.",
      "exp.freelance.item3": "Performans, hata yönetimi ve kullanıcı geri bildirimlerine göre iteratif geliştirme yaptım.",

      // COMPANY (embed)
      "company.h2": "Şirket",
      "company.p": "Staj yaptığım şirketin web sitesini sayfadan çıkmadan inceleyebilirsin.",
      "company.embed.h3": "Teknasyon",
      "company.embed.p": "Teknasyon’un web sitesini buradan gezebilirsin.",
      "company.embed.iframeTitle": "Teknasyon - Web Sitesi",
      "company.aria.card": "Şirket web sitesi",

      // FOOTER
      "footer.rights": "Tüm hakları saklıdır.",
    },
    en: {
      // NAV
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.projects_home": "Projects (Home)",
      "nav.news": "News",
      "nav.schedule": "Schedule",
      "nav.contact": "Contact",

      // NAV (sub)
      "nav.taskly": "Taskly",
      "nav.stride": "Stride",

      // HERO
      "hero.eyebrow": "iOS Developer • MIS Student",
      "hero.h1.pre": "Hi, I'm",
      "hero.h1.post": ".",
      "hero.h1.line2": "A product-focused developer who loves clean code.",
      "hero.subtitle": "I'm a Management Information Systems student at Istanbul Topkapı University.\n                        I focus on building products that solve real problems through iOS development, AI,\n                        and software projects.",
      "hero.cta.contact": "Get in Touch",
      "hero.cta.projects": "View Projects",
      "hero.meta.location": "Location",
      "hero.meta.role": "Role",
      "hero.meta.focus": "Focus",
      "hero.meta.location_value": "Istanbul, Turkey",
      "hero.meta.role_value": "iOS Developer & MIS Student",
      "hero.meta.focus_value": "Mobile Apps · AI · Frontend",

      // PROFILE
      "profile.title": "iOS Developer • MIS Student",
      "profile.summary": "I work on Swift, UIKit, and modern mobile experiences — with a strong focus on\n                            performance, design, and user-centric details.",
      "profile.links.email": "Email",
      "profile.links.linkedin": "LinkedIn",
      "profile.links.github": "GitHub",
      "profile.links.cv": "Resume",

      // ABOUT
      "about.h2": "About",
      "about.p": "Who am I professionally, and how do I work?",
      "about.text1": "I’m Efe, a Management Information Systems student at Istanbul Topkapı University, and I’m mainly focused on <strong>iOS development</strong>.",
      "about.text2": "I build user-centered experiences and care deeply about performance and readable code. In my apps, I focus on clean architecture, reusable components, and scalable foundations.",
      "about.text3": "In the long run, my goal is to combine mobile development with AI and data-driven systems to build products that create value both in Türkiye and globally.",
      "about.highlights.fields": "Focus Areas",
      "about.highlights.fields_desc": "iOS Development, UI/UX, REST APIs, Firebase, Frontend, Markets & Portfolio Tracking",
      "about.highlights.strengths": "Strengths",
      "about.highlights.strengths_desc": "Problem solving, attention to detail, ownership, continuous learning",
      "about.highlights.languages": "Languages",
      "about.highlights.languages_desc": "Turkish (Native), English (B2)",

      // SKILLS
      "skills.h2": "Skills",
      "skills.p": "My technical skills and strengths.",
      "skills.col.mobile": "Mobile Development",
      "skills.col.backend": "Backend & Data",
      "skills.col.web": "Web & Other",

      // EXPERIENCE
      "exp.h2": "Experience",
      "exp.p": "Professional and project-based experience.",
      "exp.item1.title": "iOS Developer (Intern)",
      "exp.item2.title": "Freelance iOS Developer",

      // EDUCATION
      "edu.h2": "Education",
      "edu.p": "My academic background.",
      "edu.topkapi.title": "Istanbul Topkapi University",
      "edu.topkapi.department": "Management Information Systems (MIS)",
      "edu.topkapi.date": "Bachelor's • 2024 – Present • Istanbul",
      "edu.topkapi.desc": "I’m pursuing an interdisciplinary education that combines business, information systems, data, and software development. I focus on applying what I learn in active projects to connect theory with practice.",

      "edu.istanbul.title": "Istanbul University",
      "edu.istanbul.department": "Computer Programming",
      "edu.istanbul.date": "Associate Degree • 2023 – • Istanbul",
      "edu.istanbul.desc": "In my computer programming studies, I focus on software fundamentals, algorithmic thinking, and data-driven applications. By turning what I learn into projects, I gain hands-on development experience and improve my ability to build solutions with modern technologies.",

      // PROJECTS
      "projects.h2": "Projects",
      "projects.p": "Products and apps I've been building.",
      "projects.filter.all": "All",
      "projects.filter.ios": "iOS",
      "projects.filter.web": "Web",
      "projects.filter.other": "Other",
      "projects.read": "Read",
      "projects.taskly.chip": "iOS • App Store",
      "projects.taskly.title": "Taskly — Smart Task Manager",
      "projects.taskly.desc": "A minimal, high-performance to-do app that organizes tasks with categories, emojis, and reminders. Includes local notifications, Firebase sync, and multi-theme support.",
      "projects.taskly.link.detail": "Details",
      "projects.taskly.link.appstore": "App Store",
      "projects.taskly.link.github": "GitHub",

      "projects.stride.chip": "iOS • In Progress",
      "projects.stride.title": "Stride — Run & Activity Tracking",
      "projects.stride.desc": "A fitness app that tracks runs and walks in real time, draws routes with MapKit, and shows pace, distance, and calories.",
      "projects.stride.link.detail": "Details",

      "projects.article.chip": "Medium Article",
      "projects.article.title": "Apple Fitness–style 3D badge system (SwiftUI & RealityKit)",
      "projects.article.desc": "An article where I explain how I integrated USDZ-based 3D achievement badges into Stride.",
      "projects.article.link.read": "Read",

      "projects.cv.chip": "Web",
      "projects.cv.title": "Personal CV & Portfolio Website",
      "projects.cv.desc": "A responsive, performance-focused personal website built with HTML, CSS, and JavaScript to reflect my professional profile.",
      "projects.cv.link.live": "Live Demo",
      "projects.cv.link.github": "GitHub",

      // NEWS
      "news.h2": "Latest News",
      "news.p": "Posts, updates, and announcements.",
      "news.card1.meta": "Medium",
      "news.card1.title": "Apple Fitness–style 3D badge system (SwiftUI & RealityKit)",
      "news.card1.desc": "My article explaining how I integrated USDZ-based 3D achievement badges into Stride.",

      "news.card2.meta": "App Store",
      "news.card2.title": "TasklyX — New Year Theme Release",
      "news.card2.desc": "I released v1.0.3 of TasklyX with a New Year theme!",

      "news.card3.meta": "Apple Developer",
      "news.card3.title": "App Store Awards 2025 winners announced",
      "news.card3.desc": "A selection of App Store projects from developers around the world.",

      "news.link.aria": "Open news",

      // SCHEDULE
      "schedule.h2": "Schedule",
      "schedule.day.mon": "Monday",
      "schedule.day.tue": "Tuesday",
      "schedule.day.wed": "Wednesday",
      "schedule.day.thu": "Thursday",
      "schedule.day.fri": "Friday",

      "schedule.gym": "Gym / Run",
      "schedule.study": "Learning",
      "schedule.rest": "Rest",
      "schedule.work": "Internship / iOS",

      // CONTACT
      "contact.h2": "Contact",
      "contact.p": "Feel free to reach out for projects, internships, or opportunities.",
      "contact.info": "If you'd like to talk about iOS development, product-focused projects, entrepreneurship,\n                            or tech-driven ideas, feel free to email me or reach out via LinkedIn.",
      "contact.label.email": "Email:",
      "contact.label.location": "Location:",
      "contact.label.linkedin": "LinkedIn:",
      "contact.label.github": "GitHub:",
      "contact.value.location": "Istanbul, Turkey",

      // FORM
      "form.name": "Full Name",
      "form.email": "Email",
      "form.subject": "Subject",
      "form.message": "Message",
      "form.submit": "Send Message",
      "form.ph.name": "Your full name",
      "form.ph.email": "name@mail.com",
      "form.ph.subject": "Write a short subject",
      "form.ph.message": "Write your message here...",
      "form.status.sending": "Sending...",
      "form.status.success": "Message sent successfully! 📩",
      "form.status.error": "Something went wrong. Please try again.",
      "form.status.network": "Network error. Please try again.",

      // HEAD
      "head.title": "Efe Bülbül | iOS Developer & MIS Student",
      "head.desc": "Efe Bülbül - iOS Developer, Management Information Systems student. CV, projects and contact.",

      // NAV (a11y + dropdown)
      "nav.projects_dropdown_home": "Projects",
      "nav.aria.projects_menu": "Projects menu",
      "nav.aria.lang": "Language selection",

      // NEWS (a11y)
      "news.aria.list": "News list",
      "news.article1.alt": "Apple Fitness-style 3D badges",
      "news.article2.alt": "LinkedIn post",
      "news.article3.alt": "Taskly and Stride updates",

      // SCHEDULE (a11y)
      "schedule.aria.board": "Weekly schedule",

      // EXPERIENCE (details)
      "exp.tek.title": "iOS Developer (Intern)",
      "exp.tek.company": "Teknasyon – Istanbul",
      "exp.tek.date": "2025 • Internship",
      "exp.tek.item1": "Worked on bug fixes, feature development, and performance improvements in existing iOS apps.",
      "exp.tek.item2": "Built component-based UI with UIKit and practiced reusable view patterns and clean code principles.",
      "exp.tek.item3": "Participated in code reviews and got comfortable with Git flow and PR processes.",

      "exp.freelance.title": "Freelance iOS Developer",
      "exp.freelance.company": "Independent",
      "exp.freelance.date": "2024 – Present",
      "exp.freelance.item1": "Developed personal projects published on the App Store (Taskly, Stride, etc.).",
      "exp.freelance.item2": "Worked on user-friendly interfaces, local notifications, premium feature design, and analytics integrations.",
      "exp.freelance.item3": "Iterated based on performance, error handling, and user feedback.",

      // COMPANY (embed)
      "company.h2": "Company",
      "company.p": "You can explore the website of the company where I intern without leaving this page.",
      "company.embed.h3": "Teknasyon",
      "company.embed.p": "Browse Teknasyon’s website right here.",
      "company.embed.iframeTitle": "Teknasyon - Website",
      "company.aria.card": "Company website",

      // FOOTER
      "footer.rights": "All rights reserved.",
    },
    de: {
      // NAV
      "nav.home": "Start",
      "nav.about": "Über mich",
      "nav.skills": "Skills",
      "nav.experience": "Erfahrung",
      "nav.projects": "Projekte",
      "nav.projects_home": "Projekte (Start)",
      "nav.news": "News",
      "nav.schedule": "Plan",
      "nav.contact": "Kontakt",

      // NAV (sub)
      "nav.taskly": "Taskly",
      "nav.stride": "Stride",

      // HERO
      "hero.eyebrow": "iOS Developer • MIS Student",
      "hero.h1.pre": "Hallo, ich bin",
      "hero.h1.post": ".",
      "hero.h1.line2": "Ein produktorientierter Entwickler mit Fokus auf Clean Code.",
      "hero.subtitle": "Ich studiere Management Information Systems an der Istanbul Topkapı Universität.\n                        Mein Fokus liegt auf Produkten, die reale Probleme lösen — durch iOS-Entwicklung,\n                        KI und Softwareprojekte.",
      "hero.cta.contact": "Kontakt aufnehmen",
      "hero.cta.projects": "Projekte ansehen",
      "hero.meta.location": "Ort",
      "hero.meta.role": "Rolle",
      "hero.meta.focus": "Fokus",
      "hero.meta.location_value": "Istanbul, Türkei",
      "hero.meta.role_value": "iOS Developer & MIS Student",
      "hero.meta.focus_value": "Mobile Apps · KI · Frontend",

      // PROFILE
      "profile.title": "iOS Developer • MIS Student",
      "profile.summary": "Ich arbeite mit Swift, UIKit und modernen mobilen Erlebnissen — mit starkem Fokus\n                            auf Performance, Design und Nutzerorientierung.",
      "profile.links.email": "E-Mail",
      "profile.links.linkedin": "LinkedIn",
      "profile.links.github": "GitHub",
      "profile.links.cv": "Lebenslauf",

      // ABOUT
      "about.h2": "Über mich",
      "about.p": "Wer bin ich beruflich und wie arbeite ich?",
      "about.text1": "Ich bin Efe, studiere Management Information Systems an der Istanbul Topkapı Universität und konzentriere mich hauptsächlich auf die <strong>iOS-Entwicklung</strong>.",
      "about.text2": "Ich entwickle nutzerzentrierte Erfahrungen und lege großen Wert auf Performance und gut lesbaren Code. In meinen Apps fokussiere ich mich auf saubere Architektur, wiederverwendbare Komponenten und skalierbare Grundlagen.",
      "about.text3": "Langfristig ist mein Ziel, Mobile Development mit KI und datengetriebenen Systemen zu verbinden, um Produkte zu entwickeln, die sowohl in der Türkei als auch global Mehrwert schaffen.",
      "about.highlights.fields": "Schwerpunkte",
      "about.highlights.fields_desc": "iOS-Entwicklung, UI/UX, REST-APIs, Firebase, Frontend, Märkte & Portfolio-Tracking",
      "about.highlights.strengths": "Stärken",
      "about.highlights.strengths_desc": "Problemlösung, Detailgenauigkeit, Verantwortungsbewusstsein, kontinuierliches Lernen",
      "about.highlights.languages": "Sprachen",
      "about.highlights.languages_desc": "Türkisch (Muttersprache), Englisch (B2)",

      // SKILLS
      "skills.h2": "Skills",
      "skills.p": "Meine technischen Fähigkeiten und Stärken.",
      "skills.col.mobile": "Mobile Entwicklung",
      "skills.col.backend": "Backend & Daten",
      "skills.col.web": "Web & Sonstiges",

      // EXPERIENCE
      "exp.h2": "Erfahrung",
      "exp.p": "Berufliche und projektbasierte Erfahrung.",
      "exp.item1.title": "iOS Developer (Praktikum)",
      "exp.item2.title": "Freelance iOS Developer",

      // EDUCATION
      "edu.h2": "Ausbildung",
      "edu.p": "Mein akademischer Hintergrund.",
      "edu.topkapi.title": "Istanbul Topkapi Universität",
      "edu.topkapi.department": "Management Information Systems (MIS)",
      "edu.topkapi.date": "Bachelor • 2024 – Heute • Istanbul",
      "edu.topkapi.desc": "Ich absolviere eine interdisziplinäre Ausbildung, die Betriebswirtschaft, Informationssysteme, Daten und Softwareentwicklung verbindet. Ich setze das Gelernte in aktiven Projekten ein, um Theorie und Praxis zu verknüpfen.",

      "edu.istanbul.title": "Istanbul Universität",
      "edu.istanbul.department": "Computerprogrammierung",
      "edu.istanbul.date": "Associate Degree • 2023 – • Istanbul",
      "edu.istanbul.desc": "In meinem Studium der Computerprogrammierung konzentriere ich mich auf Softwaregrundlagen, algorithmisches Denken und datengetriebene Anwendungen. Indem ich das Gelernte in Projekte umsetze, sammle ich praktische Entwicklungserfahrung und stärke meine Fähigkeit, mit modernen Technologien Lösungen zu entwickeln.",

      // PROJECTS
      "projects.h2": "Projekte",
      "projects.p": "Produkte und Apps, an denen ich arbeite.",
      "projects.filter.all": "Alle",
      "projects.filter.ios": "iOS",
      "projects.filter.web": "Web",
      "projects.filter.other": "Andere",
      "projects.read": "Lesen",
      "projects.taskly.chip": "iOS • App Store",
      "projects.taskly.title": "Taskly — Intelligenter Aufgabenmanager",
      "projects.taskly.desc": "Eine minimalistische, performante To-do-App, die Aufgaben mit Kategorien, Emojis und Erinnerungen organisiert. Mit Local Notifications, Firebase-Sync und mehreren Themes.",
      "projects.taskly.link.detail": "Details",
      "projects.taskly.link.appstore": "App Store",
      "projects.taskly.link.github": "GitHub",

      "projects.stride.chip": "iOS • In Arbeit",
      "projects.stride.title": "Stride — Lauf- & Aktivitätstracking",
      "projects.stride.desc": "Eine Fitness-App, die Läufe und Spaziergänge in Echtzeit trackt, Routen mit MapKit zeichnet und Tempo, Distanz sowie Kalorien anzeigt.",
      "projects.stride.link.detail": "Details",

      "projects.article.chip": "Medium-Artikel",
      "projects.article.title": "Apple-Fitness-ähnliches 3D-Badge-System (SwiftUI & RealityKit)",
      "projects.article.desc": "Ein Artikel, in dem ich erkläre, wie ich USDZ-basierte 3D-Erfolgsabzeichen in Stride integriert habe.",
      "projects.article.link.read": "Lesen",

      "projects.cv.chip": "Web",
      "projects.cv.title": "Persönliche CV- & Portfolio-Website",
      "projects.cv.desc": "Eine responsive, performanceorientierte Website mit HTML, CSS und JavaScript, die mein professionelles Profil widerspiegelt.",
      "projects.cv.link.live": "Live-Demo",
      "projects.cv.link.github": "GitHub",

      // NEWS
      "news.h2": "Aktuelle News",
      "news.p": "Beiträge, Updates und Ankündigungen.",
      "news.card1.meta": "Medium",
      "news.card1.title": "Apple-Fitness-ähnliches 3D-Badge-System (SwiftUI & RealityKit)",
      "news.card1.desc": "Mein Artikel darüber, wie ich USDZ-basierte 3D-Erfolgsabzeichen in Stride integriert habe.",

      "news.card2.meta": "App Store",
      "news.card2.title": "TasklyX — Neujahrs-Theme-Release",
      "news.card2.desc": "Ich habe TasklyX v1.0.3 mit einem Neujahrs-Theme veröffentlicht!",

      "news.card3.meta": "Apple Developer",
      "news.card3.title": "App Store Awards 2025: Gewinner bekanntgegeben",
      "news.card3.desc": "Eine Auswahl an App-Store-Projekten von Entwickler:innen aus aller Welt.",

      "news.link.aria": "News öffnen",

      // SCHEDULE
      "schedule.h2": "Plan",
      "schedule.day.mon": "Montag",
      "schedule.day.tue": "Dienstag",
      "schedule.day.wed": "Mittwoch",
      "schedule.day.thu": "Donnerstag",
      "schedule.day.fri": "Freitag",

      "schedule.gym": "Fitness / Lauf",
      "schedule.study": "Lernen",
      "schedule.rest": "Erholung",
      "schedule.work": "Praktikum / iOS",

      // CONTACT
      "contact.h2": "Kontakt",
      "contact.p": "Für Projekte, Praktika oder Angebote kannst du dich gerne melden.",
      "contact.info": "Wenn du über iOS-Entwicklung, produktorientierte Projekte, Unternehmertum\n                            oder tech-basierte Ideen sprechen möchtest, schreib mir gerne eine E-Mail\n                            oder kontaktiere mich über LinkedIn.",
      "contact.label.email": "E-Mail:",
      "contact.label.location": "Ort:",
      "contact.label.linkedin": "LinkedIn:",
      "contact.label.github": "GitHub:",
      "contact.value.location": "Istanbul, Türkei",

      // FORM
      "form.name": "Name",
      "form.email": "E-Mail",
      "form.subject": "Betreff",
      "form.message": "Nachricht",
      "form.submit": "Nachricht senden",
      "form.ph.name": "Dein Name",
      "form.ph.email": "name@mail.com",
      "form.ph.subject": "Kurzen Betreff schreiben",
      "form.ph.message": "Schreibe deine Nachricht hier...",
      "form.status.sending": "Wird gesendet...",
      "form.status.success": "Nachricht erfolgreich gesendet! 📩",
      "form.status.error": "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      "form.status.network": "Netzwerkfehler. Bitte versuche es erneut.",

      // HEAD
      "head.title": "Efe Bülbül | iOS Developer & MIS Student",
      "head.desc": "Efe Bülbül - iOS Developer, Student für Management Information Systems. CV, Projekte und Kontakt.",

      // NAV (a11y + dropdown)
      "nav.projects_dropdown_home": "Projekte",
      "nav.aria.projects_menu": "Projektemenü",
      "nav.aria.lang": "Sprachauswahl",

      // NEWS (a11y)
      "news.aria.list": "News-Liste",
      "news.article1.alt": "Apple-Fitness-ähnliche 3D-Abzeichen",
      "news.article2.alt": "LinkedIn-Beitrag",
      "news.article3.alt": "Taskly- und Stride-Updates",

      // SCHEDULE (a11y)
      "schedule.aria.board": "Wochenplan",

      // EXPERIENCE (details)
      "exp.tek.title": "iOS Developer (Praktikum)",
      "exp.tek.company": "Teknasyon – Istanbul",
      "exp.tek.date": "2025 • Praktikum",
      "exp.tek.item1": "Arbeit an Bugfixes, Feature-Entwicklung und Performance-Verbesserungen in bestehenden iOS-Apps.",
      "exp.tek.item2": "Komponentenbasierte UI mit UIKit umgesetzt und wiederverwendbare View-Patterns sowie Clean-Code-Praktiken angewendet.",
      "exp.tek.item3": "An Code-Reviews teilgenommen und mich an Git-Flow- und PR-Prozesse gewöhnt.",

      "exp.freelance.title": "Freelance iOS Developer",
      "exp.freelance.company": "Selbstständig",
      "exp.freelance.date": "2024 – Heute",
      "exp.freelance.item1": "Eigene Projekte entwickelt, die im App Store veröffentlicht wurden (Taskly, Stride usw.).",
      "exp.freelance.item2": "An benutzerfreundlichen Oberflächen, Local Notifications, Premium-Feature-Konzepten und Analytics-Integrationen gearbeitet.",
      "exp.freelance.item3": "Iterativ weiterentwickelt basierend auf Performance, Fehlerbehandlung und Nutzerfeedback.",

      // COMPANY (embed)
      "company.h2": "Unternehmen",
      "company.p": "Du kannst die Website des Unternehmens, bei dem ich mein Praktikum mache, ansehen, ohne diese Seite zu verlassen.",
      "company.embed.h3": "Teknasyon",
      "company.embed.p": "Du kannst die Website von Teknasyon hier direkt durchsuchen.",
      "company.embed.iframeTitle": "Teknasyon - Webseite",
      "company.aria.card": "Unternehmenswebseite",

      // FOOTER
      "footer.rights": "Alle Rechte vorbehalten.",
    },
  };

  function normalizeLang(value) {
    const v = (value || "").toLowerCase().trim();
    return supported.includes(v) ? v : "tr";
  }

  function setActiveButtons(lang) {
    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Mobile links
    document.querySelectorAll('.mobile-lang [data-lang]').forEach(a => {
      const isActive = a.getAttribute('data-lang') === lang;
      a.classList.toggle('active', isActive);
      a.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function applyLang(lang) {
    const dict = translations[lang] || translations.tr;

    // Update text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = dict[key];
      if (typeof value !== 'string') return;

      // allow simple inline HTML like <strong> in our own strings
      if (value.includes('<')) el.innerHTML = value;
      else el.textContent = value;
    });

    // Update placeholders (inputs/textareas)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      const value = dict[key];
      if (typeof value !== 'string') return;
      el.setAttribute('placeholder', value);
    });

    // Update document title
    if (typeof dict["head.title"] === "string") {
      document.title = dict["head.title"];
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && typeof dict["head.desc"] === "string") {
      metaDesc.setAttribute("content", dict["head.desc"]);
    }

    // Update attributes via data-i18n-attr
    // Format: data-i18n-attr="aria-label:nav.aria.lang,alt:news.card1.imgAlt"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const raw = el.getAttribute('data-i18n-attr');
      if (!raw) return;

      raw.split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .forEach(pair => {
          const [attr, key] = pair.split(':').map(s => s.trim());
          if (!attr || !key) return;

          const value = dict[key];
          if (typeof value !== 'string') return;

          el.setAttribute(attr, value);
        });
    });

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', 'ltr');
    setActiveButtons(lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // Expose current translator for other modules
    window.__i18n = window.__i18n || {};
    window.__i18n.lang = lang;
    window.__i18n.t = (key, fallback) => {
      const d = translations[lang] || translations.tr;
      const v = d[key];
      return (typeof v === 'string') ? v : (fallback || key);
    };
  }

  function bind() {
    // Desktop buttons
    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = normalizeLang(btn.getAttribute('data-lang'));
        applyLang(lang);
      });
    });

    // Mobile links
    document.querySelectorAll('.mobile-lang [data-lang]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = normalizeLang(a.getAttribute('data-lang'));
        applyLang(lang);
      });
    });
  }

  // Init
  const saved = normalizeLang(localStorage.getItem(STORAGE_KEY));
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bind();
      applyLang(saved);
    });
  } else {
    bind();
    applyLang(saved);
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

        // taskly.html
        if (path === 'taskly.html' && href === 'taskly.html') {
            link.classList.add('active');
        }

        // stride.html
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

        statusEl.textContent = (window.__i18n && window.__i18n.t) ? window.__i18n.t('form.status.sending', 'Sending...') : "Gönderiliyor...";

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xvgjyodd", {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                statusEl.textContent = (window.__i18n && window.__i18n.t) ? window.__i18n.t('form.status.success', 'Message sent! 📩') : "Mesajın başarıyla gönderildi! 📩";
                form.reset();
            } else {
                statusEl.textContent = (window.__i18n && window.__i18n.t) ? window.__i18n.t('form.status.error', 'Something went wrong. Please try again.') : "Gönderimde bir sorun oluştu. Lütfen tekrar dene.";
            }
        } catch (err) {
            console.error(err);
            statusEl.textContent = (window.__i18n && window.__i18n.t) ? window.__i18n.t('form.status.network', 'Network error. Please try again.') : "Bağlantı hatası. Lütfen tekrar dene.";
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

// Make whole news cards clickable (use existing .news-link href)
(function () {
  function initNewsCardClicks() {
    var cards = document.querySelectorAll('.news-card');
    if (!cards || !cards.length) return;

    cards.forEach(function (card) {
      // Avoid binding twice
      if (card.dataset && card.dataset.clickBound === '1') return;
      if (card.dataset) card.dataset.clickBound = '1';

      card.addEventListener('click', function (e) {
        // If user clicked a real link inside, keep default behavior
        if (e.target && e.target.closest && e.target.closest('a')) return;

        var link = card.querySelector('.news-link');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href) return;

        // If it's an in-page anchor, just navigate within the page
        if (href.charAt(0) === '#') {
          window.location.hash = href;
          return;
        }

        // Respect modifier keys (ctrl/cmd) as "open in new tab" intent
        var wantsNewTab = !!(e && (e.metaKey || e.ctrlKey));

        // Respect target="_blank" on the inner link
        var target = (link.getAttribute('target') || '').toLowerCase();
        var isBlank = target === '_blank';

        if (wantsNewTab || isBlank) {
          window.open(href, '_blank', 'noopener');
        } else {
          window.location.href = href;
        }
      });

      // Keyboard accessibility (Enter)
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsCardClicks);
  } else {
    initNewsCardClicks();
  }
})();
