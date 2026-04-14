import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  Heart, Users, GraduationCap, Dumbbell, Apple,
  Brain, Shield, HandHeart, Phone, CheckCircle,
  ArrowRight, Quote, Stethoscope, Activity,
  Target, Building2, BadgeCheck, FileText
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const impactMetrics = [
  { icon: Dumbbell, value: "100+", label: "Athletes Supported Annually", color: "from-accent to-red-400" },
  { icon: Apple, value: "Nutrition", label: "& Wellness Support for Low-Income Families", color: "from-green-500 to-emerald-500" },
  { icon: GraduationCap, value: "Academic", label: "& Life-Skill Mentorship Programs", color: "from-blue-500 to-indigo-500" },
  { icon: Activity, value: "Increased", label: "Athlete Health, Confidence & Performance", color: "from-purple-500 to-violet-500" },
];

const partnershipOptions = [
  { icon: Shield, title: "Sponsor Athlete Wellness Kits", desc: "Provide clothing, gear, and essentials to athletes in need." },
  { icon: Apple, title: "Fund Team Meals & Nutrition", desc: "Support nutrition programs that fuel performance and growth." },
  { icon: Brain, title: "Mental Health & Mentorship", desc: "Support mental health initiatives and structured mentorship." },
  { icon: HandHeart, title: "Co-Brand Community Events", desc: "Partner on community health events that make a visible impact." },
  { icon: Stethoscope, title: "Medical Resources & Screenings", desc: "Provide medical resources, health screenings, or education." },
];

const whyPartner = [
  "Direct community impact",
  "Transparent use of funds",
  "Strong alignment with health & youth development",
  "Positive brand visibility in sports + community outreach",
  "Opportunity to change lives at scale",
];

const healthAlignment = [
  { icon: Dumbbell, title: "Physical Health", desc: "Access to proper gear and training resources" },
  { icon: Brain, title: "Mental Health", desc: "Mentorship and structured emotional support" },
  { icon: Shield, title: "Injury Prevention", desc: "Ensuring athletes have safe, proper equipment" },
  { icon: Users, title: "Community Health Equity", desc: "Serving underserved populations directly" },
];

const HealthcarePartnership = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Healthcare Partnership | Brand of a Champion"
        description="Partner with Brand of a Champion to build healthier athletes, strengthen communities, and save futures. Healthcare organizations can create lasting impact through sports, health, and mentorship."
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary-foreground/5 blur-3xl" />

        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Healthcare Partnership</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 tracking-tight leading-tight max-w-5xl mx-auto">
              Building Healthier Athletes.{" "}
              <span className="text-gradient">Strengthening Communities.</span>{" "}
              Saving Futures.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-3xl mx-auto mb-12 font-medium">
              At Brand of a Champion, we support underserved 4 &amp; 5-star athletes by providing essential resources that directly impact physical health, mental wellness, and long-term success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partners">
                <Button variant="hero" size="xl" className="group">
                  <HandHeart className="w-5 h-5" />
                  Partner With Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="heroOutline" size="xl">
                  <Heart className="w-5 h-5" />
                  Fund an Athlete
                </Button>
              </Link>
              <a href="mailto:Durrell@brandofachampion.com?subject=Healthcare%20Partnership%20Call%20Request">
                <Button variant="heroOutline" size="xl">
                  <Phone className="w-5 h-5" />
                  Schedule a Call
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20">
            <path d="M0 80L1440 0V80H0Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                  ❤️ Why This Matters
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
                Where Healthcare Meets <span className="text-accent">Opportunity</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Healthcare providers like Oregon Medical Group understand that true health starts beyond the clinic.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-8 md:p-12 mb-8">
              <motion.p variants={fadeUp} custom={0} className="text-lg font-semibold text-foreground mb-6">
                Many of the athletes we serve face:
              </motion.p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Limited access to proper nutrition",
                  "Lack of athletic gear and safe training resources",
                  "Financial stress affecting mental health",
                  "Missed opportunities due to economic barriers",
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i + 1} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} custom={5} className="text-lg text-accent font-bold mt-8 text-center">
                Your support helps prevent problems before they reach your office.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
              📊 Measurable Results
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Your Impact <span className="text-accent">in Action</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
            {impactMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center h-full border-border hover:border-accent/40 transition-all hover:shadow-lg">
                  <CardContent className="pt-8 pb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center mx-auto mb-4`}>
                      <metric.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-2xl font-extrabold text-foreground mb-1">{metric.value}</div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xl md:text-2xl font-bold text-foreground max-w-3xl mx-auto italic"
          >
            "We don't just build athletes—we build healthier young men and future leaders."
          </motion.p>
        </div>
      </section>

      {/* HEALTH & WELLNESS ALIGNMENT */}
      <section className="py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
              🧠 Health & Wellness
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Aligned With Your Mission of <span className="text-accent">Preventative Care</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our programs directly contribute to reducing long-term healthcare disparities.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
            {healthAlignment.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card border border-border rounded-2xl hover:border-accent/40 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-xl red-gradient flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground text-lg max-w-3xl mx-auto"
          >
            This creates a pipeline of healthier, more supported youth—reducing long-term healthcare disparities.
          </motion.p>
        </div>
      </section>

      {/* PARTNERSHIP OPPORTUNITIES */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
              🤝 Get Involved
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Ways to <span className="text-accent">Partner</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partnershipOptions.map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-border hover:border-accent/40 transition-all hover:shadow-lg group">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <option.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE STORY */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl hero-gradient p-8 md:p-16"
            >
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                    🌟 Feature Story
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4 tracking-tight">
                    Real Impact. Real Athlete.
                  </h2>
                </div>
                <div className="flex justify-center mb-6">
                  <Quote className="w-12 h-12 text-accent/40" />
                </div>
                <blockquote className="text-lg md:text-xl text-primary-foreground/80 text-center max-w-2xl mx-auto leading-relaxed italic">
                  "An athlete in our program was on the verge of quitting due to lack of resources. With support, he received proper gear, mentorship, and guidance—he's now thriving both on the field and academically."
                </blockquote>
                <p className="text-center text-primary-foreground/50 mt-6 text-sm font-medium uppercase tracking-wider">
                  Brand of a Champion Athlete Story
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                💼 Why Us
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Why Partner With <span className="text-accent">Brand of a Champion</span>
              </motion.h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {whyPartner.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full red-gradient flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TAX BENEFITS */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">
                Tax Benefits & Giving Transparency
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center text-left max-w-lg mx-auto">
                {[
                  { icon: BadgeCheck, text: "501(c)(3) Tax-Exempt Status" },
                  { icon: FileText, text: "All Donations Are Tax-Deductible" },
                  { icon: Target, text: "Clear Reporting on Where Funds Go" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl hero-gradient p-8 md:p-16 text-center"
            >
              <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6 tracking-tight">
                  Let's Build Healthier <span className="text-gradient">Futures Together</span>
                </h2>
                <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10 font-medium">
                  We invite organizations like Oregon Medical Group to partner with us in creating lasting impact through sports, health, and mentorship.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/donate">
                    <Button variant="hero" size="xl" className="group">
                      <Heart className="w-5 h-5" />
                      Donate Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/partners">
                    <Button variant="heroOutline" size="xl">
                      <Building2 className="w-5 h-5" />
                      Become a Healthcare Partner
                    </Button>
                  </Link>
                  <a href="mailto:Durrell@brandofachampion.com?subject=Healthcare%20Partnership%20Call%20Request">
                    <Button variant="heroOutline" size="xl">
                      <Phone className="w-5 h-5" />
                      Schedule a Call
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HealthcarePartnership;
