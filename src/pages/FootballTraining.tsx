import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Users, Calendar, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CoachCard } from "@/components/CoachCard";
import { TrainingAreaCard } from "@/components/TrainingAreaCard";
import { BookingModal } from "@/components/BookingModal";
import { coaches, trainingAreas, Coach } from "@/data/coaches";

const FootballTraining = () => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBookCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setBookingOpen(true);
  };

  const stats = [
    { icon: Users, value: "500+", label: "Athletes Trained" },
    { icon: Trophy, value: "50+", label: "College Commits" },
    { icon: Calendar, value: "1000+", label: "Sessions Completed" },
    { icon: Dumbbell, value: "7", label: "Training Areas" },
  ];

  return (
    <>
      <SEO
        title="Football Training | Brand of a Champion"
        description="Elite football training with professional position coaches. Book one-on-one sessions for Running Backs, Quarterbacks, Wide Receivers, Linemen, Linebackers, and Defensive Backs."
        canonical="https://brandofachampion.com/training"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          name: "Brand of a Champion Football Training",
          description: "Elite football training for youth athletes",
          sport: "American Football",
        }}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
                ELITE POSITION TRAINING
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
                <span className="text-foreground">TRAIN LIKE A</span>
                <br />
                <span className="text-gradient">CHAMPION</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Work one-on-one with professional position coaches who have played 
                and coached at the highest levels. Elevate your game with personalized training.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-card/50 border border-border rounded-xl"
                >
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-display font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Training Areas Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Complete <span className="text-accent">Training Program</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive approach develops every aspect of an athlete's game
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingAreas.map((area, index) => (
                <TrainingAreaCard
                  key={area.id}
                  title={area.title}
                  description={area.description}
                  icon={area.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Coaching Staff Section */}
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Position <span className="text-accent">Coaches</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn from coaches with professional playing and coaching experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coaches.map((coach) => (
                <CoachCard
                  key={coach.id}
                  coach={coach}
                  onBook={handleBookCoach}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-primary/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to <span className="text-accent">Level Up?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Book your first training session today and start your journey to 
                becoming the best athlete you can be. Our coaches are ready to help 
                you reach your full potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#coaches" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Browse Coaches
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        coach={selectedCoach}
      />
    </>
  );
};

export default FootballTraining;
