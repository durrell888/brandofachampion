import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Plus, Users, FileText, Trash2, Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAcademy";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function AcademyAdmin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [newMission, setNewMission] = useState({
    title: "", description: "", category: "Mindset", mission_type: "video_quiz",
    points_reward: 50, hours_reward: 1, content_url: "", requires_admin_review: false,
  });

  // Check admin
  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" as any });
      return !!data;
    },
    enabled: !!user,
  });

  // Missions
  const { data: missions } = useQuery({
    queryKey: ["admin-missions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("academy_missions").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  // Submissions pending review
  const { data: pendingSubmissions } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_submissions")
        .select("*, academy_missions(title)")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  // Profiles
  const { data: profiles } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_profiles")
        .select("*")
        .order("total_points", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  // Create mission
  const createMissionMut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("academy_missions").insert({
        title: newMission.title,
        description: newMission.description,
        category: newMission.category,
        mission_type: newMission.mission_type,
        points_reward: newMission.points_reward,
        hours_reward: newMission.hours_reward,
        content_url: newMission.content_url || null,
        requires_admin_review: newMission.requires_admin_review,
        sort_order: (missions?.length || 0) + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-missions"] });
      setCreateOpen(false);
      toast.success("Mission created!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  // Approve/reject submission
  const reviewSubmission = useMutation({
    mutationFn: async ({ id, status, userId, missionId }: { id: string; status: string; userId: string; missionId: string }) => {
      const { error } = await supabase.from("academy_submissions").update({
        status, reviewed_by: user?.id, reviewed_at: new Date().toISOString(),
      }).eq("id", id);
      if (error) throw error;

      if (status === "approved") {
        const mission = missions?.find(m => m.id === missionId);
        if (mission) {
          const { data: profile } = await supabase.from("academy_profiles").select("*").eq("user_id", userId).single();
          if (profile) {
            const newHours = Number(profile.total_hours) + Number(mission.hours_reward);
            const newPoints = profile.total_points + mission.points_reward;
            const rank = newHours >= 50 ? "Champion" : newHours >= 25 ? "Elite" : newHours >= 10 ? "Prospect" : "Rookie";
            await supabase.from("academy_profiles").update({ total_hours: newHours, total_points: newPoints, rank }).eq("user_id", userId);
          }
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
      toast.success("Submission reviewed!");
    },
  });

  // Delete mission
  const deleteMission = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("academy_missions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-missions"] });
      toast.success("Mission deleted");
    },
  });

  if (loading || adminLoading) {
    return <div className="min-h-screen bg-background"><Navbar /><div className="container pt-32 text-center text-muted-foreground">Loading...</div></div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container pt-32 text-center">
          <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Admin Access Required</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEO title="Admin | Champion Academy" />
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-28 pb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold flex items-center gap-2">
                <Shield className="h-8 w-8 text-yellow-500" /> Admin Panel
              </h1>
              <p className="text-muted-foreground">Manage missions, review submissions, and adjust user data</p>
            </div>
          </div>

          <Tabs defaultValue="missions">
            <TabsList className="mb-6">
              <TabsTrigger value="missions">Missions ({missions?.length || 0})</TabsTrigger>
              <TabsTrigger value="submissions">Pending ({pendingSubmissions?.length || 0})</TabsTrigger>
              <TabsTrigger value="users">Users ({profiles?.length || 0})</TabsTrigger>
            </TabsList>

            {/* Missions Tab */}
            <TabsContent value="missions">
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="mb-4 bg-yellow-500 text-black hover:bg-yellow-400"><Plus className="mr-2 h-4 w-4" />New Mission</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Create Mission</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Title</Label><Input value={newMission.title} onChange={e => setNewMission(p => ({...p, title: e.target.value}))} /></div>
                    <div><Label>Description</Label><Textarea value={newMission.description} onChange={e => setNewMission(p => ({...p, description: e.target.value}))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Category</Label>
                        <Select value={newMission.category} onValueChange={v => setNewMission(p => ({...p, category: v}))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {["Mindset","Education","Community Impact","Promotion","Skill Challenge"].map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Type</Label>
                        <Select value={newMission.mission_type} onValueChange={v => setNewMission(p => ({...p, mission_type: v}))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video_quiz">Video + Quiz</SelectItem>
                            <SelectItem value="text_submission">Text Submission</SelectItem>
                            <SelectItem value="engagement">Engagement</SelectItem>
                            <SelectItem value="interactive">Interactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Points</Label><Input type="number" value={newMission.points_reward} onChange={e => setNewMission(p => ({...p, points_reward: parseInt(e.target.value) || 0}))} /></div>
                      <div><Label>Hours</Label><Input type="number" step="0.5" value={newMission.hours_reward} onChange={e => setNewMission(p => ({...p, hours_reward: parseFloat(e.target.value) || 0}))} /></div>
                    </div>
                    <div><Label>Content URL (optional)</Label><Input value={newMission.content_url} onChange={e => setNewMission(p => ({...p, content_url: e.target.value}))} /></div>
                    <Button onClick={() => createMissionMut.mutate()} className="w-full bg-yellow-500 text-black" disabled={!newMission.title || !newMission.description}>
                      Create Mission
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-3">
                {(missions || []).map(m => (
                  <div key={m.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                    <div>
                      <p className="font-semibold text-foreground">{m.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{m.category}</Badge>
                        <Badge variant="outline" className="text-xs">{m.mission_type}</Badge>
                        <span className="text-xs text-yellow-500">{m.points_reward} pts</span>
                        <span className="text-xs text-blue-500">{m.hours_reward}h</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteMission.mutate(m.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions">
              {(pendingSubmissions || []).length === 0 ? (
                <p className="text-center text-muted-foreground py-10">No pending submissions</p>
              ) : (
                <div className="space-y-3">
                  {(pendingSubmissions || []).map((sub: any) => (
                    <div key={sub.id} className="p-4 bg-card border border-border rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{sub.academy_missions?.title}</p>
                          <p className="text-xs text-muted-foreground">{new Date(sub.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => reviewSubmission.mutate({ id: sub.id, status: "approved", userId: sub.user_id, missionId: sub.mission_id })}
                            className="bg-green-600 hover:bg-green-500"><Check className="h-4 w-4 mr-1" />Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => reviewSubmission.mutate({ id: sub.id, status: "rejected", userId: sub.user_id, missionId: sub.mission_id })}>
                            <X className="h-4 w-4 mr-1" />Reject</Button>
                        </div>
                      </div>
                      {sub.response_text && (
                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg mt-2">{sub.response_text}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="space-y-3">
                {(profiles || []).map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                    <div>
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email} • {p.rank}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-yellow-500 font-semibold">{p.total_points} pts</p>
                      <p className="text-blue-400">{Number(p.total_hours).toFixed(1)}h</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </>
  );
}
