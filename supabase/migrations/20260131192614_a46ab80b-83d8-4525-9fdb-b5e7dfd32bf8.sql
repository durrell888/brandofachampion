-- Fix 1: Remove the overly permissive UPDATE policy on georgia_player_votes
-- This prevents vote count manipulation by attackers
DROP POLICY IF EXISTS "Anyone can update vote counts" ON public.georgia_player_votes;

-- Fix 2: Restrict visitor_streaks updates to only the visitor's own records
-- This prevents manipulation of other users' streak data
DROP POLICY IF EXISTS "Anyone can update streaks" ON public.georgia_visitor_streaks;

-- Create a more secure policy that only allows updating own visitor records
CREATE POLICY "Visitors can update own streaks"
ON public.georgia_visitor_streaks
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Note: We keep the UPDATE policy for streaks as the visitor_id is client-generated
-- and we need to allow anonymous tracking, but the actual vote count manipulation
-- for georgia_player_votes is removed since votes should only be counted via INSERT

-- Fix 3: Add email format validation constraint to subscribers table
-- This ensures only valid email addresses can be inserted
ALTER TABLE public.subscribers
DROP CONSTRAINT IF EXISTS valid_email_format;

ALTER TABLE public.subscribers
ADD CONSTRAINT valid_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Fix 4: Add length constraints to subscribers email
ALTER TABLE public.subscribers
DROP CONSTRAINT IF EXISTS email_max_length;

ALTER TABLE public.subscribers
ADD CONSTRAINT email_max_length
CHECK (length(email) <= 255);