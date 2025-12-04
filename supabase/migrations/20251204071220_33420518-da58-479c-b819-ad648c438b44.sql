-- Drop the role check constraint that's preventing coach data insertion
ALTER TABLE public.school_coaches DROP CONSTRAINT IF EXISTS school_coaches_role_check;