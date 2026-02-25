import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Users, Eye, Award, Handshake, ArrowRight, 
  Car, UtensilsCrossed, Shirt, Building2, Send, CheckCircle2,
  Play, X, Star, BarChart3, Target, Megaphone, ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { partners } from "@/data/partners";
import { useToast } from "@/hooks/use-toast";
const athletePhotos = [
  "/images/athletes/dj-bordeaux-2026.webp",
  "/images/athletes/lasiah-jackson.jpg",
  "/images/athletes/rodney-colton-jr.jpg",
  "/images/athletes/jamier-brown.jpg",
  "/images/athletes/aaron-gregory.jpg",
  "/images/athletes/jordan-carter.webp",
  "/images/athletes/nick-burden.jpg",
  "/images/athletes/jamar-owens.jpg",
  "/images/athletes/adryan-cole-photo.jpg",
  "/images/athletes/kennedy-green.jpg",
  "/images/athletes/trey-byrd.jpg",
  "/images/athletes/kj-howard.jpeg",
  "/images/athletes/steven-mclendon.jpeg",
  "/images/joshua-same-epelle.jpg",
];

const roiStats = [
  { label: "Athletes Developed", value: "50+", icon: Users, description: "High school & college athletes in our program" },
  { label: "Social Media Reach", value: "500K+", icon: Eye, description: "Combined social impressions across platforms" },
  { label: "College Commitments", value: "15+", icon: Award, description: "Athletes committed to D1 programs" },
  { label: "Community Events", value: "30+", icon: Target, description: "Annual events, camps, and showcases" },
];

const partnerBenefits = [
  {
    icon: Megaphone,
    title: "Brand Visibility at Events",
    description: "Your logo and brand featured at all camps, showcases, and community events reaching thousands of families.",
  },
  {
    icon: BarChart3,
    title: "Digital & Social Exposure",
    description: "Featured across our social channels, website, and video content with 500K+ combined impressions.",
  },
  {
    icon: Users,
    title: "Direct Access to Athletes & Families",
    description: "Engage directly with our athlete community and their families — a highly engaged, loyal audience.",
  },
  {
    icon: Star,
    title: "Co-Branded Content",
    description: "Professional video production and photography featuring your brand alongside our athletes.",
  },
  {
    icon: TrendingUp,
    title: "Community Goodwill & Tax Benefits",
    description: "As a 501(c)(3), your partnership is a tax-deductible investment in community impact.",
  },
  {
    icon: Handshake,
    title: "Exclusive Naming Rights",
    description: "Naming opportunities for training camps, scholarship funds, and signature events.",
  },
];

