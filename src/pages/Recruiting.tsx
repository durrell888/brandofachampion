import { useState, useMemo, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { USMap } from "@/components/USMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Phone, Mail, Twitter, GraduationCap, Building, Search, Users, X, Lock, CreditCard, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const CONTACT_LIMIT = 6;
const CONTACT_WINDOW_DAYS = 30;

// Watermark component for premium content
const ContentWatermark = ({ email }: { email: string }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-[0.08]">
    <div className="absolute inset-0 flex flex-wrap gap-16 -rotate-12 scale-150">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="text-xs font-mono whitespace-nowrap text-foreground">
          {email}
        </span>
      ))}
    </div>
  </div>
);

interface School {
  id: string;
  name: string;
  mascot: string | null;
  conference: string;
  state: string;
  city: string | null;
  website: string | null;
  logo_url: string | null;
}

interface Coach {
  id: string;
  school_id: string;
  role: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  twitter: string | null;
}

interface SchoolContact {
  id: string;
  user_id: string;
  school_id: string;
  contacted_at: string;
}

const conferences = [
  "All",
  "SEC",
  "Big Ten",
  "Big 12",
  "ACC",
  "Pac-12",
  "American",
  "Mountain West",
  "Sun Belt",
  "MAC",
  "Conference USA",
  "Independent",
];

