import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useMission, useMySubmissions, useSubmitMission, useCheckAndAwardBadges, useAuth } from "@/hooks/useAcademy";

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

  if (isLoading || !mission) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container pt-32 text-center text-muted-foreground">Loading mission...</div>
      </div>
    );
  }

  const alreadyCompleted = submissions?.some(s => s.mission_id === mission.id && (s.status === "approved" || s.status === "pending"));
  const quiz = mission.quiz_data?.questions as Array<{ question: string; options: string[]; correct: number }> | undefined;

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
    setEngagementDone(true);
    try {
      await submitMission.mutateAsync({
        mission_id: mission.id,
        status: "approved",
        points_earned: mission.points_reward,
        hours_earned: mission.hours_reward,
      });
      toast.success(`🎉 Completed! +${mission.points_reward} pts, +${mission.hours_reward}h`);
      checkBadges.mutate();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const wordCount = textResponse.trim().split(/\s+/).filter(Boolean).length;

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

                {/* Engagement */}
                {mission.mission_type === "engagement" && (
                  <div className="text-center p-8 bg-card border border-border rounded-xl">
                    {!engagementDone ? (
                      <>
                        <p className="text-muted-foreground mb-6">Complete this action and confirm below</p>
                        <Button
                          onClick={handleEngagement}
                          disabled={submitMission.isPending}
                          className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold px-8"
                          size="lg"
                        >
                          {submitMission.isPending ? "Confirming..." : "I've Completed This ✓"}
                        </Button>
                      </>
                    ) : (
                      <div>
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <p className="font-bold text-foreground">Confirmed! Mission complete.</p>
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
