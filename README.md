# Vu Gia Viet - Unity Game Developer Portfolio

Personal portfolio showcasing commercial mobile games, prototypes, and technical architectures built with **Unity (2D/3D)**, **C#**, and **AI Workflow Automation (MCP, Copilot)**.

🌐 **Live Demo:** [GitHub Pages / Portfolio URL]  
👤 **Developer:** Vu Gia Viet (Caubelaptrinh)  
📍 **Location:** Ha Noi, Vietnam  
✉️ **Email:** [vuviet1402@gmail.com](mailto:vuviet1402@gmail.com)  
📱 **Phone:** 0948 389 203  

---

## 🎮 Featured Commercial Game Suites

- **[2 & 4 Player Games (10M+ Downloads Studio Suite)](https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi)**: Commercial local multiplayer suite on Google Play.
  - Contributed Minigames: *FishEatFish*, *BankHeist*, *TankStars*.
- **[GameBoy: 100+ Mini Games (1M+ Downloads Studio Suite)](https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi)**: Hyper-casual action collection on Google Play.
  - Contributed Minigames: *StickmanHook*, *StickmanEscape*.
- **[Game Jam 2026 (Third Prize - Exima)](https://www.facebook.com/gamejam.vn/posts/pfbid0TGtKK9hNQeQQ3yshVtT22bY8yJuuWSnM4wvtB1oPQc8471k5q3m2H8WKbmuNpuPWl)**: Awarded by Posts and Telecommunications Institute of Technology (PTIT).

---

## 🛠️ Project Structure

\`\`\`bash
SourceWeb/
├── css/
│   └── style.css          # Design system, animations, dark mode, responsive styles
├── js/
│   ├── data.js            # Extensible minigames dataset & technical specs
│   └── main.js            # Core logic, hash routing, modal system, scrollspy
├── Imgs/
│   ├── Avatar.jpg         # Profile image
│   ├── 2Player.png        # 2 & 4 Player Games thumbnail
│   ├── stickman.png       # GameBoy thumbnail
│   ├── gameJamicon.PNG    # Game Jam award asset
│   └── MiniGame/          # Folder for individual minigame screenshots and icons
├── index.html             # Clean, semantic HTML5 structure
├── .gitignore             # Git ignore patterns
└── README.md              # Documentation
\`\`\`

---

## 🚀 Key Website Features

1. **Minigames Showcase**: Filterable game catalog with responsive cards and Google Play direct links.
2. **Project Detail Modal (Hash Routing)**: Deep-linking support via `#/project/{game-id}` (e.g., `#/project/fish-eat-fish`).
3. **Smart Image Fallback**: Automatic fallback to stylized vector banners if custom screenshot assets are pending.
4. **Dark / Light Theme**: Instant toggle with `localStorage` persistence.
5. **Interactive UI**: Scrollspy navigation highlight, animated statistics counters, and glassmorphic header.

---

## 💻 Local Development

No package manager or build step required. Simply open `index.html` in any modern web browser or serve locally:

\`\`\`bash
# Using Python
python -m http.server 8000

# Or using Node.js / npx
npx serve .
\`\`\`

---

© 2026 Vu Gia Viet. All rights reserved.
