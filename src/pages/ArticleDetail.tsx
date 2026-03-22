import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string | null;
  image_url: string | null;
  category: string;
  source: string | null;
  created_at: string;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      // Try slug first, then fall back to ID
      let query = supabase
        .from("user_submitted_news")
        .select("*")
        .eq("status", "approved");

      const { data, error } = await query.eq("slug", slug).maybeSingle();

      if (!error && data) {
        setArticle(data as Article);
      } else {
        // Try by ID as fallback
        const { data: byId } = await supabase
          .from("user_submitted_news")
          .select("*")
          .eq("status", "approved")
          .eq("id", slug)
          .maybeSingle();
        
        if (byId) {
          setArticle(byId as Article);
        } else {
          setNotFound(true);
        }
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/3 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">This article may have been removed or is still pending review.</p>
          <Link to="/georgia-media">
            <Button><ArrowLeft className="w-4 h-4 mr-2" /> Back to Georgia Media</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pageTitle = article.meta_title || article.title;
  const pageDescription = article.meta_description || article.description;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${pageTitle} | Georgia Media`}
        description={pageDescription}
      />
      <Navbar />

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          to="/georgia-media"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Georgia Media
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge className="mb-4">{article.category}</Badge>

          <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4" style={{ lineHeight: 1.1 }}>
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(article.created_at)}
            </span>
            {article.source && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.source}
              </span>
            )}
          </div>

          {article.image_url && (
            <div className="rounded-xl overflow-hidden mb-8 aspect-video">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-6">
              {article.description}
            </p>

            {article.content && (
              article.content.trim().startsWith('<') ? (
                <div
                  className="text-base leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
                />
              ) : (
                <div className="text-base leading-relaxed">
                  {article.content.split('\n').map((line, i) => {
                    const imageMatch = line.match(/^\[IMAGE:(.*?)\|(.*?)\]$/);
                    if (imageMatch) {
                      return (
                        <div key={i} className="rounded-xl overflow-hidden my-8">
                          <img src={imageMatch[1]} alt={imageMatch[2]} className="w-full h-auto object-cover" loading="lazy" />
                        </div>
                      );
                    }
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="mb-4">{line}</p>;
                  })}
                </div>
              )
            )}
          </div>

          {article.keywords && article.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
              {article.keywords.map((kw) => (
                <Badge key={kw} variant="outline" className="text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
