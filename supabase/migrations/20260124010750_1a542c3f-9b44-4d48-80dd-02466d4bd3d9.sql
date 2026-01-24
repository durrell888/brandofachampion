-- Create table for player nominations and votes
CREATE TABLE public.georgia_player_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  position TEXT NOT NULL,
  school TEXT,
  class_year TEXT,
  vote_count INTEGER NOT NULL DEFAULT 1,
  voter_id TEXT, -- Anonymous browser fingerprint or session ID
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_georgia_votes_position ON public.georgia_player_votes(position);
CREATE INDEX idx_georgia_votes_count ON public.georgia_player_votes(vote_count DESC);

-- Enable Row Level Security
ALTER TABLE public.georgia_player_votes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view votes
CREATE POLICY "Anyone can view votes" 
ON public.georgia_player_votes 
FOR SELECT 
USING (true);

-- Allow anyone to insert votes
CREATE POLICY "Anyone can submit votes" 
ON public.georgia_player_votes 
FOR INSERT 
WITH CHECK (true);

-- Allow updates to increment vote counts
CREATE POLICY "Anyone can update vote counts" 
ON public.georgia_player_votes 
FOR UPDATE 
USING (true);

-- Create table for daily polls/debates
CREATE TABLE public.georgia_daily_polls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  votes_a INTEGER NOT NULL DEFAULT 0,
  votes_b INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  poll_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for polls
ALTER TABLE public.georgia_daily_polls ENABLE ROW LEVEL SECURITY;

-- Anyone can view polls
CREATE POLICY "Anyone can view polls" 
ON public.georgia_daily_polls 
FOR SELECT 
USING (true);

-- Anyone can vote on polls (update)
CREATE POLICY "Anyone can vote on polls" 
ON public.georgia_daily_polls 
FOR UPDATE 
USING (true);

-- Create table for poll votes tracking (prevent double voting)
CREATE TABLE public.georgia_poll_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID NOT NULL REFERENCES public.georgia_daily_polls(id) ON DELETE CASCADE,
  voter_id TEXT NOT NULL,
  chosen_option TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(poll_id, voter_id)
);

-- Enable RLS
ALTER TABLE public.georgia_poll_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can view their own votes
CREATE POLICY "Anyone can view poll votes" 
ON public.georgia_poll_votes 
FOR SELECT 
USING (true);

-- Anyone can insert poll votes
CREATE POLICY "Anyone can submit poll votes" 
ON public.georgia_poll_votes 
FOR INSERT 
WITH CHECK (true);

-- Create table for visitor streaks
CREATE TABLE public.georgia_visitor_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 1,
  longest_streak INTEGER NOT NULL DEFAULT 1,
  total_visits INTEGER NOT NULL DEFAULT 1,
  last_visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.georgia_visitor_streaks ENABLE ROW LEVEL SECURITY;

-- Anyone can view streaks
CREATE POLICY "Anyone can view streaks" 
ON public.georgia_visitor_streaks 
FOR SELECT 
USING (true);

-- Anyone can insert streaks
CREATE POLICY "Anyone can create streaks" 
ON public.georgia_visitor_streaks 
FOR INSERT 
WITH CHECK (true);

-- Anyone can update their streak
CREATE POLICY "Anyone can update streaks" 
ON public.georgia_visitor_streaks 
FOR UPDATE 
USING (true);

-- Create table for featured videos/media
CREATE TABLE public.georgia_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  youtube_id TEXT,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'highlight',
  view_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.georgia_media ENABLE ROW LEVEL SECURITY;

-- Anyone can view media
CREATE POLICY "Anyone can view media" 
ON public.georgia_media 
FOR SELECT 
USING (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.georgia_player_votes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.georgia_daily_polls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.georgia_visitor_streaks;

-- Insert some initial polls for engagement
INSERT INTO public.georgia_daily_polls (question, option_a, option_b, poll_date) VALUES
('Best QB prospect in Georgia right now?', 'Air Noland (Langston Hughes)', 'Dylan Raiola-type next gen', CURRENT_DATE),
('Which position group runs Georgia football?', 'Running Backs', 'Defensive Line', CURRENT_DATE + 1);

-- Trigger for updated_at
CREATE TRIGGER update_georgia_votes_updated_at
BEFORE UPDATE ON public.georgia_player_votes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_georgia_streaks_updated_at
BEFORE UPDATE ON public.georgia_visitor_streaks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();