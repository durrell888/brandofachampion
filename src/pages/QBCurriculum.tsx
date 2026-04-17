import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain, LayoutGrid, Zap, Target, Clock, BookOpen,
  ArrowLeft, CheckCircle, XCircle, Lock, Trophy,
  PlayCircle, ChevronRight, Award, Flame, Eye,
  Shuffle, GraduationCap, Timer, Shield, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import r4CapSystemImg from "@/assets/r4-cap-system.jpg";
import r4CappedFieldImg from "@/assets/r4-capped-field.jpeg";
import { qbCurriculum, r4Foundation, testYourKnowledgePlays, type CurriculumModule, type Lesson, type QuizQuestion } from "@/data/qbCurriculum";

const imageMap: Record<string, string> = {
  "/src/assets/field-capped.png": r4CappedFieldImg,
  "/src/assets/field-uncapped.png": r4CapSystemImg,
  "/src/assets/r4-cap-system.jpg": r4CapSystemImg,
  "/src/assets/r4-capped-field.jpeg": r4CappedFieldImg,
};

const ZoomableImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const resolvedSrc = imageMap[src] || src;

  return (
    <>
      <Card className="border-border overflow-hidden cursor-pointer group" onClick={() => setIsOpen(true)}>
        <div className="bg-muted relative overflow-hidden flex items-center justify-center max-h-[80vh]">
          <img
            src={resolvedSrc}
            alt={alt}
            loading="lazy"
            className="w-full h-auto max-h-[80vh] object-contain bg-[hsl(var(--muted))] transition-opacity duration-300 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-sm bg-black/60 px-3 py-1.5 rounded-full">
              Click to enlarge
            </span>
          </div>
        </div>
        {caption && (
          <CardContent className="pt-3 pb-4">
            <p className="text-sm font-medium text-foreground">{caption}</p>
          </CardContent>
        )}
      </Card>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={resolvedSrc}
              alt={alt}
              className="w-[95vw] h-[95vh] object-contain"
            />
            {caption && (
              <p className="absolute bottom-8 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">{caption}</p>
            )}
            <button className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const iconMap: Record<string, React.ElementType> = {
  Brain, LayoutGrid, Zap, Target, Clock, BookOpen, Eye,
};

// Local storage helpers
const getProgress = (): Record<string, boolean> => {
  try { return JSON.parse(localStorage.getItem("qb-curriculum-progress") || "{}"); } catch { return {}; }
};
const saveProgress = (p: Record<string, boolean>) => localStorage.setItem("qb-curriculum-progress", JSON.stringify(p));
const getTimeSpent = (): number => {
  try { return parseInt(localStorage.getItem("qb-curriculum-time") || "0", 10); } catch { return 0; }
};
const saveTimeSpent = (t: number) => localStorage.setItem("qb-curriculum-time", t.toString());
const getR4Complete = (): boolean => {
  try { return localStorage.getItem("qb-r4-foundation-complete") === "true"; } catch { return false; }
};
const saveR4Complete = (v: boolean) => localStorage.setItem("qb-r4-foundation-complete", v.toString());

export default function QBCurriculum() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>(getProgress());
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testIndex, setTestIndex] = useState(0);
  const [showTestAnswer, setShowTestAnswer] = useState(false);
  const [timeSpent, setTimeSpent] = useState(getTimeSpent());
  const [r4Complete, setR4Complete] = useState(getR4Complete());

  // Rhythm Foundation state
  const [r4Expanded, setR4Expanded] = useState(true);
  const [r4ActiveSection, setR4ActiveSection] = useState(0);
  const [r4QuizMode, setR4QuizMode] = useState(false);
  const [r4QuizIndex, setR4QuizIndex] = useState(0);
  const [r4QuizAnswer, setR4QuizAnswer] = useState<number | null>(null);
  const [r4QuizScore, setR4QuizScore] = useState(0);
  const [r4QuizComplete, setR4QuizComplete] = useState(false);

  // Track time
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => { const next = prev + 1; saveTimeSpent(next); return next; });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalLessons = qbCurriculum.reduce((a, m) => a + m.lessons.length, 0);
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const isModuleUnlocked = (moduleIndex: number) => {
    if (!r4Complete) return false; // Must complete Rhythm Foundation first
    if (moduleIndex === 0) return true;
    const prevModule = qbCurriculum[moduleIndex - 1];
    return prevModule.lessons.every(l => progress[l.id]);
  };

  const isModuleComplete = (mod: CurriculumModule) => mod.lessons.every(l => progress[l.id]);
  const getModuleProgress = (mod: CurriculumModule) => {
    const done = mod.lessons.filter(l => progress[l.id]).length;
    return Math.round((done / mod.lessons.length) * 100);
  };

  const markComplete = (lessonId: string) => {
    const updated = { ...progress, [lessonId]: true };
    setProgress(updated);
    saveProgress(updated);
  };

  const startQuiz = (lesson: Lesson) => {
    setQuizMode(true);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizComplete(false);
  };

  const handleAnswer = (index: number, quiz: QuizQuestion[]) => {
    setSelectedAnswer(index);
    const isCorrect = index === quiz[currentQuizIndex].correctIndex;
    if (isCorrect) setQuizScore(prev => prev + 1);
    setTimeout(() => {
      if (currentQuizIndex < quiz.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
        const passingScore = Math.ceil(quiz.length * 0.7);
        if (quizScore + (isCorrect ? 1 : 0) >= passingScore && activeLesson) {
          markComplete(activeLesson.id);
        }
      }
    }, 1500);
  };

  // Rhythm Foundation Quiz
  const handleR4Answer = (index: number) => {
    setR4QuizAnswer(index);
    const quiz = r4Foundation.quiz;
    const isCorrect = index === quiz[r4QuizIndex].correctIndex;
    if (isCorrect) setR4QuizScore(prev => prev + 1);
    setTimeout(() => {
      if (r4QuizIndex < quiz.length - 1) {
        setR4QuizIndex(prev => prev + 1);
        setR4QuizAnswer(null);
      } else {
        setR4QuizComplete(true);
        const passingScore = Math.ceil(quiz.length * 0.7);
        if (r4QuizScore + (isCorrect ? 1 : 0) >= passingScore) {
          setR4Complete(true);
          saveR4Complete(true);
        }
      }
    }, 1500);
  };

  const startTestMode = () => {
    setTestMode(true);
    setTestIndex(Math.floor(Math.random() * testYourKnowledgePlays.length));
    setShowTestAnswer(false);
  };

  const nextTestPlay = () => {
    setTestIndex(Math.floor(Math.random() * testYourKnowledgePlays.length));
    setShowTestAnswer(false);
  };

  const getBadges = () => {
    const badges: { name: string; icon: string; earned: boolean }[] = [];
    if (r4Complete) badges.push({ name: "Rhythm Foundation Certified", icon: "🧠", earned: true });
    qbCurriculum.forEach(mod => {
      badges.push({ name: `${mod.title} Complete`, icon: "🏆", earned: isModuleComplete(mod) });
    });
    if (overallProgress === 100) badges.push({ name: "Playbook Master", icon: "👑", earned: true });
    if (timeSpent >= 60) badges.push({ name: "Film Room Warrior (1hr+)", icon: "🎬", earned: true });
    return badges;
  };

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  // ---- LESSON VIEW ----
  if (activeLesson) {
    const currentQuiz = activeLesson.quiz;
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <SEO title={`${activeLesson.title} | QB Curriculum`} description={activeLesson.purpose} />
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
          <Button variant="ghost" onClick={() => { setActiveLesson(null); setQuizMode(false); setQuizComplete(false); }} className="mb-6 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{activeLesson.title}</h1>
              <p className="text-lg text-muted-foreground">{activeLesson.purpose}</p>
              {activeLesson.formation && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">Formation: {activeLesson.formation}</Badge>
                  {activeLesson.downAndDistance && <Badge variant="outline">D&D: {activeLesson.downAndDistance}</Badge>}
                </div>
              )}
            </div>

            {/* Video */}
            <Card className="mb-8 overflow-hidden border-border">
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                {activeLesson.hudlUrl ? (
                  <iframe src={activeLesson.hudlUrl} className="w-full h-full" title={activeLesson.title} allowFullScreen />
                ) : (
                  <div className="text-center space-y-3">
                    <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground font-medium">Hudl Install Clip</p>
                    <p className="text-sm text-muted-foreground">Video will be added by coaching staff</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Concept Breakdown */}
            {activeLesson.conceptBreakdown && activeLesson.conceptBreakdown.length > 0 && (
              <Card className="mb-8 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Brain className="h-5 w-5 text-accent" /> Concept Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeLesson.conceptBreakdown.map((point, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">{point}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Images */}
            {activeLesson.images && activeLesson.images.length > 0 && (
              <div className={`grid gap-6 mb-8 ${activeLesson.images.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {activeLesson.images.map((img, i) => (
                  <ZoomableImage key={i} src={img.src} alt={img.alt} caption={img.caption} />
                ))}
              </div>
            )}

            {/* Assignments */}
            <Card className="mb-6 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Eye className="h-5 w-5 text-accent" /> Position Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeLesson.assignments.map((a, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <Badge className="bg-accent text-accent-foreground shrink-0 mt-0.5">{a.position}</Badge>
                      <span className="text-muted-foreground">{a.assignment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Coaching Points / Mistakes */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 text-base">
                    <CheckCircle className="h-5 w-5" /> Coaching Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activeLesson.coachingPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />{p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive text-base">
                    <XCircle className="h-5 w-5" /> Common Mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activeLesson.commonMistakes.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />{m}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Execution Keys */}
            <Card className="mb-8 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Target className="h-5 w-5 text-accent" /> Execution Keys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(activeLesson.executionKeys).map(([key, val]) => (
                    <div key={key} className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs uppercase font-bold text-accent mb-1">{key}</p>
                      <p className="text-sm text-muted-foreground">{val}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quiz */}
            {!quizMode && !quizComplete && (
              <div className="text-center">
                <Button variant="hero" size="lg" onClick={() => startQuiz(activeLesson)}>
                  <GraduationCap className="mr-2 h-5 w-5" /> Take the Quiz ({currentQuiz.length} Questions)
                </Button>
              </div>
            )}

            {quizMode && !quizComplete && (
              <Card className="border-2 border-accent/30">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-foreground">Question {currentQuizIndex + 1} of {currentQuiz.length}</CardTitle>
                    <Badge variant="outline">Score: {quizScore}/{currentQuizIndex + (selectedAnswer !== null ? 1 : 0)}</Badge>
                  </div>
                  <Progress value={((currentQuizIndex + 1) / currentQuiz.length) * 100} className="h-2 mt-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-foreground mb-6">{currentQuiz[currentQuizIndex].question}</p>
                  <div className="space-y-3">
                    {currentQuiz[currentQuizIndex].options.map((opt, i) => {
                      const isSelected = selectedAnswer === i;
                      const isCorrect = i === currentQuiz[currentQuizIndex].correctIndex;
                      let borderClass = "border-border hover:border-accent/50";
                      if (selectedAnswer !== null) {
                        if (isCorrect) borderClass = "border-green-500 bg-green-500/10";
                        else if (isSelected) borderClass = "border-destructive bg-destructive/10";
                      }
                      return (
                        <button key={i} disabled={selectedAnswer !== null} onClick={() => handleAnswer(i, currentQuiz)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${borderClass} ${selectedAnswer === null ? "cursor-pointer" : "cursor-default"}`}>
                          <span className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-foreground">{opt}</span>
                            {selectedAnswer !== null && isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                            {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive ml-auto" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {quizComplete && (
              <Card className="border-2 border-accent/30 text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-6">
                    {quizScore >= Math.ceil(currentQuiz.length * 0.7) ? (
                      <>
                        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-foreground mb-2">🎉 Lesson Complete!</h3>
                        <p className="text-muted-foreground">You scored {quizScore}/{currentQuiz.length} — Great work, Champion!</p>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-foreground mb-2">Keep Studying</h3>
                        <p className="text-muted-foreground">You scored {quizScore}/{currentQuiz.length} — Need {Math.ceil(currentQuiz.length * 0.7)} to pass.</p>
                      </>
                    )}
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => { setQuizMode(false); setQuizComplete(false); }}>Review Lesson</Button>
                    <Button variant="hero" onClick={() => startQuiz(activeLesson)}>Retry Quiz</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-12 text-center">
              <p className="text-xs text-muted-foreground">Powered by <span className="font-bold text-accent">Brand of a Champion</span></p>
              <p className="text-xs text-muted-foreground italic mt-1">"Discipline. IQ. Execution."</p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // ---- TEST YOUR KNOWLEDGE MODE ----
  if (testMode) {
    const play = testYourKnowledgePlays[testIndex];
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <SEO title="Test Your Knowledge | QB Curriculum" description="Random Rhythm application quiz" />
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
          <Button variant="ghost" onClick={() => setTestMode(false)} className="mb-6 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Curriculum
          </Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={testIndex}>
            <Card className="border-2 border-accent/30">
              <CardHeader className="text-center">
                <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4 mx-auto">
                  <Shuffle className="h-5 w-5 text-accent" />
                  <span className="text-accent font-semibold">Test Your Rhythm Knowledge</span>
                </div>
                <Badge variant="secondary" className="text-base py-2 px-4 mx-auto">{play.formation}</Badge>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-xl font-semibold text-foreground">{play.question}</p>
                <AnimatePresence mode="wait">
                  {showTestAnswer ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                      <p className="text-foreground font-medium">{play.answer}</p>
                    </motion.div>
                  ) : (
                    <Button variant="hero" size="lg" onClick={() => setShowTestAnswer(true)}>Reveal Answer</Button>
                  )}
                </AnimatePresence>
                {showTestAnswer && (
                  <Button variant="outline" size="lg" onClick={nextTestPlay} className="mt-4">
                    <Shuffle className="mr-2 h-4 w-4" /> Next Play
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">Powered by <span className="font-bold text-accent">Brand of a Champion</span></p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ---- MODULE VIEW ----
  if (activeModule) {
    const mod = qbCurriculum.find(m => m.id === activeModule)!;
    const modIndex = qbCurriculum.findIndex(m => m.id === activeModule);
    const unlocked = isModuleUnlocked(modIndex);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <SEO title={`${mod.title} | QB Curriculum`} description={mod.description} />
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
          <Button variant="ghost" onClick={() => setActiveModule(null)} className="mb-6 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modules
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                {(() => { const Icon = iconMap[mod.icon] || BookOpen; return <Icon className="h-6 w-6 text-accent" />; })()}
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Module {mod.number}</Badge>
                <h1 className="text-3xl font-display font-bold text-foreground">{mod.title}</h1>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 ml-16">{mod.description}</p>
            <div className="ml-16 mb-8">
              <div className="flex items-center gap-3">
                <Progress value={getModuleProgress(mod)} className="h-2 flex-1" />
                <span className="text-sm font-medium text-muted-foreground">{getModuleProgress(mod)}%</span>
              </div>
            </div>

            {!unlocked ? (
              <Card className="border-border text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Module Locked</h3>
                <p className="text-muted-foreground">
                  {!r4Complete ? "Complete the Rhythm Foundation first to unlock modules." : `Complete Module ${mod.number - 1} to unlock this module.`}
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {mod.lessons.map((lesson, i) => (
                  <motion.div key={lesson.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card
                      className={`border-border cursor-pointer transition-all hover:border-accent/50 hover:shadow-md ${progress[lesson.id] ? "bg-green-500/5 border-green-500/30" : ""}`}
                      onClick={() => setActiveLesson(lesson)}
                    >
                      <CardContent className="flex items-center gap-4 py-5">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${progress[lesson.id] ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>
                          {progress[lesson.id] ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold">{i + 1}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{lesson.purpose}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="hidden sm:flex">{lesson.quiz.length} Questions</Badge>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {isModuleComplete(mod) && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-bold text-green-600">Module Complete! 🎉</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // ---- MAIN DASHBOARD ----
  const badges = getBadges();
  const earnedBadges = badges.filter(b => b.earned);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO
        title="QB Offensive Curriculum | Brand of a Champion"
        description="Elite quarterback curriculum built on the Rhythm Read Rush Release. Master capped and uncapped reads, progressions, and the full offensive system."
        canonical="https://brandofachampion.com/qb-curriculum"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <Button variant="ghost" onClick={() => navigate("/training")} className="mb-6 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training
          </Button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              🏈 QUARTERBACK CURRICULUM
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
              <span className="text-foreground">MASTER THE</span><br />
              <span className="text-gradient">OFFENSIVE SYSTEM</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Built on the Rhythm Read Rush Release — the foundation of elite quarterback play. 
              Rhythm. Read. Rush. Release. This is how you prepare for college and the NFL.
            </p>

            {/* Progress Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <Card className="bg-card/80 border-border">
                <CardContent className="pt-4 pb-4 text-center">
                  <Shield className="h-6 w-6 text-accent mx-auto mb-1" />
                  <p className="text-2xl font-bold text-foreground">{r4Complete ? "✅" : "🔓"}</p>
                  <p className="text-xs text-muted-foreground">Rhythm Foundation</p>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-border">
                <CardContent className="pt-4 pb-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-foreground">{completedLessons}/{totalLessons}</p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-border">
                <CardContent className="pt-4 pb-4 text-center">
                  <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-foreground">{earnedBadges.length}</p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </CardContent>
              </Card>
              <Card className="bg-card/80 border-border">
                <CardContent className="pt-4 pb-4 text-center">
                  <Timer className="h-6 w-6 text-accent mx-auto mb-1" />
                  <p className="text-2xl font-bold text-foreground">{formatTime(timeSpent)}</p>
                  <p className="text-xs text-muted-foreground">Time Spent</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== Rhythm FOUNDATION SECTION ========== */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="container max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {/* Rhythm Header */}
            <div
              className={`rounded-2xl border-2 overflow-hidden transition-all ${r4Complete ? "border-green-500/50 bg-green-500/5" : "border-accent/50 bg-accent/5"}`}
            >
              <button
                onClick={() => setR4Expanded(!r4Expanded)}
                className="w-full flex items-center gap-4 p-6 md:p-8 text-left"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${r4Complete ? "bg-green-500 text-white" : "bg-accent text-accent-foreground"}`}>
                  {r4Complete ? <CheckCircle className="h-8 w-8" /> : <Eye className="h-8 w-8" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={r4Complete ? "bg-green-500 text-white" : "bg-accent text-accent-foreground"}>
                      {r4Complete ? "CERTIFIED ✅" : "START HERE"}
                    </Badge>
                    <Badge variant="outline">FOUNDATION</Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-foreground">{r4Foundation.title}</h2>
                  <p className="text-accent font-semibold text-lg">{r4Foundation.subtitle}</p>
                  <p className="text-sm text-muted-foreground mt-1">{r4Foundation.tagline}</p>
                </div>
                <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform shrink-0 ${r4Expanded ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {r4Expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 space-y-8">
                      {/* Overview */}
                      <div className="space-y-4">
                        {r4Foundation.overview.map((text, i) => (
                          <p key={i} className="text-muted-foreground leading-relaxed">{text}</p>
                        ))}
                      </div>

                      {/* Sections as Tabs */}
                      <Tabs value={r4ActiveSection.toString()} onValueChange={(v) => setR4ActiveSection(parseInt(v))}>
                        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto">
                          {r4Foundation.sections.map((sec, i) => (
                            <TabsTrigger key={i} value={i.toString()} className="text-xs md:text-sm py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                              {sec.title.replace("What Is a ", "").replace("What Is an ", "").replace("Rhythm vs Every ", "vs ").replace("The Four Steps: ", "")}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {r4Foundation.sections.map((sec, i) => (
                          <TabsContent key={i} value={i.toString()} className="mt-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">{sec.title}</h3>
                            <div className="space-y-4 mb-6">
                              {sec.content.map((text, j) => (
                                <p key={j} className="text-muted-foreground leading-relaxed">{text}</p>
                              ))}
                            </div>
                            {/* Images */}
                            {sec.images && sec.images.length > 0 && (
                              <div className={`grid gap-6 ${sec.images.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
                                {sec.images.map((img, k) => (
                                  <ZoomableImage key={k} src={img.src} alt={img.alt} caption={img.caption} />
                                ))}
                              </div>
                            )}
                          </TabsContent>
                        ))}
                      </Tabs>

                      {/* Rhythm Foundation Quiz */}
                      {!r4Complete && !r4QuizMode && !r4QuizComplete && (
                        <div className="text-center pt-4 border-t border-border">
                          <p className="text-muted-foreground mb-4">Read all 4 sections above, then prove your understanding to unlock the curriculum modules.</p>
                          <Button variant="hero" size="lg" onClick={() => { setR4QuizMode(true); setR4QuizIndex(0); setR4QuizAnswer(null); setR4QuizScore(0); setR4QuizComplete(false); }}>
                            <GraduationCap className="mr-2 h-5 w-5" /> Take the Rhythm Foundation Quiz ({r4Foundation.quiz.length} Questions)
                          </Button>
                        </div>
                      )}

                      {r4QuizMode && !r4QuizComplete && (
                        <Card className="border-2 border-accent/30">
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-foreground">Rhythm Foundation — Question {r4QuizIndex + 1} of {r4Foundation.quiz.length}</CardTitle>
                              <Badge variant="outline">Score: {r4QuizScore}/{r4QuizIndex + (r4QuizAnswer !== null ? 1 : 0)}</Badge>
                            </div>
                            <Progress value={((r4QuizIndex + 1) / r4Foundation.quiz.length) * 100} className="h-2 mt-2" />
                          </CardHeader>
                          <CardContent>
                            <p className="text-lg font-semibold text-foreground mb-6">{r4Foundation.quiz[r4QuizIndex].question}</p>
                            <div className="space-y-3">
                              {r4Foundation.quiz[r4QuizIndex].options.map((opt, i) => {
                                const isSelected = r4QuizAnswer === i;
                                const isCorrect = i === r4Foundation.quiz[r4QuizIndex].correctIndex;
                                let borderClass = "border-border hover:border-accent/50";
                                if (r4QuizAnswer !== null) {
                                  if (isCorrect) borderClass = "border-green-500 bg-green-500/10";
                                  else if (isSelected) borderClass = "border-destructive bg-destructive/10";
                                }
                                return (
                                  <button key={i} disabled={r4QuizAnswer !== null} onClick={() => handleR4Answer(i)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${borderClass} ${r4QuizAnswer === null ? "cursor-pointer" : "cursor-default"}`}>
                                    <span className="flex items-center gap-3">
                                      <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0">
                                        {String.fromCharCode(65 + i)}
                                      </span>
                                      <span className="text-foreground">{opt}</span>
                                      {r4QuizAnswer !== null && isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                                      {r4QuizAnswer !== null && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive ml-auto" />}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {r4QuizComplete && (
                        <Card className="border-2 border-accent/30 text-center">
                          <CardContent className="pt-8 pb-8">
                            {r4Complete ? (
                              <>
                                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-foreground mb-2">🧠 Rhythm Foundation Certified!</h3>
                                <p className="text-muted-foreground">You scored {r4QuizScore}/{r4Foundation.quiz.length} — You've unlocked the curriculum modules. Time to dominate.</p>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-foreground mb-2">Review the Rhythm Foundation</h3>
                                <p className="text-muted-foreground mb-4">You scored {r4QuizScore}/{r4Foundation.quiz.length} — Need {Math.ceil(r4Foundation.quiz.length * 0.7)} to pass. Re-read the sections and try again.</p>
                                <Button variant="hero" onClick={() => { setR4QuizMode(false); setR4QuizComplete(false); }}>Study Again</Button>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      )}

                      {r4Complete && !r4QuizMode && (
                        <div className="text-center pt-4 border-t border-border">
                          <div className="inline-flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-bold text-green-600">Rhythm Foundation Complete — Modules Unlocked 🔓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">
                Curriculum <span className="text-accent">Modules</span>
              </h2>
              {!r4Complete && (
                <p className="text-sm text-muted-foreground mt-1">Complete the Rhythm Foundation above to unlock modules</p>
              )}
            </div>
            <Button variant="outline" onClick={startTestMode} className="gap-2" disabled={!r4Complete}>
              <Shuffle className="h-4 w-4" /> Test Your Knowledge
            </Button>
          </div>

          <div className="space-y-4">
            {qbCurriculum.map((mod, index) => {
              const unlocked = isModuleUnlocked(index);
              const complete = isModuleComplete(mod);
              const modProgress = getModuleProgress(mod);
              const Icon = iconMap[mod.icon] || BookOpen;

              return (
                <motion.div key={mod.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card
                    className={`border-border transition-all ${unlocked ? "cursor-pointer hover:border-accent/50 hover:shadow-lg" : "opacity-60"} ${complete ? "bg-green-500/5 border-green-500/30" : ""}`}
                    onClick={() => unlocked && setActiveModule(mod.id)}
                  >
                    <CardContent className="flex items-center gap-4 py-5 md:py-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${complete ? "bg-green-500 text-white" : unlocked ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                        {!unlocked ? <Lock className="h-6 w-6" /> : complete ? <CheckCircle className="h-7 w-7" /> : <Icon className="h-7 w-7" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">Module {mod.number}</Badge>
                          {complete && <Badge className="bg-green-500 text-white text-xs">Complete</Badge>}
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{mod.title}</h3>
                        <p className="text-sm text-muted-foreground hidden sm:block">{mod.description}</p>
                        {unlocked && (
                          <div className="flex items-center gap-2 mt-2">
                            <Progress value={modProgress} className="h-1.5 flex-1 max-w-[200px]" />
                            <span className="text-xs text-muted-foreground">{modProgress}%</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="hidden md:flex">{mod.lessons.length} Lessons</Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
            Your <span className="text-accent">Badges</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, i) => (
              <Card key={i} className={`border-border text-center ${badge.earned ? "bg-yellow-500/5 border-yellow-500/30" : "opacity-50"}`}>
                <CardContent className="pt-6 pb-6">
                  <span className="text-3xl mb-2 block">{badge.icon}</span>
                  <p className="text-sm font-semibold text-foreground">{badge.name}</p>
                  {badge.earned ? (
                    <Badge className="bg-green-500 text-white text-xs mt-2">Earned</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs mt-2">Locked</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Branding */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Flame className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Champions Are Made in the <span className="text-accent">Film Room</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              The best quarterbacks don't just have talent — they have preparation. 
              The Rhythm Read Rush Release is your edge. Master it, and you'll play faster, smarter, and more confident than anyone on the field.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by <span className="font-bold text-accent">Brand of a Champion</span> · Discipline · IQ · Execution
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
