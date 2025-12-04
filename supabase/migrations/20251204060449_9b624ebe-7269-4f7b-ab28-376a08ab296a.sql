-- Add unique constraint on school name to prevent duplicates
ALTER TABLE public.ncaa_football_schools 
ADD CONSTRAINT ncaa_football_schools_name_unique UNIQUE (name);

-- Add index on state for faster filtering
CREATE INDEX IF NOT EXISTS idx_ncaa_football_schools_state ON public.ncaa_football_schools(state);

-- Add index on conference for faster filtering  
CREATE INDEX IF NOT EXISTS idx_ncaa_football_schools_conference ON public.ncaa_football_schools(conference);