import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Clock, Zap, Lock, CheckCircle2, Video, FileText, MousePointer, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useMissions, useMySubmissions, useAcademyProfile } from "@/hooks/useAcademy";

const categoryIcons: Record<string, string> = {
  Mindset: "🧠",
  Education: "📚",
  "Community Impact": "🤝",
  Promotion: "📢",
  "Skill Challenge": "⚡",
};

const typeIcons: Record<string, typeof Video> = {
  video_quiz: Video,
  text_submission: FileText,
  engagement: MousePointer,
  interactive: Gamepad2,
};

const typeLabels: Record<string, string> = {
  video_quiz: "Video + Quiz",
  text_submission: "Written Response",
  engagement: "Quick Action",
  interactive: "Interactive Challenge",
};

export default function AcademyMissions() {
  const navigate = useNavigate();
  const { data: missions, isLoading } = useMissions();
  const { data: submissions } = useMySubmissions();
  const { data: profile } = useAcademyProfile();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "Mindset", "Education", "Community Impact", "Promotion", "Skill Challenge"];
  const completedIds = new Set((submissions || []).filter(s => s.status === "approved").map(s => s.mission_id));
  const pendingIds = new Set((submissions || []).filter(s => s.status === "pending").map(s => s.mission_id));

  const filtered = activeCategory === "all" ? missions : missions?.filter(m => m.category === activeCategory);
  const hours = Number(profile?.total_hours || 0);

  return (
    <>
      <SEO title="Missions | Champion Academy" description="Browse and complete digital missions" />
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container pt-28 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <Target className="inline h-8 w-8 text-yellow-500 mr-2" />
              Missions
            </h1>
            <p className="text-muted-foreground mt-1">Complete missions to earn Leadership Hours and points</p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "bg-yellow-500 text-black hover:bg-yellow-400" : ""}
              >
                {cat !== "all" && <span className="mr-1">{categoryIcons[cat]}</span>}
                {cat === "all" ? "All Missions" : cat}
              </Button>
            ))}
          </div>

          {/* Mission Grid */}
          {isLoading ? (
            <div className="text-center text-muted-foreground py-20">Loading missions...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filtered || []).map((mission) => {
                const completed = completedIds.has(mission.id);
                const pending = pendingIds.has(mission.id);
                const locked = mission.is_locked && hours < (mission.unlock_hours || 0);
                const TypeIcon = typeIcons[mission.mission_type] || Target;

                return (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`p-6 bg-card border rounded-xl transition-all ${
                      completed ? "border-green-500/50 bg-green-500/5" :
                      locked ? "border-border opacity-60" :
                      "border-border hover:border-yellow-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{categoryIcons[mission.category]}</span>
                      {completed && <Badge className="bg-green-500/20 text-green-600 border-green-500/30">✓ Done</Badge>}
                      {pending && <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Pending</Badge>}
                      {locked && <Lock className="h-5 w-5 text-muted-foreground" />}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">{mission.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mission.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><TypeIcon className="h-3.5 w-3.5" />{typeLabels[mission.mission_type]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <span className="flex items-center gap-1 text-sm font-medium text-yellow-500">
                          <Zap className="h-4 w-4" />{mission.points_reward} pts
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium text-blue-500">
                          <Clock className="h-4 w-4" />{mission.hours_reward}h
                        </span>
                      </div>
                      {!completed && !locked && (
                        <Button size="sm" onClick={() => navigate(`/academy/mission/${mission.id}`)}
                          className="bg-yellow-500 text-black hover:bg-yellow-400 text-xs">
                          Start
                        </Button>
                      )}
                      {locked && (
                        <span className="text-xs text-muted-foreground">Unlock at {mission.unlock_hours}h</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
