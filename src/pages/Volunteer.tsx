import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  ChevronDown, ChevronUp, Send, GraduationCap
} from "lucide-react";
import { toast } from "sonner";

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

const badges = [
  { name: "First Step", description: "Complete your first task", icon: Star, hours: 1, color: "bg-yellow-500" },
  { name: "Rising Champion", description: "Log 10 volunteer hours", icon: Trophy, hours: 10, color: "bg-amber-500" },
  { name: "Community Builder", description: "Log 25 volunteer hours", icon: Users, hours: 25, color: "bg-blue-500" },
  { name: "Impact Maker", description: "Log 50 volunteer hours", icon: Heart, hours: 50, color: "bg-emerald-500" },
  { name: "Champion Leader", description: "Log 100 volunteer hours", icon: Award, hours: 100, color: "bg-purple-500" },
  { name: "Legend", description: "Log 250 volunteer hours", icon: GraduationCap, hours: 250, color: "bg-red-500" },
];

const faqs = [
  { q: "Do I need any special skills to volunteer?", a: "Not at all! We have tasks for all skill levels. Whether you're great with social media, writing, design, or just want to help with research — there's a place for you." },
  { q: "How many hours per week do I need to commit?", a: "There's no minimum commitment. You can volunteer as little as 1 hour per week or as much as you'd like. Flexibility is at the heart of our virtual program." },
  { q: "How do I track my volunteer hours?", a: "Once you sign up, you'll have access to our volunteer dashboard where you can log hours, view completed tasks, and track your progress toward earning badges." },
  { q: "Can I earn community service hours?", a: "Yes! We provide documentation for community service hours that can be used for school requirements, college applications, or professional development." },
  { q: "How do I get started?", a: "Simply fill out the sign-up form on this page and we'll send you onboarding materials and access to the volunteer dashboard within 24 hours." },
];

