import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import AthleteCard from "@/components/AthleteCard";
import Footer from "@/components/Footer";
import { mockAthletes } from "@/data/athletes";

const Athletes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{ sports: string[]; support: string[]; years: string[] }>({
    sports: [],
    support: [],
    years: [],
  });

  const filteredAthletes = useMemo(() => {
    return mockAthletes.filter((athlete) => {
      const matchesQuery =
        searchQuery === "" ||
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSport =
        filters.sports.length === 0 || filters.sports.includes(athlete.sport);

      const matchesSupport =
        filters.support.length === 0 ||
        athlete.supportNeeded.some((s) => filters.support.includes(s));

      const matchesYear =
        filters.years.length === 0 ||
        (athlete.classYear && filters.years.includes(athlete.classYear));

      return matchesQuery && matchesSport && matchesSupport && matchesYear;
    });
  }, [searchQuery, filters]);

  const handleSearch = (query: string, newFilters: { sports: string[]; support: string[]; years: string[] }) => {
    setSearchQuery(query);
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 hero-gradient">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-4">
              Our Athletes
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 tracking-tight">
              Discover Athletes
            </h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl mx-auto">
              Find athletes who need support and connect them with the resources they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Athletes Section */}
      <section className="py-16">
        <div className="container">
          <SearchBar onSearch={handleSearch} />

          <div className="mt-12">
            {filteredAthletes.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Showing <span className="text-foreground font-bold">{filteredAthletes.length}</span> athlete{filteredAthletes.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAthletes.map((athlete, index) => (
                    <AthleteCard key={athlete.id} athlete={athlete} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border">
                <p className="text-foreground font-semibold text-lg">No athletes found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Athletes;
