export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Lesson {
  id: string;
  title: string;
  purpose: string;
  videoPlaceholder?: string;
  hudlUrl?: string;
  formation?: string;
  downAndDistance?: string;
  images?: LessonImage[];
  conceptBreakdown?: string[];
  assignments: { position: string; assignment: string }[];
  coachingPoints: string[];
  commonMistakes: string[];
  executionKeys: { timing: string; communication: string; technique: string };
  quiz: QuizQuestion[];
}

export interface CurriculumModule {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

// =====================================================
// R4 SYSTEM FOUNDATION — The lens through which QBs see the field
// This is NOT a module. It's the operating system for every throw.
// =====================================================

export interface R4FoundationSection {
  id: string;
  title: string;
  content: string[];
  images?: LessonImage[];
  quiz?: QuizQuestion[];
}

export const r4Foundation = {
  title: "The R4 System",
  subtitle: "Read. Recognize. React. Release.",
  tagline: "This is not a module — it is the FOUNDATION of how you see the field. Every throw you make, every read you take, starts here.",
  overview: [
    "The R4 System is the operating system for elite quarterback play. Before you learn a single play, you must understand HOW to process the field. Every NFL and college quarterback who plays at a high level uses this framework — whether they call it R4 or not.",
    "At its core, the R4 System divides the field into CAPPED and UNCAPPED areas based on where the safeties are positioned. This single concept eliminates half the field before the snap and lets you play faster than every other QB on the field.",
    "R4 stands for Read → Recognize → React → Release. These four steps happen in under 3 seconds. If you master this system, you will make decisions faster than 95% of quarterbacks you compete against.",
  ],
  sections: [
    {
      id: "r4-what-is-capped",
      title: "What Is a Capped Side?",
      content: [
        "A CAPPED side of the field has a safety providing over-the-top help. Think of the safety as a 'ceiling' — there is a lid on that side of the field covering deep routes.",
        "When you see a safety shading to one side, that side is CAPPED. Throwing deep into a capped area means your receiver is facing a 2-on-1 disadvantage — the corner AND the safety.",
        "Against a capped side, your weapons are UNDERNEATH: slants, curls, digs, and crossing routes that stay below the safety's zone. The safety caps deep throws but creates space underneath — smart QBs exploit that void.",
        "On 3rd and short, capped-side underneath routes are the highest-percentage throws in football. Dig routes at 12-15 yards are money throws. NEVER throw a go route into a capped side.",
      ],
      images: [
        { src: "/src/assets/field-capped.png", alt: "Capped side of the field — safety providing over-the-top help", caption: "CAPPED SIDE: The safety (S) provides a ceiling over the receivers. Deep throws to this side are high-risk. Attack UNDERNEATH with curls, digs, and crossers." },
      ],
    },
    {
      id: "r4-what-is-uncapped",
      title: "What Is an Uncapped Side?",
      content: [
        "An UNCAPPED side of the field has NO safety help over the top. The defense removed the ceiling — leaving receivers in 1-on-1 matchups with no help.",
        "When you identify an uncapped side, your FIRST thought: can I take a shot? If your receiver has a favorable matchup, pull the trigger. Post routes, go routes, and corner routes are devastating here.",
        "Play-action is the ultimate uncapped-side weapon — it freezes the linebackers and gives your receiver even more separation deep.",
        "If the deep shot isn't there, work back to intermediate and short routes on the uncapped side. They're STILL favorable because the corner is in single coverage with no help.",
        "Elite QBs look OFF the uncapped side first to freeze the safety, then come back to throw. This is how you create explosive plays at the college and NFL level.",
      ],
      images: [
        { src: "/src/assets/field-uncapped.png", alt: "Uncapped side of the field — no safety help over the top", caption: "UNCAPPED SIDE: No safety help deep. Receivers are in 1-on-1 matchups. This is where you take your shots — go routes, posts, and corners are lethal." },
      ],
    },
    {
      id: "r4-coverage-keys",
      title: "R4 vs Every Coverage",
      content: [
        "COVER 0 (No safeties deep): THE ENTIRE FIELD IS UNCAPPED. Every receiver is 1-on-1. Get the ball out fast — hot routes, slants, and fades are all lethal. This is the most aggressive look a defense can show.",
        "COVER 1 (1 high safety): The safety sits in the deep middle. Both outside thirds are UNCAPPED — attack the boundary or field side with vertical routes. The single-high safety can't protect both halves.",
        "COVER 2 (2 high safeties): Both deep halves are CAPPED. The MIDDLE of the field is UNCAPPED — attack with seam routes, posts, and dig routes down the middle. The two safeties create a void between them.",
        "COVER 3 (1 high, 2 deep-third corners): The deep middle is capped. Attack the SEAMS — the holes between the three deep zone defenders. These 'hole shots' are where elite QBs live.",
        "COVER 4 / Quarters (4 deep defenders): All four deep zones are CAPPED. The defense is giving you the short game. Take it — crossing routes, option routes, and the run game. Move the chains.",
      ],
    },
    {
      id: "r4-four-steps",
      title: "The Four Steps: Read → Recognize → React → Release",
      content: [
        "STEP 1 — READ: Before the snap, identify the safety structure. How many safeties are high? Where are they shading? This tells you the coverage shell and where the cap is.",
        "STEP 2 — RECOGNIZE: Based on the safety structure, identify which side is capped and which is uncapped. In 2-high shells, recognize the middle is open. In 1-high, find the uncapped half.",
        "STEP 3 — REACT: Post-snap, CONFIRM your read. Did the safety rotate? Did the coverage change? If it did, adjust your progression immediately. If it didn't, trust your pre-snap plan.",
        "STEP 4 — RELEASE: Deliver the ball. At the top of your drop, you should already know where you're going. Anticipation throws — release the ball BEFORE the receiver makes his break. This is what separates college QBs from high school QBs.",
        "The entire R4 process takes under 3 seconds. Pre-snap (2 seconds): Read + Recognize. Post-snap (1 second): React + Release. If you're holding the ball longer than 3 seconds, you haven't mastered R4 yet.",
      ],
    },
  ] as R4FoundationSection[],
  quiz: [
    { question: "What does R4 stand for?", options: ["Run, Rush, Route, Release", "Read, Recognize, React, Release", "Read, Run, React, Return", "Route, Read, Release, Run"], correctIndex: 1 },
    { question: "What does 'capped' mean in the R4 System?", options: ["The QB is wearing a cap", "A safety is providing over-the-top help on that side", "The receiver is covered by a linebacker", "The side with more defenders at the line"], correctIndex: 1 },
    { question: "Which side should you attack first?", options: ["The capped side", "The uncapped side", "Always throw left", "Wherever the best receiver is"], correctIndex: 1 },
    { question: "In Cover 2, which area is UNCAPPED?", options: ["The deep sidelines", "The middle of the field", "Both deep halves", "The flat areas"], correctIndex: 1 },
    { question: "In Cover 0, how much of the field is uncapped?", options: ["None", "One side", "Half the field", "The entire field — no deep safety"], correctIndex: 3 },
    { question: "What routes work best against a CAPPED side?", options: ["Go routes and posts", "Underneath — slants, curls, digs", "Only screen passes", "Trick plays"], correctIndex: 1 },
    { question: "How long should the entire R4 process take?", options: ["10 seconds", "5 seconds", "Under 3 seconds", "As long as you need"], correctIndex: 2 },
    { question: "What should you do BEFORE throwing to the uncapped side?", options: ["Close your eyes", "Look off the safety first", "Audible to a run", "Pump fake three times"], correctIndex: 1 },
  ],
};

// =====================================================
// CURRICULUM MODULES — Ordered for elite QB development
// Module order builds progressively: Philosophy → Eyes → Arm → Game → Mastery
// =====================================================

export const qbCurriculum: CurriculumModule[] = [
  {
    id: "offensive-philosophy",
    number: 1,
    title: "Offensive Philosophy & Expectations",
    description: "Understand our identity, language, and the standard every QB must meet.",
    icon: "Brain",
    lessons: [
      {
        id: "identity",
        title: "Identity of the Offense",
        purpose: "Establish the core principles that drive every play call and every rep.",
        formation: "Multiple",
        downAndDistance: "All situations",
        assignments: [
          { position: "QB", assignment: "Command the huddle, set tempo, deliver the ball on time" },
          { position: "QB", assignment: "Understand the 'why' behind every play in the system" },
          { position: "QB", assignment: "Be the extension of the coaching staff on the field" },
        ],
        coachingPoints: [
          "We are a tempo-driven, multiple-formation offense",
          "Every play has a built-in check to exploit the defense",
          "Execution over scheme — do your job at full speed",
          "The R4 System is the lens through which you process every snap",
        ],
        commonMistakes: [
          "Breaking the huddle without confidence",
          "Not understanding the 'why' behind play calls",
          "Playing slow because of indecision",
        ],
        executionKeys: {
          timing: "Get to the line within 8 seconds of breaking the huddle",
          communication: "QB calls formation, protection, and cadence clearly",
          technique: "Every player aligns correctly before the snap",
        },
        quiz: [
          { question: "What is the primary identity of our offense?", options: ["Run-heavy power", "Tempo-driven multiple formations", "Spread option only", "West Coast passing"], correctIndex: 1 },
          { question: "What is the foundation of how our QBs read the field?", options: ["The West Coast system", "The R4 System", "The option read", "The play call sheet"], correctIndex: 1 },
        ],
      },
      {
        id: "terminology",
        title: "Offensive Terminology",
        purpose: "Learn the language of the offense so every player communicates on the same page.",
        formation: "N/A",
        downAndDistance: "All situations",
        assignments: [
          { position: "QB", assignment: "Know every call, tag, and audible in the system" },
          { position: "QB", assignment: "Understand route tree numbering and concept names" },
          { position: "QB", assignment: "Know protection calls, slide directions, and hot reads" },
        ],
        coachingPoints: [
          "Our play calls contain: Formation + Motion + Play + Tag",
          "Route concepts are named, not numbered individually",
          "Protection is always called by the QB or Center",
        ],
        commonMistakes: [
          "Confusing similar-sounding play calls",
          "Not knowing what tags modify in a play",
          "Running the wrong route because of terminology confusion",
        ],
        executionKeys: {
          timing: "Instant recall — no hesitation at the line",
          communication: "Repeat the call back to confirm understanding",
          technique: "Study the playbook 15 minutes daily",
        },
        quiz: [
          { question: "What are the four components of a play call?", options: ["Play + Run + Pass + Kick", "Formation + Motion + Play + Tag", "Down + Distance + Hash + Play", "Route + Block + Read + Throw"], correctIndex: 1 },
          { question: "Who calls the protection?", options: ["Wide receiver", "Running back only", "QB or Center", "Defensive coordinator"], correctIndex: 2 },
        ],
      },
      {
        id: "player-expectations",
        title: "The QB Standard",
        purpose: "Define the standard of preparation, effort, and accountability for every quarterback.",
        formation: "N/A",
        downAndDistance: "All situations",
        assignments: [
          { position: "QB", assignment: "Be the hardest worker — first to arrive, last to leave" },
          { position: "QB", assignment: "Know the full playbook — not just your reads" },
          { position: "QB", assignment: "Lead by example on and off the field" },
        ],
        coachingPoints: [
          "Champions prepare when no one is watching",
          "Film study is non-negotiable — minimum 30 minutes daily",
          "Your body language sets the tone for the entire offense",
          "Master the R4 Foundation — it's the key to playing fast",
        ],
        commonMistakes: [
          "Only studying your own position",
          "Showing frustration after mistakes",
          "Skipping mental reps and film sessions",
        ],
        executionKeys: {
          timing: "Arrive 15 minutes early to every session",
          communication: "Communicate with coaches about what you see on film",
          technique: "Master the details — footwork, eyes, mechanics daily",
        },
        quiz: [
          { question: "How much daily film study is expected?", options: ["0 minutes", "10 minutes", "30 minutes minimum", "Only before games"], correctIndex: 2 },
          { question: "What sets the tone for the offense?", options: ["The play call", "QB's body language", "The scoreboard", "The weather"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "pre-snap-mastery",
    number: 2,
    title: "Pre-Snap Mastery & Formations",
    description: "Train your eyes before the ball is snapped — formations, alignments, and defensive recognition using R4 principles.",
    icon: "Eye",
    lessons: [
      {
        id: "base-formations",
        title: "Base Formations & Personnel",
        purpose: "Learn the core formations we operate from and how they stress the defense.",
        formation: "11, 12, 21, 10 Personnel",
        downAndDistance: "All downs",
        assignments: [
          { position: "QB", assignment: "Identify personnel grouping and align under center or in gun" },
          { position: "QB", assignment: "Recognize defensive alignment based on our formation" },
          { position: "QB", assignment: "Adjust protection calls based on box count" },
        ],
        coachingPoints: [
          "11 personnel (1 RB, 1 TE) is our base — creates mismatches in space",
          "12 personnel gives us extra blocker and play-action power",
          "Empty formations force the defense to declare coverage — making R4 reads easier",
        ],
        commonMistakes: [
          "Not checking the personnel grouping before the snap",
          "Failing to adjust when the defense shifts post-motion",
          "Poor alignment that tips the play",
        ],
        executionKeys: {
          timing: "Get lined up and scan the defense within 5 seconds",
          communication: "Call out the Mike linebacker and protection adjustments",
          technique: "Proper stance depth — 5 yards in gun, under center for power",
        },
        quiz: [
          { question: "What does '11 personnel' mean?", options: ["1 QB, 1 RB", "1 RB, 1 TE", "1 WR, 1 TE", "1 RB, 1 FB"], correctIndex: 1 },
          { question: "Why do empty formations help with R4 reads?", options: ["They confuse our own team", "They force the defense to declare coverage", "Because we have no running back", "For trick plays only"], correctIndex: 1 },
        ],
      },
      {
        id: "alignment-reads",
        title: "Pre-Snap Reads: Applying R4",
        purpose: "Use the R4 System pre-snap to identify coverage, find the cap, and set your plan.",
        formation: "All formations",
        downAndDistance: "All situations",
        conceptBreakdown: [
          "This is where the R4 Foundation comes to life. Before every snap, you execute Steps 1 and 2: READ the safeties, RECOGNIZE capped vs uncapped.",
          "Count the box first: 6 or fewer in the box = the defense is in coverage and you have a passing advantage. 7+ in the box = they're loading up to stop the run.",
          "Then read the safeties: 1-high means one side is uncapped — find it. 2-high means the middle is your target. 0-high (Cover 0) means everything is uncapped — be aggressive.",
          "Use motion to confirm: if a defender follows the motion man, it's man coverage. If the zone shifts, it's zone. Motion is your cheat code for confirming R4 reads.",
        ],
        assignments: [
          { position: "QB", assignment: "Count the box — 6 in the box means pass advantage" },
          { position: "QB", assignment: "Identify high/low safety structure and map capped/uncapped" },
          { position: "QB", assignment: "Use motion to confirm man vs zone" },
          { position: "QB", assignment: "Check for blitz indicators — walked-up LB, shifted safety" },
        ],
        coachingPoints: [
          "Pre-snap R4 reads save you a full second in your progression",
          "The safety structure tells you which half of the field to attack",
          "Motion reveals man vs zone — use it every play",
          "Your pre-snap plan should be: 'I'm going HERE unless the coverage changes post-snap'",
        ],
        commonMistakes: [
          "Staring at the defensive line instead of reading the secondary",
          "Not using motion to get a pre-snap answer",
          "Ignoring the box count and forcing runs into loaded boxes",
          "Not mapping capped/uncapped before the snap",
        ],
        executionKeys: {
          timing: "Complete your R4 pre-snap read in the first 3 seconds at the line",
          communication: "Signal hot routes and adjustments before the snap",
          technique: "Scan from safety → linebacker → D-line in that order",
        },
        quiz: [
          { question: "What does a loaded box (7+) tell the QB?", options: ["Run the ball", "It's a passing advantage", "Call timeout", "The defense is in Cover 2"], correctIndex: 1 },
          { question: "What does pre-snap motion reveal?", options: ["The play clock", "Man vs zone coverage", "The wind direction", "Nothing useful"], correctIndex: 1 },
          { question: "In R4, what are the first two steps you do pre-snap?", options: ["React and Release", "Read and Recognize", "Run and Route", "Rest and Relax"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "pass-game",
    number: 3,
    title: "Pass Game & Progressions",
    description: "Master route concepts, coverage reads, and the QB progression system — all through the R4 lens.",
    icon: "Target",
    lessons: [
      {
        id: "route-concepts",
        title: "Core Route Concepts",
        purpose: "Learn our primary passing concepts and how they attack capped vs uncapped sides.",
        formation: "11 Personnel — 2x2 and 3x1",
        downAndDistance: "All passing downs",
        conceptBreakdown: [
          "Every route concept in our offense is designed to attack either the capped or uncapped side. Knowing which concept beats which coverage is the difference between a completion and an interception.",
          "Against a CAPPED side: Mesh (crossing routes), Curl-Flat, Smash (corner + hitch) — all attack underneath the safety's zone.",
          "Against an UNCAPPED side: Four Verticals, Post-Wheel, Go-Out — all exploit the 1-on-1 matchup with no help over the top.",
          "Your R4 pre-snap read tells you which concepts to favor on each play.",
        ],
        assignments: [
          { position: "QB", assignment: "Pre-snap: Use R4 to identify which side the concept attacks" },
          { position: "QB", assignment: "Deliver the ball on the WR's break — anticipation throws" },
          { position: "QB", assignment: "Move to the check-down when primary reads are covered" },
        ],
        coachingPoints: [
          "Mesh concept: Inside crossers beat man and zone underneath (CAPPED side weapon)",
          "Smash concept: Corner + hitch attacks Cover 2 (attacks BETWEEN the caps)",
          "Four Verticals: Seam reads against Cover 3 and Cover 1 (UNCAPPED side weapon)",
        ],
        commonMistakes: [
          "Locking onto one receiver instead of progressing",
          "Throwing a deep concept into a capped side",
          "Ignoring the check-down when nothing is there deep",
        ],
        executionKeys: {
          timing: "Throw on the WR's 2nd step out of his break",
          communication: "Alert the hot route if you see blitz pre-snap",
          technique: "Proper footwork — 3-step, 5-step, and quick game drops",
        },
        quiz: [
          { question: "What coverage does the Smash concept attack?", options: ["Cover 0", "Cover 1", "Cover 2", "Cover 4"], correctIndex: 2 },
          { question: "Which route concept is best against a CAPPED side?", options: ["Four Verticals", "Mesh/crossing routes underneath", "Go routes", "Fade routes"], correctIndex: 1 },
          { question: "What is the last read in your progression?", options: ["Go route", "The check-down", "Scramble immediately", "Throw it away"], correctIndex: 1 },
        ],
      },
      {
        id: "coverage-reads",
        title: "Coverage Recognition (R4 Applied)",
        purpose: "Apply R4 to identify every coverage pre-snap and post-snap for faster decisions.",
        formation: "All formations",
        downAndDistance: "All passing situations",
        images: [
          { src: "/src/assets/field-capped.png", alt: "Capped side reference", caption: "CAPPED: Safety provides a ceiling. Attack underneath." },
          { src: "/src/assets/field-uncapped.png", alt: "Uncapped side reference", caption: "UNCAPPED: No safety help. Attack deep or intermediate 1-on-1." },
        ],
        conceptBreakdown: [
          "This lesson takes the R4 Foundation and applies it in real time. By now, you know what capped and uncapped means — here's how you use it against every coverage.",
          "Cover 1 (1 high): Safety is in the middle. Both outside thirds are UNCAPPED — attack the wider side with verticals. Be careful throwing seams into the single-high safety.",
          "Cover 2 (2 high): Both halves are CAPPED. Middle of the field is UNCAPPED — seam routes and posts are your money throws.",
          "Cover 3 (1 high, 2 deep corners): Attack the SEAMS between zones. The holes between the three deep defenders are where you live.",
          "Cover 4 (Quarters): Everything deep is CAPPED. Take what they give underneath. Move the chains with crossers and the run game.",
          "Cover 0 (No deep safety): ENTIRE FIELD UNCAPPED. Be aggressive — hot routes and quick shots win.",
        ],
        assignments: [
          { position: "QB", assignment: "Pre-snap: Read the safeties (1-high, 2-high, 0-high)" },
          { position: "QB", assignment: "Map capped/uncapped immediately using R4" },
          { position: "QB", assignment: "Post-snap: Confirm or adjust based on safety rotation" },
          { position: "QB", assignment: "Attack the coverage's weakness with the right concept" },
        ],
        coachingPoints: [
          "1-high safety = likely Cover 1 or Cover 3 — outside thirds are uncapped",
          "2-high safeties = likely Cover 2 or Cover 4 — middle of field is your target",
          "Rotation post-snap means the pre-snap look was a disguise — React (Step 3)",
          "Every coverage has a weakness — R4 helps you find it in under 2 seconds",
        ],
        commonMistakes: [
          "Only reading the pre-snap look and not confirming post-snap",
          "Not adjusting when the defense disguises coverage",
          "Trying to force a throw into a capped area",
          "Confusing Cover 2 and Cover 4 — check safety depth",
        ],
        executionKeys: {
          timing: "Identify coverage within the first 2 seconds post-snap",
          communication: "Call out coverage to your receivers with hand signals",
          technique: "Train your eyes: safety → corner → linebacker in that order",
        },
        quiz: [
          { question: "What does 1-high safety typically indicate?", options: ["Cover 2", "Cover 1 or Cover 3", "Cover 4", "No coverage"], correctIndex: 1 },
          { question: "In Cover 2, where is the UNCAPPED area?", options: ["Deep sidelines", "Middle of the field", "Behind the QB", "The flat"], correctIndex: 1 },
          { question: "What should you do if coverage rotates post-snap?", options: ["Throw to your first read anyway", "Scramble immediately", "React — adjust and attack the new weakness", "Call timeout"], correctIndex: 2 },
        ],
      },
      {
        id: "qb-progressions",
        title: "QB Progression System",
        purpose: "Master the read progression for every passing concept using R4 to set your starting point.",
        formation: "All formations",
        downAndDistance: "All passing situations",
        conceptBreakdown: [
          "In our system, the R4 pre-snap read SETS your progression. You don't read the whole field — you read the UNCAPPED half first.",
          "Your eyes are the most important weapon you have. They move the safety. Look off the uncapped side to freeze the safety, then come back to deliver.",
          "Progression speed: 1st read at the top of your drop. 2nd read on the hitch. 3rd read (check-down) on the reset. This is NFL timing.",
        ],
        assignments: [
          { position: "QB", assignment: "1st read: Primary concept side (uncapped side first per R4)" },
          { position: "QB", assignment: "2nd read: Backside crosser or intermediate route" },
          { position: "QB", assignment: "3rd read: Check-down or scramble drill" },
        ],
        coachingPoints: [
          "R4 tells you WHERE to start — your progression tells you HOW to move through it",
          "Never skip reads — trust the progression and the timing",
          "If 1 and 2 aren't there, the check-down is ALWAYS right",
          "Use your eyes to manipulate the safety away from your target",
        ],
        commonMistakes: [
          "Staring down the primary receiver",
          "Skipping to the check-down too early",
          "Holding the ball too long waiting for something deep",
          "Starting your progression on the capped side instead of the uncapped side",
        ],
        executionKeys: {
          timing: "1st read at the top of your drop, 2nd read on the hitch, 3rd on the reset",
          communication: "Use your eyes to manipulate the safety away from your target",
          technique: "Hitch up in the pocket — don't drift backward",
        },
        quiz: [
          { question: "When should you hit your first read?", options: ["Before the snap", "At the top of your drop", "After scrambling", "On 3rd down only"], correctIndex: 1 },
          { question: "How does R4 affect your progression?", options: ["It doesn't", "It tells you to start on the UNCAPPED side", "It says always throw left", "It means skip reads"], correctIndex: 1 },
          { question: "How do you manipulate the safety?", options: ["Yell at them", "Use your eyes to look them off", "Ignore them", "Motion a receiver"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "run-game",
    number: 4,
    title: "Run Game & QB Execution",
    description: "Master inside runs, outside runs, RPOs, and the QB's critical role in the ground game.",
    icon: "Zap",
    lessons: [
      {
        id: "inside-runs",
        title: "Inside Zone & Power",
        purpose: "Master the QB's execution on our core inside run plays.",
        formation: "11 & 12 Personnel — Under Center & Gun",
        downAndDistance: "1st & 10, 2nd & Short, Goal Line",
        assignments: [
          { position: "QB", assignment: "Execute proper mesh point — ride the RB through the A/B gap" },
          { position: "QB", assignment: "Read the backside end on zone read variations" },
          { position: "QB", assignment: "Carry out play-action fakes on RPOs" },
        ],
        coachingPoints: [
          "The mesh point is everything — give the RB time to find the hole",
          "On zone read: if the DE squeezes, pull and get upfield",
          "Sell the fake on play-action — your eyes and body must commit",
          "R4 helps here too — if the box is loaded (7+), check to a pass",
        ],
        commonMistakes: [
          "Pulling the ball too early on the mesh",
          "Not carrying out fakes after handing off",
          "Poor ball security on the exchange",
        ],
        executionKeys: {
          timing: "Mesh for 2 full steps before making the give/pull decision",
          communication: "Call the front and blocking scheme at the line",
          technique: "Seat the ball deep in the RB's pocket, eyes on the read key",
        },
        quiz: [
          { question: "How long should you ride the mesh on zone read?", options: ["0 steps — quick give", "1 step", "2 full steps", "4 steps"], correctIndex: 2 },
          { question: "When do you pull the ball on zone read?", options: ["Every time", "When the DE squeezes down", "When the RB says to", "On 3rd down only"], correctIndex: 1 },
        ],
      },
      {
        id: "outside-runs",
        title: "Outside Zone & Sweeps",
        purpose: "Understand the QB's role in outside run concepts and perimeter attacks.",
        formation: "11 Personnel — Gun & Pistol",
        downAndDistance: "1st & 10, 2nd & Medium",
        assignments: [
          { position: "QB", assignment: "Open to the play side and deliver a clean handoff" },
          { position: "QB", assignment: "Read the force player on designed QB runs" },
          { position: "QB", assignment: "Be ready for bootleg pass off the run fake" },
        ],
        coachingPoints: [
          "On outside zone, the RB aims for the outside hip of the tackle",
          "Bootleg is our bread-and-butter complement to outside runs",
          "Sell the run fake — the defense must respect the ground game",
          "Bootleg + uncapped side = explosive plays",
        ],
        commonMistakes: [
          "Sloppy mesh that slows down the RB",
          "Not selling the bootleg fake with your eyes",
          "Running into the backside of the play",
        ],
        executionKeys: {
          timing: "Open quickly — the RB needs the ball at full speed",
          communication: "Check the edge player's alignment pre-snap",
          technique: "Clean reverse pivot or open step based on formation",
        },
        quiz: [
          { question: "Where does the RB aim on outside zone?", options: ["A gap", "B gap", "Outside hip of the tackle", "Straight ahead"], correctIndex: 2 },
          { question: "What complements outside zone?", options: ["Draw play", "QB sneak", "Bootleg pass", "Punt"], correctIndex: 2 },
        ],
      },
    ],
  },
  {
    id: "situational-offense",
    number: 5,
    title: "Situational Offense",
    description: "Master red zone, 3rd down, and 2-minute drill execution — where games are won.",
    icon: "Clock",
    lessons: [
      {
        id: "red-zone",
        title: "Red Zone Offense",
        purpose: "Score touchdowns, not field goals — learn our red zone attack plan.",
        formation: "12, 13, and Goal Line Personnel",
        downAndDistance: "Inside the 20-yard line",
        conceptBreakdown: [
          "In the red zone, the field compresses — which changes your R4 reads. With less space, the defense can cap both sides more easily. Your weapons shift to timing, ball placement, and the run game.",
        ],
        assignments: [
          { position: "QB", assignment: "Compress your reads — the field is shrinking" },
          { position: "QB", assignment: "Use hard cadence to draw offsides in the red zone" },
          { position: "QB", assignment: "Ball placement is critical — low and away from defenders" },
        ],
        coachingPoints: [
          "In the red zone, turnovers are unacceptable — protect the ball",
          "Back shoulder and fade throws are your best friend at the goal line",
          "QB sneak is always available inside the 1-yard line",
          "R4 still applies — but windows are smaller, so be precise",
        ],
        commonMistakes: [
          "Trying to force the ball into tight windows",
          "Not using hard count to create free plays",
          "Throwing high in the end zone (pick-6 risk)",
        ],
        executionKeys: {
          timing: "Quick release — defenders close faster in a compressed field",
          communication: "Alert check-with-me plays at the line based on the defensive look",
          technique: "Throw low on fade routes — only your guy can get it",
        },
        quiz: [
          { question: "What is the #1 rule in the red zone?", options: ["Score fast", "Protect the ball — no turnovers", "Always throw deep", "Run every play"], correctIndex: 1 },
          { question: "Where should you place a fade throw?", options: ["High and inside", "Low and away from the defender", "Right at the defender", "Behind the receiver"], correctIndex: 1 },
        ],
      },
      {
        id: "third-down",
        title: "3rd Down Conversions",
        purpose: "Move the chains — master our 3rd down conversion package.",
        formation: "11 and 10 Personnel — Spread",
        downAndDistance: "3rd & Short, Medium, Long",
        assignments: [
          { position: "QB", assignment: "Know the sticks — throw to or past the first down marker" },
          { position: "QB", assignment: "Identify the blitz and get to your hot read" },
          { position: "QB", assignment: "On 3rd and short, trust the QB draw and sneak" },
        ],
        coachingPoints: [
          "3rd and short: we are a run-first team — QB sneak, draw, or inside zone",
          "3rd and medium: crossing routes and sit routes convert chains",
          "3rd and long: protect the ball — take the check-down to set up 4th down",
        ],
        commonMistakes: [
          "Throwing short of the sticks on 3rd down",
          "Not recognizing the blitz and taking a sack",
          "Trying to be a hero on 3rd and long",
        ],
        executionKeys: {
          timing: "Quick decisions — the defense is bringing pressure on 3rd down",
          communication: "Alert hot routes vs blitz pre-snap",
          technique: "Stand tall in the pocket and deliver on time",
        },
        quiz: [
          { question: "What is the approach on 3rd and long?", options: ["Force a deep throw", "Take the check-down and set up 4th down", "Always run", "Call timeout"], correctIndex: 1 },
          { question: "What do you throw on 3rd and medium?", options: ["Hail Mary", "Crossing and sit routes at the sticks", "Screen pass", "Spike the ball"], correctIndex: 1 },
        ],
      },
      {
        id: "two-minute-drill",
        title: "2-Minute Drill",
        purpose: "Execute our hurry-up offense to score with time running out.",
        formation: "11 and 10 Personnel — No Huddle",
        downAndDistance: "All — clock management critical",
        conceptBreakdown: [
          "The 2-minute drill is where R4 mastery separates the elite from the average. You don't have time to think — you must READ, RECOGNIZE, REACT, and RELEASE at maximum speed. If you've trained R4, this is where it pays off.",
        ],
        assignments: [
          { position: "QB", assignment: "Manage the clock — know when to spike, when to run" },
          { position: "QB", assignment: "Get out of bounds or throw it away to stop the clock" },
          { position: "QB", assignment: "R4 at full speed — pre-snap reads must be instant" },
        ],
        coachingPoints: [
          "Tempo is controlled chaos — fast but not frantic",
          "Use your timeouts wisely — save them for inside the 30",
          "Sideline routes stop the clock; middle routes gain yards",
          "R4 reads must be automatic — no time to hesitate",
        ],
        commonMistakes: [
          "Playing too fast and making mental errors",
          "Forgetting to spike the ball when needed",
          "Taking sacks — throw it away if nothing is there",
        ],
        executionKeys: {
          timing: "No huddle — call plays at the line with hand signals",
          communication: "Constant communication with sideline on play calls and clock",
          technique: "Controlled aggression — play fast but see the whole field",
        },
        quiz: [
          { question: "When should you save your timeouts?", options: ["Use them immediately", "Save for inside the 30-yard line", "Never use them", "Only in overtime"], correctIndex: 1 },
          { question: "What should you NEVER do in the 2-minute drill?", options: ["Throw incomplete", "Take a sack", "Get out of bounds", "Spike the ball"], correctIndex: 1 },
          { question: "Why is R4 mastery critical in the 2-minute drill?", options: ["It's not important", "You don't have time to think — reads must be automatic", "You should ignore coverage in hurry-up", "Only run the ball"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "playbook-mastery",
    number: 6,
    title: "Playbook Mastery & Audibles",
    description: "Full play installs, adjustments, and the ability to change the play at the line like a pro.",
    icon: "BookOpen",
    lessons: [
      {
        id: "play-installs",
        title: "Full Play Installs",
        purpose: "Walk through complete play installs with every position's assignment.",
        formation: "All personnel groupings",
        downAndDistance: "Varies by concept",
        assignments: [
          { position: "QB", assignment: "Know every player's assignment on every play" },
          { position: "QB", assignment: "Understand why the play is called in specific situations" },
          { position: "QB", assignment: "See the full picture — not just your reads" },
        ],
        coachingPoints: [
          "A great QB knows what every player is doing on every play",
          "Understanding blocking schemes helps you feel pressure before it comes",
          "Film study of your own offense is as important as studying defense",
          "Apply R4 to every install — ask yourself 'what coverage does this beat?'",
        ],
        commonMistakes: [
          "Only knowing your own assignment",
          "Not understanding the blocking scheme",
          "Running plays without knowing the 'why' behind them",
        ],
        executionKeys: {
          timing: "Study each install for at least 20 minutes before practice",
          communication: "Teach the play to a teammate — if you can teach it, you know it",
          technique: "Walk through every assignment mentally before each rep",
        },
        quiz: [
          { question: "What separates a good QB from a great QB?", options: ["Arm strength only", "Knowing every player's assignment", "Being the fastest", "Having the best stats"], correctIndex: 1 },
          { question: "How should you study play installs?", options: ["Skim the playbook", "Study for 20+ minutes and teach it to a teammate", "Wait until game day", "Only watch your own film"], correctIndex: 1 },
        ],
      },
      {
        id: "adjustments-audibles",
        title: "Adjustments & Audibles",
        purpose: "Master the ability to change plays at the line based on what the defense shows you.",
        formation: "All formations",
        downAndDistance: "All situations",
        conceptBreakdown: [
          "Audibles are the ultimate expression of R4 mastery. When you can read the defense (R4), recognize the play won't work, and change to a better option — you're playing like a college or NFL quarterback.",
          "Every audible should put you in a BETTER play based on what R4 tells you. If the defense is showing a capped look and the play call attacks deep, audible to an underneath concept. If they show uncapped, check to a deep shot.",
        ],
        assignments: [
          { position: "QB", assignment: "Read the defense and determine if the called play will work" },
          { position: "QB", assignment: "Use R4 to identify if you should check to a run or pass" },
          { position: "QB", assignment: "Communicate audibles clearly so every player hears and adjusts" },
        ],
        coachingPoints: [
          "An audible should put you in a BETTER play — not just a different one",
          "R4 drives the audible: capped side = check underneath; uncapped = check to a shot",
          "Never audible just to audible — trust the play call if it's right",
          "Your receivers must know the audible system as well as you do",
        ],
        commonMistakes: [
          "Audibiling into a worse play because of panic",
          "Not communicating the audible loudly enough",
          "Changing the play too late — not giving teammates time to adjust",
          "Ignoring R4 reads when choosing an audible",
        ],
        executionKeys: {
          timing: "Audible with at least 5 seconds on the play clock",
          communication: "Use clear verbal and hand signals — point, call, confirm",
          technique: "Practice the audible system daily until it's instinct",
        },
        quiz: [
          { question: "When should you audible?", options: ["Every play", "When R4 tells you the called play won't work against the look", "Never", "Only in the 4th quarter"], correctIndex: 1 },
          { question: "How much time should remain on the play clock when you audible?", options: ["0 seconds", "2 seconds", "5+ seconds", "15 seconds"], correctIndex: 2 },
          { question: "How does R4 influence audibles?", options: ["It doesn't", "Capped = check underneath, Uncapped = check to a shot", "Always audible to a run", "Only audible in the red zone"], correctIndex: 1 },
        ],
      },
    ],
  },
];

// Test Your Knowledge mode — random plays for quick R4 application
export const testYourKnowledgePlays = [
  { formation: "11 Personnel — 2x2 Spread", question: "The defense shows 2-high safeties. Where is the UNCAPPED area?", answer: "The middle of the field — attack with seams and posts (Cover 2 look)" },
  { formation: "12 Personnel — Under Center", question: "1-high safety shading to the field. Which side is UNCAPPED?", answer: "The boundary side — the safety capped the field side. Attack boundary verticals." },
  { formation: "Empty — 3x2", question: "Defense shows Cover 0 (no deep safeties). What does R4 tell you?", answer: "ENTIRE FIELD IS UNCAPPED — get the ball out fast to your best matchup. Hot routes and slants win." },
  { formation: "11 Personnel — 3x1 Trips", question: "Safety rolls down into the box. Is the trips side capped or uncapped?", answer: "UNCAPPED — the safety left. Take a deep shot to the trips side if the matchup is right." },
  { formation: "Goal Line — 13 Personnel", question: "Defense shows Cover 1. What's your R4 read in the red zone?", answer: "The single-high safety caps the middle. Work the fade or back-shoulder to the uncapped outside." },
  { formation: "11 Personnel — 2x2", question: "Post-snap, the safety rotates from 2-high to 1-high. What happened?", answer: "Coverage disguise — React (Step 3). The rotation created an UNCAPPED side. Adjust your progression to attack it." },
  { formation: "10 Personnel — Empty", question: "The defense is in Cover 4 (Quarters). Where do you attack?", answer: "Everything deep is CAPPED. Take what they give underneath — crossers, option routes, and check-downs." },
];
