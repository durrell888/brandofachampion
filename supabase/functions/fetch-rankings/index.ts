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
      { name: "Keelon Russell", position: "QB", state: "TX", highSchool: "Duncanville", stars: 5, committedTo: "Alabama" },
      { name: "Bryce Underwood", position: "QB", state: "MI", highSchool: "Belleville", stars: 5, committedTo: "Michigan" },
      { name: "Julian Lewis", position: "QB", state: "GA", highSchool: "Carrollton", stars: 5, committedTo: "Colorado" },
      { name: "Dakorien Moore", position: "WR", state: "TX", highSchool: "Duncanville", stars: 5, committedTo: "Texas" },
      { name: "Na'eem Offord", position: "CB", state: "OH", highSchool: "Birmingham", stars: 5, committedTo: "Ohio State" },
      { name: "Michael Terry III", position: "WR", state: "TX", highSchool: "San Antonio", stars: 5, committedTo: "Texas" },
      { name: "Elijah Griffin", position: "DL", state: "GA", highSchool: "Savannah", stars: 5, committedTo: "Georgia" },
      { name: "Tavaris Thornton", position: "CB", state: "AL", highSchool: "Alabaster", stars: 5, committedTo: "Alabama" },
      { name: "Byron Louis", position: "RB", state: "LA", highSchool: "Baton Rouge", stars: 5, committedTo: "LSU" },
      { name: "David Sanders Jr", position: "OT", state: "NC", highSchool: "Charlotte", stars: 5, committedTo: "Tennessee" },
    ],
    '2026': [
      { name: "Jahkeem Stewart", position: "DL", state: "LA", highSchool: "New Orleans", stars: 5 },
      { name: "Devin Carter", position: "WR", state: "FL", highSchool: "Miami", stars: 5 },
      { name: "Javion Hilson", position: "CB", state: "FL", highSchool: "Orlando", stars: 5 },
      { name: "Eugene Brooks", position: "DL", state: "NC", highSchool: "Raleigh", stars: 5 },
      { name: "Dorian Brew", position: "CB", state: "CA", highSchool: "Los Angeles", stars: 5 },
      { name: "Jaiden Davis", position: "RB", state: "TX", highSchool: "Dallas", stars: 5 },
      { name: "Marcus Harris", position: "OT", state: "GA", highSchool: "Atlanta", stars: 5 },
      { name: "Ty Haywood", position: "OT", state: "TX", highSchool: "Houston", stars: 5 },
      { name: "Dia Bell", position: "QB", state: "FL", highSchool: "Orlando", stars: 5 },
      { name: "Cam Coleman", position: "WR", state: "AL", highSchool: "Phenix City", stars: 5 },
    ],
    '2027': [
      { name: "Keenan Johnson", position: "QB", state: "FL", highSchool: "Jacksonville", stars: 5 },
      { name: "Marcus Brown", position: "RB", state: "TX", highSchool: "Austin", stars: 5 },
      { name: "Tyler Smith", position: "WR", state: "GA", highSchool: "Marietta", stars: 5 },
      { name: "Devon Williams", position: "CB", state: "CA", highSchool: "San Diego", stars: 5 },
      { name: "James Anderson", position: "DL", state: "OH", highSchool: "Columbus", stars: 5 },
      { name: "Chris Thompson", position: "LB", state: "AL", highSchool: "Birmingham", stars: 4 },
      { name: "Ryan Davis", position: "S", state: "FL", highSchool: "Tampa", stars: 4 },
      { name: "Justin Moore", position: "OT", state: "TX", highSchool: "San Antonio", stars: 4 },
      { name: "Brandon Taylor", position: "TE", state: "GA", highSchool: "Savannah", stars: 4 },
      { name: "Michael Jackson", position: "WR", state: "LA", highSchool: "New Orleans", stars: 4 },
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
      QB: ["Keelon Russell", "Jonah Williams", "Faizon Brandon", "Demond Williams", "Jaden O'Neal"],
      RB: ["Byron Louis", "Anthony Carrie", "Kevin Spraggins", "Ousman Touray", "Jerrick Gibson"],
      WR: ["Dakorien Moore", "Michael Terry III", "Justin Hill", "Daylan McCutcheon", "Jaime Ffrench"],
      CB: ["Na'eem Offord", "Tavaris Thornton", "Devin Sanchez", "Jordon Johnson-Rubell", "Charles Lester"],
    },
    '2026': {
      QB: ["Bryce Underwood", "Julian Lewis", "Dia Bell", "Madden Iamaleava", "Jared Curtis"],
      RB: ["Jaiden Davis", "Cameron Hooks", "Deondrae Riden", "Jaylen Terry", "Quincy Porter"],
      WR: ["Devin Carter", "Jailen Huff", "Kam Alexander", "Derek Meadows", "Winston Watkins"],
      CB: ["Javion Hilson", "Dorian Brew", "Jalen Blades", "Cortez Smith", "Marcus Robinson"],
    },
    '2027': {
      QB: ["Keenan Johnson", "Ethan Maxwell", "Derek Ross", "Jaden Carter", "Miles Thompson"],
      RB: ["Marcus Brown", "Tyler Green", "Jaylen Harris", "Devon Smith", "Chris Williams"],
      WR: ["Tyler Smith", "Michael Jackson", "Brandon Lee", "James Wilson", "Ryan Thomas"],
      CB: ["Devon Williams", "Marcus Taylor", "Justin Brown", "Chris Davis", "Ryan Johnson"],
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
