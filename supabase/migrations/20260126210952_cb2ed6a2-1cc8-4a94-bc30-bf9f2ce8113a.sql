-- Fix 1: Make message-media bucket private and update storage policies
UPDATE storage.buckets SET public = false WHERE id = 'message-media';

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view message media" ON storage.objects;

-- Create a new policy that only allows users to view their own uploaded media
CREATE POLICY "Users can view own thread media" ON storage.objects
FOR SELECT USING (
  bucket_id = 'message-media' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Fix 2: Create rate_limits table for password verification brute force protection
CREATE TABLE IF NOT EXISTS public.password_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  attempt_count integer NOT NULL DEFAULT 1,
  first_attempt_at timestamp with time zone NOT NULL DEFAULT now(),
  last_attempt_at timestamp with time zone NOT NULL DEFAULT now(),
  blocked_until timestamp with time zone,
  UNIQUE(ip_address)
);

-- Enable RLS on rate limits
ALTER TABLE public.password_rate_limits ENABLE ROW LEVEL SECURITY;

-- No direct access to rate limits from client
CREATE POLICY "No direct access to rate limits" ON public.password_rate_limits
FOR ALL USING (false);

-- Fix 3: Create school_contact_interest table to track user interest in specific schools
CREATE TABLE IF NOT EXISTS public.school_contact_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  school_id uuid REFERENCES public.ncaa_football_schools(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, school_id)
);

-- Enable RLS
ALTER TABLE public.school_contact_interest ENABLE ROW LEVEL SECURITY;

-- Users can view their own interests
CREATE POLICY "Users can view own school interests" ON public.school_contact_interest
FOR SELECT USING (auth.uid() = user_id);

-- Users can add schools they're interested in
CREATE POLICY "Users can add school interests" ON public.school_contact_interest
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can remove their interests
CREATE POLICY "Users can remove school interests" ON public.school_contact_interest
FOR DELETE USING (auth.uid() = user_id);

-- Create a function to check if user has expressed interest in a school
CREATE OR REPLACE FUNCTION public.has_school_interest(_user_id uuid, _school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.school_contact_interest
    WHERE user_id = _user_id
      AND school_id = _school_id
  )
$$;

-- Drop the old coaches policy
DROP POLICY IF EXISTS "Subscribers can view coaches" ON public.school_coaches;

-- Create new policy: users can only view coaches for schools they've expressed interest in
CREATE POLICY "Users can view coaches for interested schools" ON public.school_coaches
FOR SELECT USING (
  has_active_subscription(auth.uid()) AND
  has_school_interest(auth.uid(), school_id)
);