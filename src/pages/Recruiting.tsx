import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { USMap } from "@/components/USMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Phone, Mail, Twitter, GraduationCap, Building } from "lucide-react";

interface School {
  id: string;
  name: string;
  mascot: string | null;
  conference: string;
  state: string;
  city: string | null;
  website: string | null;
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

export default function Recruiting() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

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
    if (!schools || !selectedState) return [];
    return schools.filter((s) => s.state === selectedState);
  }, [schools, selectedState]);

  const getCoachesForSchool = (schoolId: string) => {
    if (!coaches) return [];
    return coaches.filter((c) => c.school_id === schoolId);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              College <span className="text-gradient">Recruiting</span> Database
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore NCAA Division I FBS football programs across the nation. Click on a state to view schools and coaching staff information.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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

          {/* Map or State View */}
          {!selectedState ? (
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

              {/* Legend */}
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
              {/* Back Button */}
              <Button
                variant="outline"
                onClick={() => setSelectedState(null)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Map
              </Button>

              {/* State Header */}
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

              {/* Schools Grid */}
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
                    return (
                      <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <GraduationCap className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{school.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {school.mascot && `${school.mascot} • `}{school.city}
                                </p>
                              </div>
                            </div>
                            <Badge className={conferenceColors[school.conference] || "bg-muted"}>
                              {school.conference}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {schoolCoaches.map((coach) => (
                            <div key={coach.id} className="p-3 rounded-lg bg-muted/50">
                              <div className="flex items-center gap-2 mb-2">
                                <Building className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{coach.role}</span>
                              </div>
                              <p className="font-medium mb-2">
                                {coach.name || "To be updated"}
                              </p>
                              <div className="space-y-1 text-sm">
                                {coach.phone ? (
                                  <a
                                    href={`tel:${coach.phone}`}
                                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                                  >
                                    <Twitter className="w-3 h-3" />
                                    @{coach.twitter}
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
