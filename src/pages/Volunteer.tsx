import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Heart, Clock, Award, Users, CheckCircle, Star,
  Share2, Mail, MessageSquare, Trophy, Target,
  Laptop, Megaphone, FileText, Palette, BarChart3,
  ChevronDown, ChevronUp, Send, GraduationCap, Zap
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const volunteerTasks = [
  { id: 1, title: "Social Media Content Creation", description: "Create engaging posts for Instagram, Twitter, and Facebook to promote our programs.", time: "2-3 hrs/week", icon: Megaphone, category: "Marketing" },
  { id: 2, title: "Athlete Profile Writing", description: "Write compelling bios and stories about our athletes' journeys to college.", time: "1-2 hrs/task", icon: FileText, category: "Content" },
  { id: 3, title: "Graphic Design Support", description: "Design flyers, social media graphics, and promotional materials.", time: "3-4 hrs/week", icon: Palette, category: "Design" },
  { id: 4, title: "Data Entry & Research", description: "Help maintain our database of college programs, scholarships, and recruiting contacts.", time: "2-3 hrs/week", icon: BarChart3, category: "Research" },
  { id: 5, title: "Email Newsletter Drafting", description: "Draft weekly newsletters highlighting athlete achievements and program updates.", time: "1-2 hrs/week", icon: Mail, category: "Marketing" },
  { id: 6, title: "Virtual Mentoring", description: "Provide guidance and mentorship to young athletes navigating the recruiting process.", time: "1 hr/week", icon: GraduationCap, category: "Mentoring" },
  { id: 7, title: "Video Editing Assistance", description: "Help edit highlight reels and promotional videos for athletes.", time: "3-5 hrs/task", icon: Laptop, category: "Media" },
  { id: 8, title: "Community Forum Moderation", description: "Monitor and moderate community discussions to maintain a positive environment.", time: "1-2 hrs/week", icon: MessageSquare, category: "Community" },
];

const ranks = [
  { name: "Rookie", hours: "0–10", color: "from-zinc-500 to-zinc-600" },
  { name: "Prospect", hours: "10–25", color: "from-blue-500 to-blue-600" },
  { name: "Elite", hours: "25–50", color: "from-purple-500 to-purple-600" },
  { name: "Champion", hours: "50+", color: "from-yellow-500 to-amber-500" },
];

const missionCategories = [
  { name: "Mindset Missions", icon: "🧠", desc: "Build mental toughness and champion habits" },
  { name: "Education Missions", icon: "📚", desc: "Academic excellence and eligibility knowledge" },
  { name: "Community Impact", icon: "🤝", desc: "Give back and mentor others" },
  { name: "Promotion Missions", icon: "📢", desc: "Spread the word and grow the community" },
  { name: "Skill Challenges", icon: "⚡", desc: "Test your leadership and game knowledge" },
];

const badgeTiers = [
  { name: "First Step", description: "Complete your first task", icon: Star, hours: 1, color: "bg-yellow-500" },
  { name: "Rising Champion", description: "Log 10 volunteer hours", icon: Trophy, hours: 10, color: "bg-amber-500" },
  { name: "Community Builder", description: "Log 25 volunteer hours", icon: Users, hours: 25, color: "bg-blue-500" },
  { name: "Impact Maker", description: "Log 50 volunteer hours", icon: Heart, hours: 50, color: "bg-emerald-500" },
  { name: "Champion Leader", description: "Log 100 volunteer hours", icon: Award, hours: 100, color: "bg-purple-500" },
  { name: "Legend", description: "Log 250 volunteer hours", icon: GraduationCap, hours: 250, color: "bg-red-500" },
];

const faqs = [
  { q: "Do I need any special skills to volunteer?", a: "Not at all! We have tasks for all skill levels. Whether you're great with social media, writing, design, or just want to help with research — there's a place for you." },
  { q: "How many hours per week do I need to commit?", a: "There's no minimum commitment. You can volunteer as little as 1 hour per week or as much as you'd like. Flexibility is at the heart of our program." },
  { q: "How do I track my volunteer hours?", a: "Once you sign up, you'll have access to Champion Academy where you can complete missions, log hours, and track your progress toward earning badges and certificates." },
  { q: "Can I earn community service hours?", a: "Yes! We provide Leadership & Community Development certificates that are valid for volunteer hour verification and can be used for school requirements, college applications, or professional development." },
  { q: "What is Champion Academy?", a: "Champion Academy is our gamified leadership platform where you complete digital missions — watch videos, take quizzes, write reflections — to earn Leadership & Volunteer Hours, badges, and rank up from Rookie to Champion." },
  { q: "How do I get started?", a: "Click 'Get Started Free' to create your Champion Academy profile. You can start completing missions and earning hours right away!" },
];

