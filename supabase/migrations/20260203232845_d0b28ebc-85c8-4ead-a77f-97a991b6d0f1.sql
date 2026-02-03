-- Create table for DCHS training participants
CREATE TABLE public.dchs_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  grade INTEGER NOT NULL,
  position TEXT,
  vertical DECIMAL(4,1),
  forty_yard DECIMAL(4,2),
  hundred_meter DECIMAL(5,2),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dchs_participants ENABLE ROW LEVEL SECURITY;

-- Create policies - public read access
CREATE POLICY "Anyone can view participants"
  ON public.dchs_participants
  FOR SELECT
  USING (true);

-- For now, allow insert/update/delete for any authenticated user (can be restricted later)
CREATE POLICY "Authenticated users can insert participants"
  ON public.dchs_participants
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update participants"
  ON public.dchs_participants
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete participants"
  ON public.dchs_participants
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create updated_at trigger
CREATE TRIGGER update_dchs_participants_updated_at
  BEFORE UPDATE ON public.dchs_participants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();