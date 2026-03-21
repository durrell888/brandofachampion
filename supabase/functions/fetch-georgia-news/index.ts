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
  category?: string;
}

// Fallback articles focused on Georgia high school football
const fallbackArticles: NewsArticle[] = [
  {
    title: "GHSA Reclassification Shakes Up 2026 Landscape",
    description: "The latest GHSA reclassification has moved several programs into new regions, creating potential blockbuster matchups for the upcoming season.",
    source: "GHSA",
    url: "https://ghsa.net",
    imageUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "GHSA Announces Updated Playoff Format for 2026 Football Season",
    description: "The Georgia High School Association reveals changes to the state playoff brackets, impacting programs across all classifications.",
    source: "GHSA",
    url: "https://www.ghsa.net",
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "7-on-7 Season Heats Up Across Metro Atlanta",
    description: "Elite 7-on-7 tournaments are giving coaches their first look at rising talent. Several underclassmen are turning heads with breakout performances.",
    source: "MaxPreps",
    url: "https://maxpreps.com",
    imageUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "GPB Sports: Top 10 Georgia High School Football Teams for 2026",
    description: "Georgia Public Broadcasting ranks the state's top programs heading into the 2026 season, with several surprise entries cracking the list.",
    source: "GPB Sports",
    url: "https://www.gpb.org/sports",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "GHSA Region Realignment: Key Matchups to Watch in 2026",
    description: "New region assignments create exciting rivalries and championship contenders across Georgia high school football.",
    source: "GHSA",
    url: "https://www.ghsa.net",
    imageUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
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

    console.log('Starting Georgia news fetch with Firecrawl search...');

    const searchResponse = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        query: 'Georgia high school football recruiting news GHSA',
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
        const url = result.url || '';
        
        // Skip On3, 247Sports, Rivals, and Georgia Sports Now articles
        if (url.includes('on3.com') || url.includes('247sports.com') || url.includes('rivals.com') || url.includes('georgiasportsnow.com') || url.includes('ajc.com')) {
          console.log('Skipping filtered source:', result.title);
          continue;
        }

        let source = 'Georgia Sports';
        if (url.includes('espn.com')) source = 'ESPN';
        else if (url.includes('maxpreps.com')) source = 'MaxPreps';
        else if (url.includes('ghsa.net')) source = 'GHSA';
        else if (url.includes('gpb.org') || url.includes('gpbsports.org')) source = 'GPB Sports';
        else {
          try {
            const urlObj = new URL(url);
            source = urlObj.hostname.replace('www.', '').split('.')[0];
            source = source.charAt(0).toUpperCase() + source.slice(1);
          } catch {
            source = 'Georgia Sports';
          }
        }

        // Categorize the article
        const text = `${result.title || ''} ${result.description || ''}`.toLowerCase();
        let category = 'High School';
        if (text.includes('commit') || text.includes('recruit') || text.includes('offer') || text.includes('visit')) {
          category = 'Recruiting';
        } else if (text.includes('rank') || text.includes('top ')) {
          category = 'Rankings';
        }

        articles.push({
          title: result.title || 'Untitled',
          description: result.description || result.markdown?.substring(0, 200) || '',
          url: result.url || '',
          source,
          imageUrl: result.metadata?.ogImage || result.metadata?.image || undefined,
          publishedAt: result.metadata?.publishedTime || new Date().toISOString(),
          category,
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

    console.log('Processed Georgia articles:', articles.length);

    return new Response(
      JSON.stringify({ success: true, articles, fetchedAt: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching Georgia news:', error);
    // Return fallback data on any error
    return new Response(
      JSON.stringify({ success: true, articles: fallbackArticles, fallback: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
