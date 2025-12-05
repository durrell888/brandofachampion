import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, DollarSign, Calendar, GraduationCap, MapPin, ExternalLink, Bookmark, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string | null;
  eligibility: string | null;
  amount_min: number | null;
  amount_max: number | null;
  deadline: string | null;
  gpa_requirement: number | null;
  grade_levels: string[] | null;
  states: string[] | null;
  category: string | null;
  application_url: string | null;
  source_url: string | null;
}

const Scholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ];

  const gradeOptions = ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "College Freshman", "College Sophomore"];
  const categories = ["Athletic", "Academic", "Need-Based", "Merit", "Community Service", "STEM", "Arts", "Leadership"];

  useEffect(() => {
    fetchScholarships();
  }, []);

  useEffect(() => {
    filterScholarships();
  }, [searchTerm, gradeFilter, stateFilter, categoryFilter, scholarships]);

  const fetchScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from("scholarships")
        .select("*")
        .order("deadline", { ascending: true });

      if (error) throw error;
      setScholarships(data || []);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      toast({
        title: "Error",
        description: "Failed to load scholarships",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterScholarships = () => {
    let filtered = [...scholarships];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.provider.toLowerCase().includes(term) ||
          s.description?.toLowerCase().includes(term)
      );
    }

    if (gradeFilter !== "all") {
      filtered = filtered.filter((s) => s.grade_levels?.includes(gradeFilter));
    }

    if (stateFilter !== "all") {
      filtered = filtered.filter(
        (s) => !s.states || s.states.length === 0 || s.states.includes(stateFilter)
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((s) => s.category === categoryFilter);
    }

    setFilteredScholarships(filtered);
  };

  const formatAmount = (min: number | null, max: number | null) => {
    if (!min && !max) return "Varies";
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `$${min.toLocaleString()}+`;
    if (max) return `Up to $${max.toLocaleString()}`;
    return "Varies";
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return "Rolling";
    return new Date(deadline).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your <span className="text-accent">Scholarship</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Search thousands of scholarships tailored for student-athletes. Filter by grade, state, and category to find the perfect opportunities.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search scholarships by name, provider, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-border"
            />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {gradeOptions.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(gradeFilter !== "all" || stateFilter !== "all" || categoryFilter !== "all" || searchTerm) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setGradeFilter("all");
                  setStateFilter("all");
                  setCategoryFilter("all");
                  setSearchTerm("");
                }}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {loading ? "Loading..." : `${filteredScholarships.length} scholarships found`}
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredScholarships.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setGradeFilter("all");
                  setStateFilter("all");
                  setCategoryFilter("all");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="group hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold group-hover:text-accent transition-colors line-clamp-2">
                          {scholarship.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{scholarship.provider}</p>
                      </div>
                      {scholarship.category && (
                        <Badge variant="secondary" className="shrink-0">
                          {scholarship.category}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scholarship.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {scholarship.description}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="font-medium">
                          {formatAmount(scholarship.amount_min, scholarship.amount_max)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{formatDeadline(scholarship.deadline)}</span>
                      </div>
                      {scholarship.gpa_requirement && (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-accent" />
                          <span>{scholarship.gpa_requirement}+ GPA</span>
                        </div>
                      )}
                      {scholarship.states && scholarship.states.length > 0 && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="truncate">
                            {scholarship.states.length > 2
                              ? `${scholarship.states.slice(0, 2).join(", ")}...`
                              : scholarship.states.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {scholarship.grade_levels && scholarship.grade_levels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {scholarship.grade_levels.slice(0, 3).map((grade) => (
                          <Badge key={grade} variant="outline" className="text-xs">
                            {grade}
                          </Badge>
                        ))}
                        {scholarship.grade_levels.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{scholarship.grade_levels.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {scholarship.application_url && (
                        <Button asChild size="sm" className="flex-1">
                          <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
                            Apply Now
                            <ExternalLink className="w-3 h-3 ml-2" />
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Scholarships;
