/* ========================================================
   MINIGAMES DATASET (Extensible for adding more games later)
   ======================================================== */
const minigamesData = [
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