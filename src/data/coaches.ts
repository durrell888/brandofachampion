export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface Coach {
  id: string;
  name: string;
  position: string;
  positionGroup: string;
  image: string;
  bio: string;
  experience: string;
  specialties: string[];
  curriculum: CurriculumModule[];
  videoUrl?: string;
  externalLink?: string;
}

export const coaches: Coach[] = [
  {
    id: "qb-coach",
    name: "Ron Veal",
    position: "Quarterbacks Coach",
    positionGroup: "Quarterbacks",
    image: "/images/team/ron-veal.jpg",
    bio: "Elite quarterback developer with extensive experience training athletes at all levels. Expert in quarterback mechanics, decision-making, and leadership development.",
    experience: "15+ years coaching",
    specialties: ["Throwing Mechanics", "Pocket Presence", "Reading Defenses", "Leadership"],
    curriculum: [
      { title: "Footwork Fundamentals", topics: ["Drops", "Resets", "Pocket movement"] },
      { title: "Throwing Mechanics & Arm Care", topics: ["Proper throwing motion", "Arm strength exercises", "Injury prevention"] },
      { title: "Timing & Accuracy", topics: ["Route timing", "Ball placement", "Anticipation throws"] },
      { title: "Reading Defenses & Coverages", topics: ["Pre-snap reads", "Post-snap adjustments", "Identifying blitzes"] },
      { title: "Film Study & Situational Awareness", topics: ["Game film breakdown", "Opponent tendencies", "Situational football"] },
      { title: "Leadership & Command", topics: ["Huddle presence", "Communication", "Team leadership"] }
    ]
  },
  {
    id: "wr-coach",
    name: "Hilton Alexander",
    position: "Wide Receivers Coach",
    positionGroup: "Wide Receivers",
    image: "/images/team/hilton-alexander.jpg",
    bio: "Former professional wide receiver with exceptional route-running expertise. Develops elite separation and catching skills.",
    experience: "11+ years coaching",
    specialties: ["Route Running", "Separation Techniques", "Contested Catches", "Release Moves"],
    curriculum: [
      { title: "Release Techniques vs Press", topics: ["Hand fighting", "Foot fire", "Inside/outside releases"] },
      { title: "Route Running & Stem Control", topics: ["Precise breaks", "Stem manipulation", "Speed control"] },
      { title: "Hands & Ball Tracking", topics: ["Catching technique", "High-pointing the ball", "Over-the-shoulder catches"] },
      { title: "Body Control & Sideline Awareness", topics: ["Toe-tap catches", "Body positioning", "Spatial awareness"] },
      { title: "Blocking Fundamentals", topics: ["Stalk blocking", "Cut blocking", "Sustaining blocks"] },
      { title: "Timing with Quarterback", topics: ["Route depth", "Break timing", "Chemistry building"] }
    ],
    externalLink: "https://linktr.ee/routekingtraining?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
  },
  {
    id: "strength-coach",
    name: "Scott Lashley",
    position: "Physical Performance & Development Coach",
    positionGroup: "Strength & Conditioning",
    image: "/images/team/scott-lashley.png",
    bio: "Elite strength and conditioning coach specializing in athletic performance development. Focuses on building functional strength, speed, and power for football athletes.",
    experience: "10+ years coaching",
    specialties: ["Strength Training", "Speed Development", "Power Training", "Athletic Performance"],
    curriculum: [
      { title: "Strength Foundation", topics: ["Compound lifts", "Core stability", "Functional strength"] },
      { title: "Explosive Power Development", topics: ["Olympic lifts", "Plyometrics", "Power cleans"] },
      { title: "Speed & Acceleration", topics: ["Sprint mechanics", "First-step quickness", "Top-end speed"] },
      { title: "Agility & Change of Direction", topics: ["Lateral movement", "Cutting technique", "Reaction drills"] },
      { title: "Football-Specific Conditioning", topics: ["Energy system training", "Work capacity", "Recovery protocols"] },
      { title: "Injury Prevention & Recovery", topics: ["Mobility work", "Prehab exercises", "Recovery techniques"] }
    ],
    externalLink: "https://www.slpathlete.com/home"
  },
  {
    id: "ol-coach",
    name: "Kevin McAlmont",
    position: "Offensive Line Coach",
    positionGroup: "Offensive Line",
    image: "/images/team/kevin-mcalmont.jpg",
    bio: "Expert offensive line coach with deep knowledge of blocking schemes, leverage, and trench warfare. Develops linemen with elite technique and football IQ.",
    experience: "12+ years coaching",
    specialties: ["Run Blocking", "Pass Protection", "Line Communication", "Trench Technique"],
    curriculum: [
      { title: "Stance & First Step", topics: ["Three-point stance", "Get-off", "Initial punch timing"] },
      { title: "Hand Placement & Punch Timing", topics: ["Inside hands", "Punch power", "Hand replacement"] },
      { title: "Leverage & Pad Level", topics: ["Playing low", "Knee bend", "Power angles"] },
      { title: "Run Blocking Schemes", topics: ["Zone blocking", "Gap schemes", "Combo blocks"] },
      { title: "Pass Protection Sets", topics: ["Kick slide", "Vertical set", "Anchor technique"] },
      { title: "Defensive Recognition", topics: ["Reading fronts", "Identifying stunts", "Communication"] }
    ]
  }
];

