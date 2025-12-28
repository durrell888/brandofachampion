import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle, PlayCircle, Award, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { coaches } from "@/data/coaches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";

export default function CoachProfile() {
  const { coachId } = useParams<{ coachId: string }>();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const coach = coaches.find((c) => c.id === coachId);

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

              <Button
                variant="hero"
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="mt-6"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Training Session
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
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Training Preview
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch {coach.name} in action and see the training methodology that has developed elite athletes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-card border-border overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                    <PlayCircle className="h-12 w-12 text-accent" />
                  </div>
                  <p className="text-muted-foreground">Training videos coming soon</p>
                </div>
              </div>
            </Card>
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
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Session - $75
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
