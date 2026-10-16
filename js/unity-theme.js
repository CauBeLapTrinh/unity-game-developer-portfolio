/* ==========================================================
   UNITY EDITOR THEME LAYER (decorative, optional)
   XP scroll bar, scene HUD, section dividers, back-to-top.
   ========================================================== */
(function initUnityTheme() {
    const SCENES = {
        home: "Home",
        minigames: "Minigames",
        work: "Featured",
        experience: "Experience",
        about: "About & Skills",
        "tech-radar": "Tech Radar",
        contact: "Contact"
    };

    const sections = [...document.querySelectorAll("main > section[id]")];

    /* ---- Scene dividers (skip the hero) ---- */
    sections.forEach((section, i) => {
        if (i === 0) return;
        const divider = document.createElement("div");
        divider.className = "scene-divider";
        divider.setAttribute("aria-hidden", "true");
        divider.innerHTML = `<span><i class="fa-solid fa-cube"></i> Scene ${String(i + 1).padStart(2, "0")} · ${SCENES[section.id] || section.id}<span class="axis"><em></em><em></em><em></em></span></span>`;
        section.parentNode.insertBefore(divider, section);
    });

    /* ---- XP bar ---- */
    const xpBar = document.createElement("div");
    xpBar.className = "xp-bar";
    xpBar.setAttribute("aria-hidden", "true");
    xpBar.innerHTML = '<div class="xp-bar-fill"></div>';
    document.body.appendChild(xpBar);

    /* ---- Scene HUD ---- */
    const hud = document.createElement("div");
    hud.className = "scene-hud";
    hud.setAttribute("aria-hidden", "true");
    hud.innerHTML = '<span class="hud-lv">LV 1</span><span>SCENE &#9656; <b class="hud-scene">Home</b></span><span class="hud-xp">XP 0%</span>';
    document.body.appendChild(hud);
    const hudLv = hud.querySelector(".hud-lv");
    const hudScene = hud.querySelector(".hud-scene");
    const hudXp = hud.querySelector(".hud-xp");

    /* ---- Back to top ---- */
    const toTop = document.createElement("button");
    toTop.type = "button";
    toTop.className = "to-top-btn";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(toTop);

    let ticking = false;

    function update() {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        xpBar.style.setProperty("--xp", progress.toFixed(4));
        hudXp.textContent = "XP " + Math.round(progress * 100) + "%";
        toTop.classList.toggle("visible", window.scrollY > 700);

        // Current scene = last section whose top is above the viewport's middle
        const mid = window.scrollY + window.innerHeight * 0.4;
        let current = 0;
        sections.forEach((s, i) => { if (s.offsetTop <= mid) current = i; });
        hudLv.textContent = "LV " + (current + 1);
        hudScene.textContent = SCENES[sections[current].id] || sections[current].id;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    update();
})();