// Position-specific curriculums for future expansion
export const positionCurriculums = {
  quarterback: {
    focus: "Decision-making, mechanics, leadership",
    modules: [
      { title: "Footwork", topics: ["Drops", "Resets", "Pocket movement"] },
      { title: "Throwing Mechanics & Arm Care", topics: ["Proper motion", "Arm strength", "Injury prevention"] },
      { title: "Timing & Accuracy", topics: ["Route timing", "Ball placement", "Anticipation"] },
      { title: "Reading Defenses & Coverages", topics: ["Pre-snap reads", "Post-snap keys", "Blitz recognition"] },
      { title: "Film Study & Situational Awareness", topics: ["Game film", "Opponent tendencies", "Situational football"] },
      { title: "Leadership & Command of Offense", topics: ["Huddle presence", "Audibles", "Team leadership"] }
    ]
  },
  runningBack: {
    focus: "Vision, toughness, versatility",
    modules: [
      { title: "Ball Security & Handoffs", topics: ["Proper carry", "Exchange technique", "High-low tuck"] },
      { title: "Vision & Patience", topics: ["Reading blocks", "Patience at LOS", "Hole recognition"] },
      { title: "Explosive Cuts & Contact Balance", topics: ["Jump cuts", "Spin moves", "Staying on feet"] },
      { title: "Pass Protection Technique", topics: ["Picking up blitzes", "Chip blocks", "Half-back pass pro"] },
      { title: "Route Running Out of Backfield", topics: ["Wheel routes", "Checkdowns", "Option routes"] },
      { title: "Conditioning for High-Impact Plays", topics: ["Repeated effort", "4th quarter running", "Recovery"] }
    ]
  },
  wideReceiver: {
    focus: "Separation, hands, precision",
    modules: [
      { title: "Release Techniques vs Press", topics: ["Hand fighting", "Foot fire", "Inside/outside releases"] },
      { title: "Route Running & Stem Control", topics: ["Precise breaks", "Stem manipulation", "Speed control"] },
      { title: "Hands & Ball Tracking", topics: ["Catching technique", "High-pointing", "Over-shoulder catches"] },
      { title: "Body Control & Sideline Awareness", topics: ["Toe-tap catches", "Body positioning", "Spatial awareness"] },
      { title: "Blocking Fundamentals", topics: ["Stalk blocking", "Cut blocking", "Sustaining blocks"] },
      { title: "Timing with Quarterback", topics: ["Route depth", "Break timing", "Chemistry building"] }
    ]
  },
  tightEnd: {
    focus: "Hybrid athlete development",
    modules: [
      { title: "Route Running & Leverage", topics: ["Seam routes", "Using size", "Leverage advantages"] },
      { title: "Blocking Technique", topics: ["Inline blocking", "Blocking in space", "Combo blocks"] },
      { title: "Hand Strength & Catching in Traffic", topics: ["Contested catches", "Strong hands", "Body positioning"] },
      { title: "Footwork for Mismatches", topics: ["Beating linebackers", "Exploiting safeties", "Movement skills"] },
      { title: "Conditioning for Size/Speed Balance", topics: ["Maintaining weight", "Speed work", "Endurance"] }
    ]
  },
  offensiveLine: {
    focus: "Technique, power, intelligence",
    modules: [
      { title: "Stance & First Step", topics: ["Three-point stance", "Get-off", "Initial punch timing"] },
      { title: "Hand Placement & Punch Timing", topics: ["Inside hands", "Punch power", "Hand replacement"] },
      { title: "Leverage & Pad Level", topics: ["Playing low", "Knee bend", "Power angles"] },
      { title: "Run Blocking Schemes", topics: ["Zone blocking", "Gap schemes", "Combo blocks"] },
      { title: "Pass Protection Sets", topics: ["Kick slide", "Vertical set", "Anchor technique"] },
      { title: "Defensive Recognition", topics: ["Reading fronts", "Identifying stunts", "Communication"] }
    ]
  },
  defensiveLine: {
    focus: "Disruption & control",
    modules: [
      { title: "Stance & Get-Off", topics: ["Explosive start", "First-step quickness", "Low pad level"] },
      { title: "Hand Fighting & Shedding Blocks", topics: ["Club moves", "Rip moves", "Swim moves"] },
      { title: "Gap Control & Leverage", topics: ["Gap responsibility", "Two-gap technique", "Holding the point"] },
      { title: "Pass Rush Moves", topics: ["Speed rush", "Power rush", "Counter moves"] },
      { title: "Run-Fit Discipline", topics: ["Reading keys", "Spilling vs squeezing", "Pursuit angles"] },
      { title: "Conditioning for Trench Play", topics: ["Repeated effort", "4th quarter push", "Recovery"] }
    ]
  },
  linebacker: {
    focus: "Speed + instincts",
    modules: [
      { title: "Read & React Skills", topics: ["Key reading", "Flow recognition", "Downhill runs"] },
      { title: "Tackling Technique", topics: ["Form tackling", "Wrap-up technique", "Open-field tackles"] },
      { title: "Block Destruction", topics: ["Shedding blocks", "Taking on blockers", "Disengaging"] },
      { title: "Coverage Drops & Zone Awareness", topics: ["Hook zones", "Curl-flat", "Pattern matching"] },
      { title: "Blitz Timing", topics: ["Gap blitzes", "Zone blitzes", "Timing and execution"] },
      { title: "Leadership & Communication", topics: ["Making calls", "Defensive adjustments", "Team communication"] }
    ]
  },
  defensiveBack: {
    focus: "Coverage, speed, ball skills",
    modules: [
      { title: "Backpedal & Transitions", topics: ["Fluid hips", "Click-and-drive", "Speed turn"] },
      { title: "Man & Zone Coverage Technique", topics: ["Trail technique", "Pattern matching", "Zone discipline"] },
      { title: "Eye Discipline", topics: ["Reading QB eyes", "Route recognition", "Key progression"] },
      { title: "Ball Tracking & Interceptions", topics: ["High-pointing", "Playing through hands", "Ball skills"] },
      { title: "Open-Field Tackling", topics: ["Angle taking", "Wrap-up technique", "Run support"] },
      { title: "Film Recognition", topics: ["Tendency study", "Route concepts", "Formation recognition"] }
    ]
  }
};

