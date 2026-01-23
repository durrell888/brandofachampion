import { motion } from "framer-motion";
import { 
  Brain, 
  Target, 
  Users, 
  Trophy, 
  Heart, 
  Clock, 
  DollarSign,
  CheckCircle,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { ParentRegistrationModal } from "@/components/ParentRegistrationModal";
import { useState } from "react";

const curriculumItems = [
  {
    icon: Brain,
    title: "Mental Toughness & Resilience",
    description: "We teach athletes how to handle pressure, overcome setbacks, and stay focused during adversity such as losses, injuries, or reduced playing time.",
    parentSees: "More confidence, emotional control, and maturity in stressful situations."
  },
  {
    icon: Target,
    title: "Discipline & Self-Motivation",
    description: "Athletes learn how to create structure, build daily habits, and hold themselves accountable—without being constantly reminded.",
    parentSees: "Improved consistency, responsibility, and work ethic at home and school."
  },
  {
    icon: Users,
    title: "Coachability & Adaptability",
    description: "Your child will face new coaches, systems, and expectations at every level. We teach athletes how to listen, adjust, and grow.",
    parentSees: "Better communication, respect for authority, and faster development."
  },
  {
    icon: Trophy,
    title: "Goal Setting & Accountability",
    description: "Athletes learn how to set realistic goals, track progress, and take ownership of outcomes.",
    parentSees: "Clear direction, motivation, and reduced entitlement."
  },
  {
    icon: Heart,
    title: "Leadership, Relationships & Personal Brand",
    description: "We teach athletes how to represent themselves professionally, build healthy relationships, and avoid off-field mistakes that can damage opportunities.",
    parentSees: "Improved decision-making, leadership qualities, and maturity."
  },
  {
    icon: Clock,
    title: "Time Management & Life Balance",
    description: "Athletes are taught how to manage school, training, recovery, and personal responsibilities effectively.",
    parentSees: "Better organization, less burnout, and healthier routines."
  },
  {
    icon: DollarSign,
    title: "Financial Education & Future Planning",
    description: "We educate athletes on money management, understanding financial decisions, and preparing for life after sports.",
    parentSees: "Smarter financial habits and long-term thinking."
  }
];

const promiseItems = [
  "Respect coaches, teachers, and family",
  "Take responsibility for their actions",
  "Are prepared for college, careers, and adulthood",
  "Understand that success requires discipline, not shortcuts"
];

const audienceItems = [
  "Parents who want more than just wins",
  "Athletes serious about their future",
  "Families focused on character, discipline, and long-term success"
];

const OurProgram = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Program | Youth Athlete Development | Brand of a Champion"
        description="A parent-focused performance & life development program. We go beyond physical training to focus on life skills proven to increase long-term success in athletics, academics, and adulthood."
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Our Program
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Developing Athletes.{" "}
              <span className="text-primary">Building Young Men.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
              A Parent-Focused Performance & Life Development Program
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              At Brand of a Champion, we understand that football will not last forever—but the habits, mindset, and discipline your child develops will.
            </p>
            <p className="text-lg text-foreground font-medium max-w-3xl mx-auto">
              Our program goes beyond physical training to focus on the life skills proven to increase long-term success in athletics, academics, and adulthood.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Parents Choose Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Why Parents Choose Brand of a Champion
            </h2>
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <p className="text-xl md:text-2xl text-foreground font-semibold mb-4">
                Many athletes have talent.
              </p>
              <p className="text-xl md:text-2xl text-primary font-bold mb-6">
                Very few are prepared for pressure, responsibility, and life beyond the game.
              </p>
              <p className="text-lg text-muted-foreground">
                We intentionally teach the skills that separate athletes who struggle after sports from those who thrive in college, careers, and leadership roles.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Life Performance Curriculum */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Life Performance Curriculum
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seven essential pillars that prepare your athlete for success on and off the field
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {curriculumItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-primary mb-1">What Parents See:</p>
                      <p className="text-sm text-foreground">{item.parentSees}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise to Parents */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Promise to Parents
              </h2>
              <p className="text-xl opacity-90">
                We are committed to developing athletes who:
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {promiseItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4"
                >
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-center"
            >
              We don't just build athletes.{" "}
              <span className="underline decoration-4 underline-offset-4">We help build men.</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Who This Program Is For */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Who This Program Is For
            </h2>
            <div className="space-y-4">
              {audienceItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center gap-3 text-lg md:text-xl"
                >
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-background to-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Invest in Your Child's Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Brand of a Champion exists to support families who believe development off the field matters just as much as performance on it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => setIsRegistrationOpen(true)}
                className="group"
              >
                Enroll Your Athlete
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => setIsRegistrationOpen(true)}
              >
                Develop the Complete Athlete
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <ParentRegistrationModal 
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
      />
    </div>
  );
};

export default OurProgram;
