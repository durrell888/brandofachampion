-- Fix 1: Ensure subscribers table has explicit deny SELECT policy
-- The table already has no SELECT policy which means RLS denies SELECT, 
-- but let's add an explicit deny for clarity

CREATE POLICY "No public read access to subscribers"
ON public.subscribers
FOR SELECT
USING (false);

-- Fix 2: Create access_logs table to track coach contact access attempts
-- This helps detect potential harvesting behavior

CREATE TABLE IF NOT EXISTS public.coach_access_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    school_id uuid NOT NULL,
    access_type text NOT NULL DEFAULT 'view',
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on access logs
ALTER TABLE public.coach_access_logs ENABLE ROW LEVEL SECURITY;

-- Users can only insert their own access logs
CREATE POLICY "Users can log their own access"
ON public.coach_access_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- No direct SELECT/UPDATE/DELETE for users
CREATE POLICY "No direct read of access logs"
ON public.coach_access_logs
FOR SELECT
USING (false);

-- Add rate limit checking function for coach access
-- Limits users to accessing 10 unique schools per day
CREATE OR REPLACE FUNCTION public.check_coach_access_rate_limit(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (
    SELECT COUNT(DISTINCT school_id)
    FROM public.coach_access_logs
    WHERE user_id = _user_id
      AND created_at > now() - interval '24 hours'
  ) < 10
$$;