export const trainingAreas = [
  {
    id: "movement",
    title: "Movement & Athletic Foundations",
    description: "Build the athletic base every football player needs through proper movement patterns, flexibility, and coordination.",
    icon: "Footprints"
  },
  {
    id: "strength",
    title: "Strength & Power Development",
    description: "Develop functional strength and explosive power through sport-specific training protocols.",
    icon: "Dumbbell"
  },
  {
    id: "speed",
    title: "Speed, Acceleration & Conditioning",
    description: "Maximize your speed and endurance with cutting-edge training methods and conditioning programs.",
    icon: "Zap"
  },
  {
    id: "position",
    title: "Position-Specific Skill Development",
    description: "Master the techniques and skills unique to your position under expert coaching.",
    icon: "Target"
  },
  {
    id: "football-iq",
    title: "Football IQ & Film Study",
    description: "Elevate your understanding of the game through film analysis and strategic learning.",
    icon: "Brain"
  },
  {
    id: "mental",
    title: "Mental Performance & Confidence",
    description: "Develop the mental toughness and confidence needed to perform under pressure.",
    icon: "Heart"
  },
  {
    id: "habits",
    title: "Accountability & Professional Habits",
    description: "Build the daily habits and discipline that separate good players from great ones.",
    icon: "CheckCircle"
  }
];
