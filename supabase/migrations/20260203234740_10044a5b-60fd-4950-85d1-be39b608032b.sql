-- Add weight and height columns to dchs_participants
ALTER TABLE public.dchs_participants
ADD COLUMN weight integer,
ADD COLUMN height_inches integer;