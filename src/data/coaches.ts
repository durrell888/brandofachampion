export interface Coach {
  id: string;
  name: string;
  position: string;
  positionGroup: string;
  image: string;
  bio: string;
  experience: string;
  specialties: string[];
}

export const coaches: Coach[] = [
  {
    id: "rb-coach",
    name: "Marcus Williams",
    position: "Running Backs Coach",
    positionGroup: "Running Backs",
    image: "/images/team/durrell-steen.jpg",
    bio: "Former NFL running back with 8 years of professional experience. Specializes in vision, footwork, and explosive movement training.",
    experience: "12+ years coaching",
    specialties: ["Ball Security", "Route Running", "Pass Protection", "Vision Training"]
  },
  {
    id: "qb-coach",
    name: "Derek Thompson",
    position: "Quarterbacks Coach",
    positionGroup: "Quarterbacks",
    image: "/images/team/aaron-ross.avif",
    bio: "Former D1 quarterback and offensive coordinator. Expert in quarterback mechanics, decision-making, and leadership development.",
    experience: "15+ years coaching",
    specialties: ["Throwing Mechanics", "Pocket Presence", "Reading Defenses", "Leadership"]
  },
  {
    id: "ol-coach",
    name: "James Carter",
    position: "Offensive Line Coach",
    positionGroup: "Offensive Lineman",
    image: "/images/team/everett-levy.jpeg",
    bio: "Former All-American offensive tackle. Specializes in technique, footwork, and developing physical dominance in the trenches.",
    experience: "10+ years coaching",
    specialties: ["Pass Protection", "Run Blocking", "Hand Technique", "Footwork"]
  },
  {
    id: "dl-coach",
    name: "Antoine Jackson",
    position: "Defensive Line Coach",
    positionGroup: "Defensive Lineman",
    image: "/images/team/durrell-steen.jpg",
    bio: "Former NFL defensive end with Pro Bowl experience. Expert in pass rush techniques and run defense fundamentals.",
    experience: "14+ years coaching",
    specialties: ["Pass Rush Moves", "Run Stuffing", "Hand Combat", "Explosion Training"]
  },
  {
    id: "wr-coach",
    name: "Terrance Mitchell",
    position: "Wide Receivers Coach",
    positionGroup: "Wide Receivers",
    image: "/images/team/aaron-ross.avif",
    bio: "Former professional wide receiver with exceptional route-running expertise. Develops elite separation and catching skills.",
    experience: "11+ years coaching",
    specialties: ["Route Running", "Separation Techniques", "Contested Catches", "Release Moves"]
  },
  {
    id: "lb-coach",
    name: "Brandon Foster",
    position: "Linebackers Coach",
    positionGroup: "Linebackers",
    image: "/images/team/everett-levy.jpeg",
    bio: "Former college linebacker and defensive coordinator. Specializes in instincts, tackling, and coverage skills.",
    experience: "13+ years coaching",
    specialties: ["Tackling Technique", "Zone Coverage", "Blitzing", "Reading Keys"]
  },
  {
    id: "db-coach",
    name: "Chris Anderson",
    position: "Defensive Backs Coach",
    positionGroup: "Defensive Backs",
    image: "/images/team/aaron-ross.avif",
    bio: "Former All-Pro cornerback with championship experience. Expert in coverage techniques and ball skills.",
    experience: "16+ years coaching",
    specialties: ["Man Coverage", "Zone Technique", "Ball Skills", "Hip Fluidity"]
  }
];

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
