import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Newspaper, 
  Play, 
  Clock, 
  ExternalLink, 
  RefreshCw,
  TrendingUp,
  Star,
  ChevronRight,
  Video,
  Trophy,
  Users,
  Calendar,
  MapPin,
  Crown,
  School,
  Target
} from "lucide-react";

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

interface RankedPlayer {
  rank: number;
  name: string;
  position: string;
  highSchool?: string;
  state?: string;
  stars?: number;
  committedTo?: string;
  classYear: string;
}

interface TeamRanking {
  rank: number;
  school: string;
  commits: number;
  avgRating: number;
  points: number;
}

interface Rankings {
  espn300: RankedPlayer[];
  positionRankings: Record<string, RankedPlayer[]>;
  stateRankings: Record<string, RankedPlayer[]>;
  teamRankings: TeamRanking[];
}

const quickLinks = [
  { icon: Trophy, label: "ESPN 300", tab: "espn300" },
  { icon: Target, label: "By Position", tab: "position" },
  { icon: MapPin, label: "By State", tab: "state" },
  { icon: School, label: "Team Rankings", tab: "team" },
];

const sourceColors: Record<string, string> = {
  "247Sports": "text-blue-400",
  "On3": "text-emerald-400",
  "Rivals": "text-orange-400",
  "MaxPreps": "text-purple-400",
  "ESPN": "text-red-400",
  "News": "text-gray-400",
};

