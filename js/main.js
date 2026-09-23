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

                const isGameJam = game.category === "gamejam";
                const badgeUrl = isGameJam 
                    ? (game.storeUrl || "https://github.com/CauBeLapTrinh/GameJam-2026")
                    : (game.category === "2-4-player" 
                        ? "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" 
                        : "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi");
                const badgeIcon = isGameJam ? "fa-solid fa-trophy" : "fa-brands fa-google-play";
                const badgeTitle = isGameJam ? "View on GitHub / Competition Award" : "View on Google Play";

                card.innerHTML = `
                    <a class="card-badge-top" href="${badgeUrl}" target="_blank" rel="noopener" title="${badgeTitle}" onclick="event.stopPropagation()"><i class="${badgeIcon}"></i> ${game.downloads}</a>
                    <div class="minigame-thumb">
                        <img src="${game.image}" alt="${game.title}"
                             onerror="handleImageFallback(this, '${game.fallbackImage}', '${game.title}', '${game.icon}', '${game.gradient}')" />
                        ${game.youtubeVideoId ? `
                            <span class="card-video-pill" onclick="event.stopPropagation(); openProjectDetail('${game.id}', true, true)" title="Watch Gameplay Video">
                                <i class="fa-brands fa-youtube"></i> Video Demo
                            </span>
                        ` : ''}
                    </div>
                    <div class="minigame-card-body">
                        <h3 class="minigame-title">${game.title}</h3>
                        <p class="minigame-desc">${game.shortDesc}</p>
                        <div class="minigame-card-actions">
                            <button class="btn-view-details" onclick="openProjectDetail('${game.id}')" type="button">
                                View Details <i class="fa-solid fa-arrow-right"></i>
                            </button>
                            ${game.youtubeVideoId ? `
                                <button class="btn-card-video" onclick="event.stopPropagation(); openProjectDetail('${game.id}', true, true)" type="button" title="Watch Gameplay Video">
                                    <i class="fa-brands fa-youtube"></i> Video
                                </button>
                            ` : ''}
                        </div>
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

        function openProjectDetail(gameId, updateHash = true, scrollToVideo = false) {
            const game = minigamesData.find(g => g.id === gameId || (gameId === "death-loop" && g.id === "exima"));
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

            const isGameJam = game.category === "gamejam";
            const collectionUrl = isGameJam 
                ? (game.storeUrl || "https://github.com/CauBeLapTrinh/GameJam-2026") 
                : (game.category === "2-4-player" 
                    ? "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" 
                    : "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi");
            const collectionTitle = isGameJam ? "Open GitHub Repository" : "Open on Google Play";
            const downloadTagIcon = isGameJam ? "fa-solid fa-trophy" : "fa-solid fa-download";

            modalContentContainer.innerHTML = `
                <div class="project-hero-header">
                    <div class="project-meta-badges">
                        <a class="collection-tag" href="${collectionUrl}" target="_blank" rel="noopener" title="${collectionTitle}"><i class="fa-solid fa-layer-group"></i> ${game.collection} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; margin-left: 4px;"></i></a>
                        <span class="downloads-tag"><i class="${downloadTagIcon}"></i> ${game.downloads}</span>
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
                        <h3><i class="${game.youtubeVideoId ? 'fa-solid fa-film' : 'fa-solid fa-images'}"></i> Gameplay ${game.youtubeVideoId ? 'Video & Screenshots' : 'Media'}</h3>
                        <div class="media-gallery-grid">
                            ${game.youtubeVideoId ? `
                                <div class="gallery-item video-gallery-item" id="videoSlot-${game.id}">
                                    ${window.location.protocol === 'file:' ? `
                                        <div class="video-preview-card" onclick="window.open('https://www.youtube.com/watch?v=${game.youtubeVideoId}', '_blank')" title="Mở xem trên YouTube">
                                            <img class="video-thumb" src="https://img.youtube.com/vi/${game.youtubeVideoId}/hqdefault.jpg" alt="${game.title} YouTube Gameplay" />
                                            <div class="video-preview-overlay">
                                                <div class="video-preview-badge"><i class="fa-brands fa-youtube"></i> YouTube Gameplay</div>
                                                <div class="video-play-btn-circle"><i class="fa-solid fa-play"></i></div>
                                                <div class="video-preview-bottom">
                                                    <span class="video-preview-title">${game.title} - Official Gameplay</span>
                                                    <span class="video-preview-hint"><i class="fa-solid fa-arrow-up-right-from-square"></i> Bấm để xem trực tiếp trên YouTube</span>
                                                </div>
                                            </div>
                                        </div>
                                    ` : `
                                        <iframe src="https://www.youtube-nocookie.com/embed/${game.youtubeVideoId}?rel=0"
                                                title="${game.title} Gameplay Video"
                                                referrerpolicy="strict-origin-when-cross-origin"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowfullscreen></iframe>
                                    `}
                                </div>
                                <div class="gallery-item">
                                    <img src="${game.image}" alt="${game.title} visual"
                                         onerror="this.src='${game.fallbackImage}';" />
                                </div>
                            ` : `
                                <div class="gallery-item">
                                    <img src="${game.image}" alt="${game.title} visual"
                                         onerror="this.src='${game.fallbackImage}';" />
                                </div>
                                <div class="gallery-item">
                                    ${game.secondaryImage ? `
                                        <div style="background: ${game.gradient}; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; padding: 20px; box-sizing: border-box;">
                                            <img src="${game.secondaryImage}" alt="${game.title} icon" style="max-height: 75%; max-width: 75%; object-fit: contain; filter: drop-shadow(0 10px 24px rgba(0,0,0,0.55));" />
                                            <span style="color: #ffffff; font-weight: 700; font-size: 0.85rem; margin-top: 10px; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.9;">Game Icon & Character Mask</span>
                                        </div>
                                    ` : `
                                    <div class="gallery-placeholder" style="background: ${game.gradient}; color: #ffffff;">
                                        <i class="${game.icon}" style="color: #ffffff; opacity: 0.95;"></i>
                                        <strong style="color: #ffffff; font-size: 1.15rem; margin-top: 6px;">${game.title}</strong>
                                        <span style="color: rgba(255, 255, 255, 0.88); font-size: 0.88rem; margin-top: 4px;">${game.collection}</span>
                                        <span style="color: #bef264; font-weight: 800; font-size: 0.85rem; margin-top: 8px; display: inline-flex; align-items: center; gap: 6px;"><i class="${isGameJam ? 'fa-solid fa-trophy' : 'fa-brands fa-google-play'}"></i> ${game.downloads}</span>
                                    </div>
                                    `}
                                </div>
                            `}
                        </div>
                        ${(game.youtubeVideoId && window.location.protocol === 'file:') ? `
                            <div class="video-embed-notice">
                                <i class="fa-solid fa-circle-info"></i>
                                <div>
                                    <strong>Giao thức file local (file://):</strong> Trình duyệt chặn gửi thông tin <code>Referer</code> khi mở trực tiếp từ file trên máy, YouTube sẽ phản hồi <em>Error 153</em>. Hãy bấm vào khung video để xem ngay trên YouTube, hoặc bấm <button type="button" class="btn-try-embed" onclick="window.loadEmbedPlayer('videoSlot-${game.id}', '${game.youtubeVideoId}', '${game.title}')">Thử tải Player trực tiếp</button>. Khi website được host online hoặc chạy qua Local Server, video sẽ tự động phát bình thường.
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;

            projectDetailModal.classList.add("active");
            document.body.style.overflow = "hidden";
            projectDetailModal.scrollTop = 0;

            if (scrollToVideo) {
                setTimeout(() => {
                    const videoBlock = modalContentContainer.querySelector(".detail-media-container");
                    if (videoBlock) {
                        videoBlock.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 280);
            }
        }

        // Expose openProjectDetail globally
        window.openProjectDetail = openProjectDetail;

        function closeProjectDetail() {
            projectDetailModal.classList.remove("active");
            document.body.style.overflow = "";
            // Pause any playing videos by refreshing iframe src
            const iframes = modalContentContainer.querySelectorAll("iframe");
            iframes.forEach(iframe => {
                iframe.src = iframe.src;
            });
            if (window.location.hash.startsWith("#/project/")) {
                window.location.hash = "#minigames";
            }
        }

        // Global helper to manually load embedded iframe player on demand
        window.loadEmbedPlayer = function(slotId, videoId, title) {
            const slot = document.getElementById(slotId);
            if (!slot) return;
            slot.innerHTML = `
                <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0"
                        title="${title} Gameplay Video"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
            `;
        };

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

/* ========================================================
   DYNAMIC GAME DEV PARTICLES & PHYSICS RAYCAST CANVAS
   ======================================================== */
(function initGameDevCanvas() {
    const canvas = document.getElementById("gameDevCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;
    let isTabActive = true;

    // Mouse position & interactive raycast state
    const mouse = {
        x: -1000,
        y: -1000,
        targetX: -1000,
        targetY: -1000,
        active: false,
        radius: 140
    };

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
        ctx.scale(dpr, dpr);
        initParticles();
    }

    function getParticleCount() {
        if (width < 768) return 26;
        if (width < 1200) return 38;
        return 54;
    }

    function createParticle() {
        const type = Math.floor(Math.random() * 3); // 0: Entity node, 1: Gizmo crosshair (+), 2: Diamond collider
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            size: 2.2 + Math.random() * 2.4,
            type: type,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            colorVariant: Math.random() > 0.4 ? "primary" : "accent"
        };
    }

    function initParticles() {
        const count = getParticleCount();
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    window.addEventListener("mousemove", (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        mouse.active = true;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
        mouse.active = false;
        mouse.targetX = -1000;
        mouse.targetY = -1000;
    });

    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            mouse.targetX = e.touches[0].clientX;
            mouse.targetY = e.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    window.addEventListener("touchend", () => {
        mouse.active = false;
        mouse.targetX = -1000;
        mouse.targetY = -1000;
    });

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains("dark");
        const primaryColor = isDark ? "rgba(96, 165, 250, " : "rgba(37, 99, 235, ";
        const accentColor = isDark ? "rgba(190, 242, 100, " : "rgba(132, 204, 22, ";

        // Smooth mouse lerp
        if (mouse.active) {
            mouse.x += (mouse.targetX - mouse.x) * 0.15;
            mouse.y += (mouse.targetY - mouse.y) * 0.15;

            // Reticle ring around mouse cursor
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? "rgba(96, 165, 250, 0.22)" : "rgba(37, 99, 235, 0.18)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Center targeting crosshair
            ctx.beginPath();
            ctx.moveTo(mouse.x - 4, mouse.y);
            ctx.lineTo(mouse.x + 4, mouse.y);
            ctx.moveTo(mouse.x, mouse.y - 4);
            ctx.lineTo(mouse.x, mouse.y + 4);
            ctx.strokeStyle = isDark ? "rgba(190, 242, 100, 0.4)" : "rgba(37, 99, 235, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        const maxLineDist = 115;
        const maxMouseDist = mouse.radius;

        // Draw connections (DistanceJoints / Mesh Triangulation)
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.hypot(dx, dy);

                if (dist < maxLineDist) {
                    const alpha = (1 - dist / maxLineDist) * (isDark ? 0.22 : 0.14);
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = primaryColor + alpha + ")";
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // Raycast connection from mouse to nearby nodes
            if (mouse.active) {
                const mdx = p1.x - mouse.x;
                const mdy = p1.y - mouse.y;
                const mdist = Math.hypot(mdx, mdy);

                if (mdist < maxMouseDist) {
                    const mAlpha = (1 - mdist / maxMouseDist) * (isDark ? 0.45 : 0.28);
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(p1.x, p1.y);
                    ctx.strokeStyle = accentColor + mAlpha + ")";
                    ctx.lineWidth = 1.2;
                    ctx.stroke();

                    // Soft physics impulse away from cursor
                    const force = (1 - mdist / maxMouseDist) * 0.08;
                    p1.vx += (mdx / mdist) * force;
                    p1.vy += (mdy / mdist) * force;
                }
            }
        }

        // Draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Speed damping
            p.vx *= 0.985;
            p.vy *= 0.985;

            // Gentle ambient drift
            if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.05;
            if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.05;

            p.x += p.vx;
            p.y += p.vy;

            // Boundary bounce
            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            else if (p.x > width) { p.x = width; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            else if (p.y > height) { p.y = height; p.vy *= -1; }

            p.pulse += p.pulseSpeed;
            const currentSize = p.size + Math.sin(p.pulse) * 0.8;
            const baseAlpha = (isDark ? 0.55 : 0.4) + Math.sin(p.pulse) * 0.15;
            const colorPrefix = p.colorVariant === "primary" ? primaryColor : accentColor;

            if (p.type === 0) {
                // Circle entity
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = colorPrefix + baseAlpha + ")";
                ctx.fill();
            } else if (p.type === 1) {
                // Gizmo crosshair (+)
                const arm = currentSize * 1.5;
                ctx.beginPath();
                ctx.moveTo(p.x - arm, p.y);
                ctx.lineTo(p.x + arm, p.y);
                ctx.moveTo(p.x, p.y - arm);
                ctx.lineTo(p.x, p.y + arm);
                ctx.strokeStyle = colorPrefix + (baseAlpha + 0.1) + ")";
                ctx.lineWidth = 1.2;
                ctx.stroke();
            } else {
                // Diamond collider
                const s = currentSize * 1.3;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y - s);
                ctx.lineTo(p.x + s, p.y);
                ctx.lineTo(p.x, p.y + s);
                ctx.lineTo(p.x - s, p.y);
                ctx.closePath();
                ctx.fillStyle = colorPrefix + (baseAlpha * 0.8) + ")";
                ctx.fill();
                ctx.strokeStyle = colorPrefix + baseAlpha + ")";
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function loop() {
        if (isTabActive) {
            draw();
            animationFrameId = requestAnimationFrame(loop);
        }
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            isTabActive = false;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        } else {
            isTabActive = true;
            loop();
        }
    });

    window.addEventListener("resize", () => {
        resize();
    });

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        resize();
        draw();
    } else {
        resize();
        loop();
    }
})();
