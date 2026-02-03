-- ===========================================
-- FIX 1: Remove insecure UPDATE policy on georgia_daily_polls
-- and create atomic vote increment function
-- ===========================================

-- Drop the insecure UPDATE policy that allows anyone to manipulate vote counts
DROP POLICY IF EXISTS "Anyone can vote on polls" ON public.georgia_daily_polls;

-- Create atomic vote increment function (prevents race conditions)
CREATE OR REPLACE FUNCTION public.increment_poll_vote(
  _poll_id uuid,
  _voter_id text,
  _option text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  -- Validate option
  IF _option NOT IN ('a', 'b') THEN
    RAISE EXCEPTION 'Invalid option: must be a or b';
  END IF;
  
  -- Check if already voted
  IF EXISTS (
    SELECT 1 FROM georgia_poll_votes 
    WHERE poll_id = _poll_id AND voter_id = _voter_id
  ) THEN
    RAISE EXCEPTION 'Already voted on this poll';
  END IF;
  
  -- Insert vote record
  INSERT INTO georgia_poll_votes (poll_id, voter_id, chosen_option)
  VALUES (_poll_id, _voter_id, _option);
  
  -- Atomic increment based on option and return updated counts
  IF _option = 'a' THEN
    UPDATE georgia_daily_polls 
    SET votes_a = votes_a + 1
    WHERE id = _poll_id
    RETURNING json_build_object('votes_a', votes_a, 'votes_b', votes_b, 'id', id) INTO result;
  ELSE
    UPDATE georgia_daily_polls 
    SET votes_b = votes_b + 1
    WHERE id = _poll_id
    RETURNING json_build_object('votes_a', votes_a, 'votes_b', votes_b, 'id', id) INTO result;
  END IF;
  
  RETURN result;
END;
$$;

-- ===========================================
-- FIX 2: Create safe view for subscription_status
-- that excludes Stripe IDs from client access
-- ===========================================

-- Create a safe view without sensitive Stripe identifiers
CREATE OR REPLACE VIEW public.subscription_status_safe
WITH (security_invoker = on)
AS
  SELECT 
    id,
    user_id,
    status,
    product_id,
    current_period_start,
    current_period_end,
    created_at,
    updated_at
  FROM public.subscription_status;
  -- Intentionally excludes: stripe_customer_id, stripe_subscription_id

-- Grant access to the view
GRANT SELECT ON public.subscription_status_safe TO authenticated;
GRANT SELECT ON public.subscription_status_safe TO anon;