export default function Recruiting() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [coachSearchQuery, setCoachSearchQuery] = useState("");
  const [selectedConference, setSelectedConference] = useState("All");
  const [showCoachSearch, setShowCoachSearch] = useState(false);
  
  // Auth & subscription state
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  // Contact limit state
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [contactedSchools, setContactedSchools] = useState<Set<string>>(new Set());

  // Check auth state and subscription
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          checkSubscription(session.access_token);
        }, 0);
      } else {
        setIsSubscribed(false);
        setSubscriptionLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkSubscription(session.access_token);
      } else {
        setSubscriptionLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Content protection - block right-click, copy, print screen on premium content
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-protected="true"]')) {
        e.preventDefault();
        toast.error("Right-click is disabled on premium content");
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      const target = e.target as HTMLElement;
      if (target.closest('[data-protected="true"]') || selection?.anchorNode?.parentElement?.closest('[data-protected="true"]')) {
        e.preventDefault();
        toast.error("Copying is disabled on premium content");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Print Screen, Ctrl+P, Ctrl+Shift+S
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key === "p") ||
        (e.ctrlKey && e.shiftKey && e.key === "s") ||
        (e.ctrlKey && e.key === "c" && document.activeElement?.closest('[data-protected="true"]'))
      ) {
        e.preventDefault();
        toast.error("This action is disabled on premium content");
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-protected="true"]')) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  // Handle success/cancel URL params
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Subscription successful! You now have full access.");
      if (session?.access_token) {
        checkSubscription(session.access_token);
      }
    }
    if (searchParams.get("canceled") === "true") {
      toast.info("Subscription canceled.");
    }
  }, [searchParams, session]);

  const checkSubscription = async (accessToken: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      if (error) throw error;
      setIsSubscribed(data?.subscribed || false);
    } catch (error) {
      console.error("Error checking subscription:", error);
      setIsSubscribed(false);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Fetch contacted schools for current 30-day period (resets every 30 days, no rollover)
  useEffect(() => {
    const fetchContactedSchools = async () => {
      if (!user) {
        setContactedSchools(new Set());
        return;
      }
      
      // Get the user's first ever contact to establish their cycle start
      const { data: firstContact, error: firstError } = await supabase
        .from("school_contacts")
        .select("contacted_at")
        .eq("user_id", user.id)
        .order("contacted_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      
      let periodStart: Date;
      
      if (firstContact) {
        // Calculate current period based on first contact date
        const firstContactDate = new Date(firstContact.contacted_at);
        const now = new Date();
        const daysSinceFirst = Math.floor((now.getTime() - firstContactDate.getTime()) / (1000 * 60 * 60 * 24));
        const currentPeriod = Math.floor(daysSinceFirst / CONTACT_WINDOW_DAYS);
        
        periodStart = new Date(firstContactDate);
        periodStart.setDate(periodStart.getDate() + (currentPeriod * CONTACT_WINDOW_DAYS));
        periodStart.setHours(0, 0, 0, 0);
      } else {
        // No contacts yet, use today as period start
        periodStart = new Date();
        periodStart.setHours(0, 0, 0, 0);
      }
      
      const { data, error } = await supabase
        .from("school_contacts")
        .select("school_id")
        .eq("user_id", user.id)
        .gte("contacted_at", periodStart.toISOString());
      
      if (error) {
        console.error("Error fetching contacts:", error);
        return;
      }
      
      const uniqueSchools = new Set(data?.map(c => c.school_id) || []);
      setContactedSchools(uniqueSchools);
    };
    
    fetchContactedSchools();
  }, [user]);

  // Track school contact
  const trackSchoolContact = async (schoolId: string): Promise<boolean> => {
    if (!user || !isSubscribed) return true; // Non-subscribers can't see info anyway
    
    // Already contacted this school
    if (contactedSchools.has(schoolId)) return true;
    
    // Check if at limit
    if (contactedSchools.size >= CONTACT_LIMIT) {
      setShowLimitModal(true);
      return false;
    }
    
    // Record the contact
    const { error } = await supabase
      .from("school_contacts")
      .insert({
        user_id: user.id,
        school_id: schoolId
      });
    
    if (error) {
      console.error("Error recording contact:", error);
      return true; // Allow viewing even if tracking fails
    }
    
    setContactedSchools(prev => new Set([...prev, schoolId]));
    
    const remaining = CONTACT_LIMIT - contactedSchools.size - 1;
    if (remaining <= 1) {
      toast.info(`You have ${remaining} school contact${remaining === 1 ? '' : 's'} remaining.`);
    }
    
    return true;
  };

  const canViewSchool = (schoolId: string): boolean => {
    if (!isSubscribed) return true; // Non-subscribers see masked info anyway
    if (contactedSchools.has(schoolId)) return true;
    return contactedSchools.size < CONTACT_LIMIT;
  };

  const handleSubscribe = async () => {
    if (!session) {
      navigate("/auth");
      return;
    }

    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });
      
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) return;
    
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });
      
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Error opening portal:", error);
      toast.error("Failed to open subscription portal.");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsSubscribed(false);
    toast.success("Signed out successfully");
  };

  const { data: schools, isLoading: schoolsLoading } = useQuery({
    queryKey: ["ncaa-schools"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ncaa_football_schools")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as School[];
    },
  });

  const { data: coaches, isLoading: coachesLoading } = useQuery({
    queryKey: ["school-coaches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("school_coaches")
        .select("*");
      if (error) throw error;
      return data as Coach[];
    },
  });

  const statesWithSchools = useMemo(() => {
    if (!schools) return [];
    return [...new Set(schools.map((s) => s.state))];
  }, [schools]);

  const filteredSchools = useMemo(() => {
    if (!schools) return [];
    
    let filtered = schools;
    
    if (selectedState) {
      filtered = filtered.filter((s) => s.state === selectedState);
    }
    
    if (selectedConference !== "All") {
      filtered = filtered.filter((s) => s.conference === selectedConference);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.state.toLowerCase().includes(query) ||
          s.conference.toLowerCase().includes(query) ||
          (s.mascot && s.mascot.toLowerCase().includes(query)) ||
          (s.city && s.city.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [schools, selectedState, selectedConference, searchQuery]);

  const filteredCoaches = useMemo(() => {
    if (!coaches || !coachSearchQuery) return [];
    
    const query = coachSearchQuery.toLowerCase();
    return coaches.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(query)) ||
        c.role.toLowerCase().includes(query)
    );
  }, [coaches, coachSearchQuery]);

  const getSchoolById = (schoolId: string) => {
    return schools?.find((s) => s.id === schoolId);
  };

  const getCoachesForSchool = (schoolId: string) => {
    if (!coaches) return [];
    const schoolCoaches = coaches.filter((c) => c.school_id === schoolId);
    const roleOrder: Record<string, number> = {
      "Head Coach": 1,
      "Offensive Coordinator": 2,
      "Defensive Coordinator": 3,
      "Recruiting Coordinator": 4,
    };
    return schoolCoaches.sort((a, b) => (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99));
  };

  const conferenceColors: Record<string, string> = {
    "SEC": "bg-amber-500/20 text-amber-700 dark:text-amber-400",
    "Big Ten": "bg-blue-500/20 text-blue-700 dark:text-blue-400",
    "ACC": "bg-purple-500/20 text-purple-700 dark:text-purple-400",
    "Big 12": "bg-red-500/20 text-red-700 dark:text-red-400",
    "Pac-12": "bg-green-500/20 text-green-700 dark:text-green-400",
    "American": "bg-cyan-500/20 text-cyan-700 dark:text-cyan-400",
    "Mountain West": "bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
    "Sun Belt": "bg-orange-500/20 text-orange-700 dark:text-orange-400",
    "MAC": "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    "Conference USA": "bg-pink-500/20 text-pink-700 dark:text-pink-400",
    "Independent": "bg-gray-500/20 text-gray-700 dark:text-gray-400",
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedConference("All");
    setSelectedState(null);
  };

  const hasActiveFilters = searchQuery || selectedConference !== "All" || selectedState;

  // Mask coach contact info for non-subscribers (teaser)
  const maskContactInfo = (value: string | null) => {
    if (!value) return null;
    if (value.length <= 4) return "••••";
    return value.substring(0, 3) + "••••••";
  };

  // Subscription paywall component
  const PaywallBanner = () => (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center mb-8">
      <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Unlock Full Access</h2>
      <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
        Get complete access to coaching staff contact information including phone numbers, emails, and social media for all {schools?.length || 0} FBS schools.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          size="lg" 
          onClick={handleSubscribe}
          disabled={checkoutLoading}
          className="gap-2"
        >
          {checkoutLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CreditCard className="w-4 h-4" />
          )}
          Subscribe for $19.99/month
        </Button>
        {!user && (
          <Button variant="outline" size="lg" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        )}
      </div>
      {user && (
        <p className="text-sm text-muted-foreground mt-4">
          Signed in as {user.email} • <button onClick={handleSignOut} className="underline hover:text-primary">Sign out</button>
        </p>
      )}
    </div>
  );

  // Teaser coach card with masked info
  const TeaserCoachCard = ({ coach, school }: { coach: Coach; school?: School }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          {school?.logo_url ? (
            <img
              src={school.logo_url}
              alt={school.name}
              className="w-10 h-10 object-contain rounded"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{coach.name || "To be updated"}</p>
            <p className="text-sm text-muted-foreground">{coach.role}</p>
            {school && (
              <p className="text-xs text-primary mt-1">{school.name}</p>
            )}
          </div>
        </div>
        <div className="space-y-1 text-sm blur-sm select-none">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-3 h-3" />
            {maskContactInfo(coach.phone) || "No phone listed"}
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-3 h-3" />
            {maskContactInfo(coach.email) || "No email listed"}
          </span>
          {coach.twitter && (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Twitter className="w-3 h-3" />
              @{maskContactInfo(coach.twitter)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              College <span className="text-gradient">Recruiting</span> Database
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore NCAA Division I FBS football programs across the nation. Search schools, filter by conference, or click on a state to view coaching staff.
            </p>
            {isSubscribed && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-400">
                    Premium Subscriber
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    {contactedSchools.size} / {CONTACT_LIMIT} schools contacted this period
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={handleManageSubscription}>
                    Manage Subscription
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Paywall Banner for non-subscribers */}
          {!subscriptionLoading && !isSubscribed && <PaywallBanner />}

          {/* Search & Filter Controls */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={!showCoachSearch ? "default" : "outline"}
                onClick={() => setShowCoachSearch(false)}
                className="gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Search Schools
              </Button>
              <Button
                variant={showCoachSearch ? "default" : "outline"}
                onClick={() => setShowCoachSearch(true)}
                className="gap-2"
              >
                <Users className="w-4 h-4" />
                Search Coaches
              </Button>
            </div>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              {showCoachSearch ? (
                <Input
                  placeholder="Search coaches by name or role..."
                  value={coachSearchQuery}
                  onChange={(e) => setCoachSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
              ) : (
                <Input
                  placeholder="Search schools by name, state, conference, mascot..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
              )}
              {(searchQuery || coachSearchQuery) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => showCoachSearch ? setCoachSearchQuery("") : setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {!showCoachSearch && (
              <div className="overflow-x-auto pb-2">
                <Tabs value={selectedConference} onValueChange={setSelectedConference} className="w-full">
                  <TabsList className="inline-flex h-auto p-1 bg-muted/50 flex-wrap justify-center gap-1">
                    {conferences.map((conf) => (
                      <TabsTrigger
                        key={conf}
                        value={conf}
                        className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        {conf}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            )}

            {hasActiveFilters && !showCoachSearch && (
              <div className="flex justify-center">
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                  <X className="w-4 h-4" />
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">{schools?.length || 0}</p>
                <p className="text-sm text-muted-foreground">FBS Schools</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">{statesWithSchools.length}</p>
                <p className="text-sm text-muted-foreground">States</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">11</p>
                <p className="text-sm text-muted-foreground">Conferences</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">{coaches?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Coaches</p>
              </CardContent>
            </Card>
          </div>

          {/* Coach Search Results */}
          {showCoachSearch && coachSearchQuery && (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">
                  Coach Search Results ({filteredCoaches.length})
                </h2>
                {coachesLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-40" />
                    ))}
                  </div>
                ) : filteredCoaches.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No coaches found matching "{coachSearchQuery}"
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCoaches.slice(0, isSubscribed ? 30 : 6).map((coach) => {
                      const school = getSchoolById(coach.school_id);
                      
                      if (!isSubscribed) {
                        return <TeaserCoachCard key={coach.id} coach={coach} school={school} />;
                      }
                      
                      return (
                        <Card key={coach.id} className="overflow-hidden hover:shadow-lg transition-shadow relative" data-protected="true">
                          {user?.email && <ContentWatermark email={user.email} />}
                          <CardContent className="p-4 select-none">
                            <div className="flex items-start gap-3 mb-3">
                              {school?.logo_url ? (
                                <img
                                  src={school.logo_url}
                                  alt={school.name}
                                  className="w-10 h-10 object-contain rounded pointer-events-none"
                                  referrerPolicy="no-referrer"
                                  draggable={false}
                                />
                              ) : (
                                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                                  <GraduationCap className="w-5 h-5 text-primary" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{coach.name || "To be updated"}</p>
                                <p className="text-sm text-muted-foreground">{coach.role}</p>
                                {school && (
                                  <p className="text-xs text-primary mt-1">{school.name}</p>
                                )}
                              </div>
                            </div>
                            <div className="space-y-1 text-sm">
                              {coach.phone && (
                                <a
                                  href={`tel:${coach.phone}`}
                                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  {coach.phone}
                                </a>
                              )}
                              {coach.email && (
                                <a
                                  href={`mailto:${coach.email}`}
                                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate"
                                >
                                  <Mail className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{coach.email}</span>
                                </a>
                              )}
                              {coach.twitter && (
                                <a
                                  href={`https://twitter.com/${coach.twitter}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <Twitter className="w-3 h-3" />
                                  @{coach.twitter}
                                </a>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
                {!isSubscribed && filteredCoaches.length > 6 && (
                  <div className="text-center mt-6">
                    <p className="text-muted-foreground mb-4">
                      Subscribe to see all {filteredCoaches.length} results with full contact information.
                    </p>
                    <Button onClick={handleSubscribe} disabled={checkoutLoading}>
                      {checkoutLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Unlock Full Access - $9.99/month
                    </Button>
                  </div>
                )}
                {isSubscribed && filteredCoaches.length > 30 && (
                  <p className="text-center text-muted-foreground mt-4">
                    Showing first 30 results. Refine your search for more specific results.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Map or School Results */}
          {(!showCoachSearch || !coachSearchQuery) && !showCoachSearch && (
            <>
              {(searchQuery || selectedConference !== "All") && !selectedState ? (
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">
                      {filteredSchools.length} {filteredSchools.length === 1 ? "School" : "Schools"} Found
                    </h2>
                    {schoolsLoading ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <Skeleton key={i} className="h-32" />
                        ))}
                      </div>
                    ) : filteredSchools.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No schools found matching your criteria
                      </p>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSchools.map((school) => (
                          <Card
                            key={school.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => setSelectedState(school.state)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                {school.logo_url ? (
                                  <img
                                    src={school.logo_url}
                                    alt={school.name}
                                    className="w-12 h-12 object-contain rounded"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                                    <GraduationCap className="w-6 h-6 text-primary" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold truncate">{school.name}</p>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {school.mascot && `${school.mascot} • `}{school.city}, {school.state}
                                  </p>
                                  <Badge className={`mt-2 text-xs ${conferenceColors[school.conference] || "bg-muted"}`}>
                                    {school.conference}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : !selectedState ? (
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Select a State to View Schools
                    </h2>
                    {schoolsLoading ? (
                      <Skeleton className="w-full h-96" />
                    ) : (
                      <USMap
                        selectedState={selectedState}
                        onStateClick={setSelectedState}
                        statesWithSchools={statesWithSchools}
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-primary/30" />
                      <span className="text-sm text-muted-foreground">Has FBS Schools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-muted/50" />
                      <span className="text-sm text-muted-foreground">No FBS Schools</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedState(null)}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Map
                  </Button>

                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <MapPin className="w-8 h-8 text-primary" />
                      <div>
                        <h2 className="text-2xl font-bold">{selectedState}</h2>
                        <p className="text-muted-foreground">
                          {filteredSchools.length} FBS {filteredSchools.length === 1 ? "School" : "Schools"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {coachesLoading ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-64" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {filteredSchools.map((school) => {
                        const schoolCoaches = getCoachesForSchool(school.id);
                        const hasViewed = contactedSchools.has(school.id);
                        const canView = canViewSchool(school.id);
                        const showContactInfo = isSubscribed && (hasViewed || canView);
                        
                        const handleViewSchool = async () => {
                          if (!isSubscribed || hasViewed) return;
                          await trackSchoolContact(school.id);
                        };
                        
                        return (
                          <Card 
                            key={school.id} 
                            className={`overflow-hidden hover:shadow-lg transition-shadow relative ${!canView && isSubscribed ? 'opacity-75' : ''}`} 
                            data-protected="true"
                            onClick={handleViewSchool}
                          >
                            {isSubscribed && user?.email && hasViewed && <ContentWatermark email={user.email} />}
                            {isSubscribed && hasViewed && (
                              <Badge className="absolute top-2 right-2 z-20 bg-green-500/20 text-green-700 dark:text-green-400 text-xs">
                                Viewed
                              </Badge>
                            )}
                            {isSubscribed && !hasViewed && !canView && (
                              <div className="absolute inset-0 bg-background/80 z-20 flex items-center justify-center rounded-lg">
                                <div className="text-center p-4">
                                  <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-sm text-muted-foreground">Monthly limit reached</p>
                                  <Button 
                                    variant="link" 
                                    size="sm" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowLimitModal(true);
                                    }}
                                  >
                                    Learn more
                                  </Button>
                                </div>
                              </div>
                            )}
                            <CardHeader className="pb-3 select-none">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  {school.logo_url ? (
                                    <img
                                      src={school.logo_url}
                                      alt={school.name}
                                      className="w-12 h-12 object-contain rounded pointer-events-none"
                                      referrerPolicy="no-referrer"
                                      draggable={false}
                                    />
                                  ) : (
                                    <div className="p-2 rounded-lg bg-primary/10">
                                      <GraduationCap className="w-6 h-6 text-primary" />
                                    </div>
                                  )}
                                  <div>
                                    <CardTitle className="text-lg">{school.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                      {school.mascot && `${school.mascot} • `}{school.city}
                                    </p>
                                  </div>
                                </div>
                                <Badge className={`${conferenceColors[school.conference] || "bg-muted"} ${isSubscribed && hasViewed ? 'mr-16' : ''}`}>
                                  {school.conference}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4 select-none">
                              {schoolCoaches.map((coach) => (
                                <div key={coach.id} className="p-3 rounded-lg bg-muted/50">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Building className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">{coach.role}</span>
                                  </div>
                                  <p className="font-medium mb-2">
                                    {coach.name || "To be updated"}
                                  </p>
                                  <div className={`space-y-1 text-sm ${!showContactInfo || (!hasViewed && isSubscribed) ? "blur-sm select-none" : ""}`}>
                                    {showContactInfo && hasViewed ? (
                                      <>
                                        {coach.phone ? (
                                          <a
                                            href={`tel:${coach.phone}`}
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <Phone className="w-3 h-3" />
                                            {coach.phone}
                                          </a>
                                        ) : (
                                          <span className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="w-3 h-3" />
                                            No phone listed
                                          </span>
                                        )}
                                        {coach.email ? (
                                          <a
                                            href={`mailto:${coach.email}`}
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <Mail className="w-3 h-3" />
                                            {coach.email}
                                          </a>
                                        ) : (
                                          <span className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="w-3 h-3" />
                                            No email listed
                                          </span>
                                        )}
                                        {coach.twitter && (
                                          <a
                                            href={`https://twitter.com/${coach.twitter}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <Twitter className="w-3 h-3" />
                                            @{coach.twitter}
                                          </a>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                          <Phone className="w-3 h-3" />
                                          {maskContactInfo(coach.phone) || "No phone listed"}
                                        </span>
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                          <Mail className="w-3 h-3" />
                                          {maskContactInfo(coach.email) || "No email listed"}
                                        </span>
                                        {coach.twitter && (
                                          <span className="flex items-center gap-2 text-muted-foreground">
                                            <Twitter className="w-3 h-3" />
                                            @{maskContactInfo(coach.twitter)}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                              {!isSubscribed && (
                                <Button 
                                  variant="outline" 
                                  className="w-full gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubscribe();
                                  }}
                                  disabled={checkoutLoading}
                                >
                                  <Lock className="w-4 h-4" />
                                  Unlock Contact Info
                                </Button>
                              )}
                              {isSubscribed && !hasViewed && canView && (
                                <Button 
                                  variant="outline" 
                                  className="w-full gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewSchool();
                                  }}
                                >
                                  <GraduationCap className="w-4 h-4" />
                                  View Contact Info ({CONTACT_LIMIT - contactedSchools.size} left)
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* 30-Day Period Limit Modal */}
      <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Contact Limit Reached
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <p>
                As a recruiting subscriber, you are allowed to contact up to <strong>{CONTACT_LIMIT} schools every {CONTACT_WINDOW_DAYS} days</strong>. 
                You have reached your limit for this period.
              </p>
              <p>
                Your limit will reset at the start of your next 30-day period. Unused contacts do not roll over. Schools you've already viewed will remain accessible.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-4">
                <p className="text-sm font-medium mb-2">Schools contacted this period:</p>
                <p className="text-2xl font-bold text-primary">{contactedSchools.size} / {CONTACT_LIMIT}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowLimitModal(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
