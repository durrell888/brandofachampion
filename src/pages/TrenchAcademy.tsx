import { motion } from "framer-motion";
import { 
  Shield, Target, Zap, Brain, Video, Users, Award, 
  TrendingUp, Dumbbell, ChevronRight, CheckCircle,
  Calendar, ArrowRight, ExternalLink, DollarSign,
  MapPin, Clock,
} from "lucide-react";
import soliLogo from "@/assets/soli-logo.png";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { VideoBackgroundTile } from "@/components/VideoBackgroundTile";
import dlineDrill from "@/assets/videos/dline-drill.mp4";
import linebackerDrill from "@/assets/videos/linebacker-drill.mp4";
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
  PositionCurriculum 
} from "@/data/trenchAcademy";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Target,
  Zap,
  Brain,
  Video,
  Users,
  Award,
  TrendingUp,
  Dumbbell
};

// Only defensive positions
const filteredCurriculums = positionCurriculums.filter(p => 
  p.id === "linebacker" || p.id === "defensive-line"
);

export default function TrenchAcademy() {
  const [selectedPosition, setSelectedPosition] = useState<PositionCurriculum>(filteredCurriculums[0]);

  const handleVideoReview = () => {
    window.open(trenchAcademyInfo.videoReviewLink, '_blank');
  };

  const handleBookSession = () => {
    window.open('https://cash.app/$tmbtraining1', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Defensive Line Specialist"
        description="The nation's premier defensive line and linebacker training program. 30+ years of elite coaching experience developing elite front-seven players."
      />
      <Navbar />

      {/* Hero Section - with front image */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        {/* Dark Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1a0a00] via-[#3d1500] to-[#1a0a00]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0500] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-black/30 backdrop-blur-sm border-2 border-[#c8a850]/50 mb-4 shadow-[0_0_30px_rgba(200,168,80,0.3)]">
                <img
                  src={soliLogo}
                  alt="SOLI - Defensive Line Specialist"
                  className="h-24 w-24 object-contain rounded-full"
                  loading="eager"
                />
              </div>
            </motion.div>

            <Badge className="mb-6 bg-[#c8a850] text-[#1a0a00] font-semibold px-4 py-2 text-sm">
              {trenchAcademyInfo.experience}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4 tracking-tight leading-none">
              DEFENSIVE LINE
              <span className="block text-[#c8a850]">SPECIALIST</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl font-light">
              Elite front-seven training for linebackers and linemen ready to dominate at the next level.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button 
                size="lg" 
                className="bg-[#c8a850] hover:bg-[#e0bf60] text-[#1a0a00] font-bold px-8 shadow-[0_0_20px_rgba(200,168,80,0.4)]"
                onClick={handleBookSession}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Cash App $tmbtraining1
              </Button>
              <Button 
                size="lg" 
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 border border-[#c8a850]/40 backdrop-blur-sm"
                onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Curriculum
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#c8a850]/40 text-white hover:bg-white/10"
                onClick={handleVideoReview}
              >
                <Video className="mr-2 h-5 w-5" />
                Schedule Film Review
              </Button>
            </div>

            {/* Contact Information */}
          </motion.div>

          {/* Stats Grid - bottom of hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl"
          >
            {trenchAcademyInfo.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center backdrop-blur-sm bg-black/20 rounded-xl p-4 border border-[#c8a850]/20"
              >
                <div className="text-3xl md:text-4xl font-display font-black text-[#c8a850] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Page Image Section - full-width Mataio Soli graphic */}
      <section className="relative">
        <img
          src="/images/trench-iq-page.png"
          alt="Defensive Line Specialist"
          className="w-full object-cover max-h-[500px] object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </section>

      {/* Training Schedule Section */}
      <section className="py-14 bg-[#1a0a00]">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="mb-4 bg-[#c8a850] text-[#1a0a00] font-semibold">Training Schedule</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              On-Field Training Sessions
            </h2>
            <p className="text-white/70 text-lg">Join us on the field at Douglas County High School</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-black/30 border border-[#c8a850]/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(200,168,80,0.1)]">
              {/* Location Header */}
              <div className="bg-[#c8a850]/15 border-b border-[#c8a850]/20 px-8 py-5 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#c8a850] shrink-0" />
                <div>
                  <p className="text-white font-semibold">Douglas County High School</p>
                  <p className="text-white/60 text-sm">Douglasville, GA</p>
                </div>
              </div>

              {/* Schedule Days */}
              <div className="divide-y divide-[#c8a850]/10">
                {[
                  { day: "Monday", active: true },
                  { day: "Wednesday", active: true },
                ].map(({ day, active }) => (
                  <div key={day} className="flex items-center justify-between px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${active ? "bg-[#c8a850] shadow-[0_0_8px_rgba(200,168,80,0.8)]" : "bg-white/20"}`} />
                      <span className="text-white font-display font-bold text-xl">{day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#c8a850] font-semibold">
                      <Clock className="h-4 w-4" />
                      <span>4:40 PM – 6:00 PM</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-8 py-6 bg-black/20">
                <Button
                  className="w-full bg-[#c8a850] hover:bg-[#e0bf60] text-[#1a0a00] font-bold shadow-[0_0_20px_rgba(200,168,80,0.3)]"
                  onClick={handleBookSession}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Cash App $tmbtraining1
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Grid Section - only O-Line, D-Line, and Linebacker */}
      <section className="py-12 bg-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Badge variant="outline" className="mb-4">Position Training Preview</Badge>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              See Our Training in Action
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <VideoBackgroundTile videoSrc={`${dlineDrill}?v=1`} label="D-LINE" />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <VideoBackgroundTile videoSrc={`${linebackerDrill}?v=1`} label="LINEBACKER" />
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
            <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              The Nation's Premier Defensive Line & Linebacker Training
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The premier destination for elite defensive line and linebacker training in the United States. With over three decades of combined coaching experience at the highest levels of the sport, our staff has developed, trained, and mentored athletes who have gone on to dominate at the collegiate and professional levels.
              {"\n\n"}
              Our methodology sets us apart from elite programs like IMG Academy, Excel Sports, and nationally recognized position camps. We don't just train athletes—we engineer complete players through an intensive curriculum that combines on-field technique work with comprehensive film study and cognitive development.
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



      {/* Position Curriculum Section - LB, O-Line, D-Line only */}
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
            defaultValue={filteredCurriculums[0].id} 
            className="w-full"
            onValueChange={(value) => {
              const position = filteredCurriculums.find(p => p.id === value);
              if (position) setSelectedPosition(position);
            }}
          >
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent mb-8">
              {filteredCurriculums.map((pos) => {
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

            {filteredCurriculums.map((pos) => {
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

                    <div>
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

                      <div className="flex flex-wrap gap-3 mt-6">
                        <Button 
                          variant="hero"
                          onClick={handleBookSession}
                        >
                          <DollarSign className="mr-2 h-4 w-4" />
                          Cash App $tmbtraining1
                        </Button>
                        <Button 
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
              we provide an unmatched focus on defensive line and linebacker mastery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Position Depth", 
                description: "While others offer broad training, we dive deep into every nuance of defensive line and linebacker play",
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
      <section className="py-20 bg-gradient-to-r from-[#0d0500] via-[#3d1500] to-[#0d0500] border-t border-[#c8a850]/20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-black/40 backdrop-blur-sm border-2 border-[#c8a850]/50 mb-6 shadow-[0_0_30px_rgba(200,168,80,0.3)]">
              <img
                src={soliLogo}
                alt="SOLI"
                className="h-20 w-20 object-contain rounded-full"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Dominate the Trenches?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join the elite defensive linemen and linebackers who have transformed their game through 
              our position-specific training and film evaluation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#c8a850] hover:bg-[#e0bf60] text-[#1a0800] font-bold px-8 shadow-[0_0_20px_rgba(200,168,80,0.4)]"
                onClick={handleBookSession}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Book Session - $40
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#c8a850]/40 text-white hover:bg-white/10"
                onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Training Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#c8a850]/40 text-white hover:bg-white/10"
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
