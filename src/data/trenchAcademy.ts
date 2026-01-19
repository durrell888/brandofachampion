import { Shield, Target, Zap, Brain, Eye, Video, Users, Award, TrendingUp, Dumbbell } from "lucide-react";

export interface PositionCurriculum {
  id: string;
  position: string;
  title: string;
  description: string;
  icon: string;
  modules: {
    title: string;
    topics: string[];
    duration: string;
  }[];
  filmEvaluation: {
    angles: string[];
    metrics: string[];
  };
}

export interface FilmEvaluationProcess {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const trenchAcademyInfo = {
  name: "Trench Academy IQ",
  tagline: "Elite Position Training for the Next Generation of Champions",
  experience: "30+ Years of Elite Coaching Experience",
  description: `Trench Academy IQ stands as the premier destination for elite football position training in the United States. With over three decades of combined coaching experience at the highest levels of the sport, our staff has developed, trained, and mentored athletes who have gone on to dominate at the collegiate and professional levels.

Unlike traditional camps that offer generalized instruction, Trench Academy IQ specializes in position-specific mastery. We dissect every aspect of linebacker, offensive line, defensive line, and running back play—from fundamental stance and start mechanics to advanced scheme recognition and situational awareness.

Our methodology sets us apart from elite programs like IMG Academy, Excel Sports, and nationally recognized position camps. We don't just train athletes—we engineer complete players through an intensive curriculum that combines on-field technique work with comprehensive film study and cognitive development.`,
  
  differentiators: [
    {
      title: "Elite Coaching Staff",
      description: "Former NFL coaches and players with 30+ years combined experience at the highest levels",
      icon: "Award"
    },
    {
      title: "Position Mastery",
      description: "Deep-dive curriculum covering every technique, scenario, and mental aspect of each position",
      icon: "Target"
    },
    {
      title: "Multi-Angle Film Analysis",
      description: "Revolutionary film breakdown from 7+ camera angles for complete player evaluation",
      icon: "Video"
    },
    {
      title: "Cognitive Development",
      description: "Mental game training for reading formations, anticipating plays, and making split-second decisions",
      icon: "Brain"
    },
    {
      title: "College-Ready Athletes",
      description: "Preparing players not just for the next level, but to dominate when they arrive",
      icon: "TrendingUp"
    },
    {
      title: "Virtual Coaching Platform",
      description: "Online film review sessions where coaches evaluate your film from anywhere",
      icon: "Eye"
    }
  ],

  stats: [
    { value: "30+", label: "Years Experience" },
    { value: "500+", label: "Athletes Trained" },
    { value: "150+", label: "College Commits" },
    { value: "25+", label: "NFL Players Developed" }
  ],

