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
    id: "qb-coach",
    name: "Ron Veal",
    position: "Quarterbacks Coach",
    positionGroup: "Quarterbacks",
    image: "/images/team/ron-veal.jpg",
    bio: "Elite quarterback developer with extensive experience training athletes at all levels. Expert in quarterback mechanics, decision-making, and leadership development.",
    experience: "15+ years coaching",
    specialties: ["Throwing Mechanics", "Pocket Presence", "Reading Defenses", "Leadership"]
  },
  {
    id: "wr-coach",
    name: "Hilton Alexander",
    position: "Wide Receivers Coach",
    positionGroup: "Wide Receivers",
    image: "/images/team/hilton-alexander.jpg",
    bio: "Former professional wide receiver with exceptional route-running expertise. Develops elite separation and catching skills.",
    experience: "11+ years coaching",
    specialties: ["Route Running", "Separation Techniques", "Contested Catches", "Release Moves"]
  },
  {
    id: "strength-coach",
    name: "Scott Lashley",
    position: "Physical Performance & Development Coach",
    positionGroup: "Strength & Conditioning",
    image: "/images/team/durrell-steen.jpg",
    bio: "Elite strength and conditioning coach specializing in athletic performance development. Focuses on building functional strength, speed, and power for football athletes.",
    experience: "10+ years coaching",
    specialties: ["Strength Training", "Speed Development", "Power Training", "Athletic Performance"]
  },
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
