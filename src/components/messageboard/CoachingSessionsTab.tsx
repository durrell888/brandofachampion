import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User, Loader2, Plus } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface CoachingSession {
  id: string;
  team_member: string;
  preferred_date: string | null;
  preferred_time: string | null;
  topic: string;
  status: string;
  notes: string | null;
  created_at: string;
}

interface CoachingSessionsTabProps {
  userId: string;
}

const teamMembers = [
  { id: "durrell-steen", name: "Durrell Steen", role: "Executive Director" },
  { id: "aaron-ross", name: "Aaron Ross", role: "Athlete Advisor (Former NFL)" },
  { id: "sanya-richards-ross", name: "Sanya Richards-Ross", role: "Athlete Marketing" },
  { id: "kiana-williams", name: "Kiana Williams", role: "Women's Athlete Advisor" },
  { id: "andrew-chen", name: "Andrew Chen", role: "Financial Advisor" },
  { id: "everett-levy", name: "Everett Levy", role: "NIL Advisor" },
];

const CoachingSessionsTab = ({ userId }: CoachingSessionsTabProps) => {
  const [sessions, setSessions] = useState<CoachingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  // Form state
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [topic, setTopic] = useState("");

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('coaching_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSessions(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, [userId]);

  const handleRequestSession = async () => {
    if (!selectedTeamMember || !topic.trim()) {
      toast({
        title: "Required fields",
        description: "Please select a team member and describe your topic",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);

    const { error } = await supabase
      .from('coaching_sessions')
      .insert({
        user_id: userId,
        team_member: selectedTeamMember,
        preferred_date: preferredDate || null,
        preferred_time: preferredTime || null,
        topic: topic.trim()
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to request session",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Session Requested",
        description: "Our team will review your request and get back to you soon."
      });
      setSelectedTeamMember("");
      setPreferredDate("");
      setPreferredTime("");
      setTopic("");
      setShowRequestModal(false);
      fetchSessions();
    }

    setCreating(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-yellow-500/20", text: "text-yellow-500", label: "Pending Review" },
      confirmed: { bg: "bg-green-500/20", text: "text-green-500", label: "Confirmed" },
      completed: { bg: "bg-blue-500/20", text: "text-blue-500", label: "Completed" },
      cancelled: { bg: "bg-red-500/20", text: "text-red-500", label: "Cancelled" }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Your Coaching Sessions</h2>
        <Button variant="hero" onClick={() => setShowRequestModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Request Session
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      ) : sessions.length === 0 ? (
        <Card className="p-8 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No coaching sessions</h3>
          <p className="text-muted-foreground mb-4">
            Request a session with one of our team members to get personalized guidance.
          </p>
          <Button variant="hero" onClick={() => setShowRequestModal(true)}>
            Request Your First Session
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => {
            const teamMember = teamMembers.find(tm => tm.id === session.team_member);
            return (
              <Card key={session.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-foreground">
                        {teamMember?.name || session.team_member}
                      </span>
                      {getStatusBadge(session.status)}
                    </div>
                    {teamMember && (
                      <p className="text-sm text-muted-foreground mb-2">{teamMember.role}</p>
                    )}
                    <p className="text-foreground mb-3">{session.topic}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {session.preferred_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(session.preferred_date), 'MMM d, yyyy')}
                        </span>
                      )}
                      {session.preferred_time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.preferred_time}
                        </span>
                      )}
                      <span>
                        Requested {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    {session.notes && (
                      <div className="mt-3 p-3 bg-accent/10 rounded-lg">
                        <p className="text-sm font-medium text-accent mb-1">Team Response:</p>
                        <p className="text-sm text-foreground">{session.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Request Session Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request a Coaching Session</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Team Member</Label>
              <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date (optional)</Label>
                <Input
                  id="date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time (optional)</Label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">What would you like to discuss?</Label>
              <Textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe what you'd like help with..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowRequestModal(false)}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handleRequestSession} disabled={creating}>
              {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoachingSessionsTab;