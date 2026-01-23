-- Fix 1: Add restrictive policies for subscription_status table
-- Only allow backend service accounts (via edge functions) to modify subscription data

-- Explicitly deny INSERT for regular users (only service_role through edge functions can insert)
CREATE POLICY "No user INSERT on subscription_status"
ON public.subscription_status
FOR INSERT
WITH CHECK (false);

-- Explicitly deny UPDATE for regular users (only service_role through edge functions can update)
CREATE POLICY "No user UPDATE on subscription_status"
ON public.subscription_status
FOR UPDATE
USING (false);

-- Explicitly deny DELETE for regular users (only service_role through edge functions can delete)
CREATE POLICY "No user DELETE on subscription_status"
ON public.subscription_status
FOR DELETE
USING (false);