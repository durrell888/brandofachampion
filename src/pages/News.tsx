import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Newspaper, 
  RefreshCw,
  TrendingUp,
  ChevronRight
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

const sourceColors: Record<string, string> = {
  "247Sports": "text-blue-400",
  "On3": "text-emerald-400",
  "Rivals": "text-orange-400",
  "MaxPreps": "text-purple-400",
  "ESPN": "text-red-400",
  "News": "text-gray-400",
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

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
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

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

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
            
            {["All", "Recruiting", "High School"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat.toLowerCase())}
                className={`text-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat.toLowerCase() ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
            
            <div className="ml-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={fetchNews}
                disabled={isLoading}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-4 border border-accent/30">
                <h3 className="font-bold text-foreground text-sm mb-2">BRAND OF A CHAMPION</h3>
                <p className="text-xs text-gray-400 mb-3">Empowering athletes to succeed beyond the game.</p>
                <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-xs">Get Started</Button>
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
                <h3 className="font-bold text-foreground mb-2">Unable to Load News</h3>
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
                          <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{featuredArticle.title}</h2>
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
                            <h3 className="font-bold text-foreground text-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">{article.title}</h3>
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
                    <h3 className="font-bold text-foreground flex items-center gap-2">
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
                              <h4 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors line-clamp-2">{article.title}</h4>
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
      </div>

      <Footer />
    </div>
  );
}