const Volunteer = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interests: "", message: "" });
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    toast.success("Thank you for signing up! We'll be in touch within 24 hours with your onboarding details.");
    setFormData({ name: "", email: "", phone: "", interests: "", message: "" });
  };

  const handleShare = (platform: string) => {
    const text = "I'm earning Leadership & Volunteer Hours with Brand of a Champion's Champion Academy! Join me. #ChampionFromYourChair #BrandOfAChampion";
    const url = window.location.href;
    let shareUrl = "";
    switch (platform) {
      case "twitter": shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
      case "facebook": shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`; break;
      case "linkedin": shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Champion Academy | Volunteer & Earn Leadership Hours | Brand of a Champion"
        description="Join Champion Academy — a free gamified leadership platform. Complete missions, earn Leadership & Volunteer Hours, badges, certificates, and level up from Rookie to Champion."
      />
      <Navbar />

      {/* Hero Section — Academy Style */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a14]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold mb-6 tracking-wider">
              🏆 FREE LEADERSHIP & VOLUNTEER PLATFORM
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
              CHAMPION<br />
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">ACADEMY</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-4">
              We don't just build athletes. We build Champions in life.
            </p>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
              Complete digital missions. Earn Leadership & Volunteer Hours. Level up your rank. Get certified.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/academy/dashboard")} variant="hero" size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold">
                <Zap className="mr-2 h-5 w-5" /> Get Started Free
              </Button>
              <Button onClick={() => navigate("/academy/missions")} variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10">
                Browse Missions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Target, value: "15+", label: "Digital Missions" },
              { icon: Clock, value: "50+", label: "Leadership Hours" },
              { icon: Trophy, value: "10", label: "Badges to Earn" },
              { icon: Users, value: "4", label: "Rank Levels" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6">
                <stat.icon className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer / How It Works */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
            How It <span className="text-yellow-500">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A free platform for players, students, and adults to earn volunteer hours through leadership development
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Sign Up Free", desc: "Create your profile and join Champion Academy in seconds.", icon: Laptop },
              { step: "2", title: "Complete Missions", desc: "Watch Behind The Brand videos, take quizzes, write reflections, and volunteer remotely.", icon: Target },
              { step: "3", title: "Earn Hours & Certificates", desc: "Get Leadership & Volunteer Hours, badges, rank up, and download certificates.", icon: Award },
            ].map((item) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-8 bg-card border border-border rounded-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Laptop, title: "100% Virtual", desc: "Work from anywhere, on your schedule. All tasks and missions can be completed online." },
              { icon: Clock, title: "Flexible Hours", desc: "No minimum commitment. Complete 1 mission or 20 — it's up to you." },
              { icon: Award, title: "Earn Certificates", desc: "Get Leadership & Community Development certificates valid for volunteer hour verification." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card className="text-center h-full border-border/50 hover:border-yellow-500/30 transition-colors">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Categories */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
            Mission <span className="text-yellow-500">Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Each mission you complete earns Leadership & Volunteer Hours toward your certificate
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {missionCategories.map((cat) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 bg-card border border-border rounded-2xl hover:border-yellow-500/50 transition-colors">
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{cat.name}</h3>
                <p className="text-muted-foreground text-sm">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => navigate("/academy/missions")} size="lg" className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold">
              <Target className="mr-2 h-5 w-5" /> View All Missions
            </Button>
          </div>
        </div>
      </section>

      {/* Volunteer Tasks */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Volunteer <span className="text-yellow-500">Tasks</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Want to contribute beyond missions? Choose tasks that match your skills — every hour counts!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {volunteerTasks.map((task, i) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full hover:border-yellow-500/30 transition-all hover:shadow-md">
                  <CardContent className="p-5 flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <task.icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{task.title}</h3>
                        <Badge variant="secondary" className="text-xs shrink-0">{task.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex items-center gap-1 text-xs text-yellow-500 font-medium">
                        <Clock className="w-3 h-3" />
                        {task.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rank System */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
            Rank <span className="text-yellow-500">System</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {ranks.map((rank) => (
              <div key={rank.name} className="text-center p-6 bg-card border border-border rounded-2xl">
                <div className={`w-16 h-16 bg-gradient-to-br ${rank.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-foreground">{rank.name}</h3>
                <p className="text-sm text-muted-foreground">{rank.hours} hours</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Champion Badges */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Champion <span className="text-yellow-500">Badges</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Earn digital badges and certificates as you hit milestones. Show off your impact!</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {badgeTiers.map((badge, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 pb-4 px-3">
                    <div className={`w-14 h-14 rounded-full ${badge.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <badge.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground mb-1">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    <p className="text-xs text-yellow-500 font-semibold mt-2">{badge.hours}+ hrs</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Share */}
      <section className="py-16">
        <div className="container text-center">
          <Share2 className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Share Your Impact</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            Spread the word and inspire others! Use <span className="text-yellow-500 font-bold">#ChampionFromYourChair</span> when sharing your milestones.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="outline" onClick={() => handleShare("twitter")}>Share on X</Button>
            <Button variant="outline" onClick={() => handleShare("facebook")}>Share on Facebook</Button>
            <Button variant="outline" onClick={() => handleShare("linkedin")}>Share on LinkedIn</Button>
            <Button variant="outline" asChild>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                Follow us on Facebook
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section id="signup" className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Volunteer <span className="text-yellow-500">Sign Up</span></h2>
              <p className="text-muted-foreground text-lg">Want to volunteer beyond missions? Sign up and we'll match you with tasks within 24 hours.</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Your full name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interests">Areas of Interest</Label>
                    <Input id="interests" placeholder="e.g. Social Media, Writing, Mentoring" value={formData.interests} onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell Us About Yourself (Optional)</Label>
                    <Textarea id="message" placeholder="Why do you want to volunteer? Any relevant experience?" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} rows={3} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold">
                    <Send className="w-4 h-4 mr-2" />
                    Sign Up to Volunteer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-8 text-foreground">Frequently Asked <span className="text-yellow-500">Questions</span></h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Card key={i} className="cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground pr-4">{faq.q}</h3>
                      {expandedFaq === i ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                    </div>
                    {expandedFaq === i && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-muted-foreground mt-3 text-sm">
                        {faq.a}
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0a0a14]">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Become a <span className="text-yellow-400">Champion</span>?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
            Join Champion Academy today — it's completely free. Start earning Leadership & Volunteer Hours and build your legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/academy/dashboard")} size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold">
              <Zap className="mr-2 h-5 w-5" /> Start Your Journey
            </Button>
            <Button onClick={() => navigate("/academy/leaderboard")} variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10">
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Volunteer;
