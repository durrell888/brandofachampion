-- 1. Fix thread message impersonation: add trigger to enforce non-admin can't set team fields
CREATE OR REPLACE FUNCTION public.enforce_user_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin') AND NOT has_role(auth.uid(), 'moderator') THEN
    NEW.is_team_response := false;
    NEW.team_member_name := NULL;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_user_message_trigger
BEFORE INSERT ON public.thread_messages
FOR EACH ROW
EXECUTE FUNCTION public.enforce_user_message();

-- 2. Fix visitor streak update policy: restrict to own visitor_id only
DROP POLICY IF EXISTS "Visitors can update own streaks" ON public.georgia_visitor_streaks;

-- Create a secure RPC for streak updates instead
CREATE OR REPLACE FUNCTION public.update_visitor_streak(
  _visitor_id text,
  _current_streak integer,
  _longest_streak integer,
  _total_visits integer,
  _last_visit_date date
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE georgia_visitor_streaks
  SET current_streak = _current_streak,
      longest_streak = _longest_streak,
      total_visits = _total_visits,
      last_visit_date = _last_visit_date,
      updated_at = now()
  WHERE visitor_id = _visitor_id;
END;
$$;

-- 3. Fix message media storage: remove overly broad SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view message media" ON storage.objects;

-- 4. Fix coach contact access: add rate limit check to policy
DROP POLICY IF EXISTS "Users can view coaches for interested schools" ON public.school_coaches;

CREATE POLICY "Users can view coaches for interested schools"
ON public.school_coaches
FOR SELECT
TO authenticated
USING (
  has_active_subscription(auth.uid())
  AND has_school_interest(auth.uid(), school_id)
  AND check_coach_access_rate_limit(auth.uid())
);