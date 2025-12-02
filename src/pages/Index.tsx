import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import AthleteCard from "@/components/AthleteCard";
import SupportCategories from "@/components/SupportCategories";
import Footer from "@/components/Footer";
import { mockAthletes } from "@/data/athletes";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{ sports: string[]; support: string[] }>({
    sports: [],
    support: [],
  });

  const filteredAthletes = useMemo(() => {
    return mockAthletes.filter((athlete) => {
      // Search query filter
      const matchesQuery =
        searchQuery === "" ||
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Sport filter
      const matchesSport =
        filters.sports.length === 0 || filters.sports.includes(athlete.sport);

      // Support filter
      const matchesSupport =
        filters.support.length === 0 ||
        athlete.supportNeeded.some((s) => filters.support.includes(s));

      return matchesQuery && matchesSport && matchesSupport;
    });
  }, [searchQuery, filters]);

  const handleSearch = (query: string, newFilters: { sports: string[]; support: string[] }) => {
    setSearchQuery(query);
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Athletes Section */}
      <section id="athletes" className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover Athletes
            </h2>
            <p className="text-lg text-muted-foreground">
              Find athletes who need support and connect them with the resources they deserve.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          <div className="mt-12">
            {filteredAthletes.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredAthletes.length} athlete{filteredAthletes.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAthletes.map((athlete, index) => (
                    <AthleteCard key={athlete.id} athlete={athlete} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border-2 border-dashed border-border">
                <p className="text-muted-foreground">No athletes found matching your criteria.</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section id="services">
        <SupportCategories />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl hero-gradient p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-20 w-48 h-48 rounded-full bg-accent blur-3xl" />
              <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Join our network of supporters and help athletes transition successfully into their next chapter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Become a Partner
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;