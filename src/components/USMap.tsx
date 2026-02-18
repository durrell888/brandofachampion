import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface USMapProps {
  selectedState: string | null;
  onStateClick: (state: string) => void;
  statesWithSchools: string[];
}

// State colors based on flagship university
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

// Simplified state path data for US map SVG
// Using a grid-based state layout as a reliable fallback
const STATE_GRID: Array<{ name: string; col: number; row: number }> = [
  { name: "Alaska", col: 1, row: 7 },
  { name: "Hawaii", col: 2, row: 7 },
  { name: "Washington", col: 1, row: 1 },
  { name: "Oregon", col: 1, row: 2 },
  { name: "California", col: 1, row: 3 },
  { name: "Nevada", col: 2, row: 3 },
  { name: "Idaho", col: 2, row: 2 },
  { name: "Montana", col: 3, row: 1 },
  { name: "Wyoming", col: 3, row: 2 },
  { name: "Utah", col: 2, row: 4 },
  { name: "Colorado", col: 3, row: 3 },
  { name: "Arizona", col: 2, row: 5 },
  { name: "New Mexico", col: 3, row: 4 },
  { name: "North Dakota", col: 4, row: 1 },
  { name: "South Dakota", col: 4, row: 2 },
  { name: "Nebraska", col: 4, row: 3 },
  { name: "Kansas", col: 4, row: 4 },
  { name: "Oklahoma", col: 4, row: 5 },
  { name: "Texas", col: 4, row: 6 },
  { name: "Minnesota", col: 5, row: 1 },
  { name: "Iowa", col: 5, row: 2 },
  { name: "Missouri", col: 5, row: 3 },
  { name: "Arkansas", col: 5, row: 4 },
  { name: "Louisiana", col: 5, row: 5 },
  { name: "Wisconsin", col: 6, row: 1 },
  { name: "Illinois", col: 6, row: 2 },
  { name: "Tennessee", col: 6, row: 4 },
  { name: "Mississippi", col: 6, row: 5 },
  { name: "Michigan", col: 7, row: 1 },
  { name: "Indiana", col: 7, row: 2 },
  { name: "Kentucky", col: 7, row: 3 },
  { name: "Alabama", col: 7, row: 4 },
  { name: "Ohio", col: 8, row: 2 },
  { name: "Georgia", col: 8, row: 4 },
  { name: "Florida", col: 8, row: 5 },
  { name: "West Virginia", col: 8, row: 3 },
  { name: "Pennsylvania", col: 9, row: 2 },
  { name: "Virginia", col: 9, row: 3 },
  { name: "North Carolina", col: 9, row: 4 },
  { name: "South Carolina", col: 9, row: 5 },
  { name: "New York", col: 10, row: 1 },
  { name: "Maryland", col: 10, row: 3 },
  { name: "Delaware", col: 10, row: 4 },
  { name: "New Jersey", col: 10, row: 2 },
  { name: "Connecticut", col: 11, row: 2 },
  { name: "Rhode Island", col: 11, row: 3 },
  { name: "Massachusetts", col: 11, row: 1 },
  { name: "Vermont", col: 10, row: 0 },
  { name: "New Hampshire", col: 11, row: 0 },
  { name: "Maine", col: 12, row: 0 },
  { name: "District of Columbia", col: 10, row: 5 },
];

const CELL_SIZE = 52;
const PADDING = 10;

export function USMap({ selectedState, onStateClick, statesWithSchools }: USMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);

  const maxCol = Math.max(...STATE_GRID.map(s => s.col)) + 1;
  const maxRow = Math.max(...STATE_GRID.map(s => s.row)) + 1;
  const svgWidth = (maxCol + 1) * CELL_SIZE + PADDING * 2;
  const svgHeight = (maxRow + 1) * CELL_SIZE + PADDING * 2;

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: "100%", height: "auto" }}
        aria-label="US State Map"
      >
        {STATE_GRID.map(({ name, col, row }) => {
          const hasSchools = statesWithSchools.includes(name);
          const isSelected = selectedState === name;
          const isHovered = hoveredState === name;
          const stateColor = stateColors[name] || "#666";

          const x = PADDING + col * CELL_SIZE + 2;
          const y = PADDING + row * CELL_SIZE + 2;
          const w = CELL_SIZE - 4;
          const h = CELL_SIZE - 4;

          let fill = "hsl(var(--muted) / 0.4)";
          if (isSelected) fill = stateColor;
          else if (isHovered && hasSchools) fill = stateColor;
          else if (hasSchools) fill = "hsl(var(--primary) / 0.35)";

          const abbr = name
            .split(" ")
            .map(w => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <g
              key={name}
              onClick={() => hasSchools && onStateClick(name)}
              onMouseEnter={(e) => {
                if (hasSchools) setHoveredState(name);
                setTooltip({ x: x + w / 2, y, name });
              }}
              onMouseLeave={() => {
                setHoveredState(null);
                setTooltip(null);
              }}
              style={{ cursor: hasSchools ? "pointer" : "default" }}
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={4}
                fill={fill}
                stroke={isSelected || isHovered ? stateColor : "hsl(var(--border) / 0.4)"}
                strokeWidth={isSelected ? 2 : isHovered && hasSchools ? 1.5 : 0.5}
                style={{ transition: "fill 0.15s, stroke 0.15s" }}
              />
              <text
                x={x + w / 2}
                y={y + h / 2 + 4}
                textAnchor="middle"
                fontSize={name.length > 10 ? 8 : 10}
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
              x={Math.min(tooltip.x - 60, svgWidth - 130)}
              y={Math.max(tooltip.y - 36, 4)}
              width={120}
              height={28}
              rx={6}
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
            />
            <text
              x={Math.min(tooltip.x - 60, svgWidth - 130) + 60}
              y={Math.max(tooltip.y - 36, 4) + 17}
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
