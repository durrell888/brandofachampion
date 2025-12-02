import { useState } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sports = ["Basketball", "Football", "Soccer", "Tennis", "Swimming", "Track & Field", "Baseball", "Hockey"];
const supportTypes = ["Career", "Education", "Mental Health", "Financial", "Housing", "Legal"];

interface SearchBarProps {
  onSearch: (query: string, filters: { sports: string[]; support: string[] }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);

  const toggleSport = (sport: string) => {
    const updated = selectedSports.includes(sport)
      ? selectedSports.filter((s) => s !== sport)
      : [...selectedSports, sport];
    setSelectedSports(updated);
    onSearch(query, { sports: updated, support: selectedSupport });
  };

  const toggleSupport = (support: string) => {
    const updated = selectedSupport.includes(support)
      ? selectedSupport.filter((s) => s !== support)
      : [...selectedSupport, support];
    setSelectedSupport(updated);
    onSearch(query, { sports: selectedSports, support: updated });
  };

  const clearFilters = () => {
    setSelectedSports([]);
    setSelectedSupport([]);
    onSearch(query, { sports: [], support: [] });
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    onSearch(value, { sports: selectedSports, support: selectedSupport });
  };

  const hasFilters = selectedSports.length > 0 || selectedSupport.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search athletes by name, sport, or location..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="pl-12 h-14 text-base bg-card border border-border focus:border-accent/50 focus:ring-2 focus:ring-accent/20 rounded-xl shadow-sm font-medium"
          />
        </div>
        <Button
          variant={showFilters ? "hero" : "outline"}
          size="lg"
          onClick={() => setShowFilters(!showFilters)}
          className="h-14 px-6"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
          {hasFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-primary-foreground text-accent rounded-full font-bold">
              {selectedSports.length + selectedSupport.length}
            </span>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="mt-4 p-6 bg-card rounded-xl border border-border card-shadow animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground">Filter Athletes</h3>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-accent hover:text-accent">
                <X className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Sport</p>
              <div className="flex flex-wrap gap-2">
                {sports.map((sport) => (
                  <Badge
                    key={sport}
                    variant={selectedSports.includes(sport) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                      selectedSports.includes(sport)
                        ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90"
                        : "hover:border-accent hover:text-accent"
                    }`}
                    onClick={() => toggleSport(sport)}
                  >
                    {sport}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Support Needed</p>
              <div className="flex flex-wrap gap-2">
                {supportTypes.map((support) => (
                  <Badge
                    key={support}
                    variant={selectedSupport.includes(support) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                      selectedSupport.includes(support)
                        ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90"
                        : "hover:border-accent hover:text-accent"
                    }`}
                    onClick={() => toggleSupport(support)}
                  >
                    {support}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
