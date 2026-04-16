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

export const qbCurriculum: CurriculumModule[] = [
  {
    id: "offensive-philosophy",
    number: 1,
    title: "Offensive Philosophy",
    description: "Understand the identity, terminology, and expectations of our offense.",
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
          { position: "WR", assignment: "Win at the line, run precise routes, finish every play" },
          { position: "OL", assignment: "Dominate the line of scrimmage, communicate as a unit" },
        ],
        coachingPoints: [
          "We are a tempo-driven, multiple-formation offense",
          "Every play has a built-in check to exploit the defense",
          "Execution over scheme — do your job at full speed",
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
          { question: "What should the QB do in the huddle?", options: ["Whisper the play", "Command with confidence and clarity", "Let the center call the play", "Wait for the sideline"], correctIndex: 1 },
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
          { position: "WR", assignment: "Understand route tree numbering and concept names" },
          { position: "OL", assignment: "Know protection calls, slide directions, and hot reads" },
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
          { question: "How should you study terminology?", options: ["Only on game day", "15 minutes daily", "Once a week", "Never — just wing it"], correctIndex: 1 },
        ],
      },
      {
        id: "player-expectations",
        title: "Player Expectations",
        purpose: "Define the standard of preparation, effort, and accountability for every quarterback.",
        formation: "N/A",
        downAndDistance: "All situations",
        assignments: [
          { position: "QB", assignment: "Be the hardest worker, first to arrive, last to leave" },
          { position: "QB", assignment: "Know the full playbook — not just your reads" },
          { position: "QB", assignment: "Lead by example on and off the field" },
        ],
        coachingPoints: [
          "Champions prepare when no one is watching",
          "Film study is non-negotiable — minimum 30 minutes daily",
          "Your body language sets the tone for the entire offense",
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
    id: "formations",
    number: 2,
    title: "Formations",
    description: "Master base formations, alignment rules, and QB-specific responsibilities.",
    icon: "LayoutGrid",
    lessons: [
      {
        id: "base-formations",
        title: "Base Formations",
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
          "Empty formations force the defense to declare coverage",
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
          { question: "Why do we use empty formations?", options: ["To confuse our own team", "To force defense to declare coverage", "Because we have no running back", "For trick plays only"], correctIndex: 1 },
          { question: "What is the QB's first job after the huddle?", options: ["Throw the ball", "Identify the Mike and set protection", "Audible immediately", "Motion a receiver"], correctIndex: 1 },
        ],
      },
      {
        id: "alignment-rules",
        title: "Alignment Rules & Pre-Snap Reads",
        purpose: "Understand exact alignment rules and what to look for before the snap.",
        formation: "All formations",
        downAndDistance: "All situations",
        assignments: [
          { position: "QB", assignment: "Count the box — 6 in the box means pass advantage" },
          { position: "QB", assignment: "Identify high/low safety structure (Cover 1, 2, 3, 4)" },
          { position: "QB", assignment: "Check for blitz indicators — walked-up LB, shifted safety" },
        ],
        coachingPoints: [
          "Pre-snap reads save you a full second in your progression",
          "The safety structure tells you what half of the field to attack",
          "Motion reveals man vs zone — use it every play",
        ],
        commonMistakes: [
          "Staring at the defensive line instead of reading the secondary",
          "Not using motion to get a pre-snap answer",
          "Ignoring the box count and forcing runs into loaded boxes",
        ],
        executionKeys: {
          timing: "Complete your pre-snap read in the first 3 seconds at the line",
          communication: "Signal hot routes and adjustments before the snap",
          technique: "Scan from safety → linebacker → D-line in that order",
        },
        quiz: [
          { question: "What does a loaded box (7+) tell the QB?", options: ["Run the ball", "It's a passing advantage", "Call timeout", "Punt"], correctIndex: 1 },
          { question: "What does pre-snap motion reveal?", options: ["The play clock", "Man vs zone coverage", "The wind direction", "Nothing useful"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "run-game",
    number: 3,
    title: "Run Game",
    description: "Learn inside runs, outside runs, and the QB's role in the run game.",
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
    id: "pass-game",
    number: 4,
    title: "Pass Game",
    description: "Master route concepts, coverage reads, and the QB progression system.",
    icon: "Target",
    lessons: [
      {
        id: "route-concepts",
        title: "Core Route Concepts",
        purpose: "Learn our primary passing concepts and how they attack different coverages.",
        formation: "11 Personnel — 2x2 and 3x1",
        downAndDistance: "All passing downs",
        assignments: [
          { position: "QB", assignment: "Identify the concept and know your progression pre-snap" },
          { position: "QB", assignment: "Deliver the ball on the WR's break — anticipation throws" },
          { position: "QB", assignment: "Move to the check-down when primary reads are covered" },
        ],
        coachingPoints: [
          "Mesh concept: Inside crossers beat man and zone underneath",
          "Smash concept: Corner + hitch attacks Cover 2",
          "Four Verticals: Seam reads against Cover 3 and Cover 1",
        ],
        commonMistakes: [
          "Locking onto one receiver instead of progressing",
          "Throwing late — waiting until the WR is open instead of throwing on the break",
          "Ignoring the check-down when nothing is there deep",
        ],
        executionKeys: {
          timing: "Throw on the WR's 2nd step out of his break",
          communication: "Alert the hot route if you see blitz pre-snap",
          technique: "Proper footwork — 3-step, 5-step, and quick game drops",
        },
        quiz: [
          { question: "What coverage does the Smash concept attack?", options: ["Cover 0", "Cover 1", "Cover 2", "Cover 4"], correctIndex: 2 },
          { question: "When should you throw an anticipation pass?", options: ["After the WR is wide open", "On the WR's break", "Only on screen passes", "Never"], correctIndex: 1 },
          { question: "What is the last read in your progression?", options: ["Go route", "The check-down", "Scramble immediately", "Throw it away"], correctIndex: 1 },
        ],
      },
      {
        id: "coverage-reads",
        title: "Coverage Recognition",
        purpose: "Learn to identify defensive coverages pre-snap and post-snap to make faster decisions.",
        formation: "All formations",
        downAndDistance: "All passing situations",
        assignments: [
          { position: "QB", assignment: "Pre-snap: read the safeties (1-high, 2-high, 0-high)" },
          { position: "QB", assignment: "Post-snap: confirm or adjust based on movement" },
          { position: "QB", assignment: "Attack the coverage's weakness with the right concept" },
        ],
        coachingPoints: [
          "1-high safety = likely Cover 1 or Cover 3 — attack the seams",
          "2-high safeties = likely Cover 2 or Cover 4 — attack the middle",
          "Rotation post-snap means the pre-snap look was a disguise",
        ],
        commonMistakes: [
          "Only reading the pre-snap look and not confirming post-snap",
          "Not adjusting when the defense disguises coverage",
          "Trying to force a throw into a coverage that takes it away",
        ],
        executionKeys: {
          timing: "Identify coverage within the first 2 seconds post-snap",
          communication: "Call out coverage to your receivers with hand signals",
          technique: "Train your eyes: safety → corner → linebacker in that order",
        },
        quiz: [
          { question: "What does 1-high safety typically indicate?", options: ["Cover 2", "Cover 1 or Cover 3", "Cover 4", "No coverage"], correctIndex: 1 },
          { question: "What should you do if coverage rotates post-snap?", options: ["Throw to your first read anyway", "Scramble immediately", "Adjust and attack the new weakness", "Call timeout"], correctIndex: 2 },
          { question: "What is the correct eye progression post-snap?", options: ["D-line → LB → Safety", "Safety → Corner → LB", "WR → Ball → End zone", "Coach → Sideline → Ball"], correctIndex: 1 },
        ],
      },
      {
        id: "qb-progressions",
        title: "QB Progression System",
        purpose: "Master the read progression for every passing concept in our offense.",
        formation: "All formations",
        downAndDistance: "All passing situations",
        assignments: [
          { position: "QB", assignment: "1st read: Primary concept side based on coverage" },
          { position: "QB", assignment: "2nd read: Backside crosser or intermediate route" },
          { position: "QB", assignment: "3rd read: Check-down or scramble drill" },
        ],
        coachingPoints: [
          "Your eyes are your most important tool — they move the defense",
          "Never skip reads — trust the progression and the timing",
          "If 1 and 2 aren't there, the check-down is ALWAYS right",
        ],
        commonMistakes: [
          "Staring down the primary receiver",
          "Skipping to the check-down too early",
          "Holding the ball too long waiting for something deep",
        ],
        executionKeys: {
          timing: "1st read at the top of your drop, 2nd read on the hitch, 3rd on the reset",
          communication: "Use your eyes to manipulate the safety away from your target",
          technique: "Hitch up in the pocket — don't drift backward",
        },
        quiz: [
          { question: "When should you hit your first read?", options: ["Before the snap", "At the top of your drop", "After scrambling", "On 3rd down only"], correctIndex: 1 },
          { question: "What should you do if reads 1 and 2 are covered?", options: ["Force it deep", "Take the check-down", "Throw it away immediately", "Run backwards"], correctIndex: 1 },
          { question: "How do you manipulate the safety?", options: ["Yell at them", "Use your eyes to look them off", "Ignore them", "Motion a receiver"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "r4-system",
    number: 5,
    title: "R4 System — Capped & Uncapped",
    description: "Master the R4 reading system: identify capped and uncapped sides of the field to make elite-level decisions.",
    icon: "Eye",
    lessons: [
      {
        id: "r4-philosophy",
        title: "The R4 System Philosophy",
        purpose: "Understand the foundation of the R4 quarterback reading system and why it creates elite decision-makers.",
        formation: "All formations",
        downAndDistance: "All situations",
        conceptBreakdown: [
          "The R4 System stands for: Read, Recognize, React, Release — four steps that happen in under 3 seconds.",
          "At its core, the R4 System teaches quarterbacks to process the field through the lens of CAPPED vs UNCAPPED areas. This is the single most important concept in modern quarterback play.",
          "A CAPPED side of the field has a safety providing over-the-top help. The defense has a 'cap' or ceiling protecting deep routes on that side. Throwing deep into a capped area is high-risk.",
          "An UNCAPPED side of the field has NO safety help over the top. The defense has removed its ceiling on that side, leaving it vulnerable to deep throws and one-on-one matchups.",
          "The R4 System trains your eyes to find the uncapped side FIRST, then work your progression on that side of the field. This is how you play faster — you eliminate half the field before the snap.",
          "Every defensive coverage creates a capped side and an uncapped side. Your job is to find which side the defense left exposed and attack it."
        ],
        images: [
          { src: "/src/assets/field-capped.png", alt: "Capped side of the field - safety providing over-the-top help", caption: "CAPPED SIDE: The safety (S) is positioned over the receivers, creating a ceiling. Deep throws to this side are contested." },
          { src: "/src/assets/field-uncapped.png", alt: "Uncapped side of the field - no safety help over the top", caption: "UNCAPPED SIDE: No safety help over the top. This side is vulnerable to deep routes and one-on-one matchups." }
        ],
        assignments: [
          { position: "QB", assignment: "Pre-snap: Identify the safety structure — 1 high, 2 high, or 0 high" },
          { position: "QB", assignment: "Determine which side of the field is capped and which is uncapped" },
          { position: "QB", assignment: "Set your progression to attack the uncapped side FIRST" },
          { position: "QB", assignment: "Post-snap: Confirm or adjust if the safety rotates" },
        ],
        coachingPoints: [
          "Read the safeties FIRST — they tell you where the cap is",
          "In a 1-high shell, one side is always uncapped — find it",
          "In a 2-high shell, neither deep half is uncapped, so attack the middle",
          "The R4 System eliminates half the field before the snap — play faster",
        ],
        commonMistakes: [
          "Ignoring the safeties and reading receivers instead",
          "Throwing deep into a capped side and getting intercepted",
          "Not confirming post-snap — the safety may rotate after the snap",
          "Treating every play as a full-field read instead of half-field",
        ],
        executionKeys: {
          timing: "Identify capped/uncapped within 2 seconds of approaching the line",
          communication: "Signal to receivers which side you're working — they adjust routes accordingly",
          technique: "Eyes: Safety → Hash → Corner → Receiver — in that exact order",
        },
        quiz: [
          { question: "What does R4 stand for?", options: ["Run, Rush, Route, Release", "Read, Recognize, React, Release", "Read, Run, React, Return", "Route, Read, Release, Run"], correctIndex: 1 },
          { question: "What does 'capped' mean?", options: ["The QB is wearing a cap", "A safety is providing over-the-top help on that side", "The receiver is covered by a linebacker", "The side with more defenders at the line"], correctIndex: 1 },
          { question: "Which side should you attack first in the R4 System?", options: ["The capped side", "The uncapped side", "Always throw left", "Wherever the best receiver is"], correctIndex: 1 },
          { question: "In a 1-high safety shell, how many sides are uncapped?", options: ["Both sides", "One side", "Neither side", "It depends on the formation"], correctIndex: 1 },
        ],
      },
      {
        id: "r4-capped-reads",
        title: "Reading the Capped Side",
        purpose: "Learn what routes and concepts work against a capped side, and when to attack underneath the safety.",
        formation: "2x2 and 3x1 sets",
        downAndDistance: "2nd & Medium, 3rd & Short",
        images: [
          { src: "/src/assets/field-capped.png", alt: "Capped side coverage diagram", caption: "The capped side has a safety ceiling. Attack UNDERNEATH with crossing routes, curls, and out-breaking routes." }
        ],
        conceptBreakdown: [
          "Just because a side is capped does NOT mean you can't throw there — it means you attack differently.",
          "Against a capped side, your best weapons are UNDERNEATH routes: slants, curls, digs, and crossing routes that stay below the safety's zone.",
          "The safety caps deep throws but creates space underneath. Smart QBs exploit the void between the corner and the safety.",
          "On 3rd and short, the capped side's underneath routes are often the highest-percentage throws in football.",
          "Never throw a go route or post route into a capped side unless you have a clear coverage bust."
        ],
        assignments: [
          { position: "QB", assignment: "Identify the cap — then look for the void underneath it" },
          { position: "QB", assignment: "Work curl-flat or smash concepts that attack below the safety" },
          { position: "QB", assignment: "Use crossing routes to exploit the space between LB and safety" },
          { position: "QB", assignment: "Check-down to the RB if underneath routes are bracketed" },
        ],
        coachingPoints: [
          "Capped side = short and intermediate throws only",
          "Curls and comebacks sit in the void between corner and safety",
          "Dig routes at 12-15 yards are money throws against a capped side",
          "NEVER throw a 9 route (go route) into a capped side",
        ],
        commonMistakes: [
          "Trying to throw deep into a capped area — INT waiting to happen",
          "Not recognizing the void underneath the cap",
          "Forcing the ball to a covered receiver instead of taking the check-down",
          "Staring down the capped side receiver and alerting the safety",
        ],
        executionKeys: {
          timing: "Deliver on the receiver's break — capped side throws must be on time",
          communication: "Alert receivers to run underneath routes when you see a capped side",
          technique: "Throw with touch — drop it over the linebacker, under the safety",
        },
        quiz: [
          { question: "What type of routes work best against a capped side?", options: ["Go routes and posts", "Underneath routes — slants, curls, digs", "Only screen passes", "Trick plays"], correctIndex: 1 },
          { question: "What should you NEVER throw into a capped side?", options: ["A curl route", "A crossing route", "A go/9 route", "A check-down"], correctIndex: 2 },
          { question: "Where is the void on a capped side?", options: ["Behind the safety", "Between the corner and the safety", "At the line of scrimmage", "In the end zone"], correctIndex: 1 },
        ],
      },
      {
        id: "r4-uncapped-reads",
        title: "Attacking the Uncapped Side",
        purpose: "Master the art of exploiting the uncapped side for explosive plays and deep shots.",
        formation: "3x1, 2x2, and Empty sets",
        downAndDistance: "1st & 10, 2nd & Long, Play-Action",
        images: [
          { src: "/src/assets/field-uncapped.png", alt: "Uncapped side coverage diagram", caption: "The uncapped side has NO safety help. This is where you take your deep shots — the receiver is in a 1-on-1 matchup." }
        ],
        conceptBreakdown: [
          "The uncapped side is where elite quarterbacks make their money. No safety help means every deep route is a 1-on-1 matchup.",
          "When you identify an uncapped side, your FIRST thought should be: can I take a shot? If the matchup favors your receiver, pull the trigger.",
          "Post routes, go routes, and corner routes are devastating against an uncapped side because there's no help over the top.",
          "Play-action is the ultimate uncapped-side weapon — it freezes the linebackers and gives your receiver even more separation.",
          "If the deep shot isn't there, work back to the intermediate and short routes on the uncapped side — they're still favorable because the corner is in single coverage."
        ],
        assignments: [
          { position: "QB", assignment: "Pre-snap: Identify the uncapped side and evaluate the matchup" },
          { position: "QB", assignment: "Take the deep shot if the WR wins at the line of scrimmage" },
          { position: "QB", assignment: "Use play-action to create even bigger windows on the uncapped side" },
          { position: "QB", assignment: "If the deep throw isn't there, work intermediate routes — still favorable" },
        ],
        coachingPoints: [
          "Uncapped side = green light for deep shots when the matchup is right",
          "Trust your receiver in 1-on-1 — that's what they train for",
          "Play-action + uncapped side = the most explosive combination in football",
          "Even if you don't throw deep, the uncapped side's intermediate routes are high percentage",
        ],
        commonMistakes: [
          "Not being aggressive enough when the uncapped side is identified",
          "Staring at the uncapped side and alerting the safety to rotate",
          "Forcing a deep throw when the WR loses at the line — take the underneath option",
          "Forgetting to look off the safety before attacking the uncapped side",
        ],
        executionKeys: {
          timing: "Deep shots must be thrown within 3 seconds — don't hold the ball",
          communication: "Signal to the WR that he's in a 1-on-1 situation — 'win your matchup'",
          technique: "Look off the safety FIRST, then come back to the uncapped side to throw",
        },
        quiz: [
          { question: "What makes the uncapped side dangerous for the defense?", options: ["More defenders are there", "No safety help — 1-on-1 matchups", "It's closer to the sideline", "The QB runs to that side"], correctIndex: 1 },
          { question: "What is the best complement to attacking the uncapped side?", options: ["Screen passes", "QB draws", "Play-action", "Punt fakes"], correctIndex: 2 },
          { question: "What should you do before throwing to the uncapped side?", options: ["Close your eyes", "Look off the safety first", "Audible to a run", "Pump fake three times"], correctIndex: 1 },
          { question: "If the WR loses at the line on the uncapped side, what do you do?", options: ["Force the deep throw anyway", "Take the underneath option", "Spike the ball", "Call timeout"], correctIndex: 1 },
        ],
      },
      {
        id: "r4-coverage-application",
        title: "R4 vs Every Coverage",
        purpose: "Apply the R4 capped/uncapped system to every coverage you'll face — Cover 1, 2, 3, 4, and 0.",
        formation: "All formations",
        downAndDistance: "All situations",
        images: [
          { src: "/src/assets/field-capped.png", alt: "Capped side reference", caption: "Reference: A capped side has safety help over the top." },
          { src: "/src/assets/field-uncapped.png", alt: "Uncapped side reference", caption: "Reference: An uncapped side has NO safety help — attack here for explosive plays." }
        ],
        conceptBreakdown: [
          "COVER 1 (1 high safety): The safety is in the middle. Both sides are technically 'capped' deep middle, but the boundary and field sides have no deep-half help. Attack the wider side with vertical routes.",
          "COVER 2 (2 high safeties): Both deep halves are capped by a safety. The MIDDLE of the field is uncapped — attack with seam routes, posts down the middle, and dig routes.",
          "COVER 3 (1 high, 2 deep-third defenders): The deep middle is capped by the safety. The two deep outside thirds are covered by corners. Attack the seams between the zones — the 'hole shots' between Cover 3 defenders.",
          "COVER 4 (Quarters — 4 deep defenders): All four deep zones are capped. Attack underneath with crossing routes, option routes, and the run game. The defense is giving you the short throws.",
          "COVER 0 (No deep safety): THE ENTIRE FIELD IS UNCAPPED. Every receiver is in a 1-on-1 matchup. Take your best shot — hot routes, slants, and fades are all lethal."
        ],
        assignments: [
          { position: "QB", assignment: "Identify the coverage shell and immediately map capped vs uncapped zones" },
          { position: "QB", assignment: "vs Cover 0: Get the ball out fast — hot routes and slants win" },
          { position: "QB", assignment: "vs Cover 2: Attack the middle seam — it's always uncapped" },
          { position: "QB", assignment: "vs Cover 3/4: Find the holes between zone defenders" },
        ],
        coachingPoints: [
          "Every coverage has a weakness — the R4 System helps you find it instantly",
          "Cover 0 = most uncapped field you'll ever see — be aggressive",
          "Cover 2 = the middle is always open, attack seams and posts",
          "Cover 4 = take what they give you underneath and move the chains",
        ],
        commonMistakes: [
          "Not adjusting your approach based on the coverage",
          "Trying to throw deep against Cover 4 — they're giving you the short game",
          "Not being aggressive enough against Cover 0 — it's man-to-man everywhere",
          "Confusing Cover 2 and Cover 4 pre-snap — the safety depth is the key",
        ],
        executionKeys: {
          timing: "Coverage ID must happen within 1-2 seconds pre-snap — then set your plan",
          communication: "Tell your receivers what coverage you see so they adjust their routes",
          technique: "Master the 'triangle read' — safety, corner, linebacker in one glance",
        },
        quiz: [
          { question: "In Cover 2, which area of the field is UNCAPPED?", options: ["The deep sidelines", "The middle of the field", "Both deep halves", "The flat areas"], correctIndex: 1 },
          { question: "In Cover 0, how much of the field is uncapped?", options: ["None", "One side", "Half the field", "The entire field — no deep safety"], correctIndex: 3 },
          { question: "What should you attack against Cover 4?", options: ["Deep go routes", "Underneath crossing routes and short game", "Only the run game", "Trick plays"], correctIndex: 1 },
          { question: "How do you tell the difference between Cover 2 and Cover 4 pre-snap?", options: ["You can't tell", "Safety depth — Cover 4 safeties are deeper", "The number of linebackers", "The defensive line alignment"], correctIndex: 1 },
          { question: "Against Cover 3, where are the vulnerable zones?", options: ["Deep middle", "The seams between zone defenders", "The line of scrimmage", "Behind the QB"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "situational-offense",
    number: 5,
    title: "Situational Offense",
    description: "Master red zone, 3rd down, and 2-minute drill execution.",
    icon: "Clock",
    lessons: [
      {
        id: "red-zone",
        title: "Red Zone Offense",
        purpose: "Score touchdowns, not field goals — learn our red zone attack plan.",
        formation: "12, 13, and Goal Line Personnel",
        downAndDistance: "Inside the 20-yard line",
        assignments: [
          { position: "QB", assignment: "Compress your reads — the field is shrinking" },
          { position: "QB", assignment: "Use hard cadence to draw offsides in the red zone" },
          { position: "QB", assignment: "Ball placement is critical — low and away from defenders" },
        ],
        coachingPoints: [
          "In the red zone, turnovers are unacceptable — protect the ball",
          "Back shoulder and fade throws are your best friend at the goal line",
          "QB sneak is always available inside the 1-yard line",
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
        assignments: [
          { position: "QB", assignment: "Manage the clock — know when to spike, when to run" },
          { position: "QB", assignment: "Get out of bounds or throw it away to stop the clock" },
          { position: "QB", assignment: "Hit the sideline throws and middle-field completions" },
        ],
        coachingPoints: [
          "Tempo is controlled chaos — fast but not frantic",
          "Use your timeouts wisely — save them for inside the 30",
          "Sideline routes stop the clock; middle routes gain yards",
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
          { question: "What is the right tempo?", options: ["As fast as humanly possible", "Slow and methodical", "Controlled chaos — fast but not frantic", "Same as regular offense"], correctIndex: 2 },
        ],
      },
    ],
  },
  {
    id: "playbook-mastery",
    number: 6,
    title: "Playbook Mastery",
    description: "Full play installs, adjustments, and audible mastery.",
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
        assignments: [
          { position: "QB", assignment: "Read the defense and determine if the called play will work" },
          { position: "QB", assignment: "Use check-with-me calls to get into the best play" },
          { position: "QB", assignment: "Communicate audibles clearly so every player hears and adjusts" },
        ],
        coachingPoints: [
          "An audible should put you in a BETTER play, not just a different one",
          "Never audible just to audible — trust the play call if it's right",
          "Your receivers must know the audible system as well as you do",
        ],
        commonMistakes: [
          "Audibiling into a worse play because of panic",
          "Not communicating the audible loudly enough",
          "Changing the play too late — not giving teammates time to adjust",
        ],
        executionKeys: {
          timing: "Audible with at least 5 seconds on the play clock",
          communication: "Use clear verbal and hand signals — point, call, confirm",
          technique: "Practice the audible system daily until it's instinct",
        },
        quiz: [
          { question: "When should you audible?", options: ["Every play", "When the called play won't work against the look", "Never", "Only in the 4th quarter"], correctIndex: 1 },
          { question: "How much time should remain on the play clock when you audible?", options: ["0 seconds", "2 seconds", "5+ seconds", "15 seconds"], correctIndex: 2 },
          { question: "What is the biggest audible mistake?", options: ["Not audibiling enough", "Changing too late so teammates can't adjust", "Audibiling on 1st down", "Using hand signals"], correctIndex: 1 },
        ],
      },
    ],
  },
];

// Test Your Knowledge mode — random plays for quick identification
export const testYourKnowledgePlays = [
  { formation: "11 Personnel — 2x2 Spread", question: "What is the best concept vs Cover 2 from this formation?", answer: "Smash — corner route attacks the Cover 2 window" },
  { formation: "12 Personnel — Under Center", question: "What is the QB's read key on inside zone?", answer: "Backside defensive end — give if he crashes, pull if he sits" },
  { formation: "Empty — 3x2", question: "What coverage is the defense likely in?", answer: "Man coverage or Cover 1 — they can't have a box defender with empty" },
  { formation: "11 Personnel — 3x1 Trips", question: "Where is the single receiver route going vs Cover 3?", answer: "Backside post or dig — attacking the weak side of Cover 3" },
  { formation: "Goal Line — 13 Personnel", question: "What is the QB's first option?", answer: "QB sneak or play-action flat — short and decisive" },
];
