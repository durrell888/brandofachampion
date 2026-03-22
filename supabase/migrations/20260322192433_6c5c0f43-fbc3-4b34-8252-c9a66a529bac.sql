-- Fix 1: Restrict dchs_participants write access to admin role only
-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert participants" ON dchs_participants;
DROP POLICY IF EXISTS "Authenticated users can update participants" ON dchs_participants;
DROP POLICY IF EXISTS "Authenticated users can delete participants" ON dchs_participants;

-- Create user_roles table and has_role function for admin checks
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Restrictive admin-only policies for dchs_participants
CREATE POLICY "Admins can insert participants"
ON dchs_participants FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update participants"
ON dchs_participants FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete participants"
ON dchs_participants FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Fix has_active_subscription to use auth.uid() internally
CREATE OR REPLACE FUNCTION public.has_active_subscription(check_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.subscription_status
    WHERE user_id = auth.uid()
      AND status = 'active'
      AND current_period_end > now()
  )
$$;

-- Fix 3: Fix has_school_interest to use auth.uid() internally
CREATE OR REPLACE FUNCTION public.has_school_interest(_user_id uuid, _school_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.school_contact_interest
    WHERE user_id = auth.uid()
      AND school_id = _school_id
  )
$$;