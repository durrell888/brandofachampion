import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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
  MapPin,
  AlertCircle
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

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  source: string;
  duration: string;
  url: string;
  publishedAt: string;
}

const placeholderVideos: VideoItem[] = [
  {
    id: "v1",
    title: "Top 10 Plays of the Week - High School Football",
    thumbnail: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600",
    source: "247Sports",
    duration: "5:32",
    url: "#",
    publishedAt: "1 day ago"
  },
  {
    id: "v2",
    title: "5-Star QB Highlights - Junior Season",
    thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
    source: "On3",
    duration: "3:45",
    url: "#",
    publishedAt: "2 days ago"
  },
  {
    id: "v3",
    title: "State Championship Game Recap",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600",
    source: "Rivals",
    duration: "8:15",
    url: "#",
    publishedAt: "3 days ago"
  },
  {
    id: "v4",
    title: "Elite Camp Highlights & Interviews",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
    source: "247Sports",
    duration: "12:20",
    url: "#",
    publishedAt: "4 days ago"
  }
];

const sourceColors: Record<string, string> = {
  "247Sports": "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  "On3": "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  "Rivals": "bg-orange-500/20 text-orange-700 dark:text-orange-400",
  "MaxPreps": "bg-purple-500/20 text-purple-700 dark:text-purple-400",
  "ESPN": "bg-red-500/20 text-red-700 dark:text-red-400",
  "News": "bg-gray-500/20 text-gray-700 dark:text-gray-400",
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Rankings": <TrendingUp className="w-3 h-3" />,
  "Recruiting": <Star className="w-3 h-3" />,
  "High School": <MapPin className="w-3 h-3" />,
  "Camps": <Star className="w-3 h-3" />,
  "News": <Newspaper className="w-3 h-3" />,
};

function getTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  } catch {
    return "Recently";
  }
}

function categorizeArticle(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('commit') || text.includes('recruit') || text.includes('offer') || text.includes('signing')) return 'Recruiting';
  if (text.includes('rank') || text.includes('top ') || text.includes('best')) return 'Rankings';
  if (text.includes('camp') || text.includes('combine')) return 'Camps';
  return 'High School';
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [videos] = useState<VideoItem[]>(placeholderVideos);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-news');
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      
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
        toast({
          title: "News Updated",
          description: `Loaded ${formattedArticles.length} articles`,
        });
      } else {
        throw new Error(data?.error || 'Failed to fetch news');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch news';
      setError(message);
      console.error('Error fetching news:', err);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const filteredArticles = activeTab === "all" 
    ? articles 
    : articles.filter(a => a.category.toLowerCase() === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
              <Newspaper className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Latest News</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 animate-fade-in [animation-delay:100ms] opacity-0 tracking-tight">
              <span className="block">HIGH SCHOOL</span>
              <span className="text-gradient">FOOTBALL NEWS</span>
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in [animation-delay:200ms] opacity-0 font-medium max-w-xl mx-auto">
              Stay up to date with the latest recruiting news, rankings, and highlights from across the nation.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L1440 0V80H0Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* News Sources */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground font-medium">Powered by:</span>
            {["247Sports", "On3", "Rivals", "MaxPreps", "ESPN"].map((source) => (
              <Badge key={source} variant="secondary" className={sourceColors[source]}>
                {source}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <TabsList className="bg-secondary">
                <TabsTrigger value="all">All News</TabsTrigger>
                <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
                <TabsTrigger value="rankings">Rankings</TabsTrigger>
                <TabsTrigger value="high school">High School</TabsTrigger>
              </TabsList>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2" 
                disabled={isLoading}
                onClick={fetchNews}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Articles Column */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-accent" />
                  Latest Articles
                </h2>

                <TabsContent value={activeTab} className="mt-0">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Card key={i}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <Skeleton className="w-32 h-24 rounded-lg" />
                              <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : error ? (
                    <Card className="border-destructive/50">
                      <CardContent className="p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Unable to Load News</h3>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={fetchNews} variant="outline">
                          Try Again
                        </Button>
                      </CardContent>
                    </Card>
                  ) : filteredArticles.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">No Articles Found</h3>
                        <p className="text-muted-foreground">
                          {activeTab === "all" 
                            ? "No news articles available at the moment." 
                            : `No articles found in the "${activeTab}" category.`}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredArticles.map((article, index) => (
                        <a 
                          key={article.id}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Card 
                            className="overflow-hidden hover:border-accent/30 transition-all cursor-pointer group animate-fade-in opacity-0"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row gap-4">
                                {article.imageUrl && (
                                  <div className="sm:w-48 h-32 sm:h-auto overflow-hidden">
                                    <img
                                      src={article.imageUrl}
                                      alt={article.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                                <div className="flex-1 p-4 sm:py-4 sm:pr-4 sm:pl-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary" className={sourceColors[article.source] || sourceColors["News"]}>
                                      {article.source}
                                    </Badge>
                                    <Badge variant="outline" className="gap-1">
                                      {categoryIcons[article.category] || categoryIcons["News"]}
                                      {article.category}
                                    </Badge>
                                  </div>
                                  <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                    {article.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                    {article.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {article.publishedAt}
                                    </span>
                                    <span className="text-xs text-accent flex items-center gap-1">
                                      Read more <ExternalLink className="w-3 h-3" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </div>

              {/* Videos Sidebar */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Play className="w-6 h-6 text-accent" />
                  Latest Videos
                </h2>

                <div className="space-y-4">
                  {videos.map((video, index) => (
                    <Card 
                      key={video.id} 
                      className="overflow-hidden hover:border-accent/30 transition-all cursor-pointer group animate-fade-in opacity-0"
                      style={{ animationDelay: `${(index + 6) * 50}ms` }}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                              <Play className="w-6 h-6 text-accent-foreground fill-current" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`absolute top-2 left-2 ${sourceColors[video.source]}`}
                          >
                            {video.source}
                          </Badge>
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition-colors">
                            {video.title}
                          </h3>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                            <Clock className="w-3 h-3" />
                            {video.publishedAt}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