const industryFit = [
  {
    icon: Car,
    title: "Auto Dealerships",
    description: "Reach families actively purchasing vehicles for new college-bound athletes. Your brand becomes synonymous with achievement.",
    examples: ["Event Vehicle Sponsor", "Athlete of the Month Award", "Test Drive at Camp Days"],
    expandedDetails: {
      headline: "Why Auto Dealerships Win With Us",
      points: [
        "Our athletes' families are in the market for reliable vehicles — from daily drivers to college move-in SUVs. Your dealership gets in front of them at the exact right time.",
        "Feature your vehicles at our showcase events where 200+ families attend, giving you direct face time with motivated buyers.",
        "Co-branded 'Athlete of the Month' campaigns drive monthly social engagement, putting your dealership name in front of 500K+ impressions.",
        "Exclusive on-site activations like 'Test Drive at Camp' create memorable brand experiences that translate to showroom visits.",
      ],
    },
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Beverage",
    description: "Fuel the next generation of champions. Perfect alignment for nutrition, hydration, and restaurant brands.",
    examples: ["Camp Nutrition Sponsor", "Post-Game Meal Partner", "Branded Hydration Stations"],
    expandedDetails: {
      headline: "Feed Champions, Grow Your Brand",
      points: [
        "Athletes and their families are passionate about nutrition — your brand becomes the trusted fuel behind their performance.",
        "Branded hydration stations at every event put your product directly in the hands of hundreds of athletes and spectators.",
        "Post-game meal partnerships create repeat customers — families associate your restaurant with celebration and community.",
        "Our cinematic content team creates professional product-integration videos that showcase your brand authentically across social media.",
      ],
    },
  },
  {
    icon: Shirt,
    title: "Apparel & Sportswear",
    description: "Outfit our athletes and get your brand seen on fields, social media, and highlight reels across the nation.",
    examples: ["Team Outfitting Partner", "Athlete Endorsement Deals", "Branded Camp Gear"],
    expandedDetails: {
      headline: "Your Brand On Every Field",
      points: [
        "Our athletes are seen by college coaches, scouts, and recruiters nationwide — your logo travels with them to every showcase and combine.",
        "Athlete endorsement content featuring your gear gets shared organically by families, coaches, and recruiting platforms.",
        "Branded camp gear (shirts, bags, accessories) turns every participant into a walking billboard in their community.",
        "Our highlight reels and training videos rack up thousands of views — your apparel is front and center in every frame.",
      ],
    },
  },
  {
    icon: Building2,
    title: "Financial & Professional Services",
    description: "Build trust with families planning for their athlete's future. Education, insurance, and wealth management.",
    examples: ["Scholarship Fund Sponsor", "Financial Literacy Workshops", "Parent Seminar Presenter"],
    expandedDetails: {
      headline: "Build Trust With Families Who Need You",
      points: [
        "Parents of student-athletes are actively planning for college costs, insurance, and financial futures — you solve real problems they face right now.",
        "Sponsoring our scholarship fund positions your firm as a community leader committed to education and opportunity.",
        "Host financial literacy workshops at our events to establish your expertise directly with an engaged, motivated audience.",
        "Parent seminars on NIL, college planning, and wealth management give you a captive audience of decision-makers ready to take action.",
      ],
    },
  },
];

const partnerTiers = [
  {
    name: "Champion",
    price: "$25,000+",
    color: "from-yellow-500 to-amber-600",
    features: [
      "Title sponsor of annual showcase events",
      "Logo on all athlete apparel & gear",
      "Dedicated social media campaign (12 posts/year)",
      "Co-branded video content series",
      "VIP access to all events",
      "Exclusive naming rights opportunity",
      "Quarterly impact reports",
    ],
  },
  {
    name: "All-Star",
    price: "$10,000",
    color: "from-slate-400 to-slate-500",
    features: [
      "Logo featured at 4+ events per year",
      "Monthly social media shoutouts",
      "Featured on website partner page",
      "2 co-branded content pieces",
      "Event booth/activation space",
      "Bi-annual impact reports",
    ],
  },
  {
    name: "Rookie",
    price: "$2,500",
    color: "from-amber-700 to-amber-800",
    features: [
      "Logo on website partner page",
      "Quarterly social media features",
      "Event recognition & signage",
      "Annual impact report",
      "Community newsletter feature",
    ],
  },
];

