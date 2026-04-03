
-- Add media_url column to academy_submissions
ALTER TABLE public.academy_submissions ADD COLUMN media_url text;

-- Create storage bucket for academy submission media
INSERT INTO storage.buckets (id, name, public) VALUES ('academy-media', 'academy-media', true);

-- Storage policies for academy-media bucket
CREATE POLICY "Anyone can view academy media"
ON storage.objects FOR SELECT
USING (bucket_id = 'academy-media');

CREATE POLICY "Authenticated users can upload academy media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'academy-media' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own academy media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'academy-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own academy media"
ON storage.objects FOR DELETE
USING (bucket_id = 'academy-media' AND auth.uid()::text = (storage.foldername(name))[1]);