  videoReviewLink: "https://meet.jit.si/TrenchAcademyIQ-FilmReview"
};

export const filmEvaluationProcess: FilmEvaluationProcess[] = [
  {
    step: 1,
    title: "Film Submission",
    description: "Athletes submit game and practice film through our secure portal. We accept Hudl links, direct uploads, and YouTube/Vimeo links.",
    icon: "Video"
  },
  {
    step: 2,
    title: "Multi-Angle Analysis",
    description: "Our coaching staff breaks down your film from 7 different camera angles: End Zone, Sideline, All-22, Tight End Zone, Backfield, Press Box, and Ground Level.",
    icon: "Eye"
  },
  {
    step: 3,
    title: "Technical Assessment",
    description: "Coaches evaluate stance, first step quickness, hand placement, leverage, pad level, hip flexibility, and finishing ability on every rep.",
    icon: "Target"
  },
  {
    step: 4,
    title: "Cognitive Evaluation",
    description: "We analyze your pre-snap reads, recognition speed, play diagnosis, and decision-making under pressure.",
    icon: "Brain"
  },
  {
    step: 5,
    title: "Detailed Report",
    description: "Receive a comprehensive evaluation report with strengths, areas for improvement, and a personalized development plan.",
    icon: "Shield"
  },
  {
    step: 6,
    title: "Virtual Review Session",
    description: "Schedule a live video call with our coaches to walk through your evaluation and answer questions about your development.",
    icon: "Users"
  }
];

export const positionCurriculums: PositionCurriculum[] = [
  {
    id: "linebacker",
    position: "Linebacker",
    title: "Complete Linebacker Development",
    description: "Master every aspect of linebacker play from run fits to coverage responsibilities. Our linebacker curriculum develops complete defenders who can dominate against the run, excel in coverage, and terrorize quarterbacks on the blitz.",
    icon: "Shield",
    modules: [
      {
        title: "Stance & Alignment Fundamentals",
        duration: "Week 1-2",
        topics: [
          "Two-point vs. three-point stance mechanics",
          "Proper weight distribution and balance",
          "Alignment rules based on defensive scheme",
          "Pre-snap key reading position",
          "Depth adjustments by formation"
        ]
      },
      {
        title: "Run Defense Mastery",
        duration: "Week 3-4",
        topics: [
          "Gap responsibility and run fits",
          "Downhill attack vs. read-and-react",
          "Taking on blocks with proper leverage",
          "Shed techniques: rip, swim, club",
          "Pursuit angles and tackling fundamentals",
          "Spill vs. box technique decisions"
        ]
      },
      {
        title: "Pass Coverage Excellence",
        duration: "Week 5-6",
        topics: [
          "Zone coverage principles and landmarks",
          "Man-to-man coverage technique on RBs/TEs",
          "Pattern matching concepts",
          "Breaking on the ball",
          "Backpedal and hip turn mechanics",
          "Understanding route combinations"
        ]
      },
      {
        title: "Blitz & Pressure Packages",
        duration: "Week 7-8",
        topics: [
          "Edge rush techniques",
          "Interior blitz paths",
          "Timing and disguise",
          "Beating pass protection schemes",
          "Contain responsibility on designed rushes",
          "Safety blitz coordination"
        ]
      },
      {
        title: "Mental Game & Film Study",
        duration: "Week 9-10",
        topics: [
          "Pre-snap formation recognition",
          "Reading offensive line blocking schemes",
          "Identifying run/pass keys",
          "Communication and defensive calls",
          "Situational awareness (down & distance)",
          "Self-scouting and film breakdown"
        ]
      }
    ],
    filmEvaluation: {
      angles: ["End Zone", "Sideline", "All-22", "Tight End Zone", "Press Box"],
      metrics: [
        "First step reaction time",
        "Block destruction efficiency",
        "Tackle success rate",
        "Coverage ability rating",
        "Blitz effectiveness",
        "Formation recognition speed"
      ]
    }
  },
  {
    id: "offensive-line",
    position: "Offensive Line",
    title: "Offensive Line Dominance Program",
    description: "Develop into an elite offensive lineman who can pancake defenders in the run game and provide a clean pocket in pass protection. Our comprehensive O-Line curriculum covers every position from center to tackle.",
    icon: "Dumbbell",
    modules: [
      {
        title: "Stance & First Step Mechanics",
        duration: "Week 1-2",
        topics: [
          "Three-point stance fundamentals",
          "Weight distribution for run vs. pass",
          "First step explosion and direction",
          "Hand placement preparation",
          "Pre-snap identification of defensive fronts"
        ]
      },
      {
        title: "Run Blocking Fundamentals",
        duration: "Week 3-5",
        topics: [
          "Drive blocking technique",
          "Reach blocking and cut-off blocks",
          "Double-team to second level",
          "Pull technique (trap, counter, power)",
          "Zone blocking footwork and landmarks",
          "Finishing blocks through the whistle"
        ]
      },
      {
        title: "Pass Protection Mastery",
        duration: "Week 6-8",
        topics: [
          "Pass set depth and angle",
          "Anchor strength development",
          "Hand fighting and punch timing",
          "Mirroring edge rushers",
          "Handling interior stunts and twists",
          "Sliding protection responsibilities"
        ]
      },
      {
        title: "Position-Specific Skills",
        duration: "Week 9-10",
        topics: [
          "Center: Snap mechanics and line calls",
          "Guard: Pulling and combo blocks",
          "Tackle: Kick-slide and edge protection",
          "Understanding offensive line communication",
          "Adjusting to defensive looks"
        ]
      },
      {
        title: "Scheme Knowledge & Film Study",
        duration: "Week 11-12",
        topics: [
          "Recognizing defensive fronts and blitzes",
          "Making protection calls",
          "Understanding gap schemes vs. zone schemes",
          "Identifying defensive tendencies on film",
          "Self-evaluation and correction"
        ]
      }
    ],
    filmEvaluation: {
      angles: ["End Zone", "Sideline", "All-22", "Backfield View", "Ground Level"],
      metrics: [
        "Pad level consistency",
        "Hand placement accuracy",
        "First step quickness",
        "Sustain block duration",
        "Pass protection success rate",
        "Pancake block frequency"
      ]
    }
  },
  {
    id: "defensive-line",
    position: "Defensive Line",
    title: "Defensive Line Destruction System",
    description: "Become an unstoppable force in the trenches. Our D-Line curriculum teaches the techniques, moves, and mentality needed to dominate offensive linemen, stuff the run, and terrorize quarterbacks.",
    icon: "Zap",
    modules: [
      {
        title: "Stance & Explosion",
        duration: "Week 1-2",
        topics: [
          "Three and four-point stance mechanics",
          "Get-off timing and explosion",
          "First step direction and power",
          "Hand placement on engagement",
          "Alignment and gap responsibility"
        ]
      },
      {
        title: "Run Defense Techniques",
        duration: "Week 3-5",
        topics: [
          "Two-gap vs. one-gap technique",
          "Defeating single blocks",
          "Fighting through double teams",
          "Maintaining gap integrity",
          "Pursuit and tackle fundamentals",
          "Spilling vs. squeezing runs"
        ]
      },
      {
        title: "Pass Rush Arsenal",
        duration: "Week 6-8",
        topics: [
          "Speed rush technique",
          "Power/bull rush fundamentals",
          "Rip and swim moves",
          "Club and arm-over moves",
          "Counter rush techniques",
          "Finishing at the quarterback"
        ]
      },
      {
        title: "Position-Specific Development",
        duration: "Week 9-10",
        topics: [
          "Defensive End: Edge setting and contain",
          "Defensive Tackle: Interior disruption",
          "Nose Guard: Anchor and clog techniques",
          "3-tech: Penetration and disruption",
          "Hand fighting repertoire development"
        ]
      },
      {
        title: "Mental Preparation & Film Study",
        duration: "Week 11-12",
        topics: [
          "Reading offensive line sets",
          "Identifying run vs. pass keys",
          "Recognizing blocking schemes",
          "Studying individual matchup tendencies",
          "Developing a game-day pass rush plan"
        ]
      }
    ],
    filmEvaluation: {
      angles: ["End Zone", "Sideline", "All-22", "Tight End Zone", "Ground Level", "Press Box"],
      metrics: [
        "Get-off timing",
        "Block destruction rate",
        "Pressure creation rate",
        "Gap discipline score",
        "Pass rush win rate",
        "Tackle for loss frequency"
      ]
    }
  },
  {
    id: "running-back",
    position: "Running Back",
    title: "Elite Running Back Academy",
    description: "Transform into a complete three-down running back. Our curriculum develops vision, patience, explosiveness, pass-catching ability, and pass protection—everything needed to be the total package at the position.",
    icon: "TrendingUp",
    modules: [
      {
        title: "Stance & Ball Security",
        duration: "Week 1-2",
        topics: [
          "Proper stance mechanics",
          "Ball carrying fundamentals",
          "High-and-tight technique",
          "Switching the ball in open field",
          "Ball security under contact"
        ]
      },
      {
        title: "Vision & Patience",
        duration: "Week 3-4",
        topics: [
          "Reading blocking schemes",
          "Zone run vision and landmarks",
          "Gap scheme recognition",
          "One-cut mentality",
          "Setting up blocks with patience",
          "Pressing the hole before exploding"
        ]
      },
      {
        title: "Explosiveness & Cutting",
        duration: "Week 5-6",
        topics: [
          "Jump cut technique",
          "Plant-and-go acceleration",
          "Making defenders miss in space",
          "Breaking tackles at contact",
          "Speed development and burst"
        ]
      },
      {
        title: "Receiving Skills",
        duration: "Week 7-8",
        topics: [
          "Route running from the backfield",
          "Swing, wheel, and option routes",
          "Catching technique and hand positioning",
          "Yards after catch mentality",
          "Route adjustments vs. coverage"
        ]
      },
      {
        title: "Pass Protection",
        duration: "Week 9-10",
        topics: [
          "Blitz pickup responsibilities",
          "Chip blocking technique",
          "Cutting vs. squaring up defenders",
          "Communication with the QB",
          "Recognizing blitz packages"
        ]
      },
      {
        title: "Complete Game Film Study",
        duration: "Week 11-12",
        topics: [
          "Studying defensive fronts and tendencies",
          "Understanding down-and-distance situations",
          "Two-minute offense responsibilities",
          "Goal line and short yardage mentality",
          "Self-scouting your running style"
        ]
      }
    ],
    filmEvaluation: {
      angles: ["End Zone", "Sideline", "All-22", "Backfield View", "Ground Level", "Tight End Zone"],
      metrics: [
        "Vision and patience rating",
        "Yards after contact average",
        "Broken tackle rate",
        "Pass protection grade",
        "Receiving ability score",
        "Ball security rating"
      ]
    }
  }
];
