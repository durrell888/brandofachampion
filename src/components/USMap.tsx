import { useState } from "react";

interface USMapProps {
  selectedState: string | null;
  onStateClick: (state: string) => void;
  statesWithSchools: string[];
}

const stateColors: Record<string, string> = {
  "Alabama": "#9E1B32",
  "Alaska": "#003087",
  "Arizona": "#CC0033",
  "Arkansas": "#9D2235",
  "California": "#003262",
  "Colorado": "#CFB87C",
  "Connecticut": "#000E2F",
  "Delaware": "#00539F",
  "Florida": "#0021A5",
  "Georgia": "#BA0C2F",
  "Hawaii": "#024731",
  "Idaho": "#F1B300",
  "Illinois": "#E84A27",
  "Indiana": "#990000",
  "Iowa": "#FFCD00",
  "Kansas": "#0051BA",
  "Kentucky": "#0033A0",
  "Louisiana": "#461D7C",
  "Maine": "#003263",
  "Maryland": "#E03A3E",
  "Massachusetts": "#881C1C",
  "Michigan": "#00274C",
  "Minnesota": "#7A0019",
  "Mississippi": "#14213D",
  "Missouri": "#F1B82D",
  "Montana": "#6C2D40",
  "Nebraska": "#E41C38",
  "Nevada": "#003366",
  "New Hampshire": "#004990",
  "New Jersey": "#CC0033",
  "New Mexico": "#BA0C2F",
  "New York": "#F76900",
  "North Carolina": "#7BAFD4",
  "North Dakota": "#009A44",
  "Ohio": "#BB0000",
  "Oklahoma": "#841617",
  "Oregon": "#154733",
  "Pennsylvania": "#011F5B",
  "Rhode Island": "#002147",
  "South Carolina": "#73000A",
  "South Dakota": "#C8102E",
  "Tennessee": "#FF8200",
  "Texas": "#BF5700",
  "Utah": "#CC0000",
  "Vermont": "#007155",
  "Virginia": "#232D4B",
  "Washington": "#4B2E83",
  "West Virginia": "#002855",
  "Wisconsin": "#C5050C",
  "Wyoming": "#492F24",
  "District of Columbia": "#041E42",
};

// Real US state SVG paths (simplified)
const statePaths: Record<string, string> = {
  "Alabama": "M628,396 L628,466 L618,480 L622,488 L614,488 L608,478 L604,396Z",
  "Alaska": "M161,453 L183,453 L183,519 L161,519Z",
  "Arizona": "M205,372 L272,372 L272,446 L232,466 L205,446Z",
  "Arkansas": "M540,390 L600,390 L600,440 L540,440Z",
  "California": "M120,270 L168,270 L192,340 L192,430 L156,450 L120,410Z",
  "Colorado": "M280,290 L370,290 L370,350 L280,350Z",
  "Connecticut": "M810,195 L840,190 L845,210 L815,215Z",
  "Delaware": "M780,285 L795,280 L798,305 L783,308Z",
  "Florida": "M640,462 L700,440 L730,468 L718,520 L680,540 L650,510 L640,490Z",
  "Georgia": "M640,390 L695,390 L700,440 L640,462Z",
  "Hawaii": "M260,495 L300,495 L300,520 L260,520Z",
  "Idaho": "M220,140 L262,140 L270,260 L230,260 L220,200Z",
  "Illinois": "M560,240 L595,240 L600,260 L590,340 L560,380 L545,340 L548,260Z",
  "Indiana": "M600,250 L636,250 L636,340 L600,350Z",
  "Iowa": "M480,220 L550,220 L555,275 L480,275Z",
  "Kansas": "M380,310 L470,310 L470,365 L380,365Z",
  "Kentucky": "M600,330 L690,310 L700,340 L640,370 L600,360Z",
  "Louisiana": "M540,450 L590,440 L600,480 L570,500 L540,480Z",
  "Maine": "M840,90 L870,80 L880,140 L850,160 L840,130Z",
  "Maryland": "M720,275 L780,265 L790,280 L785,310 L740,310 L720,290Z",
  "Massachusetts": "M810,175 L860,168 L860,190 L810,195Z",
  "Michigan": "M570,120 L620,110 L640,160 L630,220 L580,230 L560,180Z",
  "Minnesota": "M460,100 L530,100 L540,200 L480,210 L460,160Z",
  "Mississippi": "M580,400 L618,396 L614,488 L580,480Z",
  "Missouri": "M490,290 L560,285 L570,380 L540,390 L490,370Z",
  "Montana": "M240,100 L370,100 L370,170 L240,170Z",
  "Nebraska": "M370,240 L470,240 L475,305 L370,290Z",
  "Nevada": "M170,240 L220,240 L230,260 L210,370 L170,350Z",
  "New Hampshire": "M830,120 L848,115 L850,165 L830,175Z",
  "New Jersey": "M790,230 L805,225 L808,280 L793,285Z",
  "New Mexico": "M270,375 L355,375 L355,455 L270,455Z",
  "New York": "M730,145 L810,125 L820,180 L790,220 L730,230Z",
  "North Carolina": "M650,350 L760,335 L770,360 L660,385Z",
  "North Dakota": "M370,100 L460,100 L460,165 L370,165Z",
  "Ohio": "M640,240 L695,230 L700,300 L650,320 L636,280Z",
  "Oklahoma": "M370,365 L470,365 L490,370 L490,410 L380,420 L370,395Z",
  "Oregon": "M120,140 L220,140 L220,210 L120,230Z",
  "Pennsylvania": "M700,215 L790,200 L795,250 L700,265Z",
  "Rhode Island": "M840,200 L855,198 L855,215 L840,218Z",
  "South Carolina": "M660,380 L730,360 L740,395 L680,410Z",
  "South Dakota": "M370,170 L460,170 L468,240 L370,240Z",
  "Tennessee": "M570,350 L690,330 L700,355 L580,380Z",
  "Texas": "M320,420 L470,410 L490,410 L500,445 L480,520 L420,550 L360,530 L320,480Z",
  "Utah": "M230,260 L280,260 L280,360 L230,360Z",
  "Vermont": "M810,110 L830,105 L832,165 L812,170Z",
  "Virginia": "M680,300 L770,280 L780,320 L700,340Z",
  "Washington": "M130,60 L230,60 L230,140 L130,130Z",
  "West Virginia": "M680,280 L720,270 L730,320 L700,340 L680,310Z",
  "Wisconsin": "M510,120 L570,120 L580,220 L540,230 L510,200Z",
  "Wyoming": "M270,170 L370,170 L370,250 L270,250Z",
  "District of Columbia": "M750,295 L758,293 L760,300 L752,302Z",
};

