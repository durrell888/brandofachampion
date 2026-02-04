import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle, PlayCircle, Award, BookOpen, Target, Video, Users, Film, ExternalLink, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coaches } from "@/data/coaches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import { VideoBackgroundTile } from "@/components/VideoBackgroundTile";
import olineDrill from "@/assets/videos/oline-drill.mp4";
import dlineDrill from "@/assets/videos/dline-drill.mp4";
import linebackerDrill from "@/assets/videos/linebacker-drill.mp4";
import rbDrill from "@/assets/videos/rb-drill.mp4";

export default function CoachProfile() {
  const { coachId } = useParams<{ coachId: string }>();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const coach = coaches.find((c) => c.id === coachId);
  const isLogoImage = coach?.id === "trench-iq" || coach?.image.includes("trench-iq-logo") === true;
  const coachImageSrc = isLogoImage ? `${coach?.image}?v=trench-iq-1` : coach?.image;

  if (!coach) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Coach not found</h1>
          <Button onClick={() => navigate("/training")}>Back to Training</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${coach.name} - ${coach.position}`}
        description={coach.bio}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/training")}
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Training
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="text-sm">
                {coach.positionGroup}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                {coach.name}
              </h1>
              <p className="text-xl text-accent font-semibold">{coach.position}</p>
              <p className="text-lg text-muted-foreground">{coach.bio}</p>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>{coach.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {coach.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="border-accent/30">
                    {specialty}
                  </Badge>
                ))}
              </div>

              {coach.isSubscription && coach.subscriptionPrice && (
                <div className="space-y-4">
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 inline-block">
                    <p className="text-2xl font-bold text-accent">${coach.subscriptionPrice}/month</p>
                    <p className="text-sm text-muted-foreground">Monthly subscription</p>
                  </div>
                  
                  {coach.id === "strength-coach" && (
                    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        Training Schedule
                      </h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><span className="font-medium text-foreground">Days:</span> Monday, Tuesday & Thursday</p>
                        <p><span className="font-medium text-foreground">Time:</span> 7:00 AM</p>
                        <p><span className="font-medium text-foreground">Location:</span> Douglas County Football Facility</p>
                        <p><span className="font-medium text-foreground">Starting:</span> February 3rd, 2025</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {coach.id === "strength-coach" && (
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-accent" />
                    High School Training Partnerships
                  </h4>
                  <Link to="/dchs-training">
                    <Button 
                      variant="outline" 
                      className="w-full gap-3 border-2 hover:opacity-90 transition-opacity font-bold"
                      style={{
                        backgroundColor: '#1a2b4a',
                        borderColor: '#c9a227',
                        color: '#c9a227'
                      }}
                    >
                      <img 
                        src="/images/schools/douglas-county-logo.png?v=2" 
                        alt="Douglas County Tigers" 
                        className="h-7 w-7 object-contain"
                      />
                      Douglas County Football
                    </Button>
                  </Link>
                </div>
              )}

              <Button
                variant="hero"
                size="lg"
                onClick={() => coach.externalLink ? window.open(coach.externalLink, '_blank') : setIsBookingOpen(true)}
                className="mt-6"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {coach.isSubscription ? "Subscribe Now" : "Book Training Session"}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={coachImageSrc}
                  alt={coach.id === "trench-iq" ? "Trench IQ logo" : coach.name}
                  className={`w-full h-full ${isLogoImage ? "object-contain p-8 bg-background" : "object-cover object-top"}`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {coach.id === "trench-iq" && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden rounded-2xl border border-border">
              <VideoBackgroundTile videoSrc={`${olineDrill}?v=1`} label="O-LINE" className="min-h-[220px]" />
              <VideoBackgroundTile videoSrc={`${dlineDrill}?v=1`} label="D-LINE" className="min-h-[220px]" />
              <VideoBackgroundTile videoSrc={`${linebackerDrill}?v=1`} label="LINEBACKER" className="min-h-[220px]" />
              <VideoBackgroundTile videoSrc={`${rbDrill}?v=2`} label="RUNNING BACK" className="min-h-[220px]" />
            </div>
          </div>
        </section>
      )}

      {/* Video & Virtual Training Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
              <Video className="h-5 w-5 text-accent" />
              <span className="text-accent font-semibold">Virtual Training Room</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Live Video Sessions with {coach.name}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with your coach for film review, technique analysis, and live feedback through our integrated video platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Tabs defaultValue="video-room" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="video-room" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Video Conference
                </TabsTrigger>
                <TabsTrigger value="film-review" className="flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  Film Review
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video-room">
                <Card className="bg-card border-border overflow-hidden">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Video className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{coach.name}'s Video Room</h3>
                        <p className="text-sm text-muted-foreground font-normal">
                          Join scheduled sessions or request a live call
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Jitsi Meet Embed - Free video conferencing */}
                    <div className="aspect-video bg-muted relative">
                      <iframe
                        src={`https://meet.jit.si/BigLeagueAdvantage-${coach.id}-Room`}
                        className="w-full h-full border-0"
                        allow="camera; microphone; fullscreen; display-capture; autoplay"
                        title={`Video call with ${coach.name}`}
                      />
                    </div>
                    <div className="p-4 bg-muted/30 border-t border-border">
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Badge variant="outline" className="text-xs">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                          Camera & Mic Required
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          End-to-End Encrypted
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Screen Sharing Enabled
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="film-review">
                <Card className="bg-card border-border overflow-hidden">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Film className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Film Review Session</h3>
                        <p className="text-sm text-muted-foreground font-normal">
                          Share your game film and get real-time feedback
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative border border-dashed border-border">
                          <div className="text-center space-y-3">
                            <PlayCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                            <p className="text-sm text-muted-foreground">
                              Upload or share screen to display your film
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Share your game film during a video session for real-time breakdown and technique analysis.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Film Review Includes:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span>Frame-by-frame technique analysis</span>
                          </li>
                          <li className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span>Screen sharing for side-by-side comparison</span>
                          </li>
                          <li className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span>Personalized improvement plan</span>
                          </li>
                          <li className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span>Recorded session for future reference</span>
                          </li>
                        </ul>
                        <Button
                          variant="hero"
                          className="w-full mt-4"
                          onClick={() => coach.externalLink ? window.open(coach.externalLink, '_blank') : setIsBookingOpen(true)}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Film Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="text-accent font-semibold">Training Curriculum</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {coach.positionGroup} Development Program
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive course designed to develop every aspect of your game under {coach.name}'s expert guidance.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {coach.curriculum.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`module-${index}`}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-foreground">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {module.topics.length} topics
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-14 space-y-3">
                        {module.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="flex items-center gap-3 text-muted-foreground"
                          >
                            <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30 max-w-2xl mx-auto">
              <CardContent className="py-12 space-y-6">
                <Target className="h-12 w-12 text-accent mx-auto" />
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Ready to Elevate Your Game?
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Book a one-on-one training session with {coach.name} and start your journey to becoming an elite athlete.
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => coach.externalLink ? window.open(coach.externalLink, '_blank') : setIsBookingOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Session
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />

      <BookingModal
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        coach={coach}
      />
    </div>
  );
}
