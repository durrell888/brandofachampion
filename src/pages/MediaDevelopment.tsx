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
    type: "Docuseries",
    youtubeId: "FF1og_pLkmA",
    externalLink: "https://youtu.be/FF1og_pLkmA?si=6T1Ae6jp1AEGrjAU"
  },
  {
    title: "Athlete Spotlights",
    description: "Short-form content highlighting individual athlete stories and their path to success.",
    image: "https://img.youtube.com/vi/CifVIQKwWD8/maxresdefault.jpg",
    episodes: "Weekly",
    type: "Social Content",
    youtubeId: "CifVIQKwWD8",
    socialProof: tiktokViews,
    externalLink: "https://www.tiktok.com/@dc..football?_r=1&_t=ZP-93P4SWJuGYp"
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

      {/* Production Shows Section - Creative Design */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <Clapperboard className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Our Work</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Our <span className="text-gradient">Productions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of the team behind these incredible shows
            </p>
          </motion.div>

          {/* Staggered Masonry-style Grid */}
          <div className="grid md:grid-cols-12 gap-6 max-w-6xl mx-auto">
            {productionShows.map((show, index) => {
              // Different sizes for visual interest
              const gridClasses = index === 0 
                ? "md:col-span-7 md:row-span-2" 
                : index === 1 
                  ? "md:col-span-5" 
                  : "md:col-span-5";
              
              return (
                <motion.div
                  key={show.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`group ${gridClasses}`}
                >
                  {show.externalLink ? (
                    <a 
                      href={show.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <motion.div
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative h-full rounded-2xl overflow-hidden border border-border/50 hover:border-accent/50 bg-card shadow-xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 cursor-pointer"
                      >
                        {/* Media Container */}
                        <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[4/3]' : 'aspect-video'}`}>
                          {show.socialProof ? (
                            <>
                              <img
                                src={show.socialProof}
                                alt={show.title}
                                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            </>
                          ) : (
                            <>
                              <img
                                src={show.image}
                                alt={show.title}
                                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                              
                              {/* Play button overlay */}
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="w-20 h-20 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                                >
                                  <Play className="w-10 h-10 text-accent-foreground ml-1" />
                                </motion.div>
                              </motion.div>
                            </>
                          )}

                          {/* Type Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <motion.span 
                              initial={{ x: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.15 + 0.3 }}
                              className="px-4 py-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-lg"
                            >
                              {show.type}
                            </motion.span>
                          </div>

                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 drop-shadow-lg">
                              {show.title}
                            </h3>
                            <p className="text-white/80 text-sm mb-3 line-clamp-2">
                              {show.description}
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                                <Film className="w-4 h-4" />
                                {show.episodes}
                              </div>
                              <motion.div
                                className="flex items-center gap-1 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={{ x: -10 }}
                                whileHover={{ x: 0 }}
                              >
                                <span>Watch now</span>
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  ) : (
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative h-full rounded-2xl overflow-hidden border border-border/50 hover:border-accent/50 bg-card shadow-xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
                    >
                      {/* Media Container */}
                      <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[4/3]' : 'aspect-video'}`}>
                        {show.videoBackground ? (
                          <>
                            <video
                              src={show.videoBackground}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                          </>
                        ) : (
                          <>
                            <img
                              src={show.image}
                              alt={show.title}
                              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          </>
                        )}

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <motion.span 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                            className="px-4 py-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-lg"
                          >
                            {show.type}
                          </motion.span>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 drop-shadow-lg">
                            {show.title}
                          </h3>
                          <p className="text-white/80 text-sm mb-3 line-clamp-2">
                            {show.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                              <Film className="w-4 h-4" />
                              {show.episodes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
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

      {/* Curriculum Section - Clean Design */}
      <section id="curriculum" className="py-24 bg-secondary/30 scroll-mt-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">14-Week Program</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Production <span className="text-gradient">Curriculum</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master video production from the ground up
            </p>
          </motion.div>

          {/* Clean Grid Layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {curriculumModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card 
                  className="h-full p-6 bg-card border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveModule(index)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color}`}>
                      <module.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {module.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors">
                    {module.title}
                  </h3>

                  {/* Topics List */}
                  <ul className="space-y-2">
                    {module.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Simple CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Learning
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
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
