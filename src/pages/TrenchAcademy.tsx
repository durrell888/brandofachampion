import { motion } from "framer-motion";
import { 
  Shield, Target, Zap, Brain, Eye, Video, Users, Award, 
  TrendingUp, Dumbbell, ChevronRight, Play, CheckCircle,
  Star, Calendar, ArrowRight, ExternalLink, DollarSign
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { VideoBackgroundTile } from "@/components/VideoBackgroundTile";
import olineDrill from "@/assets/videos/oline-drill.mp4";
import dlineDrill from "@/assets/videos/dline-drill.mp4";
import linebackerDrill from "@/assets/videos/linebacker-drill.mp4";
import rbDrill from "@/assets/videos/rb-drill.mp4";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  trenchAcademyInfo, 
  positionCurriculums, 
  filmEvaluationProcess,
  PositionCurriculum 
} from "@/data/trenchAcademy";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Target,
  Zap,
  Brain,
  Eye,
  Video,
  Users,
  Award,
  TrendingUp,
  Dumbbell
};

export default function TrenchAcademy() {
  const [selectedPosition, setSelectedPosition] = useState<PositionCurriculum>(positionCurriculums[0]);

  const handleVideoReview = () => {
    window.open(trenchAcademyInfo.videoReviewLink, '_blank');
  };

  const handleBookSession = () => {
    // Redirect to Cash App with $TrenchIQ cashtag and $40 amount
    window.open('https://cash.app/$TrenchIQ/40', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Trench IQ | Elite Position Training"
        description="The nation's premier football position training program. 30+ years of elite coaching experience in linebacker, offensive line, defensive line, and running back development."
      />
      <Navbar />

      {/* Hero Section with 4 Video Grid */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* 4-Video Grid Background */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <VideoBackgroundTile videoSrc={`${olineDrill}?v=1`} label="O-LINE" />
          <VideoBackgroundTile videoSrc={`${dlineDrill}?v=1`} label="D-LINE" />
          <VideoBackgroundTile videoSrc={`${linebackerDrill}?v=1`} label="LINEBACKER" />
          <VideoBackgroundTile videoSrc={`${rbDrill}?v=2`} label="RUNNING BACK" />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="container relative z-20 px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Logo/Brand Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border-2 border-[#4ade80]/50 mb-6">
                <img
                  src="/images/partners/trench-iq-logo.png?v=trench-iq-1"
                  alt="Trench IQ logo"
                  className="h-24 w-auto object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </motion.div>

            <Badge className="mb-6 bg-[#4ade80] text-[#1a365d] font-semibold px-4 py-2 text-sm">
              {trenchAcademyInfo.experience}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight">
              TRENCH
              <span className="block text-[#4ade80]">IQ</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-light">
              {trenchAcademyInfo.tagline}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-[#4ade80] hover:bg-[#22c55e] text-[#1a365d] font-bold px-8"
                onClick={handleBookSession}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Book Session - $40
              </Button>
              <Button 
                size="lg" 
                className="bg-[#1a365d] hover:bg-[#0f2940] text-white font-bold px-8"
                onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Curriculum
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleVideoReview}
              >
                <Video className="mr-2 h-5 w-5" />
                Schedule Film Review
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {trenchAcademyInfo.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-black text-[#4ade80] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Why Trench IQ</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              The Nation's Premier Position Training Program
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {trenchAcademyInfo.description}
            </p>
          </motion.div>

          {/* Differentiators Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trenchAcademyInfo.differentiators.map((item, index) => {
              const Icon = iconMap[item.icon] || Shield;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 hover:border-accent/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Film Evaluation Process */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Film Breakdown Process</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Multi-Angle Film Evaluation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our coaches break down your film from 7+ camera angles, analyzing every rep to identify 
              strengths, areas for improvement, and create a personalized development plan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filmEvaluationProcess.map((step, index) => {
              const Icon = iconMap[step.icon] || CheckCircle;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-6xl font-display font-black text-muted/20">
                      {step.step}
                    </div>
                    <CardContent className="p-6 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Video Review CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-[#1a365d] to-[#2d5a3c] border-0 text-white">
              <CardContent className="p-8 text-center">
                <Video className="h-12 w-12 mx-auto mb-4 text-[#4ade80]" />
                <h3 className="text-2xl font-display font-bold mb-4">
                  Virtual Film Review Sessions
                </h3>
                <p className="text-white/80 mb-6">
                  Connect with our coaches online for personalized film breakdown sessions. 
                  Share your screen, review plays together, and get real-time feedback on your technique.
                </p>
                <Button 
                  size="lg" 
                  className="bg-[#4ade80] hover:bg-[#22c55e] text-[#1a365d] font-bold"
                  onClick={handleVideoReview}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Join Virtual Review Room
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Position Curriculum Section */}
      <section id="positions" className="py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Position Training</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Comprehensive Position Curriculum
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Select a position below to explore our in-depth training curriculum, 
              covering every aspect of position mastery from fundamentals to advanced techniques.
            </p>
          </motion.div>

          <Tabs 
            defaultValue={positionCurriculums[0].id} 
            className="w-full"
            onValueChange={(value) => {
              const position = positionCurriculums.find(p => p.id === value);
              if (position) setSelectedPosition(position);
            }}
          >
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent mb-8">
              {positionCurriculums.map((pos) => {
                const Icon = iconMap[pos.icon] || Shield;
                return (
                  <TabsTrigger
                    key={pos.id}
                    value={pos.id}
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-6 py-3 rounded-lg border border-border/50"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {pos.position}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {positionCurriculums.map((pos) => {
              const Icon = iconMap[pos.icon] || Shield;
              return (
                <TabsContent key={pos.id} value={pos.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Position Header */}
                    <Card className="mb-8 border-border/50">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                            <Icon className="h-8 w-8 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                              {pos.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {pos.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Curriculum Modules */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                          <Target className="mr-2 h-5 w-5 text-accent" />
                          Training Modules
                        </h4>
                        <Accordion type="single" collapsible className="space-y-3">
                          {pos.modules.map((module, idx) => (
                            <AccordionItem
                              key={idx}
                              value={`module-${idx}`}
                              className="border border-border/50 rounded-lg px-4 bg-card"
                            >
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-4">
                                  <Badge variant="outline" className="shrink-0">
                                    {module.duration}
                                  </Badge>
                                  <span className="font-medium text-left">
                                    {module.title}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-2 py-2">
                                  {module.topics.map((topic, topicIdx) => (
                                    <li 
                                      key={topicIdx}
                                      className="flex items-start gap-2 text-muted-foreground"
                                    >
                                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                      <span className="text-sm">{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>

                      {/* Film Evaluation Metrics */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                          <Eye className="mr-2 h-5 w-5 text-accent" />
                          Film Evaluation
                        </h4>
                        <Card className="border-border/50">
                          <CardContent className="p-6 space-y-6">
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-3">
                                Camera Angles Analyzed
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {pos.filmEvaluation.angles.map((angle) => (
                                  <Badge key={angle} variant="secondary" className="text-xs">
                                    {angle}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-3">
                                Performance Metrics
                              </h5>
                              <ul className="space-y-2">
                                {pos.filmEvaluation.metrics.map((metric, idx) => (
                                  <li 
                                    key={idx}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                  >
                                    <Star className="h-3 w-3 text-accent" />
                                    {metric}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Button 
                          className="w-full mt-4"
                          variant="hero"
                          onClick={handleBookSession}
                        >
                          <DollarSign className="mr-2 h-4 w-4" />
                          Book Session - $40
                        </Button>
                        <Button 
                          className="w-full mt-2"
                          variant="outline"
                          onClick={handleVideoReview}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Film Review
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Elite Comparison</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Competing with the Nation's Best
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              While programs like IMG Academy, Excel Sports, and regional elite camps offer quality training, 
              Trench IQ provides an unmatched focus on position-specific mastery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Position Depth", 
                description: "While others offer broad training, we dive deep into every nuance of your specific position",
                highlight: true
              },
              { 
                title: "Film Technology", 
                description: "7+ angle film breakdown vs. standard 2-3 angles at most elite camps",
                highlight: true
              },
              { 
                title: "Coach Access", 
                description: "Direct access to coaches for virtual film review sessions anytime",
                highlight: true
              },
              { 
                title: "Proven Results", 
                description: "25+ NFL players developed through our position-specific methodology",
                highlight: true
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${item.highlight ? 'border-accent/50 bg-accent/5' : 'border-border/50'}`}>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1a365d] via-[#234e70] to-[#2d5a3c]">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-[#4ade80]/50 mb-6">
              <span className="text-3xl font-display font-black text-white">KQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Dominate Your Position?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join the elite athletes who have transformed their game through Trench IQ's 
              position-specific training and film evaluation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#4ade80] hover:bg-[#22c55e] text-[#1a365d] font-bold px-8"
                onClick={handleBookSession}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Book Session - $40
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Training Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleVideoReview}
              >
                <Video className="mr-2 h-5 w-5" />
                Start Film Review
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
