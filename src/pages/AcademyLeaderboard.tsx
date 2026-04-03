import { motion } from "framer-motion";
import { Trophy, Medal, Clock, Zap, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLeaderboard } from "@/hooks/useAcademy";

const rankColors: Record<string, string> = {
  Rookie: "text-zinc-400",
  Prospect: "text-blue-400",
  Elite: "text-purple-400",
  Champion: "text-yellow-400",
};

export default function AcademyLeaderboard() {
  const { data: leaderboard, isLoading } = useLeaderboard();

  const byPoints = [...(leaderboard || [])].sort((a, b) => b.total_points - a.total_points);
  const byHours = [...(leaderboard || [])].sort((a, b) => Number(b.total_hours) - Number(a.total_hours));

  const renderRow = (entry: any, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02 }}
      className={`flex items-center gap-4 p-4 rounded-xl ${
        index === 0 ? "bg-yellow-500/10 border border-yellow-500/30" :
        index === 1 ? "bg-zinc-400/10 border border-zinc-400/20" :
        index === 2 ? "bg-amber-700/10 border border-amber-700/20" :
        "bg-card border border-border"
      }`}
    >
      <div className="w-10 text-center font-bold text-lg">
        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
      </div>
      <div className="flex-1">
        <p className="font-bold text-foreground">{entry.name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={rankColors[entry.rank] || "text-muted-foreground"}>{entry.rank}</span>
          {entry.school && <span>• {entry.school}</span>}
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 font-bold text-yellow-500">
          <Zap className="h-4 w-4" /> {entry.total_points}
        </div>
        <div className="flex items-center gap-1 text-xs text-blue-400">
          <Clock className="h-3 w-3" /> {Number(entry.total_hours).toFixed(1)}h
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <SEO title="Leaderboard | Champion Academy" description="See the top Champion Academy leaders" />
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-28 pb-20 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">Top 50 Champion Academy leaders</p>
          </motion.div>

          <Tabs defaultValue="points">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="points" className="flex-1">By Points</TabsTrigger>
              <TabsTrigger value="hours" className="flex-1">By Hours</TabsTrigger>
            </TabsList>
            <TabsContent value="points">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-10">Loading...</div>
              ) : byPoints.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">No entries yet. Be the first!</div>
              ) : (
                <div className="space-y-3">{byPoints.map(renderRow)}</div>
              )}
            </TabsContent>
            <TabsContent value="hours">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-10">Loading...</div>
              ) : byHours.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">No entries yet. Be the first!</div>
              ) : (
                <div className="space-y-3">{byHours.map(renderRow)}</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </>
  );
}
