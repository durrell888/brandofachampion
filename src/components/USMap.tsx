import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { cn } from "@/lib/utils";

interface USMapProps {
  selectedState: string | null;
  onStateClick: (state: string) => void;
  statesWithSchools: string[];
}

// GeoJSON URL for US states
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// State FIPS codes to names mapping
const stateNames: Record<string, string> = {
  "01": "Alabama",
  "02": "Alaska",
  "04": "Arizona",
  "05": "Arkansas",
  "06": "California",
  "08": "Colorado",
  "09": "Connecticut",
  "10": "Delaware",
  "11": "District of Columbia",
  "12": "Florida",
  "13": "Georgia",
  "15": "Hawaii",
  "16": "Idaho",
  "17": "Illinois",
  "18": "Indiana",
  "19": "Iowa",
  "20": "Kansas",
  "21": "Kentucky",
  "22": "Louisiana",
  "23": "Maine",
  "24": "Maryland",
  "25": "Massachusetts",
  "26": "Michigan",
  "27": "Minnesota",
  "28": "Mississippi",
  "29": "Missouri",
  "30": "Montana",
  "31": "Nebraska",
  "32": "Nevada",
  "33": "New Hampshire",
  "34": "New Jersey",
  "35": "New Mexico",
  "36": "New York",
  "37": "North Carolina",
  "38": "North Dakota",
  "39": "Ohio",
  "40": "Oklahoma",
  "41": "Oregon",
  "42": "Pennsylvania",
  "44": "Rhode Island",
  "45": "South Carolina",
  "46": "South Dakota",
  "47": "Tennessee",
  "48": "Texas",
  "49": "Utah",
  "50": "Vermont",
  "51": "Virginia",
  "53": "Washington",
  "54": "West Virginia",
  "55": "Wisconsin",
  "56": "Wyoming",
};

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

export function USMap({ selectedState, onStateClick, statesWithSchools }: USMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 1000,
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = stateNames[geo.id] || geo.properties.name;
              const hasSchools = statesWithSchools.includes(stateName);
              const isSelected = selectedState === stateName;
              const isHovered = hoveredState === stateName;
              const stateColor = stateColors[stateName] || "#666";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => hasSchools && onStateClick(stateName)}
                  onMouseEnter={() => hasSchools && setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  style={{
                    default: {
                      fill: isSelected
                        ? stateColor
                        : hasSchools
                          ? "hsl(var(--primary) / 0.3)"
                          : "hsl(var(--muted) / 0.5)",
                      stroke: "hsl(var(--border) / 0.5)",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: hasSchools ? stateColor : "hsl(var(--muted) / 0.5)",
                      stroke: hasSchools ? stateColor : "hsl(var(--border) / 0.5)",
                      strokeWidth: hasSchools ? 1.5 : 0.5,
                      outline: "none",
                      cursor: hasSchools ? "pointer" : "not-allowed",
                    },
                    pressed: {
                      fill: stateColor,
                      stroke: stateColor,
                      strokeWidth: 2,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      
      {/* Tooltip */}
      {hoveredState && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card border border-border px-3 py-1.5 rounded-lg shadow-lg pointer-events-none z-10">
          <p className="text-sm font-medium">{hoveredState}</p>
          {statesWithSchools.includes(hoveredState) && (
            <p className="text-xs text-muted-foreground">Click to view schools</p>
          )}
        </div>
      )}
    </div>
  );
}
