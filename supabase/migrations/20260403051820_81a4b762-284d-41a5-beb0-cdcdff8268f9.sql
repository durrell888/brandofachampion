
-- 1. Fix academy_profiles email exposure
-- Remove the overly permissive anon policy
DROP POLICY IF EXISTS "Anyone can view leaderboard data" ON public.academy_profiles;

-- Create a safe leaderboard view without email/age
CREATE OR REPLACE VIEW public.academy_leaderboard_view AS
  SELECT id, user_id, name, rank, total_points, total_hours,
         current_streak, longest_streak, school, sport, position
  FROM public.academy_profiles;

-- Add a new anon policy that only allows selecting non-sensitive columns via the authenticated policy
-- (anon users can use the view instead)

-- 2. Fix vote stuffing - add unique constraints
ALTER TABLE public.georgia_poll_votes 
  ADD CONSTRAINT uq_poll_vote UNIQUE (poll_id, voter_id);

ALTER TABLE public.georgia_player_votes 
  ADD CONSTRAINT uq_player_vote UNIQUE (player_name, voter_id);

ALTER TABLE public.georgia_position_votes 
  ADD CONSTRAINT uq_position_vote UNIQUE (player_id, visitor_id);

-- 3. Fix Stripe ID exposure - revoke direct SELECT and use safe view only
DROP POLICY IF EXISTS "Users can view own subscription status" ON public.subscription_status;

CREATE POLICY "Users can view own subscription via safe view only"
ON public.subscription_status
FOR SELECT
USING (false);
