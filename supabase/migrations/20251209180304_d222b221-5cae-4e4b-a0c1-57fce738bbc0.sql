-- Fix subscribers table RLS policy to prevent public email exposure
DROP POLICY IF EXISTS "Users can check their own subscription" ON public.subscribers;
CREATE POLICY "Users can check their own subscription" ON public.subscribers
  FOR SELECT USING (auth.email() = email);