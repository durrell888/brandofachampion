-- Drop existing role constraint and add new one with additional coordinator roles
ALTER TABLE school_coaches DROP CONSTRAINT school_coaches_role_check;

ALTER TABLE school_coaches ADD CONSTRAINT school_coaches_role_check 
CHECK (role = ANY (ARRAY['Head Coach'::text, 'Recruiting Coordinator'::text, 'Offensive Coordinator'::text, 'Defensive Coordinator'::text]));