const ProgramPartnerships = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showQCollarVideo, setShowQCollarVideo] = useState(false);
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Partnership Inquiry from ${formData.company}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:Durrell@brandofachampion.com?subject=${subject}&body=${body}`;
    toast({
      title: "Opening email client",
      description: "Your partnership inquiry is ready to send!",
    });
    setFormData({ name: "", company: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Program Partnerships | Brand of a Champion"
        description="Partner with Brand of a Champion and reach 500K+ engaged families. See our ROI data, partnership tiers, and how your brand can make an impact."
      />
      <Navbar />

      {/* Hero with Real Athlete Photo Grid */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="grid grid-cols-4 md:grid-cols-7 h-full">
            {athletePhotos.map((photo, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={photo}
                  alt="BOAC Athlete"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        </div>

        <div className="container relative z-10 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
              <Handshake className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Partnership Opportunity</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 text-foreground tracking-tight">
              INVEST IN THE NEXT <span className="text-accent">GENERATION</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Partner with a 501(c)(3) nonprofit reaching <strong className="text-foreground">500K+ families</strong> and developing{" "}
              <strong className="text-foreground">50+ elite athletes</strong> committed to top college programs nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group" onClick={() => document.getElementById('partner-inquiry')?.scrollIntoView({ behavior: 'smooth' })}>
                <Send className="w-5 h-5" />
                Request Partnership Info
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Stats */}
      <section className="py-16 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {roiStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-accent uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of Concept - Q Collar Video */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/2">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-xl group cursor-pointer"
                  onClick={() => setShowQCollarVideo(true)}
                >
                  <img
                    src="https://img.youtube.com/vi/R0bhVY6Nu4Y/maxresdefault.jpg"
                    alt="Q Collar x Brand of a Champion"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-xl">
                      <Play className="w-6 h-6 text-accent-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-3">
                  Proof of Concept
                </span>
                <h3 className="text-2xl font-extrabold text-foreground mb-3">
                  Professional Partner Content
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  See how we showcased Q Collar with our athletes — cinematic production, authentic storytelling, and real engagement. This is the level of content your brand receives as a partner.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Cinematic Production
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Athlete Integration
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Multi-Platform Distribution
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 text-foreground tracking-tight">
              WHY <span className="text-accent">PARTNER</span> WITH US
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Your brand gets more than a logo placement — you get a movement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-all duration-300"
              >
                <benefit.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-extrabold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Fit */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 text-foreground tracking-tight">
              PERFECT FOR <span className="text-accent">YOUR INDUSTRY</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              No matter your business, we create partnership packages that deliver real ROI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryFit.map((industry, i) => {
              const isExpanded = expandedIndustry === industry.title;
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-card border rounded-xl p-8 cursor-pointer transition-all duration-300 ${
                    isExpanded ? "border-accent shadow-lg shadow-accent/10" : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => setExpandedIndustry(isExpanded ? null : industry.title)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <industry.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-extrabold text-foreground mb-1">{industry.title}</h3>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                      <p className="text-muted-foreground text-sm">{industry.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2 pl-16">
                    {industry.examples.map((ex) => (
                      <div key={ex} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-sm text-foreground font-medium">{ex}</span>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-border">
                          <h4 className="text-lg font-extrabold text-accent mb-4">
                            {industry.expandedDetails.headline}
                          </h4>
                          <div className="space-y-3">
                            {industry.expandedDetails.points.map((point, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                              </div>
                            ))}
                          </div>
                          <Button
                            variant="hero"
                            size="lg"
                            className="mt-6 group"
                            onClick={(e) => {
                              e.stopPropagation();
                              document.getElementById('partner-inquiry')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            <Send className="w-4 h-4" />
                            Partner With Us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 text-foreground tracking-tight">
              PARTNERSHIP <span className="text-accent">TIERS</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Flexible packages designed to match your goals and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnerTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative bg-card border rounded-2xl p-8 ${i === 0 ? 'border-accent shadow-xl shadow-accent/10 scale-105' : 'border-border'}`}
              >
                {i === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <Star className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-1">{tier.name}</h3>
                <p className="text-3xl font-extrabold text-accent mb-6">{tier.price}</p>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={i === 0 ? "hero" : "outline"}
                  className="w-full mt-8"
                  onClick={() => document.getElementById('partner-inquiry')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-2 text-foreground">
              TRUSTED BY <span className="text-accent">LEADING BRANDS</span>
            </h2>
            <p className="text-muted-foreground">Join these organizations already making an impact</p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 md:max-h-16 object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground group-hover:text-accent transition-colors">{partner.name}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section id="partner-inquiry" className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl hero-gradient">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="relative z-10 p-8 md:p-16">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                    Let's Talk
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4 tracking-tight">
                    Ready to Partner?
                  </h2>
                  <p className="text-primary-foreground/70 text-lg">
                    Tell us about your brand and we'll create a custom partnership package.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                        Company
                      </label>
                      <Input
                        id="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Company"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                      Tell Us About Your Partnership Goals
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What industry are you in? What are your marketing goals? Which tier interests you?"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent resize-none"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full md:w-auto group">
                    <Send className="w-5 h-5" />
                    Send Partnership Inquiry
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Q Collar Video Modal */}
      <AnimatePresence>
        {showQCollarVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setShowQCollarVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQCollarVideo(false)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/R0bhVY6Nu4Y?autoplay=1"
                title="Q Collar x Brand of a Champion"
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProgramPartnerships;
