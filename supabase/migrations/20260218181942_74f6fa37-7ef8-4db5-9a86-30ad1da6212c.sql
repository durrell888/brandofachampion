
-- Fix georgia_media INSERT policy: require authentication instead of allowing anonymous inserts
DROP POLICY IF EXISTS "Anyone can insert media" ON public.georgia_media;

CREATE POLICY "Authenticated users can insert media"
ON public.georgia_media FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Add length constraints to prevent DoS via oversized strings
ALTER TABLE public.georgia_media
ADD CONSTRAINT georgia_media_title_length CHECK (char_length(title) <= 200),
ADD CONSTRAINT georgia_media_description_length CHECK (char_length(description) <= 2000),
ADD CONSTRAINT georgia_media_youtube_id_length CHECK (char_length(youtube_id) <= 20),
ADD CONSTRAINT georgia_media_video_url_length CHECK (char_length(video_url) <= 500),
ADD CONSTRAINT georgia_media_thumbnail_url_length CHECK (char_length(thumbnail_url) <= 500);
