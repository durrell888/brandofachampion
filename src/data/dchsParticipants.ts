export interface DCHSParticipant {
  id: string;
  name: string;
  grade: number;
  position?: string;
  vertical?: number;
  fortyYard?: number;
  flyingTen?: number;
  hundredMeter?: number;
  status: "active" | "inactive" | "no-show";
}

export const dchsParticipants: DCHSParticipant[] = [
  { id: "janoris-barner", name: "Janoris Barner", grade: 10, status: "active" },
  { id: "alex-mcdonald", name: "Alex Mcdonald", grade: 11, status: "active" },
  { id: "david-parsons", name: "David Parsons", grade: 11, status: "active" },
  { id: "deterrian-manning", name: "Deterrian Manning", grade: 10, position: "OLine", status: "active" },
  { id: "kj-green", name: "KJ Green", grade: 11, status: "active" },
  { id: "adryan-cole", name: "Adryan Cole", grade: 11, status: "active" },
  { id: "bj-shannon", name: "BJ Shannon", grade: 11, status: "active" },
  { id: "faraji-tucker", name: "Faraji Tucker", grade: 10, status: "inactive" },
  { id: "steven-mclendon", name: "Steven Mclendon", grade: 10, status: "active" },
  { id: "joshua-sam-epelle", name: "Joshua Sam Epelle", grade: 11, status: "active" },
  { id: "zaydrean-jackson", name: "Zaydrean Jackson", grade: 10, status: "no-show" },
  { id: "terrence-brandon", name: "Terrence Brandon", grade: 10, status: "inactive" },
  { id: "ezra-jackson", name: "Ezra Jackson", grade: 11, status: "active" },
  { id: "caleb-gilbert", name: "Caleb Gilbert", grade: 11, status: "active" },
  { id: "mekhi-cunningham", name: "Mekhi Cunningham", grade: 10, status: "active" },
];

export const benchmarks = {
  vertical: {
    title: "Standing Vertical Jump",
    unit: "inches",
    positions: [
      { position: "Wide Receiver / Running Back", collegeMin: 33, collegeMax: 36, proAvg: 38 },
      { position: "Defensive Back", collegeMin: 32, collegeMax: 36, proAvg: 37 },
      { position: "Quarterback", collegeMin: 27.5, collegeMax: 34.5, proAvg: 32 },
      { position: "Tight End", collegeMin: 26.5, collegeMax: 34, proAvg: 33 },
      { position: "Linebacker", collegeMin: 30, collegeMax: 35, proAvg: 35 },
      { position: "Offensive Line", collegeMin: 24, collegeMax: 30, proAvg: 28 },
      { position: "Defensive Line", collegeMin: 28, collegeMax: 33, proAvg: 32 },
    ],
  },
  fortyYard: {
    title: "40-Yard Dash",
    unit: "seconds",
    positions: [
      { position: "Skill Positions (WR, CB, RB)", collegeMin: 4.4, collegeMax: 4.5, proAvg: 4.35 },
      { position: "General Roster Average", collegeMin: 4.6, collegeMax: 4.7, proAvg: 4.55 },
      { position: "Linemen / Linebacker", collegeMin: 4.8, collegeMax: 5.0, proAvg: 4.9 },
    ],
  },
  hundredMeter: {
    title: "100-Meter Sprint",
    unit: "seconds",
    tiers: [
      { tier: "Fast (Elite Speed)", collegeMin: 10.18, collegeMax: 10.6, description: "College elite (4.3-4.4s 40)" },
      { tier: "Average (Good Speed)", collegeMin: 10.7, collegeMax: 11.2, description: "Average college player (4.5-4.6s 40)" },
      { tier: "Solid (Functional Speed)", collegeMin: 11.3, collegeMax: 11.6, description: "Solid contributor (4.7s 40)" },
    ],
  },
};
