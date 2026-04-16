export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  purpose: string;
  videoPlaceholder?: string;
  hudlUrl?: string;
  formation?: string;
  downAndDistance?: string;
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
