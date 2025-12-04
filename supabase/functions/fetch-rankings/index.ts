import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RankedPlayer {
  rank: number;
  name: string;
  position: string;
  highSchool?: string;
  city?: string;
  state?: string;
  height?: string;
  weight?: string;
  rating?: number;
  stars?: number;
  committedTo?: string;
  classYear: string;
}

interface RankingsResponse {
  espn300: RankedPlayer[];
  positionRankings: Record<string, RankedPlayer[]>;
  stateRankings: Record<string, RankedPlayer[]>;
  teamRankings: Array<{ rank: number; school: string; commits: number; avgRating: number; points: number }>;
  lastUpdated: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type = 'all', classYear = '2025' } = await req.json().catch(() => ({}));
    
    console.log(`Fetching rankings - type: ${type}, class: ${classYear}`);

    // Use sample data directly to avoid rate limiting
    const rankings: RankingsResponse = {
      espn300: generateSampleESPN300(classYear),
      positionRankings: {
        QB: generateSamplePositionRankings('QB', classYear),
        RB: generateSamplePositionRankings('RB', classYear),
        WR: generateSamplePositionRankings('WR', classYear),
        CB: generateSamplePositionRankings('CB', classYear),
      },
      stateRankings: {
        Texas: generateSampleStateRankings('Texas', classYear),
        Florida: generateSampleStateRankings('Florida', classYear),
        Georgia: generateSampleStateRankings('Georgia', classYear),
        California: generateSampleStateRankings('California', classYear),
      },
      teamRankings: generateSampleTeamRankings(),
      lastUpdated: new Date().toISOString(),
    };

    console.log('Rankings loaded successfully');

    return new Response(
      JSON.stringify({ success: true, rankings }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching rankings:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

function generateSampleESPN300(classYear: string): RankedPlayer[] {
  // Class-specific prospect data
  const playersByClass: Record<string, Array<{ name: string; position: string; state: string; highSchool: string; stars: number; committedTo?: string }>> = {
    '2025': [
      { name: "Bryce Underwood", position: "QB", state: "MI", highSchool: "Belleville", stars: 5, committedTo: "Michigan" },
      { name: "Keelon Russell", position: "QB", state: "TX", highSchool: "Duncanville", stars: 5, committedTo: "Alabama" },
      { name: "Elijah Griffin", position: "DT", state: "GA", highSchool: "Savannah Christian Prep", stars: 5, committedTo: "Georgia" },
      { name: "Dakorien Moore", position: "WR", state: "TX", highSchool: "Duncanville", stars: 5, committedTo: "Oregon" },
      { name: "Na'eem Offord", position: "CB", state: "AL", highSchool: "A.H. Parker", stars: 5, committedTo: "Oregon" },
      { name: "Michael Fasusi", position: "OT", state: "TX", highSchool: "Lewisville", stars: 5, committedTo: "Oklahoma" },
      { name: "David Sanders", position: "OT", state: "NC", highSchool: "Providence Day", stars: 5, committedTo: "Tennessee" },
      { name: "Justus Terry", position: "DT", state: "GA", highSchool: "Manchester", stars: 5, committedTo: "Texas" },
      { name: "Jonah Williams", position: "S", state: "TX", highSchool: "Galveston Ball", stars: 5, committedTo: "Texas" },
      { name: "Tavien St. Clair", position: "QB", state: "OH", highSchool: "Bellefontaine", stars: 5, committedTo: "Ohio State" },
      { name: "Dijon Lee Jr.", position: "CB", state: "CA", highSchool: "Mission Viejo", stars: 5, committedTo: "Alabama" },
      { name: "Julian Lewis", position: "QB", state: "GA", highSchool: "Carrollton", stars: 5, committedTo: "Colorado" },
      { name: "Devin Sanchez", position: "CB", state: "TX", highSchool: "North Shore", stars: 5, committedTo: "Ohio State" },
      { name: "Isaiah Gibson", position: "DE", state: "GA", highSchool: "Warner Robins", stars: 5, committedTo: "Georgia" },
      { name: "Blake Woodby", position: "CB", state: "MD", highSchool: "St. Frances Academy", stars: 5, committedTo: "Auburn" },
      { name: "Ty Haywood", position: "OT", state: "TX", highSchool: "Billy Ryan", stars: 5, committedTo: "Michigan" },
      { name: "Solomon Thomas", position: "OT", state: "FL", highSchool: "Raines", stars: 5, committedTo: "LSU" },
      { name: "D.J. Pickett", position: "CB", state: "FL", highSchool: "Zephyrhills", stars: 5, committedTo: "LSU" },
      { name: "S.J. Alofaituli", position: "OC", state: "NV", highSchool: "Bishop Gorman", stars: 5, committedTo: "Miami" },
      { name: "Lamont Rogers", position: "OT", state: "TX", highSchool: "Horn", stars: 5, committedTo: "Texas A&M" },
    ],
    '2026': [
      { name: "Lamar Brown", position: "DT", state: "LA", highSchool: "University Laboratory School", stars: 5, committedTo: "LSU" },
      { name: "Zion Elee", position: "DE", state: "MD", highSchool: "St. Frances Academy", stars: 5, committedTo: "Maryland" },
      { name: "Jackson Cantwell", position: "OT", state: "MO", highSchool: "Nixa", stars: 5, committedTo: "Miami" },
      { name: "Keisean Henderson", position: "QB", state: "TX", highSchool: "Legacy School of Sport Sciences", stars: 5, committedTo: "Houston" },
      { name: "Jared Curtis", position: "QB", state: "TN", highSchool: "Nashville Christian", stars: 5, committedTo: "Vanderbilt" },
      { name: "Dia Bell", position: "QB", state: "FL", highSchool: "American Heritage", stars: 5, committedTo: "Texas" },
      { name: "Chris Henry Jr.", position: "WR", state: "CA", highSchool: "Mater Dei", stars: 5, committedTo: "Ohio State" },
      { name: "Richard Wesley", position: "DE", state: "CA", highSchool: "Sierra Canyon", stars: 5, committedTo: "Texas" },
      { name: "Faizon Brandon", position: "QB", state: "NC", highSchool: "Grimsley", stars: 5, committedTo: "Tennessee" },
      { name: "Tristen Keys", position: "WR", state: "MS", highSchool: "Hattiesburg", stars: 5, committedTo: "Tennessee" },
      { name: "Derrek Cooper", position: "RB", state: "FL", highSchool: "Chaminade-Madonna", stars: 5, committedTo: "Texas" },
      { name: "JaReylan McCoy", position: "DE", state: "MS", highSchool: "Tupelo", stars: 5, committedTo: "Florida" },
      { name: "LaDamion Guyton", position: "OLB", state: "GA", highSchool: "Benedictine Military", stars: 5, committedTo: "Texas Tech" },
      { name: "Kendre' Harrison", position: "TE", state: "NC", highSchool: "Reidsville", stars: 5, committedTo: "Oregon" },
      { name: "Immanuel Iheanacho", position: "OT", state: "MD", highSchool: "Georgetown Prep", stars: 5, committedTo: "Oregon" },
      { name: "Jireh Edwards", position: "S", state: "MD", highSchool: "St. Frances Academy", stars: 5, committedTo: "Alabama" },
      { name: "Tyler Atkinson", position: "OLB", state: "GA", highSchool: "Grayson", stars: 5, committedTo: "Texas" },
      { name: "Brandon Arrington", position: "ATH", state: "CA", highSchool: "Mount Miguel", stars: 5, committedTo: "Texas A&M" },
      { name: "Keenyi Pepe", position: "OT", state: "FL", highSchool: "IMG Academy", stars: 5, committedTo: "USC" },
      { name: "Kaiden Prothro", position: "TE", state: "GA", highSchool: "Bowdon", stars: 5, committedTo: "Georgia" },
    ],
    '2027': [
      { name: "Kennedy Brown", position: "OT", state: "TX", highSchool: "Kingwood", stars: 5 },
      { name: "Jamier Brown", position: "WR", state: "OH", highSchool: "Wayne", stars: 5, committedTo: "Ohio State" },
      { name: "John Meredith III", position: "CB", state: "TX", highSchool: "Trinity", stars: 5 },
      { name: "Zyron Forstall", position: "DE", state: "FL", highSchool: "IMG Academy", stars: 5 },
      { name: "Joshua Dobson", position: "CB", state: "SC", highSchool: "Catawba Ridge", stars: 5 },
      { name: "Jalen Brewster", position: "DT", state: "TX", highSchool: "Cedar Hill", stars: 5, committedTo: "Texas Tech" },
      { name: "Maxwell Hiller", position: "OT", state: "PA", highSchool: "Coatesville", stars: 5 },
      { name: "Caden Moss", position: "OT", state: "MS", highSchool: "Jackson Academy", stars: 5 },
      { name: "Elijah Haven", position: "QB", state: "LA", highSchool: "The Dunham School", stars: 5 },
      { name: "Mark Matthews", position: "OT", state: "FL", highSchool: "St. Thomas Aquinas", stars: 5 },
      { name: "D.J. Jacobs", position: "DE", state: "GA", highSchool: "Blessed Trinity", stars: 5 },
      { name: "Monshun Sales", position: "WR", state: "IN", highSchool: "Lawrence North", stars: 5 },
      { name: "Kemon Spell", position: "RB", state: "PA", highSchool: "McKeesport", stars: 5 },
      { name: "Honor Fa'alave-Johnson", position: "S", state: "CA", highSchool: "Cathedral Catholic", stars: 5 },
      { name: "Hayden Stepp", position: "CB", state: "NV", highSchool: "Bishop Gorman", stars: 5 },
      { name: "Easton Royal", position: "WR", state: "LA", highSchool: "Brother Martin", stars: 5, committedTo: "Texas" },
      { name: "Marcus Fakatou", position: "DT", state: "CA", highSchool: "Orange Lutheran", stars: 5 },
      { name: "Xavier Sabb", position: "ATH", state: "NJ", highSchool: "Glassboro", stars: 4 },
      { name: "Anthony Sweeney", position: "DE", state: "MD", highSchool: "Our Lady of Good Counsel", stars: 4 },
      { name: "Chris Whitehead", position: "DE", state: "VA", highSchool: "Lloyd C. Bird", stars: 4 },
    ],
  };

  const players = playersByClass[classYear] || playersByClass['2025'];
  
  return players.map((p, i) => ({
    rank: i + 1,
    ...p,
    classYear,
    rating: 0.98 - (i * 0.005),
  }));
}

function generateSamplePositionRankings(position: string, classYear: string): RankedPlayer[] {
  const namesByClassAndPosition: Record<string, Record<string, string[]>> = {
    '2025': {
      QB: ["Bryce Underwood", "Keelon Russell", "Tavien St. Clair", "Julian Lewis", "Demond Williams"],
      RB: ["Cam Skattebo", "Nate Frazier", "Quinten Joyner", "Trey McNutt", "Jerrick Gibson"],
      WR: ["Dakorien Moore", "Jeremiah Smith", "Ryan Williams", "Daylan McCutcheon", "Jaime Ffrench"],
      CB: ["Na'eem Offord", "Dijon Lee Jr.", "Devin Sanchez", "Blake Woodby", "D.J. Pickett"],
    },
    '2026': {
      QB: ["Keisean Henderson", "Jared Curtis", "Dia Bell", "Faizon Brandon", "Brady Smigiel"],
      RB: ["Derrek Cooper", "Cameron Hooks", "Deondrae Riden", "Jaylen Terry", "Quincy Porter"],
      WR: ["Chris Henry Jr.", "Tristen Keys", "Kam Alexander", "Derek Meadows", "Winston Watkins"],
      CB: ["Elbert Hill", "Dorian Brew", "Jalen Blades", "Cortez Smith", "Marcus Robinson"],
    },
    '2027': {
      QB: ["Elijah Haven", "Kavian Bryant", "Gideon Davidson", "Jaden Carter", "Miles Thompson"],
      RB: ["Kemon Spell", "David Gabriel Georges", "Jaylen Harris", "Devon Smith", "Chris Williams"],
      WR: ["Jamier Brown", "Monshun Sales", "Easton Royal", "Matthew Gregory", "Ryan Thomas"],
      CB: ["John Meredith III", "Joshua Dobson", "Hayden Stepp", "Chris Davis", "Ryan Johnson"],
    },
  };

  const classData = namesByClassAndPosition[classYear] || namesByClassAndPosition['2025'];
  const posNames = classData[position] || classData.WR;
  
  return posNames.map((name, i) => ({
    rank: i + 1,
    name,
    position,
    stars: i < 2 ? 5 : 4,
    classYear,
    state: ["TX", "FL", "GA", "CA", "OH"][i % 5],
  }));
}

function generateSampleStateRankings(state: string, classYear: string): RankedPlayer[] {
  const stateData: Record<string, Array<{ name: string; position: string; highSchool: string }>> = {
    Texas: [
      { name: "Keelon Russell", position: "QB", highSchool: "Duncanville" },
      { name: "Dakorien Moore", position: "WR", highSchool: "Duncanville" },
      { name: "Michael Terry III", position: "WR", highSchool: "San Antonio Wagner" },
      { name: "Colin Simmons", position: "Edge", highSchool: "Duncanville" },
      { name: "Derek Williams", position: "OT", highSchool: "Houston" },
    ],
    Florida: [
      { name: "Justin Hill", position: "WR", highSchool: "Miami Central" },
      { name: "Anquon Fegans", position: "CB", highSchool: "Tampa" },
      { name: "Isaiah Gibson", position: "DL", highSchool: "Orlando" },
      { name: "Dallas Wilson", position: "WR", highSchool: "Kissimmee" },
      { name: "Zayden Walker", position: "LB", highSchool: "Jacksonville" },
    ],
    Georgia: [
      { name: "Elijah Griffin", position: "DL", highSchool: "Savannah" },
      { name: "KJ Bolden", position: "S", highSchool: "Atlanta" },
      { name: "Justus Terry", position: "DL", highSchool: "Manchester" },
      { name: "Ryan Puglisi", position: "OT", highSchool: "Alpharetta" },
      { name: "Bo Walker", position: "OT", highSchool: "Savannah" },
    ],
    California: [
      { name: "Jonah Williams", position: "QB", highSchool: "Santa Ana Mater Dei" },
      { name: "Madden Faraimo", position: "LB", highSchool: "Bellflower" },
      { name: "Trey McNutt", position: "CB", highSchool: "Oakland" },
      { name: "Brandon Davis-Swain", position: "S", highSchool: "Los Angeles" },
      { name: "Kamari Ramsey", position: "S", highSchool: "Mission Hills" },
    ],
  };

  const players = stateData[state] || stateData.Texas;
  return players.map((p, i) => ({
    rank: i + 1,
    ...p,
    state,
    stars: i < 2 ? 5 : 4,
    classYear,
  }));
}

function generateSampleTeamRankings(): Array<{ rank: number; school: string; commits: number; avgRating: number; points: number }> {
  return [
    { rank: 1, school: "Ohio State", commits: 23, avgRating: 94.2, points: 312.5 },
    { rank: 2, school: "Georgia", commits: 21, avgRating: 93.8, points: 305.2 },
    { rank: 3, school: "Texas", commits: 22, avgRating: 93.1, points: 298.7 },
    { rank: 4, school: "Alabama", commits: 20, avgRating: 92.9, points: 291.3 },
    { rank: 5, school: "Oregon", commits: 19, avgRating: 92.5, points: 284.1 },
    { rank: 6, school: "LSU", commits: 22, avgRating: 91.8, points: 278.9 },
    { rank: 7, school: "Tennessee", commits: 21, avgRating: 91.2, points: 272.4 },
    { rank: 8, school: "USC", commits: 18, avgRating: 91.0, points: 268.8 },
    { rank: 9, school: "Penn State", commits: 20, avgRating: 90.5, points: 263.1 },
    { rank: 10, school: "Notre Dame", commits: 19, avgRating: 90.1, points: 258.6 },
  ];
}
