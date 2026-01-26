import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Video, Camera, Film, Users, Sparkles, Play, 
  Monitor, Mic, Send, CheckCircle, Star, ArrowRight,
  Clapperboard, Lightbulb, BookOpen, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SEO, createWebPageSchema } from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import tiktokViews from "@/assets/tiktok-views.png";
import liveProductionVideo from "@/assets/videos/live-production.mp4";

const curriculumModules = [
  {
    id: 1,
    title: "Foundations of Videography",
    icon: Camera,
    duration: "2 weeks",
    topics: ["Camera basics & settings", "Shot composition", "Lighting fundamentals", "Audio capture essentials"],
    color: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    title: "Storytelling & Pre-Production",
    icon: Lightbulb,
    duration: "2 weeks",
    topics: ["Narrative structure", "Storyboarding techniques", "Script development", "Shot lists & planning"],
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: 3,
    title: "Production Techniques",
    icon: Clapperboard,
    duration: "3 weeks",
    topics: ["On-set workflow", "Interview techniques", "B-roll capture", "Live event coverage"],
    color: "from-yellow-500 to-green-500"
  },
  {
    id: 4,
    title: "Post-Production Mastery",
    icon: Film,
    duration: "3 weeks",
    topics: ["Editing software basics", "Color grading", "Sound design", "Graphics & motion"],
    color: "from-green-500 to-teal-500"
  },
  {
    id: 5,
    title: "Social Media & Distribution",
    icon: Monitor,
    duration: "2 weeks",
    topics: ["Platform optimization", "Engagement strategies", "Analytics & growth", "Content calendars"],
    color: "from-teal-500 to-blue-500"
  },
  {
    id: 6,
    title: "Live Production",
    icon: Zap,
    duration: "2 weeks",
    topics: ["Multi-camera setups", "Live streaming", "Real-time graphics", "Game day coverage"],
    color: "from-blue-500 to-purple-500"
  }
];

const productionShows = [
  {
    title: "Behind the Brand",
    description: "Our flagship documentary series following high school football programs and their transformation journey.",
    image: "https://img.youtube.com/vi/FF1og_pLkmA/maxresdefault.jpg",
    episodes: "13+ Episodes",
    type: "Documentary Series",
    youtubeId: "FF1og_pLkmA"
  },
  {
    title: "Athlete Spotlights",
    description: "Short-form content highlighting individual athlete stories and their path to success.",
    image: "https://img.youtube.com/vi/CifVIQKwWD8/maxresdefault.jpg",
    episodes: "Weekly",
    type: "Social Content",
    youtubeId: "CifVIQKwWD8",
    socialProof: tiktokViews
  },
  {
    title: "Game Day Coverage",
    description: "Live and post-game content capturing the excitement of high school football.",
    image: "https://img.youtube.com/vi/ApVCy1HLN_Q/maxresdefault.jpg",
    episodes: "Seasonal",
    type: "Live Production",
    youtubeId: "ApVCy1HLN_Q",
    videoBackground: liveProductionVideo
  }
];

const featuredShowreel = {
  youtubeId: "jrL43PSDMXA",
  title: "Our Production Style",
  description: "See how we capture the intensity and artistry of football through cinematic storytelling."
};

const teamRoles = [
  { role: "Camera Operators", icon: Camera, openings: 5 },
  { role: "Video Editors", icon: Film, openings: 3 },
  { role: "Social Media Managers", icon: Monitor, openings: 2 },
  { role: "Audio Engineers", icon: Mic, openings: 2 },
  { role: "Production Assistants", icon: Users, openings: 8 },
  { role: "Content Creators", icon: Sparkles, openings: 4 }
];

