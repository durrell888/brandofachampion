
-- Fix security definer view issue
ALTER VIEW public.academy_leaderboard_view SET (security_invoker = on);
