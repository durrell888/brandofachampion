import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Flame, TrendingUp, Users, Vote, Play, 
  Star, Zap, Newspaper, RefreshCw, ChevronRight,
  Calendar, MessageSquare, PenSquare
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SubmitNewsModal from "@/components/SubmitNewsModal";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  category: string;
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

interface MediaVideo {
  id: string;
  title: string;
  description: string | null;
  youtube_id: string | null;
  category: string | null;
  is_featured: boolean;
}

interface CommunityArticle {
  id: string;
  title: string;
  description: string;
  content: string | null;
  image_url: string | null;
  category: string;
  source: string;
  created_at: string;
  status: string;
  slug: string | null;
}

const sourceColors: Record<string, string> = {
  "MaxPreps": "text-purple-400",
  "ESPN": "text-red-400",
  "GHSA": "text-yellow-400",
  "Georgia Sports": "text-red-500",
  "Hudl": "text-orange-400",
  "PrepGameday": "text-blue-400",
  "GPB Sports": "text-cyan-400",
  
};

function getTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  } catch {
    return "Recently";
  }
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
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [polls, setPolls] = useState<DailyPoll[]>([]);
  const [streak, setStreak] = useState<VisitorStreak | null>(null);
  const [videos, setVideos] = useState<MediaVideo[]>([]);
  const [communityArticles, setCommunityArticles] = useState<CommunityArticle[]>([]);
  const [mySubmissions, setMySubmissions] = useState<CommunityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showMySubmissions, setShowMySubmissions] = useState(false);
  
  // Poll voting
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  
  const visitorId = getVisitorId();

  // Fetch Georgia news
  const fetchNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-georgia-news');
      if (error) throw new Error(error.message);
      if (data?.success && data?.articles) {
        const formattedArticles: NewsArticle[] = data.articles.map((article: any, index: number) => ({
          id: `article-${index}`,
          title: article.title,
          description: article.description,
          source: article.source || 'Georgia Sports',
          url: article.url,
          imageUrl: article.imageUrl,
          publishedAt: getTimeAgo(article.publishedAt),
          category: article.category || 'High School',
        }));
        setArticles(formattedArticles);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      toast.error('Failed to load news');
    } finally {
      setNewsLoading(false);
    }
  }, []);

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

  // Fetch media videos
  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('georgia_media')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setVideos(data as MediaVideo[]);
    }
  };

  // Fetch community-submitted approved articles
  const fetchCommunityNews = async () => {
    const { data, error } = await supabase
      .from('user_submitted_news')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (!error && data) {
      setCommunityArticles(data as CommunityArticle[]);
    }
  };

  // Fetch user's own submissions
  const fetchMySubmissions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_submitted_news')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setMySubmissions(data as CommunityArticle[]);
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
        setStreak({
          current_streak: existing.current_streak,
          longest_streak: existing.longest_streak,
          total_visits: existing.total_visits
        });
      } else if (lastVisit === yesterdayStr) {
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

  // Vote on poll using atomic increment function
  const handlePollVote = async (pollId: string, option: 'a' | 'b') => {
    if (votedPolls.has(pollId)) {
      toast.error("You've already voted on this poll!");
      return;
    }
    
    try {
      const { data, error } = await supabase.rpc('increment_poll_vote', {
        _poll_id: pollId,
        _voter_id: visitorId,
        _option: option
      });
      
      if (error) {
        if (error.message.includes('Already voted')) {
          toast.error("You've already voted on this poll!");
          setVotedPolls(prev => new Set([...prev, pollId]));
        } else {
          toast.error("Failed to submit vote. Please try again.");
          console.error("Poll vote error:", error);
        }
        return;
      }
      
      setVotedPolls(prev => new Set([...prev, pollId]));
      toast.success("Vote recorded!");
      fetchPolls();
    } catch (err) {
      toast.error("Failed to submit vote. Please try again.");
      console.error("Poll vote error:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchNews(),
        fetchPolls(),
        fetchVideos(),
        fetchCommunityNews(),
        fetchMySubmissions(),
        trackVisitorStreak()
      ]);
      setIsLoading(false);
    };
    
    loadData();
    
    const pollsChannel = supabase
      .channel('georgia_polls_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'georgia_daily_polls' }, () => {
        fetchPolls();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(pollsChannel);
    };
  }, [fetchNews]);

  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  const kjArticle = communityArticles.find(a => a.slug === 'kj-green-4-star-safety-douglas-county-2026');
  const featuredArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1, 3);
  const remainingArticles = filteredArticles.slice(3);
  const topHeadlines = articles.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Georgia Media | Georgia High School Football News & Polls" 
        description="Your source for Georgia high school football news, recruiting updates, and daily polls. Stay connected to the Peach State's best football coverage."
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
              Your source for Georgia high school football news, recruiting, and hot takes.
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
        <Tabs defaultValue="news" className="space-y-8">
          <TabsList className="grid grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" /> News
            </TabsTrigger>
            <TabsTrigger value="polls" className="flex items-center gap-2">
              <Vote className="w-4 h-4" /> Daily Polls
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Media
            </TabsTrigger>
          </TabsList>

          {/* NEWS TAB */}
          <TabsContent value="news" className="space-y-6">
            {/* Category Filter */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <span className="text-primary font-bold whitespace-nowrap">GA Football</span>
              <div className="h-6 w-px bg-border" />
              {["All", "High School", "Recruiting", "Community"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat.toLowerCase())}
                  className={`text-sm whitespace-nowrap transition-colors px-3 py-1 rounded-full ${
                    activeCategory === cat.toLowerCase() 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setShowMySubmissions(!showMySubmissions)}
                className={`text-sm whitespace-nowrap transition-colors px-3 py-1 rounded-full ${
                  showMySubmissions
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                My Posts
              </button>
              <div className="ml-auto flex items-center gap-2">
                <SubmitNewsModal onSubmitted={() => { fetchCommunityNews(); fetchMySubmissions(); }} />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={fetchNews}
                  disabled={newsLoading}
                >
                  <RefreshCw className={`w-4 h-4 ${newsLoading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {newsLoading ? (
                  <div className="space-y-6">
                    <Skeleton className="w-full h-[400px] bg-muted rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-48 bg-muted rounded-lg" />
                      <Skeleton className="h-48 bg-muted rounded-lg" />
                    </div>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No news articles found.</p>
                  </Card>
                ) : (
                  <div className="space-y-6">

                    {/* Featured News Article - KJ Green pinned or first news article */}
                    {kjArticle ? (
                      <Link to={`/georgia-media/article/${kjArticle.slug || kjArticle.id}`} className="block group">
                        <article className="relative rounded-lg overflow-hidden bg-card">
                          {kjArticle.image_url ? (
                            <div className="relative aspect-[16/9]">
                              <img 
                                src={kjArticle.image_url} 
                                alt={kjArticle.title} 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <Badge className="bg-primary text-primary-foreground border-0 mb-3">{kjArticle.category}</Badge>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-3">{kjArticle.title}</h2>
                                <p className="text-gray-300 text-sm line-clamp-2 mb-3">{kjArticle.description}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  <span className="text-primary font-medium">{kjArticle.source || 'Brand of a Champion'}</span>
                                  <span>•</span>
                                  <span>{getTimeAgo(kjArticle.created_at)}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-6">
                              <Badge className="bg-primary text-primary-foreground border-0 mb-3">{kjArticle.category}</Badge>
                              <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{kjArticle.title}</h2>
                              <p className="text-muted-foreground text-sm">{kjArticle.description}</p>
                            </div>
                          )}
                        </article>
                      </Link>
                    ) : featuredArticle && (
                      <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="block group">
                        <article className="relative rounded-lg overflow-hidden bg-card">
                          {featuredArticle.imageUrl ? (
                            <div className="relative aspect-[16/9]">
                              <img 
                                src={featuredArticle.imageUrl} 
                                alt={featuredArticle.title} 
                                className="w-full h-full object-cover" 
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800'; }} 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <Badge className="bg-primary text-primary-foreground border-0 mb-3">{featuredArticle.category}</Badge>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-3">{featuredArticle.title}</h2>
                                <p className="text-gray-300 text-sm line-clamp-2 mb-3">{featuredArticle.description}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  <span className={sourceColors[featuredArticle.source] || 'text-gray-400'}>{featuredArticle.source}</span>
                                  <span>•</span>
                                  <span>{featuredArticle.publishedAt}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-6">
                              <Badge className="bg-primary text-primary-foreground border-0 mb-3">{featuredArticle.category}</Badge>
                              <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{featuredArticle.title}</h2>
                              <p className="text-muted-foreground text-sm">{featuredArticle.description}</p>
                            </div>
                          )}
                        </article>
                      </a>
                    )}

                    {/* Secondary Articles */}
                    {secondaryArticles.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {secondaryArticles.map((article) => (
                          <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                            <article className="bg-card rounded-lg overflow-hidden h-full border border-border hover:border-primary/50 transition-colors">
                              {article.imageUrl && (
                                <div className="aspect-video overflow-hidden">
                                  <img 
                                    src={article.imageUrl} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
                                  />
                                </div>
                              )}
                              <div className="p-4">
                                <h3 className="font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className={sourceColors[article.source] || 'text-muted-foreground'}>{article.source}</span>
                                  <span>•</span>
                                  <span>{article.publishedAt}</span>
                                </div>
                              </div>
                            </article>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Remaining Articles */}
                    {remainingArticles.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-bold text-foreground flex items-center gap-2">
                          <Newspaper className="w-4 h-4 text-primary" /> More Stories
                        </h3>
                        <div className="space-y-3">
                          {remainingArticles.map((article) => (
                            <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                              <article className="flex gap-4 bg-card rounded-lg p-3 hover:bg-accent transition-colors border border-border">
                                {article.imageUrl && (
                                  <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                                    <img 
                                      src={article.imageUrl} 
                                      alt={article.title} 
                                      className="w-full h-full object-cover" 
                                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">{article.title}</h4>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                    <span className={sourceColors[article.source] || 'text-muted-foreground'}>{article.source}</span>
                                    <span>•</span>
                                    <span>{article.publishedAt}</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground self-center flex-shrink-0" />
                              </article>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* BOAC / Community Articles */}
                {!showMySubmissions && communityArticles.length > 0 && (
                  <div className="space-y-4 mt-8">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <PenSquare className="w-4 h-4 text-primary" /> BOAC Stories
                    </h3>
                    <div className="space-y-3">
                      {communityArticles
                        .filter(a => a.slug !== 'kj-green-4-star-safety-douglas-county-2026')
                        .filter(a => activeCategory === "all" || a.category.toLowerCase() === activeCategory)
                        .map((article, idx) => (
                        <Link 
                          key={article.id} 
                          to={`/georgia-media/article/${article.slug || article.id}`}
                          className="block group"
                        >
                          {idx === 0 && article.image_url ? (
                            <article className="relative rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors">
                              <div className="relative aspect-[16/9]">
                                <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                  <Badge className="bg-primary text-primary-foreground border-0 mb-2">{article.category}</Badge>
                                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-3">{article.title}</h2>
                                  <p className="text-gray-300 text-sm line-clamp-2 mb-2">{article.description}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="text-primary font-medium">{article.source || 'Brand of a Champion'}</span>
                                    <span>•</span>
                                    <span>{getTimeAgo(article.created_at)}</span>
                                  </div>
                                </div>
                              </div>
                            </article>
                          ) : (
                            <article className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                              <div className="flex gap-4">
                                {article.image_url && (
                                  <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h4>
                                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{article.description}</p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                                    <span>•</span>
                                    <span>{article.source || 'Community'}</span>
                                    <span>•</span>
                                    <span>{getTimeAgo(article.created_at)}</span>
                                  </div>
                                </div>
                              </div>
                            </article>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* My Submissions View */}
                {showMySubmissions && (
                  <div className="space-y-4 mt-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <PenSquare className="w-4 h-4 text-primary" /> My Submissions
                    </h3>
                    {mySubmissions.length === 0 ? (
                      <Card className="p-8 text-center">
                        <PenSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                        <p className="text-muted-foreground text-sm">You haven't submitted any articles yet.</p>
                      </Card>
                    ) : (
                      <div className="space-y-3">
                        {mySubmissions.map((article) => (
                          <article key={article.id} className="bg-card rounded-lg p-4 border border-border">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground text-sm">{article.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{article.description}</p>
                              </div>
                              <Badge 
                                variant={article.status === 'approved' ? 'default' : article.status === 'rejected' ? 'destructive' : 'secondary'}
                                className="flex-shrink-0"
                              >
                                {article.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                              <Badge variant="outline" className="text-xs">{article.category}</Badge>
                              <span>•</span>
                              <span>{getTimeAgo(article.created_at)}</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  {/* Weekly Story Box */}
                  <Link to="/georgia-media/article/born-to-compete-building-champions-georgia-communities" className="block group">
                    <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background">
                      <div className="bg-primary px-4 py-3">
                        <h3 className="font-bold text-primary-foreground flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" /> Weekly Story
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Calendar className="w-3 h-3" />
                          <span>March 20, 2026</span>
                        </div>
                        
                        <div className="space-y-4">
                          <img 
                            src="https://froozixzptdjlnixnacd.supabase.co/storage/v1/object/public/news-images/born-2-compete%2Fb2c-logo.png" 
                            alt="Born to Compete (B2C) logo" 
                            className="w-full rounded-lg object-contain aspect-video bg-white p-4"
                          />
                          
                          <h4 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                            Born to Compete: Building Champions and Strengthening Communities Across Georgia
                          </h4>
                          
                          <div className="text-sm text-muted-foreground space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            <p>
                              Few organizations have made as lasting an impact on Georgia youth sports as <strong>Born to Compete (B2C)</strong>. From showcase camps at Stockbridge and Lowndes High Schools to the annual Awards Gala at the Georgia Aquarium, B2C gives young athletes ages 6-14 a stage to be seen and celebrated.
                            </p>
                            <p>
                              The 2026 <strong>B2C All-American Game</strong> at Milton High School will bring together the top rising 7th and 8th graders from across the region — nominated by coaches, parents, and community members.
                            </p>
                            <p>
                              B2C levels the playing field for underserved communities by providing professional-quality game film through BTC TV and free exposure opportunities that would otherwise be out of reach.
                            </p>
                            <p className="font-medium text-primary">
                              Read the full story →
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  <Card className="overflow-hidden">
                    <div className="bg-primary/10 px-4 py-3 border-b border-border">
                      <h3 className="font-bold text-foreground flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" /> Top Headlines
                      </h3>
                    </div>
                    <div className="divide-y divide-border">
                      {newsLoading ? (
                        Array(6).fill(0).map((_, i) => (
                          <div key={i} className="p-3">
                            <Skeleton className="h-4 w-full bg-muted" />
                          </div>
                        ))
                      ) : (
                        topHeadlines.map((article) => (
                          <a 
                            key={article.id} 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block px-4 py-3 hover:bg-accent transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <span className={`text-xs font-bold mt-0.5 ${sourceColors[article.source] || 'text-muted-foreground'}`}>
                                {article.source.charAt(0)}
                              </span>
                              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 flex-1">
                                {article.title}
                              </p>
                            </div>
                          </a>
                        ))
                      )}
                    </div>
                  </Card>

                  {/* Quick Poll Preview */}
                  {polls.length > 0 && (
                    <Card className="p-4">
                      <h3 className="font-bold text-foreground flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-yellow-500" /> Today's Hot Take
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{polls[0].question}</p>
                      <Button size="sm" variant="outline" className="w-full" onClick={() => document.querySelector('[value="polls"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                        Vote Now
                      </Button>
                    </Card>
                  )}
                </div>
              </aside>
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
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all relative overflow-hidden ${
                              hasVoted 
                                ? 'cursor-default border-border' 
                                : 'hover:border-primary cursor-pointer border-border'
                            }`}
                          >
                            {hasVoted && (
                              <div 
                                className="absolute inset-0 bg-primary/20" 
                                style={{ width: `${percentA}%` }}
                              />
                            )}
                            <div className="relative flex items-center justify-between">
                              <span className="font-medium">{poll.option_a}</span>
                              {hasVoted && (
                                <span className="font-bold text-primary">{percentA}%</span>
                              )}
                            </div>
                          </button>
                          
                          <button
                            onClick={() => handlePollVote(poll.id, 'b')}
                            disabled={hasVoted}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all relative overflow-hidden ${
                              hasVoted 
                                ? 'cursor-default border-border' 
                                : 'hover:border-primary cursor-pointer border-border'
                            }`}
                          >
                            {hasVoted && (
                              <div 
                                className="absolute inset-0 bg-primary/20" 
                                style={{ width: `${percentB}%` }}
                              />
                            )}
                            <div className="relative flex items-center justify-between">
                              <span className="font-medium">{poll.option_b}</span>
                              {hasVoted && (
                                <span className="font-bold text-primary">{percentB}%</span>
                              )}
                            </div>
                          </button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground text-center mt-4">
                          {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
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
                <Play className="w-8 h-8 text-primary" />
                Georgia Football Media
              </h2>
              <p className="text-muted-foreground mt-2">Watch the best highlights and features from Georgia high school football.</p>
            </div>

            {videos.length === 0 ? (
              <Card className="p-12 text-center">
                <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No videos available yet. Check back soon!</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden group">
                    {video.youtube_id && (
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtube_id}`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-1 line-clamp-2">{video.title}</h3>
                      {video.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                      )}
                      {video.category && (
                        <Badge variant="outline" className="mt-2">{video.category}</Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default GeorgiaMedia;
