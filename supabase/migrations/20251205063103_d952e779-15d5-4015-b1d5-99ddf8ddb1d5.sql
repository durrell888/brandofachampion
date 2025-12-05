-- Create table to track school contacts per user per month
CREATE TABLE public.school_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  school_id UUID NOT NULL REFERENCES public.ncaa_football_schools(id) ON DELETE CASCADE,
  contacted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, school_id, contacted_at)
);

-- Enable RLS
ALTER TABLE public.school_contacts ENABLE ROW LEVEL SECURITY;

-- Users can view their own contacts
CREATE POLICY "Users can view own contacts"
ON public.school_contacts
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own contacts
CREATE POLICY "Users can insert own contacts"
ON public.school_contacts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for efficient monthly queries
CREATE INDEX idx_school_contacts_user_month ON public.school_contacts (user_id, contacted_at);