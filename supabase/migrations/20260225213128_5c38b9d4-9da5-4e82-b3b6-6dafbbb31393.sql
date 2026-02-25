
-- Create user-submitted news table
CREATE TABLE public.user_submitted_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'High School',
  status TEXT NOT NULL DEFAULT 'pending',
  source TEXT DEFAULT 'Community',
  external_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_submitted_news ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved articles
CREATE POLICY "Anyone can view approved news"
  ON public.user_submitted_news FOR SELECT
  USING (status = 'approved');

-- Logged-in users can also see their own pending/rejected submissions
CREATE POLICY "Users can view own submissions"
  ON public.user_submitted_news FOR SELECT
  USING (auth.uid() = user_id);

-- Logged-in users can submit articles
CREATE POLICY "Users can submit news"
  ON public.user_submitted_news FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending submissions
CREATE POLICY "Users can update own pending submissions"
  ON public.user_submitted_news FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- Users can delete their own pending submissions
CREATE POLICY "Users can delete own pending submissions"
  ON public.user_submitted_news FOR DELETE
  USING (auth.uid() = user_id AND status = 'pending');

-- Trigger for updated_at
CREATE TRIGGER update_user_submitted_news_updated_at
  BEFORE UPDATE ON public.user_submitted_news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for news images
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Storage policies
CREATE POLICY "Anyone can view news images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'news-images');

CREATE POLICY "Authenticated users can upload news images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'news-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete own news images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'news-images' AND auth.uid()::text = (storage.foldername(name))[1]);
