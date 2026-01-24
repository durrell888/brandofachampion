-- Allow inserts to georgia_media table
CREATE POLICY "Anyone can insert media" 
ON public.georgia_media 
FOR INSERT 
WITH CHECK (true);