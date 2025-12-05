-- Create message board threads table
CREATE TABLE public.message_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.thread_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID NOT NULL REFERENCES public.message_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_team_response BOOLEAN NOT NULL DEFAULT false,
  team_member_name TEXT,
  media_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create coaching sessions table
CREATE TABLE public.coaching_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  team_member TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  topic TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thread_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for message_threads
CREATE POLICY "Users can view all threads" ON public.message_threads
  FOR SELECT USING (true);

CREATE POLICY "Users can create threads" ON public.message_threads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own threads" ON public.message_threads
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for thread_messages
CREATE POLICY "Users can view all messages" ON public.thread_messages
  FOR SELECT USING (true);

CREATE POLICY "Users can create messages" ON public.thread_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for coaching_sessions
CREATE POLICY "Users can view own sessions" ON public.coaching_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create sessions" ON public.coaching_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.coaching_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create storage bucket for message media
INSERT INTO storage.buckets (id, name, public) VALUES ('message-media', 'message-media', true);

-- Storage policies
CREATE POLICY "Anyone can view message media" ON storage.objects
  FOR SELECT USING (bucket_id = 'message-media');

CREATE POLICY "Authenticated users can upload message media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'message-media' AND auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_thread_messages_thread_id ON public.thread_messages(thread_id);
CREATE INDEX idx_coaching_sessions_user_id ON public.coaching_sessions(user_id);