import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Clock, Star, Zap, Target, Award, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  useAuth, useAcademyProfile, useCreateProfile, useMySubmissions,
  useMyBadges, useBadges, useUpdateStreak, useCheckAndAwardBadges,
} from "@/hooks/useAcademy";

function getRankProgress(hours: number) {
  if (hours >= 50) return { current: "Champion", next: null, progress: 100, nextHours: 50 };
  if (hours >= 25) return { current: "Elite", next: "Champion", progress: ((hours - 25) / 25) * 100, nextHours: 50 };
  if (hours >= 10) return { current: "Prospect", next: "Elite", progress: ((hours - 10) / 15) * 100, nextHours: 25 };
  return { current: "Rookie", next: "Prospect", progress: (hours / 10) * 100, nextHours: 10 };
}

const rankColors: Record<string, string> = {
  Rookie: "from-zinc-500 to-zinc-600",
  Prospect: "from-blue-500 to-blue-600",
  Elite: "from-purple-500 to-purple-600",
  Champion: "from-yellow-500 to-amber-500",
};

const milestones = [10, 25, 50];

export default function AcademyDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useAcademyProfile();
  const createProfile = useCreateProfile();
  const { data: submissions } = useMySubmissions();
  const { data: myBadges } = useMyBadges();
  const { data: allBadges } = useBadges();
  const updateStreak = useUpdateStreak();
  const checkBadges = useCheckAndAwardBadges();

  const [signupForm, setSignupForm] = useState({ name: "", email: "", age: "", school: "", sport: "", position: "" });

  useEffect(() => {
    if (profile) {
      updateStreak.mutate();
      checkBadges.mutate();
    }
  }, [profile?.id]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 text-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-20 max-w-lg mx-auto">
          <h1 className="text-3xl font-display font-bold text-center mb-2">Join Champion Academy</h1>
          <p className="text-muted-foreground text-center mb-8">Sign in or create an account to get started</p>
          <Button onClick={() => navigate("/auth")} className="w-full" variant="hero" size="lg">
            Sign In / Sign Up
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    const handleCreateProfile = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await createProfile.mutateAsync({
          name: signupForm.name,
          email: signupForm.email || user.email || "",
          age: signupForm.age ? parseInt(signupForm.age) : undefined,
          school: signupForm.school || undefined,
          sport: signupForm.sport || undefined,
          position: signupForm.position || undefined,
        });
        toast.success("Welcome to Champion Academy! 🏆");
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-20 max-w-lg mx-auto">
          <h1 className="text-3xl font-display font-bold text-center mb-2">Create Your Profile</h1>
          <p className="text-muted-foreground text-center mb-8">Tell us about yourself to get started</p>
          <form onSubmit={handleCreateProfile} className="space-y-4">
            <div><Label>Name *</Label><Input required value={signupForm.name} onChange={e => setSignupForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div><Label>Email</Label><Input type="email" value={signupForm.email} onChange={e => setSignupForm(p => ({ ...p, email: e.target.value }))} placeholder={user.email} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Age</Label><Input type="number" value={signupForm.age} onChange={e => setSignupForm(p => ({ ...p, age: e.target.value }))} /></div>
              <div><Label>School</Label><Input value={signupForm.school} onChange={e => setSignupForm(p => ({ ...p, school: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Sport</Label><Input value={signupForm.sport} onChange={e => setSignupForm(p => ({ ...p, sport: e.target.value }))} /></div>
              <div><Label>Position</Label><Input value={signupForm.position} onChange={e => setSignupForm(p => ({ ...p, position: e.target.value }))} /></div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold" size="lg" disabled={createProfile.isPending}>
              {createProfile.isPending ? "Creating..." : "Join Champion Academy 🏆"}
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }

  const hours = Number(profile.total_hours);
  const rankInfo = getRankProgress(hours);
  const completedCount = submissions?.filter(s => s.status === "approved").length || 0;
  const earnedBadgeIds = new Set((myBadges || []).map((b: any) => b.badge_id));

  const generateCertificate = (milestone: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1100;
    canvas.height = 850;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, 1100, 850);

    // Gold border
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 1040, 790);
    ctx.strokeStyle = "#f59e0b55";
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1010, 760);

    ctx.textAlign = "center";
    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.fillText("BRAND OF A CHAMPION", 550, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px Inter, sans-serif";
    ctx.fillText("Leadership & Community", 550, 170);
    ctx.fillText("Development Certification", 550, 220);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "italic 16px Inter, sans-serif";
    ctx.fillText("Valid for Volunteer Hour Verification", 550, 260);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "20px Inter, sans-serif";
    ctx.fillText("This certifies that", 550, 320);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 36px Inter, sans-serif";
    ctx.fillText(profile.name, 550, 380);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Inter, sans-serif";
    ctx.fillText(`has successfully completed ${milestone} Leadership & Volunteer Hours`, 550, 440);
    ctx.fillText("through the Champion Academy program by Brand of a Champion", 550, 470);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "16px Inter, sans-serif";
    ctx.fillText("These hours may be applied toward community service and volunteer requirements.", 550, 520);
    const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillText(`Date Issued: ${dateStr}`, 550, 560);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 60px serif";
    ctx.fillText("🏆", 550, 670);

    ctx.fillStyle = "#71717a";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText("Champion Academy by Brand of a Champion • brandofachampion.com", 550, 780);
    ctx.fillText("This certificate verifies participation in leadership, education, and community development activities.", 550, 800);

    const link = document.createElement("a");
    link.download = `champion-academy-${milestone}hr-certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success(`Certificate downloaded for ${milestone} hours!`);
  };

  return (
    <>
      <SEO title="Dashboard | Champion Academy" description="Track your progress in Champion Academy" />
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container pt-28 pb-20">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              Welcome back, <span className="text-yellow-500">{profile.name}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {profile.current_streak > 0 && `🔥 ${profile.current_streak} day streak! `}
              Keep pushing toward your goals.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Clock, label: "Leadership Hours", value: hours.toFixed(1), color: "text-blue-500" },
              { icon: Zap, label: "Total Points", value: profile.total_points.toString(), color: "text-yellow-500" },
              { icon: Target, label: "Missions Done", value: completedCount.toString(), color: "text-green-500" },
              { icon: Trophy, label: "Badges Earned", value: (myBadges?.length || 0).toString(), color: "text-purple-500" },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-card border border-border rounded-xl">
                <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Rank Progress */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-card border border-border rounded-xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${rankColors[rankInfo.current]} rounded-full flex items-center justify-center`}>
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{rankInfo.current}</h3>
                  <p className="text-sm text-muted-foreground">{hours.toFixed(1)} hours logged</p>
                </div>
              </div>
              {rankInfo.next && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Next: {rankInfo.next}</p>
                  <p className="text-xs text-muted-foreground">{rankInfo.nextHours - hours > 0 ? `${(rankInfo.nextHours - hours).toFixed(1)} hours to go` : "Almost there!"}</p>
                </div>
              )}
            </div>
            <Progress value={rankInfo.progress} className="h-3" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Badges */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" /> Badges
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {(allBadges || []).map((badge) => {
                  const earned = earnedBadgeIds.has(badge.id);
                  return (
                    <div key={badge.id} className={`text-center p-2 rounded-lg ${earned ? "bg-yellow-500/10" : "bg-muted/30 opacity-40"}`} title={`${badge.name}: ${badge.description}`}>
                      <div className="text-2xl">{badge.icon}</div>
                      <p className="text-[10px] text-muted-foreground mt-1 truncate">{badge.name}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-yellow-500" /> Certificates
              </h3>
              <div className="space-y-3">
                {milestones.map((m) => {
                  const unlocked = hours >= m;
                  return (
                    <div key={m} className={`flex items-center justify-between p-3 rounded-lg ${unlocked ? "bg-yellow-500/10 border border-yellow-500/30" : "bg-muted/30"}`}>
                      <div>
                        <p className={`font-semibold ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>{m} Hour Certificate</p>
                        <p className="text-xs text-muted-foreground">{unlocked ? "Unlocked!" : `${(m - hours).toFixed(1)} hours to go`}</p>
                      </div>
                      {unlocked && (
                        <Button size="sm" variant="outline" onClick={() => generateCertificate(m)} className="border-yellow-500/50 text-yellow-600">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button onClick={() => navigate("/academy/missions")} size="lg" className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold">
              <Target className="mr-2 h-5 w-5" /> Browse Missions
            </Button>
            <Button onClick={() => navigate("/academy/leaderboard")} variant="outline" size="lg">
              <Trophy className="mr-2 h-5 w-5" /> Leaderboard
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
