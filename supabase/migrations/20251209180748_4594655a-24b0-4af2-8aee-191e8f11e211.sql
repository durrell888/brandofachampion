-- Fix school_coaches RLS policy to require authentication
-- This prevents unauthenticated users from scraping coach contact data

DROP POLICY IF EXISTS "Anyone can view coaches" ON public.school_coaches;

CREATE POLICY "Authenticated users can view coaches" ON public.school_coaches
  FOR SELECT USING (auth.uid() IS NOT NULL);