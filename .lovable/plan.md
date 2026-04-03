## Champion Academy — Full Build Plan

### Phase 1: Database Schema
Create these tables:
- **academy_profiles** — name, age, school, sport, position, hours, points, rank, streak info
- **academy_missions** — title, description, category, type, points/hours reward, content_url, quiz_data, is_locked, unlock_hours
- **academy_submissions** — user_id, mission_id, status, response_text, score, reviewed_by
- **academy_badges** — name, description, icon, requirement_type, requirement_value
- **academy_user_badges** — user_id, badge_id, earned_at
- **academy_certificates** — user_id, hours_milestone, certificate_url

RLS: Public read on missions/leaderboard, authenticated CRUD on own submissions/profile, admin manage all.

### Phase 2: Seed Data
Pre-populate ~15-20 missions across 5 categories:
- Mindset Missions (video + quiz)
- Education Missions (text submission)
- Community Impact Missions (engagement/click-based)
- Promotion Missions (share/invite)
- Skill Challenges (scenario-based multiple choice)

Pre-populate badge definitions (First Mission, 10 Hours, 25 Hours, 50 Hours, 7-Day Streak, etc.)

### Phase 3: UI Pages
- **/academy** — Landing/marketing page with CTA to sign up
- **/academy/dashboard** — Main dashboard (hours, points, rank, progress, badges, certificates)
- **/academy/missions** — Browse missions by category
- **/academy/mission/:id** — Individual mission page (video player, quiz, text input, etc.)
- **/academy/leaderboard** — Weekly leaderboard (top 50)
- **/academy/admin** — Admin panel (manage missions, review submissions, adjust points)

### Phase 4: Core Logic
- Mission completion flow (video+quiz, text submission, engagement clicks, interactive challenges)
- Points & hours tracking with automatic rank updates
- Daily login streak tracking (+5 points bonus)
- Badge award system (auto-check on mission completion)
- Certificate generation (PDF download at 10/25/50 hour milestones)

### Phase 5: Navigation
- Add "Champion Academy" to existing navbar
- Route integration in App.tsx

### Design
- Dark mode with gold accents (matching existing site theme)
- Sports/motivational aesthetic
- Progress bars, animations, badge displays
- Mobile responsive
