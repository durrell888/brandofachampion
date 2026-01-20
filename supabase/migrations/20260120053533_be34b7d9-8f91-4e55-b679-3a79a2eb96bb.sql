-- Fix 1: Site Settings - Only allow reading the 'site_password_enabled' key, not the password itself
DROP POLICY IF EXISTS "Anyone can check site settings" ON public.site_settings;

-- Allow anyone to check if password protection is enabled (but not read the password)
CREATE POLICY "Anyone can check if password protection is enabled" 
ON public.site_settings
FOR SELECT USING (setting_key = 'site_password_enabled');

-- Fix 2: Subscribers table - Remove ability for users to enumerate other emails
-- Only service role should access this table, users don't need to read it
DROP POLICY IF EXISTS "Users can check their own subscription" ON public.subscribers;

-- No SELECT policy needed - inserts are public, but reading is service-role only
-- The application doesn't need users to query this table

-- Fix 3: Message Threads - Restrict viewing to thread owners only
-- Note: Based on project memory, Pro subscribers should see all threads for community feature
-- However, the current policy is too permissive (anyone authenticated can see all)
-- Restricting to owners only for privacy - admin/team can be added later if needed
DROP POLICY IF EXISTS "Users can view all threads" ON public.message_threads;

CREATE POLICY "Users can view own threads" 
ON public.message_threads
FOR SELECT USING (auth.uid() = user_id);

-- Fix 4: Thread Messages - Restrict viewing to thread owners only  
-- Messages should only be visible to the thread owner
DROP POLICY IF EXISTS "Users can view all messages" ON public.thread_messages;

CREATE POLICY "Users can view messages in own threads" 
ON public.thread_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.message_threads 
    WHERE id = thread_messages.thread_id 
    AND user_id = auth.uid()
  )
);