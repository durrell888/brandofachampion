-- Create table to track which positions each visitor has voted for
CREATE TABLE public.georgia_position_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id text NOT NULL,
  position text NOT NULL,
  player_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (visitor_id, position)
);

-- Enable Row Level Security
ALTER TABLE public.georgia_position_votes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view position votes (for checking if voted)
CREATE POLICY "Anyone can view position votes"
ON public.georgia_position_votes
FOR SELECT
USING (true);

-- Allow anyone to submit position votes
CREATE POLICY "Anyone can submit position votes"
ON public.georgia_position_votes
FOR INSERT
WITH CHECK (true);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.georgia_position_votes;