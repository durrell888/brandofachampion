import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Star, Users, MapPin, Bus, Hotel, UtensilsCrossed, Target, Search, ArrowRight, CheckCircle, DollarSign, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SEO, createWebPageSchema } from "@/components/SEO";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const howToDonate = [
  {
    icon: Search,
    title: "Find Us on USAA",
    description: 'Log into your USAA account, navigate to the charitable giving section, and search for "Brand of a Champion" in the approved donor directory.',
  },
  {
    icon: DollarSign,
    title: "Payroll Deduction",
    description: "Set up a recurring payroll deduction through USAA's giving portal. Even small monthly contributions add up to big impact over a year.",
  },
  {
    icon: Heart,
    title: "One-Time Gift",
    description: "Make a one-time donation directly through USAA's charitable giving platform or right here on this page using our secure checkout.",
  },
  {
    icon: Users,
    title: "Team Giving",
    description: "Rally your department or team to collectively support Brand of a Champion. Group giving campaigns amplify your impact.",
  },
];

const programDetails = [
  {
    icon: Bus,
    label: "Travel",
    description: "Round-trip transportation to college campuses across multiple states",
  },
  {
    icon: Hotel,
    label: "Room & Board",
    description: "Safe, comfortable lodging throughout the entire campus visit experience",
  },
  {
    icon: UtensilsCrossed,
    label: "Meals",
    description: "All meals covered so athletes can focus on the experience, not expenses",
  },
  {
    icon: GraduationCap,
    label: "Campus Tours",
    description: "Guided visits to college facilities, meeting coaches, and exploring opportunities",
  },
];

const DonateUSAA = () => {
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

  const goalProgress = 42000; // example current progress
  const goalTarget = 150000;
  const goalPercent = Math.min((goalProgress / goalTarget) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="USAA Employees | Donate to Brand of a Champion"
        description="USAA employees: support Brand of a Champion as an approved USAA donor organization. Help underprivileged youth visit colleges through our Experience & Exposure program."
        canonical="https://brandofachampion.com/donate/usaa"
        structuredData={createWebPageSchema(
          "USAA Employees - Donate to Brand of a Champion",
          "USAA employees can donate through USAA's approved donor program to support underprivileged youth college visits.",
          "https://brandofachampion.com/donate/usaa"
        )}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,15%)] via-background to-[hsl(220,40%,20%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2.5 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">For USAA Employees</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Welcome,</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                USAA Team
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
              Brand of a Champion is a{" "}
              <span className="text-foreground font-semibold">USAA-approved donor organization</span>.
              You can find us directly in your USAA charitable giving portal.
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your donations change lives by giving underprivileged youth the chance to visit college campuses they'd never see otherwise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Annual Goal Tracker */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Our USAA Annual Goal</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Together, USAA employees can help us reach <span className="text-foreground font-bold">$150,000</span> this year to fund college campus visits for underprivileged youth.
            </p>

            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-3xl font-bold text-primary">${goalProgress.toLocaleString()}</span>
                <span className="text-lg text-muted-foreground font-semibold">${goalTarget.toLocaleString()} goal</span>
              </div>
              <div className="w-full h-4 bg-muted rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${goalPercent}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {goalPercent.toFixed(0)}% of our annual goal — every dollar counts!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Donate Through USAA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Donate Through USAA</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search for <span className="text-foreground font-semibold">"Brand of a Champion"</span> in the USAA approved donor directory, or use one of these methods:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {howToDonate.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Exposure Program */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2.5 mb-6">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Funded by USAA Donations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Exposure Program</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              One of the key programs your USAA donations support. We take underprivileged youth out of their communities to visit college campuses in different states — opening their eyes to opportunities they never knew existed.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            {programDetails.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 text-center"
          >
            <p className="text-lg text-foreground leading-relaxed">
              <span className="font-bold">Your donations cover everything</span> — travel, room and board, and meals — so these young athletes can focus entirely on the experience. Many of these students have never left their hometown. Your generosity through USAA makes these life-changing trips possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Why It Matters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Impact as a <span className="text-primary">USAA Employee</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                As a USAA-approved donor organization, Brand of a Champion meets the highest standards of accountability and transparency that USAA demands.
              </p>

              <div className="space-y-4">
                {[
                  "Search 'Brand of a Champion' in the USAA approved donor directory",
                  "100% of donations fund youth development programs",
                  "Tax-deductible with full receipt documentation",
                  "Supports the Experience & Exposure college visit program",
                  "Covers travel, room & board, and meals for underprivileged youth",
                  "Helps us reach our $150,000 annual USAA goal",
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">501(c)(3) Nonprofit</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Brand of a Champion is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8 shadow-2xl sticky top-24"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Donate Now</h2>
                <p className="text-muted-foreground">Quick donate or give through USAA's portal</p>
              </div>

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

              <div className="mb-8">
                <Label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                  Email (optional, for receipt)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@usaa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

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
                Tax-deductible • You'll receive a receipt via email
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonateUSAA;
