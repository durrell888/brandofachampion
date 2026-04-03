import { motion } from "framer-motion";
import { Trophy, Target, Clock, Users, Star, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const ranks = [
  { name: "Rookie", hours: "0–10", color: "from-zinc-500 to-zinc-600" },
  { name: "Prospect", hours: "10–25", color: "from-blue-500 to-blue-600" },
  { name: "Elite", hours: "25–50", color: "from-purple-500 to-purple-600" },
  { name: "Champion", hours: "50+", color: "from-yellow-500 to-amber-500" },
];

const categories = [
  { name: "Mindset Missions", icon: "🧠", desc: "Build mental toughness and champion habits" },
  { name: "Education Missions", icon: "📚", desc: "Academic excellence and eligibility knowledge" },
  { name: "Community Impact", icon: "🤝", desc: "Give back and mentor others" },
  { name: "Promotion Missions", icon: "📢", desc: "Spread the word and grow the community" },
  { name: "Skill Challenges", icon: "⚡", desc: "Test your leadership and game knowledge" },
];

export default function AcademyLanding() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Champion Academy | Brand of a Champion"
        description="Complete digital missions, earn Leadership Hours, and level up from Rookie to Champion. Free gamified leadership platform."
        canonical="https://brandofachampion.com/academy"
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0a14]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

          <div className="container relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold mb-6 tracking-wider">
                🏆 FREE LEADERSHIP PLATFORM
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
                CHAMPION<br />
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">ACADEMY</span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-4">
                We don't just build athletes. We build Champions in life.
              </p>
              <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
                Complete digital missions. Earn Leadership Hours. Level up your rank. Get certified.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/academy/dashboard")} variant="hero" size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold">
                  <Zap className="mr-2 h-5 w-5" /> Get Started Free
                </Button>
                <Button onClick={() => navigate("/academy/leaderboard")} variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10">
                  View Leaderboard
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
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

        {/* How It Works */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
              How It <span className="text-yellow-500">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Like Duolingo meets Nike Training Club — for future leaders
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Sign Up Free", desc: "Create your profile and join the academy in seconds." },
                { step: "2", title: "Complete Missions", desc: "Watch videos, answer quizzes, write reflections, and take challenges." },
                { step: "3", title: "Level Up", desc: "Earn points, hours, badges, and downloadable certificates." },
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

        {/* Mission Categories */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
              Mission <span className="text-yellow-500">Categories</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 bg-card border border-border rounded-2xl hover:border-yellow-500/50 transition-colors">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{cat.name}</h3>
                  <p className="text-muted-foreground text-sm">{cat.desc}</p>
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

        {/* CTA */}
        <section className="py-20 bg-[#0a0a14]">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Become a <span className="text-yellow-400">Champion</span>?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Join Champion Academy today — it's completely free. Start earning Leadership Hours and build your legacy.
            </p>
            <Button onClick={() => navigate("/academy/dashboard")} size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold">
              <Zap className="mr-2 h-5 w-5" /> Start Your Journey
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
