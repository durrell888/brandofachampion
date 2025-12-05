-- Create scholarships table
CREATE TABLE public.scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  amount_min INTEGER,
  amount_max INTEGER,
  deadline DATE,
  gpa_requirement DECIMAL(3,2),
  grade_levels TEXT[], -- e.g., ['freshman', 'sophomore', 'junior', 'senior']
  states TEXT[], -- eligible states, empty = nationwide
  description TEXT,
  eligibility TEXT,
  application_url TEXT,
  category TEXT, -- 'athletic', 'academic', 'need-based', 'minority', 'stem', 'arts'
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view scholarships
CREATE POLICY "Authenticated users can view scholarships"
ON public.scholarships
FOR SELECT
TO authenticated
USING (true);

-- Create index for common filters
CREATE INDEX idx_scholarships_deadline ON public.scholarships(deadline);
CREATE INDEX idx_scholarships_category ON public.scholarships(category);
CREATE INDEX idx_scholarships_states ON public.scholarships USING GIN(states);

-- Create saved scholarships table for users to bookmark
CREATE TABLE public.saved_scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scholarship_id UUID NOT NULL REFERENCES public.scholarships(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, scholarship_id)
);

-- Enable RLS
ALTER TABLE public.saved_scholarships ENABLE ROW LEVEL SECURITY;

-- Users can only see their own saved scholarships
CREATE POLICY "Users can view own saved scholarships"
ON public.saved_scholarships
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can save scholarships
CREATE POLICY "Users can save scholarships"
ON public.saved_scholarships
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can unsave scholarships
CREATE POLICY "Users can delete own saved scholarships"
ON public.saved_scholarships
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);