export function USMap({ selectedState, onStateClick, statesWithSchools }: USMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-x-auto">
      <svg
        viewBox="100 50 800 510"
        style={{ width: "100%", height: "auto" }}
        aria-label="US State Map"
      >
        {Object.entries(statePaths).map(([name, path]) => {
          const hasSchools = statesWithSchools.includes(name);
          const isSelected = selectedState === name;
          const isHovered = hoveredState === name;
          const stateColor = stateColors[name] || "#666";

          let fill = "hsl(var(--muted) / 0.4)";
          if (isSelected) fill = stateColor;
          else if (isHovered && hasSchools) fill = stateColor;
          else if (hasSchools) fill = "hsl(var(--primary) / 0.35)";

          // Calculate centroid for label
          const coords = path.match(/(\d+),(\d+)/g) || [];
          let cx = 0, cy = 0;
          coords.forEach(c => {
            const [x, y] = c.split(",").map(Number);
            cx += x; cy += y;
          });
          cx /= coords.length || 1;
          cy /= coords.length || 1;

          const abbr = name === "District of Columbia" ? "DC" : 
            name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

          return (
            <g
              key={name}
              onClick={() => hasSchools && onStateClick(name)}
              onMouseEnter={() => {
                if (hasSchools) setHoveredState(name);
                setTooltip({ x: cx, y: cy - 15, name });
              }}
              onMouseLeave={() => {
                setHoveredState(null);
                setTooltip(null);
              }}
              style={{ cursor: hasSchools ? "pointer" : "default" }}
            >
              <path
                d={path}
                fill={fill}
                stroke={isSelected || isHovered ? stateColor : "hsl(var(--border) / 0.6)"}
                strokeWidth={isSelected ? 2.5 : isHovered && hasSchools ? 2 : 0.8}
                style={{ transition: "fill 0.2s, stroke 0.2s" }}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize={name === "District of Columbia" || name === "Rhode Island" || name === "Delaware" || name === "Connecticut" || name === "New Hampshire" || name === "Vermont" ? 7 : 9}
                fontWeight={isSelected || hasSchools ? "600" : "400"}
                fill={isSelected || (isHovered && hasSchools) ? "#fff" : hasSchools ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {abbr}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={Math.min(Math.max(tooltip.x - 60, 105), 780)}
              y={Math.max(tooltip.y - 30, 55)}
              width={120}
              height={26}
              rx={6}
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
            />
            <text
              x={Math.min(Math.max(tooltip.x - 60, 105), 780) + 60}
              y={Math.max(tooltip.y - 30, 55) + 16}
              textAnchor="middle"
              fontSize={11}
              fontWeight="500"
              fill="hsl(var(--foreground))"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {tooltip.name}
            </text>
          </g>
        )}
      </svg>

      <p className="text-xs text-muted-foreground text-center mt-2">
        Highlighted states have available schools · Click to filter
      </p>
    </div>
  );
}
