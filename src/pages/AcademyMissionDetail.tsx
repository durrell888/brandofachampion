import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Clock, CheckCircle2, AlertCircle, Upload, Camera, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useMission, useMySubmissions, useSubmitMission, useCheckAndAwardBadges, useAuth } from "@/hooks/useAcademy";
import { supabase } from "@/integrations/supabase/client";

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|\/)([\w-]{11})/);
  return match ? match[1] : null;
}

export default function AcademyMissionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: mission, isLoading } = useMission(id || "");
  const { data: submissions } = useMySubmissions();
  const submitMission = useSubmitMission();
  const checkBadges = useCheckAndAwardBadges();

  const [textResponse, setTextResponse] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [engagementDone, setEngagementDone] = useState(false);

  // Media upload state for engagement missions
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [engagementText, setEngagementText] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoading || !mission) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container pt-32 text-center text-muted-foreground">Loading mission...</div>
      </div>
    );
  }

  const alreadyCompleted = submissions?.some(s => s.mission_id === mission.id && (s.status === "approved" || s.status === "pending"));
  const quiz = mission.quiz_data?.questions as Array<{ question: string; options: string[]; correct: number }> | undefined;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/quicktime", "video/webm"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload an image (JPG, PNG, WebP) or video (MP4, WebM)");
      return;
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 50MB.");
      return;
    }

    setMediaFile(file);
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
  };

  const uploadMedia = async (): Promise<string | null> => {
    if (!mediaFile || !user) return null;
    const ext = mediaFile.name.split(".").pop();
    const filePath = `${user.id}/${mission.id}-${Date.now()}.${ext}`;
    
    const { error } = await supabase.storage
      .from("academy-media")
      .upload(filePath, mediaFile);
    
    if (error) throw new Error("Failed to upload file: " + error.message);
    
    const { data: { publicUrl } } = supabase.storage
      .from("academy-media")
      .getPublicUrl(filePath);
    
    return publicUrl;
  };

  const handleQuizSubmit = async () => {
    if (!quiz) return;
    const correct = quiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    const score = Math.round((correct / quiz.length) * 100);
    setQuizSubmitted(true);

    const passing = score >= (mission.passing_score || 70);
    try {
      await submitMission.mutateAsync({
        mission_id: mission.id,
        status: passing ? "approved" : "rejected",
        score,
        points_earned: passing ? mission.points_reward : 0,
        hours_earned: passing ? mission.hours_reward : 0,
      });
      if (passing) {
        toast.success(`🎉 Passed with ${score}%! +${mission.points_reward} pts, +${mission.hours_reward}h`);
        checkBadges.mutate();
      } else {
        toast.error(`Score: ${score}%. Need ${mission.passing_score}% to pass. Try again!`);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleTextSubmit = async () => {
    const wordCount = textResponse.trim().split(/\s+/).length;
    if (wordCount < (mission.min_word_count || 150)) {
      toast.error(`Minimum ${mission.min_word_count || 150} words required. You have ${wordCount}.`);
      return;
    }
    try {
      const status = mission.requires_admin_review ? "pending" : "approved";
      await submitMission.mutateAsync({
        mission_id: mission.id,
        status,
        response_text: textResponse,
        points_earned: status === "approved" ? mission.points_reward : 0,
        hours_earned: status === "approved" ? mission.hours_reward : 0,
      });
      if (status === "approved") {
        toast.success(`🎉 Completed! +${mission.points_reward} pts, +${mission.hours_reward}h`);
        checkBadges.mutate();
      } else {
        toast.success("Submitted for review! You'll earn points once approved.");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEngagement = async () => {
    // Require both media and description
    if (!mediaFile) {
      toast.error("Please upload a photo or video as proof of completion.");
      return;
    }
    if (engagementText.trim().length < 20) {
      toast.error("Please describe how you completed this task (at least 20 characters).");
      return;
    }

    setUploading(true);
    try {
      const mediaUrl = await uploadMedia();
      
      await submitMission.mutateAsync({
        mission_id: mission.id,
        status: "pending",
        response_text: engagementText,
        media_url: mediaUrl || undefined,
        points_earned: 0,
        hours_earned: 0,
      });
      setEngagementDone(true);
      toast.success("📸 Proof submitted for review! You'll earn points once approved.");
      checkBadges.mutate();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const wordCount = textResponse.trim().split(/\s+/).filter(Boolean).length;
  const isVideo = mediaFile?.type.startsWith("video/");

  return (
    <>
      <SEO title={`${mission.title} | Champion Academy`} description={mission.description} />
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-28 pb-20 max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/academy/missions")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Missions
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{
                { Mindset: "🧠", Education: "📚", "Community Impact": "🤝", Promotion: "📢", "Skill Challenge": "⚡" }[mission.category]
              }</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">{mission.category}</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-3">{mission.title}</h1>
            <p className="text-muted-foreground mb-6">{mission.description}</p>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                <Zap className="h-5 w-5" /> {mission.points_reward} points
              </div>
              <div className="flex items-center gap-1 text-blue-500 font-semibold">
                <Clock className="h-5 w-5" /> {mission.hours_reward} hours
              </div>
            </div>

            {alreadyCompleted ? (
              <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-foreground mb-2">Mission Complete!</h3>
                <p className="text-muted-foreground">You've already completed this mission.</p>
                <Button onClick={() => navigate("/academy/missions")} className="mt-4" variant="outline">Browse More Missions</Button>
              </div>
            ) : !user ? (
              <div className="p-8 bg-muted/30 rounded-xl text-center">
                <p className="text-muted-foreground mb-4">Sign in to complete this mission</p>
                <Button onClick={() => navigate("/auth")}>Sign In</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Video Player */}
                {mission.content_url && (mission.mission_type === "video_quiz" || mission.mission_type === "interactive") && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 1: Watch the Video</h3>
                    <div className="aspect-video rounded-xl overflow-hidden bg-black">
                      {getYouTubeId(mission.content_url) ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeId(mission.content_url)}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video src={mission.content_url} controls className="w-full h-full" />
                      )}
                    </div>
                    {!videoWatched && (
                      <Button onClick={() => setVideoWatched(true)} className="bg-yellow-500 text-black hover:bg-yellow-400">
                        I've Watched the Video ✓
                      </Button>
                    )}
                  </div>
                )}

                {/* Quiz */}
                {quiz && (mission.mission_type === "video_quiz" || mission.mission_type === "interactive") && (
                  <div className={`space-y-6 ${mission.content_url && !videoWatched ? "opacity-40 pointer-events-none" : ""}`}>
                    <h3 className="text-lg font-bold">{mission.content_url ? "Step 2: Complete the Quiz" : "Complete the Challenge"}</h3>
                    {quiz.map((q, qi) => (
                      <div key={qi} className="p-5 bg-card border border-border rounded-xl">
                        <p className="font-semibold text-foreground mb-3">{qi + 1}. {q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, oi) => (
                            <button
                              key={oi}
                              onClick={() => {
                                if (quizSubmitted) return;
                                const newAnswers = [...quizAnswers];
                                newAnswers[qi] = oi;
                                setQuizAnswers(newAnswers);
                              }}
                              className={`w-full text-left p-3 rounded-lg border transition-all ${
                                quizAnswers[qi] === oi
                                  ? quizSubmitted
                                    ? oi === q.correct ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
                                    : "border-yellow-500 bg-yellow-500/10"
                                  : quizSubmitted && oi === q.correct
                                    ? "border-green-500 bg-green-500/10"
                                    : "border-border hover:border-yellow-500/30"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {!quizSubmitted && (
                      <Button
                        onClick={handleQuizSubmit}
                        disabled={quizAnswers.filter(a => a !== undefined).length < quiz.length || submitMission.isPending}
                        className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                        size="lg"
                      >
                        Submit Answers
                      </Button>
                    )}
                  </div>
                )}

                {/* Text Submission */}
                {mission.mission_type === "text_submission" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Write Your Response</h3>
                    <Textarea
                      value={textResponse}
                      onChange={(e) => setTextResponse(e.target.value)}
                      placeholder="Write your response here..."
                      className="min-h-[200px]"
                    />
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${wordCount >= (mission.min_word_count || 150) ? "text-green-500" : "text-muted-foreground"}`}>
                        {wordCount} / {mission.min_word_count || 150} words {wordCount >= (mission.min_word_count || 150) && "✓"}
                      </span>
                      {mission.requires_admin_review && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Requires admin review
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={handleTextSubmit}
                      disabled={wordCount < (mission.min_word_count || 150) || submitMission.isPending}
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                      size="lg"
                    >
                      {submitMission.isPending ? "Submitting..." : "Submit Response"}
                    </Button>
                  </div>
                )}

                {/* Engagement - Now requires photo/video proof */}
                {mission.mission_type === "engagement" && (
                  <div className="space-y-6">
                    {!engagementDone ? (
                      <>
                        <div className="p-6 bg-card border border-border rounded-xl space-y-5">
                          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <Camera className="h-5 w-5 text-yellow-500" />
                            Upload Proof of Completion
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Take a photo or record a short video of yourself completing this task, then describe what you did.
                          </p>

                          {/* File Upload Area */}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          
                          {!mediaPreview ? (
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full border-2 border-dashed border-border rounded-xl p-8 hover:border-yellow-500/50 transition-colors flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground"
                            >
                              <div className="flex gap-3">
                                <div className="p-3 rounded-full bg-yellow-500/10">
                                  <Image className="h-6 w-6 text-yellow-500" />
                                </div>
                                <div className="p-3 rounded-full bg-blue-500/10">
                                  <Upload className="h-6 w-6 text-blue-500" />
                                </div>
                              </div>
                              <span className="font-medium">Tap to upload a photo or video</span>
                              <span className="text-xs">JPG, PNG, MP4, WebM • Max 50MB</span>
                            </button>
                          ) : (
                            <div className="relative rounded-xl overflow-hidden border border-border">
                              {isVideo ? (
                                <video src={mediaPreview} controls className="w-full max-h-64 object-contain bg-black" />
                              ) : (
                                <img src={mediaPreview} alt="Proof" className="w-full max-h-64 object-contain bg-black" />
                              )}
                              <button
                                onClick={() => { setMediaFile(null); setMediaPreview(null); }}
                                className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm hover:bg-black"
                              >
                                Change
                              </button>
                            </div>
                          )}

                          {/* Description */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              Describe how you completed this task
                            </label>
                            <Textarea
                              value={engagementText}
                              onChange={(e) => setEngagementText(e.target.value)}
                              placeholder="Tell us what you did and what you learned..."
                              className="min-h-[100px]"
                            />
                            <span className={`text-xs ${engagementText.trim().length >= 20 ? "text-green-500" : "text-muted-foreground"}`}>
                              {engagementText.trim().length} / 20 characters minimum
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <AlertCircle className="h-3 w-3" />
                          Submissions are reviewed by our team before hours are awarded
                        </div>

                        <Button
                          onClick={handleEngagement}
                          disabled={uploading || submitMission.isPending || !mediaFile || engagementText.trim().length < 20}
                          className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                          size="lg"
                        >
                          {uploading ? "Uploading proof..." : submitMission.isPending ? "Submitting..." : "Submit Proof of Completion"}
                        </Button>
                      </>
                    ) : (
                      <div className="p-8 bg-card border border-border rounded-xl text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <p className="font-bold text-foreground">Proof submitted for review!</p>
                        <p className="text-sm text-muted-foreground mt-1">You'll earn your hours once approved.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
