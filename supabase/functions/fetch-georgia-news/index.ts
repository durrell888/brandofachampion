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

// Fallback articles focused on Georgia high school football (excluding On3)
const fallbackArticles: NewsArticle[] = [
  {
    title: "Buford Wolves Eye Another State Championship Run",
    description: "The Buford Wolves continue their dominant season with a loaded roster of Division I prospects. Head coach Bryant Appling's squad remains the team to beat in Georgia.",
    source: "Georgia Sports Now",
    url: "https://247sports.com",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "Milton Eagles QB Commits to Top 10 Program",
    description: "One of Georgia's top quarterback prospects has made his college decision, selecting a top-10 program after an impressive junior season.",
    source: "Rivals",
    url: "https://rivals.com",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600",
    publishedAt: new Date().toISOString(),
    category: "Recruiting",
  },
  {
    title: "Grayson Rams Defense Dominates in Region Play",
    description: "The Grayson Rams defense has been nearly impenetrable, allowing just 7 points per game through region play.",
    source: "MaxPreps",
    url: "https://maxpreps.com",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "Colquitt County's Running Back Breaks School Record",
    description: "The Packers' star running back rushed for 287 yards, breaking a 15-year-old school record in Friday night's victory.",
    source: "Georgia Sports Now",
    url: "https://247sports.com",
    imageUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "Top 2026 Georgia Recruits Drawing SEC Attention",
    description: "Georgia's Class of 2026 is loaded with talent as UGA, Alabama, and Tennessee battle for the state's best prospects.",
    source: "247Sports",
    url: "https://247sports.com",
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
    publishedAt: new Date().toISOString(),
    category: "Recruiting",
  },
  {
    title: "Carrollton Trojans WR Hauls in 3 TDs in Playoff Win",
    description: "The Trojans' star receiver continued his spectacular season with a three-touchdown performance in the first round of playoffs.",
    source: "Rivals",
    url: "https://rivals.com",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "GHSA Playoff Bracket Released: Class 7A Preview",
    description: "Breaking down the Class 7A playoff bracket and identifying the teams with the best path to the state championship.",
    source: "Georgia Sports Now",
    url: "https://ghsa.net",
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
    publishedAt: new Date().toISOString(),
    category: "High School",
  },
  {
    title: "Valdosta Wildcats Linebacker Earns 5-Star Status",
    description: "The nation's top linebacker prospect hails from South Georgia and has become one of the most sought-after recruits in the country.",
    source: "247Sports",
    url: "https://247sports.com",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600",
    publishedAt: new Date().toISOString(),
    category: "Recruiting",
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
        
        // Skip On3 articles
        if (url.includes('on3.com')) {
          console.log('Skipping On3 article:', result.title);
          continue;
        }

        let source = 'Georgia Sports';
        if (url.includes('247sports.com')) source = '247Sports';
        else if (url.includes('rivals.com')) source = 'Rivals';
        else if (url.includes('espn.com')) source = 'ESPN';
        else if (url.includes('maxpreps.com')) source = 'MaxPreps';
        else if (url.includes('ghsa.net')) source = 'GHSA';
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
