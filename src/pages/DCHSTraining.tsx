import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Target, Zap, ArrowUp, Timer, GraduationCap, Edit2, Save, X, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { benchmarks } from "@/data/dchsParticipants";

interface Participant {
  id: string;
  name: string;
  grade: number;
  position: string | null;
  vertical: number | null;
  forty_yard: number | null;
  hundred_meter: number | null;
  status: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-500/20", text: "text-green-400", label: "Active" },
  inactive: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Inactive" },
  "no-show": { bg: "bg-red-500/20", text: "text-red-400", label: "No Show" },
};

const positionOptions = [
  "QB", "RB", "WR", "TE", "OLine", "DLine", "LB", "CB", "S", "K", "P", "ATH"
];

const DCHSTraining = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Participant>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    grade: 10,
    position: "",
    status: "active",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchParticipants();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  const fetchParticipants = async () => {
    const { data, error } = await supabase
      .from("dchs_participants")
      .select("*")
      .order("grade", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching participants:", error);
    } else {
      setParticipants(data || []);
    }
    setLoading(false);
  };

  const startEditing = (participant: Participant) => {
    setEditingId(participant.id);
    setEditForm({
      position: participant.position || "",
      vertical: participant.vertical,
      forty_yard: participant.forty_yard,
      hundred_meter: participant.hundred_meter,
      status: participant.status,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdits = async (id: string) => {
    const { error } = await supabase
      .from("dchs_participants")
      .update({
        position: editForm.position || null,
        vertical: editForm.vertical || null,
        forty_yard: editForm.forty_yard || null,
        hundred_meter: editForm.hundred_meter || null,
        status: editForm.status,
      })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved",
        description: "Athlete stats updated successfully.",
      });
      fetchParticipants();
    }
    setEditingId(null);
    setEditForm({});
  };

  const addParticipant = async () => {
    if (!newParticipant.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("dchs_participants")
      .insert({
        name: newParticipant.name.trim(),
        grade: newParticipant.grade,
        position: newParticipant.position || null,
        status: newParticipant.status,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add participant. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Added",
        description: "New participant added successfully.",
      });
      setAddDialogOpen(false);
      setNewParticipant({ name: "", grade: 10, position: "", status: "active" });
      fetchParticipants();
    }
  };

  const deleteParticipant = async (id: string) => {
    const { error } = await supabase
      .from("dchs_participants")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete participant.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Participant removed.",
      });
      fetchParticipants();
    }
  };

  const activeCount = participants.filter((p) => p.status === "active").length;
  const grade10Count = participants.filter((p) => p.grade === 10).length;
  const grade11Count = participants.filter((p) => p.grade === 11).length;

  return (
    <>
      <SEO
        title="DCHS Strength & Speed Program | Brand of a Champion"
        description="Douglas County High School Strength and Speed Performance program with Scott Lashley. Track athlete progress and compare to college and pro benchmarks."
        canonical="https://brandofachampion.com/dchs-training"
        type="website"
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Link to="/coach/strength-coach">
                <Badge variant="outline" className="mb-4 hover:bg-accent/10 cursor-pointer">
                  ← Back to Coach Profile
                </Badge>
              </Link>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
                DOUGLAS COUNTY HIGH SCHOOL
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
                <span className="text-foreground">STRENGTH & SPEED</span>
                <br />
                <span className="text-gradient">PERFORMANCE PROGRAM</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Training the next generation of elite athletes with Coach Scott Lashley.
                Track progress and compare performance to college and professional benchmarks.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto"
            >
              <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
                <Users className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-foreground">{participants.length}</div>
                <div className="text-xs text-muted-foreground">Total Athletes</div>
              </div>
              <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
                <Target className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-foreground">{activeCount}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
              <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
                <GraduationCap className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-foreground">{grade10Count}</div>
                <div className="text-xs text-muted-foreground">10th Grade</div>
              </div>
              <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
                <GraduationCap className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-foreground">{grade11Count}</div>
                <div className="text-xs text-muted-foreground">11th Grade</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Participants Roster */}
        <section className="py-12 bg-secondary/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  Program <span className="text-accent">Participants</span>
                </h2>
                <p className="text-muted-foreground">
                  Current athletes enrolled in the Strength & Speed Performance program
                </p>
              </div>
              {isAuthenticated && (
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Athlete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Athlete</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Name</label>
                        <Input
                          value={newParticipant.name}
                          onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                          placeholder="Athlete name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Grade</label>
                          <Select
                            value={String(newParticipant.grade)}
                            onValueChange={(v) => setNewParticipant({ ...newParticipant, grade: Number(v) })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9">9th</SelectItem>
                              <SelectItem value="10">10th</SelectItem>
                              <SelectItem value="11">11th</SelectItem>
                              <SelectItem value="12">12th</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Position</label>
                          <Select
                            value={newParticipant.position}
                            onValueChange={(v) => setNewParticipant({ ...newParticipant, position: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {positionOptions.map((pos) => (
                                <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Status</label>
                        <Select
                          value={newParticipant.status}
                          onValueChange={(v) => setNewParticipant({ ...newParticipant, status: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="no-show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={addParticipant} className="w-full">
                        Add Athlete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-bold">Athlete</TableHead>
                      <TableHead className="font-bold">Grade</TableHead>
                      <TableHead className="font-bold">Position</TableHead>
                      <TableHead className="font-bold">Vertical</TableHead>
                      <TableHead className="font-bold">40-Yard</TableHead>
                      <TableHead className="font-bold">100m</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      {isAuthenticated && <TableHead className="font-bold w-24">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => {
                      const status = statusConfig[participant.status] || statusConfig.active;
                      const isEditing = editingId === participant.id;

                      return (
                        <TableRow key={participant.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-mono">
                              {participant.grade}th
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Select
                                value={editForm.position || "none"}
                                onValueChange={(v) => setEditForm({ ...editForm, position: v === "none" ? "" : v })}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="—" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">None</SelectItem>
                                  {positionOptions.map((pos) => (
                                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className="text-muted-foreground">{participant.position || "—"}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input
                                type="number"
                                step="0.5"
                                className="w-20"
                                value={editForm.vertical ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, vertical: e.target.value ? Number(e.target.value) : null })}
                                placeholder="—"
                              />
                            ) : (
                              <span className="font-mono text-muted-foreground">
                                {participant.vertical ? `${participant.vertical}"` : "—"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input
                                type="number"
                                step="0.01"
                                className="w-20"
                                value={editForm.forty_yard ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, forty_yard: e.target.value ? Number(e.target.value) : null })}
                                placeholder="—"
                              />
                            ) : (
                              <span className="font-mono text-muted-foreground">
                                {participant.forty_yard ? `${participant.forty_yard}s` : "—"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input
                                type="number"
                                step="0.01"
                                className="w-20"
                                value={editForm.hundred_meter ?? ""}
                                onChange={(e) => setEditForm({ ...editForm, hundred_meter: e.target.value ? Number(e.target.value) : null })}
                                placeholder="—"
                              />
                            ) : (
                              <span className="font-mono text-muted-foreground">
                                {participant.hundred_meter ? `${participant.hundred_meter}s` : "—"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Select
                                value={editForm.status || "active"}
                                onValueChange={(v) => setEditForm({ ...editForm, status: v })}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                  <SelectItem value="no-show">No Show</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                                {status.label}
                              </span>
                            )}
                          </TableCell>
                          {isAuthenticated && (
                            <TableCell>
                              {isEditing ? (
                                <div className="flex gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-green-500 hover:text-green-400"
                                    onClick={() => saveEdits(participant.id)}
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-muted-foreground"
                                    onClick={cancelEditing}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8"
                                    onClick={() => startEditing(participant)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-red-500 hover:text-red-400"
                                    onClick={() => deleteParticipant(participant.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </motion.div>

            {!isAuthenticated && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                <Link to="/auth" className="text-accent hover:underline">Sign in</Link> to edit athlete stats
              </p>
            )}
          </div>
        </section>

        {/* Vertical Jump Benchmarks */}
        <section className="py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <ArrowUp className="h-8 w-8 text-accent" />
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  {benchmarks.vertical.title} <span className="text-accent">Benchmarks</span>
                </h2>
              </div>
              <p className="text-muted-foreground">
                College and professional standards by position (in {benchmarks.vertical.unit})
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {benchmarks.vertical.positions.map((pos) => (
                <div
                  key={pos.position}
                  className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 transition-colors"
                >
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    {pos.position}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">College Range</span>
                      <span className="font-mono font-bold text-blue-400">
                        {pos.collegeMin}" - {pos.collegeMax}"
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pro Average</span>
                      <span className="font-mono font-bold text-accent">
                        {pos.proAvg}"+
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-accent"
                      style={{ width: `${(pos.proAvg / 40) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 40-Yard Dash Benchmarks */}
        <section className="py-12 bg-secondary/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-8 w-8 text-yellow-400" />
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  {benchmarks.fortyYard.title} <span className="text-accent">Benchmarks</span>
                </h2>
              </div>
              <p className="text-muted-foreground">
                College and professional standards (in {benchmarks.fortyYard.unit})
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {benchmarks.fortyYard.positions.map((pos, index) => {
                const colors = ["from-orange-500 to-red-500", "from-yellow-500 to-orange-500", "from-red-600 to-red-800"];
                return (
                  <div
                    key={pos.position}
                    className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors"
                  >
                    <h3 className="font-display font-semibold text-foreground mb-4 text-lg">
                      {pos.position}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">College Range</span>
                        <span className="font-mono font-bold text-yellow-400 text-lg">
                          {pos.collegeMin}s - {pos.collegeMax}s
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Pro Average</span>
                        <span className="font-mono font-bold text-accent text-lg">
                          {pos.proAvg}s
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors[index]}`}
                        style={{ width: `${((6 - pos.proAvg) / 2) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* 100m Dash Benchmarks */}
        <section className="py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <Timer className="h-8 w-8 text-blue-400" />
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  {benchmarks.hundredMeter.title} <span className="text-accent">Benchmarks</span>
                </h2>
              </div>
              <p className="text-muted-foreground">
                Speed tier classifications (in {benchmarks.hundredMeter.unit})
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {benchmarks.hundredMeter.tiers.map((tier, index) => {
                const colors = ["bg-green-500", "bg-yellow-500", "bg-orange-500"];
                const textColors = ["text-green-400", "text-yellow-400", "text-orange-400"];
                return (
                  <div
                    key={tier.tier}
                    className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${colors[index]}`} />
                    <h3 className={`font-display font-bold text-lg mb-2 ${textColors[index]}`}>
                      {tier.tier}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {tier.description}
                    </p>
                    <div className="flex items-center justify-center py-4">
                      <span className="font-mono font-black text-3xl text-foreground">
                        {tier.collegeMin}s - {tier.collegeMax}s
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-accent/10 via-background to-primary/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to <span className="text-accent">Train?</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Join Coach Scott Lashley's Strength and Speed Performance program
                at Douglas County High School.
              </p>
              <Link to="/coach/strength-coach">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  View Coach Profile
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DCHSTraining;
