import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import AthleteCard from "@/components/AthleteCard";
import SupportCategories from "@/components/SupportCategories";
import NewsletterSignup from "@/components/NewsletterSignup";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { mockAthletes } from "@/data/athletes";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Heart } from "lucide-react";
import { DonationModal } from "@/components/DonationModal";

const Index = () => {
  const [donationModalOpen, setDonationModalOpen] = useState(false);
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
      <EmailCapturePopup />
      <Navbar />
      <Hero />

      {/* Athletes Section */}
      <section id="athletes" className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-4">
              Featured Athletes
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
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

      {/* Support Categories */}
      <section id="services">
        <SupportCategories />
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl hero-gradient">
            {/* Background effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl" />
            </div>

            <div className="relative z-10 p-12 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                  Join The Movement
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6 tracking-tight">
                  Ready to Make a Difference?
                </h2>
                <p className="text-xl text-primary-foreground/70 mb-10 max-w-xl mx-auto">
                  Join our network of supporters and help athletes transition successfully into their next chapter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/partners">
                    <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                      <Handshake className="w-5 h-5" />
                      Become a Partner
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button 
                    variant="heroOutline" 
                    size="xl" 
                    className="group"
                    onClick={() => setDonationModalOpen(true)}
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </Button>
                </div>
                <DonationModal open={donationModalOpen} onOpenChange={setDonationModalOpen} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <Footer />
    </main>
  );
};

export default Index;
