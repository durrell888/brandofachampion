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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!FIRECRAWL_API_KEY) {
      console.error('FIRECRAWL_API_KEY not found');
      throw new Error('Firecrawl API key not configured');
    }

    console.log('Starting news fetch with Firecrawl search...');

    // Use Firecrawl search to find high school football news
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
        tbs: 'qdr:w', // Last week
        scrapeOptions: {
          formats: ['markdown'],
          onlyMainContent: true,
        }
      }),
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Firecrawl search error:', errorText);
      throw new Error(`Firecrawl search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    console.log('Firecrawl search completed, results:', searchData.data?.length || 0);

    const articles: NewsArticle[] = [];

    if (searchData.success && searchData.data) {
      for (const result of searchData.data) {
        // Extract source from URL
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

    console.log('Processed articles:', articles.length);

    return new Response(
      JSON.stringify({ 
        success: true, 
        articles,
        fetchedAt: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error fetching news:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        articles: [] 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