const Volunteer = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interests: "", message: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    toast.success("Thank you for signing up! We'll be in touch within 24 hours with your onboarding details.");
    setFormData({ name: "", email: "", phone: "", interests: "", message: "" });
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Your message has been sent! We'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleShare = (platform: string) => {
    const text = "I'm volunteering with Brand of a Champion! Join me and make a difference from anywhere. #ChampionFromYourChair #BrandOfAChampion";
    const url = window.location.href;
    let shareUrl = "";
    switch (platform) {
      case "twitter": shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
      case "facebook": shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`; break;
      case "linkedin": shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  // Demo progress data
  const demoHours = 12;
  const demoTasksCompleted = 5;
  const nextBadgeHours = 25;
  const progressPercent = Math.min((demoHours / nextBadgeHours) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Volunteer Virtually | Champion from Your Chair | Brand of a Champion"
        description="Make a difference from anywhere! Join Brand of a Champion's virtual volunteer program. Flexible tasks, hour tracking, badges, and community — all from your chair."
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge className="mb-4 text-sm px-4 py-1">🏆 Virtual Volunteer Program</Badge>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 text-foreground">
              Champion from Your <span className="text-accent">Chair</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Flexible. Impactful. Rewarding. Join today and start giving back from anywhere!
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
              Brand of a Champion's virtual volunteer program empowers you to make a real difference in the lives of young athletes — all from the comfort of your home. Whether you have 1 hour a week or 10, your time creates lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById("tasks")?.scrollIntoView({ behavior: "smooth" })}>
                View Tasks
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Opportunity Overview */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">Why Volunteer With Us?</h2>
            <p className="text-muted-foreground text-lg">
              Our mission is to support young athletes on their journey to collegiate athletics while building character and leadership. As a virtual volunteer, you'll directly contribute to programs that change lives — and you'll be recognized for every hour you give.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Laptop, title: "100% Virtual", desc: "Work from anywhere, on your schedule. All tasks can be completed online." },
              { icon: Clock, title: "Flexible Hours", desc: "No minimum commitment. Volunteer 1 hour or 20 — it's up to you." },
              { icon: Award, title: "Earn Recognition", desc: "Track hours, earn digital badges, and receive certificates for your service." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card className="text-center h-full border-border/50 hover:border-accent/30 transition-colors">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-xl red-gradient flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-accent-foreground" />
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

      {/* Task List */}
      <section id="tasks" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Available Tasks</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Choose tasks that match your skills and interests. Every contribution counts!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {volunteerTasks.map((task, i) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full hover:border-accent/30 transition-all hover:shadow-md">
                  <CardContent className="p-5 flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <task.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{task.title}</h3>
                        <Badge variant="secondary" className="text-xs shrink-0">{task.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex items-center gap-1 text-xs text-accent font-medium">
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

      {/* Volunteer Dashboard Preview */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Your Volunteer Dashboard</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Once you sign up, you'll get access to a personalized dashboard to track everything.</p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <Card className="border-accent/20">
              <CardContent className="pt-6 text-center">
                <Clock className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="text-4xl font-display font-black text-foreground">{demoHours}</p>
                <p className="text-sm text-muted-foreground mt-1">Hours Logged</p>
              </CardContent>
            </Card>
            <Card className="border-accent/20">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="text-4xl font-display font-black text-foreground">{demoTasksCompleted}</p>
                <p className="text-sm text-muted-foreground mt-1">Tasks Completed</p>
              </CardContent>
            </Card>
            <Card className="border-accent/20">
              <CardContent className="pt-6 text-center">
                <Trophy className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="text-4xl font-display font-black text-foreground">2</p>
                <p className="text-sm text-muted-foreground mt-1">Badges Earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress to Next Badge */}
          <div className="max-w-3xl mx-auto mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-foreground">Progress to Next Badge</p>
                    <p className="text-sm text-muted-foreground">Community Builder — {nextBadgeHours} hours</p>
                  </div>
                  <span className="text-accent font-bold">{demoHours}/{nextBadgeHours} hrs</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Champion Badges */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Champion Badges & Rewards</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Earn digital badges and certificates as you hit milestones. Show off your impact!</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {badges.map((badge, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 pb-4 px-3">
                    <div className={`w-14 h-14 rounded-full ${badge.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <badge.icon className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground mb-1">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    <p className="text-xs text-accent font-semibold mt-2">{badge.hours}+ hrs</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Join Our Volunteer Community</h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              Connect with fellow volunteers, share experiences, ask questions, and collaborate on larger projects. Our community space keeps you motivated and connected.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: MessageSquare, text: "Discussion Forums" },
                { icon: Users, text: "Team Collaborations" },
                { icon: Target, text: "Group Challenges" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-4 border border-border/50">
                  <item.icon className="w-5 h-5 text-accent shrink-0" />
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Sharing */}
      <section className="py-16">
        <div className="container text-center">
          <Share2 className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Share Your Impact</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            Spread the word and inspire others! Use <span className="text-accent font-bold">#ChampionFromYourChair</span> when sharing your milestones.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" onClick={() => handleShare("twitter")}>Share on X</Button>
            <Button variant="outline" onClick={() => handleShare("facebook")}>Share on Facebook</Button>
            <Button variant="outline" onClick={() => handleShare("linkedin")}>Share on LinkedIn</Button>
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section id="signup" className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Sign Up Now</h2>
              <p className="text-muted-foreground text-lg">Ready to make a difference? Fill out the form below and we'll get you started within 24 hours.</p>
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
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interests">Areas of Interest</Label>
                    <Input id="interests" placeholder="e.g. Social Media, Writing, Mentoring" value={formData.interests} onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell Us About Yourself (Optional)</Label>
                    <Textarea id="message" placeholder="Why do you want to volunteer? Any relevant experience?" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} rows={3} />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">
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
            <h2 className="text-3xl font-display font-bold text-center mb-8 text-foreground">Frequently Asked Questions</h2>
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

      {/* Contact Support */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Contact Support</h2>
              <p className="text-muted-foreground">Have questions about volunteering? We're here to help!</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input id="contact-name" placeholder="Your name" value={contactForm.name} onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" value={contactForm.email} onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea id="contact-message" placeholder="How can we help?" value={contactForm.message} onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))} rows={4} />
                  </div>
                  <Button type="submit" variant="default" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Volunteer;
