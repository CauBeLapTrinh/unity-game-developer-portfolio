/* ========================================================
   MINIGAMES DATASET (Extensible for adding more games later)
   ======================================================== */
const minigamesData = [
    {
        id: "cat-shakes",
        title: "CatShakes",
        category: "personal",
        collection: "Personal Project (Drunkboy)",
        storeUrl: "https://github.com/CauBeLapTrinh/MemeShakes",
        downloads: "In Development",
        gradient: "linear-gradient(135deg, #16a34a, #facc15)",
        icon: "fa-solid fa-cat",
        image: "Imgs/Minigame/CatShakes/IconGame.png",
        thumbStyle: "icon",
        fallbackImage: "Imgs/Minigame/CatShakes/GamePlay.png",
        galleryLayout: "landscape",
        gallery: [
            { src: "Imgs/Minigame/CatShakes/GamePlay.png", alt: "CatShakes gameplay - two cat arms meeting for a handshake", caption: "Gameplay" },
            { src: "Imgs/Minigame/CatShakes/HomeScene.PNG", alt: "CatShakes main menu with Play, Speed Run and Settings", caption: "Main Menu" },
            { src: "Imgs/Minigame/CatShakes/LeaderBoard.png", alt: "CatShakes Speedrun leaderboard", caption: "Speedrun Leaderboard" },
            { src: "Imgs/Minigame/CatShakes/ToolGenLevel.png", alt: "CatShakes custom level editor window in Unity", caption: "Custom Level Editor", fit: "contain" }
        ],
        shortDesc: "Two-cat arm puzzle (Sokoban-style) on a pure grid-logic core: stretch snake-like arms to push barrels, flip switches, beat closing doors and shake hands. Ships with a BFS solver, a level generator and a custom Unity level editor.",
        details: {
            overview: "CatShakes is a mobile pixel-art logic puzzle for Android. Two cats stand on a grid and each has a snake-like arm that grows one cell per move, up to a per-level step budget. The goal is to make the two hands meet on the same cell (the handshake). Along the way the arms push wooden barrels, shove the other cat's whole body, press hold-switches and toggle-switches, and race closing doors: a door that shuts on an arm cuts it and leaves a severed hand that behaves like a barrel, and a door that shuts on a cat's body loses the level. The game has a 35-level campaign (tutorial + 34 levels), a Speedrun mode with a leaderboard, and a skin shop unlocked with rewarded ads.",
            role: {
                title: "Solo Game Developer",
                duration: "10/2026 (In development)",
                company: "Drunkboy (Personal Studio)",
                platform: "Android (Mobile)",
                engine: "Unity 6 (6000.3, C#)",
                team: "Solo"
            },
            links: [
                { name: "GitHub Repository", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh/MemeShakes" },
                { name: "GitHub Profile", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh" }
            ],
            contributions: [
                "Architected an authoritative grid core (GridManager, GridSpace, GridEntity) where every puzzle rule is decided on Vector2Int data with HashSet/Dictionary lookups - no Rigidbody2D or Physics2D - and visual components only mirror those decisions, which keeps behaviour deterministic and testable.",
                "Implemented the snake-arm mechanic (CatArmController): the arm is a list of grid cells that extends, retracts and bends with elbow sprites, spends a per-cat step budget, pushes barrels and pushes the other cat's body together with its whole arm when every target cell is free; the level is won when both hands meet.",
                "Programmed door and switch logic: momentary and toggle switches linked to doors through a linkId, doors whose open state is derived from linked switches (with an inverted 'starts open' mode), crushing of barrels, arm cutting that leaves a severed hand acting like a barrel, and a lose state when a door crushes a cat.",
                "Built Undo/Reset with immutable GameStateSnapshot objects (arm paths, cat roots, barrels, severed hands, toggle states) on an undo stack; door states are not stored because they are re-derived from the switches.",
                "Created a multi-touch hybrid input scheme: dragging from a cat moves its hand cell by cell (dragging back retracts), swiping anywhere moves the selected cat, and a tap on an adjacent cell moves the hand; every finger is tracked independently so two fingers can steer both cats at once, using the Input System with a legacy-input fallback.",
                "Developed a data-driven content pipeline: 35 levels stored as LevelDataSO ScriptableObjects (grid from 8x3 up to 14x10) with a Validate() pass, ASCII-layout import, and a custom Level Editor window with click-to-paint, live validation, ASCII import/export, one-click play-test, SerializedObject-based Undo/Redo and a reader that measures a level picture dropped into the window.",
                "Wrote an editor-side puzzle solver and level generator: a breadth-first search over the complete game state finds the shortest solution (stored as text such as 'A:UU B:LLDDDDRR A:UR B:LLUUUL'), and the generator invents random levels by difficulty, keeping only provably solvable ones whose solution uses enough distinct mechanics.",
                "Implemented the meta layer: Speedrun mode with one continuous timer (load screens and fades excluded) and a saved best time, a server-less leaderboard that is deterministic from a seed plus the current date, a 6-skin shop (Meme Cat, Tabby Cat, Patch Cat, Banana Cat, Scream Cat, House Aura) unlocked through Unity LevelPlay rewarded ads with per-skin progress, an ad-free test build switch, and an analytics wrapper with optional Firebase.",
                "Added game feel with code-generated assets: pixel particle bursts (PixelFx), a victory effect, event-driven sound effects that bind to the grid automatically, a 16-bar chiptune loop composed in code and rendered to WAV by an editor tool, a camera fitter for any aspect ratio, and a one-click scene setup tool."
            ],
            techStack: [
                "Unity 6", "C#", "URP 2D", "Grid / Sokoban Logic", "ScriptableObjects", "Custom Editor Window",
                "BFS Puzzle Solver", "Procedural Level Generation", "Multi-touch Input (Input System)", "Undo Snapshots",
                "Event-driven Architecture", "Unity LevelPlay (Rewarded Ads)", "Firebase Analytics (optional)",
                "Procedural Audio & Pixel FX", "TextMeshPro"
            ],
            techNote: {
                title: "Tech Note – Pure Grid Logic, BFS Solver & Level Generation",
                description: "Rule engine, automated level validation and content tooling.",
                points: [
                    "Pure Grid Rules: GridManager resolves every move as data (bounds, walls, doors, arm cells, barrel push, cat push) and returns a MoveOutcome enum (Extended, ExtendedAndPushedBarrel, Retracted, BlockedByWall, BlockedByClosedDoor...), so UI, sound and effects subscribe to events (MoveResolved, ArmCut, DoorChanged, SwitchChanged, ObjectPushed, Won, Lost) instead of polling.",
                    "BFS Solver: PuzzleModel is a UnityEngine-free copy of the rules, so the solver can explore the full state space (both arms, cat roots, barrels, severed hands, toggles) with a visited set and a state cap, returning the shortest solution or proving the level unsolvable.",
                    "Generator With Guarantees: random layouts are accepted only if the solver proves them solvable, the step budgets are as small as the puzzle allows, and SolutionStats shows the solution needs enough different mechanics (barrel push, cat push, arm cut, toggle, hold-switch, door).",
                    "Deterministic Fake Leaderboard: ranks are computed from a fixed seed and the date - elite players follow an exponential learning curve and a crowd grows daily - so every device shows the same board with no backend."
                ]
            }
        }
    },
    {
        id: "royal-puzzle",
        title: "Royal Puzzle",
        category: "anti-stress",
        collection: "Anti-stress Games (BonBonGame)",
        storeUrl: "",
        downloads: "In Testing",
        gradient: "linear-gradient(135deg, #6d28d9, #f59e0b)",
        icon: "fa-solid fa-chess-rook",
        image: "Imgs/Minigame/RoyalPuzzle/RoyalPuzzle.png",
        fallbackImage: "Imgs/Minigame/RoyalPuzzle/Demogame.PNG",
        gallery: [
            { src: "Imgs/Minigame/RoyalPuzzle/Demogame.PNG", alt: "Royal Puzzle gameplay - ice cannon aiming at a tower of cans", caption: "Gameplay" },
            { src: "Imgs/Minigame/RoyalPuzzle/Demo2.PNG", alt: "Royal Puzzle gameplay screenshot 2", caption: "Gameplay" },
            { src: "Imgs/Minigame/RoyalPuzzle/Demo3.PNG", alt: "Royal Puzzle gameplay screenshot 3", caption: "Gameplay" },
            { src: "Imgs/Minigame/RoyalPuzzle/ToolGenlevel.PNG", alt: "Royal Puzzle custom level editor window", caption: "Custom Level Editor", fit: "contain" }
        ],
        shortDesc: "Minigame of the Anti-stress Games app (in testing): a physics cannon puzzle (internal name RoyalSmash) where you fire balls to knock every block off the board, using TNT chains, shattering glass and jars, rainbow boosters and collectible cannon skins.",
        details: {
            overview: "Royal Puzzle is a minigame inside BonBonGame's Anti-stress Games app, currently in the testing and UI polish stage. It is a 3D physics cannon puzzle. The player holds the screen to aim and fire cannonballs along a ballistic arc at structures of stacked blocks standing on a pedestal. A block counts as cleared when it breaks, explodes or falls off the board, and a level is won once every block is gone. Levels mix cans, crates, planks, stone, glass, ink jars and TNT, so every shot is a small physics decision. The game also includes boosters, a coin economy and a gacha system for unlocking cannon skins.",
            role: {
                title: "Game Developer",
                duration: "2026 (Testing & UI polish)",
                company: "BonBonGame",
                platform: "Mobile (Unity)",
                engine: "Unity 6 (C#)",
                team: "BonBonGame Team"
            },
            links: [
                { name: "GitHub Profile", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh" }
            ],
            contributions: [
                "Built the core game loop: hold-to-fire input through the Input System, cannon aiming from a projectile-launch formula (v = d/t - 0.5*g*t) and a fire-rate limiter.",
                "Implemented win/lose rules: a block is cleared when it shatters, detonates or leaves every board footprint (tested in each board's own rotated frame); win once all blocks are cleared, lose when ammo runs out and nothing is still in flight; 1-3 star rating from leftover balls.",
                "Programmed block behaviours on PhysX rigidbodies: TNT with radial explosion force and chain detonation, shattering glass and ink jars, stone that breaks on landing, and an automatic despawn of cleared blocks.",
                "Added boosters: More Bullet (+1 ball) and Rainbow, a special ball that triggers a BFS cascade through connected blocks of the same type with rising-pitch audio.",
                "Created a data-driven content pipeline: 30 levels stored as ScriptableObjects (multi-board layouts, block palette, ball allowance) authored in a custom Unity Level Editor window, plus Editor tools that bake meshes, textures, audio and UI.",
                "Developed the meta layer: coin economy, weighted gacha packs that drop skin fragments, 7 unlockable cannon skins that change the model, ball material, trail and impact VFX, and animated victory/defeat popups.",
                "Decoupled gameplay, UI and economy with a static event bus (ammo, level completed/failed, gold changed) and singleton managers."
            ],
            techStack: [
                "Unity 6", "C#", "URP", "PhysX 3D Physics", "Input System", "ScriptableObjects",
                "Custom Editor Tools", "Event Bus (Observer)", "Coroutine Animation", "Particle System VFX",
                "Gacha / Economy System", "TextMeshPro"
            ],
            techNote: {
                title: "Tech Note – Ballistic Aiming, Block Physics & Data-Driven Levels",
                description: "How shots, destruction and level authoring are wired together.",
                points: [
                    "Ballistic Aiming: The launch velocity is solved for a fixed flight time derived from ball speed, so the cannon barrel and the fired ball always follow the same parabolic arc to the touched point.",
                    "Destruction Rules: TNT uses OverlapSphere + AddExplosionForce and chains to neighbouring TNT with a short delay; glass and jars shatter on first contact; stone only breaks when it lands, which rewards knocking structures off the board.",
                    "Rainbow Cascade: A BFS over blocks of the same kind within a contact radius clears up to 35 blocks, one every 0.06s, with the audio pitch rising along the chain.",
                    "Level Pipeline: RSLevelDataSO stores block prefab, transform, colour and custom collider data per block plus extra boards; a custom editor window with top-down and front-view grids bakes layouts into these assets."
                ]
            }
        }
    },
    {
        id: "fish-eat-fish",
        title: "FishEatFish",
        category: "2-4-player",
        collection: "2 & 4 Player Games",
        storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi",
        downloads: "Part of 10M+ Suite",
        gradient: "linear-gradient(135deg, #0284c7, #0369a1)",
        icon: "fa-solid fa-fish-fins",
        image: "Imgs/Minigame/FishEatFish.png",
        fallbackImage: "Imgs/2Player.png",
        shortDesc: "Built an independent Dual-Virtual Joystick input layout allowing simultaneous 2-player local competition on a single device with autonomous ambient fish AI and dynamic scaling.",
        details: {
            overview: "FishEatFish is a fast-paced local multiplayer arcade game featured in the hit collection '2 & 4 Player Games' (over 10M+ downloads on Google Play). Two players compete on a shared device screen to devour smaller fish, grow in scale, and evade apex predators before the match timer expires.",
            role: {
                title: "Game Developer",
                duration: "02/01/2024 - 02/05/2024",
                company: "BonBonGame",
                platform: "Android / iOS / WebGL",
                engine: "Unity (C#)",
                team: "4 Members"
            },
            links: [
                { name: "Google Play (10M+ Suite)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" },
                { name: "GitHub Profile", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh" }
            ],
            contributions: [
                "Built an independent Dual-Virtual Joystick input layout allowing simultaneous 2-player local competition on a single device without multi-touch conflicts.",
                "Implemented real-time dynamic character scaling mechanics and score calculation based on final size and countdown timer.",
                "Designed autonomous steering behaviors for ambient fish schools, incorporating dynamic vision cone queries to detect threats, pursue smaller prey, and evade larger predators.",
                "Applied Object Pooling for continuous entity spawning and leveraged the Observer pattern to decouple feeding events and UI updates, eliminating runtime garbage collection (GC) spikes."
            ],
            techStack: [
                "Unity (2D)", "C#", "Dual-Virtual Joystick", "Autonomous Steering AI",
                "Vision Cone Queries", "Object Pooling", "Observer Pattern", "Dynamic Scaling", "Local Multiplayer"
            ],
            techNote: {
                title: "Tech Note – Vision Cone AI & Zero-GC Object Pooling",
                description: "Autonomous fish schooling behaviors and garbage-free entity management on low-end mobile devices.",
                points: [
                    "Vision Cone Query: Simulated natural aquatic vision by computing vector dot-products between fish forward heading and nearby entity positions within configurable FoV angles.",
                    "Zero-GC Pooling Lifecycle: Pre-allocated predator and prey entity instances in typed pools, resetting positions and state on spawn to maintain steady 60 FPS without garbage collector pauses.",
                    "Decoupled Observer Event Bus: Feeding events emit signals consumed independently by the audio manager, score manager, and visual particle FX."
                ]
            }
        }
    },
    {
        id: "bank-heist",
        title: "BankHeist",
        category: "2-4-player",
        collection: "2 & 4 Player Games",
        storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi",
        downloads: "Part of 10M+ Suite",
        gradient: "linear-gradient(135deg, #b45309, #d97706)",
        icon: "fa-solid fa-sack-dollar",
        image: "Imgs/Minigame/BankHeist.png",
        fallbackImage: "Imgs/2Player.png",
        shortDesc: "Engineered local multiplayer mechanics for 2–4 players featuring a resource collection and deposit loop at a safe-zone getaway vehicle with dynamic traffic obstacle spawners.",
        details: {
            overview: "BankHeist delivers intense 2 to 4-player competitive local action on a single screen. Players race into a central vault to collect money bags and return them safely to their getaway vehicle while avoiding continuous traffic obstacles and rival collisions that cause cash to drop.",
            role: {
                title: "Game Developer",
                duration: "03/13/2024 - 03/15/2024",
                company: "BonBonGame",
                platform: "Android / iOS",
                engine: "Unity (C#)",
                team: "4 Members"
            },
            links: [
                { name: "Google Play (10M+ Suite)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" },
                { name: "GitHub Profile", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh" }
            ],
            contributions: [
                "Engineered local multiplayer mechanics for 2–4 players featuring a resource collection and deposit loop at a safe-zone getaway vehicle.",
                "Programmed an automated looping traffic obstacle spawner with randomized vehicle speeds and lane intervals.",
                "Implemented physics trigger interactions handling knockback states, dynamic inventory drops on vehicle impact, and real-time leaderboard win conditions.",
                "Optimized 4-corner virtual joystick layout allowing 4 players to simultaneously play on a single tablet or phone display."
            ],
            techStack: [
                "Unity (2D)", "C#", "2D Physics & RigidBody", "Looping Traffic Spawner",
                "Knockback Physics", "Multi-Touch Partitioning", "Leaderboard System"
            ],
            techNote: {
                title: "Tech Note – Multi-Touch Management & Traffic Physics Loop",
                description: "Handling 4 concurrent multi-touch inputs and physical knockback triggers.",
                points: [
                    "Touch Screen Quadrant Partitioning: Isolated multi-touch finger pointers to dedicated screen quarters to prevent pointer drift across opposing players.",
                    "Kinematic Obstacle Loop: Automated traffic obstacle recycling using trigger volume boundaries to avoid instantiating new game objects during active gameplay.",
                    "Physics Knockback Impulse: Instantaneous impulse applied on vehicle impact with scatter angles calculated relative to the impact normal."
                ]
            }
        }
    },
    {
        id: "tank-stars",
        title: "TankStars",
        category: "2-4-player",
        collection: "2 & 4 Player Games",
        storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi",
        downloads: "Part of 10M+ Suite",
        gradient: "linear-gradient(135deg, #15803d, #16a34a)",
        icon: "fa-solid fa-shield-halved",
        image: "Imgs/Minigame/TankStars.png",
        fallbackImage: "Imgs/2Player.png",
        shortDesc: "Designed a centralized Turn Manager orchestrating round cycles, cooldown tracking, dual joystick controls, and custom parabolic projectile trajectory prediction.",
        details: {
            overview: "TankStars is a tactical turn-based artillery battle game where players control combat tanks on destructible terrain. Featuring dual joystick controls for positioning and gun elevation, players calculate ballistic trajectories to strike opponents with an arsenal of 4 distinct area-of-effect (AoE) weapons.",
            role: {
                title: "Game Developer",
                duration: "02/21/2024 - 04/04/2024",
                company: "BonBonGame",
                platform: "Android / iOS",
                engine: "Unity (C#)",
                team: "4 Members"
            },
            links: [
                { name: "Google Play (10M+ Suite)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" },
                { name: "GitHub Profile", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh" }
            ],
            contributions: [
                "Designed a centralized Turn Manager orchestrating round cycles, cooldown tracking, and an arsenal of 4 distinct player skills with custom area-of-effect (AoE) damage profiles.",
                "Integrated a dual-joystick configuration (positional navigation and aim/power adjustments).",
                "Developed custom parabolic projectile trajectory prediction algorithms with visual line casting prior to impact.",
                "Engineered radial damage falloff based on proximity to shell impact points."
            ],
            techStack: [
                "Unity (2D)", "C#", "Turn Manager FSM", "Ballistic Physics",
                "LineRenderer", "AoE Damage System", "Dual Joystick"
            ],
            techNote: {
                title: "Tech Note – Ballistic Trajectory Line Casting & Turn FSM",
                description: "Real-time trajectory prediction mathematics and round management.",
                points: [
                    "Trajectory Line Casting: Computed position vectors along the parabolic equation r(t) = r0 + v0*t + 0.5*g*t^2, rendered continuously via LineRenderer before trigger release.",
                    "Finite State Machine: Structured Turn Manager states: RoundStart -> PlayerTurn -> Aiming -> ProjectileInFlight -> ImpactResolution -> NextTurn.",
                    "Radial AoE Damage: Evaluated overlap circles at impact, delivering inverse-square damage falloff and physics impulses to affected tanks."
                ]
            }
        }
    },
    {
        id: "stickman-hook",
        title: "StickmanHook",
        category: "gameboy",
        collection: "GameBoy: 100+ Mini Games",
        storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi",
        downloads: "Part of 1M+ Suite",
        gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
        icon: "fa-solid fa-person-running",
        image: "Imgs/Minigame/StickmanHook.png",
        fallbackImage: "Imgs/stickman.png",
        shortDesc: "Integrated DistanceJoint2D with dynamic LineRenderer visuals to simulate elastic rope swinging; computed centripetal force, momentum, and angular velocity.",
        details: {
            overview: "StickmanHook is an acrobatic physics swinging platformer included in 'GameBoy: 100+ Mini Games' (1M+ downloads on Google Play). Players latch grappling hooks onto anchor nodes to swing past aerial hazards, convert centripetal force into forward momentum, and catapult past the finish line.",
            role: {
                title: "Game Developer",
                duration: "08/16/2025 - 09/18/2025",
                company: "BonBonGame",
                platform: "Android / iOS",
                engine: "Unity (C#)",
                team: "3 Members"
            },
            links: [
                { name: "Google Play (1M+ Suite)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi" },
                { name: "GitHub Profile", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh" }
            ],
            contributions: [
                "Integrated DistanceJoint2D with dynamic LineRenderer visuals to simulate elastic rope swinging.",
                "Computed centripetal force, momentum, and angular velocity to deliver fluid, momentum-based flight dynamics.",
                "Built interactive anchor point detection algorithms using proximity raycasts to calculate the optimal grappling hook target upon touch input, ensuring precise swing engagement around aerial obstacles.",
                "Implemented trampolines, boost pads, and obstacle collision dynamics."
            ],
            techStack: [
                "Unity 2D", "C#", "DistanceJoint2D", "LineRenderer Visuals",
                "Angular Momentum Physics", "Proximity Raycasts", "Custom PhysicsMaterial2D"
            ],
            techNote: {
                title: "Tech Note – Dynamic Rope Mechanics & Proximity Target Raycasting",
                description: "Delivering intuitive, momentum-based swinging feel.",
                points: [
                    "Interactive Anchor Scoring: Evaluated available hook nodes within an overlap radius based on forward angular alignment and distance, picking the optimal anchor instantly upon touch.",
                    "DistanceJoint2D Configuration: Configured joint distance and spring frequencies to create responsive rope tension while preserving angular velocity upon release.",
                    "Procedural LineRenderer Visuals: Added elastic rope animations with sine-wave damping upon hook deployment."
                ]
            }
        }
    },
    {
        id: "stickman-escape",
        title: "StickmanEscape",
        category: "gameboy",
        collection: "GameBoy: 100+ Mini Games",
        storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi",
        downloads: "Part of 1M+ Suite",
        gradient: "linear-gradient(135deg, #0f766e, #14b8a6)",
        icon: "fa-solid fa-user-secret",
        image: "Imgs/Minigame/StickmanEscape.png",
        fallbackImage: "Imgs/stickman.png",
        youtubeVideoId: "4fVC-3V-h8Q",
        shortDesc: "Developed 2-player cooperative puzzle gameplay framework with dual-character triggers, pressure plates, patrol AI with FoV raycasts, and multi-target camera.",
        details: {
            overview: "StickmanEscape is a cooperative stealth and escape puzzle game where two players must work together to escape prison blocks. Players solve coordinated pressure-plate puzzles, pull synchronized levers, and evade patrolling guards who scan corridors with raycast-based vision cones.",
            role: {
                title: "Game Developer",
                duration: "10/02/2025 - 11/26/2025",
                company: "BonBonGame",
                platform: "Android / iOS",
                engine: "Unity (C#)",
                team: "3 Members"
            },
            links: [
                { name: "Google Play (1M+ Suite)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi" },
                { name: "YouTube Gameplay", icon: "fa-brands fa-youtube", url: "https://www.youtube.com/watch?v=4fVC-3V-h8Q" },
                { name: "GitHub Profile", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh" }
            ],
            contributions: [
                "Developed a 2-player cooperative puzzle gameplay framework with dual-character triggers, pressure plate activations, and synchronized swinging mechanics required to breach exit doors.",
                "Programmed patrol AI using waypoint systems and raycast-based Field-of-View (FoV) detection.",
                "Configured a dynamic multi-target tracking camera system that automatically adjusts zoom and framing based on player distance.",
                "Designed interactive security devices: laser tripwires, camera sensors, and timed pressure doors."
            ],
            techStack: [
                "Unity 2D", "C#", "Waypoint Patrol AI", "Field-of-View (FoV) Raycasting",
                "Multi-Target Camera System", "Cooperative Triggers", "Puzzle Logic"
            ],
            techNote: {
                title: "Tech Note – Multi-Target Bounding Camera & FoV Patrol AI",
                description: "Seamless 2-player framing and guard stealth detection.",
                points: [
                    "Multi-Target Camera Framing: Tracked midpoint between both players and dynamically adjusted camera orthographic size to guarantee both remain in viewport.",
                    "FoV Raycast Sweeps: Cast radial raycasts from guard nodes, detecting obstructions and wall occlusions before raising alarm triggers."
                ]
            }
        }
    },
    {
        id: "exima",
        title: "Exima",
        category: "gamejam",
        collection: "Game Jam 2026 (Third Prize)",
        storeUrl: "https://github.com/CauBeLapTrinh/GameJam-2026",
        downloads: "Third Prize (PTIT)",
        gradient: "linear-gradient(135deg, #1e1b4b, #3b0764)",
        icon: "fa-solid fa-ghost",
        image: "Imgs/Minigame/Exima/Home.PNG",
        fallbackImage: "Imgs/Minigame/Exima/Icon.png",
        secondaryImage: "Imgs/Minigame/Exima/Icon.png",
        shortDesc: "Engineered a 2D psychological puzzle-platformer exploring inner fears with Spine 2D skeletal animation, dynamic collider crawling/dashing, pursuit AI, and URP 2D lighting.",
        details: {
            overview: "Exima is an award-winning psychological puzzle-platformer created during the PTIT Game Jam 2026. The game takes players on an emotional journey through chronological human fears: from adult corporate burnout and deadline anxiety at 3 AM, plunging into childhood phobias of darkness and ghosts, to confronting school bullies in dim high school hallways.",
            role: {
                title: "Lead Game Developer",
                duration: "01/2026 - 02/2026 (Hackathon)",
                company: "PTIT Game Jam 2026",
                platform: "PC / WebGL",
                engine: "Unity (C#)",
                team: "3 Members"
            },
            links: [
                { name: "GitHub Repository", icon: "fa-brands fa-github", url: "https://github.com/CauBeLapTrinh/GameJam-2026" },
                { name: "Game Jam Info", icon: "fa-solid fa-trophy", url: "https://www.facebook.com/gamejam.vn/posts/pfbid0TGtKK9hNQeQQ3yshVtT22bY8yJuuWSnM4wvtB1oPQc8471k5q3m2H8WKbmuNpuPWl" }
            ],
            contributions: [
                "Architected a responsive 2D platformer movement system featuring jump buffering, variable fall gravity, dash mechanics, and dynamic box collider resizing for crawling through narrow vents.",
                "Developed pursuit enemy AI (Bully) with state-driven behaviors (patrol, chase, grab, and stun interruption when hit by thrown weapons).",
                "Designed atmospheric environmental puzzles incorporating interactive light switches, flashlights, falling obstacles, and banana slip traps.",
                "Implemented an extensible narrative dialogue engine powered by ScriptableObjects (CVSequence, CVStep) with dynamic camera panning via DOTween.",
                "Integrated Model Context Protocol (MCP for Unity) to automate boilerplate code, accelerating prototype iteration within strict 48-hour game jam constraints."
            ],
            techStack: [
                "Unity 2D", "C#", "Spine 2D Animation", "Universal Render Pipeline (URP 2D Light)",
                "Dynamic Collider Resizing", "State Machine AI", "DOTween", "ScriptableObject Dialogue", "Additive Scene Loading", "Model Context Protocol (MCP)"
            ],
            techNote: {
                title: "Tech Note – Spine Dynamic Collider Sync & Atmospheric 2D Lighting",
                description: "Synchronizing skeletal animations with dynamic 2D physics and real-time horror lighting.",
                points: [
                    "Dynamic Collider Re-sizing: Dynamically interpolated BoxCollider2D bounds and offsets during Crawl and Dash states, enabling seamless movement through low clearance obstacles.",
                    "Atmospheric URP 2D Lighting: Utilized URP Global Light 2D combined with directional SpotLights attached to the player to establish suspense and reveal invisible spectral hazards.",
                    "AI-Accelerated Prototyping: Leveraged MCP for Unity and LLMs to scaffold scene-flow FSM and debug physics interactions, saving 40% development time during the hackathon."
                ]
            }
        }
    }
];