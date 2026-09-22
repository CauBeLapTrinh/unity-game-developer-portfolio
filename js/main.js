/* ========================================================
           RENDER MINIGAMES GRID WITH FALLBACK IMAGE HANDLING
           ======================================================== */
        const minigamesGrid = document.getElementById("minigamesGrid");
        const filterTabs = document.getElementById("filterTabs");

        function renderMinigames(filter = "all") {
            minigamesGrid.innerHTML = "";
            const filtered = filter === "all" ? minigamesData : minigamesData.filter(g => g.category === filter);

            filtered.forEach(game => {
                const card = document.createElement("article");
                card.className = "minigame-card reveal show";
                card.innerHTML = `
                    <a class="card-badge-top" href="${game.category === '2-4-player' ? 'https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi' : 'https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi'}" target="_blank" rel="noopener" title="View on Google Play" onclick="event.stopPropagation()"><i class="fa-brands fa-google-play"></i> ${game.downloads}</a>
                    <div class="minigame-thumb">
                        <img src="${game.image}" alt="${game.title}"
                             onerror="handleImageFallback(this, '${game.fallbackImage}', '${game.title}', '${game.icon}', '${game.gradient}')" />
                    </div>
                    <div class="minigame-card-body">
                        <h3 class="minigame-title">${game.title}</h3>
                        <p class="minigame-desc">${game.shortDesc}</p>
                        <button class="btn-view-details" onclick="openProjectDetail('${game.id}')" type="button">
                            View Details <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                `;
                minigamesGrid.appendChild(card);
            });
        }

        // Image fallback handler: if image in Imgs/MiniGame hasn't been uploaded yet, use fallback or aesthetic graphic
        function handleImageFallback(imgEl, fallbackSrc, title, iconClass, gradient) {
            // First attempt to load existing fallback image if not already trying it
            if (fallbackSrc && !imgEl.getAttribute("data-tried-fallback")) {
                imgEl.setAttribute("data-tried-fallback", "true");
                imgEl.src = fallbackSrc;
                return;
            }

            // Otherwise, render stylish fallback banner with game icon
            const thumbParent = imgEl.parentElement;
            if (thumbParent) {
                thumbParent.innerHTML = `
                    <div class="minigame-fallback-art" style="background: ${gradient || 'linear-gradient(135deg, #1e293b, #0f172a)'}">
                        <i class="${iconClass || 'fa-solid fa-gamepad'}"></i>
                        <span>${title}</span>
                    </div>
                `;
            }
        }

        // Filter button clicks
        filterTabs.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                filterTabs.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderMinigames(btn.dataset.filter);
            });
        });

        /* ========================================================
           PROJECT DETAIL VIEW & HASH ROUTING (foliotuantran.netlify.app style)
           ======================================================== */
        const projectDetailModal = document.getElementById("projectDetailModal");
        const modalContentContainer = document.getElementById("modalContentContainer");
        const btnBackProjects = document.getElementById("btnBackProjects");

        function openProjectDetail(gameId, updateHash = true) {
            const game = minigamesData.find(g => g.id === gameId);
            if (!game) return;

            if (updateHash) {
                window.location.hash = "#/project/" + game.id;
            }

            // Construct detail HTML matching foliotuantran.netlify.app/#/project/girl-rescue
            const d = game.details;
            let linksHtml = "";
            if (d.links && d.links.length > 0) {
                linksHtml = d.links.map(l => `
                    <a class="link-pill primary-link" href="${l.url}" target="_blank" rel="noopener">
                        <i class="${l.icon}"></i> ${l.name}
                    </a>
                `).join("");
            }

            let contributionsHtml = "";
            if (d.contributions && d.contributions.length > 0) {
                contributionsHtml = d.contributions.map(c => `
                    <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${c}</span>
                    </li>
                `).join("");
            }

            let techBadgesHtml = "";
            if (d.techStack && d.techStack.length > 0) {
                techBadgesHtml = d.techStack.map(t => `
                    <span class="tech-badge-item">${t}</span>
                `).join("");
            }

            let techNoteHtml = "";
            if (d.techNote) {
                const points = d.techNote.points.map(p => `
                    <li>
                        <i class="fa-solid fa-wrench"></i>
                        <span>${p}</span>
                    </li>
                `).join("");

                techNoteHtml = `
                    <div class="tech-note-box">
                        <h4><i class="fa-solid fa-lightbulb"></i> ${d.techNote.title}</h4>
                        <p style="color: var(--ink); font-weight: 700; font-size: 0.95rem;">${d.techNote.description}</p>
                        <ul>${points}</ul>
                    </div>
                `;
            }

            modalContentContainer.innerHTML = `
                <div class="project-hero-header">
                    <div class="project-meta-badges">
                        <a class="collection-tag" href="${game.category === '2-4-player' ? 'https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi' : 'https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi'}" target="_blank" rel="noopener" title="Open on Google Play"><i class="fa-solid fa-layer-group"></i> ${game.collection} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; margin-left: 4px;"></i></a>
                        <span class="downloads-tag"><i class="fa-solid fa-download"></i> ${game.downloads}</span>
                    </div>
                    <h1 id="modalProjectTitle">${game.title}</h1>
                    <p class="project-subtitle">${game.shortDesc}</p>
                    <div class="project-links-row">
                        ${linksHtml}
                        <a class="link-pill" href="#contact" onclick="closeProjectDetail()">
                            <i class="fa-solid fa-envelope"></i> Inquire About Project
                        </a>
                    </div>
                </div>

                <!-- Metadata Grid -->
                <div class="project-metadata-bar">
                    <div class="meta-card">
                        <i class="fa-solid fa-user-gear"></i>
                        <div class="meta-text">
                            <span class="meta-label">Role</span>
                            <span class="meta-val">${d.role.title}</span>
                        </div>
                    </div>
                    <div class="meta-card">
                        <i class="fa-regular fa-clock"></i>
                        <div class="meta-text">
                            <span class="meta-label">Duration</span>
                            <span class="meta-val">${d.role.duration}</span>
                        </div>
                    </div>
                    <div class="meta-card">
                        <i class="fa-regular fa-building"></i>
                        <div class="meta-text">
                            <span class="meta-label">Company</span>
                            <span class="meta-val">${d.role.company}</span>
                        </div>
                    </div>
                    <div class="meta-card">
                        <i class="fa-solid fa-mobile-screen"></i>
                        <div class="meta-text">
                            <span class="meta-label">Platform</span>
                            <span class="meta-val">${d.role.platform}</span>
                        </div>
                    </div>
                    <div class="meta-card">
                        <i class="fa-solid fa-gamepad"></i>
                        <div class="meta-text">
                            <span class="meta-label">Engine</span>
                            <span class="meta-val">${d.role.engine}</span>
                        </div>
                    </div>
                </div>

                <!-- Detail Content Layout -->
                <div class="project-detail-layout">
                    <!-- Project Overview -->
                    <div class="detail-section-card">
                        <h3><i class="fa-solid fa-align-left"></i> Project Overview</h3>
                        <p class="overview-body">${d.overview}</p>
                    </div>

                    <!-- Core Contributions -->
                    <div class="detail-section-card">
                        <h3><i class="fa-solid fa-list-check"></i> Core Contributions</h3>
                        <ul class="contributions-list">
                            ${contributionsHtml}
                        </ul>
                    </div>

                    <!-- Tech Stack & Patterns -->
                    <div class="detail-section-card">
                        <h3><i class="fa-solid fa-code"></i> Tech Stack & Architecture Patterns</h3>
                        <div class="tech-badges-grid">
                            ${techBadgesHtml}
                        </div>
                        ${techNoteHtml}
                    </div>

                    <!-- Gameplay Media Section -->
                    <div class="detail-section-card">
                        <h3><i class="fa-solid fa-images"></i> Gameplay Media</h3>
                        <p style="color: var(--muted); font-size: 0.95rem; margin-bottom: 14px;">
                            Screenshots and visual assets will be rendered from <code>Imgs/MiniGame/${game.id}-screen.png</code>.
                        </p>
                        <div class="media-gallery-grid">
                            <div class="gallery-item">
                                <img src="${game.image}" alt="${game.title} visual"
                                     onerror="this.src='${game.fallbackImage}'; this.onerror=function(){ this.parentElement.innerHTML='<div class=\'gallery-placeholder\'><i class=\'fa-solid fa-gamepad\'></i><strong>Gameplay Screenshot 1</strong><span>(Drop ${game.id}-1.png into Imgs/MiniGame)</span></div>'; }" />
                            </div>
                            <div class="gallery-item">
                                <div class="gallery-placeholder">
                                    <i class="fa-solid fa-film"></i>
                                    <strong>Gameplay Preview</strong>
                                    <span>Screenshots placed in <code>Imgs/MiniGame</code> will display here</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            projectDetailModal.classList.add("active");
            document.body.style.overflow = "hidden";
            projectDetailModal.scrollTop = 0;
        }

        function closeProjectDetail() {
            projectDetailModal.classList.remove("active");
            document.body.style.overflow = "";
            if (window.location.hash.startsWith("#/project/")) {
                window.location.hash = "#minigames";
            }
        }

        btnBackProjects.addEventListener("click", closeProjectDetail);

        // Escape key to close modal
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && projectDetailModal.classList.contains("active")) {
                closeProjectDetail();
            }
        });

        // Hash routing listener (e.g. #/project/fish-eat-fish)
        function handleHashRouting() {
            const hash = window.location.hash;
            if (hash.startsWith("#/project/")) {
                const gameId = hash.replace("#/project/", "").trim();
                openProjectDetail(gameId, false);
            } else if (projectDetailModal.classList.contains("active")) {
                projectDetailModal.classList.remove("active");
                document.body.style.overflow = "";
            }
        }

        window.addEventListener("hashchange", handleHashRouting);

        /* ========================================================
           GENERAL PORTFOLIO SCRIPTS
           ======================================================== */
        const body = document.body;
        const header = document.getElementById("siteHeader");
        const themeToggle = document.getElementById("themeToggle");
        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");
        const contactForm = document.getElementById("contactForm");
        const formMessage = document.getElementById("formMessage");

        // Footer year
        document.getElementById("currentYear").textContent = new Date().getFullYear();

        // Dark theme persistence
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme === "dark") {
            body.classList.add("dark");
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark");
            const isDark = body.classList.contains("dark");
            localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
            themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });

        // Mobile menu toggle
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => navLinks.classList.remove("open"));
        });

        // Header style on scroll
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 18);
        });

        // Reveal animation observer
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

        // Hero statistics counter
        const counters = document.querySelectorAll(".stat-number");
        let countersStarted = false;

        function runCounters() {
            counters.forEach((counter) => {
                const target = Number(counter.dataset.target);
                const duration = 1200;
                const startTime = performance.now();

                function update(now) {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const value = Math.floor(progress * target);
                    counter.textContent = value + (target > 1 ? "+" : "");

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target + (target > 1 ? "+" : "");
                    }
                }

                requestAnimationFrame(update);
            });
        }

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0] && entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                runCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });

        const statsEl = document.getElementById("stats");
        if (statsEl) statsObserver.observe(statsEl);

        // Contact form mock submission
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            formMessage.textContent = "Sending message...";

            setTimeout(() => {
                formMessage.textContent = "Thank you! Your message has been sent successfully.";
                showToast("Message sent successfully! Vu Gia Viet will reply soon.");
                contactForm.reset();
            }, 1000);
        });

        // Initialize minigames and hash check on startup
        document.addEventListener("DOMContentLoaded", () => {
            renderMinigames("all");
            handleHashRouting();
        });

        // Run immediately if DOM already loaded
        renderMinigames("all");
        handleHashRouting();
/* ========================================================
   ACTIVE NAVIGATION HIGHLIGHT ON SCROLL (SCROLLSPY)
   ======================================================== */
const sections = document.querySelectorAll("section[id]");

function highlightActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute("id");
        const navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));
                navLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", highlightActiveNav);
window.addEventListener("load", highlightActiveNav);

/* Toast Notification Utility */
function showToast(message, icon = "fa-circle-check") {
    let toast = document.getElementById("toastNotice");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toastNotice";
        toast.className = "toast-notice";
        document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="fa-solid ' + icon + '"></i><span>' + message + '</span>';
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3800);
}
