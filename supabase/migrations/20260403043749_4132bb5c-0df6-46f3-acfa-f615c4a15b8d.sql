
-- Academy Profiles
CREATE TABLE public.academy_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  name text NOT NULL,
  email text NOT NULL,
  age integer,
  school text,
  sport text,
  position text,
  total_hours numeric NOT NULL DEFAULT 0,
  total_points integer NOT NULL DEFAULT 0,
  rank text NOT NULL DEFAULT 'Rookie',
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_login_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles for leaderboard"
  ON public.academy_profiles FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.academy_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.academy_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any profile"
  ON public.academy_profiles FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Public read for leaderboard (anon)
CREATE POLICY "Anyone can view leaderboard data"
  ON public.academy_profiles FOR SELECT
  TO anon USING (true);

-- Academy Missions
CREATE TABLE public.academy_missions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('Mindset', 'Education', 'Community Impact', 'Promotion', 'Skill Challenge')),
  mission_type text NOT NULL CHECK (mission_type IN ('video_quiz', 'text_submission', 'engagement', 'interactive')),
  points_reward integer NOT NULL DEFAULT 0,
  hours_reward numeric NOT NULL DEFAULT 0,
  content_url text,
  quiz_data jsonb,
  min_word_count integer DEFAULT 150,
  passing_score integer DEFAULT 70,
  requires_admin_review boolean NOT NULL DEFAULT false,
  is_locked boolean NOT NULL DEFAULT false,
  unlock_hours numeric DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active missions"
  ON public.academy_missions FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can insert missions"
  ON public.academy_missions FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update missions"
  ON public.academy_missions FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete missions"
  ON public.academy_missions FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Academy Submissions
CREATE TABLE public.academy_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  mission_id uuid NOT NULL REFERENCES public.academy_missions(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  response_text text,
  score integer,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions"
  ON public.academy_submissions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
  ON public.academy_submissions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all submissions"
  ON public.academy_submissions FOR SELECT
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
  ON public.academy_submissions FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Academy Badges
CREATE TABLE public.academy_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT '🏆',
  requirement_type text NOT NULL CHECK (requirement_type IN ('hours', 'points', 'missions', 'streak', 'special')),
  requirement_value integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges"
  ON public.academy_badges FOR SELECT USING (true);

CREATE POLICY "Admins can manage badges"
  ON public.academy_badges FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- User Badges (earned)
CREATE TABLE public.academy_user_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  badge_id uuid NOT NULL REFERENCES public.academy_badges(id) ON DELETE CASCADE,
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.academy_user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON public.academy_user_badges FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view earned badges for leaderboard"
  ON public.academy_user_badges FOR SELECT
  USING (true);

CREATE POLICY "System can insert badges"
  ON public.academy_user_badges FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Academy Certificates
CREATE TABLE public.academy_certificates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  hours_milestone integer NOT NULL CHECK (hours_milestone IN (10, 25, 50)),
  generated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, hours_milestone)
);

ALTER TABLE public.academy_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates"
  ON public.academy_certificates FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create own certificates"
  ON public.academy_certificates FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_academy_profiles_updated_at
  BEFORE UPDATE ON public.academy_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_academy_missions_updated_at
  BEFORE UPDATE ON public.academy_missions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_academy_submissions_updated_at
  BEFORE UPDATE ON public.academy_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_academy_profiles_rank ON public.academy_profiles(total_points DESC);
CREATE INDEX idx_academy_submissions_user ON public.academy_submissions(user_id);
CREATE INDEX idx_academy_submissions_mission ON public.academy_submissions(mission_id);
CREATE INDEX idx_academy_missions_category ON public.academy_missions(category);
