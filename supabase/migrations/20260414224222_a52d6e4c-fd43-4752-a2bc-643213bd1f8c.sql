
ALTER TABLE academy_missions DROP CONSTRAINT academy_missions_category_check;
ALTER TABLE academy_missions ADD CONSTRAINT academy_missions_category_check CHECK (category = ANY (ARRAY['Mindset','Education','Community Impact','Promotion','Skill Challenge','Health & Wellness']));

ALTER TABLE academy_missions DROP CONSTRAINT academy_missions_mission_type_check;
ALTER TABLE academy_missions ADD CONSTRAINT academy_missions_mission_type_check CHECK (mission_type = ANY (ARRAY['video_quiz','text_submission','engagement','interactive','quiz']));
