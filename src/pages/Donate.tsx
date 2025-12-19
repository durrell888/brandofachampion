import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Trophy, GraduationCap, Star, Quote, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SEO, createWebPageSchema } from "@/components/SEO";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const impactStats = [
  { icon: Users, value: "500+", label: "Athletes Supported", description: "Young athletes given opportunities they never thought possible" },
  { icon: Trophy, value: "30+", label: "College Scholarships", description: "Athletes who earned full-ride scholarships in just 3 years" },
  { icon: GraduationCap, value: "4", label: "All-Americans", description: "Elite athletes developed through our comprehensive programs" },
  { icon: Star, value: "95%", label: "Success Rate", description: "Athletes who achieve their post-graduation goals" },
];

const testimonials = [
  {
    quote: "Brand of a Champion didn't just help me become a better athlete—they helped me become a better person. The mentorship changed my life.",
    author: "Jordan Carter",
    role: "Douglas County Alum, College Athlete",
  },
  {
    quote: "This organization gave my son opportunities we couldn't have afforded on our own. They truly care about the whole athlete.",
    author: "Parent of Current Athlete",
    role: "Brand of a Champion Family",
  },
];

const Donate = () => {
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetClick = (preset: number) => {
    setAmount(preset);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleDonate = async () => {
    if (amount < 1) {
      toast.error("Please enter a valid donation amount (minimum $1)");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation", {
        body: { amount, email: email || undefined },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Donate"
        description="Support young athletes with your tax-deductible donation. Every dollar empowers athletes to succeed beyond the game."
        canonical="https://brandofachampion.org/donate"
        structuredData={createWebPageSchema(
          "Donate to Brand of a Champion",
          "Support young athletes with your tax-deductible donation.",
          "https://brandofachampion.org/donate"
        )}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">501(c)(3) Nonprofit Organization</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Change a Life.</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Build a Champion.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Your donation empowers young athletes to succeed in every aspect of life—
              <span className="text-foreground font-semibold"> beyond the game</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Make Your Impact Today</h2>
                <p className="text-muted-foreground">Every dollar goes directly to supporting our athletes</p>
              </div>

              {/* Preset Amounts */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {PRESET_AMOUNTS.map((preset) => (
                  <Button
                    key={preset}
                    variant={amount === preset && !customAmount ? "default" : "outline"}
                    onClick={() => handlePresetClick(preset)}
                    className="h-14 text-lg font-semibold transition-all hover:scale-105"
                  >
                    ${preset}
                  </Button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <Label htmlFor="custom-amount" className="text-sm text-muted-foreground mb-2 block">
                  Or enter a custom amount
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-8 h-14 text-lg"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-8">
                <Label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                  Email (optional, for receipt)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Donate Button */}
              <Button
                onClick={handleDonate}
                disabled={isLoading || amount < 1}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
                size="lg"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Donate ${amount.toLocaleString()}
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Your donation is tax-deductible. You'll receive a receipt via email.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Donation Creates Real Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what we've accomplished together—and imagine what more we can do with your support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-semibold mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Douglas County Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                The Douglas County Transformation
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  When Brand of a Champion partnered with Douglas County High School, the program was average at best. 
                  Within just <span className="text-foreground font-semibold">3 years</span>, everything changed.
                </p>
                <p>
                  The team went <span className="text-primary font-bold">10-0</span> in their championship season, 
                  won their region for the first time in <span className="text-primary font-bold">25 years</span>, 
                  and was ranked as high as <span className="text-primary font-bold">#18 in the nation</span> by MaxPreps.
                </p>
                <p>
                  But the real success? <span className="text-foreground font-semibold">30 college scholarships</span> earned. 
                  <span className="text-foreground font-semibold">4 All-Americans</span> developed. 
                  And countless young men prepared for life beyond football.
                </p>
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline" size="lg" className="group">
                  <a href="/stories">
                    Watch Their Stories
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Voices of Impact</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-8 relative"
              >
                <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
                <p className="text-lg italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Every Champion Starts Somewhere
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Your gift today could be the turning point in a young athlete's life. 
              Join us in building the next generation of champions—on and off the field.
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6"
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
