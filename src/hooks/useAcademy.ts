import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export interface AcademyProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  age: number | null;
  school: string | null;
  sport: string | null;
  position: string | null;
  total_hours: number;
  total_points: number;
  rank: string;
  current_streak: number;
  longest_streak: number;
  last_login_date: string | null;
  created_at: string;
}

export interface AcademyMission {
  id: string;
  title: string;
  description: string;
  category: string;
  mission_type: string;
  points_reward: number;
  hours_reward: number;
  content_url: string | null;
  quiz_data: any;
  min_word_count: number | null;
  passing_score: number | null;
  requires_admin_review: boolean;
  is_locked: boolean;
  unlock_hours: number | null;
  sort_order: number;
  is_active: boolean;
}

export interface AcademySubmission {
  id: string;
  user_id: string;
  mission_id: string;
  status: string;
  response_text: string | null;
  score: number | null;
  created_at: string;
}

export interface AcademyBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
}

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

function getRank(hours: number): string {
  if (hours >= 50) return "Champion";
  if (hours >= 25) return "Elite";
  if (hours >= 10) return "Prospect";
  return "Rookie";
}

export function useAcademyProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["academy-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("academy_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data as AcademyProfile | null;
    },
    enabled: !!user,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: { name: string; email: string; age?: number; school?: string; sport?: string; position?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase.from("academy_profiles").insert({
        user_id: user.id,
        name: profile.name,
        email: profile.email,
        age: profile.age || null,
        school: profile.school || null,
        sport: profile.sport || null,
        position: profile.position || null,
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["academy-profile"] }),
  });
}

export function useMissions() {
  return useQuery({
    queryKey: ["academy-missions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_missions")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as AcademyMission[];
    },
  });
}

export function useMission(id: string) {
  return useQuery({
    queryKey: ["academy-mission", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_missions")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as AcademyMission;
    },
    enabled: !!id,
  });
}

export function useMySubmissions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["academy-submissions", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("academy_submissions")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data as AcademySubmission[];
    },
    enabled: !!user,
  });
}

export function useSubmitMission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submission: {
      mission_id: string;
      status: string;
      response_text?: string;
      score?: number;
      points_earned: number;
      hours_earned: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create submission
      const { error: subError } = await supabase.from("academy_submissions").insert({
        user_id: user.id,
        mission_id: submission.mission_id,
        status: submission.status,
        response_text: submission.response_text || null,
        score: submission.score || null,
      });
      if (subError) throw subError;

      // Update profile points/hours if approved
      if (submission.status === "approved") {
        const { data: profile } = await supabase
          .from("academy_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (profile) {
          const newHours = Number(profile.total_hours) + submission.hours_earned;
          const newPoints = profile.total_points + submission.points_earned;
          const newRank = getRank(newHours);

          await supabase.from("academy_profiles").update({
            total_hours: newHours,
            total_points: newPoints,
            rank: newRank,
          }).eq("user_id", user.id);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academy-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["academy-profile"] });
    },
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["academy-leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_profiles")
        .select("name, total_hours, total_points, rank, school")
        .order("total_points", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });
}

export function useBadges() {
  return useQuery({
    queryKey: ["academy-badges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_badges")
        .select("*")
        .order("requirement_value");
      if (error) throw error;
      return data as AcademyBadge[];
    },
  });
}

export function useMyBadges() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["academy-user-badges", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("academy_user_badges")
        .select("*, academy_badges(*)")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useCheckAndAwardBadges() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("academy_profiles").select("*").eq("user_id", user.id).single();
      if (!profile) return;

      const { data: badges } = await supabase.from("academy_badges").select("*");
      const { data: earnedBadges } = await supabase
        .from("academy_user_badges").select("badge_id").eq("user_id", user.id);
      
      const earnedIds = new Set((earnedBadges || []).map(b => b.badge_id));
      
      const { data: submissions } = await supabase
        .from("academy_submissions").select("id").eq("user_id", user.id).eq("status", "approved");
      const completedMissions = submissions?.length || 0;

      for (const badge of (badges || [])) {
        if (earnedIds.has(badge.id)) continue;
        let earned = false;
        switch (badge.requirement_type) {
          case "hours": earned = Number(profile.total_hours) >= badge.requirement_value; break;
          case "points": earned = profile.total_points >= badge.requirement_value; break;
          case "missions": earned = completedMissions >= badge.requirement_value; break;
          case "streak": earned = profile.current_streak >= badge.requirement_value; break;
        }
        if (earned) {
          await supabase.from("academy_user_badges").insert({ user_id: user.id, badge_id: badge.id });
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["academy-user-badges"] }),
  });
}

export function useUpdateStreak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("academy_profiles").select("*").eq("user_id", user.id).single();
      if (!profile) return;

      const today = new Date().toISOString().split("T")[0];
      if (profile.last_login_date === today) return; // already logged today

      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const newStreak = profile.last_login_date === yesterday ? profile.current_streak + 1 : 1;
      const longestStreak = Math.max(newStreak, profile.longest_streak);
      const streakBonus = 5; // daily login bonus

      await supabase.from("academy_profiles").update({
        last_login_date: today,
        current_streak: newStreak,
        longest_streak: longestStreak,
        total_points: profile.total_points + streakBonus,
      }).eq("user_id", user.id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["academy-profile"] }),
  });
}
