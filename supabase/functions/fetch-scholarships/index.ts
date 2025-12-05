import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import FirecrawlApp from "https://esm.sh/@mendable/firecrawl-js@4.8.1?bundle-deps&no-dts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Scholarship {
  name: string;
  provider: string;
  amount_min?: number;
  amount_max?: number;
  deadline?: string;
  gpa_requirement?: number;
  grade_levels?: string[];
  states?: string[];
  description?: string;
  eligibility?: string;
  application_url?: string;
  category?: string;
  source_url?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Firecrawl API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });

    console.log('Fetching scholarships from external sources...');

    // Search for scholarship opportunities
    const searchQueries = [
      'high school athletic scholarships 2025',
      'college football scholarships for high school students',
      'student athlete scholarships application',
      'sports scholarships for minorities',
    ];

    const scholarships: Scholarship[] = [];

    for (const query of searchQueries) {
      try {
        console.log(`Searching: ${query}`);
        const searchResult = await firecrawl.search(query, {
          limit: 5,
          scrapeOptions: {
            formats: ['markdown'],
          },
        });

        if (searchResult && searchResult.web && Array.isArray(searchResult.web)) {
          for (const result of searchResult.web) {
            // Parse scholarship data from search results
            const scholarship = parseScholarshipFromResult(result, query);
            if (scholarship) {
              scholarships.push(scholarship);
            }
          }
        }
      } catch (searchError) {
        console.error(`Search error for query "${query}":`, searchError);
      }
    }

    // Insert scholarships into database
    if (scholarships.length > 0) {
      console.log(`Inserting ${scholarships.length} scholarships...`);
      
      for (const scholarship of scholarships) {
        // Check if scholarship already exists by name and provider
        const { data: existing } = await supabase
          .from('scholarships')
          .select('id')
          .eq('name', scholarship.name)
          .eq('provider', scholarship.provider)
          .maybeSingle();

        if (!existing) {
          const { error } = await supabase
            .from('scholarships')
            .insert(scholarship);
          
          if (error) {
            console.error('Insert error:', error);
          } else {
            console.log(`Inserted: ${scholarship.name}`);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${scholarships.length} scholarships`,
        count: scholarships.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Failed to fetch scholarships', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseScholarshipFromResult(result: any, query: string): Scholarship | null {
  try {
    const title = result.title || '';
    const markdown = result.markdown || '';
    const url = result.url || '';

    // Skip if not a real scholarship
    if (!title || title.length < 5) return null;

    // Extract amount from text
    const amountMatch = markdown.match(/\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g);
    let amountMin: number | undefined;
    let amountMax: number | undefined;

    if (amountMatch && amountMatch.length > 0) {
      const amounts = amountMatch.map((a: string) => 
        parseInt(a.replace(/[$,]/g, ''))
      ).filter((a: number) => a >= 100 && a <= 500000);
      
      if (amounts.length > 0) {
        amountMin = Math.min(...amounts);
        amountMax = Math.max(...amounts);
      }
    }

    // Extract deadline
    const deadlineMatch = markdown.match(
      /(?:deadline|due|expires?|closes?)[:\s]*(?:is\s+)?(\w+\s+\d{1,2},?\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{2,4})/i
    );
    let deadline: string | undefined;
    if (deadlineMatch) {
      try {
        const dateStr = deadlineMatch[1];
        const parsedDate = new Date(dateStr);
        if (!isNaN(parsedDate.getTime()) && parsedDate > new Date()) {
          deadline = parsedDate.toISOString().split('T')[0];
        }
      } catch {}
    }

    // Determine category
    let category = 'academic';
    if (query.includes('athletic') || query.includes('sports') || query.includes('football')) {
      category = 'athletic';
    } else if (query.includes('minorities')) {
      category = 'minority';
    }

    // Extract GPA if mentioned
    const gpaMatch = markdown.match(/(\d\.\d+)\s*GPA/i);
    const gpaRequirement = gpaMatch ? parseFloat(gpaMatch[1]) : undefined;

    // Extract provider from URL or title
    let provider = 'Unknown';
    try {
      const urlObj = new URL(url);
      provider = urlObj.hostname.replace('www.', '').split('.')[0];
      provider = provider.charAt(0).toUpperCase() + provider.slice(1);
    } catch {}

    return {
      name: title.slice(0, 200),
      provider,
      amount_min: amountMin,
      amount_max: amountMax,
      deadline,
      gpa_requirement: gpaRequirement,
      description: markdown.slice(0, 500),
      application_url: url,
      category,
      source_url: url,
    };
  } catch (error) {
    console.error('Parse error:', error);
    return null;
  }
}