const MediaDevelopment = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    interest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeModule, setActiveModule] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-media-application', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        interest: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Media Development Program"
        description="Join the Brand of a Champion production team. Learn videography, video production, and help create inspiring content for our shows like Behind the Brand."
        canonical="https://brandofachampion.org/media-development"
        structuredData={createWebPageSchema(
          "Media Development Program",
          "Join our production team and learn professional videography and video production.",
          "https://brandofachampion.org/media-development"
        )}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
          
          {/* Floating film elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Film className="w-8 h-8 text-accent/20" />
            </motion.div>
          ))}
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
            >
              <Video className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Join Our Team</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 tracking-tight"
            >
              <span className="block">MEDIA</span>
              <span className="text-gradient">DEVELOPMENT</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto"
            >
              Whether you're a seasoned professional or just starting out, join our production team 
              and help create inspiring content that impacts lives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="heroOutline" 
                size="lg"
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Curriculum
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L1440 0V80H0Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* Featured Showreel Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Play className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">See Our Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How We <span className="text-gradient">Film Football</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {featuredShowreel.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-accent/10 border border-accent/20">
              {/* Cinematic frame effect */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${featuredShowreel.youtubeId}?rel=0&modestbranding=1`}
                  title={featuredShowreel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-accent/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-accent/30 rounded-br-3xl" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center"
            >
              <p className="text-muted-foreground mb-4">
                Learn to create content like this by joining our production team
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                  <Camera className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Cinematic Shots</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                  <Film className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Professional Editing</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Storytelling</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Production Shows Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Productions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of the team behind these incredible shows and content series
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {productionShows.map((show, index) => (
              <motion.div
                key={show.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden bg-card border-border hover:border-accent/50 transition-all duration-300">
                  {show.videoBackground ? (
                    <div className="relative aspect-video overflow-hidden">
                      <video
                        src={show.videoBackground}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/20" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-bold rounded-full">
                          {show.type}
                        </span>
                      </div>
                    </div>
                  ) : show.socialProof ? (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={show.socialProof}
                        alt={show.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-bold rounded-full">
                          {show.type}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-bold rounded-full">
                          {show.type}
                        </span>
                      </div>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                          <Play className="w-8 h-8 text-accent-foreground ml-1" />
                        </div>
                      </motion.div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{show.description}</p>
                    <div className="flex items-center gap-2 text-sm text-accent font-semibold">
                      <Film className="w-4 h-4" />
                      {show.episodes}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Roles Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Open <span className="text-gradient">Positions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All experience levels welcome — we provide training and mentorship
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamRoles.map((role, index) => (
              <motion.div
                key={role.role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="p-6 bg-card border-border hover:border-accent/50 transition-all duration-300 cursor-pointer"
                  onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl red-gradient">
                      <role.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
                        {role.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-accent font-semibold">{role.openings} openings</span>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section - Cinematic Design */}
      <section id="curriculum" className="relative py-32 scroll-mt-20 overflow-hidden bg-gradient-to-b from-background via-black to-background">
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0">
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
          
          {/* Dramatic spotlight effects */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          
          {/* Film strip borders */}
          <div className="absolute left-0 top-0 bottom-0 w-16 opacity-20">
            <div className="h-full flex flex-col justify-around py-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-8 h-6 mx-auto border-2 border-accent/40 rounded-sm" />
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 opacity-20">
            <div className="h-full flex flex-col justify-around py-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-8 h-6 mx-auto border-2 border-accent/40 rounded-sm" />
              ))}
            </div>
          </div>
        </div>

        <div className="container relative z-10">
          {/* Cinematic Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border border-accent/30 mb-8 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Film className="w-5 h-5 text-accent" />
              </motion.div>
              <span className="text-sm font-bold text-accent uppercase tracking-[0.2em]">Your Journey Begins</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              <span className="block text-primary-foreground">MASTER THE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-accent">
                CRAFT
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
              A 14-week intensive program that transforms beginners into production-ready filmmakers
            </p>
          </motion.div>

          {/* Cinematic Timeline Grid */}
          <div className="relative max-w-6xl mx-auto">
            {/* Center timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden lg:block" />
            
            <div className="space-y-8 lg:space-y-0">
              {curriculumModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                    index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div 
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg shadow-accent/20 border-4 border-background`}>
                      <span className="text-white font-black text-xl">{module.id}</span>
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <div className={`${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => setActiveModule(index)}
                      className={`relative group cursor-pointer p-8 rounded-2xl border transition-all duration-500 ${
                        activeModule === index
                          ? 'bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-accent shadow-2xl shadow-accent/20'
                          : 'bg-card/50 border-border/50 hover:border-accent/50 hover:bg-card/80 backdrop-blur-sm'
                      }`}
                    >
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Mobile number badge */}
                      <div className={`lg:hidden absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-black text-lg">{module.id}</span>
                      </div>

                      <div className={`relative z-10 ${index % 2 === 0 ? 'lg:flex lg:flex-col lg:items-end' : ''}`}>
                        {/* Icon and Duration */}
                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color} shadow-lg`}>
                            <module.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="px-3 py-1 bg-secondary/80 rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {module.duration}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                          {module.title}
                        </h3>

                        {/* Topics */}
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          {module.topics.map((topic, i) => (
                            <motion.span
                              key={topic}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="px-3 py-1.5 bg-secondary/60 rounded-lg text-sm text-muted-foreground border border-border/50"
                            >
                              {topic}
                            </motion.span>
                          ))}
                        </div>

                        {/* Active indicator */}
                        {activeModule === index && (
                          <motion.div
                            layoutId="activeIndicator"
                            className={`mt-4 flex items-center gap-2 text-accent font-semibold ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm uppercase tracking-wider">Currently Viewing</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  {index % 2 !== 0 && <div className="hidden lg:block" />}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/20 backdrop-blur-sm">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold mb-1">Ready to start your journey?</p>
                <p className="text-muted-foreground">Join the next cohort of production creators</p>
              </div>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="whitespace-nowrap"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 bg-secondary/50 scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-wider">Join Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Apply to <span className="text-gradient">Join the Team</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Tell us about yourself and your interest in media production
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-card border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Full Name *</label>
                      <Input
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Email *</label>
                      <Input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Phone</label>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Experience Level</label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      >
                        <option value="">Select your experience</option>
                        <option value="none">No experience (eager to learn)</option>
                        <option value="beginner">Beginner (1-2 years)</option>
                        <option value="intermediate">Intermediate (3-5 years)</option>
                        <option value="advanced">Advanced (5+ years)</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Area of Interest *</label>
                    <select
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="">Select your interest</option>
                      <option value="camera">Camera Operation</option>
                      <option value="editing">Video Editing</option>
                      <option value="social">Social Media Management</option>
                      <option value="audio">Audio Engineering</option>
                      <option value="production">Production Assistant</option>
                      <option value="content">Content Creation</option>
                      <option value="multiple">Multiple Areas</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Tell Us About Yourself</label>
                    <Textarea
                      placeholder="Share your background, why you're interested in joining our team, and any relevant experience or portfolio links..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Film className="w-5 h-5" />
                        </motion.div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <p className="text-muted-foreground">
                Questions? Email us at{" "}
                <a href="mailto:media@brandofachampion.com" className="text-accent hover:underline font-semibold">
                  media@brandofachampion.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MediaDevelopment;
