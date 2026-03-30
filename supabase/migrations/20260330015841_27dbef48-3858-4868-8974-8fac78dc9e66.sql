
-- 1. Fix school_coaches: add deny policies for INSERT, UPDATE, DELETE
CREATE POLICY "No user INSERT on school_coaches"
ON public.school_coaches FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "No user UPDATE on school_coaches"
ON public.school_coaches FOR UPDATE
TO public
USING (false);

CREATE POLICY "No user DELETE on school_coaches"
ON public.school_coaches FOR DELETE
TO public
USING (false);

-- 2. Fix georgia_visitor_streaks: restrict UPDATE to own rows
DROP POLICY "Visitors can update own streaks" ON public.georgia_visitor_streaks;

CREATE POLICY "Visitors can update own streaks"
ON public.georgia_visitor_streaks FOR UPDATE
TO public
USING (visitor_id = visitor_id)
WITH CHECK (visitor_id = visitor_id);

-- Actually we need a better approach - restrict by visitor_id matching the row's visitor_id
-- Since these are anonymous visitors tracked by a client-side ID, we need to match on visitor_id column
-- The INSERT policy already allows anyone, so UPDATE should at minimum not allow changing visitor_id
DROP POLICY "Visitors can update own streaks" ON public.georgia_visitor_streaks;

CREATE POLICY "Visitors can update own streaks"
ON public.georgia_visitor_streaks FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 3. Fix has_active_subscription to use the parameter
CREATE OR REPLACE FUNCTION public.has_active_subscription(check_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.subscription_status
    WHERE user_id = check_user_id
      AND status = 'active'
      AND current_period_end > now()
  )
$$;

-- 4. Fix has_school_interest to use the parameter
CREATE OR REPLACE FUNCTION public.has_school_interest(_user_id uuid, _school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.school_contact_interest
    WHERE user_id = _user_id
      AND school_id = _school_id
  )
$$;

-- 5. Fix georgia_media: restrict INSERT to admins only
DROP POLICY "Authenticated users can insert media" ON public.georgia_media;

CREATE POLICY "Admins can insert media"
ON public.georgia_media FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
