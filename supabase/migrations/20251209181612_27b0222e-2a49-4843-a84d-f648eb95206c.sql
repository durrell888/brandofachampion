-- Create subscription_status table to track user subscriptions server-side
CREATE TABLE public.subscription_status (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  stripe_customer_id text,
  stripe_subscription_id text,
  product_id text,
  status text NOT NULL DEFAULT 'inactive',
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_status ENABLE ROW LEVEL SECURITY;

-- Users can only view their own subscription status
CREATE POLICY "Users can view own subscription status"
ON public.subscription_status
FOR SELECT
USING (auth.uid() = user_id);

-- Create a security definer function to check subscription status
CREATE OR REPLACE FUNCTION public.has_active_subscription(check_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.subscription_status
    WHERE user_id = check_user_id
      AND status = 'active'
      AND current_period_end > now()
  )
$$;

-- Create function to check specific product subscription
CREATE OR REPLACE FUNCTION public.has_product_subscription(check_user_id uuid, check_product_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.subscription_status
    WHERE user_id = check_user_id
      AND product_id = check_product_id
      AND status = 'active'
      AND current_period_end > now()
  )
$$;

-- Update school_coaches policy to require subscription
DROP POLICY IF EXISTS "Authenticated users can view coaches" ON public.school_coaches;
CREATE POLICY "Subscribers can view coaches"
ON public.school_coaches
FOR SELECT
USING (public.has_active_subscription(auth.uid()));

-- Create site password settings table for site-wide protection
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  setting_value text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS - only authenticated admins can modify, public can read password requirement
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can check if site password is required
CREATE POLICY "Anyone can check site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Insert default site password (disabled by default)
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES ('site_password_enabled', 'false'), ('site_password', '');

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_subscription_status_updated_at
BEFORE UPDATE ON public.subscription_status
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();