import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import FirecrawlApp from "https://esm.sh/@mendable/firecrawl-js@4.8.1?bundle-deps&no-dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Scholarship {
  name: string;
  provider: string;
  amount_min?: number;
  amount_max?: number;
  deadline?: string;
  description?: string;
  eligibility?: string;
  gpa_requirement?: number;
  grade_levels?: string[];
  states?: string[];
  category?: string;
  application_url?: string;
  source_url?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate: require a valid user JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!firecrawlApiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables");
    }

    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting scholarship scraping...");

    const scholarshipSources = [
      {
        url: "https://www.fastweb.com/college-scholarships",
        name: "Fastweb"
      },
      {
        url: "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory",
        name: "Scholarships.com"
      },
      {
        url: "https://www.niche.com/colleges/scholarships/",
        name: "Niche"
      }
    ];

    const allScholarships: Scholarship[] = [];

    for (const source of scholarshipSources) {
      console.log(`Scraping ${source.name}...`);
      
      try {
        const response = await firecrawl.scrape(source.url, {
          formats: [
            {
              type: "json",
              prompt: `Extract scholarship information from this page. For each scholarship found, extract:
              - name: the scholarship name
              - provider: organization offering the scholarship
              - amount_min: minimum award amount (number only, no $ sign)
              - amount_max: maximum award amount (number only, no $ sign)
              - deadline: application deadline in YYYY-MM-DD format if available
              - description: brief description of the scholarship
              - eligibility: eligibility requirements
              - gpa_requirement: minimum GPA if specified (number like 3.0)
              - grade_levels: array of eligible grade levels (freshman, sophomore, junior, senior)
              - category: type of scholarship (academic, athletic, need-based, stem, community, arts)
              - application_url: direct link to apply
              
              Return as JSON array of scholarship objects. Only include scholarships with at least a name and provider.`
            }
          ],
          onlyMainContent: true,
          waitFor: 3000,
        });

        if (response.success && response.json) {
          const scholarships = Array.isArray(response.json) ? response.json : [response.json];
          
          for (const s of scholarships) {
            if (s.name && s.provider) {
              allScholarships.push({
                name: s.name,
                provider: s.provider,
                amount_min: s.amount_min ? Number(s.amount_min) : undefined,
                amount_max: s.amount_max ? Number(s.amount_max) : undefined,
                deadline: s.deadline || undefined,
                description: s.description || undefined,
                eligibility: s.eligibility || undefined,
                gpa_requirement: s.gpa_requirement ? Number(s.gpa_requirement) : undefined,
                grade_levels: s.grade_levels || undefined,
                states: s.states || undefined,
                category: s.category || undefined,
                application_url: s.application_url || undefined,
                source_url: source.url,
              });
            }
          }
          
          console.log(`Found ${scholarships.length} scholarships from ${source.name}`);
        }
      } catch (scrapeError) {
        console.error(`Error scraping ${source.name}:`, scrapeError);
      }
    }

    console.log(`Total scholarships found: ${allScholarships.length}`);

    // Insert new scholarships, avoiding duplicates by name
    let inserted = 0;
    let skipped = 0;

    for (const scholarship of allScholarships) {
      // Check if scholarship already exists
      const { data: existing } = await supabase
        .from("scholarships")
        .select("id")
        .eq("name", scholarship.name)
        .maybeSingle();

      if (existing) {
        skipped++;
        continue;
      }

      const { error } = await supabase
        .from("scholarships")
        .insert(scholarship);

      if (error) {
        console.error(`Error inserting scholarship ${scholarship.name}:`, error);
      } else {
        inserted++;
      }
    }

    console.log(`Inserted ${inserted} new scholarships, skipped ${skipped} duplicates`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Scraped ${allScholarships.length} scholarships. Inserted ${inserted}, skipped ${skipped} duplicates.`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in fetch-scholarships:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
