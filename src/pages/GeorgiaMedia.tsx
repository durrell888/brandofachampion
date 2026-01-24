import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, Flame, TrendingUp, Users, Vote, Play, 
  Star, Crown, Zap, Target, ArrowUp, ArrowDown,
  Calendar, Award, MessageSquare, ThumbsUp, Send
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const POSITIONS = [
  "QB", "RB", "WR", "TE", "OL", "DL", "LB", "CB", "S", "ATH"
];

const CLASS_YEARS = ["2025", "2026", "2027", "2028", "2029"];

interface PlayerVote {
  id: string;
  player_name: string;
  position: string;
  school: string | null;
  class_year: string | null;
  vote_count: number;
}

interface DailyPoll {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  votes_a: number;
  votes_b: number;
  poll_date: string;
}

interface VisitorStreak {
  current_streak: number;
  longest_streak: number;
  total_visits: number;
}

// Generate a simple visitor ID based on browser fingerprint
const getVisitorId = () => {
  let visitorId = localStorage.getItem('ga_visitor_id');
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('ga_visitor_id', visitorId);
  }
  return visitorId;
};

const GeorgiaMedia = () => {
  const [votes, setVotes] = useState<PlayerVote[]>([]);
  const [polls, setPolls] = useState<DailyPoll[]>([]);
  const [streak, setStreak] = useState<VisitorStreak | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>("QB");
  const [isLoading, setIsLoading] = useState(true);
  
  // Submission form
  const [playerName, setPlayerName] = useState("");
  const [playerSchool, setPlayerSchool] = useState("");
  const [playerClassYear, setPlayerClassYear] = useState("");
  const [submitPosition, setSubmitPosition] = useState("");
  
  // Known players quick vote
  const [quickVotePlayer, setQuickVotePlayer] = useState("");
  
  // Poll voting
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  
  const visitorId = getVisitorId();

  // Fetch votes for selected position
  const fetchVotes = useCallback(async () => {
    const { data, error } = await supabase
      .from('georgia_player_votes')
      .select('*')
      .eq('position', selectedPosition)
      .order('vote_count', { ascending: false })
      .limit(10);
    
    if (!error && data) {
      setVotes(data);
    }
  }, [selectedPosition]);

  // Fetch active polls
  const fetchPolls = async () => {
    const { data, error } = await supabase
      .from('georgia_daily_polls')
      .select('*')
      .eq('is_active', true)
      .order('poll_date', { ascending: false })
      .limit(3);
    
    if (!error && data) {
      setPolls(data);
      
      // Check which polls user has voted on
      const { data: pollVotes } = await supabase
        .from('georgia_poll_votes')
        .select('poll_id')
        .eq('voter_id', visitorId);
      
      if (pollVotes) {
        setVotedPolls(new Set(pollVotes.map(pv => pv.poll_id)));
      }
    }
  };

  // Track visitor streak
  const trackVisitorStreak = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    const { data: existing } = await supabase
      .from('georgia_visitor_streaks')
      .select('*')
      .eq('visitor_id', visitorId)
      .maybeSingle();
    
    if (existing) {
      const lastVisit = existing.last_visit_date;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastVisit === today) {
        // Already visited today
        setStreak({
          current_streak: existing.current_streak,
          longest_streak: existing.longest_streak,
          total_visits: existing.total_visits
        });
      } else if (lastVisit === yesterdayStr) {
        // Consecutive day - increase streak
        const newStreak = existing.current_streak + 1;
        const newLongest = Math.max(newStreak, existing.longest_streak);
        
        await supabase
          .from('georgia_visitor_streaks')
          .update({
            current_streak: newStreak,
            longest_streak: newLongest,
            total_visits: existing.total_visits + 1,
            last_visit_date: today
          })
          .eq('visitor_id', visitorId);
        
        setStreak({
          current_streak: newStreak,
          longest_streak: newLongest,
          total_visits: existing.total_visits + 1
        });
        
        if (newStreak > 1) {
          toast.success(`🔥 ${newStreak} Day Streak!`, {
            description: "You're on fire! Keep coming back daily!"
          });
        }
      } else {
        // Streak broken
        await supabase
          .from('georgia_visitor_streaks')
          .update({
            current_streak: 1,
            total_visits: existing.total_visits + 1,
            last_visit_date: today
          })
          .eq('visitor_id', visitorId);
        
        setStreak({
          current_streak: 1,
          longest_streak: existing.longest_streak,
          total_visits: existing.total_visits + 1
        });
      }
    } else {
      // First visit
      await supabase
        .from('georgia_visitor_streaks')
        .insert({
          visitor_id: visitorId,
          current_streak: 1,
          longest_streak: 1,
          total_visits: 1,
          last_visit_date: today
        });
      
      setStreak({
        current_streak: 1,
        longest_streak: 1,
        total_visits: 1
      });
      
      toast.success("Welcome to Georgia Media! 🍑", {
        description: "Come back daily to build your streak!"
      });
    }
  };

  // Submit a new player nomination
  const handleSubmitPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim() || !submitPosition) {
      toast.error("Please enter player name and position");
      return;
    }
    
    // Check if player already exists
    const { data: existing } = await supabase
      .from('georgia_player_votes')
      .select('*')
      .eq('player_name', playerName.trim())
      .eq('position', submitPosition)
      .maybeSingle();
    
    if (existing) {
      // Increment vote count
      await supabase
        .from('georgia_player_votes')
        .update({ vote_count: existing.vote_count + 1 })
        .eq('id', existing.id);
      
      toast.success(`Vote added for ${playerName}!`);
    } else {
      // Create new entry
      await supabase
        .from('georgia_player_votes')
        .insert({
          player_name: playerName.trim(),
          position: submitPosition,
          school: playerSchool.trim() || null,
          class_year: playerClassYear || null,
          voter_id: visitorId,
          vote_count: 1
        });
      
      toast.success(`${playerName} nominated for Top 10 ${submitPosition}!`);
    }
    
    setPlayerName("");
    setPlayerSchool("");
    setPlayerClassYear("");
    setSubmitPosition("");
    fetchVotes();
  };

  // Quick vote for existing player
  const handleQuickVote = async (player: PlayerVote) => {
    await supabase
      .from('georgia_player_votes')
      .update({ vote_count: player.vote_count + 1 })
      .eq('id', player.id);
    
    toast.success(`Vote added for ${player.player_name}!`);
    fetchVotes();
  };

  // Vote on poll
  const handlePollVote = async (pollId: string, option: 'a' | 'b') => {
    if (votedPolls.has(pollId)) {
      toast.error("You've already voted on this poll!");
      return;
    }
    
    const poll = polls.find(p => p.id === pollId);
    if (!poll) return;
    
    // Record the vote
    await supabase
      .from('georgia_poll_votes')
      .insert({
        poll_id: pollId,
        voter_id: visitorId,
        chosen_option: option
      });
    
    // Update poll counts
    const updateField = option === 'a' ? 'votes_a' : 'votes_b';
    const newCount = option === 'a' ? poll.votes_a + 1 : poll.votes_b + 1;
    
    await supabase
      .from('georgia_daily_polls')
      .update({ [updateField]: newCount })
      .eq('id', pollId);
    
    setVotedPolls(prev => new Set([...prev, pollId]));
    toast.success("Vote recorded!");
    fetchPolls();
  };

  // Real-time subscriptions
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchVotes(),
        fetchPolls(),
        trackVisitorStreak()
      ]);
      setIsLoading(false);
    };
    
    loadData();
    
    // Subscribe to real-time updates
    const votesChannel = supabase
      .channel('georgia_votes_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'georgia_player_votes' }, () => {
        fetchVotes();
      })
      .subscribe();
    
    const pollsChannel = supabase
      .channel('georgia_polls_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'georgia_daily_polls' }, () => {
        fetchPolls();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(votesChannel);
      supabase.removeChannel(pollsChannel);
    };
  }, [fetchVotes]);

  // Refetch when position changes
  useEffect(() => {
    fetchVotes();
  }, [selectedPosition, fetchVotes]);

  const getRankBadge = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-muted-foreground font-bold">#{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Georgia Media | Georgia High School Football Rankings & Polls" 
        description="Vote for Georgia's top high school football players by position. Daily polls, live rankings, and the best football media in the Peach State."
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-black to-red-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/community-impact.jpg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl">🍑</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                GEORGIA <span className="text-red-500">MEDIA</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The pulse of Georgia high school football. Vote, debate, and crown the best.
            </p>
            
            {/* Streak Display */}
            {streak && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 inline-flex items-center gap-4 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-red-500/30"
              >
                <div className="flex items-center gap-2">
                  <Flame className={`w-6 h-6 ${streak.current_streak >= 3 ? 'text-orange-500 animate-pulse' : 'text-gray-400'}`} />
                  <span className="font-bold text-2xl">{streak.current_streak}</span>
                  <span className="text-sm text-gray-400">Day Streak</span>
                </div>
                <div className="w-px h-8 bg-gray-600" />
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold">{streak.longest_streak}</span>
                  <span className="text-sm text-gray-400">Best</span>
                </div>
                <div className="w-px h-8 bg-gray-600" />
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="font-bold">{streak.total_visits}</span>
                  <span className="text-sm text-gray-400">Visits</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="rankings" className="space-y-8">
          <TabsList className="grid grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="rankings" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Rankings
            </TabsTrigger>
            <TabsTrigger value="polls" className="flex items-center gap-2">
              <Vote className="w-4 h-4" /> Daily Polls
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Media
            </TabsTrigger>
          </TabsList>

          {/* RANKINGS TAB */}
          <TabsContent value="rankings" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Submit Form */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Nominate a Player
                </h3>
                <form onSubmit={handleSubmitPlayer} className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Player Name *</label>
                    <Input 
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="e.g. Marcus Johnson"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Position *</label>
                    <Select value={submitPosition} onValueChange={setSubmitPosition}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {POSITIONS.map(pos => (
                          <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">School</label>
                    <Input 
                      value={playerSchool}
                      onChange={(e) => setPlayerSchool(e.target.value)}
                      placeholder="e.g. Buford High School"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Class Year</label>
                    <Select value={playerClassYear} onValueChange={setPlayerClassYear}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {CLASS_YEARS.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Submit Vote
                  </Button>
                </form>
              </Card>

              {/* Center: Live Rankings */}
              <Card className="lg:col-span-2 p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Top 10 {selectedPosition}s in Georgia
                    <Badge variant="secondary" className="ml-2 animate-pulse">
                      LIVE
                    </Badge>
                  </h3>
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITIONS.map(pos => (
                        <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : votes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No {selectedPosition}s ranked yet. Be the first to nominate!</p>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    <div className="space-y-3">
                      {votes.map((player, index) => (
                        <motion.div
                          key={player.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:bg-accent/50 ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30' :
                            index === 1 ? 'bg-gradient-to-r from-gray-400/10 to-transparent border-gray-400/30' :
                            index === 2 ? 'bg-gradient-to-r from-amber-600/10 to-transparent border-amber-600/30' :
                            'bg-card border-border'
                          }`}
                        >
                          <div className="w-8 flex justify-center">
                            {getRankBadge(index)}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold">{player.player_name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {player.school && <span>{player.school}</span>}
                              {player.class_year && (
                                <Badge variant="outline" className="text-xs">
                                  Class of {player.class_year}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-2xl font-black text-primary">{player.vote_count}</p>
                              <p className="text-xs text-muted-foreground">votes</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuickVote(player)}
                              className="hover:bg-primary hover:text-primary-foreground"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* POLLS TAB */}
          <TabsContent value="polls" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                Daily Hot Takes
              </h2>
              <p className="text-muted-foreground mt-2">New debates every day. Make your voice heard!</p>
            </div>

            {polls.length === 0 ? (
              <Card className="p-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No active polls right now. Check back soon!</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {polls.map((poll) => {
                  const totalVotes = poll.votes_a + poll.votes_b;
                  const percentA = totalVotes > 0 ? Math.round((poll.votes_a / totalVotes) * 100) : 50;
                  const percentB = totalVotes > 0 ? Math.round((poll.votes_b / totalVotes) * 100) : 50;
                  const hasVoted = votedPolls.has(poll.id);
                  
                  return (
                    <motion.div
                      key={poll.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="p-6 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(poll.poll_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-6 flex-1">{poll.question}</h3>
                        
                        <div className="space-y-3">
                          <button
                            onClick={() => handlePollVote(poll.id, 'a')}
                            disabled={hasVoted}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                              hasVoted
                                ? 'cursor-default border-border'
                                : 'hover:border-primary cursor-pointer border-border hover:bg-accent'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{poll.option_a}</span>
                              {hasVoted && <span className="font-bold text-primary">{percentA}%</span>}
                            </div>
                            {hasVoted && (
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentA}%` }}
                                  className="h-full bg-primary"
                                />
                              </div>
                            )}
                          </button>
                          
                          <button
                            onClick={() => handlePollVote(poll.id, 'b')}
                            disabled={hasVoted}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                              hasVoted
                                ? 'cursor-default border-border'
                                : 'hover:border-primary cursor-pointer border-border hover:bg-accent'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{poll.option_b}</span>
                              {hasVoted && <span className="font-bold text-primary">{percentB}%</span>}
                            </div>
                            {hasVoted && (
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentB}%` }}
                                  className="h-full bg-primary"
                                />
                              </div>
                            )}
                          </button>
                        </div>
                        
                        <p className="text-center text-sm text-muted-foreground mt-4">
                          {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* MEDIA TAB */}
          <TabsContent value="media" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Play className="w-8 h-8 text-red-500" />
                Georgia Football Highlights
              </h2>
              <p className="text-muted-foreground mt-2">The best highlights from across the Peach State</p>
            </div>
            
            {/* Featured Videos Placeholder */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Friday Night Lights: Week 1 Highlights", category: "highlights" },
                { title: "Top 10 Plays of the Month", category: "top plays" },
                { title: "Recruiting Update: 2026 Class Watch", category: "recruiting" },
              ].map((video, i) => (
                <Card key={i} className="overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-red-900 to-black relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-3 left-3 bg-red-600">{video.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold group-hover:text-primary transition-colors">{video.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Want to submit a highlight? Contact us!</p>
              <Button variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Submit Media
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default GeorgiaMedia;
