import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Bookmark, BookmarkCheck, ExternalLink, Calendar, DollarSign, GraduationCap, MapPin, X, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string | null;
  amount_min: number | null;
  amount_max: number | null;
  deadline: string | null;
  gpa_requirement: number | null;
  grade_levels: string[] | null;
  states: string[] | null;
  eligibility: string | null;
  application_url: string | null;
  category: string | null;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const GRADE_LEVELS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "College Freshman", "College Sophomore", "College Junior", "College Senior"];
const CATEGORIES = ["Athletic", "Academic", "Need-Based", "Merit-Based", "Community Service", "STEM", "Arts", "Minority", "Women", "First Generation"];

const Scholarships = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [savedScholarshipIds, setSavedScholarshipIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minGPA, setMinGPA] = useState<number>(0);
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 50000]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchScholarships();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSavedScholarships();
    } else {
      setSavedScholarshipIds(new Set());
    }
  }, [user]);

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

  const fetchSavedScholarships = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("saved_scholarships")
        .select("scholarship_id")
        .eq("user_id", user.id);

      if (error) throw error;
      setSavedScholarshipIds(new Set(data?.map(s => s.scholarship_id) || []));
    } catch (error) {
      console.error("Error fetching saved scholarships:", error);
    }
  };

  const toggleSaveScholarship = async (scholarshipId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save scholarships",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const isSaved = savedScholarshipIds.has(scholarshipId);

    try {
      if (isSaved) {
        const { error } = await supabase
          .from("saved_scholarships")
          .delete()
          .eq("user_id", user.id)
          .eq("scholarship_id", scholarshipId);

        if (error) throw error;
        setSavedScholarshipIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(scholarshipId);
          return newSet;
        });
        toast({ title: "Scholarship removed from saved" });
      } else {
        const { error } = await supabase
          .from("saved_scholarships")
          .insert({ user_id: user.id, scholarship_id: scholarshipId });

        if (error) throw error;
        setSavedScholarshipIds(prev => new Set([...prev, scholarshipId]));
        toast({ title: "Scholarship saved!" });
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      toast({
        title: "Error",
        description: "Failed to update saved scholarships",
        variant: "destructive",
      });
    }
  };

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(scholarship => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          scholarship.name.toLowerCase().includes(query) ||
          scholarship.provider.toLowerCase().includes(query) ||
          scholarship.description?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // State filter
      if (selectedState && selectedState !== "all") {
        if (!scholarship.states?.includes(selectedState)) return false;
      }

      // Grade level filter
      if (selectedGradeLevel && selectedGradeLevel !== "all") {
        if (!scholarship.grade_levels?.includes(selectedGradeLevel)) return false;
      }

      // Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (scholarship.category !== selectedCategory) return false;
      }

      // GPA filter
      if (minGPA > 0) {
        if (scholarship.gpa_requirement && scholarship.gpa_requirement > minGPA) return false;
      }

      // Amount range filter
      if (scholarship.amount_max && scholarship.amount_max < amountRange[0]) return false;
      if (scholarship.amount_min && scholarship.amount_min > amountRange[1]) return false;

      return true;
    });
  }, [scholarships, searchQuery, selectedState, selectedGradeLevel, selectedCategory, minGPA, amountRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("");
    setSelectedGradeLevel("");
    setSelectedCategory("");
    setMinGPA(0);
    setAmountRange([0, 50000]);
  };

  const formatAmount = (min: number | null, max: number | null) => {
    if (!min && !max) return "Varies";
    if (min === max) return `$${min?.toLocaleString()}`;
    if (!min) return `Up to $${max?.toLocaleString()}`;
    if (!max) return `$${min?.toLocaleString()}+`;
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 hero-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-4">
              Scholarship Database
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 tracking-tight">
              Find Your Perfect Scholarship
            </h1>
            <p className="text-xl text-primary-foreground/70">
              Search thousands of scholarships and save the ones that match your profile.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search scholarships by name, provider, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-accent" />
                    <h2 className="font-bold text-lg text-foreground">Filters</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="lg:hidden"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* State Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All states" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All states</SelectItem>
                        {US_STATES.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Grade Level Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">Grade Level</Label>
                    <Select value={selectedGradeLevel} onValueChange={setSelectedGradeLevel}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All grade levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All grade levels</SelectItem>
                        {GRADE_LEVELS.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* GPA Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">
                      Minimum GPA: {minGPA > 0 ? minGPA.toFixed(1) : "Any"}
                    </Label>
                    <Slider
                      value={[minGPA]}
                      onValueChange={([value]) => setMinGPA(value)}
                      max={4.0}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  {/* Amount Range Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">
                      Award Amount: ${amountRange[0].toLocaleString()} - ${amountRange[1].toLocaleString()}
                    </Label>
                    <Slider
                      value={amountRange}
                      onValueChange={(value) => setAmountRange(value as [number, number])}
                      max={50000}
                      step={500}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-bold text-foreground">{filteredScholarships.length}</span> scholarships
                </p>
                {user && savedScholarshipIds.size > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <BookmarkCheck className="w-3 h-3" />
                    {savedScholarshipIds.size} saved
                  </Badge>
                )}
              </div>

              {loading ? (
                <div className="grid gap-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                      </CardHeader>
                      <CardContent>
                        <div className="h-16 bg-muted rounded" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredScholarships.length === 0 ? (
                <Card className="text-center py-16">
                  <CardContent>
                    <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">No scholarships found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                    <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredScholarships.map(scholarship => (
                    <Card key={scholarship.id} className="group hover:border-accent/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-foreground group-hover:text-accent transition-colors">
                              {scholarship.name}
                            </CardTitle>
                            <CardDescription className="text-sm font-medium">
                              {scholarship.provider}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSaveScholarship(scholarship.id)}
                            className={savedScholarshipIds.has(scholarship.id) ? "text-accent" : "text-muted-foreground"}
                          >
                            {savedScholarshipIds.has(scholarship.id) ? (
                              <BookmarkCheck className="w-5 h-5" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {scholarship.description || scholarship.eligibility || "No description available"}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="gap-1">
                            <DollarSign className="w-3 h-3" />
                            {formatAmount(scholarship.amount_min, scholarship.amount_max)}
                          </Badge>
                          {scholarship.deadline && (
                            <Badge variant="outline" className="gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(scholarship.deadline), "MMM d, yyyy")}
                            </Badge>
                          )}
                          {scholarship.gpa_requirement && (
                            <Badge variant="outline" className="gap-1">
                              <GraduationCap className="w-3 h-3" />
                              {scholarship.gpa_requirement}+ GPA
                            </Badge>
                          )}
                          {scholarship.states && scholarship.states.length > 0 && (
                            <Badge variant="outline" className="gap-1">
                              <MapPin className="w-3 h-3" />
                              {scholarship.states.length === 1 ? scholarship.states[0] : `${scholarship.states.length} states`}
                            </Badge>
                          )}
                          {scholarship.category && (
                            <Badge variant="secondary">{scholarship.category}</Badge>
                          )}
                        </div>

                        {scholarship.application_url && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="gap-2"
                          >
                            <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
                              Apply Now <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Scholarships;