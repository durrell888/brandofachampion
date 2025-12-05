import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Calendar, DollarSign, MapPin, GraduationCap, Bookmark, BookmarkCheck, ExternalLink, Filter, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount_min: number | null;
  amount_max: number | null;
  deadline: string | null;
  gpa_requirement: number | null;
  grade_levels: string[] | null;
  states: string[] | null;
  description: string | null;
  eligibility: string | null;
  application_url: string | null;
  category: string | null;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "Nationwide"
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "athletic", label: "Athletic" },
  { value: "academic", label: "Academic" },
  { value: "need-based", label: "Need-Based" },
  { value: "minority", label: "Minority" },
  { value: "stem", label: "STEM" },
  { value: "arts", label: "Arts" },
];

const Scholarships = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [minGpa, setMinGpa] = useState<number>(0);
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        fetchScholarships();
        fetchSavedScholarships(session.user.id);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        fetchScholarships();
        fetchSavedScholarships(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchScholarships = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .order('deadline', { ascending: true, nullsFirst: false });

    if (error) {
      console.error('Error fetching scholarships:', error);
      toast({
        title: "Error",
        description: "Failed to load scholarships",
        variant: "destructive",
      });
    } else {
      setScholarships(data || []);
    }
    setIsLoading(false);
  };

  const fetchSavedScholarships = async (userId: string) => {
    const { data } = await supabase
      .from('saved_scholarships')
      .select('scholarship_id')
      .eq('user_id', userId);

    if (data) {
      setSavedIds(new Set(data.map(s => s.scholarship_id)));
    }
  };

  const toggleSaveScholarship = async (scholarshipId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const isSaved = savedIds.has(scholarshipId);

    if (isSaved) {
      const { error } = await supabase
        .from('saved_scholarships')
        .delete()
        .eq('user_id', session.user.id)
        .eq('scholarship_id', scholarshipId);

      if (!error) {
        setSavedIds(prev => {
          const next = new Set(prev);
          next.delete(scholarshipId);
          return next;
        });
        toast({ title: "Removed from saved scholarships" });
      }
    } else {
      const { error } = await supabase
        .from('saved_scholarships')
        .insert({ user_id: session.user.id, scholarship_id: scholarshipId });

      if (!error) {
        setSavedIds(prev => new Set([...prev, scholarshipId]));
        toast({ title: "Saved scholarship" });
      }
    }
  };

  const filteredScholarships = scholarships.filter(s => {
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !s.provider.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== "all" && s.category !== selectedCategory) {
      return false;
    }
    if (selectedState !== "all" && selectedState !== "Nationwide") {
      if (s.states && s.states.length > 0 && !s.states.includes(selectedState)) {
        return false;
      }
    }
    if (minGpa > 0 && s.gpa_requirement && s.gpa_requirement > minGpa) {
      return false;
    }
    if (s.amount_max && s.amount_max < amountRange[0]) {
      return false;
    }
    if (s.amount_min && s.amount_min > amountRange[1]) {
      return false;
    }
    return true;
  });

  const formatAmount = (min: number | null, max: number | null) => {
    if (!min && !max) return "Varies";
    if (min === max) return `$${min?.toLocaleString()}`;
    if (!min) return `Up to $${max?.toLocaleString()}`;
    if (!max) return `$${min?.toLocaleString()}+`;
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return "Rolling";
    return new Date(deadline).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <GraduationCap className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Scholarship Database</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access thousands of scholarship opportunities tailored for student athletes. 
              Create a free account to search, filter, and save scholarships.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Sign Up Free
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/auth')}>
                Log In
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Scholarship Finder</h1>
          <p className="text-muted-foreground">
            Search and filter scholarships to find opportunities that match your profile
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships by name or provider..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <SelectItem value="all">All States</SelectItem>
                      {US_STATES.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Minimum GPA: {minGpa.toFixed(1)}
                  </label>
                  <Slider
                    value={[minGpa]}
                    onValueChange={([val]) => setMinGpa(val)}
                    min={0}
                    max={4}
                    step={0.1}
                    className="mt-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Amount: ${amountRange[0].toLocaleString()} - ${amountRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={amountRange}
                    onValueChange={(val) => setAmountRange(val as [number, number])}
                    min={0}
                    max={100000}
                    step={1000}
                    className="mt-3"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedState("all");
                    setMinGpa(0);
                    setAmountRange([0, 100000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''}
        </p>

        {/* Scholarships Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredScholarships.length === 0 ? (
          <Card className="p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later for new opportunities.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-2">{scholarship.name}</CardTitle>
                      <CardDescription className="mt-1">{scholarship.provider}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => toggleSaveScholarship(scholarship.id)}
                    >
                      {savedIds.has(scholarship.id) ? (
                        <BookmarkCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {scholarship.description || "No description available"}
                  </p>

                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span className="font-semibold text-success">
                        {formatAmount(scholarship.amount_min, scholarship.amount_max)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Deadline: {formatDeadline(scholarship.deadline)}</span>
                    </div>

                    {scholarship.gpa_requirement && (
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>Min GPA: {scholarship.gpa_requirement}</span>
                      </div>
                    )}

                    {scholarship.states && scholarship.states.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">
                          {scholarship.states.slice(0, 3).join(", ")}
                          {scholarship.states.length > 3 && ` +${scholarship.states.length - 3}`}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 flex-wrap mt-3">
                      {scholarship.category && (
                        <Badge variant="secondary" className="capitalize">
                          {scholarship.category}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {scholarship.application_url && (
                    <Button
                      className="w-full mt-4 gap-2"
                      onClick={() => window.open(scholarship.application_url!, '_blank')}
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Scholarships;
