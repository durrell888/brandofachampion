import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Star, Users, Award, Flag, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SEO, createWebPageSchema } from "@/components/SEO";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const partnershipHighlights = [
  {
    icon: Shield,
    title: "Approved Donor Organization",
    description: "Brand of a Champion is a USAA-approved charitable organization, meeting rigorous standards of accountability and transparency.",
  },
  {
    icon: Flag,
    title: "Serving Those Who Serve",
    description: "USAA is dedicated to current and former members of the U.S. military and their families. Together, we extend that service to the next generation of leaders.",
  },
  {
    icon: Award,
    title: "Fortune 500 Partnership",
    description: "Backed by one of the nation's most trusted Fortune 500 companies, our partnership ensures your donation creates maximum impact.",
  },
  {
    icon: Users,
    title: "Military Family Athletes",
    description: "Many of the young athletes we serve come from military families who sacrifice daily. Your donation directly supports their dreams.",
  },
];

const usaaValues = [
  "100% of donations go directly to athlete development programs",
  "Tax-deductible contributions with full receipt documentation",
  "USAA-verified nonprofit meeting the highest standards of integrity",
  "Transparent reporting on how every dollar is used",
  "Supporting children of active duty, veterans, and military families",
  "Building discipline, leadership, and character—values shared with the military community",
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

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="USAA Partnership | Donate"
        description="Brand of a Champion is a USAA-approved donor organization. Support young athletes from military families through our Fortune 500 partnership."
        canonical="https://brandofachampion.com/donate/usaa"
        structuredData={createWebPageSchema(
          "USAA Partnership - Donate to Brand of a Champion",
          "Brand of a Champion is a USAA-approved donor organization supporting military family athletes.",
          "https://brandofachampion.com/donate/usaa"
        )}
      />
      <Navbar />

      {/* Hero Section */}
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
              <span className="text-sm font-semibold text-primary">USAA Approved Donor Organization</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Proud Partners with</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                USAA
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
              Supporting young athletes from military families through our partnership with one of America's most trusted
              <span className="text-foreground font-semibold"> Fortune 500 companies</span>.
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              USAA is dedicated to serving the financial needs of current and former members of the U.S. military and their families. Brand of a Champion is honored to be an approved charitable partner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why This Partnership Matters</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our USAA partnership represents a shared commitment to service, integrity, and empowering the next generation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {partnershipHighlights.map((item, index) => (
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

      {/* Values & Donation Form Side by Side */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Values List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Donation, <span className="text-primary">Our Promise</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                As a USAA-approved donor organization, we uphold the same values of honor, service, and accountability that define the military community.
              </p>

              <div className="space-y-4">
                {usaaValues.map((value, index) => (
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
                  Brand of a Champion is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. Your generosity directly fuels programs that empower young athletes from military families to succeed beyond the game.
                </p>
              </div>
            </motion.div>

            {/* Donation Form */}
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
                <h2 className="text-2xl font-bold mb-2">Support Military Family Athletes</h2>
                <p className="text-muted-foreground">Make a tax-deductible donation today</p>
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

      {/* Military Connection CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border rounded-2xl p-8 md:p-12 text-center"
          >
            <Flag className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Service Runs in Their Blood
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
              The values of the U.S. military—discipline, perseverance, teamwork, and sacrifice—are the same values we instill in every athlete we serve. Many of our young athletes are the children of service members who have given everything for this country.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Through our USAA partnership, we ensure that these military families have access to world-class athletic development, mentorship, and scholarship opportunities. Together, we're building the next generation of champions who carry forward the legacy of service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 group">
                <a href="/donate">
                  View General Donations
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonateUSAA;
