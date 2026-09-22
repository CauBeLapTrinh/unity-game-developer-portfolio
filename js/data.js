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
                downloads: "10M+ Downloads",
                gradient: "linear-gradient(135deg, #0284c7, #0369a1)",
                icon: "fa-solid fa-fish-fins",
                image: "Imgs/MiniGame/fisheatfish.png",
                fallbackImage: "Imgs/2Player.png",
                shortDesc: "Built an independent Dual-Virtual Joystick input layout allowing simultaneous 2-player local competition on a single device with autonomous ambient fish AI and dynamic scaling.",
                details: {
                    overview: "FishEatFish is a fast-paced local multiplayer arcade game featured in the hit collection '2 & 4 Player Games' (over 10M+ downloads on Google Play). Two players compete on a shared device screen to devour smaller fish, grow in scale, and evade apex predators before the match timer expires.",
                    role: {
                        title: "Game Developer",
                        duration: "02/2024 - 12/2024",
                        company: "BonBonGame",
                        platform: "Android / iOS / WebGL",
                        engine: "Unity (C#)",
                        team: "4 Members"
                    },
                    links: [
                        { name: "Google Play (10M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" },
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
                downloads: "10M+ Downloads",
                gradient: "linear-gradient(135deg, #b45309, #d97706)",
                icon: "fa-solid fa-sack-dollar",
                image: "Imgs/MiniGame/bankheist.png",
                fallbackImage: "Imgs/2Player.png",
                shortDesc: "Engineered local multiplayer mechanics for 2–4 players featuring a resource collection and deposit loop at a safe-zone getaway vehicle with dynamic traffic obstacle spawners.",
                details: {
                    overview: "BankHeist delivers intense 2 to 4-player competitive local action on a single screen. Players race into a central vault to collect money bags and return them safely to their getaway vehicle while avoiding continuous traffic obstacles and rival collisions that cause cash to drop.",
                    role: {
                        title: "Game Developer",
                        duration: "02/2024 - 12/2024",
                        company: "BonBonGame",
                        platform: "Android / iOS",
                        engine: "Unity (C#)",
                        team: "4 Members"
                    },
                    links: [
                        { name: "Google Play (10M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" },
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
                id: "tank-war",
                title: "TankWar",
                category: "2-4-player",
                collection: "2 & 4 Player Games",
                storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi",
                downloads: "10M+ Downloads",
                gradient: "linear-gradient(135deg, #15803d, #16a34a)",
                icon: "fa-solid fa-shield-halved",
                image: "Imgs/MiniGame/tankwar.png",
                fallbackImage: "Imgs/2Player.png",
                shortDesc: "Designed a centralized Turn Manager orchestrating round cycles, cooldown tracking, dual joystick controls, and custom parabolic projectile trajectory prediction.",
                details: {
                    overview: "TankWar is a tactical turn-based artillery battle game where players control combat tanks on destructible terrain. Featuring dual joystick controls for positioning and gun elevation, players calculate ballistic trajectories to strike opponents with an arsenal of 4 distinct area-of-effect (AoE) weapons.",
                    role: {
                        title: "Game Developer",
                        duration: "02/2024 - 12/2024",
                        company: "BonBonGame",
                        platform: "Android / iOS",
                        engine: "Unity (C#)",
                        team: "4 Members"
                    },
                    links: [
                        { name: "Google Play (10M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" },
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
                downloads: "1M+ Downloads",
                gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                icon: "fa-solid fa-person-running",
                image: "Imgs/MiniGame/stickmanhook.png",
                fallbackImage: "Imgs/stickman.png",
                shortDesc: "Integrated DistanceJoint2D with dynamic LineRenderer visuals to simulate elastic rope swinging; computed centripetal force, momentum, and angular velocity.",
                details: {
                    overview: "StickmanHook is an acrobatic physics swinging platformer included in 'GameBoy: 100+ Mini Games' (1M+ downloads on Google Play). Players latch grappling hooks onto anchor nodes to swing past aerial hazards, convert centripetal force into forward momentum, and catapult past the finish line.",
                    role: {
                        title: "Game Developer",
                        duration: "01/2025 - Present",
                        company: "BonBonGame",
                        platform: "Android / iOS",
                        engine: "Unity (C#)",
                        team: "3 Members"
                    },
                    links: [
                        { name: "Google Play (1M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi" },
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
                downloads: "1M+ Downloads",
                gradient: "linear-gradient(135deg, #0f766e, #14b8a6)",
                icon: "fa-solid fa-user-secret",
                image: "Imgs/MiniGame/stickmanescape.png",
                fallbackImage: "Imgs/stickman.png",
                shortDesc: "Developed 2-player cooperative puzzle gameplay framework with dual-character triggers, pressure plates, patrol AI with FoV raycasts, and multi-target camera.",
                details: {
                    overview: "StickmanEscape is a cooperative stealth and escape puzzle game where two players must work together to escape prison blocks. Players solve coordinated pressure-plate puzzles, pull synchronized levers, and evade patrolling guards who scan corridors with raycast-based vision cones.",
                    role: {
                        title: "Game Developer",
                        duration: "01/2025 - Present",
                        company: "BonBonGame",
                        platform: "Android / iOS",
                        engine: "Unity (C#)",
                        team: "3 Members"
                    },
                    links: [
                        { name: "Google Play (1M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi" },
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
                id: "bullet-bros",
                title: "BulletBros",
                category: "2-4-player",
                collection: "2 & 4 Player Games",
                storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi",
                downloads: "10M+ Downloads",
                gradient: "linear-gradient(135deg, #e11d48, #be123c)",
                icon: "fa-solid fa-crosshairs",
                image: "Imgs/MiniGame/bulletbros.png",
                fallbackImage: "Imgs/2Player.png",
                shortDesc: "Twin-stick platform shooter featuring weapon recoil physics that propels player movement, 2D ragdoll knockouts, and local arena multiplayer.",
                details: {
                    overview: "BulletBros brings arcade gunplay to local multiplayer. Players utilize weapon recoil to propel themselves across platforms and fire an assortment of weapons (shotguns, snipers, rockets) in chaotic arena battles.",
                    role: {
                        title: "Game Developer",
                        duration: "04/2024 - 12/2024",
                        company: "BonBonGame",
                        platform: "Android / iOS",
                        engine: "Unity (C#)",
                        team: "4 Members"
                    },
                    links: [
                        { name: "Google Play (10M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" }
                    ],
                    contributions: [
                        "Implemented weapon recoil impulse physics that dynamically affects player airborne trajectory.",
                        "Created 2D ragdoll hit reactions and knockouts upon fatal projectile impacts.",
                        "Built weapon spawn crates with randomized weapon tiers and custom ammunition types."
                    ],
                    techStack: [
                        "Unity 2D", "C#", "Recoil Physics", "Ragdoll 2D", "Weapon System", "Local Multiplayer"
                    ],
                    techNote: {
                        title: "Tech Note – Recoil-Driven Physics & Ragdoll Transitions",
                        description: "Satisfying combat feedback through impulse physics and ragdolls.",
                        points: [
                            "Recoil Vector Calculation: Inverted barrel aim vector and applied force impulses directly to player RigidBody2D.",
                            "Ragdoll Blending: Swapped sprite animator to multi-bone RigidBody2D limbs with angular limits upon death."
                        ]
                    }
                }
            },
            {
                id: "red-blue-adventure",
                title: "RedBlueAdventure",
                category: "2-4-player",
                collection: "2 & 4 Player Games",
                storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi",
                downloads: "10M+ Downloads",
                gradient: "linear-gradient(135deg, #2563eb, #dc2626)",
                icon: "fa-solid fa-fire-flame-curved",
                image: "Imgs/MiniGame/redblueadventure.png",
                fallbackImage: "Imgs/2Player.png",
                shortDesc: "Cooperative element-switching puzzle platformer utilizing 2D Physics Layer Collision Matrices to separate fire and water hazard interactions.",
                details: {
                    overview: "RedBlueAdventure requires synchronized cooperation between Red (Fire) and Blue (Water) characters. Each player can safely traverse their own element while perishing in the other, requiring mutual coordination to open gates and finish stages.",
                    role: {
                        title: "Game Developer",
                        duration: "04/2024 - 12/2024",
                        company: "BonBonGame",
                        platform: "Android / iOS",
                        engine: "Unity (C#)",
                        team: "4 Members"
                    },
                    links: [
                        { name: "Google Play (10M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.two.player.games.with.friends&hl=vi" }
                    ],
                    contributions: [
                        "Engineered dual-element collision filtering using Unity 2D Physics layers and trigger matrices.",
                        "Created responsive moving platform physics that accurately transfer kinetic momentum to standing players.",
                        "Developed level completion verification system ensuring both players survive and touch goal portals."
                    ],
                    techStack: [
                        "Unity 2D", "C#", "Layer Collision Matrix", "Kinematic Platforms", "Elemental Triggers", "Co-op Mechanics"
                    ],
                    techNote: {
                        title: "Tech Note – Layer Collision Matrix & Kinetic Platform Parenting",
                        description: "Clean hazard separation without runtime tag query overhead.",
                        points: [
                            "Matrix Optimization: Used Unity's Layer Collision Matrix to isolate elemental interactions at the physics engine level.",
                            "Kinematic Platform Friction: Preserved player momentum when jumping off moving platforms via inherited velocity calculation."
                        ]
                    }
                }
            },
            {
                id: "draw-to-fight",
                title: "DrawToFight",
                category: "gameboy",
                collection: "GameBoy: 100+ Mini Games",
                storeUrl: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi",
                downloads: "1M+ Downloads",
                gradient: "linear-gradient(135deg, #ca8a04, #ea580c)",
                icon: "fa-solid fa-pen-nib",
                image: "Imgs/MiniGame/drawtofight.png",
                fallbackImage: "Imgs/stickman.png",
                shortDesc: "Dynamic gesture-drawing combat system converting touch vector strokes into real-time EdgeCollider2D meshes with Catmull-Rom spline smoothing.",
                details: {
                    overview: "DrawToFight is a creative fighting game where players draw attack weapons and punch strokes directly on screen. Touch inputs are evaluated in real time and converted into physics colliders and animated attacks.",
                    role: {
                        title: "Game Developer",
                        duration: "01/2025 - Present",
                        company: "BonBonGame",
                        platform: "Android / iOS",
                        engine: "Unity (C#)",
                        team: "3 Members"
                    },
                    links: [
                        { name: "Google Play (1M+)", icon: "fa-brands fa-google-play", url: "https://play.google.com/store/apps/details?id=com.bonbongame.stickman.world.games&hl=vi" }
                    ],
                    contributions: [
                        "Developed real-time stroke-to-mesh generator turning touch points into 2D polygon colliders with smoothed Catmull-Rom splines.",
                        "Implemented combat hit-stop effects, screen shakes, and damage calculations proportional to stroke length and speed.",
                        "Integrated AI opponent attack patterns with randomized defensive reactions."
                    ],
                    techStack: [
                        "Unity 2D", "C#", "Stroke-to-Mesh Generation", "Catmull-Rom Splines", "EdgeCollider2D", "Combat Juice & Camera Shake"
                    ],
                    techNote: {
                        title: "Tech Note – Real-Time Stroke to EdgeCollider2D Generation",
                        description: "Transforming touch gesture points into smooth physics-enabled attack shapes.",
                        points: [
                            "Catmull-Rom Interpolation: Interpolated intermediate spline points between raw touch events to eliminate jagged corners.",
                            "Dynamic Collider Generation: Built EdgeCollider2D paths dynamically with vertex decimation to preserve 60 FPS."
                        ]
                    }
                }
            }
        ];