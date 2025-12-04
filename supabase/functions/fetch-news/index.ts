import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  imageUrl?: string;
  publishedAt?: string;
}

// Fallback articles when API is rate limited
const fallbackArticles: NewsArticle[] = [
  {
    title: "Top 2026 QB Prospects Making Waves This Season",
    description: "The class of 2026 is shaping up to have some of the most talented quarterbacks in recent memory. Here's who's standing out.",
    source: "247Sports",
    url: "https://247sports.com",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Five-Star Running Back Commits to SEC Powerhouse",
    description: "In a major recruiting win, one of the nation's top running back prospects has made his college decision.",
    source: "On3",
    url: "https://on3.com",
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Texas High School Football State Championship Preview",
    description: "Breaking down the matchups and players to watch as Texas crowns its state champions this weekend.",
    source: "Rivals",
    url: "https://rivals.com",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "2025 Recruiting Class Rankings Update",
    description: "With early signing period approaching, here's how the top programs stack up in the recruiting rankings.",
    source: "247Sports",
    url: "https://247sports.com",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Rising Junior Defensive End Earns Fifth Star",
    description: "The 2027 prospect has been dominant this season, earning a rare fifth star in the latest rankings update.",
    source: "On3",
    url: "https://on3.com",
    imageUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "California's Top Prospects Showcase Talent at Elite Camp",
    description: "The best players from the Golden State gathered to compete and display their skills for college coaches.",
    source: "Rivals",
    url: "https://rivals.com",
    imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Georgia Bulldogs Land Top Safety Prospect",
    description: "The nation's top-ranked safety has committed to Georgia, adding to their already impressive 2025 class.",
    source: "ESPN",
    url: "https://espn.com",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Ohio State Makes Big Push for Five-Star Wide Receiver",
    description: "The Buckeyes are emerging as the favorite for one of the top receivers in the 2026 class.",
    source: "247Sports",
    url: "https://247sports.com",
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
    publishedAt: new Date().toISOString(),
  },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!FIRECRAWL_API_KEY) {
      console.log('FIRECRAWL_API_KEY not found, returning fallback data');
      return new Response(
        JSON.stringify({ success: true, articles: fallbackArticles, fallback: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting news fetch with Firecrawl search...');

    const searchResponse = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        query: 'high school football recruiting news 2024 2025',
        limit: 20,
        lang: 'en',
        country: 'us',
        tbs: 'qdr:w',
        scrapeOptions: {
          formats: ['markdown'],
          onlyMainContent: true,
        }
      }),
    });

    // Handle rate limiting gracefully
    if (searchResponse.status === 429) {
      console.log('Rate limited by Firecrawl, returning fallback data');
      return new Response(
        JSON.stringify({ success: true, articles: fallbackArticles, fallback: true, rateLimited: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!searchResponse.ok) {
      console.log(`Firecrawl error ${searchResponse.status}, returning fallback data`);
      return new Response(
        JSON.stringify({ success: true, articles: fallbackArticles, fallback: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchData = await searchResponse.json();
    console.log('Firecrawl search completed, results:', searchData.data?.length || 0);

    const articles: NewsArticle[] = [];

    if (searchData.success && searchData.data) {
      for (const result of searchData.data) {
        let source = 'News';
        const url = result.url || '';
        if (url.includes('on3.com')) source = 'On3';
        else if (url.includes('247sports.com')) source = '247Sports';
        else if (url.includes('rivals.com')) source = 'Rivals';
        else if (url.includes('espn.com')) source = 'ESPN';
        else if (url.includes('maxpreps.com')) source = 'MaxPreps';
        else {
          try {
            const urlObj = new URL(url);
            source = urlObj.hostname.replace('www.', '').split('.')[0];
            source = source.charAt(0).toUpperCase() + source.slice(1);
          } catch {
            source = 'News';
          }
        }

        articles.push({
          title: result.title || 'Untitled',
          description: result.description || result.markdown?.substring(0, 200) || '',
          url: result.url || '',
          source,
          imageUrl: result.metadata?.ogImage || result.metadata?.image || undefined,
          publishedAt: result.metadata?.publishedTime || new Date().toISOString(),
        });
      }
    }

    // If no articles found, return fallback
    if (articles.length === 0) {
      console.log('No articles found, returning fallback data');
      return new Response(
        JSON.stringify({ success: true, articles: fallbackArticles, fallback: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processed articles:', articles.length);

    return new Response(
      JSON.stringify({ success: true, articles, fetchedAt: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching news:', error);
    // Return fallback data on any error
    return new Response(
      JSON.stringify({ success: true, articles: fallbackArticles, fallback: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