const positionColors: Record<string, string> = {
  QB: "bg-red-500/20 text-red-400",
  RB: "bg-blue-500/20 text-blue-400",
  WR: "bg-green-500/20 text-green-400",
  TE: "bg-purple-500/20 text-purple-400",
  OT: "bg-yellow-500/20 text-yellow-400",
  OG: "bg-yellow-500/20 text-yellow-400",
  C: "bg-yellow-500/20 text-yellow-400",
  DL: "bg-orange-500/20 text-orange-400",
  DE: "bg-orange-500/20 text-orange-400",
  DT: "bg-orange-500/20 text-orange-400",
  LB: "bg-pink-500/20 text-pink-400",
  CB: "bg-cyan-500/20 text-cyan-400",
  S: "bg-teal-500/20 text-teal-400",
  ATH: "bg-gray-500/20 text-gray-400",
  Edge: "bg-orange-500/20 text-orange-400",
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

function categorizeArticle(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('commit') || text.includes('recruit') || text.includes('offer')) return 'Recruiting';
  if (text.includes('rank') || text.includes('top ')) return 'Rankings';
  if (text.includes('camp')) return 'Camps';
  return 'High School';
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, i) => (
        <Star 
          key={i} 
          className={`w-3 h-3 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} 
        />
      ))}
    </div>
  );
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [rankings, setRankings] = useState<Rankings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rankingsLoading, setRankingsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("news");
  const [classYear, setClassYear] = useState("2025");
  const { toast } = useToast();

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-news');
      if (fnError) throw new Error(fnError.message);
      if (data?.success && data?.articles) {
        const formattedArticles: NewsArticle[] = data.articles.map((article: any, index: number) => ({
          id: `article-${index}`,
          title: article.title,
          description: article.description,
          source: article.source || 'News',
          url: article.url,
          imageUrl: article.imageUrl,
          publishedAt: getTimeAgo(article.publishedAt),
          category: categorizeArticle(article.title, article.description),
        }));
        setArticles(formattedArticles);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch news';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRankings = useCallback(async () => {
    setRankingsLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-rankings', {
        body: { type: 'all', classYear }
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.success && data?.rankings) {
        setRankings(data.rankings);
      }
    } catch (err) {
      console.error('Error fetching rankings:', err);
    } finally {
      setRankingsLoading(false);
    }
  }, [classYear]);

  useEffect(() => {
    fetchNews();
    fetchRankings();
  }, [fetchNews, fetchRankings]);

  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  const featuredArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1, 3);
  const remainingArticles = filteredArticles.slice(3);
  const topHeadlines = articles.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ESPN-style dark header bar */}
      <div className="pt-20 bg-card border-b border-border">
        <div className="container">
          <div className="flex items-center gap-6 py-3 overflow-x-auto scrollbar-hide">
            <span className="text-accent font-bold text-lg whitespace-nowrap">HS Football</span>
            <div className="h-6 w-px bg-border" />
            
            {/* Main Tabs */}
            <button
              onClick={() => setActiveTab("news")}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "news" ? "text-white border-b-2 border-accent pb-2 -mb-[13px]" : "text-gray-400 hover:text-white"
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab("rankings")}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "rankings" ? "text-white border-b-2 border-accent pb-2 -mb-[13px]" : "text-gray-400 hover:text-white"
              }`}
            >
              Rankings
            </button>
            
            <div className="h-6 w-px bg-border" />
            
            {activeTab === "news" && (
              <>
                {["All", "Recruiting", "Rankings", "High School"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat.toLowerCase())}
                    className={`text-sm whitespace-nowrap transition-colors ${
                      activeCategory === cat.toLowerCase() ? "text-accent" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </>
            )}
            
            {activeTab === "rankings" && (
              <Select value={classYear} onValueChange={setClassYear}>
                <SelectTrigger className="w-24 h-8 bg-transparent border-gray-600 text-white text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            <div className="ml-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => activeTab === "news" ? fetchNews() : fetchRankings()}
                disabled={isLoading || rankingsLoading}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${(isLoading || rankingsLoading) ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-6">
        {activeTab === "news" ? (
          // NEWS TAB
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-4 border border-accent/30">
                  <h3 className="font-bold text-white text-sm mb-2">BRAND OF A CHAMPION</h3>
                  <p className="text-xs text-gray-400 mb-3">Empowering athletes to succeed beyond the game.</p>
                  <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-xs">Get Started</Button>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Quick Links</h4>
                  <nav className="space-y-1">
                    {quickLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => { setActiveTab("rankings"); }}
                        className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors w-full text-left"
                      >
                        <link.icon className="w-4 h-4 text-gray-500" />
                        {link.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-7">
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="w-full h-[400px] bg-secondary" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-48 bg-secondary" />
                    <Skeleton className="h-48 bg-secondary" />
                  </div>
                </div>
              ) : error ? (
                <div className="bg-card rounded-lg p-8 text-center">
                  <Newspaper className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Unable to Load News</h3>
                  <p className="text-gray-400 text-sm mb-4">{error}</p>
                  <Button onClick={fetchNews} variant="outline" size="sm">Try Again</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {featuredArticle && (
                    <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <article className="relative rounded-lg overflow-hidden bg-card">
                        {featuredArticle.imageUrl ? (
                          <div className="relative aspect-[16/9]">
                            <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800'; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <Badge className="bg-accent text-white border-0 mb-3">{featuredArticle.category}</Badge>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-3">{featuredArticle.title}</h2>
                              <p className="text-gray-300 text-sm line-clamp-2 mb-3">{featuredArticle.description}</p>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className={sourceColors[featuredArticle.source]}>{featuredArticle.source}</span>
                                <span>•</span>
                                <span>{featuredArticle.publishedAt}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6">
                            <Badge className="bg-accent text-white border-0 mb-3">{featuredArticle.category}</Badge>
                            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{featuredArticle.title}</h2>
                            <p className="text-gray-400 text-sm">{featuredArticle.description}</p>
                          </div>
                        )}
                      </article>
                    </a>
                  )}

                  {secondaryArticles.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {secondaryArticles.map((article) => (
                        <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                          <article className="bg-card rounded-lg overflow-hidden h-full">
                            {article.imageUrl && (
                              <div className="aspect-video overflow-hidden">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              </div>
                            )}
                            <div className="p-4">
                              <h3 className="font-bold text-white text-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">{article.title}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className={sourceColors[article.source]}>{article.source}</span>
                                <span>•</span>
                                <span>{article.publishedAt}</span>
                              </div>
                            </div>
                          </article>
                        </a>
                      ))}
                    </div>
                  )}

                  {remainingArticles.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <Newspaper className="w-4 h-4 text-accent" />More Stories
                      </h3>
                      <div className="space-y-3">
                        {remainingArticles.map((article) => (
                          <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                            <article className="flex gap-4 bg-card rounded-lg p-3 hover:bg-secondary transition-colors">
                              {article.imageUrl && (
                                <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white text-sm group-hover:text-accent transition-colors line-clamp-2">{article.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  <span className={sourceColors[article.source]}>{article.source}</span>
                                  <span>•</span>
                                  <span>{article.publishedAt}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-600 self-center flex-shrink-0" />
                            </article>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </main>

            {/* Right Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-lg overflow-hidden">
                  <div className="bg-secondary px-4 py-3 border-b border-border">
                    <h3 className="font-bold text-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4" />Top Headlines</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {isLoading ? (
                      Array(8).fill(0).map((_, i) => <div key={i} className="p-3"><Skeleton className="h-4 w-full bg-muted" /></div>)
                    ) : (
                      topHeadlines.map((article) => (
                        <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-secondary transition-colors group">
                          <div className="flex items-start gap-3">
                            <span className={`text-xs font-bold mt-0.5 ${sourceColors[article.source]}`}>{article.source.charAt(0)}</span>
                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2 flex-1">{article.title}</p>
                          </div>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          // RANKINGS TAB
          <div className="space-y-8">
            <Tabs defaultValue="espn300" className="w-full">
              <TabsList className="bg-card border border-border mb-6">
                <TabsTrigger value="espn300" className="data-[state=active]:bg-accent">ESPN 300</TabsTrigger>
                <TabsTrigger value="position" className="data-[state=active]:bg-accent">By Position</TabsTrigger>
                <TabsTrigger value="state" className="data-[state=active]:bg-accent">By State</TabsTrigger>
                <TabsTrigger value="team" className="data-[state=active]:bg-accent">Team Rankings</TabsTrigger>
              </TabsList>

              {/* ESPN 300 */}
              <TabsContent value="espn300">
                <div className="bg-card rounded-lg overflow-hidden">
                  <div className="bg-secondary px-6 py-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Crown className="w-6 h-6 text-amber-400" />
                      <div>
                        <h2 className="font-bold text-white text-xl">ESPN 300</h2>
                        <p className="text-gray-400 text-sm">Class of {classYear} Top Prospects</p>
                      </div>
                    </div>
                    <Badge className="bg-red-500/20 text-red-400 border-0">LIVE</Badge>
                  </div>
                  
                  {rankingsLoading ? (
                    <div className="p-6 space-y-4">
                      {Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-16 bg-secondary" />)}
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {rankings?.espn300.map((player) => (
                        <div key={player.rank} className="flex items-center gap-4 px-6 py-4 hover:bg-secondary transition-colors">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${player.rank <= 3 ? 'bg-amber-500/20 text-amber-400' : player.rank <= 10 ? 'bg-gray-500/20 text-gray-300' : 'bg-muted text-muted-foreground'}`}>
                            {player.rank}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{player.name}</span>
                              <Badge className={`text-xs ${positionColors[player.position] || positionColors.ATH}`}>{player.position}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              {player.highSchool && <span>{player.highSchool}</span>}
                              {player.state && <span>• {player.state}</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            <StarRating stars={player.stars || 4} />
                            {player.committedTo && (
                              <span className="text-xs text-green-400 mt-1 block">{player.committedTo}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Position Rankings */}
              <TabsContent value="position">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rankingsLoading ? (
                    Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-64 bg-secondary" />)
                  ) : (
                    Object.entries(rankings?.positionRankings || {}).map(([position, players]) => (
                      <div key={position} className="bg-card rounded-lg overflow-hidden">
                        <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-2">
                          <Badge className={positionColors[position] || positionColors.ATH}>{position}</Badge>
                          <span className="font-bold text-foreground">Rankings</span>
                        </div>
                        <div className="divide-y divide-border">
                          {players.slice(0, 5).map((player) => (
                            <div key={player.rank} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors">
                              <span className="w-6 text-center font-bold text-gray-500">{player.rank}</span>
                              <div className="flex-1">
                                <span className="font-semibold text-white text-sm">{player.name}</span>
                                <span className="text-xs text-gray-500 ml-2">{player.state}</span>
                              </div>
                              <StarRating stars={player.stars || 4} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* State Rankings */}
              <TabsContent value="state">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rankingsLoading ? (
                    Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-64 bg-secondary" />)
                  ) : (
                    Object.entries(rankings?.stateRankings || {}).map(([state, players]) => (
                      <div key={state} className="bg-card rounded-lg overflow-hidden">
                        <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="font-bold text-foreground">{state}</span>
                        </div>
                        <div className="divide-y divide-border">
                          {players.slice(0, 5).map((player) => (
                            <div key={player.rank} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors">
                              <span className="w-6 text-center font-bold text-gray-500">{player.rank}</span>
                              <div className="flex-1">
                                <span className="font-semibold text-white text-sm">{player.name}</span>
                                <Badge className={`ml-2 text-xs ${positionColors[player.position] || positionColors.ATH}`}>{player.position}</Badge>
                              </div>
                              <StarRating stars={player.stars || 4} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Team Rankings */}
              <TabsContent value="team">
                <div className="bg-card rounded-lg overflow-hidden">
                  <div className="bg-secondary px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <School className="w-6 h-6 text-accent" />
                      <div>
                        <h2 className="font-bold text-white text-xl">Team Recruiting Rankings</h2>
                        <p className="text-gray-400 text-sm">Class of {classYear}</p>
                      </div>
                    </div>
                  </div>
                  
                  {rankingsLoading ? (
                    <div className="p-6 space-y-4">
                      {Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-12 bg-secondary" />)}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-secondary">
                          <tr className="text-left text-xs text-muted-foreground uppercase">
                            <th className="px-6 py-3">Rank</th>
                            <th className="px-6 py-3">School</th>
                            <th className="px-6 py-3 text-center">Commits</th>
                            <th className="px-6 py-3 text-center">Avg Rating</th>
                            <th className="px-6 py-3 text-right">Points</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {rankings?.teamRankings.map((team) => (
                            <tr key={team.rank} className="hover:bg-secondary transition-colors">
                              <td className="px-6 py-4">
                                <span className={`font-bold ${team.rank <= 3 ? 'text-amber-400' : 'text-gray-400'}`}>{team.rank}</span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-white">{team.school}</td>
                              <td className="px-6 py-4 text-center text-gray-300">{team.commits}</td>
                              <td className="px-6 py-4 text-center">
                                <Badge className="bg-accent/20 text-accent">{team.avgRating.toFixed(1)}</Badge>
                              </td>
                              <td className="px-6 py-4 text-right font-bold text-white">{team.points.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
